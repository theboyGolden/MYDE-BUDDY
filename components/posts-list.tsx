import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PostItem } from '@/components/post-item';

interface Post {
  id: string;
  userName: string;
  timestamp: string;
  content: string;
  imageUri?: string | number;
  likes: number;
  comments: number;
  shares: number;
  avatarUri?: string;
}

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <View style={styles.container}>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          userName={post.userName}
          timestamp={post.timestamp}
          content={post.content}
          imageUri={post.imageUri}
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
          avatarUri={post.avatarUri}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
});

