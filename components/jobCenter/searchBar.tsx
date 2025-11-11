// src/components/jobCenter/searchBar.tsx
import { TEXT_MUTED, WHITE } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  onFilterPress?: () => void;
};

export default function SearchBar({ onFilterPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={TEXT_MUTED} />
        <TextInput
          placeholder="Search jobs, companies..."
          placeholderTextColor={TEXT_MUTED}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <View style={styles.filterGradient}>
          <Ionicons name="options-outline" size={20} color={WHITE} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: WHITE,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: { 
    flex: 1, 
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterGradient: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0971d', // Using BRAND color directly
  },
});