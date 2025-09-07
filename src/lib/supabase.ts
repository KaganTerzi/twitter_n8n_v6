import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface SocialPost {
  id: string;
  platform: string;
  post_id: string;
  author_username: string;
  author_name: string;
  content: string;
  sentiment_score: number;
  viral_score: number;
  category: string;
  likes_count: number;
  shares_count: number;
  comments_count: number;
  reach: number;
  engagement_rate: number;
  hashtags: string[];
  mentions: string[];
  location?: string;
  posted_at: string;
  created_at: string;
  updated_at: string;
}

export interface TrendingTopic {
  id: string;
  topic: string;
  category: string;
  mention_count: number;
  sentiment_score: number;
  viral_potential: number;
  growth_rate: number;
  peak_time: string;
  created_at: string;
  updated_at: string;
}

export interface SentimentAnalytics {
  id: string;
  date: string;
  category: string;
  location: string;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  average_sentiment: number;
  created_at: string;
}

export interface UserAnalytics {
  id: string;
  user_id: string;
  total_posts_analyzed: number;
  favorite_categories: string[];
  last_active: string;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}