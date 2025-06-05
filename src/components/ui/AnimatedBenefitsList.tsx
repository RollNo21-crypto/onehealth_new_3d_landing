"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/registry/magicui/animated-list";
import { ShieldCheck, Zap, BarChart3, Users, Heart, Globe } from 'lucide-react';
import React from 'react';

interface BenefitItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const benefitIcons: Record<string, React.ReactNode> = {
  "Enhanced Security": <ShieldCheck size={20} />,
  "Increased Efficiency": <Zap size={20} />,
  "Data-Driven Insights": <BarChart3 size={20} />,
  "Improved Collaboration": <Users size={20} />,
  "Better Outcomes": <Heart size={20} />,
  "Global Access": <Globe size={20} />
};

let benefits: BenefitItem[] = [
  {
    name: "Enhanced Security",
    description: "Multi-layered security architecture ensuring patient data remains protected.",
    time: "Key Benefit",
    icon: "🔒",
    color: "#9333EA", // purple
  },
  {
    name: "Increased Efficiency",
    description: "Streamlined workflows reducing administrative burden by up to 40%.",
    time: "Key Benefit",
    icon: "⚡",
    color: "#06B6D4", // cyan
  },
  {
    name: "Data-Driven Insights",
    description: "Advanced analytics transforming raw data into actionable intelligence.",
    time: "Key Benefit",
    icon: "📊",
    color: "#10B981", // emerald
  },
  {
    name: "Improved Collaboration",
    description: "Breaking down silos between departments and organizations.",
    time: "Key Benefit",
    icon: "👥",
    color: "#F97316", // orange
  },
  {
    name: "Better Outcomes",
    description: "Comprehensive patient-centered approach leading to improved health outcomes.",
    time: "Key Benefit",
    icon: "❤️",
    color: "#EC4899", // pink
  },
  {
    name: "Global Access",
    description: "Infrastructure designed to function in diverse environments globally.",
    time: "Key Benefit",
    icon: "🌎",
    color: "#6366F1", // indigo
  },
];

// Duplicate benefits to create a continuous scrolling effect
benefits = [...benefits, ...benefits];

const Benefit = ({ name, description, icon, color, time }: BenefitItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mb-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white backdrop-blur-sm border border-neutral-200 hover:border-primary-500/50 text-neutral-900 shadow-lg",
        // dark styles
        "transform-gpu dark:bg-white/95 dark:backdrop-blur-md dark:border-neutral-200 dark:shadow-xl",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-neutral-900">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-neutral-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-neutral-600">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedBenefitsList({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden",
        className,
      )}
    >
      <AnimatedList speed={25} pauseOnHover={true}>
        {benefits.map((item, idx) => (
          <Benefit {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white to-transparent"></div>
    </div>
  );
}