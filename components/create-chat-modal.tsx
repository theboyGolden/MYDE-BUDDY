import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useMemo, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type User = {
  id: string;
  name: string;
  avatar: string;
  status: 'Online' | 'Offline';
  title?: string;
  company?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectUser: (user: User) => void;
  users?: User[];
};

// Sample users list - in a real app, this would come from an API
const SAMPLE_USERS: User[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    status: 'Online',
    title: 'Software Engineer',
    company: 'Tech Innovations',
  },
  {
    id: 'user2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'Online',
    title: 'Product Manager',
    company: 'StartupHub',
  },
  {
    id: 'user3',
    name: 'Emily Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    status: 'Offline',
    title: 'Designer',
    company: 'Creative Studio',
  },
  {
    id: 'user4',
    name: 'David Kim',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    status: 'Online',
    title: 'Developer',
    company: 'Code Labs',
  },
  {
    id: 'user5',
    name: 'Jessica Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
    status: 'Offline',
    title: 'Marketing Director',
    company: 'Brand Agency',
  },
  {
    id: 'user6',
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    status: 'Online',
    title: 'CEO',
    company: 'Innovation Corp',
  },
];

export default function CreateChatModal({
  visible,
  onClose,
  onSelectUser,
  users = SAMPLE_USERS,
}: Props) {
  const insets = useSafeAreaInsets();
  const palette = useCreateChatPalette();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const translateY = useRef(new Animated.Value(1000)).current;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.title?.toLowerCase().includes(query) ||
        user.company?.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
        easing: Easing.out(Easing.cubic),
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start();
      setSearchQuery('');
    }
  }, [visible]);

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    onClose();
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={[styles.userItem, { borderBottomColor: palette.border }]}
      onPress={() => handleSelectUser(item)}
      activeOpacity={0.7}>
      <View style={styles.userAvatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
        {item.status === 'Online' && (
          <View style={[styles.statusIndicator, { backgroundColor: palette.onlineColor }]} />
        )}
      </View>
      <View style={styles.userInfo}>
        <ThemedText style={styles.userName}>{item.name}</ThemedText>
        {item.title && (
          <ThemedText style={[styles.userTitle, { color: palette.mutedText }]}>
            {item.title}
            {item.company && ` at ${item.company}`}
          </ThemedText>
        )}
      </View>
      <MaterialIcons name="chevron-right" size={24} color={palette.mutedText} />
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={StyleSheet.absoluteFill}>
        <BlurView tint="dark" intensity={40} style={StyleSheet.absoluteFill} />
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={styles.container}>
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: palette.surface,
              transform: [{ translateY }],
              paddingBottom: insets.bottom + 20,
            },
          ]}>
          <View style={[styles.header, { borderBottomColor: palette.border }]}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: palette.closeBtnBg }]}
              activeOpacity={0.7}>
              <MaterialIcons name="close" size={24} color={palette.text} />
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>New Chat</ThemedText>
          </View>

          <View style={[styles.searchContainer, { backgroundColor: palette.searchBg, borderColor: palette.border }]}>
            <MaterialIcons name="search" size={20} color={palette.mutedText} />
            <TextInput
              placeholder="Search users..."
              placeholderTextColor={palette.mutedText}
              style={[styles.searchInput, { color: palette.text }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                <MaterialIcons name="clear" size={20} color={palette.mutedText} />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            style={styles.userList}
            contentContainerStyle={styles.userListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <MaterialIcons name="person-off" size={48} color={palette.mutedText} />
                <ThemedText style={[styles.emptyStateText, { color: palette.mutedText }]}>
                  No users found
                </ThemedText>
              </View>
            }
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

type CreateChatPalette = ReturnType<typeof useCreateChatPalette>;

function useCreateChatPalette() {
  const theme = useColorScheme() ?? 'light';
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const icon = useThemeColor({}, 'icon');

  return {
    theme,
    background,
    text,
    tint,
    icon,
    surface: useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background'),
    searchBg: useThemeColor({ light: '#f5f5f5', dark: '#2a2a2a' }, 'background'),
    border: useThemeColor({ light: '#e5e7eb', dark: '#3a3a3a' }, 'background'),
    mutedText: useThemeColor({ light: '#6f6f6f', dark: '#c7c7c7' }, 'text'),
    closeBtnBg: useThemeColor({ light: '#f4f4f4', dark: '#2a2a2a' }, 'background'),
    onlineColor: '#10b981',
    shadow: theme === 'light' ? '#000000' : '#000000',
  };
}

function createStyles(palette: CreateChatPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      flex: 1,
    },
    sheet: {
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      maxHeight: '85%',
      zIndex: 1000,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    closeBtn: {
      position: 'absolute',
      left: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 16,
      marginBottom: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      borderWidth: 1,
      gap: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    userList: {
      flex: 1,
    },
    userListContent: {
      paddingBottom: 20,
    },
    userItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      gap: 12,
    },
    userAvatarContainer: {
      position: 'relative',
    },
    userAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    statusIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: palette.surface,
    },
    userInfo: {
      flex: 1,
      gap: 4,
    },
    userName: {
      fontSize: 16,
      fontWeight: '600',
    },
    userTitle: {
      fontSize: 14,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
      gap: 12,
    },
    emptyStateText: {
      fontSize: 16,
    },
  });
}

