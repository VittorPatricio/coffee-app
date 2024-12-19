import { View, Text } from "react-native";
import React from "react";
import colors from "../../../config/colors";

const SettingsScreen = () => {
  return (
    <View style={{ backgroundColor: colors.dark }}>
      <Text style={{ color: colors.white }}>Settings</Text>
    </View>
  );
};

export default SettingsScreen;
