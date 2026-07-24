import { Eye, Pencil } from "lucide-react";
import type { Institute } from "../types/institute";
import Badge from "./Badge";

interface InstituteTableProps {
  institutes: Institute[];
  onEdit: (institute: Institute) => void;
}

export default function InstituteTable({
  institutes,
  onEdit,
}: InstituteTableProps){

  
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/70 text-xs font-medium uppercase tracking-wide text-slate-500">
            <th scope="col" className="px-5 py-3.5">
              Institute
            </th>
            <th scope="col" className="px-5 py-3.5">
              City
            </th>
            <th scope="col" className="px-5 py-3.5">
              Phone
            </th>
            <th scope="col" className="px-5 py-3.5">
              Email
            </th>
            <th scope="col" className="px-5 py-3.5">
              Status
            </th>
            <th scope="col" className="px-5 py-3.5 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {institutes.map((institute) => (
            <tr key={institute.id} className="transition-colors hover:bg-slate-50/60">
              <td className="px-5 py-4">
                <p className="font-medium text-slate-900">{institute.name}</p>
                <p className="text-xs text-slate-500">{institute.address}</p>
              </td>
              <td className="px-5 py-4 text-slate-600">{institute.city}</td>
              <td className="px-5 py-4 text-slate-600">{institute.mob}</td>
              <td className="px-5 py-4 text-slate-600">{institute.email}</td>
              <td className="px-5 py-4">
                <Badge tone={institute.active ? "success" : "neutral"}>
                  {institute.active ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    aria-label={`View ${institute.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
      <button
  aria-label={`Edit ${institute.name}`}
  onClick={() => onEdit(institute)}
  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
>
  <Pencil className="h-4 w-4" />
</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
