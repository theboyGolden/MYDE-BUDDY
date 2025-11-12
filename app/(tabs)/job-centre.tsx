import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "@/components/header";
import AISearch from "@/components/jobCenter/AISearch";
import JobList from "@/components/jobCenter/JobList";
import FilterSheet, { FilterOptions } from "@/components/jobCenter/modals/FilterSheet";
import SearchBar from "@/components/jobCenter/searchBar";
import TopTabs, { JobCenterTab } from "@/components/jobCenter/TopTabs";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { JOBS, Job } from "@/data/jobs";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function JobCenterScreen() {
  const [activeTab, setActiveTab] = useState<JobCenterTab>("jobs");

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    category: "all",
    jobType: "all",
    experienceLevel: "all",
    workMode: "all",
    company: "all",
    timePosted: "all",
    location: "remote",
    salaryUnit: "monthly",
    salaryMin: "",
    salaryMax: "",
  });

  // bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const toggleBookmark = (id: string) =>
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filteredAllJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const withinTime = (job: Job) => {
      const t = activeFilters.timePosted;
      if (!t || t === "all") return true;
      if (t === "24h") return job.postedDaysAgo <= 1;
      if (t === "7d") return job.postedDaysAgo <= 7;
      if (t === "30d") return job.postedDaysAgo <= 30;
      return true;
    };

    const min = Number(activeFilters.salaryMin || "");
    const max = Number(activeFilters.salaryMax || "");

    return JOBS.filter((job) => {
      if (activeFilters.category !== "all" && job.category !== activeFilters.category) return false;
      if (activeFilters.jobType !== "all" && job.jobType !== activeFilters.jobType) return false;
      if (activeFilters.experienceLevel !== "all" && job.experienceLevel !== activeFilters.experienceLevel) return false;
      if (activeFilters.workMode !== "all" && job.workMode !== activeFilters.workMode) return false;

      if (activeFilters.company !== "all") {
        const companyMap: Record<string, string> = {
          "techcorp-solutions": "TechCorp Solutions",
          "global-marketing-inc": "Global Marketing Inc",
          "data-insights-ltd": "Data Insights Ltd",
          "salesforce-pro": "SalesForce Pro",
          "creative-design-studio": "Creative Design Studio",
          "project-solutions-co": "Project Solutions Co",
          "content-creators-ltd": "Content Creators Ltd",
          "customer-first-inc": "Customer First Inc",
        };
        if (job.company !== companyMap[activeFilters.company!]) return false;
      }

      if (!withinTime(job)) return false;

      if (!Number.isNaN(min) && activeFilters.salaryMin && job.salaryMin < min) return false;
      if (!Number.isNaN(max) && activeFilters.salaryMax && job.salaryMax > max) return false;

      if (q.length) {
        const blob = `${job.title} ${job.company} ${job.location} ${job.category} ${job.tags.join(" ")}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [activeFilters, searchQuery]);

  const savedJobs = useMemo(
    () => filteredAllJobs.filter((j) => bookmarkedIds.has(j.id)),
    [filteredAllJobs, bookmarkedIds]
  );

  const onApplyFilters = (f: FilterOptions) => {
    setActiveFilters(f);
    setShowFilters(false);
  };

  const background = useThemeColor({}, "background");

  return (
    <ThemedView style={[styles.container, { backgroundColor: background }]}>
      <Header title="Job Centre" />
      <TopTabs
        active={activeTab}
        onChange={setActiveTab}
        jobsCount={filteredAllJobs.length}
        savedCount={savedJobs.length}
      />

      {/* Jobs & Saved use the classic search + filter bar */}
      {activeTab !== "ai" && (
        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
        />
      )}

      {/* Count header */}
      {activeTab !== "ai" && (
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <ThemedText style={styles.countTitle}>
            {activeTab === "jobs"
              ? `Available Jobs (${filteredAllJobs.length})`
              : `Saved Jobs (${savedJobs.length})`}
          </ThemedText>
        </View>
      )}

      <View style={{ flex: 1, marginTop: activeTab === "ai" ? 0 : 8 }}>
        {activeTab === "jobs" && (
          <JobList
            jobs={filteredAllJobs}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            contentInset={{ bottom: 28 }}
          />
        )}

        {activeTab === "saved" && (
          <JobList
            jobs={savedJobs}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            contentInset={{ bottom: 28 }}
          />
        )}

        {activeTab === "ai" && (
          <AISearch
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        )}
      </View>

      <FilterSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={onApplyFilters}
        initialFilters={activeFilters}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  countTitle: { fontSize: 18, fontWeight: "700" },
});
