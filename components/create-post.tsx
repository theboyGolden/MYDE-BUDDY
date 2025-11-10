import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export function CreatePost() {
  const [postText, setPostText] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );
  const inputBackgroundColor = useThemeColor(
    { light: '#fff', dark: '#1a1a1a' },
    'background'
  );

  const handlePost = () => {
    if (postText.trim()) {
      // Handle post submission
      console.log('Posting:', postText);
      setPostText('');
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor, borderColor }]}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="account-circle" size={40} color={iconColor} />
        </View>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackgroundColor }]}
          placeholder="What's on your mind about education, jobs, entrepreneurship or trainings ...."
          placeholderTextColor={useThemeColor({}, 'icon')}
          value={postText}
          onChangeText={setPostText}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <MaterialIcons name="image" size={20} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <MaterialIcons name="videocam" size={20} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <MaterialIcons name="bar-chart" size={20} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <MaterialIcons name="schedule" size={20} color={iconColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.visibilityButton} activeOpacity={0.7}>
            <MaterialIcons name="lock-outline" size={16} color={iconColor} />
            <ThemedText style={styles.visibilityText}>{visibility}</ThemedText>
            <MaterialIcons name="arrow-drop-down" size={16} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.postButton, { backgroundColor: '#e0971d' }]}
            onPress={handlePost}
            activeOpacity={0.8}>
            <MaterialIcons name="send" size={18} color="#fff" />
            <ThemedText style={styles.postButtonText}>Post</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 12,
    marginBottom: 8,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginTop: 4,
  },
  input: {
    flex: 1,
    minHeight: 80,
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  actionButton: {
    padding: 6,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  visibilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  visibilityText: {
    fontSize: 12,
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

