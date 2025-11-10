import { ScrollView, StyleSheet, View } from 'react-native';

import { CreatePost } from '@/components/create-post';
import { Header } from '@/components/header';
import { PostsList } from '@/components/posts-list';
import { WelcomeCard } from '@/components/welcome-card';

// Sample posts data
const samplePosts = [
  {
    id: '1',
    userName: 'John Doe',
    timestamp: '30d ago',
    content: '',
    imageUri: require('@/assets/images/NSA_logo.webp'),
    likes: 0,
    comments: 0,
    shares: 0,
  },
  {
    id: '2',
    userName: 'Tengey Edem Deborah',
    timestamp: '51d ago',
    content:
      "News reports indicate the NSS has created additional volunteer opportunities to help address youth unemployment in Ghana, with roles in sanitation, health, and agriculture.",
    likes: 1,
    comments: 0,
    shares: 0,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header title="Home" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <WelcomeCard userName="Dee" profileCompletion={72} />
        <CreatePost />
        <PostsList posts={samplePosts} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
