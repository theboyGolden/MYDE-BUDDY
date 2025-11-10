import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CareerPathwayCardProps {
  title: string;
  imageSource: any;
}

export function CareerPathwayCard({ title, imageSource }: CareerPathwayCardProps) {
  const cardBackgroundColor = useThemeColor(
    { light: '#E3F2FD', dark: '#1a3a5c' },
    'background'
  );

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: cardBackgroundColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.titleContainer}>
        <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
          {title}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    flex: 1,
    gap: 6,
    maxWidth: '100%',
  },
  imageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 11,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

