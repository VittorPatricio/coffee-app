import React from "react";
import { View, Text } from "react-native";
import colors from "../../config/colors";
import SPACING from "../../config/SPACING";

// MessageBubble component to be used in the conversation
const MessageBubble = ({
  text,
  type = "user",
  timestamp = new Date().toLocaleTimeString(),
}) => {
  const isUserMessage = type === "user";

  return (
    <View
      style={{
        alignSelf: isUserMessage ? "flex-end" : "flex-start",
        maxWidth: "80%",
        marginVertical: SPACING / 2,
      }}
    >
      <View
        style={{
          backgroundColor: isUserMessage
            ? colors.primary
            : colors["dark-light"],
          borderRadius: SPACING,
          padding: SPACING,
          paddingHorizontal: SPACING * 1.5,
        }}
      >
        <Text
          style={{
            color: isUserMessage ? colors.white : colors.white_less,
            fontSize: SPACING * 1.6,
          }}
        >
          {text}
        </Text>
        <Text
          style={{
            color: isUserMessage ? colors["dark-light"] : colors.dark,
            fontSize: SPACING * 1.2,
            alignSelf: "flex-end",
            marginTop: SPACING / 2,
          }}
        >
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;
