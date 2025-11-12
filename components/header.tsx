import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function Header({
  title,
  showBackButton = false,
  onBackPress,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    router.back();
  };

  return (
    <>
      <ThemedView
        style={[
          styles.header,
          {
            paddingTop: Math.max(insets.top - 12, 4),
            backgroundColor,
            borderBottomColor: borderColor,
          },
        ]}>
        <ThemedView style={styles.headerContent}>
          {/* Left side - Title */}
          <View style={styles.leftSection}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.backButton}
                activeOpacity={0.7}
                accessibilityLabel="Go back"
                accessibilityRole="button">
                <MaterialIcons name="arrow-back-ios-new" size={20} color={iconColor} />
              </TouchableOpacity>
            )}
            <ThemedText type="defaultSemiBold" style={styles.title}>
              {title}
            </ThemedText>
          </View>

          {/* Right side - Action buttons */}
          <ThemedView style={styles.rightActions}>
            {/* Settings */}
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              style={styles.iconButton}
              activeOpacity={0.7}
              accessibilityLabel="Settings"
              accessibilityRole="button">
              <MaterialIcons name="settings" size={24} color={iconColor} />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
    zIndex: 100,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
