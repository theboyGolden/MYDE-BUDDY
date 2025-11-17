import { ThemedText } from "@/components/themed-text";
import { useUserProfile } from "@/contexts/user-profile-context";
import type { Job } from "@/data/jobs";
import { useThemeColor } from "@/hooks/use-theme-color";
import { calculateJobMatch } from "@/utils/jobMatch";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
};

export default function JobCard({ job, isBookmarked, onToggleBookmark }: Props) {
  const router = useRouter();
  const { profile } = useUserProfile();
  const [imageError, setImageError] = useState(false);
  const text = useThemeColor({}, "text");
  // Use brand color consistently (not tint which is white in dark mode)
  const brand = useThemeColor({ light: "#046A38", dark: "#046A38" }, "tint");
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

  // Convert profile to UserProfile format for jobMatch
  const userProfileForMatch = useMemo(() => ({
    skills: profile.skills,
    experienceLevel: profile.experienceLevel,
    yearsOfExperience: parseInt(profile.yearsOfExperience) || 0,
    preferredCategories: profile.preferredCategories,
  }), [profile]);

  // Calculate job match percentage
  const matchPercentage = useMemo(() => calculateJobMatch(job, userProfileForMatch), [job, userProfileForMatch]);
  
  // Match bar background color
  const matchBarBgColor = useThemeColor(
    { light: "#e5e7eb", dark: "#3a3a3a" },
    "background"
  );

  const handleCardPress = () => {
    router.push({
      pathname: "/job/[id]",
      params: { id: job.id },
    });
  };

  return (
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
        <TouchableOpacity 
          style={styles.bookmarkBtn} 
          onPress={(e) => {
            e.stopPropagation();
            onToggleBookmark(job.id);
          }}
        >
          <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color={brand} />
        </TouchableOpacity>
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
            {matchPercentage}%
          </ThemedText>
        </View>
        <View style={[styles.matchBarContainer, { backgroundColor: matchBarBgColor }]}>
          <View
            style={[
              styles.matchBar,
              {
                width: `${matchPercentage}%`,
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
  bookmarkBtn: { padding: 4 },

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
