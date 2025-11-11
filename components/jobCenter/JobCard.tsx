// src/components/jobCenter/JobCard.tsx
import { BRAND, GRADIENT_END, GRADIENT_START, TEXT_MUTED, WHITE } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export type Job = {
  id: string;
  company: string;
  companyLogo: any;
  title: string;
  salary: string;
  type: 'Fulltime' | 'Part time' | 'Remote' | 'Freelance';
  location?: string;
  posted: string;
  bookmarked?: boolean;
};

type Props = {
  job: Job;
  onBookmark?: (id: string) => void;
  onApply?: (id: string) => void;
  style?: ViewStyle;
  variant?: 'default' | 'compact';
};

export default function JobCard({ job, onBookmark, onApply, style, variant = 'default' }: Props) {
  const isCompact = variant === 'compact';

  return (
    <View style={[styles.card, isCompact && styles.compactCard, style]}>
      {/* Header with Company Info and Bookmark */}
      <View style={[styles.header, isCompact && styles.compactHeader]}>
        <View style={styles.companySection}>
          <View style={[styles.logoContainer, isCompact && styles.compactLogoContainer]}>
            <Image 
              source={job.companyLogo} 
              style={[styles.logo, isCompact && styles.compactLogo]} 
            />
          </View>
          <View style={styles.companyDetails}>
            <Text style={[styles.companyName, isCompact && styles.compactCompanyName]} numberOfLines={1}>
              {job.company}
            </Text>
            <Text style={[styles.jobTitle, isCompact && styles.compactJobTitle]} numberOfLines={1}>
              {job.title}
            </Text>
            <Text style={[styles.salary, isCompact && styles.compactSalary]} numberOfLines={1}>
              {job.salary}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.bookmarkBtn}
          onPress={() => onBookmark?.(job.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={job.bookmarked ? 'bookmark' : 'bookmark-outline'} 
            size={isCompact ? 20 : 24} 
            color={BRAND} 
          />
        </TouchableOpacity>
      </View>

      {/* Tags Row */}
      <View style={[styles.tagsRow, isCompact && styles.compactTagsRow]}>
        <View style={[styles.tag, styles.typeTag]}>
          <Text style={styles.tagText}>{job.type}</Text>
        </View>
        
        {job.location && (
          <View style={[styles.tag, styles.locationTag]}>
            <Ionicons name="location-outline" size={10} color={TEXT_MUTED} />
            <Text style={styles.tagText}>{job.location}</Text>
          </View>
        )}
        
        <View style={[styles.tag, styles.timeTag]}>
          <Ionicons name="time-outline" size={10} color={BRAND} />
          <Text style={[styles.tagText, styles.timeText]}>{job.posted}</Text>
        </View>
      </View>

      {/* Apply Button */}
      <TouchableOpacity 
        style={[styles.applyButton, isCompact && styles.compactApplyButton]}
        onPress={() => onApply?.(job.id)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[GRADIENT_START, GRADIENT_END]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, isCompact && styles.compactGradient]}
        >
          <Text style={[styles.applyText, isCompact && styles.compactApplyText]}>
            Apply Now
          </Text>
          <Ionicons name="arrow-forward" size={isCompact ? 14 : 16} color={WHITE} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Card Container
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  compactCard: {
    padding: 16,
    borderRadius: 16,
    minWidth: 280,
  },

  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  compactHeader: {
    marginBottom: 12,
  },
  companySection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },

  // Logo
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  compactLogoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 10,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  compactLogo: {
    width: 24,
    height: 24,
  },

  // Company Details
  companyDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 14,
    color: TEXT_MUTED,
    fontWeight: '600',
    marginBottom: 2,
  },
  compactCompanyName: {
    fontSize: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  compactJobTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  salary: {
    fontSize: 15,
    color: BRAND,
    fontWeight: '700',
  },
  compactSalary: {
    fontSize: 13,
  },

  // Bookmark
  bookmarkBtn: {
    padding: 4,
    marginLeft: 8,
  },

  // Tags Row
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  compactTagsRow: {
    marginBottom: 16,
    gap: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  typeTag: {
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  locationTag: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  timeTag: {
    backgroundColor: '#fff8ee',
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  tagText: {
    fontSize: 11,
    color: TEXT_MUTED,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeText: {
    color: BRAND,
  },

  // Apply Button
  applyButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: BRAND,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  compactApplyButton: {
    borderRadius: 10,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  compactGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 6,
  },
  applyText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  compactApplyText: {
    fontSize: 14,
  },
});