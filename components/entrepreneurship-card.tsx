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
        {/* Left Icon */}
        <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
          <FontAwesome5 name="rocket" size={24} color="#fff" />
        </View>

        {/* Main Content */}
        <View style={styles.textContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
            {title}
          </ThemedText>

          <ThemedText style={[styles.description, { color: textSecondary }]} numberOfLines={3}>
            {description}
          </ThemedText>

          <View style={styles.metaContainer}>
            <View style={styles.categoryTag}>
              <ThemedText style={styles.categoryText}>{category}</ThemedText>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="eye" size={12} color={textSecondary} />
              <ThemedText style={[styles.metaText, { color: textSecondary }]}>
                {views} views
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Right Action Button */}
        <TouchableOpacity
          style={styles.viewButton}
          onPress={onView}
          activeOpacity={0.8}>
          <ThemedText style={styles.viewButtonText}>View</ThemedText>
        </TouchableOpacity>
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
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
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
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
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
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    minWidth: 70,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

