import { ThemedText } from "@/components/themed-text";
import { CARD_BG } from "@/constants/colors";
import type { Job } from "@/data/jobs";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
};

export default function JobCard({ job, isBookmarked, onToggleBookmark }: Props) {
  const text = useThemeColor({}, "text");
  const brand = useThemeColor({}, "tint");
  const muted = useThemeColor({ light: "#64748b", dark: "#c7c7c7" }, "text");
  const surface = useThemeColor({ light: "#ffffff", dark: "#1f1f1f" }, "background");
  const tagBackground = useThemeColor({ light: "#f8fafc", dark: "#252525" }, "background");
  const tagBorder = useThemeColor({ light: "#f1f5f9", dark: "#2f2f2f" }, "background");
  const tagAltBackground = useThemeColor({ light: "#fff8ee", dark: "#2a1f12" }, "background");
  const shadowColor = useThemeColor({ light: "#000", dark: "#000" }, "background");

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: surface,
          shadowColor,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.companyInfo}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: job.logoUrl }} style={styles.logo} />
          </View>
          <View style={styles.jobDetails}>
            <ThemedText style={[styles.company, { color: muted }]}>{job.company}</ThemedText>
            <ThemedText style={[styles.title, { color: text }]}>{job.title}</ThemedText>
            <ThemedText style={[styles.salary, { color: brand }]}>
              {job.salaryUnit === "yearly" && `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}/Year`}
              {job.salaryUnit === "monthly" && `$${job.salaryMin} - $${job.salaryMax}/Month`}
              {job.salaryUnit === "hourly" && `$${job.salaryMin} - $${job.salaryMax}/Hour`}
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkBtn} onPress={() => onToggleBookmark(job.id)}>
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

      <TouchableOpacity style={[styles.applyButton, { backgroundColor: brand }]}>
        <ThemedText style={styles.applyText}>Apply now</ThemedText>
      </TouchableOpacity>
    </View>
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
    backgroundColor: CARD_BG,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { height: 30, width: 30, resizeMode: "contain" },
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

  applyButton: { paddingVertical: 12, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  applyText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
