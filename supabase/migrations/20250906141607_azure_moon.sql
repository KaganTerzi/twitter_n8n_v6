/*
  # Seed Sample Data for Social Intelligence Platform

  1. Sample Data
    - Insert sample social posts with realistic data
    - Insert trending topics
    - Insert sentiment analytics data
    - Create diverse categories and locations

  2. Data Variety
    - Multiple platforms (Twitter, Instagram, LinkedIn)
    - Different sentiment scores and viral potentials
    - Various categories (Technology, Business, Entertainment, etc.)
    - Global locations for sentiment mapping
*/

-- Insert sample social posts
INSERT INTO social_posts (post_id, platform, author_username, author_name, content, sentiment_score, viral_score, category, likes_count, shares_count, comments_count, reach, engagement_rate, hashtags, mentions, location, posted_at) VALUES
('tweet_001', 'twitter', '@techguru_ai', 'Tech Guru AI', 'The latest breakthrough in AI technology is absolutely mind-blowing! Machine learning is revolutionizing everything we thought we knew about data processing. 🚀 #AI #Innovation #TechTrends', 0.92, 89, 'Technology', 1247, 892, 156, 45000, 0.051, '{"AI", "Innovation", "TechTrends"}', '{}', 'San Francisco, CA', now() - interval '2 minutes'),

('tweet_002', 'twitter', '@futuretech2024', 'Future Tech', 'Breaking: Major AI announcement expected this week from leading tech companies. Industry experts predict significant market impact and potential paradigm shift. Stay tuned! 📈 #Breaking #AI #TechNews', 0.85, 95, 'Technology', 2156, 1439, 287, 78000, 0.049, '{"Breaking", "AI", "TechNews"}', '{}', 'New York, NY', now() - interval '7 minutes'),

('tweet_003', 'twitter', '@innovator_jane', 'Jane Innovator', 'Just attended an incredible technology conference in Silicon Valley. The insights shared today about quantum computing and neural networks will shape the next decade of innovation. Thread below 🧵', 0.88, 72, 'Technology', 845, 567, 89, 32000, 0.047, '{"QuantumComputing", "NeuralNetworks", "Innovation"}', '{}', 'Palo Alto, CA', now() - interval '23 minutes'),

('tweet_004', 'twitter', '@datawhisperer', 'Data Whisperer', 'New research reveals surprising trends in social media behavior. The data tells a story that nobody saw coming - engagement patterns have shifted dramatically post-2024. 📊 Full analysis: bit.ly/data-insights', 0.79, 83, 'Technology', 1567, 934, 234, 56000, 0.049, '{"DataScience", "SocialMedia", "Research"}', '{}', 'Austin, TX', now() - interval '1 hour'),

('tweet_005', 'twitter', '@startupvisionary', 'Startup Visionary', 'Proud to announce our AI startup just raised $50M Series B! Building the future of autonomous systems, one algorithm at a time. The journey has been incredible! 💪 #Startup #Funding #AI', 0.94, 97, 'Business', 3247, 1876, 445, 125000, 0.045, '{"Startup", "Funding", "AI", "SeriesB"}', '{}', 'Boston, MA', now() - interval '3 hours'),

('tweet_006', 'twitter', '@cryptoanalyst', 'Crypto Analyst', 'Bitcoin volatility continues as institutional investors reassess their positions. Market sentiment remains mixed with regulatory uncertainty looming. Technical analysis suggests consolidation phase. 📉', 0.45, 78, 'Business', 892, 445, 178, 34000, 0.045, '{"Bitcoin", "Crypto", "MarketAnalysis"}', '{}', 'Miami, FL', now() - interval '45 minutes'),

('tweet_007', 'twitter', '@entertainmentbuzz', 'Entertainment Buzz', 'The new Marvel movie is breaking all box office records! Fans are absolutely loving the storyline and visual effects. This might be the movie of the year! 🎬✨ #Marvel #BoxOffice #MovieNight', 0.91, 88, 'Entertainment', 5678, 2341, 892, 156000, 0.057, '{"Marvel", "BoxOffice", "MovieNight"}', '{}', 'Los Angeles, CA', now() - interval '1.5 hours'),

('tweet_008', 'twitter', '@sportsanalyst', 'Sports Analyst', 'What a game! The championship finals delivered everything we hoped for and more. The athleticism and strategy displayed tonight will be remembered for years to come. ⚽🏆', 0.89, 76, 'Sports', 2134, 1567, 334, 67000, 0.061, '{"Championship", "Finals", "Sports"}', '{}', 'London, UK', now() - interval '2 hours'),

