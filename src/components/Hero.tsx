import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Users, MessageSquare, Zap, Globe, Play, ArrowRight, Check, Sparkles, Crown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Hero: React.FC = () => {
  const { theme, getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  const [currentText, setCurrentText] = useState(0);

  const aiTexts = [
    "Detecting viral trends with 94% accuracy...",
    "Analyzing 1.2M social media posts...",
    "Predicting next trending hashtags...",
    "Monitoring global sentiment shifts..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % aiTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-2 sm:px-4 lg:px-6 xl:px-8 pt-16 overflow-x-hidden">
      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-7xl mx-auto mb-8 w-full"
      >
        <motion.h1
          className="text-5xl md:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent`}>
            AI Social
          </span>
          <br />
          <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-bold`}>Intelligence</span>
        </motion.h1>

        <motion.p
          className={`text-xl md:text-2xl xl:text-3xl ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-8 leading-relaxed max-w-5xl mx-auto`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sosyal medya trendlerini çözmek, viral içeriği tahmin etmek ve rekabette öne geçmek için yapay zekanın gücünden yararlanın
        </motion.p>

        {/* AI Processing Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`glassmorphism p-6 xl:p-8 rounded-2xl mb-8 max-w-4xl mx-auto ${themeColors.border} border`}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`w-8 h-8 rounded-full bg-gradient-to-r ${themeColors.secondary} flex items-center justify-center mr-3`}
            >
              <Brain className="w-4 h-4 text-white" />
            </motion.div>
            <div className={`text-lg xl:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
              AI Processing Status
            </div>
          </div>
          
          <motion.div
            key={currentText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-green-400 font-mono text-sm"
          >
            {aiTexts[currentText]}
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`glassmorphism p-6 xl:p-10 rounded-3xl mb-8 ${themeColors.border} border max-w-6xl mx-auto`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-10">
            {[
              { icon: TrendingUp, value: '94%', label: 'Trend Analysis', color: 'text-blue-400' },
              { icon: Zap, value: '1.2M', label: 'Real-time Data', color: 'text-purple-400' },
              { icon: Users, value: '15K+', label: 'User Insights', color: 'text-cyan-400' },
              { icon: MessageSquare, value: '98%', label: 'Predictions', color: 'text-green-400' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${themeColors.secondary}/20 flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                  <stat.icon className={`w-8 h-8 xl:w-10 xl:h-10 ${stat.color}`} />
                </div>
                <div className={`text-3xl xl:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{stat.value}</div>
                <div className={`text-sm xl:text-base ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 bg-gradient-to-r ${themeColors.secondary} text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2`}
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 glassmorphism rounded-xl font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2 ${theme === 'dark' ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-900/20'}`}
          >
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Canlı Demo Deneyimi */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="w-full max-w-7xl mx-auto mb-8 px-2 sm:px-4"
      >
        <div className="text-center mb-8">
          <h2 className={`text-3xl md:text-4xl xl:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
            <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent`}>
              Canlı Demo Deneyimi
            </span>
          </h2>
          <p className={`text-lg xl:text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
            AI'ın gücünü gerçek zamanlı olarak deneyimleyin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-10">
          {/* Global Sentiment Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className={`glassmorphism p-6 xl:p-8 rounded-3xl ${themeColors.border} border hover:${themeColors.glassBorder} transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Globe className="w-6 h-6 xl:w-8 xl:h-8 text-cyan-400" />
                <h3 className={`text-xl xl:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Global Sentiment</h3>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-sm xl:text-base text-gray-400">Live Data</span>
              </div>
            </div>

            <div className="relative h-64 xl:h-80 flex items-center justify-center">
              {/* Globe visualization */}
              <div className="relative w-48 h-48 xl:w-64 xl:h-64">
                <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-4 border border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-8 border border-blue-500/10 rounded-full"></div>
                
                {/* Sentiment points */}
                {[
                  { x: '30%', y: '25%', color: 'bg-green-500', size: 'w-3 h-3' },
                  { x: '70%', y: '40%', color: 'bg-yellow-500', size: 'w-2 h-2' },
                  { x: '45%', y: '60%', color: 'bg-red-500', size: 'w-2 h-2' },
                  { x: '60%', y: '20%', color: 'bg-green-500', size: 'w-4 h-4' },
                  { x: '25%', y: '70%', color: 'bg-yellow-500', size: 'w-3 h-3' },
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.3 
                    }}
                    className={`absolute ${point.size} ${point.color} rounded-full shadow-lg`}
                    style={{ left: point.x, top: point.y }}
                  />
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Positive (70%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Neutral (50-70%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">{'Negative (<50%)'}</span>
              </div>
            </div>
          </motion.div>

          {/* Viral Radar Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className={`glassmorphism p-6 xl:p-8 rounded-3xl ${themeColors.border} border hover:${themeColors.glassBorder} transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 xl:w-8 xl:h-8 text-purple-400" />
                <h3 className={`text-xl xl:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Viral Radar</h3>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
                <span className="text-sm xl:text-base text-gray-400">Next 6 Hours</span>
              </div>
            </div>

            <div className="relative h-64 xl:h-80 flex items-center justify-center">
              {/* Radar visualization */}
              <div className="relative w-48 h-48 xl:w-64 xl:h-64">
                {/* Radar circles */}
                <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full"></div>
                <div className="absolute inset-6 border border-purple-500/20 rounded-full"></div>
                <div className="absolute inset-12 border border-purple-500/10 rounded-full"></div>
                
                {/* Radar sweep */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-24 h-0.5 bg-gradient-to-r from-green-500 to-transparent origin-left"></div>
                </motion.div>

                {/* Trend points */}
                {[
                  { x: '25%', y: '30%', color: 'bg-pink-500', size: 'w-3 h-3', viral: 'high' },
                  { x: '65%', y: '45%', color: 'bg-yellow-500', size: 'w-2 h-2', viral: 'medium' },
                  { x: '40%', y: '65%', color: 'bg-blue-500', size: 'w-2 h-2', viral: 'low' },
                  { x: '70%', y: '25%', color: 'bg-pink-500', size: 'w-4 h-4', viral: 'high' },
                  { x: '30%', y: '75%', color: 'bg-yellow-500', size: 'w-3 h-3', viral: 'medium' },
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    animate={{ 
                      scale: point.viral === 'high' ? [1, 1.5, 1] : [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: point.viral === 'high' ? 1.5 : 2, 
                      repeat: Infinity, 
                      delay: index * 0.2 
                    }}
                    className={`absolute ${point.size} ${point.color} rounded-full shadow-lg`}
                    style={{ left: point.x, top: point.y }}
                  />
                ))}
              </div>

              {/* Next prediction */}
              <div className="absolute top-4 left-4">
                <div className="text-xs text-gray-400 mb-1">Next 6 Hours:</div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm font-semibold text-white"
                >
                  AI Revolution
                </motion.div>
              </div>

              {/* Predicting indicator */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-4 right-4 flex items-center space-x-2"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-300">PREDICTING</span>
              </motion.div>
            </div>

            {/* Legend */}
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-gray-300">High Viral (85%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Medium (70-85%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">Low (&lt;70%)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};