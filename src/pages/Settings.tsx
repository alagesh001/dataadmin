import { Bell, Globe, Moon } from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

interface ToggleRowProps {
  icon: typeof Bell;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function ToggleRow({ icon: Icon, title, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
          checked ? "bg-brand-600" : "bg-slate-200"
        }`}
      >
        <span
          className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function Settings() {
  const [appName, setAppName] = useState("InstituteHub");
  const [defaultCity, setDefaultCity] = useState("Delhi");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");

  const [adminName, setAdminName] = useState("Admin");
  const [email, setEmail] = useState("admin@institutehub.com");

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-500">
          Configure general, profile and application preferences.
        </p>
      </div>

      <SectionCard
        title="General Settings"
        description="Basic information about your organization."
      >
        <div className="space-y-5">
          <Input
            label="Application Name"
            value={appName}
            onChange={(event) => setAppName(event.target.value)}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="Default City"
              value={defaultCity}
              onChange={(event) => setDefaultCity(event.target.value)}
            />
            <Input
              label="Timezone"
              value={timezone}
              onChange={(event) => setTimezone(event.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Profile Settings" description="Your administrator profile.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Admin Name"
            value={adminName}
            onChange={(event) => setAdminName(event.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Application Settings"
        description="Control notifications and appearance."
      >
        <div className="divide-y divide-slate-100">
          <ToggleRow
            icon={Bell}
            title="Notifications"
            description="Receive updates about institute activity."
            checked={notifications}
            onChange={() => setNotifications((v) => !v)}
          />
          <ToggleRow
            icon={Moon}
            title="Dark Mode"
            description="Switch to a darker color theme."
            checked={darkMode}
            onChange={() => setDarkMode((v) => !v)}
          />
        </div>
      </SectionCard>

      <div className="flex justify-end gap-3">
        <Button variant="secondary">Discard</Button>
        <Button icon={<Globe className="h-4 w-4" />}>Save Changes</Button>
      </div>
    </div>
  );
}
