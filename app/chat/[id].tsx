import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

type Message = {
  id: string;
  type: 'sent' | 'received';
  text: string;
  time: string;
};

type ChatDetail = {
  id: string;
  name: string;
  avatar: string;
  status: 'Online' | 'Offline';
  messages: Message[];
};

const CHAT_DATA: Record<string, ChatDetail> = {
  '1': {
    id: '1',
    name: 'Richar Kandowen',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    status: 'Online',
    messages: [
      {
        id: 'm1',
        type: 'received',
        text: 'Lorem ipsum dolor sit et, consectetur adipiscing.',
        time: '15:42 PM',
      },
      {
        id: 'm2',
        type: 'sent',
        text: 'Lorem ipsum dolor sit et',
        time: '15:42 PM',
      },
      {
        id: 'm3',
        type: 'received',
        text: 'Lorem ipsum dolor sit et, consectetur adipiscing.',
        time: '15:42 PM',
      },
    ],
  },
  '2': {
    id: '2',
    name: 'Jeden Murred',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    status: 'Online',
    messages: [
      {
        id: 'm1',
        type: 'received',
        text: 'Hey, did you check out the new update?',
        time: '12:56 PM',
      },
      {
        id: 'm2',
        type: 'sent',
        text: 'Not yet, planning to later today.',
        time: '12:58 PM',
      },
    ],
  },
  '3': {
    id: '3',
    name: 'Chris Offile',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    status: 'Offline',
    messages: [
      {
        id: 'm1',
        type: 'received',
        text: 'We should sync up tomorrow morning.',
        time: '09:12 AM',
      },
    ],
  },
  '4': {
    id: '4',
    name: 'Jeremy Fox',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    status: 'Online',
    messages: [
      {
        id: 'm1',
        type: 'received',
        text: 'Can you review the draft when you have a moment?',
        time: '08:15 AM',
      },
      {
        id: 'm2',
        type: 'sent',
        text: 'Absolutely, sending feedback shortly.',
        time: '08:18 AM',
      },
    ],
  },
};

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const palette = useChatPalette();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const chat = id ? CHAT_DATA[String(id)] : undefined;

  if (!chat) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            accessibilityRole="button"
            activeOpacity={0.7}>
            <MaterialIcons name="arrow-back-ios-new" size={20} color={palette.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Chat</ThemedText>
        </View>
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>Chat not found.</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setIsMenuOpen(false);
            router.back();
          }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
          activeOpacity={0.7}>
          <MaterialIcons name="arrow-back-ios-new" size={20} color={palette.text} />
        </TouchableOpacity>

        <View style={styles.participantInfo}>
          <Image source={{ uri: chat.avatar }} style={styles.avatar} />
          <View>
            <ThemedText style={styles.name}>{chat.name}</ThemedText>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: chat.status === 'Online' ? palette.tint : palette.mutedText },
                ]}
              />
              <ThemedText style={styles.statusText}>{chat.status}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuOpen((prev) => !prev)}
            accessibilityLabel="Chat options"
            accessibilityRole="button"
            activeOpacity={0.7}>
            <MaterialIcons name="more-vert" size={22} color={palette.text} />
          </TouchableOpacity>

          {isMenuOpen && (
            <View style={styles.menuDropdown}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setIsMenuOpen(false)}
                activeOpacity={0.7}>
                <MaterialIcons name="call" size={18} color={palette.text} />
                <ThemedText style={styles.menuItemText}>Voice Call</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.menuItem, styles.menuItemActive]}
                onPress={() => setIsMenuOpen(false)}
                activeOpacity={0.7}>
                <MaterialIcons name="videocam" size={18} color={palette.tint} />
                <ThemedText style={[styles.menuItemText, styles.menuItemTextActive]}>
                  Video Call
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.thread}
        contentContainerStyle={styles.threadContent}>
        {chat.messages.map((message) => {
          const isSent = message.type === 'sent';
          return (
            <View
              key={message.id}
              style={[styles.messageRow, isSent ? styles.messageRowSent : styles.messageRowReceived]}>
              {!isSent && <Image source={{ uri: chat.avatar }} style={styles.messageAvatar} />}

              <View style={styles.messageContent}>
                <View style={[styles.messageBubble, isSent ? styles.messageBubbleSent : styles.messageBubbleReceived]}>
                  <ThemedText
                    style={[styles.messageText, isSent ? styles.messageTextSent : styles.messageTextReceived]}>
                    {message.text}
                  </ThemedText>
                </View>
                <ThemedText style={styles.messageTime}>{message.time}</ThemedText>
              </View>

              {isSent && (
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/men/45.jpg' }}
                  style={styles.messageAvatarSmall}
                />
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.composer}>
        <TouchableOpacity style={styles.composerAction} activeOpacity={0.7}>
          <MaterialIcons name="insert-photo" size={22} color={palette.tint} />
        </TouchableOpacity>
        <TextInput
          placeholder="Message"
          placeholderTextColor={palette.mutedText}
          style={styles.composerInput}
        />
        <TouchableOpacity style={styles.composerSend} activeOpacity={0.7}>
          <MaterialIcons name="send" size={20} color={palette.surface} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

type ChatPalette = ReturnType<typeof useChatPalette>;

function useChatPalette() {
  const theme = useColorScheme() ?? 'light';
  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');

  return {
    theme,
    background,
    text,
    tint,
    surface: useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background'),
    accentSurface: useThemeColor({ light: '#f6f6f6', dark: '#2a2a2a' }, 'background'),
    mutedText: useThemeColor({ light: '#6f6f6f', dark: '#c7c7c7' }, 'text'),
    divider: useThemeColor({ light: 'rgba(0,0,0,0.08)', dark: 'rgba(255,255,255,0.08)' }, 'background'),
    shadow: theme === 'light' ? '#000000' : '#000000',
  };
}

function createStyles(palette: ChatPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 24,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.divider,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.surface,
      shadowColor: palette.shadow,
      shadowOpacity: palette.theme === 'light' ? 0.08 : 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '600',
      color: palette.text,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyStateText: {
      fontSize: 16,
      color: palette.mutedText,
    },
    participantInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
      marginHorizontal: 16,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
    },
    name: {
      fontSize: 17,
      fontWeight: '700',
      color: palette.text,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 4,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusText: {
      fontSize: 12,
      color: palette.mutedText,
    },
    menuWrapper: {
      position: 'relative',
    },
    menuButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.divider,
      shadowColor: palette.shadow,
      shadowOpacity: palette.theme === 'light' ? 0.06 : 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    menuDropdown: {
      position: 'absolute',
      top: 48,
      right: 0,
      width: 160,
      borderRadius: 16,
      backgroundColor: palette.surface,
      paddingVertical: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.divider,
      shadowColor: palette.shadow,
      shadowOpacity: palette.theme === 'light' ? 0.1 : 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
      gap: 4,
      zIndex: 10,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    menuItemActive: {
      backgroundColor: palette.accentSurface,
    },
    menuItemText: {
      fontSize: 14,
      color: palette.text,
      fontWeight: '500',
    },
    menuItemTextActive: {
      color: palette.tint,
      fontWeight: '600',
    },
    thread: {
      flex: 1,
      marginTop: 28,
    },
    threadContent: {
      gap: 20,
      paddingBottom: 16,
    },
    messageRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 12,
    },
    messageRowSent: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
    },
    messageRowReceived: {
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
    },
    messageContent: {
      maxWidth: '70%',
      gap: 6,
    },
    messageBubble: {
      paddingVertical: 14,
      paddingHorizontal: 18,
      borderRadius: 18,
    },
    messageBubbleSent: {
      backgroundColor: palette.tint,
      borderBottomRightRadius: 6,
    },
    messageBubbleReceived: {
      backgroundColor: palette.accentSurface,
      borderBottomLeftRadius: 6,
    },
    messageText: {
      fontSize: 14,
      lineHeight: 20,
    },
    messageTextSent: {
      color: palette.surface,
      fontWeight: '600',
    },
    messageTextReceived: {
      color: palette.text,
      fontWeight: '500',
    },
    messageTime: {
      fontSize: 11,
      color: palette.mutedText,
      alignSelf: 'flex-start',
    },
    messageAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    messageAvatarSmall: {
      width: 22,
      height: 22,
      borderRadius: 11,
    },
    composer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 16,
      backgroundColor: palette.surface,
      borderRadius: 28,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.divider,
      shadowColor: palette.shadow,
      shadowOpacity: palette.theme === 'light' ? 0.08 : 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    composerAction: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.accentSurface,
    },
    composerInput: {
      flex: 1,
      fontSize: 15,
      color: palette.text,
    },
    composerSend: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.tint,
    },
  });
}


