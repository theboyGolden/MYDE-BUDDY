// src/components/jobCenter/browseCategories.tsx
import { BRAND, CARD_BG, TEXT_MUTED } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Category = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const CATEGORIES: Category[] = [
  { id: 'company',   label: 'Company',   icon: 'business-outline' },
  { id: 'fulltime',  label: 'Full time', icon: 'time-outline' },
  { id: 'parttime',  label: 'Part time', icon: 'hourglass-outline' },
  { id: 'freelance', label: 'Freelance', icon: 'brush-outline' },
];

type Props = { onPress?: (id: string) => void; };

export default function BrowseCategories({ onPress }: Props) {
  return (
    <View style={styles.grid}>
      {CATEGORIES.map(c => (
        <View key={c.id} style={styles.item}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPress?.(c.id)}
            style={styles.card}
          >
            <View style={styles.brandDot}>
              <Ionicons name={c.icon} size={18} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>{c.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: { width: '23%', alignItems: 'center' },
  card: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandDot: {
    height: 40, width: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: BRAND,
  },
  label: { fontSize: 12, color: TEXT_MUTED, marginTop: 8, textAlign: 'center' },
});
