import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AIChatAssistant } from '@/components/ai-chat-assistant';
import { Header } from '@/components/header';
import { JobCentreTabs } from '@/components/job-centre-tabs';
import { JobsSection } from '@/components/jobs-section';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

// Sample job data
const matchedJobs = [
  {
    companyName: 'Datus International School',
    location: 'Accra & Tema Region',
    jobTitle: 'Graduate Trainees',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Vanderbilt limited',
    location: 'Accra & Tema Region',
    jobTitle: 'Graphic Designer/Video Editor',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Personnel Practice Limited',
    location: 'Accra & Tema Region',
    jobTitle: 'Sales Manager',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Petra Trust Company Ltd',
    location: 'Accra & Tema Region',
    jobTitle: 'Sales Advisor',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Sylprin Company Limited',
    location: 'Accra & Tema Region',
    jobTitle: 'Business Manager - Bakery Factory',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Mobile Sport Ghana Limited',
    location: 'Accra & Tema Region',
    jobTitle: 'Brand Campaign Coordinator',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
];

const recommendedJobs = [
  {
    companyName: 'IT & Electric Limited',
    location: 'Accra & Tema Region',
    jobTitle: 'Accounts Officer',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'The Truth Company LTD',
    location: 'Accra & Tema Region',
    jobTitle: 'Mobile Bankers',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Peacemaker Foods',
    location: 'Accra & Tema Region',
    jobTitle: 'Sales and Marketing Officer',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Transworld Business Advisors',
    location: 'Accra & Tema Region',
    jobTitle: 'Sales Manager',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'Allegro Travel and Tours',
    location: 'Accra & Tema Region',
    jobTitle: 'Accounts and Social Media Officer',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
  {
    companyName: 'A Reputable HR Firm',
    location: 'Accra & Tema Region',
    jobTitle: 'Telesales Consultant',
    jobSalary: 'Confidential',
    matchPercentage: 1,
  },
];

export default function JobCentreScreen() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'ai-chat'>('jobs');
  const iconColor = useThemeColor({}, 'tint');
  const aiChatBackgroundColor = useThemeColor(
    { light: '#fff', dark: '#151718' },
    'background'
  );

  return (
    <View style={styles.container}>
      <Header title="Job Intelligence Center" />
      <JobCentreTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'jobs' ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.content}>
            {/* Matched Jobs Section */}
            <JobsSection title="Matched Jobs" count={12} jobs={matchedJobs} />

            {/* Recommended Jobs Section */}
            <JobsSection title="Recommended Jobs" count={38} jobs={recommendedJobs} />
          </ThemedView>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ThemedView
            style={[
              styles.content,
              {
                backgroundColor: aiChatBackgroundColor,
              },
            ]}>
            <AIChatAssistant />
          </ThemedView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  jobCentreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  jobCentreTitle: {
    fontSize: 20,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  refreshButton: {
    padding: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
