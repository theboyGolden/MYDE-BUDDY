import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/contexts/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';

interface HeaderProps {
  title: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export function Header({ title, onNotificationPress, onProfilePress }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const menuBackgroundColor = useThemeColor({ light: '#fff', dark: '#1a1a1a' }, 'background');
  const menuBorderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.2)' },
    'background'
  );

  const handleProfilePress = () => {
    setIsMenuOpen((prev) => !prev);
    onProfilePress?.();
  };

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  return (
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
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>

        {/* Right side - Action buttons */}
        <ThemedView style={styles.rightActions}>
          {/* Theme toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={styles.iconButton}
            activeOpacity={0.7}
            accessibilityLabel="Toggle theme"
            accessibilityRole="button">
            <MaterialIcons
              name={colorScheme === 'dark' ? 'wb-sunny' : 'nights-stay'}
              size={24}
              color={iconColor}
            />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity
            onPress={onNotificationPress}
            style={styles.iconButton}
            activeOpacity={0.7}
            accessibilityLabel="Notifications"
            accessibilityRole="button">
            <MaterialIcons name="notifications-none" size={24} color={iconColor} />
          </TouchableOpacity>

          {/* Profile dropdown */}
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={handleProfilePress}
              style={styles.iconButton}
              activeOpacity={0.7}
              accessibilityLabel="Profile menu"
              accessibilityRole="button">
              <MaterialIcons name="person-outline" size={24} color={iconColor} />
            </TouchableOpacity>

            {isMenuOpen && (
              <ThemedView
                style={[
                  styles.dropdownMenu,
                  {
                    backgroundColor: menuBackgroundColor,
                    borderColor: menuBorderColor,
                  },
                ]}>
                {/* Profile link */}
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleNavigate('/profile')}
                  activeOpacity={0.7}>
                  <MaterialIcons name="person" size={18} color={iconColor} />
                  <ThemedText style={styles.dropdownText}>Profile</ThemedText>
                </TouchableOpacity>

                {/* Login link */}
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleNavigate('/login')}
                  activeOpacity={0.7}>
                  <MaterialIcons name="login" size={18} color={iconColor} />
                  <ThemedText style={styles.dropdownText}>Login</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedView>
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
  title: {
    fontSize: 18,
    flex: 1,
    marginRight: 16,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative',
    zIndex: 200,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 48,
    right: 0,
    minWidth: 150,
    borderRadius: 10,
    paddingVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 300,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
