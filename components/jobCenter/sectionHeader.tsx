// src/components/jobCenter/sectionHeader.tsx
import { TEXT_MUTED } from '@/constants/colors';
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
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.link}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700' },
  link: { fontSize: 14, fontWeight: '600', color: TEXT_MUTED },
});
