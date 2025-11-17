import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function LoginScreen() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Slide down animation
  const translateY = useSharedValue(-1000);
  const opacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      // Animate in when screen is focused
      translateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      });
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  // Note: Local images with require() are already bundled and load instantly

  const handleSignIn = () => {
    console.log('Sign in button pressed');
    router.replace('/(tabs)');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSignUp = () => {
    console.log('Sign Up pressed');
  };

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('@/assets/images/icon.png')} 
            style={styles.logo}
            contentFit="contain"
            cachePolicy="memory-disk"
            priority="high"
            transition={200}
          />
          <Text style={styles.welcome}>MYDE Buddy</Text>
          <Text style={styles.sub}>Sign in to continue</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={20} color="#046A38" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#046A38" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword((prev) => !prev)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#046A38" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe((prev) => !prev)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: rememberMe }}>
              <MaterialIcons
                name={rememberMe ? 'check-box' : 'check-box-outline-blank'}
                size={22}
                color="#046A38"
              />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} activeOpacity={0.8}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
            <View style={styles.googleButtonContent}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/signup')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logo: {
    height: 180,
    width: 185,
    marginBottom: 5,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#024D27',
    marginBottom: 8,
  },
  sub: {
    color: '#666',
    fontWeight: '500',
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#024D27',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  passwordInput: {
    paddingRight: 40,
  },
  inputIcon: {
    marginRight: 12,
  },
  eyeIcon: {
    padding: 4,
    position: 'absolute',
    right: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  forgotPassword: {
    color: '#046A38',
    fontWeight: '600',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#046A38',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#046A38',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 30,
  },
  googleButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#666',
    fontSize: 15,
  },
  signUpLink: {
    color: '#046A38',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
