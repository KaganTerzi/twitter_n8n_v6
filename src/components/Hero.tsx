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
  const [currentMetric, setCurrentMetric] = useState(0);

  // Rotating metrics animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8 pt-16 pb-8 overflow-x-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-purple-500/20 rounded-full blur-3xl"
        />
        
        {/* Secondary Glows */}
        <motion.div
          animate={{ 
            scale: [1.2, 0.8, 1.2],
            opacity: [0.1, 0.25, 0.1],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-2xl"
        />
        
        <motion.div
          animate={{ 
            scale: [0.8, 1.3, 0.8],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-3xl"
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-7xl mx-auto w-full relative z-10"
      >
        {/* Main Headline */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span 
            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            AI Social
            {/* Glow effect behind text */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-20 blur-2xl -z-10"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.span>
          <br />
          <motion.span 
            className="text-white drop-shadow-2xl"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 40px rgba(255,255,255,0.8)',
                '0 0 20px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Intelligence
          </motion.span>
        </motion.h1>

        {/* Enhanced Subtitle */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 leading-relaxed max-w-5xl mx-auto font-semibold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Viral trendleri yakalayın, rekabette öne geçin, hepsi yapay zekâ gücüyle
          </motion.span>
        </motion.p>

        {/* Enhanced Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative glassmorphism p-8 rounded-3xl mb-6 border border-white/20 max-w-6xl mx-auto backdrop-blur-xl bg-white/5 shadow-2xl"
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 opacity-0"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ padding: '2px' }}
          />
          
          <div className="grid grid-cols-5 gap-8 relative z-10">
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
                whileHover={{ 
                  scale: 1.1, 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className={`text-center group cursor-pointer relative p-4 rounded-2xl transition-all duration-300 ${
                  currentMetric === index ? 'bg-white/10 shadow-lg' : 'hover:bg-white/5'
                }`}
              >
                {/* Highlight effect for current metric */}
                {currentMetric === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
                
                <div className="flex items-center justify-center mb-4 relative z-10">
                  {metric.animated ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <metric.icon className={`w-10 h-10 ${metric.color} drop-shadow-lg`} />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={currentMetric === index ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <metric.icon className={`w-10 h-10 ${metric.color} drop-shadow-lg`} />
                    </motion.div>
                  )}
                </div>
                
                <motion.div 
                  className="text-3xl font-black text-white mb-2 drop-shadow-lg relative z-10"
                  animate={currentMetric === index ? { 
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.8)',
                      '0 0 10px rgba(255,255,255,0.5)'
                    ]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {metric.value}
                </motion.div>
                
                <div className="text-sm text-gray-300 font-medium relative z-10">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)",
              y: -4
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('dashboard')}
            className="px-12 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center space-x-3 relative overflow-hidden group"
          >
            {/* Enhanced shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 group-hover:animate-pulse"
              animate={{ x: [-200, 400] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            />
            
            <span className="relative z-10">Start Free Trial</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 relative z-10" />
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.08, 
              y: -4,
              backgroundColor: 'rgba(255, 255, 255, 0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 glassmorphism rounded-2xl font-black text-xl border-2 border-white/30 hover:border-white/60 transition-all duration-300 flex items-center space-x-3 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play className="w-6 h-6" />
            </motion.div>
            <span>Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Enhanced Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex items-center justify-center space-x-8 text-base font-medium"
        >
          {[
            { color: 'bg-green-500', text: '99.9% Uptime', animated: true },
            { color: 'bg-blue-500', text: 'No Credit Card', animated: false },
            { color: 'bg-purple-500', text: '14-Day Free Trial', animated: false }
          ].map((item, index) => (
            <motion.div 
              key={item.text}
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 + index * 0.1 }}
            >
              <motion.div 
                className={`w-3 h-3 ${item.color} rounded-full shadow-lg`}
                animate={item.animated ? { 
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-gray-300 font-semibold">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};