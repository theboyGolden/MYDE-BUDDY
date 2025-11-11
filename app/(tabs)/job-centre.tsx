// src/app/(tabs)/JobCenterScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/header';
import BrowseCategories from '@/components/jobCenter/browseCategories';
import FilterSheet, { FilterOptions } from '@/components/jobCenter/modals/FilterSheet';
import RemoteJobs from '@/components/jobCenter/remoteJobs';
import SearchBar from '@/components/jobCenter/searchBar';
import SectionHeader from '@/components/jobCenter/sectionHeader';
import TopCompanies from '@/components/jobCenter/topCompanies';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CARD_BG, TEXT_MUTED } from '@/constants/colors';
import { useThemeColor } from '@/hooks/use-theme-color';

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

  const background = useThemeColor({}, 'background');
  const surface = useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background');
  const text = useThemeColor({}, 'text');
  const muted = useThemeColor({ light: TEXT_MUTED, dark: '#c7c7c7' }, 'text');
  const brand = useThemeColor({}, 'tint');
  const tagBackground = useThemeColor({ light: '#f8fafc', dark: '#252525' }, 'background');
  const tagBorder = useThemeColor({ light: '#f1f5f9', dark: '#2f2f2f' }, 'background');
  const tagAltBackground = useThemeColor({ light: '#fff8ee', dark: '#2a1f12' }, 'background');
  const shadowColor = useThemeColor({ light: '#000000', dark: '#000000' }, 'background');

  const palette = useMemo(
    () => ({
      background,
      surface,
      text,
      muted,
      brand,
      tagBackground,
      tagBorder,
      tagAltBackground,
      shadowColor,
    }),
    [background, surface, text, muted, brand, tagBackground, tagBorder, tagAltBackground, shadowColor],
  );

  const styles = useMemo(
    () =>
      createStyles({
        background: palette.background,
        surface: palette.surface,
        text: palette.text,
        muted: palette.muted,
        brand: palette.brand,
        tagBackground: palette.tagBackground,
        tagBorder: palette.tagBorder,
        tagAltBackground: palette.tagAltBackground,
        shadowColor: palette.shadowColor,
      }),
    [palette],
  );

  return (
    <ThemedView style={styles.container}>
      <Header title="Job Centre" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.title}>Explore Jobs</ThemedText>

        <SearchBar onFilterPress={handleFilterPress} />

        <ThemedText style={styles.section}>Browse by category</ThemedText>
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
                <Image source={require('@/assets/images/netflix.png')} style={styles.logo} />
              </View>
              <View style={styles.jobDetails}>
                <ThemedText style={styles.company}>Netflix</ThemedText>
                <ThemedText style={styles.jobTitle}>Game Developer</ThemedText>
                <ThemedText style={styles.salary}>$1000-$1500/Month</ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.bookmarkBtn}>
              <Ionicons name="bookmark-outline" size={24} color={palette.brand} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>Fulltime</ThemedText>
            </View>
            <View style={styles.tag}>
              <ThemedText style={styles.tagText}>Remote</ThemedText>
            </View>
            <View style={styles.timeTag}>
              <Ionicons name="time-outline" size={12} color={palette.muted} />
              <ThemedText style={styles.timeText}>2 days ago</ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <ThemedText style={styles.applyText}>Apply now</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FilterSheet
        visible={showFilters}
        onClose={handleCloseFilters}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </ThemedView>
  );
}

const createStyles = (palette: {
  background: string;
  surface: string;
  text: string;
  muted: string;
  brand: string;
  tagBackground: string;
  tagBorder: string;
  tagAltBackground: string;
  shadowColor: string;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      gap: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      textAlign: 'center',
      paddingBottom: 6,
      marginTop: 6,
      paddingTop: 10,
      color: palette.text,
    },
    section: {
      fontSize: 20,
      fontWeight: '700',
      marginTop: 12,
      marginBottom: 12,
      color: palette.text,
    },
    recommendTile: {
      backgroundColor: palette.surface,
      borderRadius: 20,
      padding: 20,
      shadowColor: palette.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
      gap: 20,
    },
    recommendRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12,
    },
    companyInfo: {
      flexDirection: 'row',
      flex: 1,
      gap: 12,
    },
    logoContainer: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: CARD_BG,
      height: 60,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      maxHeight: 30,
      maxWidth: 30,
      resizeMode: 'contain',
    },
    jobDetails: {
      flexDirection: 'column',
      flex: 1,
      gap: 4,
    },
    company: {
      color: palette.muted,
      fontWeight: '600',
      fontSize: 14,
    },
    jobTitle: {
      fontWeight: '700',
      fontSize: 18,
      color: palette.text,
    },
    salary: {
      color: palette.brand,
      fontWeight: '600',
      fontSize: 14,
    },
    bookmarkBtn: {
      padding: 4,
    },
    tagsRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    tag: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: palette.tagBackground,
      borderWidth: 1,
      borderColor: palette.tagBorder,
    },
    timeTag: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: palette.tagAltBackground,
      gap: 4,
    },
    tagText: {
      fontSize: 12,
      color: palette.muted,
      fontWeight: '500',
    },
    timeText: {
      fontSize: 12,
      color: palette.brand,
      fontWeight: '500',
    },
    applyButton: {
      backgroundColor: palette.brand,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },
  });