import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Users, MessageSquare, Zap, Play, ArrowRight, BarChart3, Eye } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const { theme, getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  return (
    <div className="h-auto flex flex-col justify-start items-center relative px-4 sm:px-6 lg:px-8 pt-16 pb-8 overflow-x-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-6xl mx-auto w-full relative z-10 mt-8"
      >
        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent`}>
            AI Social
          </span>
          <br />
          <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Intelligence</span>
        </motion.h1>

        {/* Subtitle - More Concise */}
        <motion.p
          className={`text-lg md:text-xl lg:text-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-6 leading-relaxed max-w-4xl mx-auto font-medium`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Viral trendleri yakalayın, rekabette öne geçin, hepsi yapay zekâ gücüyle
        </motion.p>

        {/* Compact Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`glassmorphism p-4 lg:p-6 rounded-2xl mb-6 ${themeColors.border} border max-w-5xl mx-auto`}
        >
          <div className="grid grid-cols-5 gap-3 lg:gap-6">
            {[
              { 
                icon: Brain, 
                value: 'AI', 
                label: 'Analyzing', 
                color: 'text-purple-400',
                animated: true
              },
              { 
                icon: TrendingUp, 
                value: '94%', 
                label: 'Trend Analysis', 
                color: 'text-blue-400' 
              },
              { 
                icon: BarChart3, 
                value: '1.2M', 
                label: 'Real-time Data', 
                color: 'text-green-400' 
              },
              { 
                icon: Users, 
                value: '15K+', 
                label: 'User Insights', 
                color: 'text-cyan-400' 
              },
              { 
                icon: MessageSquare, 
                value: '98%', 
                label: 'Predictions', 
                color: 'text-orange-400' 
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="text-center group cursor-pointer"
              >
                <div className="flex items-center justify-center mb-2">
                  {metric.animated ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <metric.icon className={`w-6 h-6 lg:w-8 lg:h-8 ${metric.color}`} />
                    </motion.div>
                  ) : (
                    <metric.icon className={`w-6 h-6 lg:w-8 lg:h-8 ${metric.color}`} />
                  )}
                </div>
                <div className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {metric.value}
                </div>
                <div className={`text-xs lg:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons - Closer to metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-3"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('dashboard')}
            className={`px-8 lg:px-10 py-3 lg:py-4 bg-gradient-to-r ${themeColors.secondary} text-white rounded-xl font-bold text-base lg:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 relative overflow-hidden group`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 lg:px-10 py-3 lg:py-4 glassmorphism rounded-xl font-bold text-base lg:text-lg border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center space-x-3 ${theme === 'dark' ? 'text-white bg-white/10 hover:bg-white/20' : 'text-gray-900 bg-white/80 hover:bg-white/90'} backdrop-blur-sm`}
          >
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center space-x-4 lg:space-x-8 text-xs lg:text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>99.9% Uptime</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>No Credit Card</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>14-Day Free Trial</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};