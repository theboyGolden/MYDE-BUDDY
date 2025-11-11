import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { Header } from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function NetworkingScreen() {
  const [activeTab, setActiveTab] = useState<'people' | 'connected' | 'requests' | 'chat'>('people');
  const palette = useNetworkingPalette();
  const styles = useMemo(() => createStyles(palette), [palette]);
  const tabs = useMemo(
    () => [
      { key: 'people' as const, label: 'People' },
      { key: 'connected' as const, label: 'Connected' },
      { key: 'requests' as const, label: 'Requests' },
      { key: 'chat' as const, label: 'Chat' },
    ],
    [],
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'connected':
        return <ConnectedSection styles={styles} palette={palette} />;
      case 'requests':
        return <RequestsSection styles={styles} palette={palette} />;
      case 'chat':
        return <ChatSection styles={styles} palette={palette} />;
      case 'people':
      default:
        return <PeopleSection styles={styles} palette={palette} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Networking" showBackButton />
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.85}>
              <ThemedText
                style={[styles.tabText, isActive ? styles.tabTextActive : styles.tabTextInactive]}>
                {tab.label}
              </ThemedText>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

type NetworkingPalette = ReturnType<typeof useNetworkingPalette>;

function useNetworkingPalette() {
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
    // light / dark specific tokens
    surface: useThemeColor({ light: '#ffffff', dark: '#1f1f1f' }, 'background'),
    accentSurface: useThemeColor({ light: '#fff8e7', dark: '#241a10' }, 'background'),
    cardShadow: theme === 'light' ? '#f2a900' : '#000000',
    mutedText: useThemeColor({ light: '#545454', dark: '#c7c7c7' }, 'text'),
    jobBorder: useThemeColor({ light: '#f2d9a0', dark: '#3a2b15' }, 'background'),
    jobBackground: useThemeColor({ light: '#fff8ea', dark: '#1d170f' }, 'background'),
    followButtonBg: useThemeColor({ light: '#ffd88a', dark: '#3c2a10' }, 'background'),
    followButtonText: useThemeColor({ light: '#7a4b00', dark: '#f5d8a4' }, 'text'),
    seeMoreText: useThemeColor({ light: '#e39800', dark: '#f2d097' }, 'tint'),
    divider: useThemeColor({ light: '#e6e0d2', dark: '#2f2518' }, 'background'),
  };
}

