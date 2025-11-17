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
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ChatFilterOptions = {
  status?: string;
  sortBy?: string;
  dateRange?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: ChatFilterOptions) => void;
  initialFilters?: ChatFilterOptions;
};

type Option = { label: string; value: string };

const STATUS_OPTIONS: Option[] = [
  { label: 'All', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Offline', value: 'offline' },
];

const SORT_OPTIONS: Option[] = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Unread First', value: 'unread' },
  { label: 'Name A-Z', value: 'name' },
];

const DATE_RANGES: Option[] = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
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
  palette: ReturnType<typeof useChatFilterPalette>;
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
          { backgroundColor: palette.surface, borderColor: palette.border },
          isOpen && sheetStyles.dropdownButtonOpen,
        ]}
        onPress={onToggle}
        activeOpacity={0.7}>
        <ThemedText
          style={[
            sheetStyles.dropdownButtonText,
            { color: palette.text },
            selected && sheetStyles.dropdownButtonSelected,
          ]}>
          {selectedLabel}
        </ThemedText>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={palette.text}
        />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            sheetStyles.dropdownMenu,
            {
              backgroundColor: palette.surface,
              borderColor: palette.border,
              shadowColor: palette.shadow,
            },
          ]}>
          <ScrollView
            style={sheetStyles.dropdownScroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}>
            {options.map((option) => {
              const isSelected = selected === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    sheetStyles.dropdownItem,
                    {
                      backgroundColor: isSelected ? palette.activeBg : 'transparent',
                      borderBottomColor: palette.border,
                    },
                  ]}
                  onPress={() => {
                    onSelect(option.value);
                    onToggle();
                  }}
                  activeOpacity={0.7}>
                  <ThemedText
                    style={[
                      sheetStyles.dropdownItemText,
                      { color: isSelected ? palette.tint : palette.text },
                      isSelected && sheetStyles.dropdownItemTextSelected,
                    ]}>
                    {option.label}
                  </ThemedText>
                  {isSelected && (
                    <Ionicons name="checkmark" size={18} color={palette.tint} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default function ChatFilterSheet({
  visible,
  onClose,
  onApply,
  initialFilters = {},
}: Props) {
  const palette = useChatFilterPalette();
  const styles = React.useMemo(() => createStyles(palette), [palette]);
  const translateY = useRef(new Animated.Value(1000)).current;
  const [filters, setFilters] = useState<ChatFilterOptions>({
    status: initialFilters.status || 'all',
    sortBy: initialFilters.sortBy || 'recent',
    dateRange: initialFilters.dateRange || 'all',
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: View | null }>({});

  useEffect(() => {
    if (visible) {
      setFilters({
        status: initialFilters.status || 'all',
        sortBy: initialFilters.sortBy || 'recent',
        dateRange: initialFilters.dateRange || 'all',
      });
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
        easing: Easing.out(Easing.cubic),
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start();
    }
  }, [visible, initialFilters]);

  const handleToggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      status: 'all',
      sortBy: 'recent',
      dateRange: 'all',
    };
    setFilters(clearedFilters);
    onApply(clearedFilters);
    onClose();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!visible) {
      setOpenDropdown(null);
    }
  }, [visible]);

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
          <View style={[styles.header, { borderBottomColor: palette.border }]}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: palette.closeBtnBg }]}
              activeOpacity={0.7}>
              <Ionicons name="close" size={22} color={palette.text} />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Filter Chats</ThemedText>
          </View>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Dropdown
              label="Status"
              options={STATUS_OPTIONS}
              selected={filters.status || 'all'}
              onSelect={(value) => setFilters((f) => ({ ...f, status: value }))}
              styles={styles}
              palette={palette}
              isOpen={openDropdown === 'status'}
              onToggle={() => handleToggleDropdown('status')}
              dropdownId="status"
              onRef={(ref) => {
                dropdownRefs.current['status'] = ref;
              }}
            />

            <Dropdown
              label="Sort By"
              options={SORT_OPTIONS}
              selected={filters.sortBy || 'recent'}
              onSelect={(value) => setFilters((f) => ({ ...f, sortBy: value }))}
              styles={styles}
              palette={palette}
              isOpen={openDropdown === 'sortBy'}
              onToggle={() => handleToggleDropdown('sortBy')}
              dropdownId="sortBy"
              onRef={(ref) => {
                dropdownRefs.current['sortBy'] = ref;
              }}
            />

            <Dropdown
              label="Date Range"
              options={DATE_RANGES}
              selected={filters.dateRange || 'all'}
              onSelect={(value) => setFilters((f) => ({ ...f, dateRange: value }))}
              styles={styles}
              palette={palette}
              isOpen={openDropdown === 'dateRange'}
              onToggle={() => handleToggleDropdown('dateRange')}
              dropdownId="dateRange"
              onRef={(ref) => {
                dropdownRefs.current['dateRange'] = ref;
              }}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.85}>
              <LinearGradient colors={[GRADIENT_START, GRADIENT_END]} style={styles.applyGradient}>
                <ThemedText style={styles.applyText}>Apply Filters</ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleClear} activeOpacity={0.7}>
              <ThemedText style={[styles.clearText, { color: '#ef4444' }]}>Clear All</ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

type ChatFilterPalette = ReturnType<typeof useChatFilterPalette>;

function useChatFilterPalette() {
  const theme = useColorScheme() ?? 'light';
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const icon = useThemeColor({}, 'icon');

  return {
    theme,
    background,
    text,
    tint,
    icon,
    surface: useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background'),
    surfaceLight: useThemeColor({ light: '#F8FAFC', dark: '#2a2a2a' }, 'background'),
    border: useThemeColor({ light: '#e5e7eb', dark: '#3a3a3a' }, 'background'),
    textMuted: useThemeColor({ light: '#64748b', dark: '#94a3b8' }, 'text'),
    activeBg: useThemeColor({ light: '#f0fdf4', dark: '#1a3a2f' }, 'background'),
    closeBtnBg: useThemeColor({ light: '#f4f4f4', dark: '#2a2a2a' }, 'background'),
    shadow: theme === 'light' ? '#000000' : '#000000',
  };
}


function createStyles(palette: ChatFilterPalette) {
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
      paddingBottom: 200,
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
    },
    dropdownItemText: {
      fontSize: 16,
    },
    dropdownItemTextSelected: {
      fontWeight: '700',
    },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 32,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: palette.border,
      gap: 12,
    },
    applyBtn: {
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
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
      paddingVertical: 12,
    },
  });
}

