import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/contexts/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colorScheme, toggleTheme } = useTheme();
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
  const sectionBackgroundColor = useThemeColor(
    { light: '#ffffff', dark: '#1a1a1a' },
    'background'
  );
  const textColor = useThemeColor({}, 'text');
  const dialogOverlayColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.5)', dark: 'rgba(0, 0, 0, 0.7)' },
    'background'
  );
  const dialogCloseBg = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.05)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const brandColor = useThemeColor(
    { light: '#046A38', dark: '#046A38' },
    'tint'
  );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}>
          <MaterialIcons name="arrow-back-ios-new" size={20} color={iconColor} />
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          Settings
        </ThemedText>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.content}>
          {/* Appearance Section */}
          <ThemedView style={[styles.section, { backgroundColor: sectionBackgroundColor, borderColor }]}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Appearance
            </ThemedText>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="palette" size={20} color={iconColor} />
                <ThemedText style={styles.settingLabel}>Theme</ThemedText>
              </View>
              <ThemeToggleButton colorScheme={colorScheme} onToggle={toggleTheme} />
            </View>
          </ThemedView>

          {/* Account Section */}
          <ThemedView style={[styles.section, { backgroundColor: sectionBackgroundColor, borderColor }]}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Account
            </ThemedText>
            
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => router.push('/profile')}
              activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="person" size={20} color={iconColor} />
                <ThemedText style={styles.settingLabel}>Profile</ThemedText>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={iconColor} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => router.push('/user-info')}
              activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="edit" size={20} color={iconColor} />
                <ThemedText style={styles.settingLabel}>Edit Profile</ThemedText>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={iconColor} />
            </TouchableOpacity>
          </ThemedView>

          {/* Preferences Section */}
          <ThemedView style={[styles.section, { backgroundColor: sectionBackgroundColor, borderColor }]}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Preferences
            </ThemedText>
            
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => router.push('/notifications')}
              activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="notifications-none" size={20} color={iconColor} />
                <ThemedText style={styles.settingLabel}>Notifications</ThemedText>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={iconColor} />
            </TouchableOpacity>
          </ThemedView>

          {/* Logout Section */}
          <ThemedView style={[styles.section, { backgroundColor: sectionBackgroundColor, borderColor }]}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => setShowLogoutConfirm(true)}
              activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <MaterialIcons name="logout" size={20} color="#d93025" />
                <ThemedText style={[styles.settingLabel, { color: '#d93025' }]}>Log Out</ThemedText>
              </View>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>

      {showLogoutConfirm && (
        <View style={[styles.dialogOverlay, { backgroundColor: dialogOverlayColor }]}>
          <ThemedView style={[styles.dialogContainer, { backgroundColor: surfaceColor }]}>
            <TouchableOpacity
              style={[styles.dialogClose, { backgroundColor: dialogCloseBg }]}
              onPress={() => setShowLogoutConfirm(false)}
              activeOpacity={0.7}
              accessibilityLabel="Close"
              accessibilityRole="button">
              <MaterialIcons name="close" size={18} color={iconColor} />
            </TouchableOpacity>
            <ThemedText style={styles.dialogTitle}>Are you sure you want to logout?</ThemedText>
            <TouchableOpacity
              style={[styles.dialogCancelButton, { backgroundColor: brandColor }]}
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
              <ThemedText style={[styles.dialogLogoutText, { color: '#d93025' }]}>Log Out</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    minHeight: 56,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    minWidth: 36,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 36,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
  },
  dialogOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

