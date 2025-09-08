// N8N Webhook API functions
export const triggerN8NWebhook = async () => {
  try {
    const response = await fetch('https://n8nautomationbolt.app.n8n.cloud/webhook/twitter-collect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'frontend'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text(); // N8N webhooks often return plain text
    return { success: true, data };
  } catch (error) {
    console.error('Error triggering N8N webhook:', error);
    throw error;
  }
};