import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

import { ThemedText } from "@/components/themed-text";
import type { Job } from "@/data/jobs";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { UserProfile } from "@/utils/jobMatch";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CompatibilityStatisticsProps {
  job: Job;
  userProfile: UserProfile;
}

interface StatItem {
  label: string;
  percentage: number;
}

export function CompatibilityStatistics({
  job,
  userProfile,
}: CompatibilityStatisticsProps) {
  const surface = useThemeColor(
    { light: "#ffffff", dark: "#1f1f1f" },
    "background"
  );
  const muted = useThemeColor({ light: "#64748b", dark: "#c7c7c7" }, "text");
  const progressColor = "#ef4444";
  const borderColor = "#fecaca";

  // Calculate individual statistics
  const calculateStats = (): StatItem[] => {
    const stats: StatItem[] = [];

    // 1. Skills Match (Technical)
    const jobTags = job.tags.map((tag) => tag.toLowerCase());
    const userSkills = userProfile.skills.map((skill) => skill.toLowerCase());
    const matchingSkills = jobTags.filter((tag) =>
      userSkills.some((skill) => {
        return skill.includes(tag) || tag.includes(skill);
      })
    );
    const skillsMatchPercentage =
      jobTags.length > 0
        ? Math.round((matchingSkills.length / jobTags.length) * 100)
        : 0;
    stats.push({
      label: "Technical",
      percentage: skillsMatchPercentage,
    });

    // 2. Experience Level Match
    const experienceLevels: Record<string, number> = {
      entry: 1,
      mid: 2,
      senior: 3,
      executive: 4,
    };
    const userLevel = experienceLevels[userProfile.experienceLevel] || 2;
    const jobLevel = experienceLevels[job.experienceLevel] || 2;
    const levelDiff = Math.abs(userLevel - jobLevel);
    let experienceScore = 0;
    if (levelDiff === 0) {
      experienceScore = 100;
    } else if (levelDiff === 1) {
      experienceScore = 75;
    } else if (levelDiff === 2) {
      experienceScore = 50;
    } else {
      experienceScore = 25;
    }
    if (userLevel > jobLevel) {
      experienceScore = Math.min(100, experienceScore + 10);
    }
    stats.push({
      label: "Experience",
      percentage: experienceScore,
    });

    // 3. Category Preference (Domains)
    let categoryScore = 0;
    if (
      userProfile.preferredCategories &&
      userProfile.preferredCategories.includes(job.category)
    ) {
      categoryScore = 100;
    } else {
      categoryScore = 30;
    }
    stats.push({
      label: "Domains",
      percentage: categoryScore,
    });

    // 4. Soft Skills (calculated based on overall compatibility)
    const overallMatch = (skillsMatchPercentage * 0.6 + experienceScore * 0.25 + categoryScore * 0.15);
    const softSkillsScore = Math.max(0, Math.min(100, Math.round(overallMatch * 0.8)));
    stats.push({
      label: "Soft skills",
      percentage: softSkillsScore,
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <View style={[styles.container, { backgroundColor: surface }]}>
      <ThemedText style={styles.title}>Compatibility Statistics</ThemedText>
      <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <CircularProgress
            key={index}
            percentage={stat.percentage}
            label={stat.label}
            progressColor={progressColor}
            borderColor={borderColor}
            mutedColor={muted}
          />
        ))}
      </View>
    </View>
  );
}

interface CircularProgressProps {
  percentage: number;
  label: string;
  progressColor: string;
  borderColor: string;
  mutedColor: string;
}

function CircularProgress({
  percentage,
  label,
  progressColor,
  borderColor,
  mutedColor,
}: CircularProgressProps) {
  const size = 70;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(percentage, { duration: 1000 });
  }, [percentage]);

  const animatedProps = useAnimatedProps(() => {
    const offset = circumference - (progress.value / 100) * circumference;
    return {
      strokeDashoffset: offset,
    };
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.circleWrapper}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={borderColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            animatedProps={animatedProps}
          />
        </Svg>
        {/* Percentage text */}
        <View style={styles.percentageContainer}>
          <ThemedText style={[styles.percentageText, { color: progressColor }]}>
            {percentage}%
          </ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.label, { color: mutedColor }]}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  progressContainer: {
    alignItems: "center",
    gap: 8,
  },
  circleWrapper: {
    position: "relative",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    position: "absolute",
  },
  percentageContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "700",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 8,
  },
});
