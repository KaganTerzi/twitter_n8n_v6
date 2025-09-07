import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, MessageSquare, Heart, Repeat2, ExternalLink, Sparkles, Zap, Target, Globe } from 'lucide-react';
import { SocialPost } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryModalProps {
  category: string;
  socialPosts: SocialPost[];
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ category, socialPosts, onClose }) => {
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  
  // Convert database posts to display format
  const tweets = socialPosts.slice(0, 10).map(post => {
    const timeAgo = getTimeAgo(new Date(post.posted_at));
    return {
      id: post.id,
      author: post.author_username,
      authorName: post.author_name,
      content: post.content,
      timestamp: timeAgo,
      likes: post.likes_count,
      retweets: post.shares_count,
      replies: post.comments_count,
      sentiment: post.sentiment_score,
      viralScore: post.viral_score,
      platform: post.platform,
      location: post.location,
    };
  });

  // Calculate category statistics
  const categoryStats = React.useMemo(() => {
    const totalPosts = socialPosts.length;
    const totalEngagement = socialPosts.reduce((sum, post) => 
      sum + post.likes_count + post.shares_count + post.comments_count, 0);
    const totalReach = socialPosts.reduce((sum, post) => sum + post.reach, 0);
    const avgSentiment = socialPosts.reduce((sum, post) => sum + post.sentiment_score, 0) / totalPosts;

    return {
      mentions: `${(totalPosts / 1000).toFixed(1)}K`,
      engagement: `${Math.round((totalEngagement / totalPosts) * 100)}%`,
      reach: `${(totalReach / 1000000).toFixed(1)}M`,
      sentiment: `${Math.round(avgSentiment * 100)}%`,
    };
  }, [socialPosts]);

  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.8) return 'text-green-400';
    if (sentiment > 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getViralScoreColor = (score: number) => {
    if (score > 90) return 'from-pink-500 to-red-500';
    if (score > 75) return 'from-yellow-500 to-orange-500';
    return 'from-blue-500 to-purple-500';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Technology': Zap,
      'Business': Target,
      'Entertainment': Sparkles,
      'Sports': TrendingUp,
      'Politics': Globe,
      'Health': Heart,
      'Lifestyle': Users,
    };
    return icons[category] || MessageSquare;
  };

  const CategoryIcon = getCategoryIcon(category);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="glassmorphism rounded-3xl w-full max-w-5xl h-[85vh] overflow-hidden border border-white/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-6 border-b border-white/10 bg-gradient-to-r ${themeColors.secondary}/10`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${themeColors.accent}`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {category} Intelligence
                  </h2>
                </div>
                <p className={`${themeColors.textSecondary}`}>
                  {tweets.length} trending konuşmanın gerçek zamanlı analizi
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-3 rounded-full glassmorphism hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </motion.button>
            </div>

            {/* Category Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                { icon: MessageSquare, label: 'Bahsetmeler', value: categoryStats.mentions, change: '+12%', color: 'text-blue-400' },
                { icon: TrendingUp, label: 'Etkileşim', value: categoryStats.engagement, change: '+34%', color: 'text-green-400' },
                { icon: Users, label: 'Erişim', value: categoryStats.reach, change: '+28%', color: 'text-purple-400' },
                { icon: Heart, label: 'Duygu', value: categoryStats.sentiment, change: '+5%', color: 'text-pink-400' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className={`text-xs ${themeColors.textSecondary}`}>{stat.label}</div>
                  <div className={`text-xs font-semibold mt-1 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tweet List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {tweets.map((tweet, index) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, y: -3 }}
                className="glassmorphism p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Tweet Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${themeColors.accent} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-sm">
                        {tweet.authorName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">{tweet.authorName}</span>
                        <span className="text-gray-400 text-sm">@{tweet.author}</span>
                        {tweet.platform && (
                          <span className={`text-xs bg-gradient-to-r ${themeColors.secondary}/20 text-white px-2 py-1 rounded-full`}>
                            {tweet.platform}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <span>{tweet.timestamp}</span>
                        {tweet.location && (
                          <>
                            <span>•</span>
                            <span>{tweet.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Viral Score Badge */}
                  <div className={`px-3 py-2 rounded-full bg-gradient-to-r ${getViralScoreColor(tweet.viralScore)} text-white text-xs font-bold shadow-lg`}>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span>{tweet.viralScore}% Viral</span>
                    </div>
                  </div>
                </div>

                {/* Tweet Content */}
                <p className="text-gray-300 mb-4 leading-relaxed text-base">
                  {tweet.content}
                </p>

                {/* Tweet Metrics */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-gray-400">
                    <div className="flex items-center space-x-1 hover:text-blue-400 cursor-pointer transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">{tweet.replies.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-green-400 cursor-pointer transition-colors">
                      <Repeat2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{tweet.retweets.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-red-400 cursor-pointer transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-medium">{tweet.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Sentiment Score */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Duygu:</span>
                    <span className={`text-sm font-bold ${getSentimentColor(tweet.sentiment)}`}>
                      {(tweet.sentiment * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${themeColors.accent} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
              </motion.div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className={`p-6 border-t border-white/10 bg-gradient-to-r ${themeColors.secondary}/5`}>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {socialPosts.length} toplam gönderiden son {tweets.length} gönderi gösteriliyor • Canlı veri
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 glassmorphism rounded-lg text-sm font-semibold text-gray-300 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  Rapor İndir
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 bg-gradient-to-r ${themeColors.secondary} text-white rounded-lg text-sm font-semibold shadow-lg transition-all duration-300`}
                >
                  Uyarı Kur
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};