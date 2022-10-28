import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BottomFlatSheet from "../app/components/BottomFlatSheet/BottomSheet";
import HorizontalStories from "../app/components/Stories/HorizontalStories";
import { useBoundStore } from "../app/Store/useBoundStore";

const PAGE_HEIGHT = Dimensions.get("window").height;

const Stories = ({ navigation, route }) => {
  console.log(route.params.snapToIndex);
  const data = useBoundStore((state) => state.stories);
  const fetchStories = useBoundStore((state) => state.fetchStories);

  const storyFlatlistRef = useRef();
  const [showSheet, setShowSheet] = useState(false);

  const insets = useSafeAreaInsets();

  const scrollToNext = (index) => {
    if (index !== data.length) {
      storyFlatlistRef.current.scrollToIndex({ animated: true, index: index });
    } else {
      storyFlatlistRef.current.scrollToEnd();
    }
  };

  const openSheet = (id) => {
    console.log("clicked");
    // console.log("modal", id);
    setShowSheet(!showSheet);
  };

  const onSheetClose = (id) => {
    console.log("closed");
    setShowSheet(false);
  };

  const renderItem = ({ index }) => {
    const s = data[index];
    return (
      <HorizontalStories
        index={index}
        navigation={navigation}
        data={s.stories}
        username={s.username}
        profile_url={s.profile_url}
        scrollToNext={scrollToNext}
        openSheet={openSheet}
        showSheet={showSheet}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        fontFamily: "Nunito_400Regular",
      }}
    >
      <StatusBar style="light" />
      <FlatList
        data={data}
        ref={storyFlatlistRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={route.params.snapToIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 700));
          wait.then(() => {
            storyFlatlistRef.current?.scrollToIndex({
              index: info.index,
              animated: true / false,
            });
          });
        }}
        renderItem={({ index }) => renderItem((index = { index }))}
        keyExtractor={(item) => item.username}
        snapToAlignment="start"
        onEndReached={() => fetchStories()}
        onEndReachedThreshold={2}
        decelerationRate={"fast"}
        initialNumToRender={10}
        //! -10 equals height of item seperator
        snapToInterval={PAGE_HEIGHT - (insets.bottom + insets.top - 10)}
        ListFooterComponent={() => {
          return (
            <Text
              style={{
                color: "white",
              }}
            >
              lOADING MORE
            </Text>
          );
        }}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 10,
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({});
