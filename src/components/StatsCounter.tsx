import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const StatsCounter: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { 
      value: 15200000, 
      suffix: '+', 
      label: 'Tweets Analyzed',
      color: 'from-blue-400 to-cyan-400',
      prefix: ''
    },
    { 
      value: 94, 
      suffix: '%', 
      label: 'AI Accuracy',
      color: 'from-green-400 to-emerald-400',
      prefix: ''
    },
    { 
      value: 1200, 
      suffix: '+', 
      label: 'Active Users',
      color: 'from-purple-400 to-pink-400',
      prefix: ''
    },
    { 
      value: 99.9, 
      suffix: '%', 
      label: 'Uptime',
      color: 'from-orange-400 to-red-400',
      prefix: ''
    },
  ];

  return (
    <div className="py-12 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="w-96 h-96 border border-white/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 border border-white/5 rounded-full"
          />
        </div>

        <div className="relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Trusted by Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
              Join the revolution of data-driven social media intelligence
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <div className="glassmorphism p-8 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  {/* Animated Counter */}
                  <div className="mb-4">
                    <motion.div
                      className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    >
                      {isInView && (
                        <AnimatedCounter
                          target={stat.value}
                          suffix={stat.suffix}
                          prefix={stat.prefix}
                          delay={index * 0.2}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Label */}
                  <p className="text-gray-300 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </p>

                  {/* Pulse Animation */}
                  <motion.div
                    className={`mt-4 w-12 h-1 bg-gradient-to-r ${stat.color} mx-auto rounded-full`}
                    animate={{
                      scaleX: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>

                {/* Floating Number Effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  <div className={`text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent blur-sm`}>
                    {stat.prefix}{formatNumber(stat.value)}{stat.suffix}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const AnimatedCounter: React.FC<{
  target: number;
  suffix: string;
  prefix: string;
  delay: number;
}> = ({ target, suffix, prefix, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [target, delay]);

  return (
    <>
      {prefix}{formatNumber(count)}{suffix}
    </>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};