function createStyles(palette: NetworkingPalette) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background,
    },
    scrollView: {
      flex: 1,
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
      marginTop: 12,
      borderRadius: 24,
      backgroundColor: palette.accentSurface,
      paddingVertical: 6,
      paddingHorizontal: 4,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.divider,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 20,
      position: 'relative',
    },
    tabButtonActive: {
      backgroundColor: palette.surface,
      elevation: 2,
      shadowColor: palette.cardShadow,
      shadowOpacity: palette.theme === 'light' ? 0.12 : 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    tabText: {
      fontSize: 15,
      fontWeight: '600',
    },
    tabTextActive: {
      color: palette.tint,
    },
    tabTextInactive: {
      color: palette.mutedText,
    },
    activeIndicator: {
      position: 'absolute',
      bottom: 4,
      width: 28,
      height: 3,
      borderRadius: 2,
      backgroundColor: palette.tint,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 32,
      gap: 20,
    },
    sectionCard: {
      gap: 12,
      borderRadius: 20,
      backgroundColor: palette.surface,
      padding: 20,
      shadowColor: palette.cardShadow,
      shadowOpacity: palette.theme === 'light' ? 0.08 : 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 8 },
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: palette.text,
    },
    sectionBody: {
      fontSize: 15,
      lineHeight: 22,
      color: palette.mutedText,
    },
    chatWrapper: {
      gap: 20,
    },
    chatHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.surface,
      borderRadius: 28,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: palette.divider,
      shadowColor: palette.cardShadow,
      shadowOpacity: palette.theme === 'light' ? 0.08 : 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 15,
      color: palette.text,
    },
    filterButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.tint,
      shadowColor: palette.cardShadow,
      shadowOpacity: palette.theme === 'light' ? 0.12 : 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    chatList: {
      gap: 16,
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: palette.surface,
      borderRadius: 22,
      paddingVertical: 14,
      paddingHorizontal: 16,
      shadowColor: palette.cardShadow,
      shadowOpacity: palette.theme === 'light' ? 0.08 : 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    chatAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    chatBody: {
      flex: 1,
      marginLeft: 14,
      gap: 6,
    },
    chatName: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.text,
    },
    chatMessage: {
      fontSize: 13,
      color: palette.mutedText,
    },
    chatMeta: {
      alignItems: 'flex-end',
      gap: 8,
      marginHorizontal: 12,
    },
    chatTime: {
      fontSize: 12,
      fontWeight: '600',
      color: palette.mutedText,
    },
    unreadBadge: {
      minWidth: 22,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palette.tint,
    },
    unreadText: {
      fontSize: 11,
      fontWeight: '700',
      color: palette.surface,
    },
    fab: {
      position: 'absolute',
      right: 8,
      bottom: -4,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#040404',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    peopleWrapper: {
      backgroundColor: palette.surface,
      borderRadius: 28,
      paddingVertical: 24,
      paddingHorizontal: 20,
      gap: 20,
      shadowColor: palette.cardShadow,
      shadowOpacity: palette.theme === 'light' ? 0.1 : 0.3,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 10 },
      elevation: 4,
    },
    friendsList: {
      marginHorizontal: -8,
    },
    friendsContent: {
      gap: 16,
      paddingHorizontal: 8,
    },
    friendCard: {
      alignItems: 'center',
      width: 70,
      gap: 8,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },
    friendName: {
      fontSize: 13,
      color: palette.text,
      fontWeight: '600',
      textAlign: 'center',
    },
    employeesList: {
      gap: 18,
    },
    employeeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
    },
    employeeInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    employeeAvatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
    },
    employeeName: {
      fontSize: 15,
      fontWeight: '700',
      color: palette.text,
    },
    employeeRole: {
      fontSize: 13,
      color: palette.mutedText,
      marginTop: 2,
    },
    followButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: palette.followButtonBg,
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    followText: {
      fontSize: 13,
      fontWeight: '700',
      color: palette.followButtonText,
    },
    followIcon: {
      fontSize: 14,
      fontWeight: '700',
      color: palette.followButtonText,
      marginTop: -1,
    },
    seeMoreButton: {
      alignSelf: 'center',
      marginTop: 8,
    },
    seeMoreText: {
      fontSize: 16,
      fontWeight: '700',
      color: palette.seeMoreText,
    },
  });
}

type SectionProps = {
  styles: ReturnType<typeof createStyles>;
  palette: NetworkingPalette;
};

const ConnectedSection = ({ styles }: SectionProps) => (
  <View style={styles.sectionCard}>
    <ThemedText type="title" style={styles.sectionTitle}>
      People You Follow
    </ThemedText>
    <ThemedText style={styles.sectionBody}>
      Discover highlights and updates from founders, mentors, and communities you are connected to.
      New stories, launch announcements, and shared learnings appear here once your network posts
      them.
    </ThemedText>
  </View>
);

const RequestsSection = ({ styles }: SectionProps) => (
  <View style={styles.sectionCard}>
    <ThemedText type="title" style={styles.sectionTitle}>
      Connection Requests
    </ThemedText>
    <ThemedText style={styles.sectionBody}>
      View pending invitations from founders, investors, and collaborators who want to connect with
      you. Accept to expand your circle or leave feedback to keep the conversation going.
    </ThemedText>
    <ThemedText style={styles.sectionBody}>
      Hosting an event or launching a new project? Send invites to your close contacts and keep an eye
      on confirmations in this space.
    </ThemedText>
  </View>
);

