'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { Button } from '@/src/shared/ui/button/Button';
import { ModernTemplate } from '@/src/entities/card/ui/templates/ModernTemplate';
import type { Card } from '@/src/entities/card/model/types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Link2,
  Sparkles,
  Download,
  Wand2,
  Globe,
  Zap,
  Clock,
  Share2,
  ChevronRight,
  Play,
} from 'lucide-react';
import { ScrollReveal } from '@/src/shared/ui/animation';

type DemoKey = 'article' | 'video' | 'thread';

const DEMO_CARDS: Record<DemoKey, Card> = {
  article: {
    id: 'landing-demo-article',
    ownerId: 'demo',
    title: '읽을 시간 없을 때, 핵심만 챙기기',
    hook: '긴 글을 "피드용 1장"으로 줄여보세요.',
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
    hook: '"이 영상 뭐가 핵심이야?" 바로 답해요.',
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
      '복잡한 메모나 스레드도 "한 장 요약"이 있으면 기억이 남습니다.\n\n핵심을 정리하고,\n다음 콘텐츠로 재활용하세요.',
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

const STATS = [
  { value: '10초', label: '평균 생성 시간' },
  { value: '1클릭', label: '카드 다운로드' },
  { value: '무료', label: '시작하기' },
];

export const LandingPage = () => {
  const t = useTranslations('landing');
  const [demo, setDemo] = useState<DemoKey>('article');
  const [isHovering, setIsHovering] = useState(false);

  const demoCard = DEMO_CARDS[demo];

  const features = useMemo(
    () => [
      {
        icon: Zap,
        title: t('features.instant.title'),
        description: t('features.instant.description'),
        gradient: 'from-amber-500 to-orange-500',
      },
      {
        icon: Wand2,
        title: t('features.ai.title'),
        description: t('features.ai.description'),
        gradient: 'from-violet-500 to-purple-500',
      },
      {
        icon: Download,
        title: t('features.download.title'),
        description: t('features.download.description'),
        gradient: 'from-emerald-500 to-teal-500',
      },
      {
        icon: Globe,
        title: t('features.multilingual.title'),
        description: t('features.multilingual.description'),
        gradient: 'from-blue-500 to-cyan-500',
      },
    ],
    [t]
  );

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      {/* Hero Section - 임팩트 있는 첫인상 */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* 배경 그래디언트 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-[150px]" />
        </div>

        {/* 그리드 패턴 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 왼쪽: 텍스트 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* 뱃지 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-primary font-medium">{t('hero.badge')}</span>
              </motion.div>

              {/* 메인 헤드라인 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                <span className="block">{t('hero.title')}</span>
              </h1>

              {/* 서브 헤드라인 */}
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                {t('hero.description')}
              </p>

              {/* CTA 버튼 */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/studio">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto gap-2 rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                    >
                      {t('hero.cta')}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
                <a href="#how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto gap-2 rounded-xl px-8 py-6 text-base"
                  >
                    <Play className="w-4 h-4" />
                    {t('hero.learnMore')}
                  </Button>
                </a>
              </div>

              {/* 통계 */}
              <div className="mt-12 flex items-center gap-8">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-center sm:text-left"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 오른쪽: 인터랙티브 데모 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* 글로우 효과 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-2xl opacity-60 animate-pulse-slow" />

              {/* 메인 카드 컨테이너 */}
              <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-2xl">
                {/* 상단 컨트롤 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1 bg-background/60 rounded-lg p-1">
                    {(['article', 'video', 'thread'] as const).map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setDemo(k)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                          k === demo
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
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

                {/* URL 입력 시뮬레이션 */}
                <div className="flex items-center gap-3 bg-background/60 rounded-xl px-4 py-3 mb-6 border border-border/40">
                  <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground font-mono truncate">
                    {demoCard.sourceType === 'url'
                      ? demoCard.sourceUrl
                      : t('homeDemo.sampleText')}
                  </span>
                  <div className="ml-auto shrink-0">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                </div>

                {/* 카드 프리뷰 */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={demo}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        rotateY: isHovering ? 5 : 0,
                        rotateX: isHovering ? -5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="mx-auto max-w-[280px]"
                    >
                      <ModernTemplate card={demoCard} className="shadow-2xl" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* 액션 힌트 */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    PNG 다운로드
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    바로 공유
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 신뢰도 섹션 - 간결한 소셜 프루프 */}
      <section className="py-16 border-y border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">{t('homeTrust.one')}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">{t('homeTrust.two')}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">{t('homeTrust.three')}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features 섹션 - 깔끔한 벤토 그리드 */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t('features.subtitle')}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {t('features.title')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, index) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={f.title} variant="fade-up" delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 h-full overflow-hidden transition-colors hover:border-primary/30"
                  >
                    {/* 호버 시 그래디언트 배경 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} text-white mb-6`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - 심플한 스텝 */}
      <section id="how-it-works" className="py-24 sm:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {t('howItWorks.title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t('howItWorks.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* 연결선 */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
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
              ].map((s, index) => {
                const Icon = s.icon;
                return (
                  <ScrollReveal key={s.step} variant="fade-up" delay={index * 0.15}>
                    <div className="relative text-center">
                      {/* 스텝 넘버 */}
                      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-background border-2 border-primary/20 mb-6 mx-auto">
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                          {s.step}
                        </span>
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {s.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        {s.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal variant="fade-up" delay={0.5}>
            <div className="mt-16 text-center">
              <Link href="/studio">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Button size="lg" className="gap-2 rounded-xl px-8">
                    {t('howItWorks.cta')}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA - 강렬한 마무리 */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal variant="scale">
            <div className="relative rounded-3xl overflow-hidden">
              {/* 배경 */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

              <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {t('cta.title')}
                  </h2>
                  <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                    {t('cta.description')}
                  </p>
                  <Link href="/studio">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="gap-2 rounded-xl px-10 py-6 text-base font-semibold bg-white text-primary hover:bg-white/90 shadow-xl"
                      >
                        {t('cta.button')}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};
