import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import { scale } from "../app/utils/Scale";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomText from "../app/components/customText/CustomText";
import CustomTextInput from "../app/components/Profile/CustomTextInput";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../app/lib/supabase";
import LinearGradientButton from "../app/components/Buttons/LinearGradientButton";
import { useBoundStore } from "../app/Store/useBoundStore";
import mime from "mime";

let baseUrl = "https://api.momenel.com";

const EditProfile = ({ navigation }) => {
  const mode = useBoundStore((state) => state.mode);
  const headerHeight = useHeaderHeight();
  const SetUserData = useBoundStore((state) => state.SetUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [oldData, setOldData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [imageUriChanged, setimageUriChanged] = useState(false);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [website, setWebsite] = useState(null);
  const [username, setUsername] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [Errors, setErrors] = useState([]);

  //get session
  const getData = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }
    setIsLoading(true);
    setIsChanged(false);
    setimageUriChanged(false);
    let response = await fetch(`${baseUrl}/user/editprofile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`,
      },
    });

    if (!response.ok) {
      Alert.alert("Oops", "Something went wrong!");
      return;
    }
    let { username, name, bio, website, profile_url } = await response.json();
    setErrors([]);
    setOldData({ username, name, bio, website, profile_url });
    setUsername(username);
    setName(name);
    setBio(bio);
    setWebsite(website);
    setImageUri(profile_url);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (
      oldData.username !== username ||
      oldData.name !== name ||
      oldData.bio !== bio ||
      oldData.website !== website ||
      oldData.profile_url !== imageUri ||
      imageUriChanged
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
    setErrors([]);
    // handle errors
    if (name?.length > 60) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: "Name cannot be more than 60 characters",
          type: "name",
        },
      ]);
    }

    if (bio?.length > 300) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: "Bio cannot be more than 300 characters",
          type: "bio",
        },
      ]);
    }

    if (website && !isValidURL(website)) {
      if (website.trim() === "") return;

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: "Invalid URL",
          type: "link",
        },
      ]);
    }
  }, [username, name, bio, website, imageUri]);

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      base64: false,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setImageUri(result.assets[0].uri);
      setimageUriChanged(true);
    }
  };

  const removeProfileImage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setImageUri(null);
    setimageUriChanged(true);
  };

  function isValidURL(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
        "localhost|" + // localhost
        "(\\d{1,3}\\.){3}\\d{1,3})" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%@_.~+&:]*)*" + // port and path
        "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    try {
      return pattern.test(new URL(url).href);
    } catch (e) {
      return !!pattern.test(url);
    }
  }

  const handleUsernameChange = async (text) => {
    // remove errors of type username
    setErrors(Errors.filter((error) => error.type !== "username"));
    setUsername(text);

    // handle and show errors
    if (text.trim() === "") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: "Username cannot be empty",
          type: "username",
        },
      ]);
      return;
    } else if (text.length > 38) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: "Username cannot be more than 38 characters",
          type: "username",
        },
      ]);
      return;
    } else if (text.includes(" ")) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: "Username cannot contain spaces",
          type: "username",
        },
      ]);
      return;
    } else if (!text.match(/^[a-zA-Z0-9_]+$/)) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: "Username can only contain letters, numbers and underscores",
          type: "username",
        },
      ]);
      return;
    }

    if (text === oldData.username) return;

    // check if username is available
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return navigation.navigate("Login");
    }

    try {
      let response = await fetch(`${baseUrl}/user/checkUsername/${text}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });
      if (!response.ok) {
        response = await response.json();
        throw new Error(response.error);
      }
      response = await response.json();
    } catch (error) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setErrors([
        ...Errors,
        {
          message: error.message,
          type: "username",
        },
      ]);
    }
  };

  //handle submit
  const handleSubmit = async () => {
    if (!isChanged || username === "" || Errors.length > 0) {
      return;
    }
    setErrors([]);
    if (username?.length < 1) {
      setErrors([
        ...Errors,
        {
          message: "Username is required",
          type: "username",
        },
      ]);
      setIsChanged(false);
      return;
    }
    if (website?.length > 0 && !isValidURL(website)) {
      setErrors([
        ...Errors,
        {
          message: "Invalid URL",
          type: "link",
        },
      ]);
      setIsChanged(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        return navigation.navigate("Login");
      }

      let bodyContent = new FormData();
      bodyContent.append("username", username);
      bodyContent.append("name", name);
      bodyContent.append("bio", bio);
      bodyContent.append("website", website);

      if (imageUriChanged && imageUri) {
        const newImageUri = "file:///" + imageUri.split("file:/").join("");
        bodyContent.append("profile", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
        });

        bodyContent.append("deleteProfile", false);
      } else if (imageUriChanged && imageUri === null) {
        bodyContent.append("deleteProfile", true);
      } else {
        bodyContent.append("deleteProfile", false);
      }

      setIsLoading(true);
      let response = await fetch(`${baseUrl}/user/editprofile`, {
        method: "POST",
        body: bodyContent,
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${data.session.access_token}`,
        },
      });

      if (!response.ok) {
        response = await response.json();
        throw new Error(response.error);
      }

      let newData = await response.json();
      SetUserData(newData.username, newData.profile_url);
      setOldData(
        newData.username,
        newData.name,
        newData.bio,
        newData.website,
        newData.profile_url
      );
      setUsername(newData.username);
      setName(newData.name);
      setBio(newData.bio);
      setWebsite(newData.website);
      setImageUri(newData.profile_url);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsLoading(false);
      setIsChanged(false);
      setimageUriChanged(false);
    } catch (error) {
      setIsLoading(false);
      setIsChanged(false);
      setimageUriChanged(false);
      Alert.alert("oops", `${error.message}`, [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  // memoize scale
  const scaledSize = useMemo(() => scale(155), []);

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: mode === "dark" ? "#0E0E0E" : "white",
      }}
    >
      {isLoading ? (
        <View
          style={{
            height: "100%",
            backgroundColor: mode === "dark" ? "black" : "white",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: headerHeight,
          }}
        >
          <ActivityIndicator color={mode === "dark" ? "white" : "black"} />
        </View>
      ) : (
        <ScrollView
          style={{
            height: "100%",
            backgroundColor: mode === "dark" ? "#black" : "white",
          }}
          keyboardDismissMode={"on-drag"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* profile image */}
          {!imageUri && (
            <Pressable
              onPress={pickProfileImage}
              style={{
                marginLeft: "3%",
                height: scaledSize,
                width: scaledSize,
                borderRadius: scaledSize / 2,
                backgroundColor: mode === "dark" ? "#0E0E0E" : "white",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: "4%",
                borderWidth: 2,
                borderColor: "#999999",
              }}
            >
              <Ionicons
                name="ios-person-add"
                size={scale(50)}
                color="#999999"
              />
            </Pressable>
          )}
          {imageUri && (
            <View
              style={{
                marginLeft: "3%",
                width: scaledSize,
                height: scaledSize,
                alignSelf: "center",
                marginTop: "4%",
              }}
            >
              <Image
                source={
                  imageUri
                    ? {
                        uri: imageUri.startsWith("file://")
                          ? imageUri
                          : `https://cdn.momenel.com/profiles/${imageUri}`,
                      }
                    : null
                }
                contentFit="cover"
                style={{
                  height: scaledSize,
                  width: scaledSize,
                  borderRadius: scaledSize / 2,
                  borderColor: "white",
                  borderWidth: 6,
                  backgroundColor: "white",
                  alignItems: "flex-end",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: -scaledSize / 3,
                }}
              >
                <Pressable
                  style={{
                    width: scale(25),
                    height: scale(25),
                    borderRadius: 20,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                  }}
                  onPress={removeProfileImage}
                >
                  <Ionicons name="trash" size={scale(18)} color="red" />
                </Pressable>
                <Pressable
                  style={{
                    width: scale(25),
                    height: scale(25),
                    borderRadius: 20,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                  }}
                  onPress={pickProfileImage}
                >
                  <Ionicons name="camera" size={scale(18)} color="black" />
                </Pressable>
              </View>
            </View>
          )}
          <View
            style={{ width: "100%", paddingHorizontal: "5%", marginTop: "6%" }}
          >
            <CustomTextInput
              title="Name"
              placeholder="Optional"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              errors={Errors}
            />
            <CustomTextInput
              title="Username"
              placeholder="This is unique to you"
              value={username}
              onChangeText={(text) => {
                handleUsernameChange(text);
              }}
              errors={Errors}
            />
            <CustomTextInput
              title="Bio"
              placeholder="Introduce yourself to the world 👋"
              value={bio}
              onChangeText={(text) => {
                setBio(text);
              }}
              multiLine={true}
              errors={Errors}
            />

            <CustomTextInput
              title="Link"
              placeholder="https://..."
              value={website}
              keyboardType="url"
              onChangeText={(text) => {
                setWebsite(text);
              }}
              errors={Errors}
            />
          </View>
          <Pressable
            style={{ width: "100%", paddingHorizontal: "10%", marginTop: "6%" }}
            disabled={!isChanged || username === "" || Errors.length > 0}
            onPress={handleSubmit}
          >
            <LinearGradientButton
              disabled={!isChanged || username === "" || Errors.length > 0}
            >
              <CustomText style={{ color: "white" }}>Save</CustomText>
            </LinearGradientButton>
          </Pressable>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
