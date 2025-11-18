import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface EntrepreneurshipCardProps {
  title: string;
  description: string;
  category?: string;
  views?: number;
  iconColor: string;
  onView?: () => void;
}

export function EntrepreneurshipCard({
  title,
  description,
  category = 'Training',
  views = 0,
  iconColor,
  onView,
}: EntrepreneurshipCardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const textSecondary = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
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
          shadowRadius: 8,
          elevation: 4,
        },
      ]}>
      <View style={styles.content}>
        {/* Top Row: Icon and Content */}
        <View style={styles.topRow}>
          {/* Icon Section */}
          <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
            <FontAwesome5 name="rocket" size={24} color="#fff" />
          </View>

          {/* Content Section */}
          <View style={styles.textContainer}>
            <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
              {title}
            </ThemedText>

            <ThemedText style={[styles.description, { color: textSecondary }]} numberOfLines={3}>
              {description}
            </ThemedText>
          </View>
        </View>

        {/* Bottom Row: Metadata and View Button */}
        <View style={styles.bottomRow}>
          <View style={styles.metaContainer}>
            <View style={styles.categoryTag}>
              <ThemedText style={styles.categoryText}>{category}</ThemedText>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="eye" size={12} color={textSecondary} />
              <ThemedText style={[styles.metaText, { color: textSecondary }]}>
                {views}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={onView}
            activeOpacity={0.8}>
            <ThemedText style={styles.viewButtonText}>View</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginLeft: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryTag: {
    backgroundColor: '#10b981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  viewButton: {
    backgroundColor: '#046A38',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 16,
    minWidth: 70,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

