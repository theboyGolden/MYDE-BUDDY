import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { EntrepreneurshipCard } from '@/components/entrepreneurship-card';
import { Header } from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface EntrepreneurshipOpportunity {
  id: string;
  title: string;
  description: string;
  category?: string;
  views?: number;
  iconColor: string;
}

const sampleOpportunities: EntrepreneurshipOpportunity[] = [
  {
    id: '1',
    title: 'AutoCAD 2018 - Create 3D Projects and Design Tutorial [COMPLETE]*',
    description:
      '[VOICE + TEXT] Get into a new Way of Learning 3D Projects with AutoCAD 2018. AutoCAD 2018 tutorial for beginners, basics. Full Guide here: http://bit.ly/autocad2018 Enable SUBTITLES if you have trouble at understanding the narration. Leave a comment if you have any questions.',
    category: 'Training',
    views: 0,
    iconColor: '#ef4444', // Red
  },
  {
    id: '2',
    title: 'US CMA course Complete details | Salary, Scope, Eligibility, Fees, duration, | Neha Patel',
    description:
      'Pls fill out the below google form link for FREE COUNSELLING session on US CMA: https://forms.gle/FdnrUtbFfL5WY8W08',
    category: 'Training',
    views: 0,
    iconColor: '#8b5cf6', // Purple
  },
  {
    id: '3',
    title: 'Dog training - Aggression In Depth - John Rogerson',
    description:
      'Preview Clip DVD Title: Aggression in Depth Presenter: John Rogerson Full DVD available at: http://www.tawzerdog.com In this 3-day seminar you will find: relationships that owners have with their dogs, defining what is meant by aggression as distinct from other behaviors.',
    category: 'Training',
    views: 0,
    iconColor: '#ec4899', // Magenta
  },
  {
    id: '4',
    title: 'Install Latest Python and PyCharm on Windows 11 | Python Full Course for Beginners - Lecture #2',
    description:
      'Learn how to install Python and PyCharm on Windows 11. This is the second lecture in our comprehensive Python course for beginners. We will cover everything you need to get started with Python programming.',
    category: 'Training',
    views: 0,
    iconColor: '#10b981', // Green
  },
  {
    id: '5',
    title: 'Business Strategy and Planning Workshop',
    description:
      'Join our comprehensive workshop on business strategy and planning. Learn how to develop effective business plans, analyze market opportunities, and create sustainable business models. Perfect for aspiring entrepreneurs.',
    category: 'Workshop',
    views: 0,
    iconColor: '#f59e0b', // Amber
  },
  {
    id: '6',
    title: 'Digital Marketing Masterclass for Entrepreneurs',
    description:
      'Master the art of digital marketing for your business. Learn SEO, social media marketing, content creation, and email marketing strategies that will help you grow your business online.',
    category: 'Training',
    views: 0,
    iconColor: '#06b6d4', // Cyan
  },
];

export default function EntrepreneurshipCentreScreen() {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'chat'>('opportunities');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = '#eab308'; // Yellow color for active tab
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
  );
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );

  const handleView = (opportunityId: string) => {
    console.log('View opportunity:', opportunityId);
    // Handle view logic
  };

  const handleRefresh = () => {
    console.log('Refreshing opportunities...');
    // Handle refresh logic
  };

  return (
    <View style={styles.container}>
      <Header title="Entrepreneurship Centre" />
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
              name="rocket"
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
                <ThemedText style={styles.badgeText}>{sampleOpportunities.length}</ThemedText>
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
          <View style={styles.opportunitiesContainer}>
            {sampleOpportunities.map((opportunity) => (
              <EntrepreneurshipCard
                key={opportunity.id}
                title={opportunity.title}
                description={opportunity.description}
                category={opportunity.category}
                views={opportunity.views}
                iconColor={opportunity.iconColor}
                onView={() => handleView(opportunity.id)}
              />
            ))}
          </View>
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
    backgroundColor: '#eab308',
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
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
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
  opportunitiesContainer: {
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
