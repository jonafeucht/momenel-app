import { Button, View } from "react-native";
import CustomText from "./customText/CustomText";
import GradientText from "./customText/GradientText";

const StatusOverlay = ({
  headerHeight = 0,
  status = "pending",
  message,
  showProfileButton,
  navigation,
  mode,
}) => {
  return (
    <View
      style={{
        backgroundColor: mode === "dark" ? "black" : "white",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: headerHeight,
        paddingHorizontal: "5%",
      }}
    >
      {mode === "dark" ? (
        <CustomText
          style={{
            fontSize: 22,
            fontFamily: "Nunito_800ExtraBold",
            color: "#E0E0E0",
          }}
        >
          {status}
        </CustomText>
      ) : (
        <GradientText
          style={{ fontSize: 22, fontFamily: "Nunito_600SemiBold" }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {status}
        </GradientText>
      )}
      {message && (
        <CustomText
          style={{
            fontSize: 15,
            marginTop: "2%",
            textAlign: "center",
            color: mode === "dark" ? "#E0E0E0" : "black",
          }}
        >
          {message}
        </CustomText>
      )}
      {showProfileButton && (
        <View style={{ marginTop: "5%" }}>
          <Button
            title="Visit Profile"
            onPress={() => {
              navigation.navigate("Profile");
            }}
            color={mode === "dark" ? "#E0E0E0" : "black"} // Adjust the button color if needed
          />
        </View>
      )}
    </View>
  );
};

export default StatusOverlay;
