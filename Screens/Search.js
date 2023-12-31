import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { memo, useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../app/utils/Scale";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import CustomText from "../app/components/customText/CustomText";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { FlashList } from "@shopify/flash-list";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { Alert } from "react-native";
import { useBoundStore } from "../app/Store/useBoundStore";

let baseUrl = "https://api.momenel.com";

const Search = ({ navigation, route }) => {
  const mode = useBoundStore((state) => state.mode);
  const { query } = route.params;
  const [text, onChangeText] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [queryResults, setQueryResults] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(30);

  useEffect(() => {
    if (query) {
      if (query[0] === "#") {
        onChangeText(query);
      } else {
        onChangeText(`#${query}`);
      }

      setQueryResults({ title: query });
      setSearch(query);
    }
  }, []);

  useEffect(() => {
    // if search is not empty
    if (search) {
      getPosts();
    }
  }, [search, from, to]);

  const fetchMorePosts = () => {
    let newFrom = to;
    let newTo = to + 30;

    setFrom(newFrom);
    setTo(newTo);
  };
  const getSearchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);

    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }

    let response = await fetch(
      `${baseUrl}/search/${
        query[0] === "#" ? `%23${query.substring(1)}` : query
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      Alert.alert("Error", response.error);
      setSuggestions([]);
      return;
    }
    response = await response.json();
    setSuggestions(response);
  };

  const handleSearchChange = (text) => {
    onChangeText(text);
    setQueryResults(null);
    getSearchSuggestions(text);
  };

  const getPosts = async () => {
    if (from === 0) setIsFetching(true);
    setSuggestions([]);

    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    let response = await fetch(
      `${baseUrl}/search/hashtag/${search}/${from}/${to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      }
    );
    if (!response.ok) {
      Alert.alert("Error", "Hashtag not found");
      navigation.goBack();
      setSuggestions([]);
      setIsFetching(false);
      return;
    }
    response = await response.json();

    setQueryResults((prevResults) => {
      if (
        prevResults.title !== search ||
        prevResults.id !== response.hashtagId ||
        prevResults.isFollowing !== response.isFollowing
      ) {
        return {
          title: search,
          id: response.hashtagId,
          isFollowing: response.isFollowing,
        };
      }
      return prevResults;
    });
    if (from === 0) {
      setPostsData([...response.posts]);
    } else if (response.posts.length === 0) {
      setShowFooter(false);
    } else {
      setPostsData((prevPosts) => [...prevPosts, ...response.posts]);
    }
    setRefreshing(false);
    setIsFetching(false);
  };

  const renderSuggestion = ({ item }) => {
    return (
      <Suggestion
        item={item}
        handleSuggestionPress={getPosts}
        navigation={navigation}
        onChangeText={onChangeText}
        setSearch={setSearch}
        setFrom={setFrom}
        setTo={setTo}
        setQueryResults={setQueryResults}
        mode={mode}
      />
    );
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      const {
        post: {
          id: postId,
          likes: [{ count: likes }],
          comments: [{ count: comments }],
          reposts: [{ count: reposts }],
          user: { profile_url: profileUrl, username, name },
          created_at: createdAt,
          content,
          caption,
        },
        isLiked,
        isReposted,
      } = item;
      const height = content?.length > 0 ? content[0].height : 0;
      const width = content?.length > 0 ? content[0].width : 0;
      return (
        <Post
          isPublished={true}
          navigation={navigation}
          postId={postId}
          index={index}
          likes={likes}
          comments={comments}
          reposts={reposts}
          repost={false}
          profileUrl={profileUrl}
          username={username}
          name={name}
          createdAt={createdAt}
          posts={content || []}
          caption={caption}
          height={height}
          width={width}
          handleLike={handleLike}
          handleRepost={handleRepost}
          isLiked={isLiked}
          isReposted={isReposted}
        />
      );
    },
    [postsData]
  );

  const renderListFooter = useCallback(
    <View
      style={[
        {
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        },
        !showFooter && { marginTop: -15 },
      ]}
    >
      {showFooter && (
        <ActivityIndicator color={mode === "dark" ? "white" : "#0000ff"} />
      )}
    </View>,
    [showFooter]
  );

  const handleLike = async (index, isLiked, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }
    // handle like confirmation before sending to the backend

    const updatedPosts = postsData.map((p) => {
      if (p.post.id === postId) {
        if (p.isLiked) {
          p.post.likes[0].count -= 1;
        } else {
          p.post.likes[0].count += 1;
        }
        p.isLiked = !p.isLiked;
      }
      return p;
    });

    setPostsData(updatedPosts);

    // send like to the backend
    let response = await fetch(`${baseUrl}/like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });
    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    if (response.status === 200) {
      let { likes } = await response.json();
      const updatedPosts = postsData.map((p) => {
        if (p.post.postId === postId) {
          p.post.likes = likes;
          p.isLiked = true;
        }
        return p;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((p) => {
        if (p.post.postId === postId) {
          p.isLiked = false;
        }
        return p;
      });
      setPostsData(updatedPosts);
    }
  };

  const handleRepost = async (index, isReposted, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    const updatedPosts = postsData.map((p) => {
      if (p.post.id === postId) {
        if (p.isReposted) {
          p.post.reposts[0].count -= 1;
        } else {
          p.post.reposts[0].count += 1;
        }
        p.isReposted = !p.isReposted;
      }
      return p;
    });
    setPostsData(updatedPosts);

    // send repost to the backend
    let response = await fetch(`${baseUrl}/repost/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });
    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (response.status === 201) {
      const updatedPosts = postsData.map((p) => {
        if (p.post.id === postId) {
          p.isReposted = true;
        }
        return p;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((p) => {
        if (p.post.id === postId) {
          p.isReposted = false;
        }
        return p;
      });
      setPostsData(updatedPosts);
    }
  };

  const handleHashtagFollow = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setQueryResults({
      ...queryResults,
      isFollowing: !queryResults.isFollowing,
    });
    // handle follow on backend
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    let response = await fetch(`${baseUrl}/hashtag/follow/${queryResults.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    if (response.status === 201) {
      setQueryResults({
        ...queryResults,
        isFollowing: true,
      });
    } else {
      setQueryResults({
        ...queryResults,
        isFollowing: false,
      });
    }
  };

  const renderHeader = () => {
    if (!queryResults || isFetching || suggestions.length > 0) {
      return null;
    }

    const followButtonStyle = queryResults.isFollowing
      ? {
          backgroundColor: "#ccc",
          width: "30%",
          height: scale(30),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          paddingVertical: 5,
        }
      : { width: "20%" };

    return (
      <View
        style={{
          marginHorizontal: "5%",
          marginTop: "1%",
        }}
      >
        <CustomText
          numberOfLines={1}
          style={{
            fontFamily: "Nunito_700Bold",
            fontSize: scale(16),
            marginBottom: "2%",
            color: mode === "dark" ? "white" : "black",
          }}
        >
          #{queryResults.title}
        </CustomText>
        <Pressable onPress={handleHashtagFollow} style={followButtonStyle}>
          {queryResults.isFollowing ? (
            <CustomText
              numberOfLines={1}
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: scale(12),
              }}
            >
              Following
            </CustomText>
          ) : (
            <LinearGradientButton
              style={{ borderRadius: 5, height: scale(30) }}
            >
              <CustomText
                numberOfLines={1}
                style={{
                  fontFamily: "Nunito_700Bold",
                  fontSize: scale(12),
                  color: "white",
                }}
              >
                Follow
              </CustomText>
            </LinearGradientButton>
          )}
        </Pressable>
      </View>
    );
  };

  const handleRefresh = () => {
    setFrom(0);
    setTo(30);
    setRefreshing(true);
    setShowFooter(true);
  };

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: mode === "dark" ? "black" : "white",
      }}
    >
      <SafeAreaView
        style={{
          display: "flex",
          backgroundColor: mode === "dark" ? "#0E0E0E" : "white",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: scale(-20),
        }}
        keyboardShouldPersistTaps="always"
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            backgroundColor: mode === "dark" ? "#2A2A2A" : "#F1F1F2",
            marginRight: "2%",
            height: "100%",
            minHeight: scale(32),
            borderRadius: 13,
            fontFamily: "Nunito_600SemiBold",
            fontSize: 14,
            paddingHorizontal: "3%",
            alignItems: "center",
            marginLeft: "3%",
          }}
        >
          <Ionicons name="ios-search" size={scale(16)} color="#999999" />
          <TextInput
            autoFocus={query ? false : true}
            style={{
              backgroundColor: mode === "dark" ? "#2A2A2A" : "#F1F1F2",
              fontFamily: "Nunito_600SemiBold",
              fontSize: 14,
              alignItems: "center",
              flex: 1,
              height: "100%",
              marginLeft: "3%",
              color: mode === "dark" ? "white" : "black",
            }}
            value={text}
            onChangeText={handleSearchChange}
            placeholder="Search for people, posts, tags..."
            placeholderTextColor="#999999"
          />
        </View>
        <Pressable onPress={() => navigation.pop()}>
          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: 14,
              marginRight: "3%",
              color: mode === "dark" ? "white" : "black",
            }}
          >
            Cancel
          </CustomText>
        </Pressable>
      </SafeAreaView>
      {suggestions.length > 0 ? (
        <View
          style={{
            backgroundColor: mode === "dark" ? "#0E0E0E" : "white",
            height: "100%",
          }}
        >
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              renderItem={renderSuggestion}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="always"
            />
          )}
        </View>
      ) : isFetching ? (
        <View style={{ marginTop: "4%" }}>
          <ActivityIndicator color="#0000ff" />
        </View>
      ) : (
        <FlashList
          data={postsData}
          estimatedItemSize={233}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={"black"}
            />
          }
          ListFooterComponent={renderListFooter}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0.5}
          keyboardDismissMode="on-drag"
        />
      )}
    </View>
  );
};

const Suggestion = ({
  navigation,
  item,
  onChangeText,
  setSearch,
  setTo,
  setFrom,
  setQueryResults,
  mode,
}) => {
  return (
    <Pressable
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: mode === "dark" ? "#2A2A2A" : "#F1F1F2",
        backgroundColor: mode === "dark" ? "#0E0E0E" : "white",
      }}
      onPress={() => {
        if (item.username) {
          navigation.navigate("UserProfile", { id: item.username });
        } else {
          setSearch("");
          Keyboard.dismiss();
          onChangeText("#" + item.hashtag);
          setFrom(0);
          setTo(30);
          setSearch(item.hashtag);
          setQueryResults({ title: item.hashtag });
        }
      }}
    >
      {item.username ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {item.profile_url ? (
            <Image
              source={{
                uri: `https://cdn.momenel.com/profiles/${item.profile_url}`,
              }}
              style={{
                width: scale(30),
                height: scale(30),
                borderRadius: scale(15),
                marginRight: "1%",
              }}
            />
          ) : (
            <Ionicons
              name="person-circle-sharp"
              size={scale(30)}
              color="#999999"
              style={{ marginRight: "1%" }}
            />
          )}

          <CustomText
            style={{
              fontFamily: "Nunito_600SemiBold",
              fontSize: scale(14),
              color: mode === "dark" ? "white" : "black",
            }}
          >
            {item.username}
          </CustomText>
        </View>
      ) : (
        <CustomText
          style={{
            fontFamily: "Nunito_600SemiBold",
            fontSize: scale(14),
            color: mode === "dark" ? "white" : "black",
          }}
        >
          #{item.hashtag}
        </CustomText>
      )}
    </Pressable>
  );
};

export default memo(Search);
