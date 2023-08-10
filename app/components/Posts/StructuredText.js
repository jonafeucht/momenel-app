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

      let mentList = tempStr.match(/(https?:\/\/\S+|www\.\S+|@\S+|#\S+)/gi);

      if (mentList == null) {
        if (shouldAddMore) {
          result.push(tempStr);
          result.push(
            <Mention
              key={"more"}
              mentionHashtagColor={"gray"}
              mentionHashtagPress={mentionHashtagPress}
              text={"more"}
              style={style}
            />
          );
          return result;
        } else {
          return [tempStr];
        }
      }

      let i = 0;
      for (const ment of mentList) {
        i++;
        result.push(tempStr.substring(0, tempStr.indexOf(ment)));
        result.push(
          <Mention
            key={i}
            mentionHashtagColor={mode === "dark" ? "#986BFF" : "#8759F2"}
            mentionHashtagPress={mentionHashtagPress}
            text={ment}
            style={style}
          />
        );
        tempStr = tempStr.substring(tempStr.indexOf(ment) + ment.length);
      }
      if (tempStr.length > 0) {
        result.push(tempStr);
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
