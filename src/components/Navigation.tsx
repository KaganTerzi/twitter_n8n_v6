import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Home, BarChart3, Settings, Moon, Sun, Menu, X, MessageSquare, Youtube } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const { theme, toggleTheme, getThemeColors } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeColors = getThemeColors();

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'social-news', label: 'SocialNews', icon: MessageSquare },
    { id: 'youtube-analytics', label: 'YouTube Analiz', icon: Youtube },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <Brain className={`h-8 w-8 ${themeColors.text}`} />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${themeColors.accent} opacity-30 rounded-full blur-lg`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent`}>
                AI Intel
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? `glassmorphism shadow-lg border border-white/20 text-white dark:text-white light:text-gray-900`
                      : `text-gray-300 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:glassmorphism`
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
              
              {/* Light/Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg glassmorphism hover:shadow-lg transition-all duration-300 border border-white/20 text-white dark:text-white light:text-gray-900"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg glassmorphism border border-white/20 text-white dark:text-white light:text-gray-900"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </motion.button>
              
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg glassmorphism border border-white/20 text-white dark:text-white light:text-gray-900"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className={`md:hidden overflow-hidden backdrop-blur-xl ${themeColors.glassBg} border-t ${themeColors.glassBorder}`}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? `glassmorphism border border-white/20 text-white dark:text-white light:text-gray-900`
                    : `text-gray-300 hover:glassmorphism hover:text-white dark:hover:text-white light:hover:text-gray-900`
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};