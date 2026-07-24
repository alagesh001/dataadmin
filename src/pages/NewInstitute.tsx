import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import type {
  CreateInstituteForm,
  CreateInstituteFormErrors,
} from "../types/institute";

const API_URL =
  "https://api.oxadmedia.in/api/registerusers/register";

const EMPTY_FORM: CreateInstituteForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewInstitute() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<CreateInstituteForm>(EMPTY_FORM);

  const [errors, setErrors] =
    useState<CreateInstituteFormErrors>({});

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [apiError, setApiError] =
    useState("");

  function handleChange(
    field: keyof CreateInstituteForm,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setApiError("");
  }

  function validate(): CreateInstituteFormErrors {
    const nextErrors: CreateInstituteFormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Institute name is required.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone =
        "Phone number is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "Email is required.";
    } else if (
      !EMAIL_REGEX.test(form.email.trim())
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (!form.city.trim()) {
      nextErrors.city =
        "City is required.";
    }

    return nextErrors;
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const nextErrors = validate();

    if (
      Object.keys(nextErrors).length > 0
    ) {
      setErrors(nextErrors);
      setShowSuccess(false);
      return;
    }

    try {
      setLoading(true);
      setApiError("");
      setShowSuccess(false);

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
                    "X-API-TOKEN": "oxad-super-secret-2026",

          },

          body: JSON.stringify({
            owner: form.name.trim(),

            gymname:
              form.name.trim(),

            location:
              form.city.trim(),

            email:
              form.email.trim(),

            mob:
              Number(form.phone),

            plantype: 1,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create institute"
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to create institute"
        );
      }

      console.log(
        "Institute created:",
        data
      );

      setForm(EMPTY_FORM);
      setErrors({});
      setShowSuccess(true);

    } catch (error) {
      console.error(
        "Error creating institute:",
        error
      );

      setApiError(
        error instanceof Error
          ? error.message
          : "Unable to create institute. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Add New Institute
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the details of your new institute.
        </p>
      </div>

      {showSuccess && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">

          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />

          Institute created successfully.

        </div>
      )}

      {apiError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {apiError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <Input
          label="Institute Name"
          placeholder="e.g. Oxad Computer Institute"
          value={form.name}
          onChange={(event) =>
            handleChange(
              "name",
              event.target.value
            )
          }
          error={errors.name}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <Input
            label="Phone Number"
            placeholder="9876543210"
            value={form.phone}
            onChange={(event) =>
              handleChange(
                "phone",
                event.target.value
              )
            }
            error={errors.phone}
          />

          <Input
            label="Email"
            type="email"
            placeholder="contact@institute.com"
            value={form.email}
            onChange={(event) =>
              handleChange(
                "email",
                event.target.value
              )
            }
            error={errors.email}
          />

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          <Input
            label="City"
            placeholder="e.g. Pune"
            value={form.city}
            onChange={(event) =>
              handleChange(
                "city",
                event.target.value
              )
            }
            error={errors.city}
          />

          <Input
            label="Address"
            placeholder="Street, area"
            value={form.address}
            onChange={(event) =>
              handleChange(
                "address",
                event.target.value
              )
            }
          />

        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setForm(EMPTY_FORM);
              setErrors({});
              setShowSuccess(false);
              navigate("/institutes");
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Institute"}
          </Button>

        </div>

      </form>
    </div>
  );
}