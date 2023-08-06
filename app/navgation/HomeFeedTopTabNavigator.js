import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../../Screens/Home";
import ForYou from "../../Screens/ForYou";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { useMemo } from "react";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs() {
  const insets = useSafeAreaInsets();
  const width = useMemo(() => Dimensions.get("window").width / 4, []);
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
        component={ForYou}
        options={{
          title: "For You",
        }}
      />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
