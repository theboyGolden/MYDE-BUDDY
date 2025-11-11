// src/components/jobCenter/remoteJobs.tsx
import { BRAND, TEXT_MUTED } from '@/constants/colors';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import JobCard from './JobCard';

type Job = {
  id: string;
  company: string;
  companyLogo: any;
  title: string;
  salary: string;         // "$1100 - $12,000/Month"
  type: 'Fulltime' | 'Part time' | 'Remote' | 'Freelance';
  posted: string;         // "2 Day ago"
  bookmarked?: boolean;
};

const initialData: Job[] = [
  {
    id: '1',
    company: 'Spotify USA Inc',
    companyLogo: { uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png' },
    title: 'Sr. UX Designer',
    salary: '$1100 - $12,000/Month',
    type: 'Fulltime',
    posted: '2 Day ago',
    bookmarked: false,
  },
  {
    id: '2',
    company: 'Airbnb',
    companyLogo: { uri: 'https://i.pinimg.com/736x/64/1f/36/641f3605eb8e2d6b17b817431b20fa9b.jpg' },
    title: 'Sr. Front-end Dev',
    salary: '$1100 - $12,000/Month',
    type: 'Fulltime',
    posted: '2 Day ago',
    bookmarked: true,
  },
];

export default function RemoteJobs() {
  const [jobs, setJobs] = useState<Job[]>(initialData);

  const handleBookmark = (jobId: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { ...job, bookmarked: !job.bookmarked }
          : job
      )
    );
    console.log('Bookmark toggled for job:', jobId);
  };

  const handleApply = (jobId: string) => {
    console.log('Apply pressed for job:', jobId);
    // Add your apply logic here
  };

  return (
    <FlatList
      data={jobs}
      keyExtractor={i => i.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <JobCard 
          job={item} 
          onBookmark={handleBookmark}
          onApply={handleApply}
          style={styles.horizontalCard}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { 
    gap: 12,
    paddingHorizontal: 2, // Add some padding to prevent cards from being cut off
  },
  horizontalCard: {
    width: 280,
    marginRight: 12,
  },
  // Keeping the old styles for reference, but they're not used anymore
  card: {
    width: 240,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eef0f5',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  logoWrap: { height: 48, width: 48, borderRadius: 14, backgroundColor: '#eafff3', alignItems: 'center', justifyContent: 'center' },
  logo: { height: 32, width: 32, resizeMode: 'contain' },
  company: { color: TEXT_MUTED, marginTop: 6 },
  title: { fontSize: 16, fontWeight: '700', marginTop: 4 },
  salary: { color: TEXT_MUTED, marginTop: 2, marginBottom: 8 },
  tagsRow: { flexDirection: 'row', gap: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#f4f6fb', borderRadius: 20, borderColor: '#e7ebf5', borderWidth: 1 },
  tagText: { fontSize: 12, color: TEXT_MUTED },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  posted: { color: TEXT_MUTED, fontSize: 12 },
  apply: { backgroundColor: BRAND, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  applyText: { color: '#fff', fontWeight: '700' },
});