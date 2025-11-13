import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import SearchFilterSheet, { SearchFilterOptions } from '@/components/search-filter-sheet';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface WelcomeCardProps {
  userName: string;
  onSearch?: (query: string, filters?: SearchFilterOptions) => void;
}

export function WelcomeCard({ userName, onSearch }: WelcomeCardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilterOptions>({});
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const inputBackgroundColor = useThemeColor(
    { light: '#f5f5f5', dark: '#2a2a2a' },
    'background'
  );

  const handleSearch = () => {
    onSearch?.(searchQuery, filters);
  };

  const handleApplyFilters = (appliedFilters: SearchFilterOptions) => {
    setFilters(appliedFilters);
    onSearch?.(searchQuery, appliedFilters);
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
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
        <TouchableOpacity
          style={styles.filterButton}
          activeOpacity={0.7}
          onPress={() => setShowFilters(true)}>
          <FontAwesome5 name="sliders-h" size={18} color={iconColor} />
        </TouchableOpacity>
      </View>
      <SearchFilterSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
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
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
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
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
