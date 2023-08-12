import { View } from "react-native";

import SettingsTab from "./SettingsTab";
import { useBoundStore } from "../../Store/useBoundStore";

const PersonalInfo = ({ navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  return (
    <View
      style={{ flex: 1, backgroundColor: mode === "dark" ? "black" : "white" }}
    >
      <SettingsTab
        icon={"mail"}
        title="Email Address"
        onPress={() => navigation.navigate("Email")}
        mode={mode}
      />
      <SettingsTab
        icon={"md-today"}
        title="Birthday"
        onPress={() => navigation.navigate("Birthday")}
        mode={mode}
      />
    </View>
  );
};

export default PersonalInfo;
