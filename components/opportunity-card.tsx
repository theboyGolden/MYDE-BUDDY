import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface OpportunityCardProps {
  type: string;
  letter: string;
  createdDate: string;
  tag: string;
  allOpps: number;
  activeOpps: number;
  matches: number;
  iconColor: string;
}

export function OpportunityCard({
  type,
  letter,
  createdDate,
  tag,
  allOpps,
  activeOpps,
  matches,
  iconColor,
}: OpportunityCardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: '#fff' },
    'background'
  );
  const iconTextColor = useThemeColor({}, 'text');

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}>
      <View style={styles.content}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
            <ThemedText style={[styles.iconLetter, { color: '#fff' }]}>{letter}</ThemedText>
          </View>
          <View style={styles.detailsContainer}>
            <ThemedText type="defaultSemiBold" style={styles.typeText}>
              {type}
            </ThemedText>
            <View style={styles.dateContainer}>
              <MaterialIcons name="calendar-today" size={14} color={iconTextColor} />
              <ThemedText style={styles.dateText}>Created {createdDate}</ThemedText>
            </View>
            <View style={[styles.tag, { backgroundColor: '#FFF9C4' }]}>
              <ThemedText style={[styles.tagText, { color: '#F57F17' }]}>{tag}</ThemedText>
            </View>
          </View>
        </View>

        {/* Vertical Separator */}
        <View style={[styles.separator, { backgroundColor: borderColor }]} />

        {/* Right Section */}
        <View style={styles.rightSection}>
          <ThemedText type="defaultSemiBold" style={styles.statsTitle}>
            Opportunity Stats
          </ThemedText>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>All Opps.</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                {allOpps}
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Active Opps.</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                {activeOpps}
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Matches</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                {matches}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flexDirection: 'row',
    gap: 16,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLetter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    gap: 6,
  },
  typeText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 11,
    opacity: 0.6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
  rightSection: {
    width: 140,
    gap: 12,
  },
  statsTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    textAlign: 'center',
  },
});

