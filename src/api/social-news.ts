interface TweetData {
  id: string;
  title: string;
  username: string;
  created_at: string;
  timestamp: string;
}

// In-memory storage for demo (use database in production)
let tweetsStorage: TweetData[] = [];

export const handleSocialNewsAPI = async (req: Request): Promise<Response> => {
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const { tweets } = body;
      
      if (tweets) {
        // Add new tweets to storage
        if (Array.isArray(tweets)) {
          tweetsStorage = [...tweetsStorage, ...tweets];
        } else {
          tweetsStorage.push(tweets);
        }
        
        // Keep only last 50 tweets
        tweetsStorage = tweetsStorage.slice(-50);
        
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Tweets saved successfully',
          count: tweetsStorage.length
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'No tweets data provided' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      console.error('Error processing tweets:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else if (req.method === 'GET') {
    // Return stored tweets
    return new Response(JSON.stringify({
      success: true,
      tweets: [...tweetsStorage].reverse(), // Latest first
      count: tweetsStorage.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Method not allowed' 
    }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Allow': 'GET, POST'
      }
    });
  }
};

// Export for use in components
export const getTweets = async (): Promise<TweetData[]> => {
  return [...tweetsStorage].reverse();
};

export const addTweets = (tweets: TweetData | TweetData[]): void => {
  if (Array.isArray(tweets)) {
    tweetsStorage = [...tweetsStorage, ...tweets];
  } else {
    tweetsStorage.push(tweets);
  }
  tweetsStorage = tweetsStorage.slice(-50);
};
