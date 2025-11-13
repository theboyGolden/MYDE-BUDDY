import React, { createContext, useContext, useState } from 'react';

export interface FollowingUser {
  id: string;
  userName: string;
  title?: string;
  company?: string;
  avatarUri?: string;
  timestamp?: string;
  postId?: string;
  postContent?: string;
  postImageUri?: string | number;
  followedAt: Date;
}

interface FollowingContextType {
  following: FollowingUser[];
  addFollowing: (user: FollowingUser) => void;
  removeFollowing: (id: string) => void;
  isFollowing: (userId: string) => boolean;
  clearFollowing: () => void;
}

const FollowingContext = createContext<FollowingContextType | undefined>(undefined);

export function FollowingProvider({ children }: { children: React.ReactNode }) {
  const [following, setFollowing] = useState<FollowingUser[]>([]);

  const addFollowing = (user: FollowingUser) => {
    setFollowing((prev) => {
      // Check if already following
      if (prev.some((u) => u.id === user.id)) {
        return prev;
      }
      return [...prev, user];
    });
  };

  const removeFollowing = (id: string) => {
    setFollowing((prev) => prev.filter((user) => user.id !== id));
  };

  const isFollowing = (userId: string) => {
    return following.some((user) => user.id === userId);
  };

  const clearFollowing = () => {
    setFollowing([]);
  };

  return (
    <FollowingContext.Provider
      value={{
        following,
        addFollowing,
        removeFollowing,
        isFollowing,
        clearFollowing,
      }}>
      {children}
    </FollowingContext.Provider>
  );
}

export function useFollowing() {
  const context = useContext(FollowingContext);
  if (context === undefined) {
    throw new Error('useFollowing must be used within a FollowingProvider');
  }
  return context;
}
