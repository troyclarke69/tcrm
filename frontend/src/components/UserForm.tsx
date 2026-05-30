import { useEffect, useState } from "react";

export type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type UserFormProps = {
  initialValues?: UserFormValues;
  heading?: string;
  submitLabel?: string;
  onCancel?: () => void;
  onSubmit: (values: UserFormValues) => Promise<void>;
};

export const emptyUserFormValues: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

export function UserForm({
  initialValues = emptyUserFormValues,
  heading = "New User",
  submitLabel = "Save User",
  onCancel,
  onSubmit
}: UserFormProps) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const update = (field: keyof UserFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
      if (!onCancel) {
        setValues(emptyUserFormValues);
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
        <input className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Email" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} />
        <input className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder={onCancel ? "Password (leave blank to keep current)" : "Password"} type="password" value={values.password} onChange={(e) => update("password", e.target.value)} />
      </div>
      <div className="mt-4 flex gap-3">
        <button className="rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700" disabled={saving} type="submit">
          {saving ? "Saving..." : submitLabel}
        </button>
        {onCancel ? (
          <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
