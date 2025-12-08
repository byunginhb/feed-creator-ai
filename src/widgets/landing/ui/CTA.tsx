'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/ui/button/Button';
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';

export const CTA = () => {
  const t = useTranslations('landing.cta');

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-violet-600/20 to-primary/20 animate-gradient-shift" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[120px] animate-float delay-2000" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-sm border border-primary/30">
            <Zap className="w-4 h-4" />
            <span>지금 시작하세요</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            <span className="bg-linear-to-r from-foreground via-primary to-violet-600 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>
          
          <p className="mx-auto mt-6 max-w-xl text-xl leading-8 text-muted-foreground mb-10">
            {t('description')}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground">무료</span>
              <span className="text-muted-foreground">시작</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground">AI</span>
              <span className="text-muted-foreground">자동화</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground">10초</span>
              <span className="text-muted-foreground">빠른 생성</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/studio">
              <Button 
                size="lg" 
                className="group relative rounded-full px-10 py-7 text-lg gap-2 overflow-hidden shadow-2xl shadow-primary/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t('button')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};
