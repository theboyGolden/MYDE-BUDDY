import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ScholarshipCardProps {
  title: string;
  description: string;
  deadline: string;
  imageUri?: string | number;
  location?: string;
  views?: number;
  onApply?: () => void;
  applyUrl?: string;
}

export function ScholarshipCard({
  title,
  description,
  deadline,
  imageUri,
  location = 'N/A',
  views = 0,
  onApply,
}: ScholarshipCardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const textSecondary = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
  );
  const iconColor = useThemeColor({}, 'icon');

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
        {/* Top Row: Image and Content */}
        <View style={styles.topRow}>
          {/* Image Section */}
          {imageUri && (
            <View style={styles.imageContainer}>
              <Image
                source={typeof imageUri === 'number' ? imageUri : { uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}

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

        {/* Bottom Row: Metadata and Apply Button */}
        <View style={styles.bottomRow}>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <FontAwesome5 name="map-marker-alt" size={12} color={iconColor} />
              <ThemedText style={[styles.metaText, { color: textSecondary }]}>
                {location}
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="eye" size={12} color={iconColor} />
              <ThemedText style={[styles.metaText, { color: textSecondary }]}>
                {views} views
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="calendar-alt" size={12} color={iconColor} />
              <ThemedText style={[
                styles.metaText,
                { color: textSecondary },
                deadline.toLowerCase() === 'varies' && { color: '#fbbf24' },
                deadline.toLowerCase() === 'ongoing' && { color: '#046A38' }
              ]}>
                {deadline}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={onApply}
            activeOpacity={0.8}>
            <ThemedText style={styles.applyButtonText}>Apply</ThemedText>
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
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
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
    marginLeft: 10  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    flex: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  applyButton: {
    backgroundColor: '#046A38',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 60,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

