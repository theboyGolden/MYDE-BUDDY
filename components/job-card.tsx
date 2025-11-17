import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface JobCardProps {
  companyName: string;
  companyLogo?: any;
  location: string;
  jobTitle: string;
  jobSalary: string;
  matchPercentage: number;
  onApply?: () => void;
  onBookmark?: () => void;
}

export function JobCard({
  companyName,
  companyLogo,
  location,
  jobTitle,
  jobSalary,
  matchPercentage,
  onApply,
  onBookmark,
}: JobCardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: '#fff' },
    'background'
  );
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');

  const cardBackgroundColor = useThemeColor(
    { light: '#fff', dark: '#1a1a1a' },
    'background'
  );
  const logoBgColor = useThemeColor(
    { light: '#f0f0f0', dark: '#2a2a2a' },
    'background'
  );
  const matchBarBgColor = useThemeColor(
    { light: '#e0e0e0', dark: '#3a3a3a' },
    'background'
  );
  const applyButtonBgColor = useThemeColor(
    { light: '#fff', dark: '#1a1a1a' },
    'background'
  );

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: cardBackgroundColor,
          borderColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}>
      {/* Company Logo and Name */}
      <View style={styles.companySection}>
        <View style={[styles.logoContainer, { backgroundColor: logoBgColor }]}>
          {companyLogo ? (
            <Image source={companyLogo} style={styles.logo} resizeMode="contain" />
          ) : (
            <MaterialIcons name="business" size={18} color={iconColor} />
          )}
        </View>
        <View style={styles.companyInfo}>
          <ThemedText type="defaultSemiBold" style={styles.companyName} numberOfLines={2}>
            {companyName}
          </ThemedText>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={11} color={iconColor} />
            <ThemedText style={styles.location} numberOfLines={1}>
              {location}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Job Title */}
      <ThemedText type="defaultSemiBold" style={styles.jobTitle} numberOfLines={2}>
        {jobTitle}
      </ThemedText>

      {/* Job Salary */}
      <ThemedText style={styles.jobSalary}>Job Salary: {jobSalary}</ThemedText>

      {/* Match Percentage */}
      <View style={styles.matchSection}>
        <View style={[styles.matchBarContainer, { backgroundColor: matchBarBgColor }]}>
          <View
            style={[
              styles.matchBar,
              {
                width: `${matchPercentage}%`,
                backgroundColor: tintColor || '#046A38',
              },
            ]}
          />
        </View>
        <ThemedText style={[styles.matchText, { color: '#4CAF50' }]}>
          {matchPercentage}% Match
        </ThemedText>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.applyButton,
            {
              backgroundColor: '#046A38',
              borderColor: '#046A38',
            },
          ]}
          onPress={onApply}
          activeOpacity={0.8}>
          <MaterialIcons name="check" size={14} color="#fff" />
          <ThemedText style={styles.applyButtonText}>Apply Now</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={onBookmark}
          activeOpacity={0.7}>
          <MaterialIcons name="bookmark-border" size={16} color={iconColor} />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
    minHeight: 180,
  },
  companySection: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  logoContainer: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  companyInfo: {
    flex: 1,
    minWidth: 0,
  },
  companyName: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  location: {
    fontSize: 10,
    opacity: 0.7,
    lineHeight: 14,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 15,
    minHeight: 30,
  },
  jobSalary: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 6,
    lineHeight: 14,
  },
  matchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  matchBarContainer: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  matchBar: {
    height: '100%',
    borderRadius: 3,
  },
  matchText: {
    fontSize: 9,
    opacity: 0.7,
    minWidth: 50,
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  applyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 6,
    minHeight: 32,
    borderWidth: 1,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bookmarkButton: {
    padding: 6,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

