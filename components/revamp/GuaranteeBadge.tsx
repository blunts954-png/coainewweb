import React from "react";
import { ShieldCheck } from "lucide-react";

interface Badge {
  icon: React.ElementType;
  title: string;
  text: string;
}

const GUARANTEES: Record<string, Badge> = {
  audit: {
    icon: ShieldCheck,
    title: "No-Risk Diagnostic",
    text: "If we don't find at least 3 actionable issues that would generate more calls, your audit is free.",
  },
  build: {
    icon: ShieldCheck,
    title: "Delivery Guarantee",
    text: "We launch in 30 days or work for free until it's live. No excuses.",
  },
  automation: {
    icon: ShieldCheck,
    title: "Lead Recovery Guarantee",
    text: "If you don't see reduced missed calls in the first 30 days, we optimize at no cost.",
  },
} as const;

interface GuaranteeBadgeProps {
  type?: "audit" | "build" | "automation";
  customIcon?: React.ElementType;
  customTitle?: string;
  customText?: string;
  compact?: boolean;
}

export function GuaranteeBadge({ type = "audit", customIcon, customTitle, customText, compact }: GuaranteeBadgeProps) {
  const g = GUARANTEES[type];
  const Icon = customIcon || g.icon;
  const title = customTitle || g.title;
  const text = customText || g.text;

  if (compact) {
    return (
      <div className="guarantee-badge-compact">
        <Icon size={16} strokeWidth={2.5} />
        <span>{title}: {text}</span>
      </div>
    );
  }

  return (
    <div className="guarantee-badge">
      <div className="guarantee-badge-icon">
        <Icon size={24} strokeWidth={2.2} />
      </div>
      <div className="guarantee-badge-content">
        <div className="guarantee-badge-title">{title}</div>
        <div className="guarantee-badge-text">{text}</div>
      </div>
    </div>
  );
}
