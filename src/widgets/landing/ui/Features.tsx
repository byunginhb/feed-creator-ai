'use client';

import { useTranslations } from 'next-intl';
import { Zap, Wand2, Download, Share2, Sparkles, Globe } from 'lucide-react';
import { useState } from 'react';

export const Features = () => {
  const t = useTranslations('landing.features');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Zap,
      title: t('instant.title'),
      description: t('instant.description'),
      gradient: 'from-yellow-500/20 to-orange-500/20',
      iconGradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Wand2,
      title: t('ai.title'),
      description: t('ai.description'),
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconGradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: Download,
      title: t('download.title'),
      description: t('download.description'),
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconGradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Share2,
      title: t('share.title'),
      description: t('share.description'),
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconGradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: Sparkles,
      title: t('templates.title'),
      description: t('templates.description'),
      gradient: 'from-violet-500/20 to-purple-500/20',
      iconGradient: 'from-violet-400 to-purple-500',
    },
    {
      icon: Globe,
      title: t('multilingual.title'),
      description: t('multilingual.description'),
      gradient: 'from-indigo-500/20 to-blue-500/20',
      iconGradient: 'from-indigo-400 to-blue-500',
    },
  ];

  return (
    <div className="py-24 sm:py-32 bg-background relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {t('subtitle')}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient background on hover */}
                <div 
                  className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                />
                
                {/* Icon */}
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${feature.iconGradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
