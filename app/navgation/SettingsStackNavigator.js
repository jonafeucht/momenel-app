import React from "react";
import Settings from "../../Screens/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AccountScreen from "../components/Settings/AccountScreen";
import PersonalInfo from "../components/Settings/PersonalInfo";
import DeleteAccount from "../components/Settings/DeleteAccount";
import BlockedAccounts from "../components/Settings/BlockedAccounts";
import SupportScreen from "../components/Settings/SupportScreen";
import InviteScreen from "../components/Settings/InviteScreen";
import ThemeSettingScreen from "../components/Settings/ThemeSettingScreen";
import { scale } from "../utils/Scale";
import ChangeEmail from "../components/Settings/ChangeEmail";
import ChangeBirthday from "../components/Settings/ChangeBirthday";
import CustomText from "../components/customText/CustomText";
import { useBoundStore } from "../Store/useBoundStore";

const Stack = createNativeStackNavigator();

const BackButton = ({ onPress, mode }) => (
  <Pressable
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Ionicons
      name="chevron-back"
      size={scale(28)}
      color="black"
      style={{
        marginLeft: -scale(10),
        color: mode === "dark" ? "white" : "black",
      }}
    />
    <CustomText
      style={{
        fontSize: scale(24),
        fontFamily: "Nunito_700Bold",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      Settings
    </CustomText>
  </Pressable>
);

const SettingsStackNavigator = ({ navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={({}) => ({
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
      })}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShadowVisible: false,
          headerLeft: () => (
            <BackButton onPress={() => navigation.goBack()} mode={mode} />
          ),
          title: "",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="Email"
        component={ChangeEmail}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: "black",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="Birthday"
        component={ChangeBirthday}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />

      <Stack.Screen
        name="Blocked"
        component={BlockedAccounts}
        options={{
          headerTitle: "Blocked Accounts",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="Invite"
        component={InviteScreen}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{
          headerTitle: "Personal Info",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerTitle: "Delete Account",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
      <Stack.Screen
        name="ThemeSettings"
        component={ThemeSettingScreen}
        options={{
          headerTitle: "Theme",
          headerShadowVisible: false,
          headerBackTitle: "",
          headerTintColor: mode === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#F9F9F9",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
