// Description: This screen will show the list of users who liked the post or reposted the post or tipped the post.

import { ActivityIndicator, Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import UserList from "../app/components/UserList";
import * as Haptics from "expo-haptics";
import CustomText from "../app/components/customText/CustomText";
import { scale } from "../app/utils/Scale";
import { supabase } from "../app/lib/supabase";
import { useBoundStore } from "../app/Store/useBoundStore";

let baseUrl = "https://api.momenel.com";

const ByUserList = ({ route, navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  const { type, Id } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    let response;
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    // fetch data
    if (type === "likes") {
      navigation.setOptions({ title: "Likes" });
      response = await fetch(`${baseUrl}/like/${Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    } else if (type === "reposts") {
      navigation.setOptions({ title: "Reposts" });
      response = await fetch(`${baseUrl}/repost/${Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    } else if (type === "followers") {
      navigation.setOptions({
        title: `Followers`,
      });
      response = await fetch(`${baseUrl}/followuser/followers/${Id}`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    } else if (type === "following") {
      navigation.setOptions({
        title: `Following`,
      });
      response = await fetch(`${baseUrl}/followuser/following`, {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });
    }
    response = await response.json();
    if (response.error) {
      Alert.alert("Error", response.error);
    }
    setData(response);
    setIsLoading(false);
  };

  const kFormatter = (num) => {
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleFollowPress = async (id) => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      navigation.navigate("Login");
      return false;
    }
    // update the state
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newData = data.map((item) => {
      if (item.user.id === id) {
        return {
          ...item,
          isFollowed: !item.isFollowed,
        };
      }
      return item;
    });
    setData(newData);

    let response = await fetch(`${baseUrl}/followuser/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.session.access_token}`,
      },
    });

    if (response.status === 201) {
      const newData = data.map((item) => {
        if (item.user.id === id) {
          return {
            ...item,
            isFollowed: true,
          };
        }
        return item;
      });
      setData(newData);
    } else {
      const newData = data.map((item) => {
        if (item.user.id === id) {
          return {
            ...item,
            isFollowed: false,
          };
        }
        return item;
      });
      setData(newData);
    }
  };

  const renderItem = ({ item, isFollowing }) => {
    return (
      <UserList
        type={type}
        id={item.user.id}
        username={item.user.username}
        profile_url={`https://cdn.momenel.com/profiles/${item.user.profile_url}`}
        isFollowing={isFollowing}
        onPress={handleFollowPress}
        navigation={navigation}
      />
    );
  };

  const renderHeaderComponent = () => {
    if (type === "followers" || type === "following") {
      return (
        <View style={{ marginHorizontal: "5%", marginVertical: "2%" }}>
          <CustomText
            style={{
              fontFamily: "Nunito_800ExtraBold",
              fontSize: scale(25),
              color: mode === "dark" ? "white" : "black",
            }}
          >
            {kFormatter(data.length)}
          </CustomText>
          <CustomText
            style={{
              fontFamily: "Nunito_500Medium",
              fontSize: scale(15),
              color: mode === "dark" ? "white" : "black",
            }}
          >
            {type === "followers" ? "Followers" : "Following"}
          </CustomText>
        </View>
      );
    } else {
      return null;
    }
  };

  // return of isLoading
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: mode === "dark" ? "black" : "white",
        }}
      >
        <ActivityIndicator
          color={mode === "dark" ? "white" : "black"}
          style={{ marginTop: "2%" }}
        />
      </View>
    );
  }

  const handleRefresh = () => {
    getData();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: mode === "dark" ? "black" : "white",
      }}
    >
      <FlashList
        ListHeaderComponent={renderHeaderComponent}
        data={data}
        renderItem={({ item }) =>
          renderItem({
            item,
            isFollowing: item.isFollowed,
          })
        }
        estimatedItemSize={69}
        onRefresh={handleRefresh}
        refreshing={isLoading}
      />
    </View>
  );
};

export default ByUserList;
