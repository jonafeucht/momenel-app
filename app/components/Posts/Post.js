import { Animated, Dimensions, FlatList, Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useMemo, useRef, useState } from "react";
import PostHeader from "./PostHeader";
import PostMedia from "./postMedia/PostMedia";
import PaginationDot from "./PaginationDot";
import StructuredText from "./StructuredText";
import CommentsIcon from "../icons/CommentsIcon";
import Repost from "../icons/Repost";
import CustomText from "../customText/CustomText";
import Heart from "../icons/Heart";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scale } from "../../utils/Scale";
import DetachedBottomSheetWithScroll from "../BottomFlatSheet/DetachedBottomSheetWithScroll";
import { useRoute } from "@react-navigation/native";
import { CalcHeight } from "../../utils/CalcHeight";
import { useBoundStore } from "../../Store/useBoundStore";

const ScreenWidth = Dimensions.get("window").width;

const Post = ({
  navigation,
  postId,
  isLiked,
  likes,
  comments,
  index,
  repost,
  profileUrl,
  reposts,
  username,
  name,
  createdAt,
  posts,
  caption,
  isReposted,
  published,
  height,
  width,
  handleLike,
  handleRepost,
  onDeletePress,
  isPublished,
}) => {
  const mode = useBoundStore((state) => state.mode);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const FontSize = useMemo(() => scale(14), []);
  const route = useRoute();
  let scaledHeight = useMemo(() => CalcHeight(width, height), [width]);
  // for pagination dots
  const scrollX = useRef(new Animated.Value(0)).current;

  /**
   * If the user has liked the post, then the user can unlike the post. If the user has not liked the
   * post, then the user can like the post
   * --> for double Tap only. Pressing heart icon will not trigger this function
   * --> Heart icon press fucntion is in Heart.js
   */
  const handleLikeFunc = () => {
    if (isLiked === true) {
      handleLike(index, isLiked, postId);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      handleLike(index, isLiked, postId);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const doubleTap = () => {
    handleLikeFunc();
  };

  const handleRepostFunc = async () => {
    if (isReposted === false) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await handleRepost(index, isReposted, postId);
  };

  // if more than 1 post
  const renderItem = ({ item, index }) => {
    return (
      <PostMedia
        navigation={navigation}
        username={username}
        url={
          item.type === "image"
            ? `https://cdn.momenel.com/posts/${item.id}.${item.format}`
            : `https://vz-a01f66e8-ba0.b-cdn.net/${item.id}/playlist.m3u8`
        }
        type={item.type}
        doubleTap={doubleTap}
        height={scaledHeight}
        index={index}
        blurhash={item.blurhash}
      />
    );
  };

  const _doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .maxDuration(250)
    .onStart(() => {
      doubleTap();
    });

  const keyExtractor = useCallback((item) => item.id, []);

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const mentionHashtagClick = async (text) => {
    setShowBottomSheet(false);
    if (text.startsWith("http")) {
      try {
        _handlePressButtonAsync(text);
      } catch (error) {}
    } else if (text.startsWith("www")) {
      try {
        _handlePressButtonAsync("https://" + text);
      } catch (error) {}
    } else if (text.startsWith("@")) {
      navigation.navigate("UserProfile", { id: text.slice(1) });
    } else if (text.startsWith("#")) {
      if (route.name === "Search") {
        navigation.replace("Search", {
          type: "hashtag",
          query: text[0] === "#" ? text.slice(1) : text,
        });
      } else {
        navigation.navigate("Search", {
          type: "hashtag",
          query: text[0] === "#" ? text.slice(1) : text,
        });
      }
    } else if (text.startsWith("more")) {
      setShowBottomSheet(true);
    } else {
    }
  };

  function kFormatter(num) {
    return Math.abs(num) <= 9999
      ? // ? num.toLocaleString()
        num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : // num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      Math.abs(num) > 9999 && Math.abs(num) <= 999940
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.abs(num) > 999940 //999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(2) + "M"
      : Math.sign(num) * Math.abs(num);
  }

  function handleComments() {
    navigation.navigate("Comments", { type: "post", postId: postId });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  const onReportPress = () => {
    navigation.navigate("Report", {
      contentId: postId,
      username: username,
      contentType: "post",
    });
  };
  if (published && !published) return null;
  return (
    <View
      style={{
        backgroundColor: mode === "dark" ? "#000000" : "#FFFFFF",
        width: "100%",
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* reposts */}
      {repost && (
        <Pressable
          onPress={() =>
            navigation.navigate("UserProfile", { id: repost.username })
          }
          style={{
            paddingHorizontal: ScreenWidth * 0.05,
            paddingBottom: 3,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Repost
            size={FontSize + 4}
            color={mode === "dark" ? "#986BFF" : "#8456E9"}
          />
          <CustomText
            style={{
              fontFamily: "Nunito_700Bold",
              color: mode === "dark" ? "#A6A6A6" : "#999999",
              marginLeft: "1%",
              fontSize: FontSize - 2,
            }}
          >
            {repost.username} reposted
          </CustomText>
        </Pressable>
      )}

      {!isPublished && (
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View
            style={[
              {
                paddingHorizontal: ScreenWidth * 0.05,
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "4%",
                borderRadius: 100,
              },
              isPublished === false
                ? { backgroundColor: "#FFD600" }
                : { backgroundColor: "#DD2C00" },
            ]}
          >
            <CustomText
              style={[
                {
                  fontSize: 14,
                },
                isPublished === false ? { color: "black" } : { color: "white" },
              ]}
            >
              {isPublished === false ? "Processing" : "Processing failed"}
            </CustomText>
          </View>
        </View>
      )}
      <PostHeader
        navigation={navigation}
        profileUrl={profileUrl}
        username={username}
        name={name}
        createdAt={createdAt}
        index={index}
        onReportPress={onReportPress}
        onDeletePress={onDeletePress}
      />
      {/* caption */}
      {caption && (
        <View
          style={{
            paddingHorizontal: ScreenWidth * 0.06,
            width: ScreenWidth,
            paddingBottom: 6,
          }}
        >
          <GestureDetector gesture={_doubleTap}>
            <View>
              <StructuredText
                mentionHashtagPress={mentionHashtagClick}
                mentionHashtagColor={"#8759F2"}
                maxCharCount={posts?.length === 0 ? 250 : 200}
                style={
                  posts?.length === 0
                    ? { fontSize: FontSize + 2 }
                    : { fontSize: FontSize }
                }
              >
                {caption}
              </StructuredText>
            </View>
          </GestureDetector>
        </View>
      )}
      {/* media */}
      {posts && posts.length >= 2 ? (
        <FlatList
          data={posts}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="end"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      ) : posts && posts.length >= 1 && isPublished ? (
        <PostMedia
          navigation={navigation}
          username={username}
          url={
            posts[0].type === "image"
              ? `https://cdn.momenel.com/posts/${posts[0].id}.${posts[0].format}`
              : `https://vz-a01f66e8-ba0.b-cdn.net/${posts[0].id}/playlist.m3u8`
          }
          posterUrl={
            posts[0].type === "video"
              ? `https://vz-a01f66e8-ba0.b-cdn.net/${posts[0].id}/thumbnail.jpg`
              : null
          }
          type={posts[0].type}
          doubleTap={doubleTap}
          height={scaledHeight}
          index={0}
          blurhash={posts[0].blurhash}
        />
      ) : (
        <></>
      )}
      {/* pagination dots */}
      {posts && posts.length > 1 && (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            paddingBottom: 11,
          }}
        >
          <PaginationDot data={posts} scrollX={scrollX} />
        </View>
      )}

      {/* buttons */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingLeft: ScreenWidth * 0.05,
          paddingRight: ScreenWidth * 0.06,
          marginBottom: 5,
          alignItems: "center",
          height: 30,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "2%",
          }}
        >
          <Heart isLiked={isLiked} onPress={handleLikeFunc} size={23} />
          <Pressable
            onPress={() =>
              navigation.navigate("UserList", { type: "likes", Id: postId })
            }
            style={{ marginLeft: 5 }}
          >
            <CustomText
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: FontSize - 1,
                marginRight: 9,
                color: mode === "dark" ? "#BABABA" : "#999999",
              }}
            >
              {kFormatter(likes)}
            </CustomText>
          </Pressable>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "2%",
          }}
        >
          <Pressable onPress={handleComments}>
            <CommentsIcon size={21} />
          </Pressable>
          <Pressable onPress={handleComments} style={{ marginLeft: 5 }}>
            <CustomText
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: FontSize - 1,
                marginRight: 9,
                color: mode === "dark" ? "#BABABA" : "#999999",
              }}
            >
              {kFormatter(comments)}
            </CustomText>
          </Pressable>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginRight: "2%",
          }}
        >
          <Pressable onPress={handleRepostFunc}>
            <Repost
              size={25}
              color={
                isReposted ? "#986BFF" : mode === "dark" ? "#BABABA" : "#999"
              }
            />
          </Pressable>
          {reposts >= 1 && (
            <Pressable
              style={{ marginLeft: 5 }}
              onPress={() =>
                navigation.navigate("UserList", {
                  type: "reposts",
                  Id: postId,
                })
              }
            >
              <CustomText
                style={{
                  fontFamily: "Nunito_700Bold",
                  fontSize: FontSize - 1,
                  marginRight: 9,
                  color: mode === "dark" ? "#BABABA" : "#999999",
                }}
              >
                {kFormatter(reposts)}
              </CustomText>
            </Pressable>
          )}
        </View>
      </View>
      <DetachedBottomSheetWithScroll
        show={showBottomSheet}
        onSheetClose={() => setShowBottomSheet(false)}
      >
        <View
          style={[
            {
              paddingHorizontal: "5%",
              paddingTop: "2%",
              paddingBottom: "5%",
            },
          ]}
        >
          <StructuredText
            mentionHashtagPress={mentionHashtagClick}
            mentionHashtagColor={"#8759F2"}
            style={{
              fontSize: FontSize + 2,
            }}
          >
            {caption}
          </StructuredText>
        </View>
      </DetachedBottomSheetWithScroll>
    </View>
  );
};

export default Post;
