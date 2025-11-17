import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    AccessibilityInfo,
    Dimensions,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
// Calculate the diagonal to ensure circle covers entire screen
const MAX_RADIUS = Math.sqrt(SCREEN_WIDTH * SCREEN_WIDTH + SCREEN_HEIGHT * SCREEN_HEIGHT) / 2;
// Logo size (matches the icon size in styles)
const LOGO_SIZE = 300;
const INITIAL_RADIUS = LOGO_SIZE / 2; // Start from logo's radius

interface LandingAnimatedProps {
  onAutoNavigate?: () => void;
}

export default function LandingAnimated({ onAutoNavigate }: LandingAnimatedProps) {
  // Respect reduced motion
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      AccessibilityInfo.isReduceMotionEnabled().then((res) => setReduceMotion(res));
      const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (res) =>
        setReduceMotion(res)
      );
      return () => subscription?.remove();
    }
  }, []);

  // Note: Local images with require() are already bundled and load instantly
  // expo-image provides better caching and performance than React Native's Image

  // Shared values
  const containerTranslateY = useSharedValue(-SCREEN_HEIGHT); // Start off-screen at top
  const iconOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0.8);
  const circleRadius = useSharedValue(INITIAL_RADIUS); // Starts from logo's size
  const backgroundOpacity = useSharedValue(0); // Start hidden, will fade in as circle expands
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const subtitleY = useSharedValue(15);

  useEffect(() => {
    if (reduceMotion) {
      // Simplified animation for reduced motion
      containerTranslateY.value = withTiming(0, { duration: 300 });
      iconOpacity.value = withTiming(1, { duration: 300 });
      iconScale.value = withTiming(1, { duration: 300 });
      backgroundOpacity.value = withTiming(1, { duration: 300 });
      titleOpacity.value = withDelay(500, withTiming(1, { duration: 300 }));
      subtitleOpacity.value = withDelay(700, withTiming(1, { duration: 300 }));
      return;
    }

    // Step 0: Landing page descends from top (0-1.2s)
    containerTranslateY.value = withTiming(0, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });

    // Step 1: Icon appears first (0-0.6s)
    iconOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    iconScale.value = withSequence(
      withTiming(1.1, { duration: 350, easing: Easing.out(Easing.exp) }),
      withTiming(1, { duration: 250, easing: Easing.in(Easing.exp) })
    );

    // Step 2: Green circle expands from logo's shape/size (0.8s - 2.8s)
    // Circle starts at logo size and expands outward
    // First make it visible, then expand
    backgroundOpacity.value = withDelay(
      800,
      withTiming(1, {
        duration: 100, // Quick fade in
        easing: Easing.out(Easing.cubic),
      })
    );
    
    circleRadius.value = withDelay(
      800,
      withTiming(MAX_RADIUS, {
        duration: 2000,
        easing: Easing.out(Easing.cubic),
      })
    );

    // Step 3: Text appears below icon AFTER green explosion (starts at 2.8s, after expansion)
    titleOpacity.value = withDelay(2800, withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }));
    titleY.value = withDelay(2800, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
    
    subtitleOpacity.value = withDelay(3100, withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) }));
    subtitleY.value = withDelay(3100, withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }));

    // Step 4: Navigate to login after text appears (total ~4.5s)
    const navigateTimer = setTimeout(() => {
      if (onAutoNavigate) {
        onAutoNavigate();
      }
    }, 4500);

    return () => {
      cancelAnimation(containerTranslateY);
      cancelAnimation(circleRadius);
      cancelAnimation(backgroundOpacity);
      clearTimeout(navigateTimer);
    };
  }, [reduceMotion, onAutoNavigate]);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: containerTranslateY.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));

  const circleStyle = useAnimatedStyle(() => {
    const radius = reduceMotion ? MAX_RADIUS : circleRadius.value;
    return {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius, // Always maintain perfect circle shape
      opacity: backgroundOpacity.value,
      // Center the circle
      left: SCREEN_WIDTH / 2 - radius,
      top: SCREEN_HEIGHT / 2 - radius,
    };
  });

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Initial white background */}
      <View style={styles.initialBackground} />

      {/* Expanding green circle from center */}
      <View style={styles.circleContainer} pointerEvents="none">
        <Animated.View style={[styles.expandingCircle, circleStyle]}>
          <LinearGradient
            colors={['#046A38', '#059669', '#024D27']}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      {/* Content */}
      <Animated.View style={[styles.center, containerStyle]}>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.icon}
            contentFit="contain"
            cachePolicy="memory-disk"
            priority="high"
            transition={200}
          />
        </Animated.View>
        <Animated.Text style={[styles.title, titleStyle]}>MYDE Buddy</Animated.Text>
        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          Your professional world, smarter.
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Initial white background
  },
  initialBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  expandingCircle: {
    backgroundColor: '#046A38',
    position: 'absolute',
    // Will be centered via animated style
    borderRadius: INITIAL_RADIUS, // Start as a perfect circle matching logo size
    overflow: 'hidden', // Ensure gradient respects circular shape
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  iconContainer: {
    width: 300,
    height: 300,
    borderRadius: 150, // Perfect circle (half of width/height)
    overflow: 'hidden', // Clip icon to circular shape
    marginBottom: 24,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