const ChatSection = ({ styles, palette }: SectionProps) => {
  const router = useRouter();
  const chats = [
    {
      id: '1',
      name: 'Richar Kandowen',
      message: 'Lorem ipsum dolor sit amet...',
      time: '10:20',
      unreadCount: 2,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      messages: [
        {
          id: 'm1',
          type: 'received' as const,
          text: 'Lorem ipsum dolor sit et, consectetur adipiscing.',
          time: '15:42 PM',
        },
        {
          id: 'm2',
          type: 'sent' as const,
          text: 'Lorem ipsum dolor sit et',
          time: '15:42 PM',
        },
        {
          id: 'm3',
          type: 'received' as const,
          text: 'Lorem ipsum dolor sit et, consectetur adipiscing.',
          time: '15:42 PM',
        },
      ],
    },
    {
      id: '2',
      name: 'Jeden Murred',
      message: 'Lorem ipsum dolor sit amet...',
      time: '10:20',
      unreadCount: 2,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      messages: [
        {
          id: 'm1',
          type: 'received' as const,
          text: 'Hey, did you check out the new update?',
          time: '12:56 PM',
        },
        {
          id: 'm2',
          type: 'sent' as const,
          text: 'Not yet, planning to later today.',
          time: '12:58 PM',
        },
      ],
    },
    {
      id: '3',
      name: 'Chris Offile',
      message: 'Lorem ipsum dolor sit amet...',
      time: '10:20',
      unreadCount: 0,
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      messages: [
        {
          id: 'm1',
          type: 'received' as const,
          text: 'We should sync up tomorrow morning.',
          time: '09:12 AM',
        },
      ],
    },
    {
      id: '4',
      name: 'Jeremy Fox',
      message: 'Lorem ipsum dolor sit amet...',
      time: '10:20',
      unreadCount: 0,
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      messages: [
        {
          id: 'm1',
          type: 'received' as const,
          text: 'Can you review the draft when you have a moment?',
          time: '08:15 AM',
        },
        {
          id: 'm2',
          type: 'sent' as const,
          text: 'Absolutely, sending feedback shortly.',
          time: '08:18 AM',
        },
      ],
    },
  ];
  return (
    <View style={styles.chatWrapper}>
      <View style={styles.chatHeader}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={18} color={palette.mutedText} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor={palette.mutedText}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.75}>
          <MaterialIcons name="tune" size={20} color={palette.surface} />
        </TouchableOpacity>
      </View>

      <View style={styles.chatList}>
        {chats.map((chat) => {
          const isActive = chat.id === selectedChatId;
          return (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() =>
                router.push({
                  pathname: '/chat/[id]',
                  params: { id: chat.id },
                })
              }
              activeOpacity={0.85}>
              <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
              <View style={styles.chatBody}>
                <ThemedText style={styles.chatName}>{chat.name}</ThemedText>
                <ThemedText style={styles.chatMessage}>{chat.message}</ThemedText>
              </View>
              <View style={styles.chatMeta}>
                <ThemedText style={styles.chatTime}>{chat.time}</ThemedText>
                {chat.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <ThemedText style={styles.unreadText}>{chat.unreadCount}</ThemedText>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.fab} activeOpacity={0.75}>
        <MaterialIcons name="add" size={24} color={palette.surface} />
      </TouchableOpacity>
    </View>
  );
};

const PeopleSection = ({ styles }: SectionProps) => {
  const friends = [
    { id: 'andy', name: 'Andy', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { id: 'eldy', name: 'Eldy', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'emely', name: 'Emely', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 'jhone', name: 'Jhone', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
  ];

  const employees = [
    {
      id: '1',
      name: 'Lydia Jacobson',
      role: 'Internal Brand Strategist',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: '2',
      name: 'Joe Lemke',
      role: 'Lead Creative Developer',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      id: '3',
      name: 'Eleanor Skiles',
      role: 'Senior Web Executive',
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    },
    {
      id: '4',
      name: 'Anna Sporer I',
      role: 'Product Web Orchestrator',
      avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
    },
    {
      id: '5',
      name: 'Willie Bradtke',
      role: 'Principal Intranet Consultant',
      avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    },
    {
      id: '6',
      name: 'Brandy Gusikowski',
      role: 'Future Functionality Designer',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    },
  ];

  return (
    <View style={styles.peopleWrapper}>
      <ThemedText type="title" style={styles.sectionTitle}>
        15 of your friends work here
      </ThemedText>
      <FlatList
        horizontal
        data={friends}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.friendsContent}
        style={styles.friendsList}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <ThemedText style={styles.friendName}>{item.name}</ThemedText>
          </View>
        )}
      />

      <ThemedText type="title" style={styles.sectionTitle}>
        11,538 Employees
      </ThemedText>
      <View style={styles.employeesList}>
        {employees.map((employee) => (
          <View key={employee.id} style={styles.employeeRow}>
            <View style={styles.employeeInfo}>
              <Image source={{ uri: employee.avatar }} style={styles.employeeAvatar} />
              <View>
                <ThemedText style={styles.employeeName}>{employee.name}</ThemedText>
                <ThemedText style={styles.employeeRole}>{employee.role}</ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.followButton} activeOpacity={0.8}>
              <ThemedText style={styles.followText}>Follow</ThemedText>
              <ThemedText style={styles.followIcon}>＋</ThemedText>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.seeMoreButton} activeOpacity={0.75}>
        <ThemedText style={styles.seeMoreText}>See More</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

