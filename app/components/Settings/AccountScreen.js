import { View } from "react-native";
import React from "react";
import SettingsTab from "./SettingsTab";
import { useBoundStore } from "../../Store/useBoundStore";

const AccountScreen = ({ navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  return (
    <View
      style={{ flex: 1, backgroundColor: mode === "dark" ? "black" : "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        icon={"person-circle-outline"}
        title="Personal info"
        onPress={() => navigation.navigate("PersonalInfo")}
        mode={mode}
      />
      <SettingsTab
        icon={"md-alert-circle-outline"}
        title="Delete Account"
        onPress={() => navigation.navigate("DeleteAccount")}
        mode={mode}
      />
    </View>
  );
};

export default AccountScreen;
