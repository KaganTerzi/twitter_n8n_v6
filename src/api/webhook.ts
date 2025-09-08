// N8N Webhook API functions
export const triggerN8NWebhook = async () => {
  try {
    const response = await fetch('/api/trigger-webhook', {
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error triggering N8N webhook:', error);
    throw error;
  }
};