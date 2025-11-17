import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface JobCentreTabsProps {
  activeTab: 'jobs' | 'ai-chat';
  onTabChange: (tab: 'jobs' | 'ai-chat') => void;
}

export function JobCentreTabs({ activeTab, onTabChange }: JobCentreTabsProps) {
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'jobs' && {
            borderBottomColor: tintColor || '#046A38',
            borderBottomWidth: 2,
          },
        ]}
        onPress={() => onTabChange('jobs')}
        activeOpacity={0.7}>
        <MaterialIcons
          name="work-outline"
          size={20}
          color={activeTab === 'jobs' ? tintColor || '#046A38' : iconColor}
        />
        <ThemedText
          style={[
            styles.tabText,
            activeTab === 'jobs' && { color: tintColor || '#046A38', fontWeight: '600' },
          ]}>
          Job Opportunities
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'ai-chat' && {
            borderBottomColor: tintColor || '#046A38',
            borderBottomWidth: 2,
          },
        ]}
        onPress={() => onTabChange('ai-chat')}
        activeOpacity={0.7}>
        <MaterialIcons
          name="chat-bubble-outline"
          size={20}
          color={activeTab === 'ai-chat' ? tintColor || '#046A38' : iconColor}
        />
        <ThemedText
          style={[
            styles.tabText,
            activeTab === 'ai-chat' && { color: tintColor || '#046A38', fontWeight: '600' },
          ]}>
          AI Chat Assistant
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 14,
  },
});

