import { MaterialIcons } from '@expo/vector-icons';
import { type Href, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CareerPathwayCard } from '@/components/career-pathway-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export function CareerPathwaySection() {
  const router = useRouter();
  const iconColor = useThemeColor({}, 'tint');

  const pathways: Array<{
    title: string;
    imageSource: any;
    href: Href;
  }> = [
    {
      title: 'Job Opportunities',
      imageSource: require('@/assets/images/job-opportunities.png'),
      href: '/job-centre',
    },
    {
      title: 'Education Opportunities',
      imageSource: require('@/assets/images/education-opportunities.png'),
      href: '/education-centre',
    },
    {
      title: 'Entrepreneurship',
      imageSource: require('@/assets/images/entrepreneurship.png'),
      href: '/entrepreneurship-centre',
    },
  ];

  const backgroundColor = useThemeColor({}, 'background');

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
          My Career Pathway
        </ThemedText>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => {
            // Navigate to full pathway view
            console.log('View all pathways');
          }}
          activeOpacity={0.7}>
          <ThemedText style={[styles.viewAllText, { color: iconColor }]}>View all</ThemedText>
          <MaterialIcons name="arrow-forward" size={18} color={iconColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {pathways.map((pathway, index) => (
          <View key={index} style={styles.cardWrapper}>
            <CareerPathwayCard
              title={pathway.title}
              imageSource={pathway.imageSource}
              onPress={() => router.push(pathway.href)}
            />
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 8,
  },
});

