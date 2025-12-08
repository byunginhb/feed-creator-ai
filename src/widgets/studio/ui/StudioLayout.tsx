'use client';

import { useState } from 'react';
import { Card } from '@/src/entities/card/model/types';
import { CardPreview } from '@/src/entities/card/ui/CardPreview';
import { UrlInputForm } from '@/src/features/card-create/ui/UrlInputForm';
import { Badge } from 'lucide-react'; // Wait, Badge is usually a component, let me check if I need to make one or check lucide. Badge is an icon in lucide? No. I'll skip icon for now.

export const StudioLayout = () => {
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  // Future: simple state for now, move to context/zustand if complex

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] p-4 gap-6 max-w-7xl mx-auto">
      {/* Left Panel: Controls */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        
        {/* Create Section */}
        <section className="bg-card/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
          <div className="mb-4">
             <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
               Create New
             </h2>
             <p className="text-sm text-muted-foreground">Start from any link</p>
          </div>
          <UrlInputForm onSuccess={setActiveCard} />
        </section>

        {/* Edit Section (Placeholder for now) */}
        {activeCard && (
           <section className="bg-card/30 border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex-1 animate-in fade-in slide-in-from-bottom-4">
             <div className="mb-4">
               <h2 className="text-lg font-medium text-slate-200">Edit Card</h2>
             </div>
             <div className="text-sm text-muted-foreground">
               Editor options will appear here (Tone, Template, Text).
             </div>
           </section>
        )}
      </div>

      {/* Right Panel: Preview */}
      <div className="w-full lg:w-2/3 flex items-center justify-center bg-black/20 rounded-3xl border border-white/5 p-8 lg:p-12 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="w-full max-w-sm relative z-10 transition-all duration-500 ease-out transform">
           <CardPreview card={activeCard} />
        </div>
      </div>
    </div>
  );
};
