import { useState, useEffect } from 'react';
import { supabase, SocialPost, TrendingTopic, SentimentAnalytics } from '../lib/supabase';

export const useSocialData = () => {
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSocialPosts = async (category?: string, limit = 50) => {
    try {
      let query = supabase
        .from('social_posts')
        .select('*')
        .order('posted_at', { ascending: false })
        .limit(limit);

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching social posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch social posts');
      return [];
    }
  };

  const fetchTrendingTopics = async (limit = 20) => {
    try {
      const { data, error } = await supabase
        .from('trending_topics')
        .select('*')
        .order('viral_potential', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching trending topics:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch trending topics');
      return [];
    }
  };

  const fetchSentimentAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('sentiment_analytics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching sentiment analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sentiment analytics');
      return [];
    }
  };

  const getCategoryStats = async (category: string) => {
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .select('sentiment_score, viral_score, likes_count, shares_count, comments_count')
        .eq('category', category);

      if (error) throw error;

      const posts = data || [];
      const totalPosts = posts.length;
      const avgSentiment = posts.reduce((sum, post) => sum + post.sentiment_score, 0) / totalPosts;
      const avgViralScore = posts.reduce((sum, post) => sum + post.viral_score, 0) / totalPosts;
      const totalEngagement = posts.reduce((sum, post) => 
        sum + post.likes_count + post.shares_count + post.comments_count, 0);

      return {
        totalPosts,
        avgSentiment,
        avgViralScore,
        totalEngagement,
        posts: posts.slice(0, 10) // Return top 10 posts for preview
      };
    } catch (err) {
      console.error('Error fetching category stats:', err);
      return null;
    }
  };

  const getGlobalSentimentData = async () => {
    try {
      const { data, error } = await supabase
        .from('sentiment_analytics')
        .select('location, average_sentiment, positive_count, neutral_count, negative_count')
        .eq('date', new Date().toISOString().split('T')[0]);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching global sentiment:', err);
      return [];
    }
  };

  const refreshData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [posts, topics, sentiment] = await Promise.all([
        fetchSocialPosts(),
        fetchTrendingTopics(),
        fetchSentimentAnalytics()
      ]);

      setSocialPosts(posts);
      setTrendingTopics(topics);
      setSentimentData(sentiment);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Set up real-time subscriptions
    const postsSubscription = supabase
      .channel('social_posts_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'social_posts' },
        () => refreshData()
      )
      .subscribe();

    const topicsSubscription = supabase
      .channel('trending_topics_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'trending_topics' },
        () => refreshData()
      )
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
      topicsSubscription.unsubscribe();
    };
  }, []);

  return {
    socialPosts,
    trendingTopics,
    sentimentData,
    loading,
    error,
    refreshData,
    fetchSocialPosts,
    getCategoryStats,
    getGlobalSentimentData
  };
};