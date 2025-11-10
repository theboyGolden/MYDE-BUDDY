import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export function AIChatAssistant() {
  const [message, setMessage] = useState('');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor(
    { light: '#fff', dark: '#151718' },
    'background'
  );
  const textColor = useThemeColor({}, 'text');
  const inputBackgroundColor = useThemeColor(
    { light: '#fff', dark: '#1a1a1a' },
    'background'
  );
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: '#fff' },
    'background'
  );

  const quickStartOptions = [
    {
      title: 'Web Dev Interview',
      borderColor: '#E98B8B', // Reddish-pink
      textColor: '#E98B8B',
      iconColor: '#E98B8B',
      icon: 'menu' as const,
      filled: false,
    },
    {
      title: 'HR Interview',
      borderColor: '#F7B550', // Orange
      textColor: '#F7B550',
      iconColor: '#F7B550',
      icon: 'search' as const,
      filled: false,
    },
    {
      title: 'Sales Interview',
      borderColor: '#90D490', // Light green
      textColor: '#90D490',
      iconColor: '#90D490',
      icon: null,
      filled: false,
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
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <MaterialIcons name="menu" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <ThemedText type="title" style={styles.greeting}>
          {getGreeting()}, Dee 👋
        </ThemedText>
        <ThemedText style={styles.subGreeting}>What can I help you with today?</ThemedText>
      </View>

      {/* Chat Input Area */}
      <View style={styles.inputSection}>
        <ThemedView
          style={[
            styles.inputContainer,
            {
              backgroundColor: inputBackgroundColor,
              borderColor: borderColor,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            },
          ]}>
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder="Ask me anything about jobs, career advice, or interview preparation....."
            placeholderTextColor={useThemeColor({}, 'icon')}
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
          />
          <View style={[styles.inputActions, { borderTopColor: borderColor }]}>
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
              <MaterialIcons name="send" size={24} color={iconColor} />
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>

      {/* Quick Start Options */}
      <View style={styles.quickStartSection}>
        <ThemedText style={styles.quickStartText}>
          Start a New Chat with InterviewHr quickly with any of the below
        </ThemedText>
        <View style={styles.quickStartButtons}>
          {quickStartOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.quickStartButton,
                {
                  backgroundColor: inputBackgroundColor,
                  borderColor: option.borderColor,
                  borderWidth: 1,
                },
              ]}
              activeOpacity={0.7}>
              {option.icon && (
                <MaterialIcons
                  name={option.icon}
                  size={14}
                  color={option.iconColor}
                  style={styles.buttonIcon}
                />
              )}
              <ThemedText
                style={[styles.buttonText, { color: option.textColor }]}
                numberOfLines={1}>
                {option.title}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    opacity: 0.7,
  },
  inputSection: {
    marginBottom: 32,
  },
  inputContainer: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    minHeight: 120,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    minHeight: 80,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionIcon: {
    padding: 4,
  },
  quickStartSection: {
    marginTop: 'auto',
  },
  quickStartText: {
    fontSize: 14,
    opacity: 0.7,
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
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 50,
    gap: 6,
    minWidth: 0,
  },
  buttonIcon: {
    marginRight: 2,
  },
  buttonText: {
    fontSize: 11,
    fontWeight: '500',
    flexShrink: 1,
  },
});

