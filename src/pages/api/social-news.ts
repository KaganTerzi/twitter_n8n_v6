import { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage for social news data
let socialNewsData: any = null;
let lastUpdated: Date | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('📥 Received data from N8N:', req.body);
      
      // Store the data
      socialNewsData = req.body;
      lastUpdated = new Date();
      
      console.log('✅ Data stored successfully');
      console.log('- Tweets count:', socialNewsData?.count || 0);
      console.log('- User:', socialNewsData?.user || 'unknown');
      console.log('- Processed at:', socialNewsData?.processed_at || 'unknown');
      
      res.status(200).json({ 
        success: true, 
        message: 'Data received and stored successfully',
        count: socialNewsData?.count || 0,
        timestamp: lastUpdated.toISOString()
      });
    } catch (error) {
      console.error('❌ Error processing data:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to process data' 
      });
    }
  } else if (req.method === 'GET') {
    try {
      console.log('📤 Sending stored data to frontend');
      
      if (!socialNewsData) {
        return res.status(404).json({ 
          success: false, 
          message: 'No data available yet',
          data: null 
        });
      }
      
      res.status(200).json({
        success: true,
        data: socialNewsData,
        lastUpdated: lastUpdated?.toISOString(),
        count: socialNewsData?.count || 0
      });
    } catch (error) {
      console.error('❌ Error retrieving data:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to retrieve data' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
