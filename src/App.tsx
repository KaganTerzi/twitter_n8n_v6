import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { AIAnalytics } from './components/AIAnalytics';
import { TrendRadar } from './components/TrendRadar';
import { SentimentGlobe } from './components/SentimentGlobe';
import { StatsCounter } from './components/StatsCounter';
import { PricingSection } from './components/PricingSection';
import { ParticleBackground } from './components/ParticleBackground';
import { SocialNews } from './components/SocialNews';
import { YouTubeAnalytics } from './components/YouTubeAnalytics';

function App() {
  const [activeSection, setActiveSection] = useState('landing');

  const renderSection = () => {
    switch (activeSection) {
      case 'landing':
        return (
          <>
            <ParticleBackground />
            <Hero setActiveSection={setActiveSection} />
            <FeatureGrid />
            <AIAnalytics />
            <StatsCounter />
            <PricingSection />
          </>
        );
      case 'dashboard':
        return <AIAnalytics />;
      case 'social-news':
        return <SocialNews />;
      case 'youtube-analytics':
        return <YouTubeAnalytics />;
      case 'settings':
        return (
          <div className="pt-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8">Settings</h1>
              <p>Settings page coming soon...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        {renderSection()}
      </div>
    </ThemeProvider>
  );
}

export default App;