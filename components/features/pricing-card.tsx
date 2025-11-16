"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 요금제 카드 컴포넌트
 * 
 * @file components/features/pricing-card.tsx
 * @description 요금제 정보를 표시하는 카드
 * 
 * 주요 기능:
 * 1. 요금제 정보 표시
 * 2. 기능 체크리스트
 * 3. 권장 배지
 * 4. CTA 버튼
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - components/ui/button: 버튼 컴포넌트
 * - components/ui/badge: 배지 컴포넌트
 * - lucide-react: 아이콘
 */

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: number;
  period?: string;
  description: string;
  features: PricingFeature[];
  recommended?: boolean;
  ctaText: string;
  ctaHref?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  return (
    <Card
      className={cn(
        "h-full flex flex-col",
        plan.recommended && "border-blue-600 dark:border-blue-400 border-2",
        className
      )}
      role="article"
      aria-label={`${plan.name} 요금제`}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          {plan.recommended && (
            <Badge className="bg-blue-600 text-white" aria-label="권장 요금제">
              권장
            </Badge>
          )}
        </div>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">
            {plan.price === 0 ? "무료" : `${plan.price.toLocaleString()}원`}
          </span>
          {plan.period && (
            <span className="text-muted-foreground ml-2">/{plan.period}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3" role="list" aria-label="기능 목록">
          {plan.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2"
              role="listitem"
            >
              {feature.included ? (
                <Check
                  className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <span className="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
              )}
              <span
                className={cn(
                  "text-sm",
                  feature.included
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600 line-through"
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full"
          variant={plan.recommended ? "default" : "outline"}
          size="lg"
          aria-label={`${plan.name} 요금제 선택하기`}
        >
          <a href={plan.ctaHref || "#"}>{plan.ctaText}</a>
        </Button>
      </CardFooter>
    </Card>
  );
}

