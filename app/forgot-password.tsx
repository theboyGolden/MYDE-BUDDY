import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleContinue = () => {
    if (email.trim()) {
      console.log('Password reset requested for:', email);
      setEmailSent(true);
    }
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/login');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleGoBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color="#024D27" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.welcome}>Forgot Password?</Text>
          <Text style={styles.sub}>
            {emailSent
              ? 'Check your email for recovery instructions'
              : 'Enter your email to receive a password reset link'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {!emailSent ? (
            <>
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
                    editable={!emailSent}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.continueButton, !email.trim() && styles.continueButtonDisabled]}
                onPress={handleContinue}
                disabled={!email.trim()}
                activeOpacity={0.8}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.successContainer}>
                <View style={styles.successIconContainer}>
                  <Ionicons name="mail" size={48} color="#046A38" />
                </View>
                <Text style={styles.successTitle}>Recovery Link Sent!</Text>
                <Text style={styles.successMessage}>
                  {"We've sent a password recovery link to\n"}
                  <Text style={styles.emailText}>{email}</Text>
                </Text>
                <Text style={styles.successSubtext}>
                  Please check your inbox and follow the instructions to reset your password.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.backToLoginButton}
                onPress={() => router.replace('/login')}
                activeOpacity={0.8}>
                <Text style={styles.backToLoginButtonText}>Back to Sign In</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    paddingTop: 30,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    height: 80,
    width: 83,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#024D27',
    marginBottom: 8,
    textAlign: 'center',
  },
  sub: {
    color: '#666',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 30,
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
  inputIcon: {
    marginRight: 12,
  },
  continueButton: {
    backgroundColor: '#046A38',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#046A38',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#d1fae5',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#024D27',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  emailText: {
    fontWeight: '700',
    color: '#024D27',
  },
  successSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  backToLoginButton: {
    backgroundColor: '#046A38',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#046A38',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  backToLoginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
