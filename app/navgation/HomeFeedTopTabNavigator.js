import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../../Screens/Home";
import ForYou from "../../Screens/ForYou";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useBoundStore } from "../Store/useBoundStore";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs({
  setHomeFeedRoute,
  followingRef,
  forYouRef,
}) {
  const mode = useBoundStore((state) => state.mode);
  const insets = useSafeAreaInsets();
  const [color, setColor] = useState("black");
  useEffect(() => {
    if (mode === "dark") {
      setColor("white");
    } else {
      setColor("black");
    }
  }, [mode]);
  const width = useMemo(() => {
    if (Dimensions.get("window").width < 400) {
      return Dimensions.get("window").width / 3;
    } else {
      return Dimensions.get("window").width / 4;
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="ForYou"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 13, fontFamily: "Nunito_600SemiBold" },
        tabBarItemStyle: { width: width },
        tabBarStyle: {
          backgroundColor: mode === "dark" ? "#0C0C0C" : "#F9F9F9",
          paddingTop: insets.top + 5,
          alignContent: "center",
          justifyContent: "space-between",
        },
        tabBarIndicatorStyle: {
          borderBottomColor: mode === "dark" ? "white" : "black",
          backgroundColor: mode === "dark" ? "white" : "black",
        },
        lazy: true,
        tabBarActiveTintColor: mode === "dark" ? "white" : "black",
      }}
    >
      <Tab.Screen
        name="ForYou"
        options={{
          title: "For You",
        }}
        listeners={{
          focus: () => {
            setHomeFeedRoute("ForYou");
          },
        }}
      >
        {(props) => <ForYou {...props} forYouRef={forYouRef} />}
      </Tab.Screen>
      <Tab.Screen
        name="Following"
        listeners={{
          focus: () => {
            setHomeFeedRoute("Following");
          },
        }}
      >
        {(props) => <Home {...props} followingRef={followingRef} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
