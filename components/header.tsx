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
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function Header({
  title,
  onNotificationPress,
  onProfilePress,
  showBackButton = false,
  onBackPress,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const surfaceColor = useThemeColor({ light: '#ffffff', dark: '#1a1a1a' }, 'background');
  const mutedOverlay = useThemeColor(
    { light: 'rgba(0,0,0,0.05)', dark: 'rgba(255,255,255,0.08)' },
    'background'
  );
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

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    router.back();
  };

  const handleNavigate = (path: Parameters<typeof router.push>[0]) => {
    setIsMenuOpen(false);
    router.push(path);
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
            onPress={
              onNotificationPress ??
              (() => {
                router.push('/notifications');
              })
            }
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

                  {/* Networking link */}
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleNavigate('/networking')}
                    activeOpacity={0.7}>
                    <MaterialIcons name="lan" size={18} color={iconColor} />
                    <ThemedText style={styles.dropdownText}>Network</ThemedText>
                  </TouchableOpacity>

                  {/* Logout link */}
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setIsMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    activeOpacity={0.7}>
                    <MaterialIcons name="logout" size={18} color={iconColor} />
                    <ThemedText style={styles.dropdownText}>Log Out</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              )}
            </View>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {showLogoutConfirm && (
        <View style={styles.dialogOverlay}>
          <ThemedView style={[styles.dialogContainer, { backgroundColor: surfaceColor }]}>
            <TouchableOpacity
              style={[styles.dialogClose, { backgroundColor: mutedOverlay }]}
              onPress={() => setShowLogoutConfirm(false)}
              activeOpacity={0.7}
              accessibilityLabel="Close"
              accessibilityRole="button">
              <MaterialIcons name="close" size={18} color={iconColor} />
            </TouchableOpacity>
            <ThemedText style={styles.dialogTitle}>Are you sure you want to logout?</ThemedText>
            <TouchableOpacity
              style={[styles.dialogCancelButton, { backgroundColor: tintColor }]}
              onPress={() => setShowLogoutConfirm(false)}
              activeOpacity={0.85}>
              <ThemedText style={styles.dialogCancelText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dialogLogoutButton}
              onPress={() => {
                setShowLogoutConfirm(false);
                router.push('/login');
              }}
              activeOpacity={0.85}>
              <ThemedText style={styles.dialogLogoutText}>Log Out</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      )}
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
  dialogOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 500,
  },
  dialogContainer: {
    width: '80%',
    maxWidth: 320,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  dialogClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  dialogCancelButton: {
    width: '100%',
    borderRadius: 28,
    backgroundColor: '#f0a000',
    paddingVertical: 14,
    alignItems: 'center',
  },
  dialogCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  dialogLogoutButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  dialogLogoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#d93025',
  },
});
