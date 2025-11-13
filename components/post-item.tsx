import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFollowing } from '@/contexts/following-context';
import { useThemeColor } from '@/hooks/use-theme-color';

interface PostItemProps {
  id?: string;
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

export function PostItem({
  id,
  userName,
  timestamp,
  title,
  company,
  content,
  imageUri,
  likes: initialLikes,
  comments: initialComments,
  shares: initialShares,
  avatarUri,
  isVerified = false,
  isPromoted = false,
  promotedBy,
}: PostItemProps) {
  const { addFollowing, removeFollowing, isFollowing } = useFollowing();
  const userId = id || userName; // Use id if provided, otherwise use userName as fallback
  const following = isFollowing(userId);
  
  // State for counts
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [shares, setShares] = useState(initialShares);
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  
  // Animation values
  const likeScale = useRef(new Animated.Value(1)).current;
  const commentScale = useRef(new Animated.Value(1)).current;
  const repostScale = useRef(new Animated.Value(1)).current;
  const sendScale = useRef(new Animated.Value(1)).current;
  
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor(
    { light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(255, 255, 255, 0.08)' },
    'background'
  );
  const textSecondary = useThemeColor(
    { light: '#666666', dark: '#999999' },
    'text'
  );
  const linkColor = useThemeColor(
    { light: '#0077B5', dark: '#4A9EFF' },
    'tint'
  );
  
  // Animation function
  const animateButton = (animValue: Animated.Value, callback?: () => void) => {
    Animated.sequence([
      Animated.spring(animValue, {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 300,
        friction: 4,
      }),
      Animated.spring(animValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 4,
      }),
    ]).start();
    
    if (callback) {
      setTimeout(callback, 100);
    }
  };
  
  const handleLike = () => {
    animateButton(likeScale, () => {
      if (isLiked) {
        setLikes((prev) => Math.max(0, prev - 1));
        setIsLiked(false);
      } else {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      }
    });
  };
  
  const handleComment = () => {
    animateButton(commentScale, () => {
      setComments((prev) => prev + 1);
    });
  };
  
  const handleRepost = () => {
    animateButton(repostScale, () => {
      if (isReposted) {
        setShares((prev) => Math.max(0, prev - 1));
        setIsReposted(false);
      } else {
        setShares((prev) => prev + 1);
        setIsReposted(true);
      }
    });
  };
  
  const handleSend = () => {
    animateButton(sendScale);
  };

  const handleFollowToggle = () => {
    if (following) {
      removeFollowing(userId);
    } else {
      addFollowing({
        id: userId,
        userName,
        title,
        company,
        avatarUri,
        timestamp: timestamp || 'Just now',
        postId: id,
        postContent: content,
        postImageUri: imageUri,
        followedAt: new Date(),
      });
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor, borderColor }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                avatarUri
                  ? typeof avatarUri === 'string'
                    ? { uri: avatarUri }
                    : avatarUri
                  : {
                      uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userName
                      )}&size=48&background=random`,
                    }
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <ThemedText type="defaultSemiBold" style={styles.userName}>
                {userName}
              </ThemedText>
              {isVerified && (
                <MaterialIcons name="verified" size={16} color={linkColor} style={styles.verifiedIcon} />
              )}
              {timestamp && (
                <>
                  <ThemedText style={styles.separator}> • </ThemedText>
                  <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
                </>
              )}
            </View>
            {title && (
              <ThemedText style={[styles.title, { color: textSecondary }]} numberOfLines={1}>
                {title}
                {company && ` at ${company}`}
              </ThemedText>
            )}
            {isPromoted && promotedBy && (
              <ThemedText style={[styles.promoted, { color: textSecondary }]}>
                Promoted by {promotedBy}
              </ThemedText>
            )}
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[
              styles.followButton,
              { borderColor: following ? textSecondary : linkColor },
            ]}
            onPress={handleFollowToggle}
            activeOpacity={0.7}>
            <ThemedText
              style={[
                styles.followText,
                { color: following ? textSecondary : linkColor },
              ]}>
              {following ? 'Following' : '+ Follow'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      {content && (
        <View style={styles.contentSection}>
          <ThemedText
            style={styles.contentText}
            numberOfLines={isTextExpanded ? undefined : 3}>
            {content}
          </ThemedText>
          {content.length > 100 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsTextExpanded(!isTextExpanded)}>
              <ThemedText style={[styles.moreText, { color: linkColor }]}>
                {isTextExpanded ? '...less' : '...more'}
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Image Section */}
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image
            source={typeof imageUri === 'number' ? imageUri : { uri: imageUri }}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Engagement Stats */}
      <View style={styles.engagementBar}>
        <View style={styles.reactionIcons}>
          <MaterialIcons name="lightbulb-outline" size={16} color="#FFA500" />
          <MaterialIcons name="thumb-up" size={16} color={linkColor} style={styles.secondReaction} />
        </View>
        <ThemedText style={[styles.engagementText, { color: textSecondary }]}>
          {likes}
        </ThemedText>
        {(comments > 0 || shares > 0) && (
          <>
            <ThemedText style={[styles.engagementSeparator, { color: textSecondary }]}> • </ThemedText>
            <ThemedText style={[styles.engagementText, { color: textSecondary }]}>
              {comments} comment{comments !== 1 ? 's' : ''}
              {shares > 0 && ` • ${shares} repost${shares !== 1 ? 's' : ''}`}
            </ThemedText>
          </>
        )}
      </View>

      {/* Action Buttons */}
      <View style={[styles.actionBar, { borderTopColor: borderColor }]}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={handleLike}>
          <Animated.View style={{ transform: [{ scale: likeScale }] }}>
            <FontAwesome5
              name="thumbs-up"
              size={20}
              color={isLiked ? linkColor : iconColor}
              solid={isLiked}
            />
          </Animated.View>
          <ThemedText
            style={[
              styles.actionText,
              { color: isLiked ? linkColor : textSecondary },
            ]}
            numberOfLines={1}>
            Like
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={handleComment}>
          <Animated.View style={{ transform: [{ scale: commentScale }] }}>
            <FontAwesome5 name="comment" size={20} color={iconColor} />
          </Animated.View>
          <ThemedText style={[styles.actionText, { color: textSecondary }]} numberOfLines={1}>
            Comment
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={handleRepost}>
          <Animated.View style={{ transform: [{ scale: repostScale }] }}>
            <MaterialIcons
              name="repeat"
              size={20}
              color={isReposted ? linkColor : iconColor}
            />
          </Animated.View>
          <ThemedText
            style={[
              styles.actionText,
              { color: isReposted ? linkColor : textSecondary },
            ]}
            numberOfLines={1}>
            Repost
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={handleSend}>
          <Animated.View style={{ transform: [{ scale: sendScale }] }}>
            <FontAwesome5 name="paper-plane" size={20} color={iconColor} />
          </Animated.View>
          <ThemedText style={[styles.actionText, { color: textSecondary }]} numberOfLines={1}>
            Send
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  separator: {
    fontSize: 14,
    opacity: 0.6,
  },
  timestamp: {
    fontSize: 14,
    opacity: 0.6,
  },
  title: {
    fontSize: 13,
    marginTop: 1,
  },
  promoted: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  followButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  followText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contentSection: {
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  moreText: {
    fontSize: 14,
    marginTop: 4,
  },
  imageContainer: {
    width: '100%',
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  engagementBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  reactionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  secondReaction: {
    marginLeft: -8,
  },
  engagementText: {
    fontSize: 13,
  },
  engagementSeparator: {
    fontSize: 13,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
