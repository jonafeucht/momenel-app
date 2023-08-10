import {
  ActivityIndicator,
  Alert,
  Button,
  RefreshControl,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useBoundStore } from "../app/Store/useBoundStore";
import Post from "../app/components/Posts/Post";
import { supabase } from "../app/lib/supabase";
import { FlashList } from "@shopify/flash-list";
import CustomText from "../app/components/customText/CustomText";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

let baseUrl = "https://api.momenel.com";

const ForYou = ({ navigation, forYouRef }) => {
  const mode = useBoundStore((state) => state.mode);
  const setMode = useBoundStore((state) => state.setMode);
  const [postsData, setPostsData] = useState([]);
  const [showFooter, setShowFooter] = useState(true);
  const fetchNotifications = useBoundStore((state) => state.fetchNotifications);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(15);

  useEffect(() => {
    fetchPosts();
  }, [from, to, isRefreshing]);

  useEffect(() => {
    console.log("mode", mode);
  }, [mode]);

  const removeModeFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("mode");
      setMode(null); // Reset the mode state
    } catch (error) {
      console.error("Failed to remove the mode from storage", error);
    }
  };
  const setDark = async () => {
    try {
      await AsyncStorage.setItem("mode", "dark"); // or 'light'
      setMode("dark"); // Reset the mode state
    } catch (error) {
      console.error("Failed to remove the mode from storage", error);
    }
  };
  const setLight = async () => {
    try {
      await AsyncStorage.setItem("mode", "light"); // or 'light'
      setMode("light"); // Reset the mode state
    } catch (error) {
      console.error("Failed to remove the mode from storage", error);
    }
  };

  const fetchNotificationsIntervalDelay = 120000;
  const fetchNotificationsCallback = useCallback(() => {
    fetchNotifications({ isRefreshing: true });
  }, [fetchNotifications]);

  useEffect(() => {
    // Initial fetch on render
    fetchNotifications({ isRefreshing: true });

    // Fetch notifications every 2 minutes
    const intervalId = setInterval(
      fetchNotificationsCallback,
      fetchNotificationsIntervalDelay
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchPosts = async () => {
    if (!showFooter && from !== 0) {
      return;
    }
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    let response = await fetch(`${baseUrl}/feed/foryou/${from}/${to}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }

    response = await response.json();

    if (from === 0) {
      setPostsData([...response]);
    } else if (response.length === 0) {
      setShowFooter(false);
    } else {
      setPostsData((prev) => [...prev, ...response]);
    }
    setIsRefreshing(false);
  };

  const fetchMorePosts = () => {
    let newFrom = to + 1;
    let newTo = to + 15;

    setFrom(newFrom);
    setTo(newTo);
  };

  const handleRefresh = () => {
    setFrom(0);
    setTo(15);
    setIsRefreshing(true);
    setShowFooter(true);
  };

  const handleLike = async (index, isLiked, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    try {
      // handle like confirmation before sending to the backend
      const updatedPosts = postsData.map((post) => {
        if (post.id === postId) {
          if (post.isLiked) {
            post.likes--;
          } else {
            post.likes++;
          }
          post.isLiked = !post.isLiked;
        }
        return post;
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
        const updatedPosts = postsData.map((post) => {
          if (post.id === postId) {
            post.likes = likes;
            post.isLiked = true;
          }
          return post;
        });
        setPostsData(updatedPosts);
      } else if (response.status === 204) {
        const updatedPosts = postsData.map((post) => {
          if (post.id === postId) {
            post.isLiked = false;
          }
          return post;
        });
        setPostsData(updatedPosts);
      }
    } catch (error) {
      Alert.alert("Like error", "Something went wrong");
    }
  };

  const handleRepost = async (index, isReposted, postId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    // handle like confirmation before sending to the backend
    const updatedPosts = postsData.map((post) => {
      if (post.id === postId) {
        if (post.isReposted) {
          post.reposts.count--;
        } else {
          post.reposts.count++;
        }
        post.isReposted = !post.isReposted;
      }
      return post;
    });
    setPostsData(updatedPosts);

    // send like to the backend
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
      const updatedPosts = postsData.map((post) => {
        if (post.id === postId) {
          post.isReposted = true;
        }
        return post;
      });
      setPostsData(updatedPosts);
    } else if (response.status === 204) {
      const updatedPosts = postsData.map((post) => {
        if (post.id === postId) {
          post.isReposted = false;
        }
        return post;
      });
      setPostsData(updatedPosts);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Post
          height={item.content.length > 0 ? item.content[0].height : 0}
          width={item.content.length > 0 ? item.content[0].width : 0}
          isPublished={true}
          navigation={navigation}
          postId={item.id}
          index={index}
          likes={item.likes}
          comments={item.comments}
          reposts={item.reposts}
          repost={item.repostedBy}
          profileUrl={item.user?.profile_url}
          username={item.user?.username}
          name={item.user?.name}
          createdAt={item.created_at}
          posts={item.content ? item.content : []}
          caption={item.caption}
          handleLike={handleLike}
          handleRepost={handleRepost}
          isLiked={item.isLiked}
          isReposted={item.isReposted}
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
      {!showFooter && (
        <CustomText style={{ color: mode === "dark" ? "white" : "#0000ff" }}>
          You are all caught up 😀
        </CustomText>
      )}
    </View>,
    [showFooter]
  );

  const keyExtractor = (item) => {
    return item.type + item.id;
  };

  return (
    <View
      style={{
        backgroundColor: mode === "dark" ? "black" : "white",
        height: "100%",
        marginBottom: 800,
      }}
    >
      <FlashList
        ref={forYouRef}
        data={postsData}
        estimatedItemSize={100}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderListFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={mode === "dark" ? "white" : "black"}
          />
        }
        ListHeaderComponent={() => (
          <>
            <Button title="reset" onPress={removeModeFromStorage} />
            <Button title="Dark" onPress={setDark} />
            <Button title="light" onPress={setLight} />
          </>
        )}
      />
    </View>
  );
};

export default ForYou;
