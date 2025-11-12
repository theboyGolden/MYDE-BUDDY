import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  query: string;
  onQueryChange: (text: string) => void;
  onFilterPress?: () => void;
};

export default function SearchBar({ query, onQueryChange, onFilterPress }: Props) {
  const bg = useThemeColor({ light: "#f8fafc", dark: "#1f1f1f" }, "background");
  const border = useThemeColor({ light: "#e5e7eb", dark: "#2b2b2b" }, "background");
  const text = useThemeColor({}, "text");
  const tint = useThemeColor({}, "tint");
  const filterBtnBg = useThemeColor({ light: "#ffffff", dark: "#2a2a2a" }, "background");
  const placeholderColor = useThemeColor(
    { light: "#9ca3af", dark: "#6b7280" },
    "icon"
  );

  return (
    <View style={[styles.row]}>
      <View style={[styles.inputBox, { backgroundColor: bg, borderColor: border }]}>
        <Ionicons name="search-outline" size={18} color={text} />
        <TextInput
          placeholder="Search jobs by title, company, category, or city..."
          placeholderTextColor={placeholderColor}
          style={[styles.input, { color: text }]}
          value={query}
          onChangeText={onQueryChange}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={[styles.filterBtn, { backgroundColor: filterBtnBg, borderColor: border }]}
        onPress={onFilterPress}
      >
        <Ionicons name="options-outline" size={20} color={tint} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, paddingHorizontal: 20, marginTop:20 },
  inputBox: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: { flex: 1, fontSize: 14 },
  filterBtn: {
    height: 48,
    width: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
