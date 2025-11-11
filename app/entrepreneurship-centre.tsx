import { ScrollView, StyleSheet, View } from 'react-native';

import { Header } from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function EntrepreneurshipCentreScreen() {
  return (
    <View style={styles.container}>
      <Header title="Entrepreneurship Centre" showBackButton />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">Entrepreneurship Centre</ThemedText>
          <ThemedText style={styles.description}>
            Resources and tools to help you start and grow your business.
          </ThemedText>
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
    gap: 16,
  },
  description: {
    marginTop: 8,
    opacity: 0.7,
  },
});

