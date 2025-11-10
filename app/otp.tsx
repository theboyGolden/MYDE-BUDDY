import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OTPInput } from '@/components/otp-input';

export default function OTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string | string[] }>();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const emailParam = params.email;
  const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;
  const emailToDisplay = email || 'example@gmail.com';

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0 && isResending) {
      setIsResending(false);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [countdown, isResending]);

  const handleCodeFilled = (code: string) => {
    console.log('OTP entered:', code);
  };

  const handleCodeChange = (code: string) => {
    setOtp(code);
  };

  const handleContinue = () => {
    if (otp.length === 4) {
      console.log('Verifying OTP:', otp);
      router.replace('/(tabs)');
    }
  };

  const handleResendCode = () => {
    if (countdown > 0 || isResending) return;

    console.log('Resending OTP...');
    setIsResending(true);
    setCountdown(30);
    setOtp('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/login');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.area}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#024D27" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.welcome}>Enter OTP</Text>
          <Text style={styles.sub}>
            We've sent a 4-digit code to your email{' '}
            <Text style={styles.boldEmail}>{emailToDisplay}</Text>
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <OTPInput length={4} onCodeFilled={handleCodeFilled} onCodeChange={handleCodeChange} />
        </View>

        <TouchableOpacity
          style={[styles.continueButton, otp.length !== 4 && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={otp.length !== 4}
          activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive code?</Text>
          {countdown > 0 ? (
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>Resend in {formatTime(countdown)}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={handleResendCode} activeOpacity={0.7}>
              <Text style={styles.resendLink}> Resend code</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  area: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
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
    paddingHorizontal: 12,
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
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  boldEmail: {
    fontWeight: 'bold',
    color: '#024D27',
  },
  otpContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  resendText: {
    color: '#666',
    fontSize: 16,
  },
  resendLink: {
    color: '#046A38',
    fontSize: 16,
    fontWeight: '600',
  },
  countdownContainer: {
    marginLeft: 5,
  },
  countdownText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
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
});
