import { Eye, MapPin, Pencil, Phone } from "lucide-react";
import type { Institute } from "../types/institute";
import Badge from "./Badge";

interface InstituteCardProps {
  institute: Institute;
   onEdit: (institute: Institute) => void;
}

export default function InstituteCard({ institute, onEdit }: InstituteCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-900">
            {institute.name}
          </p>

          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={14} />
            {institute.city}
          </div>
        </div>

        <Badge tone={institute.active ? "success" : "neutral"}>
          {institute.active ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs text-slate-600">
        <Phone size={14} />
        {institute.mob}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-lg border py-2 text-xs">
          <Eye size={14} className="mr-1 inline" />
          View
        </button>

        <button 
         onClick={() => onEdit(institute)}
        className="flex-1 rounded-lg border py-2 text-xs">
          <Pencil size={14} className="mr-1 inline" />
          Edit
        </button>
      </div>

    </div>
  );
}