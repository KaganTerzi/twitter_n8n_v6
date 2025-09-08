import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Users, MessageSquare, Zap, Globe, Check, Sparkles, Crown } from 'lucide-react';
import { SentimentGlobe } from './SentimentGlobe';
import { TrendRadar } from './TrendRadar';
import { CategoryModal } from './CategoryModal';
import { useTheme } from '../contexts/ThemeContext';
import { useSocialData } from '../hooks/useSocialData';

export const AIAnalytics: React.FC = () => {
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [aiStatus, setAiStatus] = useState<'analyzing' | 'complete' | 'idle'>('analyzing');
  const { socialPosts, trendingTopics, sentimentData, loading, error, refreshData } = useSocialData();

  // Process real data into categories
  const categories = React.useMemo(() => {
    const categoryMap = new Map();
    const colorMap = {
      'Technology': 'from-blue-500 to-cyan-500',
      'Business': 'from-green-500 to-emerald-500',
      'Entertainment': 'from-purple-500 to-pink-500',
      'Sports': 'from-orange-500 to-red-500',
      'Politics': 'from-red-500 to-rose-500',
      'Health': 'from-teal-500 to-cyan-500',
      'Lifestyle': 'from-pink-500 to-purple-500',
    };

    socialPosts.forEach(post => {
      const category = post.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          count: 0,
          totalSentiment: 0,
          viralScores: [],
          color: colorMap[category] || 'from-gray-500 to-gray-600',
        });
      }
      
      const cat = categoryMap.get(category);
      cat.count++;
      cat.totalSentiment += post.sentiment_score;
      cat.viralScores.push(post.viral_score);
    });

    return Array.from(categoryMap.values()).map(cat => ({
      name: cat.name,
      count: cat.count,
      sentiment: cat.count > 0 ? cat.totalSentiment / cat.count : 0.5,
      color: cat.color,
      trending: cat.viralScores.some(score => score > 80),
    }));
  }, [socialPosts]);

  // Calculate real metrics from data
  const metrics = React.useMemo(() => {
    const totalPosts = socialPosts.length;
    const avgSentiment = socialPosts.reduce((sum, post) => sum + post.sentiment_score, 0) / totalPosts || 0;
    const totalReach = socialPosts.reduce((sum, post) => sum + post.reach, 0);
    const avgViralScore = socialPosts.reduce((sum, post) => sum + post.viral_score, 0) / totalPosts || 0;

    return [
      { 
        label: 'Active Mentions', 
        value: `${(totalPosts / 1000).toFixed(1)}K`, 
        change: '+12%', 
        icon: MessageSquare, 
        color: 'text-blue-400' 
      },
      { 
        label: 'Sentiment Score', 
        value: `${(avgSentiment * 10).toFixed(1)}/10`, 
        change: '+5%', 
        icon: TrendingUp, 
        color: 'text-green-400' 
      },
      { 
        label: 'Reach', 
        value: `${(totalReach / 1000000).toFixed(1)}M`, 
        change: '+23%', 
        icon: Users, 
        color: 'text-purple-400' 
      },
      { 
        label: 'Viral Potential', 
        value: `${Math.round(avgViralScore)}%`, 
        change: '+8%', 
        icon: Zap, 
        color: 'text-orange-400' 
      },
    ];
  }, [socialPosts]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className={`glassmorphism p-12 rounded-3xl text-center ${themeColors.border} border`}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className={`text-2xl font-bold ${themeColors.text} mb-2`}>Loading AI Analytics</h2>
          <p className={themeColors.textSecondary}>Fetching real-time social media data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className={`glassmorphism p-12 rounded-3xl text-center ${themeColors.border} border`}>
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
          <p className={`${themeColors.textSecondary} mb-6`}>{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold"
          >
            Retry
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 w-full">
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-6">
            <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent`}>
              AI Command Center
            </span>
          </h1>
          <p className="text-xl xl:text-2xl text-[var(--muted)] max-w-4xl mx-auto">
            Real-time social media intelligence at your fingertips
          </p>
        </motion.div>


        {/* Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 xl:gap-8 mb-12 max-w-7xl mx-auto"
        >
          {/* AI Analyzing Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`glassmorphism p-4 xl:p-8 rounded-2xl ${themeColors.border} border`}
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                animate={{ rotate: aiStatus === 'analyzing' ? 360 : 0 }}
                transition={{ duration: 3, repeat: aiStatus === 'analyzing' ? Infinity : 0, ease: "linear" }}
              >
                <Brain className="w-6 h-6 xl:w-8 xl:h-8 text-purple-400" />
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm font-semibold text-green-400"
              >
                LIVE
              </motion.div>
            </div>
            <div className={`text-2xl xl:text-3xl font-bold ${themeColors.text} mb-1`}>AI</div>
            <div className={`text-sm xl:text-base ${themeColors.textSecondary}`}>Analyzing</div>
          </motion.div>
          
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`glassmorphism p-4 xl:p-8 rounded-2xl ${themeColors.border} border`}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-6 h-6 xl:w-8 xl:h-8 ${metric.color}`} />
                <span className={`text-sm font-semibold ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </span>
              </div>
              <div className={`text-2xl xl:text-3xl font-bold ${themeColors.text} mb-1`}>{metric.value}</div>
              <div className={`text-sm xl:text-base ${themeColors.textSecondary}`}>{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10 mb-12 max-w-7xl mx-auto">
          {/* Sentiment Globe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`glassmorphism p-6 xl:p-8 rounded-3xl ${themeColors.border} border`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl xl:text-2xl font-bold ${themeColors.text} flex items-center`}>
                <Globe className="w-6 h-6 xl:w-8 xl:h-8 mr-2 text-cyan-400" />
                Global Sentiment
              </h3>
              <div className={`text-sm xl:text-base ${themeColors.textSecondary}`}>Live Data</div>
            </div>
            <SentimentGlobe />
          </motion.div>

          {/* Trend Radar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`glassmorphism p-6 xl:p-8 rounded-3xl ${themeColors.border} border`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl xl:text-2xl font-bold ${themeColors.text} flex items-center`}>
                <TrendingUp className="w-6 h-6 xl:w-8 xl:h-8 mr-2 text-purple-400" />
                Viral Radar
              </h3>
              <div className={`text-sm xl:text-base ${themeColors.textSecondary}`}>Next 6 Hours</div>
            </div>
            <TrendRadar />
          </motion.div>
        </div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pb-12 max-w-7xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl xl:text-3xl font-bold ${themeColors.text}`}>Category Analysis</h3>
            <div className={`text-sm xl:text-base ${themeColors.textSecondary}`}>Click to explore</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`glassmorphism p-4 xl:p-6 rounded-2xl cursor-pointer ${themeColors.border} border hover:${themeColors.glassBorder} transition-all duration-300 group relative`}
              >
                {/* Trending Badge */}
                {category.trending && (
                  <div className="flex justify-end mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-xs xl:text-sm font-bold text-white rounded-full"
                    >
                      TRENDING
                    </motion.div>
                  </div>
                )}

                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-lg xl:text-xl font-bold ${themeColors.text} group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 truncate`}>
                    {category.name}
                  </h4>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm xl:text-base">
                    <span className={themeColors.textSecondary}>Mentions</span>
                    <span className={`${themeColors.text} font-semibold`}>{category.count.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm xl:text-base">
                    <span className={themeColors.textSecondary}>Sentiment</span>
                    <span className={`font-semibold ${category.sentiment > 0.7 ? 'text-green-400' : category.sentiment > 0.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {(category.sentiment * 100).toFixed(0)}%
                    </span>
                  </div>

                  {/* Sentiment Bar */}
                  <div className={`w-full ${themeColors.textSecondary === 'text-gray-600' ? 'bg-gray-300' : 'bg-gray-700'} rounded-full h-2 overflow-hidden`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.sentiment * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                    />
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Modal */}
        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            socialPosts={socialPosts.filter(post => post.category === selectedCategory)}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </div>
    </div>
  );
};