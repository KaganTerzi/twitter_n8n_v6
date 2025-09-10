// N8N Webhook API functions

// Webhook URL
const WEBHOOK_URL = 'https://n8nautomationbolt.app.n8n.cloud/webhook/twitter-collect';

// User interface for Twitter data
export interface TwitterUser {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  isActive: boolean;
  followerCount: number;
  followingCount: number;
  tweetCount: number;
  verified: boolean;
  bio: string;
  location?: string;
  website?: string;
  joinDate: string;
  lastActive: string;
}

export interface Tweet {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  profileImage: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views?: number;
  isRetweet: boolean;
  originalTweet?: Tweet;
  hashtags: string[];
  mentions: string[];
  media?: {
    type: 'image' | 'video' | 'gif';
    url: string;
    thumbnail?: string;
  }[];
}

// Trigger N8N webhook to collect data
export const triggerN8NWebhook = async () => {
  try {
    console.log('🔄 Triggering N8N webhook:', WEBHOOK_URL);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'frontend',
        action: 'collect_data'
      })
    });

    console.log('📡 N8N Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 N8N Response data:', data);
    
    // Process N8N data and convert to our format
    if (data && Array.isArray(data)) {
      const processedUsers = data.map((user: any, index: number) => ({
        id: `${index + 1}`,
        username: user.json?.handle || user.handle || 'unknown',
        displayName: user.json?.handle || user.handle || 'Unknown User',
        profileImage: `https://pbs.twimg.com/profile_images/${Math.random()}/avatar.jpg`,
        isActive: user.json?.active !== undefined ? user.json.active : user.active || false,
        followerCount: Math.floor(Math.random() * 100000) + 1000,
        followingCount: Math.floor(Math.random() * 5000) + 100,
        tweetCount: Math.floor(Math.random() * 10000) + 500,
        verified: Math.random() > 0.3,
        bio: `${user.json?.handle || user.handle || 'User'} - Takip edilen kullanıcı`,
        location: 'Turkey',
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
      
      return { success: true, data: { users: processedUsers } };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error triggering N8N webhook:', error);
    console.log('🔄 Falling back to mock data');
    
    // Return mock data for development
    return {
      success: true,
      data: generateMockWebhookData()
    };
  }
};

// Get users from webhook data
export const getTwitterUsers = async (): Promise<TwitterUser[]> => {
  try {
    // First try to get fresh data from N8N webhook
    const webhookResult = await triggerN8NWebhook();
    
    if (webhookResult.success && webhookResult.data && webhookResult.data.users) {
      console.log('✅ Using fresh N8N data for users');
      return webhookResult.data.users;
    }
    
    // Fallback to mock data
    console.log('🔄 Using mock data for users');
    return generateMockUsers();
  } catch (error) {
    console.error('Error fetching Twitter users:', error);
    return generateMockUsers();
  }
};

// Get tweets for a specific user
export const getUserTweets = async (username: string): Promise<Tweet[]> => {
  try {
    // In a real scenario, this would fetch user-specific tweets
    return generateMockTweets(username);
  } catch (error) {
    console.error('Error fetching user tweets:', error);
    return generateMockTweets(username);
  }
};

// Mock data generators (simulating N8N webhook responses)
const generateMockWebhookData = () => {
  return {
    users: generateMockUsers(),
    timestamp: new Date().toISOString(),
    status: 'success'
  };
};

const generateMockUsers = (): TwitterUser[] => {
  // N8N akışınızdan gelen kullanıcı listesi (N8N kodunuzdan)
  const n8nUsers = [
    { handle: "ozan_sihay", active: true },
    { handle: "glenngabe", active: true }, 
    { handle: "json", active: true },
    { handle: "officialLogank", active: true },
    { handle: "PerplexityComet", active: true },
    { handle: "bkguzel", active: true },
    { handle: "fatihlosdev", active: true },
    { handle: "dr_cintas", active: true },
    { handle: "hprcnes", active: true }
  ];

  const users = n8nUsers.map((n8nUser, index) => ({
    id: `${index + 1}`,
    username: n8nUser.handle,
    displayName: n8nUser.handle === 'ozan_sihay' ? 'Ozan Şihay' : 
                 n8nUser.handle === 'glenngabe' ? 'Glenn Gabe' :
                 n8nUser.handle === 'officialLogank' ? 'Logan K' :
                 n8nUser.handle === 'PerplexityComet' ? 'Perplexity Comet' :
                 n8nUser.handle === 'bkguzel' ? 'BK Güzel' :
                 n8nUser.handle === 'fatihlosdev' ? 'Fatih Los' :
                 n8nUser.handle === 'dr_cintas' ? 'Dr. Cintas' :
                 n8nUser.handle === 'hprcnes' ? 'HPRCNES' :
                 n8nUser.handle.charAt(0).toUpperCase() + n8nUser.handle.slice(1),
    profileImage: `https://pbs.twimg.com/profile_images/123456789${index}/${n8nUser.handle}_400x400.jpg`,
    isActive: n8nUser.active,
    followerCount: Math.floor(Math.random() * 100000) + 1000,
    followingCount: Math.floor(Math.random() * 5000) + 100,
    tweetCount: Math.floor(Math.random() * 10000) + 500,
    verified: Math.random() > 0.3, // %70 verified olma şansı
    bio: `${n8nUser.handle} - Takip edilen kullanıcı`,
    location: 'Turkey',
    website: `https://${n8nUser.handle}.com`,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
  }));

  // Ozan'ı özel olarak güncelle
  const ozanUser = users.find(u => u.username === 'ozan_sihay');
  if (ozanUser) {
    ozanUser.displayName = 'Ozan Şihay';
    ozanUser.bio = 'Tech entrepreneur & AI enthusiast. Building the future of social media analytics.';
    ozanUser.followerCount = 15420;
    ozanUser.followingCount = 892;
    ozanUser.tweetCount = 3456;
    ozanUser.verified = true;
    ozanUser.location = 'Istanbul, Turkey';
    ozanUser.lastActive = new Date(Date.now() - 30 * 60 * 1000).toISOString(); // 30 minutes ago
  }

  return users;
};

const generateMockTweets = (username: string): Tweet[] => {
  const baseTime = Date.now();
  const tweets: Tweet[] = [];

  // Generate 5-10 tweets for the last 24 hours
  const tweetCount = Math.floor(Math.random() * 6) + 5;
  
  for (let i = 0; i < tweetCount; i++) {
    const tweetTime = baseTime - (Math.random() * 24 * 60 * 60 * 1000); // Random time in last 24h
    
    tweets.push({
      id: `${username}_tweet_${i}`,
      userId: username,
      username: username,
      displayName: username === 'ozan_sihay' ? 'Ozan Şihay' : `${username.charAt(0).toUpperCase()}${username.slice(1)}`,
      profileImage: `https://pbs.twimg.com/profile_images/123456789${i}/${username}_400x400.jpg`,
      content: generateTweetContent(username, i),
      timestamp: new Date(tweetTime).toISOString(),
      likes: Math.floor(Math.random() * 1000) + 50,
      retweets: Math.floor(Math.random() * 200) + 10,
      replies: Math.floor(Math.random() * 100) + 5,
      views: Math.floor(Math.random() * 10000) + 500,
      isRetweet: Math.random() > 0.7,
      hashtags: ['#AI', '#Tech', '#Innovation', '#Startup'].slice(0, Math.floor(Math.random() * 3) + 1),
      mentions: []
    });
  }

  return tweets.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const generateTweetContent = (username: string, index: number): string => {
  const contents = {
    ozan_sihay: [
      'AI teknolojilerinin sosyal medya analitiğindeki rolü her geçen gün artıyor. Gelecek çok heyecan verici! 🚀',
      'Yeni projemizde sentiment analizi için transformer modellerini kullanıyoruz. Sonuçlar şaşırtıcı! #AI #MachineLearning',
      'Startup dünyasında en önemli şey doğru problemi çözmek. Teknik detaylar ikinci planda kalmalı.',
      'Social media intelligence platformumuz 1M+ tweet analiz etti. Büyük verilerle çalışmanın keyfi bambaşka! 📊',
      'Türkiye\'de AI alanında neler oluyor? Yerel ekosistem hızla gelişiyor. Gurur verici! 🇹🇷'
    ],
    glenngabe: [
      'SEO and technical marketing insights for 2024. The landscape is changing rapidly! #SEO #DigitalMarketing',
      'Google\'s latest algorithm update is affecting search rankings. Here\'s what you need to know.',
      'Content quality vs quantity - why depth matters more than ever in SEO.',
      'Technical SEO audit checklist for enterprise websites. Thread below 🧵'
    ],
    default: [
      'Exciting developments in the tech world today! 🚀',
      'Working on some innovative solutions. Can\'t wait to share! #Innovation',
      'The intersection of AI and social media is fascinating. #AI #SocialMedia',
      'Building the future, one line of code at a time. #Coding #Tech'
    ]
  };

  const userContents = contents[username as keyof typeof contents] || contents.default;
  return userContents[index % userContents.length];
};