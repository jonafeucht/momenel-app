import React, { memo } from "react";
import CustomText from "../customText/CustomText";
import { useBoundStore } from "../../Store/useBoundStore";

const StructuredText = memo(
  ({ maxCharCount, style, children, mentionHashtagPress }) => {
    const mode = useBoundStore((state) => state.mode);

    const prepareText = (text, mentionHashtagPress) => {
      const result = [];
      let shouldAddMore = false;

      let tempStr;
      if (text.length > maxCharCount) {
        tempStr = text.substring(0, maxCharCount) + "...";
        shouldAddMore = true;
      } else {
        tempStr = text;
        shouldAddMore = false;
      }

      let lastIndex = 0;

      const regex = /(https?:\/\/\S+|www\.\S+|@\S+|#\S+|\*\*(.*?)\*\*)/gi;
      let match;

      while ((match = regex.exec(tempStr)) !== null) {
        const matchedText = match[0];
        const plainText = tempStr.substring(lastIndex, match.index);

        if (plainText) {
          result.push(plainText);
        }

        if (matchedText.startsWith("**") && matchedText.endsWith("**")) {
          result.push(
            <CustomText
              key={match.index}
              style={{ fontFamily: "Nunito_900Black", fontSize: 20 }}
            >
              {matchedText.replace(/\*\*/g, "")}
            </CustomText>
          );
        } else {
          result.push(
            <Mention
              key={match.index}
              mentionHashtagColor={mode === "dark" ? "#986BFF" : "#8759F2"}
              mentionHashtagPress={mentionHashtagPress}
              text={matchedText}
              style={style}
            />
          );
        }

        lastIndex = match.index + matchedText.length;
      }

      const remainingText = tempStr.substring(lastIndex);
      if (remainingText) {
        result.push(remainingText);
      }

      if (shouldAddMore) {
        result.push(
          <Mention
            key={"more"}
            mentionHashtagPress={mentionHashtagPress}
            text={"more"}
          />
        );
      }

      return result;
    };

    return (
      <CustomText
        style={[
          style,
          { fontFamily: "Nunito_400Regular" },
          mode === "dark" && { color: "#E4E3E4" },
        ]}
        selectable={true}
      >
        {prepareText(children, mentionHashtagPress)}
      </CustomText>
    );
  }
);

const Mention = (props) => {
  return (
    <CustomText
      style={[
        {
          color: props.mentionHashtagColor
            ? props.mentionHashtagColor
            : "#8759F2",
          fontFamily: "Nunito_600SemiBold",
        },
        props.style,
      ]}
      onPress={() => {
        if (props.mentionHashtagPress) {
          props.mentionHashtagPress(props.text);
        }
      }}
    >
      {props.text}
    </CustomText>
  );
};

export default StructuredText;
