import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WelcomeCardProps {
  userName: string;
  profileCompletion: number;
  status?: string;
}

export function WelcomeCard({ userName, profileCompletion, status = 'National Service Completed' }: WelcomeCardProps) {
  const normalizedCompletion = Math.min(100, Math.max(0, profileCompletion));
  const isComplete = normalizedCompletion >= 100;

  return (
    <LinearGradient
      colors={[ '#024D27', '#1a7a45' ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.welcomeCard}
    >
      <View style={styles.welcomeContent}>
        <View style={styles.welcomeRow}>
          <Text style={styles.greetingText}>Welcome back, </Text>
          <Text style={styles.nameText}>{userName}</Text>
          <Text style={styles.waveEmoji}> 👋</Text>
        </View>

        <View style={styles.statusBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#4ade80" />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <LinearGradient
        colors={[ 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)' ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.completionCard}
      >
        <View style={styles.completionHeader}>
          <View>
            <Text style={styles.completionTitle}>Profile Strength</Text>
            <Text style={styles.completionSubtitle}>{isComplete ? 'Looking great!' : 'Almost there!'}</Text>
          </View>
          <View style={styles.percentageCircle}>
            <Text style={styles.percentageText}>{normalizedCompletion}%</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[ '#FFD700', '#024D27' ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${normalizedCompletion}%` }]}
            />
          </View>
        </View>

        {isComplete ? (
          <View style={styles.helperContainer}>
            <Ionicons name="star" size={14} color="#fbbf24" />
            <Text style={styles.doneText}>Profile optimized for maximum visibility</Text>
          </View>
        ) : (
          <View style={styles.helperContainer}>
            <Ionicons name="information-circle-outline" size={14} color="rgba(255,255,255,0.7)" />
            <Text style={styles.helperText}>Complete your profile to unlock better job matches</Text>
          </View>
        )}
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  welcomeCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  welcomeContent: {
    marginBottom: 20,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  greetingText: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '400',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  waveEmoji: {
    fontSize: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    marginTop: 16,
    gap: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  completionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  completionSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  percentageCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  helperText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    flex: 1,
  },
  doneText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
});
