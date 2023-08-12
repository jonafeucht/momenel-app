import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Share, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import CustomText from "../customText/CustomText";
import LinearGradientButton from "../../components/Buttons/LinearGradientButton";
import { useBoundStore } from "../../Store/useBoundStore";

const InviteFriendsScreen = () => {
  const mode = useBoundStore((state) => state.mode);
  const [link, setLink] = useState("");
  const username = useBoundStore((state) => state.username);

  useEffect(() => {
    setLink(`https://momenel.com/download`);
  }, []);

  const handleCopyLink = () => {
    Clipboard.setStringAsync(link);
    Alert.alert("Link copied", "The link has been copied to your clipboard.");
  };

  const handleShare = () => {
    Share.share({
      message: `Hey! Join me on Momenel, a privacy-first and open source social media app. My username is @${username}. \nDownload the app here: ${link}`,
      title: "Join me on Momenel!",
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        alignItems: "center",
        backgroundColor: mode === "dark" ? "#333333" : "#fff",
        paddingTop: "5%",
      }}
    >
      <CustomText
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
          color: mode === "dark" ? "white" : "black",
        }}
      >
        Invite Friends 📧
      </CustomText>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 16,
          color: mode === "dark" ? "white" : "black",
        }}
      >
        Share this link with your friends to invite them to join:
      </Text>
      <Pressable
        style={{
          padding: 8,
          borderWidth: 1,
          borderColor: mode === "dark" ? "#555555" : "#ddd",
          borderRadius: 8,
          marginBottom: 16,
          alignSelf: "stretch",
          backgroundColor: mode === "dark" ? "#444444" : "#fff",
        }}
        onPress={handleCopyLink}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#007aff",
            textDecorationLine: "underline",
          }}
        >
          {link} {`\n(click to copy)`}
        </Text>
      </Pressable>
      <Pressable
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: "5%",
        }}
        onPress={handleShare}
      >
        <LinearGradientButton
          style={{
            width: "100%",
            marginTop: "5%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CustomText
            style={{
              color: "white",
              fontFamily: "Nunito_700Bold",
              fontSize: 17,
              marginRight: "2%",
            }}
          >
            Share
          </CustomText>
        </LinearGradientButton>
      </Pressable>
    </View>
  );
};

export default InviteFriendsScreen;
