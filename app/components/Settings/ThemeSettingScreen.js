import { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useBoundStore } from "../../Store/useBoundStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native-gesture-handler";

const ModeSwitcher = () => {
  const mode = useBoundStore((state) => state.mode);
  const setMode = useBoundStore((state) => state.setMode);

  useEffect(() => {
    fetchModeFromStorage();
  }, []);

  const fetchModeFromStorage = async () => {
    try {
      const storedMode = await AsyncStorage.getItem("mode");
      if (storedMode !== null) {
        setMode(storedMode);
      }
    } catch (e) {}
  };

  const toggleMode = async (value) => {
    // Optimistically set the mode in the state
    const newMode = value ? "dark" : "light";
    setMode(newMode);

    try {
      await AsyncStorage.setItem("mode", newMode);
    } catch (error) {
      console.error(`Failed to set the mode to ${newMode}`, error);
      setMode(mode === "dark" ? "light" : "dark");
    }
  };

  const setDark = async () => {
    try {
      await AsyncStorage.setItem("mode", "dark");
      setMode("dark");
    } catch (error) {
      console.error("Failed to set the mode to dark", error);
    }
  };

  const setLight = async () => {
    try {
      await AsyncStorage.setItem("mode", "light");
      setMode("light");
    } catch (error) {
      console.error("Failed to set the mode to light", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        mode === "dark" ? styles.darkMode : styles.lightMode,
      ]}
    >
      <View style={styles.switchContainer}>
        <Text style={mode === "dark" ? styles.darkText : styles.lightText}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={mode === "dark" ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMode}
          value={mode === "dark"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lightMode: {
    backgroundColor: "#f5f5f5",
  },
  darkMode: {
    backgroundColor: "#333",
  },
  lightText: {
    color: "black",
    fontSize: 18,
    marginRight: 10,
  },
  darkText: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModeSwitcher;
