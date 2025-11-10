import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { JobCard } from '@/components/job-card';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface Job {
  companyName: string;
  companyLogo?: any;
  location: string;
  jobTitle: string;
  jobSalary: string;
  matchPercentage: number;
}

interface JobsSectionProps {
  title: string;
  count: number;
  jobs: Job[];
  onViewAll?: () => void;
}

export function JobsSection({ title, count, jobs, onViewAll }: JobsSectionProps) {
  const iconColor = useThemeColor({}, 'tint');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title} ({count})
        </ThemedText>
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll} activeOpacity={0.7}>
          <ThemedText style={[styles.viewAllText, { color: iconColor }]}>View All</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.jobsGrid}>
        {jobs.slice(0, 2).map((job, index) => (
          <View key={index} style={styles.jobCardWrapper}>
            <JobCard
              companyName={job.companyName}
              companyLogo={job.companyLogo}
              location={job.location}
              jobTitle={job.jobTitle}
              jobSalary={job.jobSalary}
              matchPercentage={job.matchPercentage}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
  },
  viewAllButton: {
    paddingVertical: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  jobsGrid: {
    gap: 12,
  },
  jobCardWrapper: {
    width: '100%',
    marginBottom: 12,
  },
});

