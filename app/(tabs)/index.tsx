import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CreatePost } from '@/components/create-post';
import { Header } from '@/components/header';
import { PostsList } from '@/components/posts-list';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WelcomeCard } from '@/components/welcome-card';
import { useThemeColor } from '@/hooks/use-theme-color';

// Sample posts data
const samplePosts = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    timestamp: '2h ago',
    title: 'Software Engineer',
    company: 'Tech Innovations',
    content:
      'Excited to share that we just launched our new platform! 🚀 This has been months in the making, and I\'m so proud of the team. Looking forward to seeing how it helps our users achieve their goals.',
    imageUri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', 
    likes: 45,
    comments: 12,
    shares: 8,
    avatarUri: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=48&background=6366f1&color=fff',
  },
  {
    id: '2',
    userName: 'Michael Chen',
    timestamp: '5h ago',
    title: 'Product Manager',
    company: 'StartupHub',
    content:
      'Just wrapped up an amazing workshop on product strategy! The key takeaway: always start with the user\'s problem, not the solution. What are your thoughts on this approach?',
    imageUri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    likes: 28,
    comments: 7,
    shares: 3,
    avatarUri: 'https://ui-avatars.com/api/?name=Michael+Chen&size=48&background=10b981&color=fff',
  },
  {
    id: '3',
    userName: 'Tengey Edem Deborah',
    timestamp: '1d ago',
    title: 'Education Coordinator',
    content:
      "News reports indicate the NSS has created additional volunteer opportunities to help address youth unemployment in Ghana, with roles in sanitation, health, and agriculture. This is a great initiative!",
    likes: 15,
    comments: 4,
    shares: 2,
    avatarUri: 'https://ui-avatars.com/api/?name=Tengey+Edem+Deborah&size=48&background=f59e0b&color=fff',
  },
  {
    id: '4',
    userName: 'David Osei',
    timestamp: '2d ago',
    title: 'Entrepreneur',
    company: 'GreenTech Solutions',
    content:
      'Starting a business is challenging, but incredibly rewarding. Here are 5 lessons I learned in my first year: 1) Focus on solving real problems 2) Build a great team 3) Listen to your customers 4) Stay persistent 5) Never stop learning. What would you add?',
    imageUri: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
    likes: 67,
    comments: 18,
    shares: 12,
    avatarUri: 'https://ui-avatars.com/api/?name=David+Osei&size=48&background=8b5cf6&color=fff',
  },
  {
    id: '5',
    userName: 'Amina Hassan',
    timestamp: '3d ago',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    content:
      'Just completed an amazing course on machine learning! The field is evolving so rapidly. Excited to apply these new techniques to our current projects. Anyone else working on ML projects? Let\'s connect!',
    likes: 34,
    comments: 9,
    shares: 5,
    avatarUri: 'https://ui-avatars.com/api/?name=Amina+Hassan&size=48&background=ec4899&color=fff',
  },
  {
    id: '6',
    userName: 'James Wilson',
    timestamp: '4d ago',
    title: 'Marketing Director',
    company: 'Creative Agency',
    content:
      'The future of marketing is personalization and authenticity. Brands that tell genuine stories and connect with their audience on a human level will thrive. What marketing trends are you most excited about?',
    imageUri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    likes: 52,
    comments: 14,
    shares: 7,
    avatarUri: 'https://ui-avatars.com/api/?name=James+Wilson&size=48&background=06b6d4&color=fff',
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  // Use brand color for FAB button (consistent across themes)
  const fabColor = useThemeColor(
    { light: '#e0971d', dark: '#e0971d' },
    'tint'
  );
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );

  return (
    <View style={styles.container}>
      <Header title="Welcome, Dee 👋" />
      <WelcomeCard userName="Dee" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <PostsList posts={samplePosts} />
      </ScrollView>

      {/* Floating Create Post Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            bottom: insets.bottom + 20,
            backgroundColor: fabColor,
          },
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}>
        <FontAwesome5 name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Create Post Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <ThemedView
            style={[
              styles.modalContent,
              {
                backgroundColor,
                paddingBottom: insets.bottom + 20,
                maxHeight: '85%',
              },
            ]}>
            <View style={[styles.modalHeader, { borderBottomColor: borderColor }]}>
              <ThemedText type="defaultSemiBold" style={styles.modalTitle}>
                Create Post
              </ThemedText>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
                activeOpacity={0.7}>
                <FontAwesome5 name="times" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.modalBody}
              contentContainerStyle={styles.modalBodyContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <CreatePost onClose={() => setModalVisible(false)} />
            </ScrollView>
          </ThemedView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    minHeight: 400,
    flexShrink: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalBody: {
    flex: 1,
  },
  modalBodyContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
});
