import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Youtube, 
  Search, 
  Download, 
  FileText, 
  Play, 
  Clock, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp,
  BarChart3,
  Users,
  Globe,
  Calendar,
  Hash,
  Zap,
  Brain,
  Target,
  Activity,
  Sparkles,
  Crown,
  Award,
  Filter,
  RefreshCw,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Loader,
  ChevronDown,
  ChevronUp,
  Settings,
  BookOpen,
  Languages,
  Subtitles,
  Volume2,
  Video,
  Share,
  Star,
  MessageSquare,
  Clock,
  Heart,
  Repeat2,
  Eye
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSocialData } from '../hooks/useSocialData';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  channelTitle: string;
  channelId: string;
  tags: string[];
  categoryId: string;
  defaultLanguage?: string;
  captions?: Caption[];
  analytics?: VideoAnalytics;
}

interface Caption {
  text: string;
  start: number;
  duration: number;
  language: string;
}

interface VideoAnalytics {
  sentimentScore: number;
  keyTopics: string[];
  emotionalTone: string;
  engagementRate: number;
  viralPotential: number;
  audienceRetention: number[];
  peakMoments: number[];
  transcriptWordCount: number;
  readingTime: number;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
}

export const YouTubeAnalytics: React.FC = () => {
  const { theme, getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  const { socialPosts } = useSocialData();
  
  const [videoUrl, setVideoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<YouTubeVideo | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<YouTubeVideo[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [extractionStatus, setExtractionStatus] = useState<'idle' | 'extracting' | 'analyzing' | 'complete' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);

  // Mock data for demonstration
  const mockVideo: YouTubeVideo = {
    id: 'dQw4w9WgXcQ',
    title: 'YouTube Secrets: How to Get 100M+ Views',
    description: 'In this video I share all my secrets about YouTube growth and monetization strategies.',
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '15:42',
    viewCount: 1250000,
    likeCount: 45000,
    commentCount: 3200,
    publishedAt: '2024-01-15T10:30:00Z',
    channelTitle: 'YouTube Creator',
    channelId: 'UCxyz123',
    tags: ['YouTube', 'Growth', 'Monetization', 'Creator', 'Tips'],
    categoryId: '28',
    defaultLanguage: 'en',
    captions: [
      { text: 'Welcome to our deep dive into artificial intelligence', start: 0, duration: 3.5, language: 'en' },
      { text: 'Today we\'ll explore how AI is transforming industries', start: 3.5, duration: 4.2, language: 'en' },
      { text: 'From healthcare to finance, AI is everywhere', start: 7.7, duration: 3.8, language: 'en' },
      { text: 'Let\'s start with the basics of machine learning', start: 11.5, duration: 4.1, language: 'en' },
    ],
    analytics: {
      sentimentScore: 0.85,
      keyTopics: ['YouTube Growth', 'Content Creation', 'Monetization', 'Creator Tips', 'Video Strategy'],
      emotionalTone: 'Enthusiastic',
      engagementRate: 8.7,
      viralPotential: 78,
      audienceRetention: [100, 95, 88, 82, 79, 75, 73, 70, 68, 65],
      peakMoments: [120, 340, 580, 720],
      transcriptWordCount: 2450,
      readingTime: 12,
      complexity: 'Intermediate'
    }
  };

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const analyzeVideo = async () => {
    if (!videoUrl.trim()) return;
    
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setErrorMessage('Geçersiz YouTube URL\'si');
      return;
    }

    setIsAnalyzing(true);
    setExtractionStatus('extracting');
    setErrorMessage('');

    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 2000));
      setExtractionStatus('analyzing');
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      setExtractionStatus('complete');
      
      // Use mock data with real captions for demonstration
      const analyzedVideo = { 
        ...mockVideo, 
        id: videoId,
        captions: [
          { text: 'in this video I\'m going to be showing', start: 0, duration: 3.5, language: 'en' },
          { text: 'you how you can get access to all my', start: 1, duration: 4.2, language: 'en' },
          { text: 'YouTube Secrets everything I use to get', start: 3, duration: 3.8, language: 'en' },
          { text: 'over 100 million views a video and the', start: 5, duration: 4.1, language: 'en' },
          { text: 'answer is my brand new website that I', start: 7, duration: 3.2, language: 'en' },
          { text: 'just launched views.com so if you go to', start: 9, duration: 3.8, language: 'en' },
          { text: 'views.com you\'ll see this right here and', start: 11, duration: 4.5, language: 'en' },
          { text: 'this is where I share all my secrets', start: 13, duration: 3.2, language: 'en' },
          { text: 'about YouTube growth and monetization', start: 15, duration: 4.1, language: 'en' },
          { text: 'including my complete course library', start: 17, duration: 3.8, language: 'en' },
          { text: 'with over 50 hours of premium content', start: 19, duration: 4.2, language: 'en' },
          { text: 'that will teach you everything you need', start: 21, duration: 3.5, language: 'en' },
          { text: 'to know about creating viral videos', start: 23, duration: 3.8, language: 'en' },
          { text: 'and building a successful YouTube channel', start: 25, duration: 4.1, language: 'en' },
        ]
      };
      setCurrentVideo(analyzedVideo);
      setAnalysisHistory(prev => [analyzedVideo, ...prev.slice(0, 4)]);
      
    } catch (error) {
      setExtractionStatus('error');
      setErrorMessage('Video analizi sırasında hata oluştu');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.7) return 'text-green-400';
    if (score > 0.4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Basic': return 'from-green-500 to-emerald-500';
      case 'Intermediate': return 'from-yellow-500 to-orange-500';
      case 'Advanced': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="w-full px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent font-extrabold`}>
                  YouTube Analiz
                </span>
              </h1>
              <p className={`text-xl ${themeColors.textSecondary}`}>
                YouTube videolarından altyazı çıkarın ve AI ile analiz edin
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 glassmorphism text-white rounded-xl font-semibold flex items-center space-x-2 border border-white/20"
              >
                <Settings className="w-5 h-5" />
                <span>Ayarlar</span>
              </motion.button>
            </div>
          </div>

          {/* Video URL Input */}
          <div className="glassmorphism rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                  <input
                    type="text"
                    placeholder="YouTube video URL'sini buraya yapıştırın..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 glassmorphism-dark rounded-xl ${themeColors.text} placeholder-gray-400 border border-white/20 focus:border-white/40 transition-all duration-300 text-lg`}
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className={`px-4 py-4 glassmorphism-dark rounded-xl ${themeColors.text} border border-white/20 focus:border-white/40 transition-all duration-300`}
                >
                  <option value="auto">Otomatik Dil</option>
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={analyzeVideo}
                  disabled={isAnalyzing || !videoUrl.trim()}
                  className={`px-8 py-4 bg-gradient-to-r ${themeColors.secondary} text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analiz Ediliyor...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      <span>Analiz Et</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Extraction Status */}
            <AnimatePresence>
              {extractionStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 glassmorphism-dark rounded-xl border border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    {extractionStatus === 'extracting' && (
                      <>
                        <Loader className="w-5 h-5 animate-spin text-blue-400" />
                        <span className="text-blue-400 font-semibold">Altyazılar çıkarılıyor...</span>
                      </>
                    )}
                    {extractionStatus === 'analyzing' && (
                      <>
                        <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
                        <span className="text-purple-400 font-semibold">AI analizi yapılıyor...</span>
                      </>
                    )}
                    {extractionStatus === 'complete' && (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Analiz tamamlandı!</span>
                      </>
                    )}
                    {extractionStatus === 'error' && (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-semibold">{errorMessage}</span>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Current Video Analysis */}
        {currentVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Video Info */}
              <div className="xl:col-span-1">
                <div className="glassmorphism rounded-3xl p-6 border border-white/20 sticky top-24">
                  <div className="relative mb-6">
                    <img
                      src={currentVideo.thumbnail}
                      alt={currentVideo.title}
                      className="w-full h-48 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
                      {currentVideo.duration}
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold ${themeColors.text} mb-3 leading-tight`}>
                    {currentVideo.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Youtube className="w-4 h-4 text-white" />
                    </div>
                    <span className={`font-semibold ${themeColors.text}`}>{currentVideo.channelTitle}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 glassmorphism-dark rounded-xl border border-white/10">
                      <Eye className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">{formatNumber(currentVideo.viewCount)}</div>
                      <div className="text-xs text-gray-400">Görüntülenme</div>
                    </div>
                    <div className="text-center p-3 glassmorphism-dark rounded-xl border border-white/10">
                      <ThumbsUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
                      <div className="text-lg font-bold text-white">{formatNumber(currentVideo.likeCount)}</div>
                      <div className="text-xs text-gray-400">Beğeni</div>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentVideo.tags.slice(0, 5).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="flex-1 py-3 glassmorphism-dark text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Subtitles className="w-4 h-4" />
                      <span>Altyazı</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 glassmorphism-dark text-white rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>İndir</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Analytics Dashboard */}
              <div className="xl:col-span-2">
                <div className="space-y-6">
                  {/* Transcript Section */}
                  <AnimatePresence>
                    {showTranscript && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glassmorphism rounded-3xl p-8 border border-white/20"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className={`text-2xl font-bold ${themeColors.text} flex items-center`}>
                            <Subtitles className="w-6 h-6 mr-3 text-green-400" />
                            Video Altyazısı
                          </h3>
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 glassmorphism-dark text-white rounded-lg font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Kopyala</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 glassmorphism-dark text-white rounded-lg font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2"
                            >
                              <Download className="w-4 h-4" />
                              <span>İndir</span>
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
                          {currentVideo.captions!.map((caption, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`flex items-start space-x-4 p-4 glassmorphism-dark rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300`}
                            >
                              <div className="text-sm text-blue-400 font-mono min-w-[60px]">
                                {formatDuration(Math.floor(caption.start))}
                              </div>
                              <div className={`flex-1 leading-relaxed ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                                {caption.text}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* AI Analytics Overview */}
                  <div className="glassmorphism rounded-3xl p-8 border border-white/20">
                    <h2 className={`text-3xl font-bold ${themeColors.text} mb-8 flex items-center`}>
                      <Brain className="w-8 h-8 mr-3 text-purple-400" />
                      AI Analiz Sonuçları
                    </h2>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      {[
                        { 
                          icon: TrendingUp, 
                          label: 'Duygu Skoru', 
                          value: `${(currentVideo.analytics!.sentimentScore * 100).toFixed(0)}%`, 
                          color: getSentimentColor(currentVideo.analytics!.sentimentScore) 
                        },
                        { 
                          icon: Zap, 
                          label: 'Viral Potansiyel', 
                          value: `${currentVideo.analytics!.viralPotential}%`, 
                          color: 'text-yellow-400' 
                        },
                        { 
                          icon: Users, 
                          label: 'Etkileşim Oranı', 
                          value: `${currentVideo.analytics!.engagementRate}%`, 
                          color: 'text-blue-400' 
                        },
                        { 
                          icon: BookOpen, 
                          label: 'Okuma Süresi', 
                          value: `${currentVideo.analytics!.readingTime} dk`, 
                          color: 'text-green-400' 
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="text-center p-6 glassmorphism-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                          <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Key Topics */}
                    <div className="mb-8">
                      <h3 className={`text-xl font-bold ${themeColors.text} mb-4 flex items-center`}>
                        <Hash className="w-5 h-5 mr-2 text-cyan-400" />
                        Anahtar Konular
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {currentVideo.analytics!.keyTopics.map((topic, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full font-semibold border border-cyan-500/30 cursor-pointer"
                          >
                            {topic}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Complexity & Tone */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-6 glassmorphism-dark rounded-2xl border border-white/10">
                        <h4 className={`text-lg font-bold ${themeColors.text} mb-4 flex items-center`}>
                          <Target className="w-5 h-5 mr-2 text-orange-400" />
                          İçerik Karmaşıklığı
                        </h4>
                        <div className={`inline-flex px-4 py-2 rounded-full bg-gradient-to-r ${getComplexityColor(currentVideo.analytics!.complexity)} text-white font-bold text-lg shadow-lg`}>
                          {currentVideo.analytics!.complexity}
                        </div>
                      </div>
                      
                      <div className="p-6 glassmorphism-dark rounded-2xl border border-white/10">
                        <h4 className={`text-lg font-bold ${themeColors.text} mb-4 flex items-center`}>
                          <Activity className="w-5 h-5 mr-2 text-pink-400" />
                          Duygusal Ton
                        </h4>
                        <div className="text-2xl font-bold text-pink-400">
                          {currentVideo.analytics!.emotionalTone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glassmorphism rounded-3xl p-8 border border-white/20"
          >
            <h2 className={`text-3xl font-bold ${themeColors.text} mb-8 flex items-center`}>
              <Clock className="w-8 h-8 mr-3 text-blue-400" />
              Analiz Geçmişi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisHistory.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setCurrentVideo(video)}
                  className="p-6 glassmorphism-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                      {video.duration}
                    </div>
                  </div>
                  
                  <h3 className={`font-bold ${themeColors.text} mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors`}>
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{video.channelTitle}</span>
                    <span>{formatNumber(video.viewCount)} views</span>
                  </div>
                  
                  {video.analytics && (
                    <div className="flex items-center justify-between">
                      <div className={`text-sm font-semibold ${getSentimentColor(video.analytics.sentimentScore)}`}>
                        {(video.analytics.sentimentScore * 100).toFixed(0)}% Sentiment
                      </div>
                      <div className="text-sm font-semibold text-yellow-400">
                        {video.analytics.viralPotential}% Viral
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features Overview */}
        {!currentVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glassmorphism rounded-3xl p-8 border border-white/20"
          >
            <h2 className={`text-3xl font-bold ${themeColors.text} mb-8 text-center`}>
              <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent`}>
                Güçlü YouTube Analiz Özellikleri
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Subtitles,
                  title: 'Altyazı Çıkarma',
                  description: 'Otomatik olarak video altyazılarını çıkarın ve metin formatında kaydedin',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Brain,
                  title: 'AI Analizi',
                  description: 'Gelişmiş AI ile içerik analizi, duygu analizi ve konu çıkarımı',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: TrendingUp,
                  title: 'Viral Tahmin',
                  description: 'Video içeriğinin viral olma potansiyelini tahmin edin',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: Languages,
                  title: 'Çoklu Dil',
                  description: 'Türkçe, İngilizce ve diğer dillerde altyazı desteği',
                  color: 'from-orange-500 to-red-500'
                },
                {
                  icon: BarChart3,
                  title: 'Detaylı Raporlar',
                  description: 'Kapsamlı analiz raporları ve görselleştirmeler',
                  color: 'from-teal-500 to-cyan-500'
                },
                {
                  icon: Download,
                  title: 'Kolay İndirme',
                  description: 'Altyazıları ve raporları farklı formatlarda indirin',
                  color: 'from-indigo-500 to-purple-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 glassmorphism-dark rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-xl font-bold ${themeColors.text} mb-3 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${feature.color} group-hover:bg-clip-text transition-all duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`${themeColors.textSecondary} text-center leading-relaxed`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Ozan'ın Bugünkü Tweet'leri */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glassmorphism rounded-3xl p-8 border border-white/20"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <MessageSquare className="w-8 h-8 mr-3 text-blue-400" />
              Ozan Şihay'ın Bugünkü Tweet'leri
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Son 24 saat</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {socialPosts
              .filter(post => post.author_username === 'ozan_sihay')
              .filter(post => {
                const tweetDate = new Date(post.posted_at);
                const now = new Date();
                const diffInHours = (now.getTime() - tweetDate.getTime()) / (1000 * 60 * 60);
                return diffInHours <= 24;
              })
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">OŞ</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{post.author_name}</h3>
                        <p className="text-gray-400 text-sm">@{post.author_username}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {new Date(post.posted_at).toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed text-lg">{post.content}</p>
                  
                  {/* Hashtags */}
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.hashtags.map((hashtag, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          #{hashtag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Repeat2 className="w-4 h-4" />
                        <span>{post.shares_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{(post.reach / 1000).toFixed(1)}K</span>
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-green-400 font-semibold">
                        {(post.sentiment_score * 100).toFixed(0)}% Positive
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            }
            
            {socialPosts.filter(post => post.author_username === 'ozan_sihay').length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Bugün henüz tweet paylaşılmamış</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};