import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

interface DataPoint {
  date: string;
  value: number;
}

interface ProfileViewsChartProps {
  data: DataPoint[];
  total: number;
  borderColor?: string;
}

export function ProfileViewsChart({
  data,
  total,
  borderColor: customBorderColor,
}: ProfileViewsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = customBorderColor
    ? customBorderColor
    : useThemeColor(
        { light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)' },
        'background'
      );

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 72; // Account for margins and padding
  const chartHeight = 200;
  const padding = 20;

  // Calculate max value for Y-axis
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const yAxisMax = Math.ceil(maxValue * 1.2); // Add 20% padding
  const yAxisSteps = 5;
  const yAxisStep = yAxisMax / yAxisSteps;

  // Calculate positions for data points
  const xStep = (chartWidth - padding * 2) / (data.length - 1 || 1);
  const yScale = (chartHeight - padding * 2) / yAxisMax;

  // Generate Y-axis labels
  const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) => {
    const value = yAxisMax - i * yAxisStep;
    return value.toFixed(1);
  });

  // Generate path for line
  const points = data.map((point, index) => ({
    x: padding + index * xStep,
    y: padding + (yAxisMax - point.value) * yScale,
    value: point.value,
  }));

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor,
          ...(customBorderColor && {
            borderColor: customBorderColor,
            borderWidth: StyleSheet.hairlineWidth,
          }),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
      ]}>
      <View style={styles.header}>
        <View>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            Profile Views
          </ThemedText>
          <ThemedText style={styles.total}>Total - {total}</ThemedText>
        </View>
        <TouchableOpacity style={[styles.dropdown, { borderColor }]}>
          <ThemedText style={styles.dropdownText}>{selectedPeriod}</ThemedText>
          <MaterialIcons name="arrow-drop-down" size={20} color={iconColor} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.chartContainer}>
        <View style={styles.chart}>
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            {yAxisLabels.map((label, index) => (
              <ThemedText key={index} style={styles.yAxisLabel}>
                {label}
              </ThemedText>
            ))}
          </View>

          {/* Chart area */}
          <View style={[styles.chartArea, { width: chartWidth, height: chartHeight }]}>
            {/* Grid lines */}
            {yAxisLabels.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.gridLine,
                  {
                    top: padding + (index * (chartHeight - padding * 2)) / yAxisSteps,
                    width: chartWidth - padding * 2,
                    borderColor,
                  },
                ]}
              />
            ))}

            {/* Line path using SVG-like approach with View */}
            <View style={styles.lineContainer}>
              {points.map((point, index) => {
                if (index === 0) return null;
                const prevPoint = points[index - 1];
                const dx = point.x - prevPoint.x;
                const dy = point.y - prevPoint.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                return (
                  <View
                    key={index}
                    style={[
                      styles.lineSegment,
                      {
                        left: prevPoint.x,
                        top: prevPoint.y - 1,
                        width: distance,
                        transform: [{ rotate: `${angle}deg` }],
                        transformOrigin: 'left center',
                        backgroundColor: '#e0971d',
                      },
                    ]}
                  />
                );
              })}
            </View>

            {/* Data points */}
            {points.map((point, index) => (
              <View
                key={index}
                style={[
                  styles.dataPoint,
                  {
                    left: point.x - 4,
                    top: point.y - 4,
                    backgroundColor: '#e0971d',
                  },
                ]}
              />
            ))}

            {/* X-axis labels */}
            <View style={styles.xAxis}>
              {data.map((point, index) => (
                <ThemedText key={index} style={[styles.xAxisLabel, { left: padding + index * xStep - 30 }]}>
                  {point.date.split('-')[2]}
                </ThemedText>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  total: {
    fontSize: 12,
    opacity: 0.6,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 12,
  },
  chartContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  chart: {
    flexDirection: 'row',
  },
  yAxis: {
    width: 40,
    height: 200,
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingTop: 20,
    paddingBottom: 20,
  },
  yAxisLabel: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: 'right',
  },
  chartArea: {
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    borderTopWidth: StyleSheet.hairlineWidth,
    left: 20,
  },
  lineContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  lineSegment: {
    position: 'absolute',
    height: 2,
    transformOrigin: 'left center',
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  xAxis: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
  },
  xAxisLabel: {
    position: 'absolute',
    fontSize: 10,
    opacity: 0.6,
    width: 60,
    textAlign: 'center',
  },
});

