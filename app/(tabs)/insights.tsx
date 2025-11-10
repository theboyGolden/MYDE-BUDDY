import { ScrollView, StyleSheet, View } from 'react-native';

import { CareerPathwaySection } from '@/components/career-pathway-section';
import { Header } from '@/components/header';
import { OpportunitiesCentreSection } from '@/components/opportunities-centre-section';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function InsightsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Insights" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.welcomeText}>
            Welcome to your personalized insights, Dee
          </ThemedText>

          <CareerPathwaySection />
          <OpportunitiesCentreSection />
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
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    color: '#333',
  },
  welcomeText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 32,
    color: '#666',
  },
});
