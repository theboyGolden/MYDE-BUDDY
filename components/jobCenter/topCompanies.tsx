// src/components/jobCenter/topCompanies.tsx
import { TEXT_MUTED } from '@/constants/colors';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

type Company = { id: string; name: string; jobsOpen: number; logo: any; };

const DATA: Company[] = [
  { id: 'spotify', name: 'Spotify USA Inc', jobsOpen: 9,  logo: { uri: 'https://i.imgur.com/0Z8FQZC.png' } },
  { id: 'valve',   name: 'Valve Corporation', jobsOpen: 11, logo: { uri: 'https://i.imgur.com/3VgL5OQ.png' } },
];

export default function TopCompanies() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={i => i.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.logoWrap}>
            <Image source={item.logo} style={styles.logo} />
          </View>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.meta}>{item.jobsOpen} Jobs open</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eef0f5',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  logoWrap: {
    height: 56, width: 56, borderRadius: 16,
    backgroundColor: '#eafff3', alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  logo: { height: 36, width: 36, borderRadius: 8, resizeMode: 'contain' },
  name: { fontWeight: '700', marginBottom: 6 },
  meta: { fontSize: 12, color: TEXT_MUTED },
});
