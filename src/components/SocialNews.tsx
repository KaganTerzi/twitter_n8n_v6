import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Heart, 
  Repeat2, 
  Clock, 
  Eye,
  Filter,
  Search,
  RefreshCw,
  X,
  Verified,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Tweet {
  id: string;
  title: string;
  username: string;
  user_name: string;
  user_id: string;
  created_at: string;
  timestamp: string;
  likes_count: number;
  retweets_count: number;
  replies_count: number;
  views_count: number;
  url: string;
  hashtags: string[];
  mentions: string[];
  media_urls: string[];
  is_quote: boolean;
  lang: string;
  source: string;
}

const SocialNews: React.FC = () => {
  const { isDark } = useTheme();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Fetching social news data...');
      
      const response = await fetch('/api/social-news');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 API response:', data);
      
      if (data.success && data.data) {
        setTweets(data.data.tweets || []);
        setLastUpdated(new Date(data.lastUpdated || data.data.processed_at));
        console.log('✅ Data loaded successfully:', data.data.count, 'tweets');
      } else {
        throw new Error(data.message || 'No data available');
      }
    } catch (error) {
      console.error('❌ Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Filter tweets based on current filter
  const filteredTweets = tweets.filter(tweet => {
    const matchesSearch = searchTerm === '' || 
      tweet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tweet.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    switch (filter) {
      case 'recent':
        const tweetDate = new Date(tweet.created_at);
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return tweetDate > oneDayAgo;
      case 'popular':
        return tweet.likes_count > 10 || tweet.retweets_count > 5;
      default:
        return true;
    }
  });

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Az önce';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  };

  // Format numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Social News
                </h1>
              </div>
              {lastUpdated && (
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Son güncelleme: {getTimeAgo(lastUpdated.toISOString())}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchData}
                disabled={loading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  loading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : isDark 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Yenile</span>
              </button>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'hover:bg-gray-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Tweet'lerde ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
                
                {/* Filter Buttons */}
                <div className="flex space-x-2">
                  {[
                    { key: 'all', label: 'Tümü', icon: MessageSquare },
                    { key: 'recent', label: 'Son 24 Saat', icon: Clock },
                    { key: 'popular', label: 'Popüler', icon: Heart }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setFilter(key as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        filter === key
                          ? isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : isDark
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Toplam Tweet</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {tweets.length}
                </p>
              </div>
              <MessageSquare className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Filtrelenmiş</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {filteredTweets.length}
                </p>
              </div>
              <Filter className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Toplam Beğeni</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatNumber(tweets.reduce((sum, tweet) => sum + tweet.likes_count, 0))}
                </p>
              </div>
              <Heart className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            </div>
          </div>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Toplam Retweet</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {formatNumber(tweets.reduce((sum, tweet) => sum + tweet.retweets_count, 0))}
                </p>
              </div>
              <Repeat2 className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Veriler yükleniyor...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={`p-6 rounded-xl ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center space-x-3">
              <X className="w-6 h-6 text-red-600" />
              <div>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-red-400' : 'text-red-800'}`}>
                  Hata
                </h3>
                <p className={`${isDark ? 'text-red-300' : 'text-red-600'}`}>
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tweets List */}
        {!loading && !error && (
          <div className="space-y-6">
            {filteredTweets.length === 0 ? (
              <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Henüz tweet bulunamadı</p>
                <p className="text-sm">Filtreleri değiştirmeyi deneyin</p>
              </div>
            ) : (
              filteredTweets.map((tweet, index) => (
                <motion.div
                  key={tweet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                        <span className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {tweet.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {tweet.user_name}
                        </h3>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          @{tweet.username}
                        </span>
                        <Verified className="w-4 h-4 text-blue-500" />
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          ·
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {getTimeAgo(tweet.created_at)}
                        </span>
                      </div>
                      
                      <p className={`text-lg ${isDark ? 'text-gray-100' : 'text-gray-900'} mb-4 leading-relaxed`}>
                        {tweet.title}
                      </p>
                      
                      {/* Hashtags and Mentions */}
                      {(tweet.hashtags.length > 0 || tweet.mentions.length > 0) && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tweet.hashtags.map((hashtag, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded-full text-sm ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                            >
                              #{hashtag}
                            </span>
                          ))}
                          {tweet.mentions.map((mention, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                            >
                              @{mention}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Media */}
                      {tweet.media_urls.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {tweet.media_urls.slice(0, 4).map((url, idx) => (
                            <img
                              key={idx}
                              src={url}
                              alt={`Media ${idx + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {formatNumber(tweet.replies_count)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Repeat2 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {formatNumber(tweet.retweets_count)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {formatNumber(tweet.likes_count)}
                          </span>
                        </div>
                        {tweet.views_count > 0 && (
                          <div className="flex items-center space-x-1">
                            <Eye className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              {formatNumber(tweet.views_count)}
                            </span>
                          </div>
                        )}
                        <a
                          href={tweet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-1 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Görüntüle</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialNews;
