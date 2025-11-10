import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Header } from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function MoreScreen() {
  const router = useRouter();
  const iconColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
    'background'
  );

  const menuItems = [
    {
      title: 'Education Centre',
      icon: 'school',
      route: '/education-centre',
    },
    {
      title: 'Entrepreneurship Centre',
      icon: 'business-center',
      route: '/entrepreneurship-centre',
    },
    {
      title: 'Networking',
      icon: 'people-outline',
      route: '/networking',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="More" />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>More</ThemedText>
          <ThemedText style={styles.description}>
            Explore additional resources and opportunities.
          </ThemedText>

          <ThemedView style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, { borderColor }]}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}>
                <MaterialIcons name={item.icon as any} size={24} color={iconColor} />
                <ThemedText type="defaultSemiBold" style={styles.menuItemText}>
                  {item.title}
                </ThemedText>
                <MaterialIcons name="chevron-right" size={24} color={iconColor} />
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
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
  content: {
    padding: 20,
    gap: 24,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    opacity: 0.7,
  },
  menuContainer: {
    gap: 12,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
  },
});

