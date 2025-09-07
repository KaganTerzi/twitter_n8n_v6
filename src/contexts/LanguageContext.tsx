import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'tr' | 'en';
  toggleLanguage: () => void;
  setLanguage: (lang: 'tr' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.dashboard': 'Dashboard',
    'nav.socialNews': 'SocialNews',
    'nav.youtubeAnalytics': 'YouTube Analiz',
    'nav.settings': 'Ayarlar',
    
    // Hero Section
    'hero.title': 'AI Social Intelligence',
    'hero.subtitle': 'Viral trendleri yakalayın, rekabette öne geçin, hepsi yapay zekâ gücüyle',
    'hero.startTrial': 'Ücretsiz Deneyin',
    'hero.watchDemo': 'Demo İzleyin',
    'hero.uptime': '99.9% Çalışma Süresi',
    'hero.noCard': 'Kredi Kartı Yok',
    'hero.freeTrial': '14 Günlük Ücretsiz',
    
    // AI Analytics
    'ai.title': 'AI Command Center',
    'ai.subtitle': 'Gerçek zamanlı sosyal medya zekası parmaklarınızın ucunda',
    'ai.analyzing': 'Analiz Ediyor',
    'ai.activeMentions': 'Aktif Bahsetmeler',
    'ai.sentimentScore': 'Duygu Skoru',
    'ai.reach': 'Erişim',
    'ai.viralPotential': 'Viral Potansiyel',
    'ai.globalSentiment': 'Küresel Duygu',
    'ai.viralRadar': 'Viral Radar',
    'ai.liveData': 'Canlı Veri',
    'ai.nextHours': 'Sonraki 6 Saat',
    'ai.categoryAnalysis': 'Kategori Analizi',
    'ai.clickExplore': 'Keşfetmek için tıklayın',
    
    // Features
    'features.title': 'Süper İnsan Öngörüleri',
    'features.subtitle': 'Ham sosyal medya verilerini, son teknoloji AI araçlarımızla eyleme dönüştürülebilir zekaya çevirin',
    
    // Stats
    'stats.title': 'Binlerce Kişi Tarafından Güveniliyor',
    'stats.subtitle': 'Veri odaklı sosyal medya zekası devrimine katılın',
    
    // Pricing
    'pricing.title': 'Planınızı Seçin',
    'pricing.subtitle': 'Ücretsiz başlayın ve büyüdükçe ölçeklendirin. Tüm planlar temel AI zeka özelliklerini içerir.',
    
    // Common
    'common.live': 'CANLI',
    'common.trending': 'TREND',
    'common.predicting': 'TAHMİN EDİYOR',
    'common.positive': 'Pozitif',
    'common.neutral': 'Nötr',
    'common.negative': 'Negatif',
    'common.high': 'Yüksek',
    'common.medium': 'Orta',
    'common.low': 'Düşük',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.socialNews': 'SocialNews',
    'nav.youtubeAnalytics': 'YouTube Analytics',
    'nav.settings': 'Settings',
    
    // Hero Section
    'hero.title': 'AI Social Intelligence',
    'hero.subtitle': 'Catch viral trends, stay ahead of competition, all powered by artificial intelligence',
    'hero.startTrial': 'Start Free Trial',
    'hero.watchDemo': 'Watch Demo',
    'hero.uptime': '99.9% Uptime',
    'hero.noCard': 'No Credit Card',
    'hero.freeTrial': '14-Day Free Trial',
    
    // AI Analytics
    'ai.title': 'AI Command Center',
    'ai.subtitle': 'Real-time social media intelligence at your fingertips',
    'ai.analyzing': 'Analyzing',
    'ai.activeMentions': 'Active Mentions',
    'ai.sentimentScore': 'Sentiment Score',
    'ai.reach': 'Reach',
    'ai.viralPotential': 'Viral Potential',
    'ai.globalSentiment': 'Global Sentiment',
    'ai.viralRadar': 'Viral Radar',
    'ai.liveData': 'Live Data',
    'ai.nextHours': 'Next 6 Hours',
    'ai.categoryAnalysis': 'Category Analysis',
    'ai.clickExplore': 'Click to explore',
    
    // Features
    'features.title': 'Superhuman Insights',
    'features.subtitle': 'Transform raw social media data into actionable intelligence with our cutting-edge AI tools',
    
    // Stats
    'stats.title': 'Trusted by Thousands',
    'stats.subtitle': 'Join the revolution of data-driven social media intelligence',
    
    // Pricing
    'pricing.title': 'Choose Your Plan',
    'pricing.subtitle': 'Start free and scale as you grow. All plans include our core AI intelligence features.',
    
    // Common
    'common.live': 'LIVE',
    'common.trending': 'TRENDING',
    'common.predicting': 'PREDICTING',
    'common.positive': 'Positive',
    'common.neutral': 'Neutral',
    'common.negative': 'Negative',
    'common.high': 'High',
    'common.medium': 'Medium',
    'common.low': 'Low',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<'tr' | 'en'>('tr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'tr' | 'en' | null;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'tr' ? 'en' : 'tr';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const setLanguage = (lang: 'tr' | 'en') => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};