import { useEffect, useState } from "react";

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
};

type ContactFormProps = {
  initialValues?: ContactFormValues;
  heading?: string;
  submitLabel?: string;
  onCancel?: () => void;
  onSubmit: (values: ContactFormValues) => Promise<void>;
};

export const emptyContactFormValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  notes: ""
};

export function ContactForm({
  initialValues = emptyContactFormValues,
  heading = "New Contact",
  submitLabel = "Save Contact",
  onCancel,
  onSubmit
}: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(onCancel);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const update = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
      if (!isEditing) {
        setValues(emptyContactFormValues);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">{heading}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="First name" value={values.firstName} onChange={(e) => update("firstName", e.target.value)} />
        <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Last name" value={values.lastName} onChange={(e) => update("lastName", e.target.value)} />
        <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} />
        <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Phone" value={values.phone} onChange={(e) => update("phone", e.target.value)} />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Company" value={values.company} onChange={(e) => update("company", e.target.value)} />
        <textarea className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Notes" value={values.notes} onChange={(e) => update("notes", e.target.value)} />
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="rounded-2xl w-full sm:w-auto bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700" disabled={saving} type="submit">
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel ? (
          <button className="rounded-2xl w-full sm:w-auto border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
