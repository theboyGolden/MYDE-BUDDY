import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { OpportunityCard } from '@/components/opportunity-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface Opportunity {
  type: string;
  letter: string;
  createdDate: string;
  tag: string;
  allOpps: number;
  activeOpps: number;
  matches: number;
  iconColor: string;
}

export function OpportunitiesCentreSection() {
  const router = useRouter();
  const iconColor = useThemeColor({}, 'tint');

  const opportunities: Opportunity[] = [
    {
      type: 'Merit-based',
      letter: 'M',
      createdDate: 'Oct 11, 2025',
      tag: 'Medium',
      allOpps: 167,
      activeOpps: 167,
      matches: 0,
      iconColor: '#6A1B9A',
    },
    {
      type: 'Merit-based',
      letter: 'M',
      createdDate: 'Nov 3, 2025',
      tag: 'Medium',
      allOpps: 216,
      activeOpps: 216,
      matches: 0,
      iconColor: '#6A1B9A',
    },
    {
      type: 'Need-based',
      letter: 'N',
      createdDate: 'Nov 4, 2025',
      tag: 'Medium',
      allOpps: 70,
      activeOpps: 70,
      matches: 0,
      iconColor: '#6A1B9A',
    },
    {
      type: 'Need-based',
      letter: 'N',
      createdDate: 'Oct 30, 2025',
      tag: 'Medium',
      allOpps: 0,
      activeOpps: 0,
      matches: 0,
      iconColor: '#6A1B9A',
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
        <View>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Opportunities Centre
          </ThemedText>
          <ThemedText style={styles.subtitle}>21 categories available</ThemedText>
        </View>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => {
            // Navigate to full opportunities view
            console.log('View all opportunities');
          }}
          activeOpacity={0.7}>
          <ThemedText style={[styles.viewAllText, { color: iconColor }]}>View all</ThemedText>
          <MaterialIcons name="arrow-forward" size={18} color={iconColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {opportunities.map((opportunity, index) => (
          <OpportunityCard
            key={index}
            type={opportunity.type}
            letter={opportunity.letter}
            createdDate={opportunity.createdDate}
            tag={opportunity.tag}
            allOpps={opportunity.allOpps}
            activeOpps={opportunity.activeOpps}
            matches={opportunity.matches}
            iconColor={opportunity.iconColor}
          />
        ))}
      </ScrollView>
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
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
  scrollView: {
    maxHeight: 400,
  },
});

