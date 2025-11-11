// src/components/jobCenter/searchBar.tsx
import { TEXT_MUTED } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search-outline" size={18} color={TEXT_MUTED} />
      <TextInput
        placeholder="Search..."
        placeholderTextColor={TEXT_MUTED}
        style={styles.input}
      />
      <TouchableOpacity style={styles.action}>
        <Ionicons name="options-outline" size={18} color={TEXT_MUTED} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#e8ecf2',
    //backgroundColor: '#fff',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: { flex: 1, paddingVertical: 8 },
  action: {
    height: 28,
    width: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eef0f5',
  },
});
