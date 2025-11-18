import { ThemedText } from "@/components/themed-text";
import { useUserProfile } from "@/contexts/user-profile-context";
import type { Job } from "@/data/jobs";
import { useThemeColor } from "@/hooks/use-theme-color";
import { calculateJobMatch } from "@/utils/jobMatch";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  index?: number;
  shouldAnimate?: boolean;
};

const STAGGER_DELAY = 200; // 200ms delay between each card
const ANIMATION_DURATION = 500;

export default function JobCard({ 
  job, 
  isBookmarked, 
  onToggleBookmark,
  index = 0,
  shouldAnimate = false,
}: Props) {
  const router = useRouter();
  const { profile } = useUserProfile();
  const [imageError, setImageError] = useState(false);
  const text = useThemeColor({}, "text");
  
  // Entrance animation: slide, fade, and scale
  // Start hidden - will animate when shouldAnimate becomes true
  const opacity = useSharedValue(shouldAnimate ? 0 : 1);
  const translateY = useSharedValue(shouldAnimate ? 20 : 0);
  const scale = useSharedValue(shouldAnimate ? 0.95 : 1);
  
  // Match percentage animations
  const progressWidth = useSharedValue(0);
  const animatedPercentage = useSharedValue(0);
  
  // Bookmark animation values
  const bookmarkScale = useSharedValue(1);
  const bookmarkRotation = useSharedValue(0);
  const sparkOpacity = useSharedValue(0);
  const sparkScale = useSharedValue(0);
  const bookmarkColorProgress = useSharedValue(isBookmarked ? 1 : 0);
  
  // Calculate job match percentage (moved up to use in initial state)
  const userProfileForMatch = useMemo(() => ({
    skills: profile.skills,
    experienceLevel: profile.experienceLevel,
    yearsOfExperience: parseInt(profile.yearsOfExperience) || 0,
    preferredCategories: profile.preferredCategories,
  }), [profile]);
  const matchPercentage = useMemo(() => calculateJobMatch(job, userProfileForMatch), [job, userProfileForMatch]);
  
  const [displayPercentage, setDisplayPercentage] = useState(shouldAnimate ? 0 : matchPercentage);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Animated style for progress bar
  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  // Update display percentage when animated value changes
  useAnimatedReaction(
    () => animatedPercentage.value,
    (value) => {
      'worklet';
      // Update on JS thread for React to re-render
      runOnJS(setDisplayPercentage)(Math.round(value));
    }
  );

  // Bookmark tap handler - prevents parent TouchableOpacity from firing
  const bookmarkTap = Gesture.Tap()
    .onStart(() => {
      'worklet';
      // Scale down
      bookmarkScale.value = withTiming(0.8, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      });
    })
    .onEnd(() => {
      'worklet';
      // Trigger bookmark toggle
      runOnJS(onToggleBookmark)(job.id);
      
      // Bounce animation sequence
      bookmarkScale.value = withSequence(
        withTiming(1.3, {
          duration: 200,
          easing: Easing.out(Easing.ease),
        }),
        withSpring(1, {
          damping: 8,
          stiffness: 300,
        })
      );
      
      // Rotation bounce
      bookmarkRotation.value = withSequence(
        withTiming(15, {
          duration: 150,
          easing: Easing.out(Easing.ease),
        }),
        withTiming(-15, {
          duration: 150,
          easing: Easing.out(Easing.ease),
        }),
        withSpring(0, {
          damping: 8,
          stiffness: 300,
        })
      );
      
      // Spark effect
      sparkOpacity.value = withSequence(
        withTiming(1, { duration: 100 }),
        withDelay(200, withTiming(0, { duration: 300 }))
      );
      sparkScale.value = withSequence(
        withTiming(1.5, { duration: 100 }),
        withDelay(200, withTiming(2, { duration: 300 }))
      );
    })
    .shouldCancelWhenOutside(true);

  // Bookmark animated styles
  const bookmarkAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: bookmarkScale.value },
        { rotate: `${bookmarkRotation.value}deg` },
      ],
    };
  });

  // Use brand color consistently (not tint which is white in dark mode)
  const brand = useThemeColor({ light: "#046A38", dark: "#046A38" }, "tint");
  const bookmarkActiveColor = "#FFD700"; // Gold color for bookmarked state
  
  // Create animated icon component
  const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);
  
  const bookmarkIconProps = useAnimatedProps(() => {
    // Interpolate from brand color (0) to bookmark active color (1)
    // Using string literals directly for worklet compatibility
    const color = interpolateColor(
      bookmarkColorProgress.value,
      [0, 1],
      ["#046A38", "#FFD700"]
    );
    return {
      color,
    } as any;
  });

  // Update color progress when bookmark state changes
  useEffect(() => {
    bookmarkColorProgress.value = withTiming(isBookmarked ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [isBookmarked]);

  const sparkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sparkOpacity.value,
    transform: [{ scale: sparkScale.value }],
  }));
  const muted = useThemeColor({ light: "#64748b", dark: "#c7c7c7" }, "text");
  const surface = useThemeColor({ light: "#ffffff", dark: "#1f1f1f" }, "background");
  const tagBackground = useThemeColor({ light: "#f8fafc", dark: "#252525" }, "background");
  const tagBorder = useThemeColor({ light: "#f1f5f9", dark: "#2f2f2f" }, "background");
  const tagAltBackground = useThemeColor({ light: "#fff8ee", dark: "#2a1f12" }, "background");
  const logoBg = useThemeColor({ light: "#dde4f9", dark: "#2a2a3a" }, "background");
  const shadowColor = useThemeColor({ light: "#000", dark: "#000" }, "background");

  const hasValidLogo = job.logoUrl && job.logoUrl.trim() !== "" && !imageError;
  const companyInitials = job.company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  
  // Match bar background color
  const matchBarBgColor = useThemeColor(
    { light: "#e5e7eb", dark: "#3a3a3a" },
    "background"
  );

  // Entrance and progress animations
  useEffect(() => {
    if (shouldAnimate) {
      const delay = index * STAGGER_DELAY;
      const cardAnimationDelay = delay + ANIMATION_DURATION; // Start after card entrance
      
      // Reset to initial animation state
      opacity.value = 0;
      translateY.value = 20;
      scale.value = 0.95;
      progressWidth.value = 0;
      animatedPercentage.value = 0;
      
      // Animate with stagger delay
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
        })
      );
      translateY.value = withDelay(
        delay,
        withTiming(0, {
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
        })
      );
      scale.value = withDelay(
        delay,
        withTiming(1, {
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
        })
      );
      
      // Animate progress bar and percentage after card entrance
      progressWidth.value = withDelay(
        cardAnimationDelay,
        withTiming(matchPercentage, {
          duration: 800,
          easing: Easing.out(Easing.ease),
        })
      );
      animatedPercentage.value = withDelay(
        cardAnimationDelay,
        withTiming(matchPercentage, {
          duration: 800,
          easing: Easing.out(Easing.ease),
        })
      );
    } else {
      // If not animating, set values immediately
      progressWidth.value = matchPercentage;
      animatedPercentage.value = matchPercentage;
    }
  }, [shouldAnimate, index, matchPercentage]);

  const handleCardPress = () => {
    router.push({
      pathname: "/job/[id]",
      params: { id: job.id },
    });
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: surface,
            shadowColor,
          },
        ]}
        onPress={handleCardPress}
        activeOpacity={0.95}
      >
      <View style={styles.row}>
        <View style={styles.companyInfo}>
          <View style={[styles.logoContainer, { backgroundColor: logoBg }]}>
            {hasValidLogo ? (
              <Image
                source={{ uri: job.logoUrl }}
                style={styles.logo}
                onError={() => setImageError(true)}
                defaultSource={require("@/assets/images/icon.png")}
              />
            ) : (
              <View style={styles.placeholderContainer}>
                <ThemedText style={[styles.placeholderText, { color: brand }]}>
                  {companyInitials}
                </ThemedText>
              </View>
            )}
          </View>
          <View style={styles.jobDetails}>
            <ThemedText style={[styles.company, { color: muted }]}>{job.company}</ThemedText>
            <ThemedText style={styles.title}>{job.title}</ThemedText>
            <ThemedText style={[styles.salary, { color: brand }]}>
              {job.salaryUnit === "yearly" && `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}/Year`}
              {job.salaryUnit === "monthly" && `$${job.salaryMin} - $${job.salaryMax}/Month`}
              {job.salaryUnit === "hourly" && `$${job.salaryMin} - $${job.salaryMax}/Hour`}
            </ThemedText>
          </View>
        </View>
        <View
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}
        >
          <GestureDetector gesture={bookmarkTap}>
            <Animated.View style={[styles.bookmarkBtn, bookmarkAnimatedStyle]}>
              <Animated.View style={sparkAnimatedStyle}>
                <Ionicons name="sparkles" size={32} color={bookmarkActiveColor} style={styles.sparkIcon} />
              </Animated.View>
              <AnimatedIonicons 
                name={isBookmarked ? "bookmark" : "bookmark-outline"} 
                size={24} 
                animatedProps={bookmarkIconProps}
              />
            </Animated.View>
          </GestureDetector>
        </View>
      </View>

      <View style={styles.tagsRow}>
        <View style={[styles.tag, { backgroundColor: tagBackground, borderColor: tagBorder }]}>
          <ThemedText style={[styles.tagText, { color: muted }]}>{job.jobType.replace("-", " ")}</ThemedText>
        </View>
        <View style={[styles.tag, { backgroundColor: tagBackground, borderColor: tagBorder }]}>
          <ThemedText style={[styles.tagText, { color: muted }]}>{job.workMode}</ThemedText>
        </View>
        <View style={[styles.timeTag, { backgroundColor: tagAltBackground }]}>
          <Ionicons name="time-outline" size={12} color={muted} />
          <ThemedText style={[styles.timeText, { color: brand }]}>{job.postedDaysAgo} days ago</ThemedText>
        </View>
      </View>

      {/* Match Percentage Section */}
      <View style={styles.matchSection}>
        <View style={styles.matchHeader}>
          <ThemedText style={[styles.matchLabel, { color: muted }]}>Your Match</ThemedText>
          <ThemedText style={[styles.matchPercentage, { color: brand }]}>
            {displayPercentage}%
          </ThemedText>
        </View>
        <View style={[styles.matchBarContainer, { backgroundColor: matchBarBgColor }]}>
          <Animated.View
            style={[
              styles.matchBar,
              progressBarStyle,
              {
                backgroundColor: brand,
              },
            ]}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.applyButton, { backgroundColor: brand }]}
        onPress={(e) => {
          e.stopPropagation();
          router.push({
            pathname: "/job/[id]",
            params: { id: job.id },
          });
        }}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.applyText}>Apply now</ThemedText>
      </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    gap: 20,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  companyInfo: { flexDirection: "row", flex: 1, gap: 12 },
  logoContainer: {
    padding: 12,
    borderRadius: 12,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { height: 30, width: 30, resizeMode: "contain" },
  placeholderContainer: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: "700",
  },
  jobDetails: { flexDirection: "column", flex: 1, gap: 4 },
  company: { fontWeight: "600", fontSize: 14 },
  title: { fontWeight: "700", fontSize: 18 },
  salary: { fontWeight: "600", fontSize: 14 },
  bookmarkBtn: { 
    padding: 4,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  sparkIcon: {
    position: "absolute",
    opacity: 0.6,
  },

  tagsRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  timeTag: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, gap: 4 },
  tagText: { fontSize: 12, fontWeight: "500" },
  timeText: { fontSize: 12, fontWeight: "500" },

  matchSection: {
    gap: 8,
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  matchPercentage: {
    fontSize: 16,
    fontWeight: "700",
  },
  matchBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  matchBar: {
    height: "100%",
    borderRadius: 4,
  },

  applyButton: { paddingVertical: 12, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  applyText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
