// src/app/(tabs)/JobCenterScreen.tsx
import BrowseCategories from '@/components/jobCenter/browseCategories';
import RemoteJobs from '@/components/jobCenter/remoteJobs';
import SearchBar from '@/components/jobCenter/searchBar';
import SectionHeader from '@/components/jobCenter/sectionHeader';
import TopCompanies from '@/components/jobCenter/topCompanies';
import { BRAND_BG } from '@/constants/colors';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JobCenterScreen() {
  const handleCategory = (id: string) => {
    console.log('Category pressed:', id);
  };

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Explore Jobs</Text>

        <SearchBar />

        <Text style={styles.section}>Browse by category</Text>
        <BrowseCategories onPress={handleCategory} />

        <SectionHeader title="Top Company" onPress={() => {}} />
        <TopCompanies />

        <SectionHeader title="Remote Jobs" onPress={() => {}} />
        <RemoteJobs />

        <SectionHeader title="Recommendation jobs" />
        {/* You can reuse RemoteJobs with different data later */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: BRAND_BG, paddingHorizontal: 20 },
  scroll: { flexGrow: 1},
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', paddingBottom: 6, marginTop: 6 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 12, marginBottom: 8 },
});
