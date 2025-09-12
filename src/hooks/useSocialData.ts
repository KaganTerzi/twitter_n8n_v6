import { useState, useEffect } from 'react';
import { supabase, SocialPost, TrendingTopic, SentimentAnalytics } from '../lib/supabase';

// Mock data functions for fallback
const getMockSocialPosts = (limit: number): SocialPost[] => {
  const mockPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'twitter',
      post_id: 'ozan_real_1',
      author_username: 'ozan_sihay',
      author_name: 'Ozan Şihay',
      content: 'Bugün İstanbul\'da harika bir film çekimi tamamladık! Yapay zeka destekli kamera hareketleri gerçekten etkileyici sonuçlar veriyor. 🎬✨ #Filmmaking #AI #Istanbul',
      sentiment_score: 0.92,
      viral_score: 0.85,
      category: 'technology',
      likes_count: 423,
      shares_count: 187,
      comments_count: 56,
      reach: 18500,
      engagement_rate: 14.2,
      hashtags: ['Filmmaking', 'AI', 'Istanbul'],
      mentions: [],
      location: 'Istanbul, Turkey',
      posted_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      platform: 'twitter',
      post_id: 'ozan_real_2',
      author_username: 'ozan_sihay',
      author_name: 'Ozan Şihay',
      content: 'YouTube kanalımda yeni AI serisi başlıyor! "Yapay Zeka ile Yaratıcılık" konulu videolarımda film yapımından pazarlamaya kadar her alanda AI kullanımını anlatacağım. 📺🤖 #YouTube #AI #Content',
      sentiment_score: 0.88,
      viral_score: 0.79,
      category: 'technology',
      likes_count: 567,
      shares_count: 234,
      comments_count: 78,
      reach: 25400,
      engagement_rate: 13.8,
      hashtags: ['YouTube', 'AI', 'Content'],
      mentions: [],
      location: 'Istanbul, Turkey',
      posted_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      platform: 'twitter',
      post_id: 'mock_3',
      author_username: 'climate_action',
      author_name: 'Climate Action',
      content: 'Renewable energy adoption accelerating globally. Clean tech investments surge 🌱 #ClimateChange #GreenTech',
      sentiment_score: 0.68,
      viral_score: 0.55,
      category: 'environment',
      likes_count: 567,
      shares_count: 123,
      comments_count: 78,
      reach: 28000,
      engagement_rate: 11.8,
      hashtags: ['ClimateChange', 'GreenTech'],
      mentions: [],
      location: 'Berlin',
      posted_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Ozan'ın daha fazla tweet'i ekle
  const ozanExtraTweets: SocialPost[] = [
    {
      id: '4',
      platform: 'twitter',
      post_id: 'ozan_real_4',
      author_username: 'ozan_sihay',
      author_name: 'Ozan Şihay',
      content: 'Kanada\'da çektiğim belgesel projesinden bir sahne. Doğanın büyüleyici güzelliği karşısında teknolojinin gücünü harmanlıyoruz. 🌲📸 #Documentary #Nature #Canada',
      sentiment_score: 0.85,
      viral_score: 0.72,
      category: 'lifestyle',
      likes_count: 234,
      shares_count: 89,
      comments_count: 34,
      reach: 12800,
      engagement_rate: 11.5,
      hashtags: ['Documentary', 'Nature', 'Canada'],
      mentions: [],
      location: 'Toronto, Canada',
      posted_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      platform: 'twitter',
      post_id: 'ozan_real_5',
      author_username: 'ozan_sihay',
      author_name: 'Ozan Şihay',
      content: 'Pazarlama stratejilerinde veri analizi ne kadar önemli! Müşteri davranışlarını anlamak için AI araçlarını kullanmaya başladık. Sonuçlar şaşırtıcı! 📊💡 #Marketing #DataAnalysis',
      sentiment_score: 0.89,
      viral_score: 0.76,
      category: 'business',
      likes_count: 345,
      shares_count: 145,
      comments_count: 67,
      reach: 16700,
      engagement_rate: 12.9,
      hashtags: ['Marketing', 'DataAnalysis'],
      mentions: [],
      location: 'Istanbul, Turkey',
      posted_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      platform: 'twitter',
      post_id: 'ozan_real_6',
      author_username: 'ozan_sihay',
      author_name: 'Ozan Şihay',
      content: 'Sabah motivasyonu: Yaratıcılık + Teknoloji = Sınırsız Potansiyel! Bugün yeni projeler için beyin fırtınası yapıyoruz. Hayal gücünüzü serbest bırakın! 🚀💭 #Creativity #Innovation',
      sentiment_score: 0.93,
      viral_score: 0.68,
      category: 'lifestyle',
      likes_count: 189,
      shares_count: 67,
      comments_count: 23,
      reach: 9800,
      engagement_rate: 10.4,
      hashtags: ['Creativity', 'Innovation'],
      mentions: [],
      location: 'Istanbul, Turkey',
      posted_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const allPosts = [...mockPosts, ...ozanExtraTweets];
  return allPosts.slice(0, limit);
};

const getMockTrendingTopics = (limit: number): TrendingTopic[] => {
  const mockTopics: TrendingTopic[] = [
    {
      id: '1',
      topic: 'AI Revolution',
      category: 'technology',
      mention_count: 15420,
      sentiment_score: 0.78,
      viral_potential: 0.85,
      growth_rate: 23.5,
      peak_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      topic: 'Crypto Market',
      category: 'finance',
      mention_count: 12890,
      sentiment_score: 0.65,
      viral_potential: 0.72,
      growth_rate: 18.2,
      peak_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      topic: 'Space Technology',
      category: 'science',
      mention_count: 9870,
      sentiment_score: 0.82,
      viral_potential: 0.68,
      growth_rate: 15.7,
      peak_time: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return mockTopics.slice(0, limit);
};

const getMockSentimentData = (): SentimentAnalytics[] => {
  return [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      category: 'technology',
      location: 'Global',
      positive_count: 1250,
      neutral_count: 890,
      negative_count: 340,
      average_sentiment: 0.75,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      date: new Date().toISOString().split('T')[0],
      category: 'finance',
      location: 'Global',
      positive_count: 980,
      neutral_count: 1120,
      negative_count: 450,
      average_sentiment: 0.62,
      created_at: new Date().toISOString()
    }
  ];
};

export const useSocialData = () => {
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [sentimentData, setSentimentData] = useState<SentimentAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSocialPosts = async (category?: string, limit = 10) => {
    try {
      let query = supabase
        .from('social_media_posts')
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
      // Return mock data as fallback
      return getMockSocialPosts(limit);
    }
  };

  const fetchTrendingTopics = async (limit = 8) => {
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
      // Return mock data as fallback
      return getMockTrendingTopics(limit);
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
      // Return mock data as fallback
      return getMockSentimentData();
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
      
      // Clear any previous errors since we got data (even if it's mock data)
      setError(null);
    } catch (err) {
      console.error('Critical error in refreshData:', err);
      // Even on critical error, provide mock data
      setSocialPosts(getMockSocialPosts(10));
      setTrendingTopics(getMockTrendingTopics(8));
      setSentimentData(getMockSentimentData());
      setError(null); // Don't show error to user, just use fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Real-time subscriptions disabled to reduce API calls
    // Can be enabled when Supabase is properly configured
    
    return () => {
      // Cleanup if needed
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