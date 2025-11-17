import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Linking, Modal, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CreatePostProps {
  onClose?: () => void;
  onPost?: (post: {
    content: string;
    visibility?: string;
    imageUri?: string;
    videoUri?: string;
  }) => void;
}

export function CreatePost({ onClose, onPost }: CreatePostProps) {
  const [postText, setPostText] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  
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
  const surfaceColor = useThemeColor(
    { light: '#ffffff', dark: '#1f1f1f' },
    'background'
  );

  const checkAndRequestPermission = async () => {
    try {
      // First check if we already have permission
      const { status: existingStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
      
      if (existingStatus === 'granted') {
        return true;
      }

      // If permission is undetermined or denied, request it
      if (existingStatus === 'undetermined' || existingStatus === 'denied') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status === 'granted') {
          return true;
        }

        // Permission denied - show alert with option to open settings
        if (status === 'denied') {
          Alert.alert(
            'Permission Required',
            'We need access to your photos to select images and videos. Would you like to open settings to enable it?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: async () => {
                  try {
                    if (Platform.OS === 'ios') {
                      await Linking.openURL('app-settings:');
                    } else {
                      // Android - try to open app settings
                      await Linking.openSettings();
                    }
                  } catch (error) {
                    // Fallback message if settings can't be opened
                    Alert.alert(
                      'How to Enable',
                      Platform.OS === 'ios'
                        ? 'Go to Settings > MYDE Buddy > Photos and enable access.'
                        : 'Go to Settings > Apps > MYDE Buddy > Permissions > Photos and enable access.'
                    );
                  }
                },
              },
            ]
          );
        }
        return false;
      }

      return false;
    } catch (error) {
      console.error('Permission error:', error);
      Alert.alert('Error', 'Failed to check permissions. Please try again.');
      return false;
    }
  };

  const handlePickImage = async () => {
    const hasPermission = await checkAndRequestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
        setVideoUri(null); // Clear video if image is selected
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handlePickVideo = async () => {
    const hasPermission = await checkAndRequestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setVideoUri(result.assets[0].uri);
        setImageUri(null); // Clear image if video is selected
      }
    } catch (error) {
      console.error('Video picker error:', error);
      Alert.alert('Error', 'Failed to pick video. Please try again.');
    }
  };

  const handleRemoveMedia = () => {
    setImageUri(null);
    setVideoUri(null);
  };

  const handlePost = () => {
    if (postText.trim() || imageUri || videoUri) {
      // Call onPost callback with post data
      onPost?.({
        content: postText.trim(),
        visibility,
        imageUri: imageUri || undefined,
        videoUri: videoUri || undefined,
      });
      setPostText('');
      setImageUri(null);
      setVideoUri(null);
      onClose?.();
    }
  };

  const visibilityOptions = ['Public', 'Friends', 'Only Me'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user-circle" size={40} color={iconColor} />
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

      {/* Media Preview */}
      {(imageUri || videoUri) && (
        <View style={styles.mediaPreview}>
          {imageUri && (
            <View style={styles.mediaContainer}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveMedia}
                activeOpacity={0.7}>
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          {videoUri && (
            <View style={styles.mediaContainer}>
              <View style={[styles.videoPlaceholder, { backgroundColor: inputBackgroundColor }]}>
                <FontAwesome5 name="video" size={40} color={iconColor} />
                <ThemedText style={styles.videoText}>Video Selected</ThemedText>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveMedia}
                activeOpacity={0.7}>
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, imageUri && styles.actionButtonActive]}
            onPress={handlePickImage}
            activeOpacity={0.7}>
            <FontAwesome5 name="image" size={20} color={imageUri ? '#e0971d' : iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, videoUri && styles.actionButtonActive]}
            onPress={handlePickVideo}
            activeOpacity={0.7}>
            <FontAwesome5 name="video" size={20} color={videoUri ? '#e0971d' : iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <FontAwesome5 name="chart-bar" size={20} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <FontAwesome5 name="clock" size={20} color={iconColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => setShowVisibilityModal(true)}
            activeOpacity={0.7}>
            <FontAwesome5
              name={visibility === 'Public' ? 'globe' : visibility === 'Friends' ? 'users' : 'lock'}
              size={16}
              color={iconColor}
            />
            <ThemedText style={styles.visibilityText}>{visibility}</ThemedText>
            <FontAwesome5 name="chevron-down" size={16} color={iconColor} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.postButton, { backgroundColor: '#046A38' }]}
            onPress={handlePost}
            activeOpacity={0.8}>
            <FontAwesome5 name="paper-plane" size={18} color="#fff" />
            <ThemedText style={styles.postButtonText}>Post</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Visibility Modal */}
      <Modal
        visible={showVisibilityModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowVisibilityModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowVisibilityModal(false)}>
          <View
            style={[styles.modalContent, { backgroundColor: surfaceColor, borderColor }]}
            onStartShouldSetResponder={() => true}>
            {visibilityOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.visibilityOption,
                  visibility === option && styles.visibilityOptionActive,
                ]}
                onPress={() => {
                  setVisibility(option);
                  setShowVisibilityModal(false);
                }}
                activeOpacity={0.7}>
                <FontAwesome5
                  name={option === 'Public' ? 'globe' : option === 'Friends' ? 'users' : 'lock'}
                  size={18}
                  color={visibility === option ? '#e0971d' : iconColor}
                />
                <ThemedText
                  style={[
                    styles.visibilityOptionText,
                    visibility === option && { color: '#e0971d' },
                  ]}>
                  {option}
                </ThemedText>
                {visibility === option && (
                  <Ionicons name="checkmark" size={20} color="#e0971d" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
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
  mediaPreview: {
    marginTop: 8,
    marginBottom: 8,
  },
  mediaContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  videoPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  videoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 4,
  },
  actionButtonActive: {
    backgroundColor: 'rgba(224, 151, 29, 0.1)',
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  visibilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    borderRadius: 8,
  },
  visibilityOptionActive: {
    backgroundColor: 'rgba(224, 151, 29, 0.1)',
  },
  visibilityOptionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
});

