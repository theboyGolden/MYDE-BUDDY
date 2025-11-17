import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AIChatAssistant } from '@/components/ai-chat-assistant';
import { Header } from '@/components/header';
import { ScholarshipCard } from '@/components/scholarship-card';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface Scholarship {
  id: string;
  title: string;
  description: string;
  deadline: string;
  imageUri: string;
  location?: string;
  views?: number;
  applyUrl: string;
}

const sampleScholarships: Scholarship[] = [
  {
    id: '1',
    title: '$10,000 No-Essay Scholarship',
    description:
      'Get matched with vetted scholarships and enter our $10,000 No-Essay Scholarship. 100% Free. No Spam. Automatic entry for all Scholarships360 members. Open to high school and college students.',
    deadline: 'Ongoing',
    imageUri: 'https://picsum.photos/200/200?random=1',
    location: 'N/A',
    views: 1250,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '2',
    title: 'Easy Scholarships',
    description:
      '$461,500+ total value available. 36 scholarships still accepting applications. These scholarships have simple application processes and are perfect for students looking for quick opportunities.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=2',
    location: 'N/A',
    views: 890,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '3',
    title: 'Scholarships for HS Seniors',
    description:
      '$38,104,330+ total value available. 3,453 scholarships still accepting applications. Perfect for graduating high school seniors preparing for college.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=3',
    location: 'N/A',
    views: 2100,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '4',
    title: 'Scholarships for College Students',
    description:
      '$5,314,738+ total value available. 2,733 scholarships still accepting applications. Opportunities specifically for current college and university students.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=4',
    location: 'N/A',
    views: 1650,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '5',
    title: 'STEM Scholarships',
    description:
      '$487,000+ total value available. 464 scholarships still accepting applications. For students pursuing degrees in Science, Technology, Engineering, or Mathematics.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=5',
    location: 'N/A',
    views: 980,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '6',
    title: 'Scholarships for Black Students',
    description:
      '$1,186,000+ total value available. 195 scholarships still accepting applications. Dedicated opportunities for Black and African American students.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=6',
    location: 'N/A',
    views: 750,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '7',
    title: 'No Essay Scholarships',
    description:
      '$11,306,500+ total value available. 64 scholarships still accepting applications. Quick and easy scholarships that don\'t require essays - perfect for busy students.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=7',
    location: 'N/A',
    views: 3200,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '8',
    title: 'Scholarships for Women',
    description:
      '275 scholarships still accepting applications. Opportunities specifically designed to support women in their educational journey across all fields of study.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=8',
    location: 'N/A',
    views: 1420,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '9',
    title: 'Scholarships for HS Juniors',
    description:
      '$3,904,850+ total value available. 282 scholarships still accepting applications. Start your scholarship search early with opportunities for high school juniors.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=9',
    location: 'N/A',
    views: 680,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
  {
    id: '10',
    title: 'Skechers Foundation Scholarships',
    description:
      '$200,000 in exclusive scholarships from the Skechers Foundation! Recently published opportunities for students. Apply now for these exclusive awards.',
    deadline: 'Varies',
    imageUri: 'https://picsum.photos/200/200?random=10',
    location: 'N/A',
    views: 1850,
    applyUrl: 'https://scholarships360.org/scholarships',
  },
];

export default function EducationCentreScreen() {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'chat'>('opportunities');
  const [showChatHistory, setShowChatHistory] = useState(false);
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = '#046A38'; // Green color for active tab
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
  );
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );

  const handleApply = async (scholarshipId: string) => {
    const scholarship = sampleScholarships.find((s) => s.id === scholarshipId);
    if (scholarship?.applyUrl) {
      try {
        const canOpen = await Linking.canOpenURL(scholarship.applyUrl);
        if (canOpen) {
          await Linking.openURL(scholarship.applyUrl);
        }
      } catch (error) {
        console.error('Error opening URL:', error);
      }
    }
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
          <AIChatAssistant
            context="education"
            onChatHistoryToggle={() => setShowChatHistory(!showChatHistory)}
          />
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
    backgroundColor: '#046A38',
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
    backgroundColor: '#046A38', // Green banner
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
