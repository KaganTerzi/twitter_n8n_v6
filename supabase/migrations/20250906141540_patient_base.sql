/*
  # Social Media Intelligence Platform Schema

  1. New Tables
    - `social_posts`
      - `id` (uuid, primary key)
      - `platform` (text) - twitter, instagram, facebook, etc.
      - `post_id` (text, unique) - original platform post ID
      - `author_username` (text)
      - `author_name` (text)
      - `content` (text)
      - `sentiment_score` (decimal) - 0.0 to 1.0
      - `viral_score` (integer) - 0 to 100
      - `category` (text)
      - `likes_count` (integer)
      - `shares_count` (integer)
      - `comments_count` (integer)
      - `reach` (integer)
      - `engagement_rate` (decimal)
      - `hashtags` (text array)
      - `mentions` (text array)
      - `location` (text)
      - `posted_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `trending_topics`
      - `id` (uuid, primary key)
      - `topic` (text, unique)
      - `category` (text)
      - `mention_count` (integer)
      - `sentiment_score` (decimal)
      - `viral_potential` (integer)
      - `growth_rate` (decimal)
      - `peak_time` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_analytics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `total_posts_analyzed` (integer)
      - `favorite_categories` (text array)
      - `last_active` (timestamptz)
      - `preferences` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `sentiment_analytics`
      - `id` (uuid, primary key)
      - `date` (date)
      - `category` (text)
      - `location` (text)
      - `positive_count` (integer)
      - `neutral_count` (integer)
      - `negative_count` (integer)
      - `average_sentiment` (decimal)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Add policies for service role to manage data
*/

-- Create social_posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL DEFAULT 'twitter',
  post_id text UNIQUE NOT NULL,
  author_username text NOT NULL,
  author_name text NOT NULL,
  content text NOT NULL,
  sentiment_score decimal DEFAULT 0.5,
  viral_score integer DEFAULT 0,
  category text DEFAULT 'general',
  likes_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  reach integer DEFAULT 0,
  engagement_rate decimal DEFAULT 0.0,
  hashtags text[] DEFAULT '{}',
  mentions text[] DEFAULT '{}',
  location text,
  posted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trending_topics table
CREATE TABLE IF NOT EXISTS trending_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text UNIQUE NOT NULL,
  category text DEFAULT 'general',
  mention_count integer DEFAULT 0,
  sentiment_score decimal DEFAULT 0.5,
  viral_potential integer DEFAULT 0,
  growth_rate decimal DEFAULT 0.0,
  peak_time timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_analytics table
CREATE TABLE IF NOT EXISTS user_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  total_posts_analyzed integer DEFAULT 0,
  favorite_categories text[] DEFAULT '{}',
  last_active timestamptz DEFAULT now(),
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sentiment_analytics table
CREATE TABLE IF NOT EXISTS sentiment_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date DEFAULT CURRENT_DATE,
  category text DEFAULT 'general',
  location text DEFAULT 'global',
  positive_count integer DEFAULT 0,
  neutral_count integer DEFAULT 0,
  negative_count integer DEFAULT 0,
  average_sentiment decimal DEFAULT 0.5,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentiment_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for social_posts
CREATE POLICY "Anyone can read social posts"
  ON social_posts
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can manage social posts"
  ON social_posts
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for trending_topics
CREATE POLICY "Anyone can read trending topics"
  ON trending_topics
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can manage trending topics"
  ON trending_topics
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for user_analytics
CREATE POLICY "Users can read own analytics"
  ON user_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics"
  ON user_analytics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage user analytics"
  ON user_analytics
  FOR ALL
  TO service_role
  USING (true);

-- Create policies for sentiment_analytics
CREATE POLICY "Anyone can read sentiment analytics"
  ON sentiment_analytics
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Service role can manage sentiment analytics"
  ON sentiment_analytics
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_social_posts_category ON social_posts(category);
CREATE INDEX IF NOT EXISTS idx_social_posts_sentiment ON social_posts(sentiment_score);
CREATE INDEX IF NOT EXISTS idx_social_posts_viral_score ON social_posts(viral_score);
CREATE INDEX IF NOT EXISTS idx_social_posts_posted_at ON social_posts(posted_at);
CREATE INDEX IF NOT EXISTS idx_trending_topics_category ON trending_topics(category);
CREATE INDEX IF NOT EXISTS idx_trending_topics_viral_potential ON trending_topics(viral_potential);
CREATE INDEX IF NOT EXISTS idx_sentiment_analytics_date ON sentiment_analytics(date);
CREATE INDEX IF NOT EXISTS idx_sentiment_analytics_category ON sentiment_analytics(category);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trending_topics_updated_at BEFORE UPDATE ON trending_topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_analytics_updated_at BEFORE UPDATE ON user_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();