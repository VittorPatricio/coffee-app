import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import colors from "../../config/colors";
import SPACING from "../../config/SPACING";
import { Ionicons } from "@expo/vector-icons";

const SearchField = ({ onSearchChange }) => {
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
            paddingLeft: SPACING * 3.5,
          }}
          placeholder="Find Your Coffee..."
          placeholderTextColor={colors.light}
          onChangeText={onSearchChange}
        />
        <Ionicons
          name="search"
          size={SPACING * 2}
          color={colors.light}
          style={{ position: "absolute", left: SPACING }}
        />
      </BlurView>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({});
