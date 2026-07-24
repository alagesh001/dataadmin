import {
  Building2,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import InstituteCard from "../components/InstituteCard";
import InstituteTable from "../components/InstituteTable";
import type { Institute } from "../types/institute";
import EditInstituteDialog from "../components/EditInstituteDialog";
const API_URL = "https://api.oxadmedia.in/api/registerusers";

export default function Institutes() {
  const navigate = useNavigate();
const [editingInstitute, setEditingInstitute] =
  useState<Institute | null>(null);
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend pagination is 0-based
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}?page=${page}`,
          {
    headers: {
      "X-API-TOKEN": "oxad-super-secret-2026",
    },
  }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch institutes: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("API data:", data);

        // Pagination information from Spring Boot
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);

        // Current page records
        const mappedInstitutes: Institute[] = data.content.map(
          (item: any): Institute => ({
            id: item.id,
            gymId: item.gymId,
            name: item.gymname,
            city: item.location || "",
            address: item.location || "",
            mob: item.mob,
            email: "",
            active:
              item.isActive === 1 ||
              item.isActive === 2,
            isLoggedIn: item.isLoggedIn,
            planType: item.planType,
            renewalDate: item.renewalDate,
          })
        );

        setInstitutes(mappedInstitutes);

        console.log(
          "Mapped Institutes:",
          mappedInstitutes
        );
      } catch (err) {
        console.error(
          "Error fetching institutes:",
          err
        );

        setError(
          "Unable to load institutes. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, [page]);

  // Search only the 5 records currently loaded
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return institutes;
    }

    return institutes.filter(
      (institute) =>
        institute.name
          .toLowerCase()
          .includes(query) ||
        institute.city
          .toLowerCase()
          .includes(query) ||
        institute.gymId
          ?.toString()
          .includes(query)
    );
  }, [search, institutes]);

  // Calculate showing range
  const startItem =
    totalElements === 0
      ? 0
      : page * 5 + 1;

  const endItem = Math.min(
    (page + 1) * 5,
    totalElements
  );

  // Reset to first page when searching
  const handleSearch = (
    value: string
  ) => {
    setSearch(value);
    setPage(0);
  };

  return (
    <div className="space-y-6">
{editingInstitute && (
  <EditInstituteDialog
    institute={editingInstitute}
    onClose={() => setEditingInstitute(null)}
    onSaved={(updatedInstitute) => {
      setInstitutes((prev) =>
        prev.map((item) =>
          item.id === updatedInstitute.id
            ? updatedInstitute
            : item
        )
      );

      setEditingInstitute(null);
    }}
  />
)}
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            All Institutes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage all your institutes.
          </p>
        </div>

        <Button
          icon={
            <PlusCircle className="h-4 w-4" />
          }
          onClick={() =>
            navigate("/institutes/new")
          }
        >
          Add Institute
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          value={search}
          onChange={(event) =>
            handleSearch(event.target.value)
          }
          type="text"
          placeholder="Search institutes..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="text-sm text-slate-500">
            Loading institutes...
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <EmptyState
          icon={Building2}
          title="Unable to load institutes"
          description={error}
          action={
            <Button
              variant="secondary"
              onClick={() =>
                window.location.reload()
              }
            >
              Try again
            </Button>
          }
        />
      )}

      {/* No results */}
      {!loading &&
        !error &&
        filtered.length === 0 && (
          <EmptyState
            icon={Building2}
            title="No institutes found"
            description={
              search
                ? "Try a different search term."
                : "No institutes are available."
            }
            action={
              search ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch("");
                    setPage(0);
                  }}
                >
                  Clear search
                </Button>
              ) : (
                <Button
                  icon={
                    <PlusCircle className="h-4 w-4" />
                  }
                  onClick={() =>
                    navigate(
                      "/institutes/new"
                    )
                  }
                >
                  Add Institute
                </Button>
              )
            }
          />
        )}

      {/* Results */}
      {!loading &&
        !error &&
        filtered.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block">
    <InstituteTable
  institutes={filtered}
  onEdit={(institute) =>
    setEditingInstitute(institute)
  }
/>
            </div>

            {/* Mobile / Tablet cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {filtered.map((institute) => (
                <InstituteCard
                  key={institute.id}
                  institute={institute}
                   onEdit={(institute) =>
    setEditingInstitute(institute)
  }
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">

              {/* Showing */}
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                  {startItem}–{endItem}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {totalElements}
                </span>
              </p>

              {/* Controls */}
              <div className="flex items-center gap-2">

                {/* Previous */}
                <button
                  onClick={() =>
                    setPage((p) =>
                      Math.max(0, p - 1)
                    )
                  }
                  disabled={page === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Page number */}
                <span className="px-2 text-sm text-slate-600">
                  Page {page + 1} of{" "}
                  {totalPages}
                </span>

                {/* Next */}
                <button
                  onClick={() =>
                    setPage((p) =>
                      Math.min(
                        totalPages - 1,
                        p + 1
                      )
                    )
                  }
                  disabled={
                    page >=
                    totalPages - 1
                  }
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