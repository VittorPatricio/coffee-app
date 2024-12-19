import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Feather, Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import SPACING from "../../config/SPACING";

const ConversationField = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <View style={{ borderRadius: SPACING, overflow: "hidden" }}>
      <BlurView
        intensity={30}
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TextInput
          selectionColor={colors.primary}
          style={{
            width: "100%",
            color: colors.white,
            fontSize: SPACING * 1.7,
            padding: SPACING,
            paddingLeft: SPACING * 3.75,
            paddingRight: SPACING * 3.75,
          }}
          value={message}
          placeholder="Ask About a Coffee ..."
          placeholderTextColor={colors.light}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
        />
        <Feather
          name="coffee"
          size={SPACING * 2}
          color={colors.light}
          style={{ position: "absolute", left: SPACING }}
        />
        <TouchableOpacity
          onPress={handleSend}
          style={{ position: "absolute", right: SPACING }}
        >
          <Ionicons
            name="send"
            size={SPACING * 2.25}
            color={message.trim() ? colors.primary : colors.light}
          />
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default ConversationField;

const styles = StyleSheet.create({});
