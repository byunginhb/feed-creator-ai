'use client';

import { useTranslations } from 'next-intl';
import { CardPreview } from '@/src/entities/card/ui/CardPreview';
import { Card } from '@/src/entities/card/model/types';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const ExampleCards = () => {
  const t = useTranslations('landing.examples');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 예시 카드 데이터
  const exampleCards: Card[] = [
    {
      id: 'example-1',
      ownerId: 'demo',
      title: 'AI의 미래',
      hook: '인공지능이 우리의 일상을 어떻게 바꿀까요?',
      summary: 'AI 기술은 빠르게 발전하고 있습니다.\n\n이제 단순한 작업을 넘어 창의적인 영역까지 확장되고 있어요.\n\n앞으로 어떤 변화가 있을지 기대됩니다!',
      sourceType: 'url',
      sourceUrl: 'https://example.com',
      sourceMeta: {
        domain: 'example.com',
      },
      tone: 'professional',
      templateId: 'modern',
      visibility: 'public',
      viewCount: 0,
      shareCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 'example-2',
      ownerId: 'demo',
      title: '생산성 향상 팁',
      hook: '하루를 더 효율적으로 만드는 비밀',
      summary: '작은 습관이 큰 변화를 만듭니다.\n\n명확한 목표 설정과 집중력이 핵심이에요.\n\n오늘부터 시작해보세요!',
      sourceType: 'url',
      sourceUrl: 'https://example.com',
      sourceMeta: {
        domain: 'example.com',
      },
      tone: 'professional',
      templateId: 'modern',
      visibility: 'public',
      viewCount: 0,
      shareCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  return (
    <div className="py-24 sm:py-32 bg-linear-to-b from-background via-card/20 to-background relative overflow-hidden" id="demo">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {exampleCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative flex flex-col items-center justify-center p-8 lg:p-12 bg-card/40 backdrop-blur-sm rounded-3xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both',
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/0 via-primary/5 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
              
              {/* Card preview */}
              <div className="relative w-full max-w-xs transform group-hover:scale-105 transition-transform duration-500">
                <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-violet-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardPreview card={card} />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-violet-600 rounded-full opacity-0 group-hover:opacity-100 animate-ping delay-300" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};
