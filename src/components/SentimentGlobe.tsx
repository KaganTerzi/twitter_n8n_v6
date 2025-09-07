import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const SentimentGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;

    // Sentiment data points
    const sentimentPoints = [
      { lat: 40.7128, lng: -74.0060, sentiment: 0.8, city: 'New York' }, // Positive
      { lat: 51.5074, lng: -0.1278, sentiment: 0.6, city: 'London' }, // Neutral-Positive
      { lat: 35.6762, lng: 139.6503, sentiment: 0.9, city: 'Tokyo' }, // Very Positive
      { lat: -33.8688, lng: 151.2093, sentiment: 0.7, city: 'Sydney' }, // Positive
      { lat: 55.7558, lng: 37.6173, sentiment: 0.4, city: 'Moscow' }, // Neutral-Negative
      { lat: 28.6139, lng: 77.2090, sentiment: 0.75, city: 'Delhi' }, // Positive
      { lat: -23.5505, lng: -46.6333, sentiment: 0.65, city: 'São Paulo' }, // Neutral-Positive
      { lat: 1.3521, lng: 103.8198, sentiment: 0.85, city: 'Singapore' }, // Very Positive
    ];

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw globe outline
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw latitude lines
      for (let i = -2; i <= 2; i++) {
        const y = centerY + (i * radius / 3);
        const lineRadius = Math.sqrt(radius * radius - (i * radius / 3) ** 2);
        
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, y, lineRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + rotation;
        
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius, radius * 0.3, angle, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw sentiment points
      sentimentPoints.forEach((point, index) => {
        // Convert lat/lng to 3D coordinates and project to 2D
        const phi = (90 - point.lat) * (Math.PI / 180);
        const theta = (point.lng + rotation * 180 / Math.PI) * (Math.PI / 180);

        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY + radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        // Only draw points on the visible side of the globe
        if (z > -radius * 0.3) {
          const size = 6 + point.sentiment * 8;
          const alpha = (z + radius) / (2 * radius);
          
          // Color based on sentiment
          let color;
          if (point.sentiment > 0.7) {
            color = `rgba(34, 197, 94, ${alpha})`; // Green for positive
          } else if (point.sentiment > 0.5) {
            color = `rgba(251, 191, 36, ${alpha})`; // Yellow for neutral
          } else {
            color = `rgba(239, 68, 68, ${alpha})`; // Red for negative
          }

          // Draw point
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = color;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pulsing animation for high sentiment
          if (point.sentiment > 0.8) {
            const pulseSize = size + Math.sin(Date.now() * 0.005 + index) * 3;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      rotation += 0.005;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-80">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
      />
      
      {/* Sentiment Legend */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-300">Positive (70%+)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-300">Neutral (50-70%)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-300">Negative (&lt;50%)</span>
        </div>
      </div>

      {/* Real-time indicator */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-4 right-4 flex items-center space-x-2"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs text-gray-300">LIVE</span>
      </motion.div>
    </div>
  );
};