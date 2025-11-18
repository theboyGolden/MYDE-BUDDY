import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export type JobCenterTab = "jobs" | "saved" | "ai";

type Props = {
  active: JobCenterTab;
  onChange: (t: JobCenterTab) => void;
  jobsCount?: number;
  savedCount?: number;
};

const AI_COLORS = [
  "#046A38",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
];

// Create an animated Ionicons so we can animate the `color` prop on UI thread
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export default function TopTabs({
  active,
  onChange,
  jobsCount = 0,
  savedCount = 0,
}: Props) {
  const bg = useThemeColor({ light: "#f8fafc", dark: "#161616" }, "background");
  const border = useThemeColor({ light: "#e5e7eb", dark: "#2b2b2b" }, "background");
  const text = useThemeColor({}, "text");
  const inactiveIcon = useThemeColor(
    { light: "#9ca3af", dark: "#6b7280" },
    "text"
  );
  const brandColor = "#046A38";

  // Shared animation progress (drives AI animated color)
  const progress = useSharedValue(0);

  // Start animation on mount and keep it running continuously
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(AI_COLORS.length, {
        duration: AI_COLORS.length * 1400,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Cleanup on unmount
    return () => {
      cancelAnimation(progress);
    };
  }, []); // Empty dependency array - run once on mount

  // Derived AI color (shared value) - always animating
  const aiColor = useDerivedValue(() => {
    const index = Math.floor(progress.value) % AI_COLORS.length;
    const nextIndex = (index + 1) % AI_COLORS.length;
    const local = progress.value % 1;

    return interpolateColor(
      local,
      [0, 1],
      [AI_COLORS[index], AI_COLORS[nextIndex]]
    ) as string;
  }, []);

  // subtle glow (not required for icon color, used elsewhere)
  const glow = useDerivedValue(() => {
    if (active !== "ai") return 0;
    return Math.sin(progress.value * Math.PI) * 0.4 + 0.6;
  });

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
    const isAI = id === "ai";

    // Animated style for the tab container (border/background/glow)
    const animatedTabStyle = useAnimatedStyle(() => {
      // AI tab always uses animated border color
      if (isAI) {
        return {
          borderColor: aiColor.value,
          backgroundColor: selected ? "transparent" : "transparent",
          shadowColor: selected ? aiColor.value : "transparent",
          shadowRadius: selected ? glow.value * 16 : 0,
          shadowOpacity: selected ? glow.value * 0.5 : 0,
        };
      }

      // Non-AI tabs use static colors
      return {
        borderColor: selected ? brandColor : border,
        backgroundColor: selected ? brandColor : "transparent",
      };
    });

    // Animated text color for AI label - always uses animated color
    const animatedTextStyle = useAnimatedStyle(() => {
      if (isAI) {
        return {
          color: aiColor.value,
        };
      }
      return {
        color: selected ? "#fff" : text,
      };
    });

    // IMPORTANT: animated props for the icon so color updates on UI thread
    // AI tab icon always uses animated color, other tabs use static colors
    const animatedIconProps = useAnimatedProps(() => {
      // If this is the AI tab, always use animated color
      if (isAI) {
        return { color: aiColor.value };
      }

      // For other tabs:
      if (selected) {
        // Selected non-AI tab -> white icon
        return { color: "#ffffff" };
      }

      // Inactive non-AI tab -> use brand color
      return { color: brandColor };
    }, [selected, isAI]);

    return (
      <TouchableOpacity
        onPress={() => onChange(id)}
        activeOpacity={0.7}
        style={styles.tab}
        android_ripple={{
          color: brandColor,
          borderless: false,
        }}
      >
        <Animated.View style={[styles.tabContainer, animatedTabStyle]}>
          <View style={styles.tabContent}>
            {/* Animated Ionicon receives color through useAnimatedProps */}
            <AnimatedIonicons
              // @ts-ignore useAnimatedProps types can be picky; runtime works
              animatedProps={animatedIconProps}
              name={icon}
              size={16}
            />

            {isAI ? (
              <Animated.Text style={[styles.tabText, animatedTextStyle]}>
                {label}
              </Animated.Text>
            ) : (
              <ThemedText
                style={[styles.tabText, selected && { color: "#fff" }]}
              >
                {label}
              </ThemedText>
            )}

            {count !== undefined && id !== "ai" && (
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: selected ? "#fff" : brandColor,
                  },
                ]}
              >
                <ThemedText
                  style={{
                    color: selected ? brandColor : "#fff",
                    fontWeight: "700",
                    fontSize: 11,
                  }}
                >
                  {count}
                </ThemedText>
              </View>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrap}>
      <Tab id="jobs" label="Jobs" icon="briefcase-outline" count={jobsCount} />
      <Tab id="saved" label="Saved" icon="bookmark-outline" count={savedCount} />
      <Tab id="ai" label="AI Search" icon="sparkles" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
  },
  tabContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  badge: {
    marginLeft: 2,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
});
