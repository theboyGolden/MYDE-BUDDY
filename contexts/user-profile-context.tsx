import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  email: string;
  dob: string;
  gender: string;
  location: string;
  bio: string;
  avatar: string;
  skills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  yearsOfExperience: string;
  preferredCategories?: string[];
}

const DEFAULT_PROFILE: UserProfile = {
  firstName: 'Dee',
  lastName: '',
  jobTitle: 'User',
  company: 'Lunar Studio',
  email: '',
  dob: '',
  gender: 'Male',
  location: 'Accra, Ghana',
  bio: '',
  avatar: 'default', // Special marker to use local profile.png
  skills: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'UI Design', 'Figma'],
  experienceLevel: 'mid',
  yearsOfExperience: '3',
  preferredCategories: ['technology', 'design'],
};

const STORAGE_KEY = '@user_profile';

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetProfile: () => Promise<void>;
  isLoading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from storage on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updated = { ...profile, ...updates };
      setProfile(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };

  const resetProfile = async () => {
    try {
      setProfile(DEFAULT_PROFILE);
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error resetting profile:', error);
      throw error;
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        isLoading,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}

