import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./app/navgation/StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { PortalProvider } from "@gorhom/portal";
import { supabase } from "./app/lib/supabase";
import Auth from "./Screens/Auth";
import { useBoundStore } from "./app/Store/useBoundStore";
import SignupStackNavigator from "./app/navgation/SignupStackNavigator";
import CustomText from "./app/components/customText/CustomText";
import * as Notifications from "expo-notifications";

let baseUrl = "https://api.momenel.com";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const mode = useBoundStore((state) => state.mode);
  const setMode = useBoundStore((state) => state.setMode);
  const [isError, setisError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const hasCompletedOnboarding = useBoundStore(
    (state) => state.hasCompletedOnboarding
  );
  const setHasCompletedOnboarding = useBoundStore(
    (state) => state.setHasCompletedOnboarding
  );
  const setNotificationsNull = useBoundStore(
    (state) => state.setNotificationsNull
  );
  const SetUserData = useBoundStore((state) => state.SetUserData);
  const username = useBoundStore((state) => state.username);

  //* notifications
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("res", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    fetchModeFromStorage();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
      } else {
        setIsLoading(false);
      }
    });
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === "SIGNED_IN") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        getIntialData(session.access_token);
        if (!user.id) {
          Alert.alert("Error", "Please try again");
        }
        setSession(session);
      } else if (_event === "SIGNED_OUT") {
        setSession(null);
        SetUserData(null, null);
        setHasCompletedOnboarding(null);
        setNotificationsNull();
        setIsLoading(false);
      }
    });
  }, [session]);

  const getIntialData = async (access_token) => {
    setisError(false);
    let headersList = {
      Authorization: `Bearer ${access_token}`,
    };
    let response = await fetch(`${baseUrl}/user/intial`, {
      method: "GET",
      headers: headersList,
    });
    if (!response.ok) {
      Alert.alert("Error", "Please try again");
      setisError(true);
      setIsLoading(false);
      return;
    }
    let data = await response.json();
    if (data?.error) {
      Alert.alert("Error", "Please try again");
      setisError(true);
      setIsLoading(false);
    } else {
      SetUserData(data.username, data.profile_url);
      setHasCompletedOnboarding(data.has_onboarded);
      setIsLoading(false);
    }
  };

  const fetchModeFromStorage = async () => {
    try {
      const storedMode = await AsyncStorage.getItem("mode");
      if (storedMode !== null) {
        setMode(storedMode);
      } else {
        setMode("dark");
      }
    } catch (e) {}
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
    });
  }, []);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular: require("./assets/fonts/Nunito-Regular.ttf"),
    Nunito_500Medium: require("./assets/fonts/Nunito-Medium.ttf"),
    Nunito_600SemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    Nunito_700Bold: require("./assets/fonts/Nunito-Bold.ttf"),
    Nunito_800ExtraBold: require("./assets/fonts/Nunito-ExtraBold.ttf"),
    Nunito_900Black: require("./assets/fonts/Nunito-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color={"white"} />
      </View>
    );
  } else if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: mode === "dark" ? "#000" : "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText
          style={{
            color: mode === "dark" ? "white" : "#000",
          }}
        >
          Something went wrong
        </CustomText>
        <Button
          title="Retry"
          onPress={() => getIntialData(session.access_token)}
        />
      </View>
    );
  } else {
    return session && session.user ? (
      !username || !hasCompletedOnboarding ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <PortalProvider>
              <NavigationContainer>
                <SignupStackNavigator />
              </NavigationContainer>
            </PortalProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      ) : (
        <GestureHandlerRootView
          style={{
            flex: 1,
            backgroundColor: mode === "dark" ? "#000" : "#fff",
          }}
        >
          <SafeAreaProvider>
            <PortalProvider>
              <NavigationContainer>
                <StackNavigator />
                <StatusBar
                  style={mode === "dark" ? "light" : "dark"}
                  animated={true}
                />
              </NavigationContainer>
            </PortalProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      )
    ) : (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
          <SafeAreaProvider>
            <Auth />
            <StatusBar style="dark" animated={true} />
          </SafeAreaProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  }
}
