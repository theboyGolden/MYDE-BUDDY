import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/header';
import { ScholarshipCard } from '@/components/scholarship-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface Scholarship {
  id: string;
  title: string;
  description: string;
  deadline: string;
  imageUri: string;
  location?: string;
  views?: number;
}

const sampleScholarships: Scholarship[] = [
  {
    id: '1',
    title: 'The Boren Awards',
    description:
      'Are you an undergraduate or graduate student interested in studying abroad? If so, consider applying for the Boren Awards! The Boren Awards are open to postsecondary U.S. students interested in studying abroad in world regions critical to U.S. interests.',
    deadline: '21/01/26',
    imageUri: 'https://picsum.photos/200/200?random=1',
    location: 'N/A',
    views: 0,
  },
  {
    id: '2',
    title: '"Mom to Scholar" Scholarship for Mothers',
    description:
      'The "Mom to Scholar" Scholarship for Mothers is open to mothers who want to begin or resume their journey towards earning a technical or college degree. This scholarship is funded by Scholarships360\'s own Maria Geiger, who started her journey as a mother pursuing higher education.',
    deadline: '31/01/26',
    imageUri: 'https://picsum.photos/200/200?random=2',
    location: 'N/A',
    views: 0,
  },
  {
    id: '3',
    title: 'Sharing is Caring Scholarship',
    description:
      'Did you know you can win a $1,000 scholarship just by sharing Scholarships360 with your friends? The Sharing is Caring Scholarship is open to all Scholarships360 users who refer their friends to Scholarships360. The more people you refer, the higher your chances!',
    deadline: '31/12/25',
    imageUri: 'https://picsum.photos/200/200?random=3',
    location: 'N/A',
    views: 0,
  },
  {
    id: '4',
    title: 'Designli Empowering Women in Tech Scholarship',
    description:
      'Are you a female high school senior, undergraduate, or graduate student with a passion for technology and entrepreneurship? If so, the Designli Empowering Women in Tech Essay Scholarship is for you! This incredible $3,000 scholarship is open to women pursuing careers in tech.',
    deadline: '30/11/25',
    imageUri: 'https://picsum.photos/200/200?random=4',
    location: 'N/A',
    views: 0,
  },
  {
    id: '5',
    title: 'STEM Excellence Scholarship',
    description:
      'The STEM Excellence Scholarship supports outstanding students pursuing degrees in Science, Technology, Engineering, or Mathematics. This $5,000 award recognizes academic achievement and commitment to innovation in STEM fields.',
    deadline: '15/02/26',
    imageUri: 'https://picsum.photos/200/200?random=5',
    location: 'N/A',
    views: 0,
  },
];

export default function EducationCentreScreen() {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'chat'>('opportunities');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = '#f97316'; // Orange color for active tab
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
  );
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );

  const handleApply = (scholarshipId: string) => {
    console.log('Apply for scholarship:', scholarshipId);
    // Handle apply logic
  };

  const handleRefresh = () => {
    console.log('Refreshing scholarships...');
    // Handle refresh logic
  };

  return (
    <View style={styles.container}>
      <Header title="Education Centre" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'opportunities'
                ? [styles.activeTab, { backgroundColor: tintColor }]
                : [styles.inactiveTab, { borderColor: textSecondary }],
            ]}
            onPress={() => setActiveTab('opportunities')}
            activeOpacity={0.7}>
            <FontAwesome5
              name="graduation-cap"
              size={16}
              color={activeTab === 'opportunities' ? '#fff' : textSecondary}
            />
            <ThemedText
              style={[
                styles.tabText,
                { color: activeTab === 'opportunities' ? '#fff' : textSecondary },
              ]}>
              Opportunities
            </ThemedText>
            {activeTab === 'opportunities' && (
              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>{sampleScholarships.length}</ThemedText>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'chat'
                ? [styles.activeTab, { backgroundColor: textSecondary }]
                : [styles.inactiveTab, { borderColor: textSecondary }],
            ]}
            onPress={() => setActiveTab('chat')}
            activeOpacity={0.7}>
            <FontAwesome5
              name="comments"
              size={16}
              color={activeTab === 'chat' ? '#fff' : textSecondary}
            />
            <ThemedText
              style={[
                styles.tabText,
                { color: activeTab === 'chat' ? '#fff' : textSecondary },
              ]}>
              AI Assistant
            </ThemedText>
          </TouchableOpacity>
        </View>
        

        {activeTab === 'opportunities' && (
          <>
           

            {/* Scholarships List */}
            <View style={styles.scholarshipsContainer}>
              {sampleScholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  title={scholarship.title}
                  description={scholarship.description}
                  deadline={scholarship.deadline}
                  imageUri={scholarship.imageUri}
                  location={scholarship.location}
                  views={scholarship.views}
                  onApply={() => handleApply(scholarship.id)}
                />
              ))}
            </View>
          </>
        )}

        {activeTab === 'chat' && (
          <ThemedView style={styles.chatPlaceholder}>
            <FontAwesome5 name="comments" size={48} color={textSecondary} />
            <ThemedText style={[styles.placeholderText, { color: textSecondary }]}>
              AI Chat Assistant coming soon
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
    minWidth: 120,
  },
  activeTab: {
    backgroundColor: '#f97316',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  refreshText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#f97316', // Orange banner
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  viewAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scholarshipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chatPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  placeholderText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
