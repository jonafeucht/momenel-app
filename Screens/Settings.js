import { ScrollView, Pressable } from "react-native";
import SettingsTab from "../app/components/Settings/SettingsTab";
import { supabase } from "../app/lib/supabase";
import CustomText from "../app/components/customText/CustomText";
import { useBoundStore } from "../app/Store/useBoundStore";

const Settings = ({ navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: mode === "dark" ? "black" : "white" }}
      contentContainerStyle={{ alignItems: "center", paddingTop: "2%" }}
    >
      <SettingsTab
        icon={"person-circle-outline"}
        title="Account"
        onPress={() => navigation.navigate("Account")}
        mode={mode}
      />

      <SettingsTab
        icon={"close-circle"}
        title="Blocked Accounts"
        onPress={() => navigation.navigate("Blocked")}
        mode={mode}
      />
      <SettingsTab
        icon={"mail"}
        title="Support"
        onPress={() => navigation.navigate("Support")}
        mode={mode}
      />
      <SettingsTab
        icon={"ios-megaphone"}
        title="Invite Friends"
        onPress={() => navigation.navigate("Invite")}
        mode={mode}
      />
      <SettingsTab
        icon={"md-phone-portrait"}
        title="Theme"
        onPress={() => navigation.navigate("ThemeSettings")}
        mode={mode}
      />

      <Pressable
        onPress={() => supabase.auth.signOut()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          paddingHorizontal: "5%",
          paddingVertical: "3%",
          backgroundColor: mode === "dark" ? "#333333" : "#e7e7e7", // Adjusting the button background color
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <CustomText
          style={{
            fontSize: 17,
            fontWeight: "bold",
            fontFamily: "Nunito_600SemiBold",
            marginLeft: 0,
            color: mode === "dark" ? "white" : "black", // Adjusting the text color
          }}
        >
          Logout
        </CustomText>
      </Pressable>
    </ScrollView>
  );
};

export default Settings;
