"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExpertCard } from "@/components/features/expert-card";
import { Shield, Lock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 신뢰 구축 섹션 컴포넌트
 * 
 * @file components/sections/trust-section.tsx
 * @description 신뢰를 구축하기 위한 수치, 전문가, 보안 배지를 표시하는 섹션
 * 
 * 주요 기능:
 * 1. 수치 카드 (Counter 애니메이션)
 * 2. 전문가 프로필 카드
 * 3. 보안 배지 (SSL, GDPR)
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - components/features/expert-card: 전문가 카드
 * - lucide-react: 아이콘
 */

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 10000, label: "사용자", suffix: "+" },
  { value: 500, label: "보조기기", suffix: "+" },
  { value: 95, label: "만족도", suffix: "%" },
];

// Counter 애니메이션 훅
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  React.useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(startValue + (target - startValue) * progress);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return { count, ref };
}

function CounterCard({ stat }: { stat: Stat }) {
  const { count, ref } = useCounter(stat.value);

  return (
    <Card ref={ref} className="text-center">
      <CardContent className="p-6">
        <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {count.toLocaleString()}
          {stat.suffix}
        </div>
        <div className="text-lg text-gray-600 dark:text-gray-300">
          {stat.label}
        </div>
      </CardContent>
    </Card>
  );
}

// 임시 전문가 데이터 (실제로는 Supabase에서 가져옴)
const experts = [
  {
    name: "김보조",
    specialties: ["상지 보조기기", "재활 의학"],
    experience_years: 15,
    bio: "15년간 보조기기 분야에서 활동한 전문가입니다.",
    verified: true,
  },
  {
    name: "이도움",
    specialties: ["하지 보조기기", "물리치료"],
    experience_years: 12,
    bio: "하지 보조기기 전문가로 많은 환자들을 도왔습니다.",
    verified: true,
  },
];

export function TrustSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 로그: Trust 섹션 렌더링 정보
  React.useEffect(() => {
    console.group("[TrustSection] 렌더링 정보");
    console.log("수치 카드 개수:", stats.length);
    console.log("전문가 개수:", experts.length);
    console.log("가시성:", isVisible);
    console.groupEnd();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 px-4 bg-white dark:bg-gray-900"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="trust-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          신뢰할 수 있는 서비스
        </h2>

        {/* 수치 카드 */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16",
            "transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          role="list"
          aria-label="서비스 통계"
        >
          {stats.map((stat, index) => (
            <div key={index} role="listitem">
              <CounterCard stat={stat} />
            </div>
          ))}
        </div>

        {/* 전문가 프로필 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            전문가 팀
          </h3>
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto",
              "transition-opacity duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            role="list"
            aria-label="전문가 목록"
          >
            {experts.map((expert, index) => (
              <div key={index} role="listitem">
                <ExpertCard expert={expert} />
              </div>
            ))}
          </div>
        </div>

        {/* 보안 배지 */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-6",
            "transition-opacity duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          role="list"
          aria-label="보안 인증 배지"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
            role="listitem"
          >
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400" aria-hidden="true" />
            <span className="text-sm font-medium">SSL 인증</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
            role="listitem"
          >
            <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-sm font-medium">GDPR 준수</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
            role="listitem"
          >
            <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-medium">보안 인증</span>
          </div>
        </div>
      </div>
    </section>
  );
}

