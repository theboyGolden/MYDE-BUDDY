import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface WelcomeCardProps {
  userName: string;
  onSearch?: (query: string) => void;
}

export function WelcomeCard({ userName, onSearch }: WelcomeCardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const inputBackgroundColor = useThemeColor(
    { light: '#f5f5f5', dark: '#2a2a2a' },
    'background'
  );

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor: inputBackgroundColor, borderColor }]}>
        <FontAwesome5 name="search" size={18} color={iconColor} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Search..."
          placeholderTextColor={iconColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <FontAwesome5 name="sliders-h" size={18} color={iconColor} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 16,
    marginBottom: 7,
  },
  welcomeSection: {
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  filterButton: {
    padding: 4,
  },
});
