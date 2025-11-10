import { ScrollView, StyleSheet, View } from 'react-native';

import { Header } from '@/components/header';
import { MetricCard } from '@/components/metric-card';
import { ProfileViewsChart } from '@/components/profile-views-chart';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Sample chart data
const chartData = [
  { date: '2025-10-07', value: 0 },
  { date: '2025-10-10', value: 0 },
  { date: '2025-10-13', value: 0 },
  { date: '2025-10-16', value: 0 },
  { date: '2025-10-19', value: 0 },
  { date: '2025-10-22', value: 0 },
  { date: '2025-10-25', value: 0 },
  { date: '2025-10-28', value: 0 },
  { date: '2025-10-31', value: 0 },
  { date: '2025-11-01', value: 0 },
  { date: '2025-11-02', value: 2.5 },
];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.content}>
          <ThemedText type="defaultSemiBold" style={styles.welcomeText}>
            Welcome, Dee
          </ThemedText>

          {/* Metrics Cards */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricsRow}>
              <MetricCard
                title="Potential Jobs"
                value="50"
                subtitle="Potential Jobs Available"
                icon="work-outline"
                iconColor="#fff"
                iconBgColor="#64B5F6"
                showArrow={true}
                borderColor="#fff"
              />
              <View style={styles.metricSpacer} />
              <MetricCard
                title="Matched Jobs"
                value="12"
                subtitle="% High relevance score"
                icon="check-circle-outline"
                iconColor="#fff"
                iconBgColor="#81C784"
                borderColor="#fff"
              />
            </View>

            <View style={styles.metricsRow}>
              <MetricCard
                title="Search Appearance"
                value="0"
                icon="search"
                iconColor="#fff"
                iconBgColor="#64B5F6"
                borderColor="#fff"
              />
              <View style={styles.metricSpacer} />
              <MetricCard
                title="Applied Jobs"
                value="0"
                icon="send"
                iconColor="#fff"
                iconBgColor="#FFB74D"
                borderColor="#fff"
              />
            </View>
          </View>

          {/* Profile Views Chart */}
          <ProfileViewsChart data={chartData} total={0} borderColor="#fff" />
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
    padding: 12,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.7,
  },
  metricsGrid: {
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricSpacer: {
    width: 12,
  },
});
