'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/ui/button/Button';
import { Sparkles, ArrowRight, Zap, TrendingUp } from 'lucide-react';

export const Hero = () => {
  const t = useTranslations('landing.hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative isolate pt-14 overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] animate-pulse delay-1000"
          style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      <div className="py-24 sm:py-32 lg:pb-40 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge with animation */}
            <div className="mb-8 flex justify-center animate-fade-in">
              <div className="group relative rounded-full px-4 py-2 text-sm leading-6 text-foreground ring-1 ring-primary/20 hover:ring-primary/40 transition-all bg-card/50 backdrop-blur-sm">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                  <span className="bg-linear-to-r from-primary to-violet-600 bg-clip-text text-transparent font-semibold">
                    {t('badge')}
                  </span>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </span>
                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/50 to-violet-600/50 opacity-0 group-hover:opacity-100 blur transition-opacity -z-10" />
              </div>
            </div>
            
            {/* Main Heading with gradient animation */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
              <span className="block bg-linear-to-r from-foreground via-primary to-violet-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {t('title')}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-6 text-xl sm:text-2xl leading-8 text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
              {t('description')}
            </p>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm animate-fade-in-up delay-300">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">10초</span>
                <span className="text-muted-foreground">빠른 생성</span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">AI</span>
                <span className="text-muted-foreground">자동 요약</span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">무료</span>
                <span className="text-muted-foreground">시작하기</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
              <Link href="/studio">
                <Button 
                  size="lg" 
                  className="group relative rounded-full text-base px-8 py-6 gap-2 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('cta')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <a 
                href="#demo" 
                className="group text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                {t('learnMore')}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        .delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        .delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
