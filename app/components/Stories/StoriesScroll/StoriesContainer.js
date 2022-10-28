import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useBoundStore } from "../../../Store/useBoundStore";
import StoryCircle from "./StoryCircle";

const StoriesContainer = ({ navigation }) => {
  const data = useBoundStore((state) => state.stories);

  const renderItem = ({ index }) => {
    const s = data[index];

    return (
      <StoryCircle
        navigation={navigation}
        index={index}
        preview_url={s.preview_url}
        profile_url={s.profile_url}
        hasSeen={s.hasSeen}
        username={s.username}
      />
    );
  };
  return (
    <View style={{ marginTop: 6, marginBottom: 22.81 }}>
      <FlatList
        data={data}
        renderItem={({ index }) => renderItem((index = { index }))}
        keyExtractor={(item) => item.username}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 10,
          paddingRight: 10,
        }}
      />
    </View>
  );
};

export default StoriesContainer;

const styles = StyleSheet.create({});