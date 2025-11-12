import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export type JobCenterTab = "jobs" | "saved" | "ai";

type Props = {
  active: JobCenterTab;
  onChange: (t: JobCenterTab) => void;
  jobsCount?: number;
  savedCount?: number;
};

export default function TopTabs({
  active,
  onChange,
  jobsCount = 0,
  savedCount = 0,
}: Props) {
  const bg = useThemeColor({ light: "#f8fafc", dark: "#161616" }, "background");
  const border = useThemeColor({ light: "#e5e7eb", dark: "#2b2b2b" }, "background");
  const text = useThemeColor({}, "text");
  // Use brand color for tabs (consistent across themes)
  const brandColor = useThemeColor(
    { light: "#e0971d", dark: "#e0971d" },
    "tint"
  );
  const muted = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text");

  const Tab = ({
    id,
    label,
    icon,
    count,
  }: {
    id: JobCenterTab;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    count?: number;
  }) => {
    const selected = active === id;
    return (
      <TouchableOpacity
        style={[
          styles.tab,
          {
            backgroundColor: selected ? brandColor : "transparent",
            borderColor: selected ? brandColor : border,
          },
        ]}
        onPress={() => onChange(id)}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={icon} 
          size={16} 
          color={selected ? "#ffffff" : text} 
        />
        <ThemedText
          style={[
            styles.tabText,
            selected && { color: "#ffffff" }
          ]}
          numberOfLines={1}
        >
          {label}
        </ThemedText>
        {count !== undefined && id !== "ai" && (
          <View
            style={[
              styles.badge,
              { 
                backgroundColor: selected ? "#ffffff" : brandColor,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.badgeText,
                { 
                  color: selected ? brandColor : "#ffffff",
                },
              ]}
            >
              {count}
            </ThemedText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={[styles.wrap, { borderColor: border }]}>
      <Tab id="jobs" label="Jobs" icon="briefcase-outline" count={jobsCount} />
      <Tab id="saved" label="Saved" icon="bookmark-outline" count={savedCount} />
      <Tab id="ai" label="AI Search" icon="sparkles" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    //paddingBottom: 16,
    //borderBottomWidth: 1,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1.5,
    flex: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  badge: {
    marginLeft: 2,
    minWidth: 24,
    height: 24,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});