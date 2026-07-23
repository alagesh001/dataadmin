import { Building2, PlusCircle, Settings, Sparkles, TrendingUp, Users } from "lucide-react";
import ActionCard from "../components/ActionCard";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome card */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white sm:flex">
            <Sparkles className="h-5.5 w-5.5" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Manage your institutes
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-slate-500 sm:text-base">
              Add, view and manage all your educational institutes from one
              powerful dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ActionCard
            title="All Institutes"
            description="View and manage all your institutes."
            icon={Building2}
            to="/institutes"
            accent="brand"
          />
          <ActionCard
            title="New Institute"
            description="Add a new institute to your system."
            icon={PlusCircle}
            to="/institutes/new"
            accent="emerald"
          />
          <ActionCard
            title="Settings"
            description="Configure your application."
            icon={Settings}
            to="/settings"
            accent="slate"
          />
        </div>
      </section>

      {/* Overview */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Overview
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Institutes" value={0} icon={Building2} accent="brand" />
          <StatCard label="Active Institutes" value={0} icon={TrendingUp} accent="emerald" />
          <StatCard label="New This Month" value={0} icon={Users} accent="amber" />
        </div>
      </section>
    </div>
  );
}
