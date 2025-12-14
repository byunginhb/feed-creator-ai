'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/ui/button/Button';
import { ModernTemplate } from '@/src/entities/card/ui/templates/ModernTemplate';
import type { Card } from '@/src/entities/card/model/types';
import {
  ArrowRight,
  Link2,
  Sparkles,
  Download,
  Wand2,
  Globe,
  PanelsTopLeft,
  Check,
} from 'lucide-react';

type DemoKey = 'article' | 'video' | 'thread';

const HERO_ORBS = [
  {
    className:
      'absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[110px] animate-float-slow motion-reduce:animate-none',
    style: { animationDelay: '0s' },
  },
  {
    className:
      'absolute top-10 -right-28 h-[26rem] w-[26rem] rounded-full bg-accent/18 blur-[120px] animate-float-slow motion-reduce:animate-none',
    style: { animationDelay: '1.2s' },
  },
  {
    className:
      'absolute bottom-[-10rem] left-[35%] h-[34rem] w-[34rem] rounded-full bg-rose-500/12 blur-[140px] animate-float-slower motion-reduce:animate-none',
    style: { animationDelay: '0.6s' },
  },
] as const;

const HERO_PARTICLES = [
  { left: '8%', top: '18%', size: 2, delay: '0s', duration: '7s', opacity: 0.35 },
  { left: '22%', top: '8%', size: 3, delay: '1.4s', duration: '9s', opacity: 0.28 },
  { left: '46%', top: '14%', size: 2, delay: '0.8s', duration: '8s', opacity: 0.32 },
  { left: '78%', top: '16%', size: 2, delay: '2.2s', duration: '7.5s', opacity: 0.28 },
  { left: '90%', top: '34%', size: 3, delay: '1.2s', duration: '10s', opacity: 0.22 },
  { left: '12%', top: '52%', size: 2, delay: '2.6s', duration: '8.5s', opacity: 0.26 },
  { left: '62%', top: '58%', size: 2, delay: '0.4s', duration: '9.5s', opacity: 0.24 },
  { left: '84%', top: '64%', size: 2, delay: '3.1s', duration: '8.2s', opacity: 0.3 },
] as const;

const DEMO_CARDS: Record<DemoKey, Card> = {
  article: {
    id: 'landing-demo-article',
    ownerId: 'demo',
    title: '읽을 시간 없을 때, 핵심만 챙기기',
    hook: '긴 글을 “피드용 1장”으로 줄여보세요.',
    summary:
      '콘텐츠는 길어지고, 피드는 빨라졌어요.\n\nFeedCreator는 URL 하나로 핵심을 뽑아 카드 한 장에 담아줍니다.\n\n저장하고, 공유하고, 다시 쓰기 쉽게.',
    sourceType: 'url',
    sourceUrl: 'https://example.com',
    sourceMeta: {
      title: 'Example Article',
      domain: 'example.com',
    },
    tone: 'professional',
    templateId: 'modern',
    visibility: 'public',
    viewCount: 0,
    shareCount: 0,
    createdAt: 0,
    updatedAt: 0,
  },
  video: {
    id: 'landing-demo-video',
    ownerId: 'demo',
    title: '영상 요점만 뽑아서 카드로',
    hook: '“이 영상 뭐가 핵심이야?” 바로 답해요.',
    summary:
      '긴 영상도 결국 중요한 건 몇 줄이에요.\n\n핵심 메시지와 포인트를 요약 카드로 만들고,\n슬라이드처럼 저장해두세요.',
    sourceType: 'url',
    sourceUrl: 'https://example.com',
    sourceMeta: {
      title: 'Example Video',
      domain: 'example.com',
    },
    tone: 'friendly',
    templateId: 'modern',
    visibility: 'public',
    viewCount: 0,
    shareCount: 0,
    createdAt: 0,
    updatedAt: 0,
  },
  thread: {
    id: 'landing-demo-thread',
    ownerId: 'demo',
    title: '스레드/노트 정리도 한 장으로',
    hook: '정리하고 싶은 글, 저장하고 싶은 생각.',
    summary:
      '복잡한 메모나 스레드도 “한 장 요약”이 있으면 기억이 남습니다.\n\n핵심을 정리하고,\n다음 콘텐츠로 재활용하세요.',
    sourceType: 'text',
    sourceUrl: undefined,
    sourceMeta: {
      title: 'Example Thread',
      domain: 'notes',
    },
    tone: 'student',
    templateId: 'modern',
    visibility: 'public',
    viewCount: 0,
    shareCount: 0,
    createdAt: 0,
    updatedAt: 0,
  },
};

