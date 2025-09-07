import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSocialData } from '../hooks/useSocialData';

export const TrendRadar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { trendingTopics } = useSocialData();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 130;

    // Convert trending topics to radar points
    const trends = trendingTopics.slice(0, 8).map((topic, index) => ({
      angle: (index * 360) / 8,
      distance: Math.min(topic.mention_count / 50000, 1), // Normalize distance
      intensity: topic.sentiment_score,
      label: topic.topic,
      viralPotential: topic.viral_potential,
    }));

    // Fallback data if no real trends available
    if (trends.length === 0) {
      trends.push(
        { angle: 0, distance: 0.8, intensity: 0.9, label: 'AI Revolution', viralPotential: 95 },
        { angle: 60, distance: 0.6, intensity: 0.7, label: 'Crypto Market', viralPotential: 78 },
        { angle: 120, distance: 0.9, intensity: 0.85, label: 'Space Tech', viralPotential: 88 },
        { angle: 180, distance: 0.4, intensity: 0.6, label: 'Climate Action', viralPotential: 72 },
      );
    }
    let sweepAngle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw radar circles
      for (let i = 1; i <= 4; i++) {
        const radius = (maxRadius * i) / 4;
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw radar lines
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI * 2) / 6;
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * maxRadius,
          centerY + Math.sin(angle) * maxRadius
        );
        ctx.stroke();
      }

      // Draw sweep line
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(sweepAngle) * maxRadius,
        centerY + Math.sin(sweepAngle) * maxRadius
      );
      ctx.stroke();

      // Draw sweep gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, sweepAngle - 0.5, sweepAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Draw trend points
      trends.forEach((trend, index) => {
        const trendAngle = (trend.angle * Math.PI) / 180;
        const x = centerX + Math.cos(trendAngle) * (trend.distance * maxRadius);
        const y = centerY + Math.sin(trendAngle) * (trend.distance * maxRadius);

        // Determine if point is being swept
        const angleDiff = Math.abs(((trendAngle - sweepAngle + Math.PI) % (Math.PI * 2)) - Math.PI);
        const isBeingSwept = angleDiff < 0.5;

        // Point size and color based on viral potential
        const size = 4 + trend.viralPotential * 0.06;
        let color;
        if (trend.viralPotential > 85) {
          color = isBeingSwept ? 'rgba(220, 38, 127, 1)' : 'rgba(220, 38, 127, 0.6)';
        } else if (trend.viralPotential > 70) {
          color = isBeingSwept ? 'rgba(251, 191, 36, 1)' : 'rgba(251, 191, 36, 0.6)';
        } else {
          color = isBeingSwept ? 'rgba(99, 102, 241, 1)' : 'rgba(99, 102, 241, 0.6)';
        }

        // Draw point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add pulse effect for high viral potential
        if (trend.viralPotential > 85 && isBeingSwept) {
          const pulseSize = size + Math.sin(Date.now() * 0.01 + index) * 3;
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw prediction arrows for high potential trends
        if (trend.viralPotential > 80 && isBeingSwept) {
          const arrowX = x + Math.cos(trendAngle + Math.PI / 4) * 15;
          const arrowY = y + Math.sin(trendAngle + Math.PI / 4) * 15;
          
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(arrowX, arrowY);
          ctx.stroke();
          
          // Arrowhead
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(arrowX, arrowY);
          ctx.lineTo(arrowX - 5, arrowY - 3);
          ctx.lineTo(arrowX - 5, arrowY + 3);
          ctx.fill();
        }
      });

      sweepAngle += 0.02;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup if needed
    };
  }, [trendingTopics]);

  return (
    <div className="relative flex items-center justify-center h-80">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full"
      />
      
      {/* Viral Potential Legend */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
          <span className="text-gray-300">High Viral (85%+)</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-300">Medium (70-85%)</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          <span className="text-gray-300">Low (&lt;70%)</span>
        </div>
      </div>

      {/* Prediction indicator */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute top-4 right-4 flex items-center space-x-2"
      >
        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
        <span className="text-xs text-gray-300">PREDICTING</span>
      </motion.div>

      {/* Current trends being analyzed */}
      <div className="absolute top-4 left-4">
        <div className="text-xs text-gray-400 mb-1">Next 6 Hours:</div>
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-semibold text-white"
        >
          AI Revolution
        </motion.div>
      </div>
    </div>
  );
};