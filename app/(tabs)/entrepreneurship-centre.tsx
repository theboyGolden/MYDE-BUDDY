import React from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { EntrepreneurshipCard } from '@/components/entrepreneurship-card';
import FloatingAIButton from '@/components/floating-ai-button';
import { Header } from '@/components/header';

interface EntrepreneurshipOpportunity {
  id: string;
  title: string;
  description: string;
  category?: string;
  views?: number;
  iconColor: string;
  youtubeUrl: string;
}

const sampleOpportunities: EntrepreneurshipOpportunity[] = [
  {
    id: '1',
    title: 'How to Start a Business: Step-by-Step Guide for Entrepreneurs',
    description:
      'Learn the fundamentals of starting your own business from scratch. This comprehensive guide covers business planning, legal requirements, funding options, and marketing strategies. Perfect for first-time entrepreneurs.',
    category: 'Business Planning',
    views: 1250000,
    iconColor: '#ef4444', // Red
    youtubeUrl: 'https://www.youtube.com/watch?v=U6B6m3rBx9E',
  },
  {
    id: '2',
    title: 'How to Write a Business Plan - Entrepreneurship 101',
    description:
      'Master the art of writing a compelling business plan that attracts investors and guides your startup journey. Learn about executive summaries, market analysis, financial projections, and more.',
    category: 'Business Planning',
    views: 890000,
    iconColor: '#8b5cf6', // Purple
    youtubeUrl: 'https://www.youtube.com/watch?v=Y8OPJXQ8pQk',
  },
  {
    id: '3',
    title: 'Digital Marketing for Small Business: Complete Guide',
    description:
      'Discover proven digital marketing strategies to grow your business online. Learn about SEO, social media marketing, email campaigns, content marketing, and paid advertising on a budget.',
    category: 'Marketing',
    views: 2100000,
    iconColor: '#ec4899', // Magenta
    youtubeUrl: 'https://www.youtube.com/watch?v=ZfCm5V1pB9I',
  },
  {
    id: '4',
    title: 'How to Get Funding for Your Startup: Investor Pitch Tips',
    description:
      'Learn how to pitch your startup to investors and secure funding. This video covers pitch deck creation, valuation basics, different funding sources, and what investors look for in startups.',
    category: 'Funding',
    views: 1650000,
    iconColor: '#10b981', // Green
    youtubeUrl: 'https://www.youtube.com/watch?v=4o37h4hqJ8Y',
  },
  {
    id: '5',
    title: 'E-commerce Business: How to Start Selling Online',
    description:
      'Step-by-step guide to launching your e-commerce business. Learn about choosing products, setting up online stores, payment processing, shipping, and customer service best practices.',
    category: 'E-commerce',
    views: 980000,
    iconColor: '#f59e0b', // Amber
    youtubeUrl: 'https://www.youtube.com/watch?v=GXl7Fq_a4pg',
  },
  {
    id: '6',
    title: 'Social Media Marketing for Entrepreneurs',
    description:
      'Master social media marketing to build your brand and grow your audience. Learn platform-specific strategies for Instagram, Facebook, LinkedIn, Twitter, and TikTok to engage customers and drive sales.',
    category: 'Marketing',
    views: 3200000,
    iconColor: '#06b6d4', // Cyan
    youtubeUrl: 'https://www.youtube.com/watch?v=9mPwQTi1jUE',
  },
  {
    id: '7',
    title: 'Financial Management for Small Business Owners',
    description:
      'Essential financial management skills every entrepreneur needs. Learn about cash flow management, budgeting, bookkeeping basics, tax planning, and financial forecasting for business success.',
    category: 'Finance',
    views: 750000,
    iconColor: '#f97316', // Orange
    youtubeUrl: 'https://www.youtube.com/watch?v=5VWhpGGX7Po',
  },
  {
    id: '8',
    title: 'Building a Brand: Branding Strategy for Startups',
    description:
      'Learn how to create a strong brand identity that resonates with your target audience. Discover branding fundamentals, logo design, brand voice, storytelling, and building brand loyalty.',
    category: 'Branding',
    views: 1420000,
    iconColor: '#6366f1', // Indigo
    youtubeUrl: 'https://www.youtube.com/watch?v=jkvc8qjXhQk',
  },
  {
    id: '9',
    title: 'Customer Acquisition: How to Get Your First 100 Customers',
    description:
      'Proven strategies to acquire your first customers and build a sustainable customer base. Learn about customer discovery, acquisition channels, referral programs, and retention tactics.',
    category: 'Sales',
    views: 680000,
    iconColor: '#14b8a6', // Teal
    youtubeUrl: 'https://www.youtube.com/watch?v=Yy6kYV8wqXc',
  },
  {
    id: '10',
    title: 'Time Management for Entrepreneurs: Productivity Tips',
    description:
      'Master time management to maximize productivity and achieve work-life balance as an entrepreneur. Learn prioritization techniques, delegation strategies, and tools to manage your time effectively.',
    category: 'Productivity',
    views: 1850000,
    iconColor: '#a855f7', // Purple
    youtubeUrl: 'https://www.youtube.com/watch?v=iONDebHX9qk',
  },
];

export default function EntrepreneurshipCentreScreen() {

  const handleView = async (opportunityId: string) => {
    const opportunity = sampleOpportunities.find((o) => o.id === opportunityId);
    if (opportunity?.youtubeUrl) {
      try {
        const canOpen = await Linking.canOpenURL(opportunity.youtubeUrl);
        if (canOpen) {
          await Linking.openURL(opportunity.youtubeUrl);
        }
      } catch (error) {
        console.error('Error opening YouTube URL:', error);
      }
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing opportunities...');
    // Handle refresh logic
  };

  return (
    <View style={styles.container}>
      <Header title="Entrepreneurship Centre" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.opportunitiesContainer}>
          {sampleOpportunities.map((opportunity) => (
            <EntrepreneurshipCard
              key={opportunity.id}
              title={opportunity.title}
              description={opportunity.description}
              category={opportunity.category}
              views={opportunity.views}
              iconColor={opportunity.iconColor}
              onView={() => handleView(opportunity.id)}
            />
          ))}
        </View>
      </ScrollView>
      
      <FloatingAIButton context="entrepreneurship" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  refreshText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  opportunitiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chatPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  placeholderText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
