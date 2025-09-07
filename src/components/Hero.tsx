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
    </div>
  );
};