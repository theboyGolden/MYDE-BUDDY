import type { Job } from "@/data/jobs";
import React from "react";
import { FlatList, View } from "react-native";
import JobCard from "./JobCard";

type Props = {
  jobs: Job[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  contentInset?: { top?: number; bottom?: number };
};

export default function JobList({
  jobs,
  bookmarkedIds,
  onToggleBookmark,
  contentInset,
}: Props) {
  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20 }}>
          <JobCard
            job={item}
            isBookmarked={bookmarkedIds.has(item.id)}
            onToggleBookmark={onToggleBookmark}
          />
        </View>
      )}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: contentInset?.bottom ?? 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
