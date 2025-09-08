// API endpoint to trigger N8N webhook
import type { NextApiRequest, NextApiResponse } from 'next';

const N8N_WEBHOOK_URL = 'https://n8nautomationbolt.app.n8n.cloud/webhook/twitter-collect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Trigger N8N webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trigger: 'api',
        timestamp: new Date().toISOString(),
        data: req.body
      })
    });

    if (!response.ok) {
      throw new Error(`N8N webhook failed: ${response.status}`);
    }

    const result = await response.text();
    
    res.status(200).json({ 
      success: true, 
      message: 'N8N webhook triggered successfully',
      n8nResponse: result
    });

  } catch (error) {
    console.error('Error triggering N8N webhook:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to trigger N8N webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}