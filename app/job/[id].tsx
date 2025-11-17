import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { useUserProfile } from "@/contexts/user-profile-context";
import { JOBS } from "@/data/jobs";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
    calculateJobMatch,
    getMatchRecommendations,
    type MatchRecommendation,
} from "@/utils/jobMatch";

export default function JobDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const jobId = params.id;
  const { profile } = useUserProfile();

  const job = useMemo(() => JOBS.find((j) => j.id === jobId), [jobId]);
  
  // Convert profile to UserProfile format for jobMatch
  const userProfileForMatch = useMemo(() => ({
    skills: profile.skills,
    experienceLevel: profile.experienceLevel,
    yearsOfExperience: parseInt(profile.yearsOfExperience) || 0,
    preferredCategories: profile.preferredCategories,
  }), [profile]);

  const matchPercentage = useMemo(
    () => (job ? calculateJobMatch(job, userProfileForMatch) : 0),
    [job, userProfileForMatch]
  );
  const recommendations = useMemo(
    () => (job ? getMatchRecommendations(job, userProfileForMatch) : []),
    [job, userProfileForMatch]
  );

  const backgroundColor = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const muted = useThemeColor({ light: "#64748b", dark: "#c7c7c7" }, "text");
  const brand = useThemeColor({ light: "#046A38", dark: "#046A38" }, "tint");
  const surface = useThemeColor(
    { light: "#ffffff", dark: "#1f1f1f" },
    "background"
  );
  const tagBackground = useThemeColor(
    { light: "#f8fafc", dark: "#252525" },
    "background"
  );
  const tagBorder = useThemeColor(
    { light: "#f1f5f9", dark: "#2f2f2f" },
    "background"
  );
  const matchBarBgColor = useThemeColor(
    { light: "#e5e7eb", dark: "#3a3a3a" },
    "background"
  );
  const recommendationBg = useThemeColor(
    { light: "#f0fdf4", dark: "#1a3a2f" },
    "background"
  );
  const logoBg = useThemeColor(
    { light: "#dde4f9", dark: "#2a2a3a" },
    "background"
  );

  if (!job) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={text} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <ThemedText>Job not found</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const categoryNames: Record<string, string> = {
    technology: "Technology",
    marketing: "Marketing",
    sales: "Sales",
    design: "Design",
    management: "Management",
    "customer-service": "Customer Service",
  };

  const experienceNames: Record<string, string> = {
    entry: "Entry Level",
    mid: "Mid Level",
    senior: "Senior Level",
    executive: "Executive",
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="bookmark-outline" size={24} color={text} />
          </TouchableOpacity>
        </View>

        {/* Company Info */}
        <View style={[styles.companySection, { backgroundColor: surface }]}>
          <View style={[styles.logoContainer, { backgroundColor: logoBg }]}>
            {job.logoUrl ? (
              <Image
                source={{ uri: job.logoUrl }}
                style={styles.logo}
                defaultSource={require("@/assets/images/icon.png")}
              />
            ) : (
              <MaterialIcons name="business" size={32} color={brand} />
            )}
          </View>
          <View style={styles.companyInfo}>
            <ThemedText style={styles.companyName}>{job.company}</ThemedText>
            <ThemedText style={styles.jobTitle}>{job.title}</ThemedText>
            <ThemedText style={[styles.location, { color: muted }]}>
              <MaterialIcons name="location-on" size={16} color={muted} />{" "}
              {job.location}
            </ThemedText>
          </View>
        </View>

        {/* Match Section */}
        <View style={[styles.matchCard, { backgroundColor: surface }]}>
          <View style={styles.matchHeader}>
            <ThemedText style={styles.matchTitle}>Your Match</ThemedText>
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
          {matchPercentage < 90 && (
            <ThemedText style={[styles.matchHint, { color: muted }]}>
              Improve your match by following the recommendations below
            </ThemedText>
          )}
        </View>

        {/* Job Details */}
        <View style={[styles.detailsCard, { backgroundColor: surface }]}>
          <ThemedText style={styles.sectionTitle}>Job Details</ThemedText>

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: muted }]}>
              Salary
            </ThemedText>
            <ThemedText style={[styles.detailValue, { color: brand }]}>
              {job.salaryUnit === "yearly" &&
                `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}/Year`}
              {job.salaryUnit === "monthly" &&
                `$${job.salaryMin} - $${job.salaryMax}/Month`}
              {job.salaryUnit === "hourly" &&
                `$${job.salaryMin} - $${job.salaryMax}/Hour`}
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: muted }]}>
              Experience Level
            </ThemedText>
            <ThemedText style={styles.detailValue}>
              {experienceNames[job.experienceLevel]}
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: muted }]}>
              Job Type
            </ThemedText>
            <ThemedText style={styles.detailValue}>
              {job.jobType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: muted }]}>
              Work Mode
            </ThemedText>
            <ThemedText style={styles.detailValue}>
              {job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)}
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: muted }]}>
              Category
            </ThemedText>
            <ThemedText style={styles.detailValue}>
              {categoryNames[job.category] || job.category}
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={[styles.detailLabel, { color: muted }]}>
              Posted
            </ThemedText>
            <ThemedText style={styles.detailValue}>
              {job.postedDaysAgo} {job.postedDaysAgo === 1 ? "day" : "days"} ago
            </ThemedText>
          </View>
        </View>

        {/* Required Skills */}
        <View style={[styles.skillsCard, { backgroundColor: surface }]}>
          <ThemedText style={styles.sectionTitle}>Required Skills</ThemedText>
          <View style={styles.skillsContainer}>
            {job.tags.map((tag, index) => (
              <View
                key={index}
                style={[
                  styles.skillTag,
                  { backgroundColor: tagBackground, borderColor: tagBorder },
                ]}
              >
                <ThemedText style={[styles.skillText, { color: text }]}>
                  {tag}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <View style={[styles.recommendationsCard, { backgroundColor: surface }]}>
            <ThemedText style={styles.sectionTitle}>
              Improve Your Match
            </ThemedText>
            {recommendations.map((rec, index) => (
              <RecommendationItem
                key={index}
                recommendation={rec}
                backgroundColor={recommendationBg}
                brand={brand}
                muted={muted}
              />
            ))}
          </View>
        )}

        {/* Apply Button */}
        <TouchableOpacity
          style={[styles.applyButton, { backgroundColor: brand }]}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.applyButtonText}>Apply Now</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function RecommendationItem({
  recommendation,
  backgroundColor,
  brand,
  muted,
}: {
  recommendation: MatchRecommendation;
  backgroundColor: string;
  brand: string;
  muted: string;
}) {
  const getIcon = () => {
    switch (recommendation.type) {
      case "skill":
        return "code";
      case "experience":
        return "trending-up";
      case "category":
        return "category";
      default:
        return "lightbulb";
    }
  };

  const getPriorityColor = () => {
    switch (recommendation.priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return brand;
      default:
        return muted;
    }
  };

  return (
    <View style={[styles.recommendationItem, { backgroundColor }]}>
      <View style={styles.recommendationHeader}>
        <View style={styles.recommendationIconContainer}>
          <MaterialIcons
            name={getIcon()}
            size={20}
            color={brand}
          />
        </View>
        <View style={styles.recommendationContent}>
          <ThemedText style={styles.recommendationTitle}>
            {recommendation.title}
          </ThemedText>
          <ThemedText style={[styles.recommendationDescription, { color: muted }]}>
            {recommendation.description}
          </ThemedText>
        </View>
        {recommendation.impact > 0 && (
          <View
            style={[
              styles.impactBadge,
              { backgroundColor: getPriorityColor() },
            ]}
          >
            <ThemedText style={styles.impactText}>
              +{recommendation.impact}%
            </ThemedText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  companySection: {
    flexDirection: "row",
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    gap: 16,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  companyInfo: {
    flex: 1,
    gap: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  location: {
    fontSize: 14,
    marginTop: 4,
  },
  matchCard: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    gap: 12,
  },
  matchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  matchPercentage: {
    fontSize: 24,
    fontWeight: "700",
  },
  matchBarContainer: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  matchBar: {
    height: "100%",
    borderRadius: 5,
  },
  matchHint: {
    fontSize: 13,
    marginTop: 4,
  },
  detailsCard: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  skillsCard: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  skillTag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  skillText: {
    fontSize: 13,
    fontWeight: "500",
  },
  recommendationsCard: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    gap: 16,
  },
  recommendationItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  recommendationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(4, 106, 56, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  recommendationContent: {
    flex: 1,
    gap: 4,
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  recommendationDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  impactBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  applyButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

