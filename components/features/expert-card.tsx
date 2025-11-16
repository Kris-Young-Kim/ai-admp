"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 전문가 프로필 카드 컴포넌트
 * 
 * @file components/features/expert-card.tsx
 * @description 전문가 프로필을 표시하는 카드
 * 
 * @dependencies
 * - components/ui/card: 카드 컴포넌트
 * - components/ui/badge: 배지 컴포넌트
 * - lucide-react: 아이콘
 */

interface Expert {
  name: string;
  specialties: string[];
  experience_years: number;
  bio: string;
  profile_image_url?: string;
  verified?: boolean;
}

interface ExpertCardProps {
  expert: Expert;
  className?: string;
}

export function ExpertCard({ expert, className }: ExpertCardProps) {
  return (
    <Card
      className={cn("h-full", className)}
      role="article"
      aria-label={`전문가: ${expert.name}`}
    >
      <CardHeader>
        <div className="flex items-start gap-4">
          {expert.profile_image_url ? (
            <img
              src={expert.profile_image_url}
              alt={expert.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                {expert.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{expert.name}</CardTitle>
              {expert.verified && (
                <CheckCircle2
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
                  aria-label="인증된 전문가"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              경력 {expert.experience_years}년
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {expert.bio}
        </p>
        <div className="flex flex-wrap gap-2">
          {expert.specialties.map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

