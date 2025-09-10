// Social Media API Configuration
export const SOCIAL_API_KEY = '3463|05r0fxnayArdIkDfx84iVakHVF2Kzfovj1fgfZPmc4e5d9b5';
export const SOCIAL_API_BASE_URL = 'https://api.socialapi.me/v1';

// Social API Client
class SocialAPIClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = SOCIAL_API_KEY;
    this.baseUrl = SOCIAL_API_BASE_URL;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Social API Error:', error);
      
      // Return mock data for development
      return this.getMockData(endpoint);
    }
  }

  private getMockData(endpoint: string) {
    console.log('🔧 Using mock data for endpoint:', endpoint);
    
    if (endpoint.includes('/posts')) {
      return {
        data: [
          {
            id: '1',
            platform: 'twitter',
            content: 'AI is revolutionizing social media analytics! 🚀 #AI #SocialMedia',
            author: '@tech_influencer',
            likes: 1250,
            shares: 340,
            comments: 89,
            sentiment: 0.85,
            viral_score: 0.78,
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            platform: 'twitter',
            content: 'The future of marketing is data-driven insights 📊 #Marketing #Data',
            author: '@marketing_guru',
            likes: 890,
            shares: 210,
            comments: 56,
            sentiment: 0.72,
            viral_score: 0.65,
            created_at: new Date().toISOString(),
          }
        ]
      };
    }

    if (endpoint.includes('/trends')) {
      return {
        data: [
          { topic: 'AI Technology', mentions: 15420, sentiment: 0.78, growth: 23.5 },
          { topic: 'Social Media', mentions: 12890, sentiment: 0.65, growth: 18.2 },
          { topic: 'Digital Marketing', mentions: 9870, sentiment: 0.71, growth: 15.7 },
        ]
      };
    }

    return { data: [] };
  }

  // Get trending posts
  async getTrendingPosts(params: {
    platform?: string;
    category?: string;
    limit?: number;
  } = {}) {
    const queryParams = new URLSearchParams();
    if (params.platform) queryParams.append('platform', params.platform);
    if (params.category) queryParams.append('category', params.category);
    if (params.limit) queryParams.append('limit', params.limit.toString());

    return this.makeRequest(`/posts/trending?${queryParams}`);
  }

  // Get sentiment analysis
  async getSentimentAnalysis(params: {
    timeRange?: string;
    category?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    if (params.timeRange) queryParams.append('timeRange', params.timeRange);
    if (params.category) queryParams.append('category', params.category);

    return this.makeRequest(`/sentiment/analysis?${queryParams}`);
  }

  // Get trending topics
  async getTrendingTopics(params: {
    limit?: number;
    category?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.category) queryParams.append('category', params.category);

    return this.makeRequest(`/trends/topics?${queryParams}`);
  }

  // Get user analytics
  async getUserAnalytics(username: string) {
    return this.makeRequest(`/users/${username}/analytics`);
  }

  // Get viral predictions
  async getViralPredictions(params: {
    platform?: string;
    timeframe?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    if (params.platform) queryParams.append('platform', params.platform);
    if (params.timeframe) queryParams.append('timeframe', params.timeframe);

    return this.makeRequest(`/predictions/viral?${queryParams}`);
  }
}

// Export singleton instance
export const socialAPI = new SocialAPIClient();

// Export types
export interface SocialPost {
  id: string;
  platform: string;
  content: string;
  author: string;
  likes: number;
  shares: number;
  comments: number;
  sentiment: number;
  viral_score: number;
  created_at: string;
}

export interface TrendingTopic {
  topic: string;
  mentions: number;
  sentiment: number;
  growth: number;
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  overall: number;
}

