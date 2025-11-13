import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PostItem } from '@/components/post-item';

interface Post {
  id: string;
  userName: string;
  timestamp?: string;
  title?: string;
  company?: string;
  content: string;
  imageUri?: string | number;
  likes: number;
  comments: number;
  shares: number;
  avatarUri?: string;
  isVerified?: boolean;
  isPromoted?: boolean;
  promotedBy?: string;
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
          id={post.id}
          userName={post.userName}
          timestamp={post.timestamp}
          title={post.title}
          company={post.company}
          content={post.content}
          imageUri={post.imageUri}
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
          avatarUri={post.avatarUri}
          isVerified={post.isVerified}
          isPromoted={post.isPromoted}
          promotedBy={post.promotedBy}
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

