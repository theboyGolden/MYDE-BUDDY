import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface AIChatAssistantProps {
  context?: 'education' | 'entrepreneurship';
  onChatHistoryToggle?: () => void;
}

export function AIChatAssistant({ context = 'education', onChatHistoryToggle }: AIChatAssistantProps) {
  const [message, setMessage] = useState('');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
  );
  const inputBackgroundColor = useThemeColor(
    { light: '#f5f5f5', dark: '#2a2a2a' },
    'background'
  );
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const linkColor = useThemeColor(
    { light: '#0077B5', dark: '#4A9EFF' },
    'tint'
  );

  // Context-based configuration
  const assistantName = context === 'education' ? 'EducationHr' : 'EntrepreneurshipHr';
  const placeholderText =
    context === 'education'
      ? 'Ask me anything about courses, scholarships, study tips, or career guidance.....'
      : 'Ask me anything about entrepreneurship, business planning, funding, or marketing.....';

  const quickStartOptions =
    context === 'education'
      ? [
          {
            title: 'Course Selection',
            icon: 'book' as const,
            color: '#4A90E2',
          },
          {
            title: 'Scholarship Guide',
            icon: 'graduation-cap' as const,
            color: '#50C878',
          },
          {
            title: 'Study Tips',
            icon: 'lightbulb' as const,
            color: '#FFA500',
          },
        ]
      : [
          {
            title: 'Business Plan',
            icon: 'file-alt' as const,
            color: '#4A90E2',
          },
          {
            title: 'Funding Guide',
            icon: 'video' as const,
            color: '#50C878',
          },
          {
            title: 'Marketing Strategy',
            icon: 'bullseye' as const,
            color: '#FFA500',
          },
        ];

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onChatHistoryToggle}
          activeOpacity={0.7}>
          <MaterialIcons name="menu" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <ThemedText type="title" style={styles.greeting}>
          {getGreeting()}, Dee 👋
        </ThemedText>
        <ThemedText style={[styles.subGreeting, { color: textSecondary }]}>
          What can I help you with today?
        </ThemedText>
      </View>

      {/* Chat Input Area */}
      <View style={styles.inputSection}>
        <ThemedView
          style={[
            styles.inputContainer,
            {
              backgroundColor: inputBackgroundColor,
              borderColor: borderColor,
            },
          ]}>
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder={placeholderText}
            placeholderTextColor={textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
          />
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.actionIcon} activeOpacity={0.7}>
              <MaterialIcons name="add-circle-outline" size={24} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon} activeOpacity={0.7}>
              <MaterialIcons name="mic" size={24} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionIcon}
              onPress={handleSend}
              activeOpacity={0.7}>
              <FontAwesome5 name="paper-plane" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>

      {/* Quick Start Options */}
      <View style={styles.quickStartSection}>
        <ThemedText style={[styles.quickStartText, { color: textSecondary }]}>
          Start a New Chat with {assistantName} quickly with any of the below
        </ThemedText>
        <View style={styles.quickStartButtons}>
          {quickStartOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.quickStartButton,
                {
                  backgroundColor: inputBackgroundColor,
                  borderColor: option.color,
                },
              ]}
              activeOpacity={0.7}>
              <FontAwesome5
                name={option.icon}
                size={14}
                color={option.color}
                style={styles.buttonIcon}
              />
              <ThemedText
                style={[styles.buttonText, { color: option.color }]}
                numberOfLines={1}>
                {option.title}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  menuButton: {
    padding: 8,
  },
  greetingSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subGreeting: {
    fontSize: 16,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 32,
  },
  inputContainer: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    minHeight: 140,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    minHeight: 100,
    padding: 0,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
  },
  actionIcon: {
    padding: 4,
  },
  quickStartSection: {
    marginTop: 'auto',
  },
  quickStartText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  quickStartButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  quickStartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 50,
    borderWidth: 1,
    gap: 6,
    minWidth: 0,
  },
  buttonIcon: {
    marginRight: 2,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },
});

