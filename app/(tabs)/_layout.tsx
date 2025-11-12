import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <FontAwesome5 name="chart-line" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="job-centre"
        options={{
          title: 'Job Centre',
          tabBarIcon: ({ color }) => <FontAwesome5 name="briefcase" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="education-centre"
        options={{
          title: 'Education',
          tabBarIcon: ({ color }) => <FontAwesome5 name="graduation-cap" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="entrepreneurship-centre"
        options={{
          title: 'Entrepreneurship',
          tabBarIcon: ({ color }) => <FontAwesome5 name="handshake" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Network',
          tabBarIcon: ({ color }) => <FontAwesome5 name="users" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
