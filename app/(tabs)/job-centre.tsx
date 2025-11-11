// src/app/(tabs)/JobCenterScreen.tsx
import BrowseCategories from '@/components/jobCenter/browseCategories';
import FilterSheet, { FilterOptions } from '@/components/jobCenter/modals/FilterSheet';
import RemoteJobs from '@/components/jobCenter/remoteJobs';
import SearchBar from '@/components/jobCenter/searchBar';
import SectionHeader from '@/components/jobCenter/sectionHeader';
import TopCompanies from '@/components/jobCenter/topCompanies';
import { BRAND, BRAND_BG, CARD_BG, TEXT_MUTED } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JobCenterScreen() {
  const handleCategory = (id: string) => {
    console.log('Category pressed:', id);
  };

  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    category: undefined,
    jobType: undefined,
    location: undefined,
    salaryUnit: 'Monthly',
    salaryMin: '',
    salaryMax: '',
  });

  const handleFilterPress = () => {
    setShowFilters(true);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    setShowFilters(false);
    console.log('Applied filters:', filters);
    // Here you would typically filter your job data
  };

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Explore Jobs</Text>

        <SearchBar onFilterPress={handleFilterPress}/>

        <Text style={styles.section}>Browse by category</Text>
        <BrowseCategories onPress={handleCategory} />

        <SectionHeader title="Top Company" onPress={() => {}} />
        <TopCompanies />

        <SectionHeader title="Remote Jobs" onPress={() => {}} />
        <RemoteJobs />

        <SectionHeader title="Recommendation jobs" />
        <View style={styles.recommendTile}>
          <View style={styles.recommendRow}>
            <View style={styles.companyInfo}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('./../../assets/images/netflix.png')}
                  style={styles.logo}
                />
              </View>
              <View style={styles.jobDetails}>
                <Text style={styles.company}>Netflix</Text>
                <Text style={styles.jobTitle}>Game Developer</Text>
                <Text style={styles.salary}>$1000-$1500/Month</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookmarkBtn}>
              <Ionicons name="bookmark-outline" size={24} color={BRAND} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Fulltime</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Remote</Text>
            </View>
            <View style={styles.timeTag}>
              <Ionicons name="time-outline" size={12} color={TEXT_MUTED} />
              <Text style={styles.timeText}>2 days ago</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>Apply now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FilterSheet
        visible={showFilters}
        onClose={handleCloseFilters}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { 
    flex: 1, 
    backgroundColor: BRAND_BG, 
    paddingHorizontal: 20, 
    paddingBottom: -33 
  },
  scroll: { 
    flexGrow: 1,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    paddingBottom: 6, 
    marginTop: 6,
    color: '#1f2937',
  },
  section: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginTop: 24, 
    marginBottom: 16,
    color: '#1f2937',
  },
  recommendTile: {
    backgroundColor: 'white',
    minHeight: 200,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 16,
  },
  recommendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  logoContainer: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: CARD_BG,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logo: {
    maxHeight: 30,
    maxWidth: 30,
  },
  jobDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  company: {
    color: TEXT_MUTED,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  jobTitle: {
    paddingTop: 4,
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 4,
    color: '#1f2937',
  },
  salary: {
    color: BRAND,
    fontWeight: '600',
    fontSize: 14,
  },
  bookmarkBtn: {
    padding: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff8ee',
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: TEXT_MUTED,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 12,
    color: BRAND,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: BRAND,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});