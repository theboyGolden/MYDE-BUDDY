import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    GRADIENT_END,
    GRADIENT_START
} from '@/constants/colors';
import { useThemeColor } from '@/hooks/use-theme-color';

export type SearchFilterOptions = {
  postType?: string;
  dateRange?: string;
  sortBy?: string;
  contentType?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: SearchFilterOptions) => void;
  initialFilters?: SearchFilterOptions;
};

type Option = { label: string; value: string };

const POST_TYPES: Option[] = [
  { label: 'All Posts', value: 'all' },
  { label: 'Posts', value: 'posts' },
  { label: 'People', value: 'people' },
  { label: 'Companies', value: 'companies' },
];

const DATE_RANGES: Option[] = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
];

const SORT_OPTIONS: Option[] = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Most Liked', value: 'liked' },
  { label: 'Most Commented', value: 'commented' },
];

const CONTENT_TYPES: Option[] = [
  { label: 'All Content', value: 'all' },
  { label: 'Text Only', value: 'text' },
  { label: 'With Images', value: 'image' },
  { label: 'With Videos', value: 'video' },
];

function Dropdown({
  label,
  options,
  selected,
  onSelect,
  styles: sheetStyles,
  palette,
  isOpen,
  onToggle,
  dropdownId,
  onRef,
}: {
  label: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  styles: ReturnType<typeof createStyles>;
  palette: ReturnType<typeof useSearchFilterPalette>;
  isOpen: boolean;
  onToggle: () => void;
  dropdownId: string;
  onRef: (ref: View | null) => void;
}) {
  const selectedLabel = options.find((o) => o.value === selected)?.label || options[0].label;

  return (
    <View
      ref={(ref) => onRef(ref)}
      style={[
        sheetStyles.dropdownContainer,
        isOpen && { zIndex: 10000, elevation: 25 },
      ]}>
      <ThemedText style={[sheetStyles.sectionLabel, { color: palette.textMuted }]}>
        {label}
      </ThemedText>
      <TouchableOpacity
        style={[
          sheetStyles.dropdownButton,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
          },
          isOpen && sheetStyles.dropdownButtonOpen,
        ]}
        onPress={onToggle}
        activeOpacity={0.7}>
        <ThemedText
          style={[
            sheetStyles.dropdownButtonText,
            { color: palette.text },
            selected !== options[0].value && sheetStyles.dropdownButtonSelected,
          ]}>
          {selectedLabel}
        </ThemedText>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={palette.iconColor}
        />
      </TouchableOpacity>
      {isOpen && (
        <View
          style={[
            sheetStyles.dropdownMenu,
            {
              backgroundColor: palette.surface,
              borderColor: palette.border,
              zIndex: 10001,
              elevation: 30,
            },
          ]}>
          <ScrollView style={sheetStyles.dropdownScroll} nestedScrollEnabled>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  sheetStyles.dropdownItem,
                  selected === opt.value && {
                    backgroundColor: palette.activeBackground,
                  },
                ]}
                onPress={() => {
                  onSelect(opt.value);
                  onToggle();
                }}
                activeOpacity={0.7}>
                <ThemedText
                  style={[
                    sheetStyles.dropdownItemText,
                    { color: palette.text },
                    selected === opt.value && sheetStyles.dropdownItemTextSelected,
                  ]}>
                  {opt.label}
                </ThemedText>
                {selected === opt.value && (
                  <Ionicons name="checkmark" size={18} color={palette.tint} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

function useSearchFilterPalette() {
  const backgroundColor = useThemeColor({}, 'background');
  const surface = useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background');
  const border = useThemeColor({ light: '#e5e7eb', dark: '#3a3a3a' }, 'background');
  const text = useThemeColor({}, 'text');
  const textMuted = useThemeColor({ light: '#64748b', dark: '#94a3b8' }, 'text');
  const activeBackground = useThemeColor({ light: '#f0fdf4', dark: '#1a3a2f' }, 'background');
  const closeBtnBg = useThemeColor({ light: '#f4f4f4', dark: '#2a2a2a' }, 'background');
  const iconColor = useThemeColor({}, 'icon');
  const tint = useThemeColor({}, 'tint');

  return {
    backgroundColor,
    surface,
    border,
    text,
    textMuted,
    activeBackground,
    closeBtnBg,
    iconColor,
    tint,
  };
}

function createStyles(palette: ReturnType<typeof useSearchFilterPalette>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      flex: 1,
    },
    sheet: {
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      maxHeight: '80%',
      zIndex: 1000,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: palette.border,
    },
    closeBtn: {
      position: 'absolute',
      left: 20,
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 350,
      zIndex: 0,
      overflow: 'visible',
    },
    dropdownContainer: {
      marginBottom: 20,
      zIndex: 1,
      position: 'relative',
      overflow: 'visible',
    },
    sectionLabel: {
      fontSize: 12,
      fontWeight: '700',
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    dropdownButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
    },
    dropdownButtonOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    dropdownButtonText: {
      fontSize: 16,
    },
    dropdownButtonSelected: {
      fontWeight: '600',
    },
    dropdownMenu: {
      position: 'absolute',
      top: 56,
      left: 0,
      right: 0,
      maxHeight: 200,
      borderRadius: 12,
      borderWidth: 1,
      borderTopWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 25,
    },
    dropdownScroll: {
      maxHeight: 200,
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: palette.border,
    },
    dropdownItemText: {
      fontSize: 16,
    },
    dropdownItemTextSelected: {
      fontWeight: '700',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      paddingBottom: Platform.OS === 'ios' ? 40 : 20,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: palette.border,
      backgroundColor: palette.surface,
      zIndex: 100,
      elevation: 10,
    },
    applyBtn: {
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 12,
    },
    applyGradient: {
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyText: {
      color: '#ffffff',
      fontSize: 17,
      fontWeight: '700',
    },
    clearText: {
      fontWeight: '700',
      fontSize: 15,
      textAlign: 'center',
      color: '#ef4444',
    },
  });
}

export default function SearchFilterSheet({
  visible,
  onClose,
  onApply,
  initialFilters,
}: Props) {
  const palette = useSearchFilterPalette();
  const styles = createStyles(palette);
  const translateY = useRef(new Animated.Value(600)).current;

  const [filters, setFilters] = useState<SearchFilterOptions>({
    postType: 'all',
    dateRange: 'all',
    sortBy: 'recent',
    contentType: 'all',
    ...initialFilters,
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const dropdownRefs = useRef<{ [key: string]: View | null }>({});

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 600,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
      // Reset dropdown state when closing
      setOpenDropdown(null);
    }
  }, [visible, translateY]);

  // Auto-scroll to dropdown when it opens
  useEffect(() => {
    if (openDropdown && scrollViewRef.current) {
      // Small delay to ensure the dropdown is rendered
      setTimeout(() => {
        // For the last dropdown (Content Type), scroll to end
        if (openDropdown === 'contentType') {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        } else if (dropdownRefs.current[openDropdown]) {
          // For other dropdowns, try to scroll to their position
          dropdownRefs.current[openDropdown]?.measureLayout(
            scrollViewRef.current as any,
            (x, y) => {
              scrollViewRef.current?.scrollTo({
                y: Math.max(0, y - 20), // Add some padding from top
                animated: true,
              });
            },
            () => {
              // If measurement fails, do nothing
            }
          );
        }
      }, 150);
    }
  }, [openDropdown]);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const cleared = {
      postType: 'all',
      dateRange: 'all',
      sortBy: 'recent',
      contentType: 'all',
    };
    setFilters(cleared);
    onApply(cleared);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={StyleSheet.absoluteFill}>
        <BlurView tint="dark" intensity={40} style={StyleSheet.absoluteFill} />
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={styles.container}>
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: palette.surface,
              transform: [{ translateY }],
            },
          ]}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: palette.closeBtnBg }]}
              activeOpacity={0.7}>
              <Ionicons name="close" size={22} color={palette.text} />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Search Filters</ThemedText>
          </View>

          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            style={{ zIndex: 0 }}
            nestedScrollEnabled>
            <Dropdown
              label="Post Type"
              options={POST_TYPES}
              selected={filters.postType || 'all'}
              onSelect={(value) => setFilters((f) => ({ ...f, postType: value }))}
              styles={styles}
              palette={palette}
              isOpen={openDropdown === 'postType'}
              onToggle={() => setOpenDropdown(openDropdown === 'postType' ? null : 'postType')}
              dropdownId="postType"
              onRef={(ref) => (dropdownRefs.current['postType'] = ref)}
            />

            <Dropdown
              label="Date Range"
              options={DATE_RANGES}
              selected={filters.dateRange || 'all'}
              onSelect={(value) => setFilters((f) => ({ ...f, dateRange: value }))}
              styles={styles}
              palette={palette}
              isOpen={openDropdown === 'dateRange'}
              onToggle={() => setOpenDropdown(openDropdown === 'dateRange' ? null : 'dateRange')}
              dropdownId="dateRange"
              onRef={(ref) => (dropdownRefs.current['dateRange'] = ref)}
            />

            <Dropdown
              label="Sort By"
              options={SORT_OPTIONS}
              selected={filters.sortBy || 'recent'}
              onSelect={(value) => setFilters((f) => ({ ...f, sortBy: value }))}
              styles={styles}
              palette={palette}
              isOpen={openDropdown === 'sortBy'}
              onToggle={() => setOpenDropdown(openDropdown === 'sortBy' ? null : 'sortBy')}
              dropdownId="sortBy"
              onRef={(ref) => (dropdownRefs.current['sortBy'] = ref)}
            />

            <Dropdown
              label="Content Type"
              options={CONTENT_TYPES}
              selected={filters.contentType || 'all'}
              onSelect={(value) => setFilters((f) => ({ ...f, contentType: value }))}
              styles={styles}
              palette={palette}
              isOpen={openDropdown === 'contentType'}
              onToggle={() => setOpenDropdown(openDropdown === 'contentType' ? null : 'contentType')}
              dropdownId="contentType"
              onRef={(ref) => (dropdownRefs.current['contentType'] = ref)}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.85}>
              <LinearGradient colors={[GRADIENT_START, GRADIENT_END]} style={styles.applyGradient}>
                <ThemedText style={styles.applyText}>Apply Filters</ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClear} activeOpacity={0.7}>
              <ThemedText style={styles.clearText}>Clear All</ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

