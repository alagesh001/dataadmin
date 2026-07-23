import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Dashboard",
    description: "Overview of your institutes and quick actions.",
  },
  "/institutes": {
    title: "All Institutes",
    description: "Manage all your institutes.",
  },
  "/institutes/new": {
    title: "New Institute",
    description: "Add a new institute to your system.",
  },
  "/settings": {
    title: "Settings",
    description: "Configure your application.",
  },
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const meta = pageMeta[location.pathname] ?? pageMeta["/"];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={meta.title}
          description={meta.description}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
