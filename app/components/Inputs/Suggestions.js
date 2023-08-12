// https://github.com/dabakovich/react-native-controlled-mentions/blob/3.0.0-feat-use-mentions/example/mentions-app.tsx#L90

import { useEffect, useState } from "react";
import { View, ScrollView, Pressable, Dimensions, Alert } from "react-native";
import CustomText from "../customText/CustomText";
import { supabase } from "../../lib/supabase";

let baseUrl = "https://api.momenel.com";

const Suggestions = ({ keyword, onSelect, onLayoutFunc, pre, mode }) => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    getSuggestions();
  }, [keyword && keyword]);

  const getSuggestions = async () => {
    if (keyword !== null && keyword !== undefined) {
      // call backend to get suggestions based off keyword and {pre}
      if (keyword !== "") {
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
          navigation.navigate("Login");
          return;
        }

        let response = await fetch(
          `${baseUrl}/search/${pre === "#" ? `%23${keyword}` : pre + keyword}`,
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
      }
    } else {
      setSuggestions([]);
    }
  };

  function customOnpress(params) {
    onSelect(params);
    onLayoutFunc(0);
  }

  if (keyword == null) {
    return null;
  }

  if (suggestions.length === 0) {
    return null;
  }
  return (
    <ScrollView
      style={{
        zIndex: 2,
        maxHeight: 200,
        backgroundColor: mode === "dark" ? "#4A4A4A" : "#DDDDDD",
        width: Dimensions.get("window").width,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
      }}
      keyboardShouldPersistTaps="always"
    >
      {suggestions.map((one) => (
        <Pressable
          key={one.id}
          onPress={() =>
            customOnpress({ ...one, name: one.hashtag || one.username })
          }
          style={{
            padding: 12,
            backgroundColor: mode === "dark" ? "#4A4A4A" : "#EAEAEA",
          }}
        >
          <CustomText style={{ color: mode === "dark" ? "#E0E0E0" : "black" }}>
            {pre}
            {one.hashtag || one.username}
          </CustomText>
        </Pressable>
      ))}
    </ScrollView>
  );
};
export default Suggestions;
