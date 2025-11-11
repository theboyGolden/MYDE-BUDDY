// src/components/jobCenter/remoteJobs.tsx
import { BRAND, TEXT_MUTED } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

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

const DATA: Job[] = [
  {
    id: '1',
    company: 'Spotify USA Inc',
    companyLogo: { uri: 'https://i.imgur.com/0Z8FQZC.png' },
    title: 'Sr. UX Designer',
    salary: '$1100 - $12,000/Month',
    type: 'Fulltime',
    posted: '2 Day ago',
    bookmarked: false,
  },
  {
    id: '2',
    company: 'Airbnb',
    companyLogo: { uri: 'https://i.imgur.com/1hZQe6W.png' },
    title: 'Sr. Front-end Dev',
    salary: '$1100 - $12,000/Month',
    type: 'Fulltime',
    posted: '2 Day ago',
    bookmarked: true,
  },
];

export default function RemoteJobs() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={i => i.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <Image source={item.companyLogo} style={styles.logo} />
            </View>
            <Ionicons
              name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={item.bookmarked ? BRAND : TEXT_MUTED}
            />
          </View>

          <Text style={styles.company} numberOfLines={1}>{item.company}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.salary}>{item.salary}</Text>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.type}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.posted}>{item.posted}</Text>
            <View style={styles.apply}>
              <Text style={styles.applyText}>Apply</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
