import Link from 'next/link';
import { Button } from '@/src/shared/ui/button/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative isolate pt-14 dark:bg-slate-900">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 flex justify-center">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-400 ring-1 ring-white/10 hover:ring-white/20">
                    <span className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        AI-Powered Content Repurposing
                    </span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-slate-400">
                  Turn URLs into Viral Briefs
                </h1>
                
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Instantly generate beautiful, shareable summary cards from any article, video, or text. Perfect for newsletters, threads, and social feeds.
                </p>
                
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/studio">
                    <Button size="lg" className="rounded-full text-base px-8 py-6 bg-white text-slate-900 hover:bg-slate-200">
                      Create for Free <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="#features" className="text-sm font-semibold leading-6 text-white">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
