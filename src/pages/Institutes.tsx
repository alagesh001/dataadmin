import { Building2, ChevronLeft, ChevronRight, PlusCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import InstituteCard from "../components/InstituteCard";
import InstituteTable from "../components/InstituteTable";
import type { Institute } from "../types/institute";

const MOCK_INSTITUTES: Institute[] = [
  {
    id: 1,
    name: "Oxad Computer Institute",
    address: "12 Lakeview Road",
    city: "Pune",
    phone: "+91 98765 43210",
    email: "contact@oxadcomputer.in",
    active: true,
  },
  {
    id: 2,
    name: "Oxad Spoken English",
    address: "45 Church Street",
    city: "Bengaluru",
    phone: "+91 98450 11223",
    email: "info@oxadspoken.in",
    active: true,
  },
  {
    id: 3,
    name: "Oxad Media",
    address: "8 MG Road",
    city: "Hyderabad",
    phone: "+91 90000 12345",
    email: "hello@oxadmedia.in",
    active: false,
  },
  {
    id: 4,
    name: "Brightpath Academy",
    address: "22 Elm Street",
    city: "Delhi",
    phone: "+91 99887 76655",
    email: "admin@brightpath.edu",
    active: true,
  },
  {
    id: 5,
    name: "Nexus Institute of Design",
    address: "3 Riverside Ave",
    city: "Ahmedabad",
    phone: "+91 91234 56780",
    email: "office@nexusdesign.in",
    active: true,
  },
  {
    id: 6,
    name: "Vertex Coaching Center",
    address: "17 Park Lane",
    city: "Chennai",
    phone: "+91 90111 22334",
    email: "support@vertexcoaching.in",
    active: false,
  },
  {
    id: 7,
    name: "Sunrise Language Academy",
    address: "29 Station Road",
    city: "Mumbai",
    phone: "+91 98220 33445",
    email: "info@sunrisela.in",
    active: true,
  },
];

const PAGE_SIZE = 5;

export default function Institutes() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return MOCK_INSTITUTES;
    return MOCK_INSTITUTES.filter(
      (institute) =>
        institute.name.toLowerCase().includes(query) ||
        institute.city.toLowerCase().includes(query) ||
        institute.email.toLowerCase().includes(query),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">All Institutes</h2>
          <p className="mt-1 text-sm text-slate-500">Manage all your institutes.</p>
        </div>
        <Button icon={<PlusCircle className="h-4 w-4" />} onClick={() => navigate("/institutes/new")}>
          Add Institute
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          type="text"
          placeholder="Search institutes..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No institutes found"
          description="Try a different search term or add a new institute."
          action={
            <Button variant="secondary" onClick={() => setSearch("")}>
              Clear search
            </Button>
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block">
            <InstituteTable institutes={paginated} />
          </div>

          {/* Mobile / tablet cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {paginated.map((institute) => (
              <InstituteCard key={institute.id} institute={institute} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {(currentPage - 1) * PAGE_SIZE + 1}
                {"–"}
                {Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-medium text-slate-700">{filtered.length}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
