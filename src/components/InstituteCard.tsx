import { Eye, MapPin, Pencil, Phone, Mail } from "lucide-react";
import type { Institute } from "../types/institute";
import Badge from "./Badge";

interface InstituteCardProps {
  institute: Institute;
}

export default function InstituteCard({ institute }: InstituteCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{institute.name}</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {institute.city}
          </div>
        </div>
        <Badge tone={institute.active ? "success" : "neutral"}>
          {institute.active ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 text-slate-400" />
          {institute.phone}
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-slate-400" />
          {institute.email}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>
    </div>
  );
}
