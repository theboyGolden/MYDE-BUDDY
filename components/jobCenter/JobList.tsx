import type { Job } from "@/data/jobs";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import JobCard from "./JobCard";
import JobCardSkeleton from "./JobCardSkeleton";

type Props = {
  jobs: Job[];
  bookmarkedIds: Set<string>;
  onToggleBookmark: (id: string) => void;
  contentInset?: { top?: number; bottom?: number };
  isLoading?: boolean;
};

const SKELETON_COUNT = 5;

export default function JobList({
  jobs,
  bookmarkedIds,
  onToggleBookmark,
  contentInset,
  isLoading = false,
}: Props) {
  const skeletonOpacity = useSharedValue(isLoading ? 1 : 0);
  const contentOpacity = useSharedValue(isLoading ? 0 : 1);
  const [shouldAnimateCards, setShouldAnimateCards] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  useEffect(() => {
    if (isLoading) {
      // Show skeleton
      skeletonOpacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      contentOpacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      setShouldAnimateCards(false);
      setHasAnimated(false);
    } else {
      // Hide skeleton first
      skeletonOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      
      // After skeleton fades out, show content and trigger card animations
      setTimeout(() => {
        contentOpacity.value = withTiming(1, {
          duration: 200,
          easing: Easing.out(Easing.ease),
        });
        // Trigger card animations after a brief delay (only on first load)
        if (!hasAnimated) {
          setTimeout(() => {
            setShouldAnimateCards(true);
            setHasAnimated(true);
          }, 150);
        }
      }, 300);
    }
  }, [isLoading, hasAnimated]);

  const skeletonStyle = useAnimatedStyle(() => ({
    opacity: skeletonOpacity.value,
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: skeletonOpacity.value > 0.1 ? "auto" : "none",
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    flex: 1,
    pointerEvents: contentOpacity.value > 0.1 ? "auto" : "none",
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* Content layer - always rendered but hidden when loading */}
      <Animated.View style={contentStyle}>
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
              <JobCard
                job={item}
                isBookmarked={bookmarkedIds.has(item.id)}
                onToggleBookmark={onToggleBookmark}
                index={index}
                shouldAnimate={shouldAnimateCards}
              />
            </View>
          )}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: contentInset?.bottom ?? 24 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isLoading}
        />
      </Animated.View>

      {/* Skeleton layer - overlays content when loading */}
      <Animated.View style={skeletonStyle}>
        <FlatList
          data={Array.from({ length: SKELETON_COUNT })}
          keyExtractor={(_, index) => `skeleton-${index}`}
          renderItem={() => (
            <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
              <JobCardSkeleton />
            </View>
          )}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: contentInset?.bottom ?? 24 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={isLoading}
        />
      </Animated.View>
    </View>
  );
}
