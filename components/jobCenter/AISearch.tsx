import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { JOBS, Job } from "@/data/jobs";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import JobList from "./JobList";

/**
 * Simple local “AI” search:
 * - tokenizes prompt
 * - matches against title/company/tags/category/location
 * - sorts by score
 */
function aiMatch(prompt: string): Job[] {
  const q = prompt.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const score = (job: Job) => {
    const blob = `${job.title} ${job.company} ${job.category} ${job.location} ${job.tags.join(" ")}`.toLowerCase();
    let s = 0;
    for (const t of terms) {
      if (blob.includes(t)) s += 1;
    }
    // slight boost if term matches exact tag or title chunk
    for (const t of terms) {
      if (job.tags.some((x) => x.toLowerCase() === t)) s += 1;
      if (job.title.toLowerCase().includes(t)) s += 0.5;
    }
    return s;
  };

  return [...JOBS]
    .map((j) => ({ j, s: score(j) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.j);
}

type Props = {
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
};

export default function AISearch({ bookmarkedIds, onToggleBookmark }: Props) {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<Job[]>([]);

  const surface = useThemeColor(
    { light: "#f5f5f5", dark: "#1a1a1a" },
    "background"
  );
  const border = useThemeColor(
    { light: "rgba(0, 0, 0, 0.1)", dark: "rgba(255, 255, 255, 0.1)" },
    "background"
  );
  const text = useThemeColor({}, "text");
  // Use brand color consistently (not tint which is white in dark mode)
  const brandColor = useThemeColor(
    { light: "#e0971d", dark: "#e0971d" },
    "tint"
  );
  const muted = useThemeColor(
    { light: "#666666", dark: "#999999" },
    "text"
  );
  const placeholderColor = useThemeColor(
    { light: "#9aa3af", dark: "#6b7280" },
    "icon"
  );

  const suggestBg = useThemeColor(
    { light: "#f8fafc", dark: "#2a2a2a" },
    "background"
  );

  const suggestions = useMemo(
    () => [
      "Remote React Native roles in Ghana",
      "Entry level data analyst internships",
      "Senior backend Node.js jobs, remote",
      "Hybrid marketing manager in Accra",
    ],
    []
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.heading}>
        Ask AI to find jobs
      </ThemedText>
      <ThemedText style={[styles.caption, { color: muted }]}>
        Describe what you're looking for. We'll surface the closest matches.
      </ThemedText>

      <View style={[styles.promptBox, { backgroundColor: surface, borderColor: border }]}>
        <Ionicons name="sparkles-outline" size={18} color={brandColor} />
        <TextInput
          style={[styles.input, { color: text }]}
          placeholder="e.g., Remote React Native roles in Ghana with TypeScript"
          placeholderTextColor={placeholderColor}
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />
        <TouchableOpacity
          style={[styles.askBtn, { backgroundColor: brandColor }]}
          onPress={() => {
            Keyboard.dismiss();
            setResults(aiMatch(prompt));
          }}
          activeOpacity={0.9}
        >
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.suggestRow}>
        {suggestions.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => {
              setPrompt(s);
              setResults(aiMatch(s));
            }}
            style={[styles.suggestChip, { backgroundColor: suggestBg, borderColor: border }]}
          >
            <Ionicons name="sparkles" size={12} color={brandColor} />
            <ThemedText style={styles.suggestText} numberOfLines={1}>
              {s}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1, marginTop: 12 }}>
        <JobList
          jobs={results}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={onToggleBookmark}
          contentInset={{ bottom: 28 }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 20, 
    paddingTop: 16, 
    flex: 1, 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24,
    marginTop:20 
},
  heading: { fontSize: 22, fontWeight: "800" },
  caption: { marginTop: 6, fontWeight: "600" },
  promptBox: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: { flex: 1, fontSize: 14, paddingTop: 6, paddingBottom: 6 },
  askBtn: {
    height: 36,
    width: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  suggestChip: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  suggestText: { fontSize: 12, fontWeight: "700", maxWidth: 220 },
});
