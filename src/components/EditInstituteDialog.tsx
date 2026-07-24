import { useState } from "react";
import type { Institute } from "../types/institute";

interface EditInstituteDialogProps {
  institute: Institute;
  onClose: () => void;
  onSaved: (institute: Institute) => void;
}

const API_URL =
  "https://api.oxadmedia.in/api/registerusers";

export default function EditInstituteDialog({
  institute,
  onClose,
  onSaved,
}: EditInstituteDialogProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(
    institute.isLoggedIn === 1
  );

  const [renewalDate, setRenewalDate] = useState(
    institute.renewalDate || ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const status = isLoggedIn ? 1 : 0;

      // Update login status
      const loginResponse = await fetch(
        `${API_URL}/${institute.id}/login-status?isLoggedIn=${status}`,
        {
          method: "PUT",
        }
      );

      if (!loginResponse.ok) {
        throw new Error(
          `Failed to update login status: ${loginResponse.status}`
        );
      }

      // Update renewal date
      const renewalResponse = await fetch(
        `${API_URL}/${institute.id}/renewupdate?renewalDate=${renewalDate}`,
        {
          method: "PUT",
        }
      );

      if (!renewalResponse.ok) {
        throw new Error(
          `Failed to update renewal date: ${renewalResponse.status}`
        );
      }

      const updatedData = await renewalResponse.json();

      const updatedInstitute: Institute = {
        ...institute,
        isLoggedIn: status,
        renewalDate: updatedData.renewalDate,
      };

      onSaved(updatedInstitute);

    } catch (err) {
      console.error(
        "Error updating institute:",
        err
      );

      setError(
        "Unable to update institute. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Edit Institute
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {institute.name}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={saving}
            className="text-xl text-slate-400 hover:text-slate-700"
          >
            ×
          </button>

        </div>

        {/* Content */}
        <div className="space-y-5 p-5">

          {/* Institute ID */}
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              ID
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {institute.gymId}
            </p>
          </div>

          {/* Login Status */}
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-900">
                Login Status
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {isLoggedIn
                  ? "Institute is currently logged in"
                  : "Institute is currently logged out"}
              </p>
            </div>

            {/* Toggle */}
            <button
              type="button"
              onClick={() =>
                setIsLoggedIn(!isLoggedIn)
              }
              disabled={saving}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isLoggedIn
                  ? "bg-green-500"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isLoggedIn
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>

          {/* Renewal Date */}
          <div>

            <label
              htmlFor="renewalDate"
              className="block text-sm font-medium text-slate-900"
            >
              Renewal Date
            </label>

            <p className="mt-1 text-xs text-slate-500">
              Select the new renewal date for this institute.
            </p>

            <input
              id="renewalDate"
              type="date"
              value={renewalDate}
              onChange={(e) =>
                setRenewalDate(e.target.value)
              }
              disabled={saving}
              className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />

          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">

          <button
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}