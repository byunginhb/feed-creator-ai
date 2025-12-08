'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/ui/button/Button';
import { ArrowRight, Link2, Sparkles, Image, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export const HowItWorks = () => {
  const t = useTranslations('landing.howItWorks');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      step: '1',
      icon: Link2,
      title: t('step1.title'),
      description: t('step1.description'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      step: '2',
      icon: Sparkles,
      title: t('step2.title'),
      description: t('step2.description'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      step: '3',
      icon: Image,
      title: t('step3.title'),
      description: t('step3.description'),
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-border to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              
              return (
                <div
                  key={step.step}
                  className="relative group"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step number badge */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-background rounded-full flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary">{step.step}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-primary bg-card shadow-xl shadow-primary/20 scale-105' 
                      : 'border-border/50 bg-card/30 hover:border-primary/50'
                  }`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`} />
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Check icon on hover */}
                    <div className={`absolute top-4 right-4 transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}>
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Arrow connector (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-6 w-12 h-0.5 bg-linear-to-r from-border to-transparent">
                      <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-border" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <Link href="/studio">
            <Button 
              size="lg" 
              className="group relative rounded-full px-8 py-6 gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
