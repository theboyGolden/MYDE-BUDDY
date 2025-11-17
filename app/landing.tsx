import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import LandingAnimated from '@/components/landing-animated';

export default function LandingScreen() {
  const router = useRouter();

  const handleAutoNavigate = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <LandingAnimated onAutoNavigate={handleAutoNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

