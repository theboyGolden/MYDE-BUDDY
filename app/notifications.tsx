import React, { useMemo } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

type NotificationItem = {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  icon?: ImageSourcePropType;
};

const netflixLogo = require('@/assets/images/netflix.png');
const paypalLogo = require('@/assets/images/paypal.png');
const spotifyLogo = require('@/assets/images/spotify.png');

const TODAY_ITEMS: NotificationItem[] = [
  {
    id: 'today-1',
    title: "There's an incoming message from Richard Mandowen",
    subtitle: '',
    timeAgo: '2 hours ago',
    icon: { uri: 'https://randomuser.me/api/portraits/men/12.jpg' },
  },
  {
    id: 'today-2',
    title: 'Outgoing call from Richar Kandowen',
    subtitle: '',
    timeAgo: '3 hours ago',
    icon: { uri: 'https://randomuser.me/api/portraits/men/36.jpg' },
  },
  {
    id: 'today-3',
    title: 'You have submitted an application to Netflix as a Sr. UI Designer',
    subtitle: '',
    timeAgo: '1 day ago',
    icon: netflixLogo,
  },
];

const YESTERDAY_ITEMS: NotificationItem[] = [
  {
    id: 'yesterday-1',
    title: 'You have submitted an application to Paypal as a UI Designer',
    subtitle: '',
    timeAgo: '1 day ago',
    icon: paypalLogo,
  },
  {
    id: 'yesterday-2',
    title: 'You have submitted an application to Spotify as a Junior UI Designer',
    subtitle: '',
    timeAgo: '1 day ago',
    icon: spotifyLogo,
  },
];

export default function NotificationsScreen() {
  const palette = useNotificationPalette();
  const styles = useMemo(() => createStyles(palette), [palette]);

  const renderGroup = (label: string, items: NotificationItem[]) => (
    <View key={label} style={styles.groupContainer}>
      <ThemedText style={styles.groupLabel}>{label}</ThemedText>
      <View style={styles.groupList}>
        {items.map((item) => (
          <View key={item.id} style={styles.notificationRow}>
            {item.icon ? (
              <Image source={item.icon} style={styles.notificationIcon} />
            ) : (
              <View style={styles.iconFallback} />
            )}
            <View style={styles.notificationContent}>
              <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
              {item.subtitle ? (
                <ThemedText style={styles.notificationSubtitle}>{item.subtitle}</ThemedText>
              ) : null}
              <ThemedText style={styles.notificationTime}>{item.timeAgo}</ThemedText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {renderGroup('Today', TODAY_ITEMS)}
        {renderGroup('Yesterday', YESTERDAY_ITEMS)}
      </ScrollView>
    </ThemedView>
  );
}

type NotificationPalette = ReturnType<typeof useNotificationPalette>;

function useNotificationPalette() {
  const theme = useColorScheme() ?? 'light';
  return {
    theme,
    background: '#FEFEFE',
    surface: useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background'),
    border: useThemeColor({ light: 'rgba(0,0,0,0.08)', dark: 'rgba(255,255,255,0.08)' }, 'background'),
    text: useThemeColor({}, 'text'),
    secondaryText: useThemeColor({ light: '#6f6f6f', dark: '#c7c7c7' }, 'text'),
    sectionLabel: useThemeColor({ light: '#1a1a1a', dark: '#f5f5f5' }, 'text'),
    shadowColor: useThemeColor({ light: '#000000', dark: '#000000' }, 'background'),
    headerIcon: useThemeColor({ light: '#1f1f1f', dark: '#f5f5f5' }, 'text'),
    headerSurface: useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background'),
    headerShadowOpacity: theme === 'light' ? 0.08 : 0.3,
    headerAccentSurface: useThemeColor({ light: 'rgba(0,0,0,0.05)', dark: 'rgba(255,255,255,0.08)' }, 'background'),
  };
}

function createStyles(palette: NotificationPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background,
    },
    topHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
      gap: 12,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: palette.headerSurface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: palette.shadowColor,
      shadowOpacity: palette.headerShadowOpacity,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700',
      color: palette.text,
    },
    headerSpacer: {
      width: 44,
    },
    themeButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: palette.headerAccentSurface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: palette.shadowColor,
      shadowOpacity: palette.headerShadowOpacity,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      gap: 28,
    },
    groupContainer: {
      gap: 16,
    },
    groupLabel: {
      fontSize: 17,
      fontWeight: '700',
      color: palette.sectionLabel,
    },
    groupList: {
      gap: 18,
    },
    notificationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 18,
      backgroundColor: palette.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.border,
      shadowColor: palette.shadowColor,
      shadowOpacity: palette.theme === 'light' ? 0.05 : 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    notificationIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    iconFallback: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: palette.border,
    },
    notificationContent: {
      flex: 1,
      gap: 4,
    },
    notificationTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: palette.text,
    },
    notificationSubtitle: {
      fontSize: 13,
      color: palette.secondaryText,
    },
    notificationTime: {
      fontSize: 12,
      color: palette.secondaryText,
    },
  });
}


