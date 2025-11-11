// src/components/jobCenter/sectionHeader.tsx
import { BRAND } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SectionHeader({
  title,
  onPress,
  actionText = 'View all',
}: { title: string; onPress?: () => void; actionText?: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {onPress && (
        <TouchableOpacity style={styles.linkContainer} onPress={onPress}>
          <Text style={styles.link}>{actionText}</Text>
          <Ionicons name="chevron-forward" size={16} color={BRAND} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 24, 
    marginBottom: 12 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#1f2937',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  link: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: BRAND,
  },
});