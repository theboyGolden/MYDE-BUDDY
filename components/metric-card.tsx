import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
  showArrow?: boolean;
  borderColor?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  iconBgColor,
  showArrow = false,
  borderColor,
}: MetricCardProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor,
          ...(borderColor && { borderColor, borderWidth: StyleSheet.hairlineWidth }),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <MaterialIcons name={icon as any} size={24} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText type="title" style={styles.value}>
            {value}
          </ThemedText>
          {subtitle && (
            <View style={styles.subtitleContainer}>
              <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
              {showArrow && (
                <MaterialIcons name="arrow-upward" size={14} color="#4CAF50" />
              )}
            </View>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flex: 1,
    minHeight: 140,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 14,
    opacity: 0.7,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
});

