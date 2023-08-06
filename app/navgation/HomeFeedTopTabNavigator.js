import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../../Screens/Home";
import ForYou from "../../Screens/ForYou";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useMemo } from "react";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs({
  setHomeFeedRoute,
  followingRef,
  forYouRef,
}) {
  const insets = useSafeAreaInsets();
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
          backgroundColor: "white",
          paddingTop: insets.top + 5,
          alignContent: "center",
          justifyContent: "space-between",
        },
        tabBarIndicatorStyle: {
          borderBottomColor: "black",
          backgroundColor: "black",
        },
        lazy: true,
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
