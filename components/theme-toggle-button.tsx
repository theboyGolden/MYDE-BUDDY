import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/theme";

type ThemeToggleButtonProps = {
  colorScheme: "light" | "dark";
  onToggle: () => void;
  style?: ViewStyle;
};

export function ThemeToggleButton({ colorScheme, onToggle, style }: ThemeToggleButtonProps) {
  const iconName = colorScheme === "dark" ? "nights-stay" : "wb-sunny";
  const palette = Colors[colorScheme];
  const backgroundColor = colorScheme === "dark" ? "#2A2B2F" : "#F2F2F6";

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.button, { backgroundColor }, style]}
      accessibilityRole="button"
      accessibilityLabel="Toggle theme"
      accessibilityHint="Switch between light and dark mode"
      hitSlop={8}
      activeOpacity={0.8}
    >
      <MaterialIcons name={iconName} size={20} color={palette.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});

