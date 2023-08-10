import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiscoverIcon from "../components/icons/DiscoverIcon";
import HomeIcon from "../components/icons/HomeIcon";
import TabBarProfileIcon from "../components/TabBarProfileIcon";
import NotificationsIcon from "../components/icons/Notifications";
import PlaceholderScreen from "../components/PlaceholderScreen";
import Discover from "../../Screens/Discover";
import Profile from "../../Screens/Profile";
import Notifications from "../../Screens/Notifications";
import HomeTabs from "./HomeFeedTopTabNavigator";
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import { useBoundStore } from "../Store/useBoundStore";

const Tab = createBottomTabNavigator();

const HomeNavigator = ({ navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  const Height = Dimensions.get("window").height * 0.024;
  const IconSize = Height > 21 ? 21 : Height < 18 ? 18 : Height;
  const forYouRef = useRef(null);
  const followingRef = useRef(null);
  const [routeName, setRouteName] = useState("Feed");
  const [homeFeedRoute, setHomeFeedRoute] = useState("ForYou");
  const [color, setColor] = useState("black");

  useEffect(() => {
    if (mode === "dark") {
      setColor("white");
    } else {
      setColor("black");
    }
  }, [mode]);
  const scrollToTop = () => {
    if (routeName === "Feed") {
      if (homeFeedRoute === "ForYou") {
        console.log("for you");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        forYouRef.current?.scrollToOffset({ offset: 0, animated: true });
      } else {
        console.log("following");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        followingRef.current?.scrollToOffset({ offset: 0, animated: true });
      }
    }
  };
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: mode === "dark" ? "#0E0E0E" : "#F9F9F9",
          paddingVertical: 0,
          borderTopColor: mode === "dark" ? "#2A2A2A" : "#F9F9F9",
        },
        headerTitleStyle: { fontFamily: "Nunito_700Bold" },
        freezeOnBlur: true,
      }}
    >
      <Tab.Screen
        name="Feed"
        options={{
          unmountOnBlur: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            {
              return (
                <HomeIcon
                  color={focused ? color : "none"}
                  isSelected={focused}
                  size={IconSize}
                  strokeColor={focused ? color : "#A6A6A6"}
                />
              );
            }
          },
        }}
        listeners={{
          tabLongPress: () => {
            scrollToTop();
          },
          focus: () => {
            setRouteName("Feed");
          },
        }}
      >
        {(props) => (
          <HomeTabs
            {...props}
            forYouRef={forYouRef}
            followingRef={followingRef}
            navigation={navigation}
            setHomeFeedRoute={setHomeFeedRoute}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ size, focused }) => {
            {
              return (
                <DiscoverIcon
                  color={focused ? color : "none"}
                  isSelected={focused}
                  size={IconSize}
                  strokeColor={focused ? color : "#A6A6A6"}
                />
              );
            }
          },
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            setRouteName("Discover");
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={PlaceholderScreen}
        options={{
          title: "",
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: () => {
            {
              return (
                <Ionicons name="create" size={IconSize + 6} color="#A8A8A8" />
              );
            }
          },
          unmountOnBlur: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("CreatePost");
          },
          focus: () => {
            setRouteName("Create");
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => {
            {
              return (
                <NotificationsIcon
                  size={IconSize}
                  focused={focused}
                  color={focused ? color : "#A8A8A8"}
                />
              );
            }
          },
        }}
        listeners={{
          focus: () => {
            setRouteName("Notifications");
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => {
            {
              return <TabBarProfileIcon size={IconSize} focused={focused} />;
            }
          },
          unmountOnBlur: true,
        }}
        listeners={{
          focus: () => {
            setRouteName("Profile");
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