('tweet_009', 'twitter', '@healthtech_pro', 'HealthTech Pro', 'Revolutionary breakthrough in personalized medicine! New AI-driven diagnostic tools are showing 95% accuracy in early disease detection. This could save millions of lives. 🏥💊', 0.87, 82, 'Health', 1789, 1023, 267, 45000, 0.068, '{"HealthTech", "AI", "Medicine", "Diagnostics"}', '{}', 'Geneva, Switzerland', now() - interval '4 hours'),

('tweet_010', 'twitter', '@climateaction', 'Climate Action', 'Urgent: New climate data shows accelerating changes in global weather patterns. We need immediate action from world leaders and corporations. The time for half-measures is over. 🌍⚠️', 0.68, 72, 'Politics', 3456, 2789, 567, 89000, 0.076, '{"ClimateChange", "Environment", "Urgent"}', '{}', 'Copenhagen, Denmark', now() - interval '6 hours'),

('insta_001', 'instagram', '@lifestyle_guru', 'Lifestyle Guru', 'Morning meditation session complete! ✨ Starting the day with mindfulness and gratitude. The sunrise view from my balcony never gets old. What are you grateful for today? 🧘‍♀️🌅', 0.85, 65, 'Lifestyle', 2345, 456, 123, 23000, 0.127, '{"Meditation", "Mindfulness", "Gratitude"}', '{}', 'Bali, Indonesia', now() - interval '8 hours'),

('linkedin_001', 'linkedin', '@business_leader', 'Business Leader', 'Excited to share that our company has achieved carbon neutrality ahead of schedule! Sustainability is not just good for the planet - it is good for business. Here is how we did it:', 0.82, 71, 'Business', 1234, 789, 156, 34000, 0.064, '{"Sustainability", "CarbonNeutral", "Business"}', '{}', 'Seattle, WA', now() - interval '12 hours');

-- Insert trending topics
INSERT INTO trending_topics (topic, category, mention_count, sentiment_score, viral_potential, growth_rate, peak_time) VALUES
('AI Revolution', 'Technology', 45672, 0.85, 95, 0.23, now() + interval '2 hours'),
('Crypto Market Crash', 'Business', 32145, 0.42, 78, -0.15, now() - interval '1 hour'),
('Space Tourism Launch', 'Technology', 89234, 0.91, 88, 0.34, now() + interval '4 hours'),
('Climate Action Summit', 'Politics', 23456, 0.68, 72, 0.12, now() + interval '6 hours'),
('NFT Art Exhibition', 'Entertainment', 34567, 0.75, 65, 0.08, now() + interval '1 hour'),
('Metaverse Gaming', 'Technology', 56789, 0.82, 82, 0.19, now() + interval '3 hours'),
('Quantum Computing Breakthrough', 'Technology', 12345, 0.89, 91, 0.45, now() + interval '8 hours'),
('Sustainable Fashion Week', 'Lifestyle', 67890, 0.78, 69, 0.16, now() + interval '5 hours');

-- Insert sentiment analytics data
INSERT INTO sentiment_analytics (date, category, location, positive_count, neutral_count, negative_count, average_sentiment) VALUES
(CURRENT_DATE, 'Technology', 'North America', 15420, 8930, 3250, 0.78),
(CURRENT_DATE, 'Technology', 'Europe', 12340, 7650, 2890, 0.76),
(CURRENT_DATE, 'Technology', 'Asia', 18750, 9870, 4120, 0.75),
(CURRENT_DATE, 'Business', 'North America', 8930, 12450, 6780, 0.58),
(CURRENT_DATE, 'Business', 'Europe', 7650, 10230, 5890, 0.56),
(CURRENT_DATE, 'Business', 'Asia', 9870, 13450, 7230, 0.55),
(CURRENT_DATE, 'Entertainment', 'North America', 23450, 5670, 1890, 0.85),
(CURRENT_DATE, 'Entertainment', 'Europe', 19870, 4560, 1230, 0.87),
(CURRENT_DATE, 'Entertainment', 'Asia', 25670, 6780, 2340, 0.83),
(CURRENT_DATE, 'Sports', 'North America', 12340, 8970, 3450, 0.72),
(CURRENT_DATE, 'Sports', 'Europe', 15670, 7890, 2890, 0.76),
(CURRENT_DATE, 'Sports', 'Asia', 11230, 9870, 4560, 0.68),
(CURRENT_DATE, 'Politics', 'North America', 5670, 15430, 12890, 0.45),
(CURRENT_DATE, 'Politics', 'Europe', 6780, 13450, 11230, 0.47),
(CURRENT_DATE, 'Politics', 'Asia', 4560, 12340, 10890, 0.43),
(CURRENT_DATE, 'Health', 'North America', 18970, 6780, 2340, 0.79),
(CURRENT_DATE, 'Health', 'Europe', 16780, 5670, 1890, 0.81),
(CURRENT_DATE, 'Health', 'Asia', 21340, 7890, 3450, 0.77);