export const LandingPage = () => {
  const t = useTranslations('landing');
  const [demo, setDemo] = useState<DemoKey>('article');

  const demoCard = DEMO_CARDS[demo];
  const demoLabel = useMemo(() => {
    switch (demo) {
      case 'article':
        return t('homeDemo.article');
      case 'video':
        return t('homeDemo.video');
      case 'thread':
        return t('homeDemo.thread');
    }
  }, [demo, t]);

  const features = useMemo(
    () => [
      {
        icon: Link2,
        title: t('features.instant.title'),
        description: t('features.instant.description'),
      },
      {
        icon: Wand2,
        title: t('features.ai.title'),
        description: t('features.ai.description'),
      },
      {
        icon: PanelsTopLeft,
        title: t('features.templates.title'),
        description: t('features.templates.description'),
      },
      {
        icon: Download,
        title: t('features.download.title'),
        description: t('features.download.description'),
      },
      {
        icon: Globe,
        title: t('features.multilingual.title'),
        description: t('features.multilingual.description'),
      },
    ],
    [t]
  );
  const marqueeItems = useMemo(
    () => [
      t('features.instant.title'),
      t('features.ai.title'),
      t('features.templates.title'),
      t('features.download.title'),
      t('features.multilingual.title'),
    ],
    [t]
  );

  return (
    <div className="bg-background min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {HERO_ORBS.map((o, idx) => (
            <div key={idx} className={o.className} style={o.style} />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_68%,transparent_115%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)]" />

          <div className="absolute inset-0 overflow-hidden">
            {HERO_PARTICLES.map((p, idx) => (
              <span
                key={idx}
                className="absolute rounded-full bg-primary animate-particle motion-reduce:animate-none"
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: p.opacity,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="pt-16 lg:pt-20 pb-14 lg:pb-18">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 backdrop-blur-md px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">
                    {t('hero.badge')}
                  </span>
                </div>

                <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
                    <span className="block">
                    <span className="bg-linear-to-r from-foreground via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift motion-reduce:animate-none">
                      {t('hero.title')}
                    </span>
                  </span>
                </h1>

                <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground max-w-xl">
                  {t('hero.description')}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/studio">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-primary/40 via-accent/40 to-primary/40 blur opacity-60 animate-gradient-border motion-reduce:animate-none" />
                      <Button
                        size="lg"
                        className="relative gap-2 rounded-2xl px-6 shadow-xl shadow-primary/15"
                      >
                        {t('hero.cta')}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Link>
                  <a href="#features">
                    <Button size="lg" variant="outline" className="gap-2">
                      {t('hero.learnMore')}
                    </Button>
                  </a>
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  {[
                    t('homeBullets.one'),
                    t('homeBullets.two'),
                    t('homeBullets.three'),
                  ].map((line) => (
                    <div
                      key={line}
                      className="group flex items-center gap-2 rounded-2xl border border-border/60 bg-card/25 backdrop-blur-sm px-3 py-2 shadow-sm hover:border-primary/30 transition-colors"
                    >
                      <Check className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-muted-foreground">{line}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-border/60 bg-card/20 backdrop-blur-sm overflow-hidden">
                  <div className="flex w-max gap-3 px-4 py-3 animate-marquee motion-reduce:animate-none">
                    {[...marqueeItems, ...marqueeItems].map((label, idx) => (
                      <span
                        key={`${label}-${idx}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-[2rem] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(245,158,11,0.0),rgba(245,158,11,0.42),rgba(249,115,22,0.42),rgba(245,158,11,0.0))] blur-md opacity-60 animate-rotate-slow motion-reduce:animate-none" />
                  <div className="relative rounded-[2rem] border border-border/60 bg-card/20 backdrop-blur-md p-4 sm:p-5 shadow-2xl shadow-black/10">
                    <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_42%)] pointer-events-none" />
                    <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/5 pointer-events-none" />
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
                    <div className="text-sm font-medium text-foreground">
                      {t('homeDemo.title')}
                    </div>
                    <div className="flex items-center gap-2">
                      {(['article', 'video', 'thread'] as const).map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setDemo(k)}
                          className={[
                            'rounded-full px-3 py-1 text-xs border transition-colors relative',
                            k === demo
                              ? 'border-primary/40 bg-primary/10 text-primary shadow-sm'
                              : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground hover:border-primary/30',
                          ].join(' ')}
                        >
                          {k === 'article'
                            ? t('homeDemo.article')
                            : k === 'video'
                              ? t('homeDemo.video')
                              : t('homeDemo.thread')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                    <div className="rounded-2xl border border-border/60 bg-background/40 p-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(245,158,11,0.12),transparent_45%)] pointer-events-none" />
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">
                          {t('homeDemo.inputLabel')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {demoLabel}
                        </div>
                      </div>
                      <div className="mt-3 rounded-xl border border-border/60 bg-background px-3 py-2 font-mono text-xs text-muted-foreground">
                        {demoCard.sourceType === 'url'
                          ? demoCard.sourceUrl
                          : t('homeDemo.sampleText')}
                      </div>
                      <div className="mt-4 rounded-xl border border-border/60 bg-card/30 p-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] translate-x-[-120%] animate-shimmer motion-reduce:animate-none" />
                        <div className="text-xs font-medium text-foreground">
                          {t('homeDemo.outputHint')}
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground leading-6">
                          {t('homeDemo.outputDescription')}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-background/30 p-3 relative overflow-hidden">
                      <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_20%,rgba(249,115,22,0.18),transparent_55%)] pointer-events-none" />
                      <div className="relative transition-transform duration-500 ease-out will-change-transform hover:scale-[1.02]">
                        <ModernTemplate card={demoCard} className="shadow-none" />
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {t('features.subtitle')}
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {t('features.title')}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-3xl border border-border/60 bg-card/20 backdrop-blur-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_10%,rgba(250,204,21,0.10),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {f.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                  <div className="mt-6 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-60 group-hover:via-primary/40 transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {t('howItWorks.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('howItWorks.subtitle')}
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    icon: Link2,
                    title: t('howItWorks.step1.title'),
                    description: t('howItWorks.step1.description'),
                  },
                  {
                    step: '02',
                    icon: Wand2,
                    title: t('howItWorks.step2.title'),
                    description: t('howItWorks.step2.description'),
                  },
                  {
                    step: '03',
                    icon: Download,
                    title: t('howItWorks.step3.title'),
                    description: t('howItWorks.step3.description'),
                  },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.step}
                      className="rounded-2xl border border-border/60 bg-card/20 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/40">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-muted-foreground">
                              {s.step}
                            </span>
                            <h3 className="text-lg font-semibold text-foreground">
                              {s.title}
                            </h3>
                          </div>
                          <p className="mt-2 text-muted-foreground leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <Link href="/studio">
                  <Button size="lg" className="gap-2">
                    {t('howItWorks.cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-border/60 bg-card/20 p-10 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/18 via-accent/14 to-primary/18 animate-gradient-shift motion-reduce:animate-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.10),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_85%_60%_at_50%_50%,#000_65%,transparent_110%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-background/50 border border-border px-3 py-1 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                {t('cta.title')}
              </div>
              <p className="mt-4 text-xl sm:text-2xl text-muted-foreground max-w-2xl">
                {t('cta.description')}
              </p>
              <div className="mt-7">
                <Link href="/studio">
                  <div className="relative inline-block">
                    <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-primary/40 via-accent/40 to-primary/40 blur opacity-70 animate-gradient-border motion-reduce:animate-none" />
                    <Button size="lg" className="relative gap-2 rounded-2xl px-6">
                      {t('cta.button')}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted-foreground">
                {[
                  t('homeTrust.one'),
                  t('homeTrust.two'),
                  t('homeTrust.three'),
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-3 py-1 backdrop-blur-sm"
                  >
                    <Check className="w-3.5 h-3.5 text-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }

        @keyframes rotate-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotate-slow {
          animation: rotate-slow 10s linear infinite;
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -18px, 0) scale(1.03);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slow 12s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2.8s ease-in-out infinite;
        }

        @keyframes particle {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -14px, 0);
          }
        }
        .animate-particle {
          animation: particle 8s ease-in-out infinite;
        }

        @keyframes gradient-border {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-border {
          background-size: 200% 200%;
          animation: gradient-border 6s ease infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
};
