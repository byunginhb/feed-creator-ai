"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Wand2, Zap, Stars } from "lucide-react";

interface GeneratingAnimationProps {
  progress?: number;
}

const steps = [
  "분석 중...",
  "요약 생성 중...",
  "배경 이미지 생성 중...",
  "마무리 중...",
];

export const GeneratingAnimation = ({
  progress = 0,
}: GeneratingAnimationProps) => {
  const t = useTranslations("card");
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const stepIndex = Math.min(
      Math.floor((progress / 100) * steps.length),
      steps.length - 1
    );
    setCurrentStep(stepIndex);

    const targetText = steps[stepIndex];
    let charIndex = 0;
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        setDisplayedText(targetText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [progress, currentStep]);

  return (
    <div className="relative w-full aspect-[9/16] bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border-2 border-primary/50 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-600/30 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse delay-500" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
        {/* Main icon with rotation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
            <Wand2 className="w-12 h-12 text-primary animate-bounce" />
          </div>
        </div>

        {/* Typing text */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">
            {displayedText}
            <span className="animate-blink">|</span>
          </h3>
          <p className="text-sm text-slate-400">{t("generatingMagic")}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mb-6">
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary via-violet-600 to-primary rounded-full transition-all duration-300 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="text-xs text-slate-400 text-center mt-2">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex gap-2 mt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                  : "bg-slate-600"
              }`}
            />
          ))}
        </div>

        {/* Floating icons */}
        <div className="absolute top-8 left-8 animate-float-icon">
          <Sparkles className="w-6 h-6 text-primary/50" />
        </div>
        <div className="absolute top-8 right-8 animate-float-icon delay-500">
          <Zap className="w-6 h-6 text-violet-600/50" />
        </div>
        <div className="absolute bottom-8 left-8 animate-float-icon delay-1000">
          <Stars className="w-6 h-6 text-primary/50" />
        </div>
        <div className="absolute bottom-8 right-8 animate-float-icon delay-1500">
          <Sparkles className="w-6 h-6 text-violet-600/50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(15px) scale(1.5);
            opacity: 0.8;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        @keyframes float-icon {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .animate-float-icon {
          animation: float-icon 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
};
