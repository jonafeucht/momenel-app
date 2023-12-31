import React from "react";
import HomeTabNavigator from "./HomeTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Report from "../../Screens/Report";
import Zoom from "../../Screens/Zoom";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import ByUserList from "../../Screens/ByUserList";
import Comments from "../../Screens/Comments";
import CreatePost from "../../Screens/CreatePost";
import PostHeaderButton from "../components/Buttons/PostHeaderButton";
import Search from "../../Screens/Search";
import Profile from "../../Screens/Profile";
import EditProfile from "../../Screens/EditProfile";
import SettingsStackNavigator from "./SettingsStackNavigator";
import SinglePost from "../../Screens/SinglePost";
import { useBoundStore } from "../Store/useBoundStore";

const Stack = createNativeStackNavigator();

const StackNavigator = ({}) => {
  const mode = useBoundStore((state) => state.mode);
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          headerShadowVisible: false,
          headerTintColor: mode === "dark" ? "white" : "black",
          animation: "fade_from_bottom",
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#0E0E0E" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          gestureDirection: "vertical",
          headerTitle: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          gestureEnabled: false,
          headerLeft: () => (
            <Pressable
              style={{
                marginRight: 10,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingTop: 2,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="close"
                size={24}
                color={mode === "dark" ? "white" : "black"}
              />
            </Pressable>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <PostHeaderButton />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Zoom"
        component={Zoom}
        options={{
          headerLeft: () => (
            <Pressable
              style={{
                marginRight: 10,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingTop: 2,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="white" />
            </Pressable>
          ),
          animation: "fade",
          gestureDirection: "vertical",
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="UserList"
        component={ByUserList}
        options={{
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerTintColor: mode === "dark" ? "white" : "black",
          headerBackTitle: "",
          headerShadowVisible: false,
          animation: "fade_from_bottom",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#0E0E0E" : "#F9F9F9",
          },
        }}
      />

      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={{
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerBackTitle: "",
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#0E0E0E" : "#F9F9F9",
          },
        }}
      />

      <Stack.Screen
        name="UserProfile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerBackTitle: "",
          headerTitle: "Edit Profile",
          headerShadowVisible: false,
          headerTintColor: "black",
          gestureEnabled: false,
          animation: "slide_from_bottom",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#0E0E0E" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerTitleStyle: { fontFamily: "Nunito_700Bold" },
          headerBackTitle: "",
          headerShadowVisible: false,
          headerTintColor: "black",
          gestureDirection: "vertical",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingsStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
