import { useThemeColor } from "@/hooks/use-theme-color";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

export default function JobCardSkeleton() {
  const surface = useThemeColor({ light: "#ffffff", dark: "#1f1f1f" }, "background");
  const shimmerBase = useThemeColor({ light: "#f1f5f9", dark: "#2a2a2a" }, "background");
  const shimmerHighlight = useThemeColor({ light: "#e2e8f0", dark: "#3a3a3a" }, "background");

  const shimmerTranslateX = useSharedValue(-1);

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      cancelAnimation(shimmerTranslateX);
    };
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shimmerTranslateX.value * 400,
        },
      ],
    };
  });

  return (
    <View style={[styles.card, { backgroundColor: surface }]}>
      <View style={styles.row}>
        <View style={styles.companyInfo}>
          {/* Logo skeleton */}
          <View style={[styles.logoContainer, { backgroundColor: shimmerBase }]}>
            <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
              <LinearGradient
                colors={["transparent", shimmerHighlight, "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>

          {/* Job details skeleton */}
          <View style={styles.jobDetails}>
            <View style={[styles.skeletonLine, { backgroundColor: shimmerBase, width: "60%" }]}>
              <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
                <LinearGradient
                  colors={["transparent", shimmerHighlight, "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </View>
            <View style={[styles.skeletonLine, { backgroundColor: shimmerBase, width: "90%", marginTop: 8 }]}>
              <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
                <LinearGradient
                  colors={["transparent", shimmerHighlight, "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </View>
            <View style={[styles.skeletonLine, { backgroundColor: shimmerBase, width: "70%", marginTop: 8 }]}>
              <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
                <LinearGradient
                  colors={["transparent", shimmerHighlight, "transparent"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Bookmark skeleton */}
        <View style={[styles.bookmarkSkeleton, { backgroundColor: shimmerBase }]}>
          <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
            <LinearGradient
              colors={["transparent", shimmerHighlight, "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      </View>

      {/* Tags skeleton */}
      <View style={styles.tagsRow}>
        <View style={[styles.tagSkeleton, { backgroundColor: shimmerBase }]}>
          <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
            <LinearGradient
              colors={["transparent", shimmerHighlight, "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
        <View style={[styles.tagSkeleton, { backgroundColor: shimmerBase }]}>
          <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
            <LinearGradient
              colors={["transparent", shimmerHighlight, "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
        <View style={[styles.tagSkeleton, { backgroundColor: shimmerBase }]}>
          <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
            <LinearGradient
              colors={["transparent", shimmerHighlight, "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      </View>

      {/* Match section skeleton */}
      <View style={styles.matchSection}>
        <View style={styles.matchHeader}>
          <View style={[styles.skeletonLine, { backgroundColor: shimmerBase, width: "40%" }]}>
            <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
              <LinearGradient
                colors={["transparent", shimmerHighlight, "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
          <View style={[styles.skeletonLine, { backgroundColor: shimmerBase, width: "15%" }]}>
            <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
              <LinearGradient
                colors={["transparent", shimmerHighlight, "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
        </View>
        <View style={[styles.matchBarSkeleton, { backgroundColor: shimmerBase }]}>
          <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
            <LinearGradient
              colors={["transparent", shimmerHighlight, "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      </View>

      {/* Apply button skeleton */}
      <View style={[styles.applyButtonSkeleton, { backgroundColor: shimmerBase }]}>
        <Animated.View style={[styles.shimmerOverlay, shimmerStyle]}>
          <LinearGradient
            colors={["transparent", shimmerHighlight, "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    gap: 20,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  companyInfo: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  logoContainer: {
    padding: 12,
    borderRadius: 12,
    height: 60,
    width: 60,
    overflow: "hidden",
  },
  jobDetails: {
    flexDirection: "column",
    flex: 1,
    gap: 4,
  },
  skeletonLine: {
    height: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  bookmarkSkeleton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    overflow: "hidden",
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  tagSkeleton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    height: 28,
    width: 80,
    overflow: "hidden",
  },
  matchSection: {
    gap: 8,
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchBarSkeleton: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  applyButtonSkeleton: {
    paddingVertical: 12,
    borderRadius: 12,
    height: 44,
    overflow: "hidden",
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: 200,
  },
});

