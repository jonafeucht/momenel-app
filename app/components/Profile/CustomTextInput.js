import { View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../customText/CustomText";
import { useBoundStore } from "../../Store/useBoundStore";

const CustomTextInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  multiLine = false,
  errors,
  keyboardType,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const mode = useBoundStore((state) => state.mode);

  useEffect(() => {
    errors.map((error) => {
      if (error.type === title.toLowerCase()) {
        setErrorMessage(error.message);
      }
    });
  }, [errors]);

  const OnChangeTextWrapper = (text) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    onChangeText(text);
  };
  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: mode === "dark" ? "#0E0E0E" : "white",
      }}
    >
      <View
        style={{
          height: 28,
          justifyContent: "flex-end",
        }}
      >
        {errorMessage && (
          <CustomText
            style={{
              color: "red",
              fontSize: 13,
              fontFamily: "Nunito_400Regular",
            }}
          >
            {errorMessage}
          </CustomText>
        )}
      </View>
      <CustomText
        style={{
          color: mode === "dark" ? "#8A8A8A" : "black",
        }}
      >
        {title}
      </CustomText>
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: errorMessage
            ? "red"
            : mode === "dark"
            ? "#666666"
            : "#999999",
          color: errorMessage ? "red" : mode === "dark" ? "white" : "black",
          fontFamily: "Nunito_600SemiBold",
          fontSize: 15,
          marginTop: "2%",
          paddingBottom: "3%",
          maxHeight: multiLine ? 150 : 50,
        }}
        multiline={multiLine}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        onChangeText={OnChangeTextWrapper}
        value={value}
        autoCapitalize="none"
        keyboardType={keyboardType ? keyboardType : "default"}
        scrollEnabled={false}
      />
    </View>
  );
};

export default CustomTextInput;
