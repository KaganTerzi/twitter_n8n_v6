import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Radar, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const FeatureGrid: React.FC = () => {
  const { theme } = useTheme();
  const features = [
    {
      icon: Brain,
      title: 'AI Trend Prophet',
      description: 'Advanced machine learning algorithms predict trending topics 6 hours before they go viral',
      color: 'from-purple-500 to-pink-500',
      stats: '94% Accuracy',
    },
    {
      icon: TrendingUp,
      title: 'Viral Predictor',
      description: 'Analyze content patterns and engagement metrics to forecast viral potential',
      color: 'from-green-500 to-teal-500',
      stats: '1.2M+ Posts Analyzed',
    },
    {
      icon: Radar,
      title: 'Competitor Spy',
      description: 'Monitor competitor strategies, content performance, and audience engagement',
      color: 'from-blue-500 to-cyan-500',
      stats: '500+ Brands Tracked',
    },
    {
      icon: Shield,
      title: 'Real-Time Intel',
      description: 'Instant notifications for brand mentions, sentiment changes, and trending hashtags',
      color: 'from-orange-500 to-red-500',
      stats: '24/7 Monitoring',
    },
  ];

  return (
    <div className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Superhuman Insights
            </span>
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 max-w-3xl mx-auto">
            Transform raw social media data into actionable intelligence with our cutting-edge AI tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="glassmorphism p-8 rounded-3xl h-full border border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Clear Stats Display */}
                  <div className="flex items-center justify-between">
                    <div className={`text-lg font-bold ${themeColors.text}`}>
                      {feature.stats}
                    </div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.color}`} />
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-6 w-full py-3 bg-gradient-to-r ${feature.color} text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Explore Feature
                </motion.button>
              </div>

              {/* Floating particles around card */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-60`}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};