import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Repeat2, 
  TrendingUp, 
  Clock, 
  Eye,
  Filter,
  Search,
  Star,
  Zap,
  Globe,
  BarChart3,
  Activity,
  Target,
  Flame,
  Award,
  Calendar,
  Hash,
  AtSign,
  ExternalLink,
  RefreshCw,
  Bell,
  Bookmark,
  Share,
  MoreHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Verified,
  MapPin,
  Link as LinkIcon,
  Sparkles,
  Crown,
  Shield,
  Radar
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TwitterUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  followers: number;
  following: number;
  location?: string;
  bio: string;
  website?: string;
  joinDate: string;
  stats: {
    totalTweets: number;
    avgEngagement: number;
    sentimentTrend: 'up' | 'down' | 'stable';
    viralPotential: number;
    influence: number;
  };
  category: string;
  isOnline: boolean;
  lastActive: string;
}

interface Tweet {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  sentiment: number;
  viralScore: number;
  hashtags: string[];
  mentions: string[];
  media?: string[];
  isRetweet?: boolean;
  originalAuthor?: string;
  location?: string;
  engagement: number;
  authorId: string;
}

export const SocialNews: React.FC = () => {
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'high-engagement' | 'trending' | 'recent' | 'verified' | 'online'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'tech' | 'business' | 'crypto' | 'ai' | 'startup'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data - n8n workflow'undan gelecek gerçek veriler
  const mockUsers: TwitterUser[] = [
    {
      id: '1',
      username: 'ozan_sihay',
      displayName: 'Ozan Şihay',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      followers: 45000,
      following: 1200,
      location: 'Istanbul, Turkey',
      bio: 'Digital Marketing Expert & AI Enthusiast',
      website: 'ozansihay.com',
      joinDate: '2015-03-15',
      stats: {
        totalTweets: 8500,
        avgEngagement: 6.8,
        sentimentTrend: 'up',
        viralPotential: 78,
        influence: 82
      },
      category: 'tech',
      isOnline: true,
      lastActive: '2 min ago'
    },
    {
      id: '2',
      username: 'glenngabe',
      displayName: 'Glenn Gabe',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      followers: 125000,
      following: 890,
      location: 'New York, USA',
      bio: 'SEO Expert & Digital Marketing Consultant',
      website: 'glenngabe.com',
      joinDate: '2009-05-20',
      stats: {
        totalTweets: 15200,
        avgEngagement: 8.2,
        sentimentTrend: 'stable',
        viralPotential: 85,
        influence: 91
      },
      category: 'business',
      isOnline: false,
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      username: 'rustybrick',
      displayName: 'Barry Schwartz',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      followers: 89000,
      following: 2100,
      location: 'New York, USA',
      bio: 'SEO News & Search Engine Updates',
      website: 'seroundtable.com',
      joinDate: '2007-11-12',
      stats: {
        totalTweets: 45000,
        avgEngagement: 7.5,
        sentimentTrend: 'up',
        viralPotential: 72,
        influence: 88
      },
      category: 'tech',
      isOnline: true,
      lastActive: '5 min ago'
    },
    {
      id: '4',
      username: 'claudeai',
      displayName: 'Claude AI',
      avatar: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      followers: 2800000,
      following: 45,
      location: 'San Francisco, CA',
      bio: 'AI Assistant by Anthropic',
      website: 'claude.ai',
      joinDate: '2022-04-15',
      stats: {
        totalTweets: 1200,
        avgEngagement: 12.8,
        sentimentTrend: 'up',
        viralPotential: 95,
        influence: 97
      },
      category: 'ai',
      isOnline: true,
      lastActive: 'now'
    },
    {
      id: '5',
      username: 'brkguzel',
      displayName: 'Burak Güzel',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: false,
      followers: 28000,
      following: 850,
      location: 'Istanbul, Turkey',
      bio: 'Startup Founder & Tech Entrepreneur',
      website: 'burakguzel.com',
      joinDate: '2016-08-22',
      stats: {
        totalTweets: 5600,
        avgEngagement: 5.2,
        sentimentTrend: 'stable',
        viralPotential: 68,
        influence: 75
      },
      category: 'startup',
      isOnline: false,
      lastActive: '3 hours ago'
    },
    {
      id: '6',
      username: 'fatihiosdev',
      displayName: 'Fatih Kadir Akın',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      verified: true,
      followers: 67000,
      following: 1500,
      location: 'Istanbul, Turkey',
      bio: 'iOS Developer & Tech Content Creator',
      website: 'fatihkadir.com',
      joinDate: '2012-01-10',
      stats: {
        totalTweets: 12000,
        avgEngagement: 7.8,
        sentimentTrend: 'up',
        viralPotential: 81,
        influence: 86
      },
      category: 'tech',
      isOnline: true,
      lastActive: '15 min ago'
    }
  ];

  const mockTweets: Tweet[] = [
    {
      id: '1',
      content: 'AI\'ın geleceği hakkında düşünürken, insan-makine işbirliğinin ne kadar önemli olduğunu anlıyorum. Teknoloji bizi desteklemeli, yerine geçmemeli.',
      timestamp: '2 hours ago',
      likes: 245,
      retweets: 89,
      replies: 34,
      views: 12500,
      sentiment: 0.85,
      viralScore: 78,
      hashtags: ['#AI', '#Technology', '#Future'],
      mentions: [],
      engagement: 7.2,
      authorId: '1'
    },
    {
      id: '2',
      content: 'Google\'ın yeni algoritma güncellemesi SEO dünyasını yine karıştırdı. Core Web Vitals\'a odaklanmak artık daha da kritik.',
      timestamp: '4 hours ago',
      likes: 189,
      retweets: 156,
      replies: 67,
      views: 8900,
      sentiment: 0.72,
      viralScore: 85,
      hashtags: ['#SEO', '#Google', '#WebVitals'],
      mentions: ['@Google'],
      engagement: 8.1,
      authorId: '2'
    },
    {
      id: '3',
      content: 'Claude AI\'ın yeni özellikleri gerçekten etkileyici. Özellikle kod yazma konusundaki yetenekleri çok gelişmiş.',
      timestamp: '1 hour ago',
      likes: 567,
      retweets: 234,
      replies: 89,
      views: 25000,
      sentiment: 0.91,
      viralScore: 92,
      hashtags: ['#ClaudeAI', '#Coding', '#AI'],
      mentions: ['@ClaudeAI'],
      engagement: 9.4,
      authorId: '4'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'verified' && user.verified) ||
                         (filterBy === 'online' && user.isOnline) ||
                         (filterBy === 'high-engagement' && user.stats.avgEngagement > 7) ||
                         (filterBy === 'trending' && user.stats.viralPotential > 80);
    
    const matchesCategory = categoryFilter === 'all' || user.category === categoryFilter;
    
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.7) return 'text-green-400';
    if (sentiment > 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getViralScoreColor = (score: number) => {
    if (score > 85) return 'from-pink-500 to-red-500';
    if (score > 70) return 'from-yellow-500 to-orange-500';
    return 'from-blue-500 to-purple-500';
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'tech': Zap,
      'business': Target,
      'crypto': Crown,
      'ai': Sparkles,
      'startup': Radar,
    };
    return icons[category] || Users;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'tech': 'from-blue-500 to-cyan-500',
      'business': 'from-green-500 to-emerald-500',
      'crypto': 'from-yellow-500 to-orange-500',
      'ai': 'from-purple-500 to-pink-500',
      'startup': 'from-red-500 to-rose-500',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-full mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent font-extrabold`}>
                  SocialNews
                </span>
              </h1>
              <p className={`text-xl ${themeColors.textSecondary}`}>
                Monitor 100+ influential accounts in real-time
              </p>
            </div>
            
            {/* Advanced Filters - moved up */}
            <div className="glassmorphism rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 glassmorphism-dark rounded-xl text-white placeholder-gray-400 border border-white/20 focus:border-white/40 transition-all duration-300"
                  />
                </div>
                
                {/* Status Filter */}
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="px-4 py-3 glassmorphism-dark rounded-xl text-white border border-white/20 focus:border-white/40 transition-all duration-300"
                >
                  <option value="all">All Users</option>
                  <option value="online">Online Now</option>
                  <option value="verified">Verified Only</option>
                  <option value="high-engagement">High Engagement</option>
                  <option value="trending">Trending</option>
                </select>
                
                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as any)}
                  className="px-4 py-3 glassmorphism-dark rounded-xl text-white border border-white/20 focus:border-white/40 transition-all duration-300"
                >
                  <option value="all">All Categories</option>
                  <option value="tech">Technology</option>
                  <option value="business">Business</option>
                  <option value="crypto">Crypto</option>
                  <option value="ai">AI & ML</option>
                  <option value="startup">Startup</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Sidebar - User Grid/List */}
          <div className="xl:col-span-1">
            <div className="glassmorphism rounded-3xl p-6 border border-white/20 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin">
              {/* All Users Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedUser(null)}
                className={`w-full p-4 rounded-xl mb-6 transition-all duration-300 ${
                  selectedUser === null
                    ? `bg-gradient-to-r ${themeColors.secondary} text-white shadow-lg`
                    : 'glassmorphism-dark text-gray-300 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${themeColors.accent} flex items-center justify-center shadow-lg`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">All Users</div>
                    <div className="text-sm opacity-75">Combined feed</div>
                  </div>
                </div>
              </motion.button>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="text-center p-3 glassmorphism-dark rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-white">{filteredUsers.length}</div>
                  <div className="text-xs text-gray-400">Active Users</div>
                </div>
                <div className="text-center p-3 glassmorphism-dark rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-green-400">{filteredUsers.filter(u => u.isOnline).length}</div>
                  <div className="text-xs text-gray-400">Online Now</div>
                </div>
              </div>

              {/* User List */}
              <div className="space-y-3">
                {filteredUsers.map((user, index) => {
                  const CategoryIcon = getCategoryIcon(user.category);
                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedUser(user.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                        selectedUser === user.id
                          ? `bg-gradient-to-r ${themeColors.secondary}/20 border-2 border-white/30 shadow-lg`
                          : 'glassmorphism-dark hover:bg-white/10 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.displayName}
                            className="w-12 h-12 rounded-full object-cover shadow-lg"
                          />
                          {user.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                              <Verified className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {user.isOnline && (
                            <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-white truncate text-sm">{user.displayName}</h3>
                            <div className={`p-1 rounded-lg bg-gradient-to-r ${getCategoryColor(user.category)}`}>
                              <CategoryIcon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">@{user.username}</p>
                          
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-gray-500">{formatNumber(user.followers)} followers</span>
                            <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getViralScoreColor(user.stats.viralPotential)} text-white font-bold text-xs`}>
                              {user.stats.viralPotential}%
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className={`${user.isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                              {user.lastActive}
                            </span>
                            <div className={`text-xs font-semibold ${getSentimentColor(user.stats.avgEngagement / 10)}`}>
                              {user.stats.avgEngagement}% eng
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-3">
            {selectedUser === null ? (
              /* All Users Feed */
              <div className="space-y-6">

                {/* Recent Activity Feed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glassmorphism rounded-3xl p-8 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white flex items-center">
                      <Clock className="w-8 h-8 mr-3 text-green-400" />
                      Recent Activity Feed
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        try {
                          setIsRefreshing(true);
                          const response = await fetch('https://clerkvespike.app.n8n.cloud/webhook/twitter-collect', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              trigger: 'manual',
                              timestamp: new Date().toISOString()
                            })
                          });
                          
                          if (response.ok) {
                            // Simulate data refresh
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            console.log('Webhook triggered successfully');
                          }
                        } catch (error) {
                          console.error('Webhook error:', error);
                        } finally {
                          setIsRefreshing(false);
                        }
                      }}
                      disabled={isRefreshing}
                      className={`px-6 py-3 bg-gradient-to-r ${themeColors.secondary} text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg disabled:opacity-50`}
                    >
                      <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span>{isRefreshing ? 'Updating...' : 'Update Data'}</span>
                    </motion.button>
                  </div>
                  
                  <div className="space-y-6">
                    {mockTweets.map((tweet, index) => {
                      const author = mockUsers.find(u => u.id === tweet.authorId);
                      if (!author) return null;
                      
                      return (
                        <motion.div
                          key={tweet.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.01, y: -2 }}
                          className="p-6 glassmorphism-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <img
                                src={author.avatar}
                                alt={author.displayName}
                                className="w-14 h-14 rounded-full object-cover shadow-lg"
                              />
                              {author.isOnline && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-3">
                                <span className="font-bold text-white text-lg">{author.displayName}</span>
                                {author.verified && <Verified className="w-5 h-5 text-blue-500" />}
                                <span className="text-gray-400">@{author.username}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-500 text-sm">{tweet.timestamp}</span>
                              </div>
                              
                              <p className="text-gray-300 mb-4 leading-relaxed text-lg">{tweet.content}</p>
                              
                              {tweet.hashtags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {tweet.hashtags.map((hashtag, i) => (
                                    <motion.span
                                      key={i}
                                      whileHover={{ scale: 1.05 }}
                                      className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium text-sm"
                                    >
                                      {hashtag}
                                    </motion.span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center space-x-8 text-gray-400">
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer transition-colors"
                                  >
                                    <MessageSquare className="w-5 h-5" />
                                    <span className="font-medium">{formatNumber(tweet.replies)}</span>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-2 hover:text-green-400 cursor-pointer transition-colors"
                                  >
                                    <Repeat2 className="w-5 h-5" />
                                    <span className="font-medium">{formatNumber(tweet.retweets)}</span>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-2 hover:text-red-400 cursor-pointer transition-colors"
                                  >
                                    <Heart className="w-5 h-5" />
                                    <span className="font-medium">{formatNumber(tweet.likes)}</span>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-2 hover:text-gray-300 cursor-pointer transition-colors"
                                  >
                                    <Eye className="w-5 h-5" />
                                    <span className="font-medium">{formatNumber(tweet.views)}</span>
                                  </motion.div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getViralScoreColor(tweet.viralScore)} text-white text-sm font-bold shadow-lg`}>
                                    <div className="flex items-center space-x-1">
                                      <Zap className="w-4 h-4" />
                                      <span>{tweet.viralScore}%</span>
                                    </div>
                                  </div>
                                  <div className={`text-sm font-semibold ${getSentimentColor(tweet.sentiment)}`}>
                                    {(tweet.sentiment * 100).toFixed(0)}% Sentiment
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Individual User View */
              <div className="space-y-6">
                {(() => {
                  const user = mockUsers.find(u => u.id === selectedUser);
                  if (!user) return null;
                  
                  return (
                    <>
                      {/* User Profile Header */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glassmorphism rounded-3xl p-8 border border-white/20"
                      >
                        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                          <div className="relative">
                            <img
                              src={user.avatar}
                              alt={user.displayName}
                              className="w-32 h-32 rounded-full object-cover shadow-2xl"
                            />
                            {user.verified && (
                              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <Verified className="w-6 h-6 text-white" />
                              </div>
                            )}
                            {user.isOnline && (
                              <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900"></div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h1 className="text-4xl font-bold text-white">{user.displayName}</h1>
                              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(user.category)} text-white text-sm font-bold`}>
                                {user.category.toUpperCase()}
                              </div>
                            </div>
                            <p className="text-gray-400 text-lg mb-4">@{user.username}</p>
                            <p className="text-gray-300 mb-6 leading-relaxed text-lg">{user.bio}</p>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                              {user.location && (
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-5 h-5" />
                                  <span>{user.location}</span>
                                </div>
                              )}
                              {user.website && (
                                <div className="flex items-center space-x-2">
                                  <LinkIcon className="w-5 h-5" />
                                  <a href={`https://${user.website}`} className="text-blue-400 hover:text-blue-300">
                                    {user.website}
                                  </a>
                                </div>
                              )}
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5" />
                                <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5" />
                                <span className={user.isOnline ? 'text-green-400' : 'text-gray-400'}>
                                  {user.lastActive}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-8 text-lg">
                              <div>
                                <span className="font-bold text-white">{formatNumber(user.following)}</span>
                                <span className="text-gray-400 ml-2">Following</span>
                              </div>
                              <div>
                                <span className="font-bold text-white">{formatNumber(user.followers)}</span>
                                <span className="text-gray-400 ml-2">Followers</span>
                              </div>
                              <div>
                                <span className="font-bold text-white">{formatNumber(user.stats.totalTweets)}</span>
                                <span className="text-gray-400 ml-2">Tweets</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-8 py-4 bg-gradient-to-r ${themeColors.secondary} text-white rounded-xl font-bold shadow-lg text-lg`}
                            >
                              Follow
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-8 py-4 glassmorphism text-white rounded-xl font-bold border border-white/20 text-lg"
                            >
                              Message
                            </motion.button>
                          </div>
                        </div>
                        
                        {/* User Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-8 pt-8 border-t border-white/10">
                          {[
                            { label: 'Avg Engagement', value: `${user.stats.avgEngagement}%`, icon: BarChart3, color: 'text-blue-400' },
                            { label: 'Influence Score', value: user.stats.influence, icon: Target, color: 'text-purple-400' },
                            { label: 'Viral Potential', value: `${user.stats.viralPotential}%`, icon: Zap, color: 'text-yellow-400' },
                            { label: 'Sentiment Trend', value: user.stats.sentimentTrend, icon: TrendingUp, color: 'text-green-400' },
                            { label: 'Activity Level', value: 'High', icon: Activity, color: 'text-red-400' },
                          ].map((stat, index) => (
                            <motion.div
                              key={stat.label}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.05, y: -5 }}
                              className="text-center p-6 glassmorphism-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                            >
                              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                              <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* User's Tweets */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glassmorphism rounded-3xl p-8 border border-white/20"
                      >
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-3xl font-bold text-white flex items-center">
                            <MessageSquare className="w-8 h-8 mr-3 text-blue-400" />
                            Recent Tweets
                          </h2>
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 glassmorphism-dark text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2"
                            >
                              <Filter className="w-5 h-5" />
                              <span>Filter</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 glassmorphism-dark text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2"
                            >
                              <ExternalLink className="w-5 h-5" />
                              <span>View on Twitter</span>
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {mockTweets.filter(t => t.authorId === user.id).map((tweet, index) => (
                            <motion.div
                              key={tweet.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              whileHover={{ scale: 1.01, y: -2 }}
                              className="p-8 glassmorphism-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                            >
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                  <span className="text-gray-400 text-lg">{tweet.timestamp}</span>
                                  {tweet.location && (
                                    <>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-400 text-lg">{tweet.location}</span>
                                    </>
                                  )}
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="opacity-0 group-hover:opacity-100 p-3 glassmorphism-dark rounded-full hover:bg-white/20 transition-all duration-300"
                                >
                                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </motion.button>
                              </div>
                              
                              <p className="text-gray-300 mb-6 leading-relaxed text-xl">{tweet.content}</p>
                              
                              {tweet.hashtags.length > 0 && (
                                <div className="flex flex-wrap gap-3 mb-6">
                                  {tweet.hashtags.map((hashtag, i) => (
                                    <motion.span
                                      key={i}
                                      whileHover={{ scale: 1.05 }}
                                      className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium text-lg"
                                    >
                                      {hashtag}
                                    </motion.span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                <div className="flex items-center space-x-10 text-gray-400">
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-3 hover:text-blue-400 cursor-pointer transition-colors"
                                  >
                                    <MessageSquare className="w-6 h-6" />
                                    <span className="font-medium text-lg">{formatNumber(tweet.replies)}</span>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-3 hover:text-green-400 cursor-pointer transition-colors"
                                  >
                                    <Repeat2 className="w-6 h-6" />
                                    <span className="font-medium text-lg">{formatNumber(tweet.retweets)}</span>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-3 hover:text-red-400 cursor-pointer transition-colors"
                                  >
                                    <Heart className="w-6 h-6" />
                                    <span className="font-medium text-lg">{formatNumber(tweet.likes)}</span>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer transition-colors"
                                  >
                                    <Eye className="w-6 h-6" />
                                    <span className="font-medium text-lg">{formatNumber(tweet.views)}</span>
                                  </motion.div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getViralScoreColor(tweet.viralScore)} text-white text-lg font-bold shadow-lg`}>
                                    <div className="flex items-center space-x-2">
                                      <Zap className="w-5 h-5" />
                                      <span>{tweet.viralScore}%</span>
                                    </div>
                                  </div>
                                  <div className={`text-lg font-semibold ${getSentimentColor(tweet.sentiment)}`}>
                                    {(tweet.sentiment * 100).toFixed(0)}% Sentiment
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};