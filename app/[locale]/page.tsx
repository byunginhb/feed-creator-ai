import { Hero } from '@/src/widgets/landing/ui/Hero';
import { Features } from '@/src/widgets/landing/ui/Features';
import { HowItWorks } from '@/src/widgets/landing/ui/HowItWorks';
import { ExampleCards } from '@/src/widgets/landing/ui/ExampleCards';
import { CTA } from '@/src/widgets/landing/ui/CTA';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <div id="features">
        <Features />
      </div>
      <ExampleCards />
      <HowItWorks />
      <CTA />
    </div>
  );
}

