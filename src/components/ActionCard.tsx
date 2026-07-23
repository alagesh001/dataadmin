import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  accent: "brand" | "emerald" | "slate";
}

const accentClasses: Record<ActionCardProps["accent"], string> = {
  brand: "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white",
  emerald:
    "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  slate: "bg-slate-100 text-slate-600 group-hover:bg-slate-700 group-hover:text-white",
};

export default function ActionCard({
  title,
  description,
  icon: Icon,
  to,
  accent,
}: ActionCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="group flex w-full flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200 ${accentClasses[accent]}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <div className="flex items-center gap-1 text-sm font-medium text-brand-600">
        Go
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </button>
  );
}
