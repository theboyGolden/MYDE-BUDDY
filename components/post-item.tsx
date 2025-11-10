import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface PostItemProps {
  userName: string;
  timestamp: string;
  content: string;
  imageUri?: string | number;
  likes: number;
  comments: number;
  shares: number;
  avatarUri?: string;
}

export function PostItem({
  userName,
  timestamp,
  content,
  imageUri,
  likes,
  comments,
  shares,
  avatarUri,
}: PostItemProps) {
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: '#fff' },
    'background'
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor, borderColor }]}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <MaterialIcons name="account-circle" size={40} color={iconColor} />
          )}
        </View>
        <View style={styles.userInfo}>
          <ThemedText type="defaultSemiBold" style={styles.userName}>
            {userName}
          </ThemedText>
          <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
        </View>
        <TouchableOpacity style={styles.optionsButton} activeOpacity={0.7}>
          <MaterialIcons name="more-vert" size={20} color={iconColor} />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image
            source={typeof imageUri === 'number' ? imageUri : { uri: imageUri }}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      )}

      {content && (
        <ThemedView style={styles.textContent}>
          <ThemedText style={styles.contentText}>{content}</ThemedText>
        </ThemedView>
      )}

      {/* Interaction Bar */}
      <View style={[styles.interactionBar, { borderTopColor: borderColor }]}>
        <TouchableOpacity style={styles.interactionButton} activeOpacity={0.7}>
          <MaterialIcons name="favorite-border" size={18} color={iconColor} />
          <ThemedText style={styles.interactionText}>{likes} Likes</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton} activeOpacity={0.7}>
          <MaterialIcons name="comment" size={18} color={iconColor} />
          <ThemedText style={styles.interactionText}>{comments} Comments</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.interactionButton} activeOpacity={0.7}>
          <MaterialIcons name="share" size={18} color={iconColor} />
          <ThemedText style={styles.interactionText}>{shares} Share</ThemedText>
        </TouchableOpacity>
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
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userName: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  optionsButton: {
    padding: 4,
  },
  imageContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 4,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  textContent: {
    marginTop: 4,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  interactionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  interactionText: {
    fontSize: 12,
    opacity: 0.7,
  },
});

