// src/components/jobCenter/browseCategories.tsx
import { GRADIENT_END, GRADIENT_START, TEXT_MUTED, WHITE } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
      {CATEGORIES.map((c, index) => (
        <View key={c.id} style={styles.item}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onPress?.(c.id)}
            style={styles.card}
          >
            <LinearGradient
              colors={[GRADIENT_START, GRADIENT_END]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Ionicons name={c.icon} size={24} color={WHITE} />
            </LinearGradient>
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
  item: { 
    width: '18%', 
    alignItems: 'center' 
  },
  card: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { 
    fontSize: 12, 
    color: TEXT_MUTED, 
    marginTop: 8, 
    textAlign: 'center',
    fontWeight: '500',
  },
});