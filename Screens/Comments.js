import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  LayoutAnimation,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import GradientText from "../app/components/customText/GradientText";
import { scale } from "../app/utils/Scale";
import { FlashList } from "@shopify/flash-list";
import { useBoundStore } from "../app/Store/useBoundStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Comment from "../app/components/Posts/Comment";
import StatusOverlay from "../app/components/StatusOverlay";
import { supabase } from "../app/lib/supabase";
import { RefreshControl } from "react-native-gesture-handler";
import CustomText from "../app/components/customText/CustomText";
import Post from "../app/components/Posts/Post";
import * as Haptics from "expo-haptics";

// let baseUrl = "https://api.momenel.com";
let baseUrl = "https://8e63-69-114-29-31.ngrok-free.app";

const Comments = ({ route, navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(30);
  const [isFirst, setIsFirst] = useState(true);
  const { postId, comment_id } = route.params;
  const [comments, setComments] = useState(null);
  const [postingComment, setPostingComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);
  const [text, onChangeText] = useState("");
  const flatListRef = useRef(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const headerHeight = useHeaderHeight();
  const userProfileUrl = useBoundStore((state) => state.profile_url);
  const insets = useSafeAreaInsets();
  const [showFooter, setShowFooter] = useState(true);
  const textInputRef = useRef(null);
  const [post, setPost] = useState({});

  useEffect(() => {
    setIsFirst(true);
  }, []);
  useEffect(() => {
    fetchComments();
  }, [from, to, isRefreshing]);

  useEffect(() => {
    if (isFirst && comments && comment_id) {
      let index = comments.findIndex((comment) => comment.id === comment_id);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: index, animated: true });
      }, 100);
      setIsFirst(false);
    }
  }, [flatListRef.current, comments]);

  // keyboard listeners
  useEffect(() => {
    if (Platform.OS === "android") {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    } else {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardWillShow",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardWillHide",
        () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setKeyboardVisible(false);
        }
      );
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, []);

  async function fetchComments() {
    setShowFooter(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    // fetch comments from api
    let response = await fetch(
      `${baseUrl}/comment/v2/${postId}/${from}/${to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }
    );

    if (response.status !== 200) {
      return alert("Something went wrong");
    }
    response = await response.json();

    let comments = response.comments;
    if (response.post.id) {
      setPost(response.post);
    }
    setShowFooter(false);
    setIsRefreshing(false);
    setComments((prevComments) => {
      if (from === 0) {
        return comments;
      }
      return [...prevComments, ...comments];
    });
  }

  const handleRefresh = () => {
    setFrom(0);
    setTo(30);
    setIsRefreshing(true);
  };

  const fetchMorePosts = () => {
    setFrom(to);
    setTo(to + 30);
  };

  async function postComment(txt) {
    Keyboard.dismiss();
    onChangeText("");

    setPostingComment(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    let bodyContent = JSON.stringify({
      text: txt,
    });
    let response = await fetch(`${baseUrl}/comment/${postId}`, {
      method: "POST",
      body: bodyContent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (response.status !== 201) {
      return alert("Something went wrong");
    }
    let postedComment = await response.json();
    setPostingComment(false);
    addComment(postedComment);
  }

  function addComment(comment) {
    const newComments = [comment, ...comments];
    setComments(newComments);
    if (flatListRef) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

    // animate
    flatListRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  const handleDelete = async (commentId) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    setDeletingComment(true);

    // fetch comments from api
    let response = await fetch(`${baseUrl}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (response.status !== 204) {
      return alert("Something went wrong");
    }

    let newArr = comments.filter((item) => item.id !== commentId);

    setDeletingComment(false);
    flatListRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setComments(newArr);
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Comment
          navigation={navigation}
          commentId={item.id}
          username={item.user.username}
          profile_url={item.user.profile_url}
          likes={item.likes}
          time={item.created_at}
          comment={item.text}
          isLiked={item.isLiked}
          gifUrl={item.gifUrl}
          handleDelete={handleDelete}
          highlight={item.id === comment_id ? true : false}
          onChangeText={onChangeText}
          textInputRef={textInputRef}
        />
      );
    },
    [comments]
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
      {showFooter && !isFirst && <ActivityIndicator color="#0000ff" />}
    </View>,
    [showFooter]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  // show post
  const renderHeader = useCallback(
    ({}) => {
      if (!post.id) {
        return null;
      }
      return (
        <Post
          height={post?.content[0]?.height || 0}
          width={post?.content[0]?.width || 0}
          isPublished={true}
          navigation={navigation}
          postId={post?.id}
          index={0}
          likes={post?.likes[0].count}
          comments={post?.comments[0].count}
          reposts={post?.reposts[0].count}
          profileUrl={post.user?.profile_url}
          username={post?.user?.username}
          name={post?.user?.name}
          createdAt={post.created_at}
          posts={post?.content ? post.content : []}
          caption={post?.caption}
          handleLike={handleLike}
          handleRepost={handleRepost}
          isLiked={post.isLiked}
          isReposted={post.isReposted}
        />
      );
    },
    [post]
  );

  const handleLike = async (index, isLiked, postId) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }

    let updatedPost = {};
    if (post.isLiked === true) {
      updatedPost = {
        ...post,
        likes: [{ count: post.likes[0].count - 1 }],
        isLiked: false,
      };
    } else {
      updatedPost = {
        ...post,
        likes: [{ count: post.likes[0].count + 1 }],
        isLiked: true,
      };
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPost(updatedPost);

    // send like to the backend
    let response = await fetch(`${baseUrl}/like/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });
    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
  };

  const handleRepost = async (index, isReposted, postId) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
    }
    let updatedPost = {};
    if (post.isReposted === true) {
      updatedPost = {
        ...post,
        reposts: [{ count: post.reposts[0].count - 1 }],
        isReposted: false,
      };
    } else {
      updatedPost = {
        ...post,
        reposts: [{ count: post.reposts[0].count + 1 }],
        isReposted: true,
      };
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPost(updatedPost);

    // send repost to the backend
    let response = await fetch(`${baseUrl}/repost/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });

    // if error
    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: mode === "dark" ? "#000" : "#fff",
        },
      ]}
    >
      {comments === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={mode === "dark" ? "white" : "#0000ff"} />
        </View>
      ) : (
        <FlashList
          ref={flatListRef}
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={{
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: mode === "dark" ? "#333" : "#ccc",
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {mode === "dark" ? (
                  <CustomText
                    style={{
                      fontSize: scale(16),
                      fontFamily: "Nunito_600SemiBold",
                      color: "#fff",
                    }}
                  >
                    Be the first to leave a comment!
                  </CustomText>
                ) : (
                  <GradientText
                    style={{
                      fontSize: scale(16),
                      fontFamily: "Nunito_600SemiBold",
                    }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
                    Be the first to leave a comment!
                  </GradientText>
                )}
              </View>
            );
          }}
          estimatedItemSize={115}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          onEndReachedThreshold={0.1}
          onEndReached={fetchMorePosts}
          decelerationRate={"normal"}
          refreshControl={
            <RefreshControl
              tintColor={mode === "dark" ? "white" : "black"}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              progressViewOffset={0}
              size={"default"}
            />
          }
          ListFooterComponent={renderListFooter}
        />
      )}
      <KeyboardAvoidingView
        enabled={Platform.OS === "ios"}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        style={{
          justifyContent: "flex-end",
          backgroundColor: mode === "dark" ? "#0E0E0E" : "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: "3%",
            marginBottom: isKeyboardVisible ? 10 : insets.bottom + 5,
            borderTopWidth: 1,
            borderTopColor: mode === "dark" ? "#2A2A2A" : "#E5E5E5",
            paddingTop: "2%",
            backgroundColor: mode === "dark" ? "#0E0E0E" : "#fff",
          }}
        >
          {!isKeyboardVisible && (
            <Image
              source={{
                uri: `https://cdn.momenel.com/profiles/${userProfileUrl}`,
              }}
              style={{
                height: scale(32),
                width: scale(32),
                borderRadius: 40,
              }}
              contentFit={"cover"}
            />
          )}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              backgroundColor: mode === "dark" ? "#2A2A2A" : "#E5E5E5",
              marginHorizontal: isKeyboardVisible ? 0 : "3%",
              marginRight: isKeyboardVisible ? "1.5%" : "3%",
              height: "100%",
              minHeight: scale(37),
              maxHeight: scale(140),
              borderRadius: 13,
              fontFamily: "Nunito_600SemiBold",
              fontSize: 14,
              paddingHorizontal: "3%",
              paddingVertical: "3%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <TextInput
                ref={textInputRef}
                style={{
                  backgroundColor: mode === "dark" ? "#2A2A2A" : "#E5E5E5",
                  fontFamily: "Nunito_600SemiBold",
                  fontSize: 15,
                  color: mode === "dark" ? "#E0E0E0" : "black",
                  alignItems: "center",
                }}
                value={text}
                onChangeText={onChangeText}
                placeholder="Add a comment..."
                placeholderTextColor={mode === "dark" ? "#7D7D7D" : "gray"}
                keyboardType="twitter"
                multiline={true}
              />
            </View>
          </View>
          {(isKeyboardVisible || text.length > 0) && (
            <Pressable
              disabled={text.length <= 0 ? true : false}
              onPress={() => postComment(text)}
            >
              <Ionicons
                name="paper-plane"
                size={scale(20)}
                color={text.length <= 0 ? "gray" : "#8759F2"}
              />
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* status overlay */}
      {postingComment && (
        <StatusOverlay
          headerHeight={headerHeight}
          status={"Posting your comment..."}
          mode={mode}
        />
      )}
      {deletingComment && (
        <StatusOverlay
          headerHeight={headerHeight}
          status={"Deleting comment..."}
          loader={deletingComment}
          mode={mode}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default Comments;
