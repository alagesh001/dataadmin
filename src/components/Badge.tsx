import type { ReactNode } from "react";

type BadgeTone = "success" | "neutral" | "brand";

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
  brand: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
};

export default function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "success"
            ? "bg-emerald-500"
            : tone === "brand"
              ? "bg-brand-500"
              : "bg-slate-400"
        }`}
      />
      {children}
    </span>
  );
}
