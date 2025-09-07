import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const PricingSection: React.FC = () => {
  const { theme, getThemeColors } = useTheme();
  const themeColors = getThemeColors();

  const plans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: Sparkles,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      features: [
        '1,000 posts analyzed/month',
        'Basic sentiment analysis',
        '3 trending topics',
        'Email support',
        'Basic dashboard'
      ]
    },
    {
      name: 'Pro',
      price: '29',
      period: 'month',
      description: 'Most popular for growing businesses',
      icon: Zap,
      color: 'from-blue-500 to-purple-600',
      popular: true,
      features: [
        '50,000 posts analyzed/month',
        'Advanced AI predictions',
        'Unlimited trending topics',
        'Real-time alerts',
        'Advanced analytics',
        'API access',
        'Priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: '99',
      period: 'month',
      description: 'For large organizations',
      icon: Crown,
      color: 'from-amber-500 to-orange-600',
      popular: false,
      features: [
        'Unlimited posts analyzed',
        'Custom AI models',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        '24/7 phone support'
      ]
    }
  ];

  return (
    <div className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className={`bg-gradient-to-r ${themeColors.accent} bg-clip-text text-transparent`}>
              Choose Your Plan
            </span>
          </h2>
          <p className={`text-xl ${themeColors.textSecondary} max-w-3xl mx-auto`}>
            Start free and scale as you grow. All plans include our core AI intelligence features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: plan.popular ? 1.05 : 1.02, 
                y: plan.popular ? -10 : -5 
              }}
              className={`relative glassmorphism rounded-3xl p-8 border transition-all duration-300 ${
                plan.popular 
                  ? `border-white/30 ${plan.popular ? 'md:scale-105' : ''} shadow-2xl` 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    🔥 MOST POPULAR
                  </div>
                </motion.div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} shadow-lg mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold ${themeColors.text} mb-2`}>
                  {plan.name}
                </h3>
                
                <p className={`${themeColors.textSecondary} text-sm mb-4`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline justify-center mb-2">
                  <span className={`text-5xl font-bold ${themeColors.text}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-lg ${themeColors.textSecondary} ml-2`}>
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className={`${themeColors.textSecondary} text-sm`}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 text-lg ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                    : `glassmorphism border border-white/20 hover:border-white/40 text-white dark:text-white light:text-gray-900`
                }`}
              >
                {plan.name === 'Free' ? 'Start Free' : `Start ${plan.name} Trial`}
              </motion.button>

              {/* Background Glow for Popular Plan */}
              {plan.popular && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-r ${plan.color} rounded-3xl blur-xl -z-10`}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className={`${themeColors.textSecondary} mb-4`}>
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={themeColors.textSecondary}>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={themeColors.textSecondary}>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className={themeColors.textSecondary}>24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};