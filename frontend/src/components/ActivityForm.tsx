import { useEffect, useState } from "react";
import type { Contact, User } from "../types/models";

export type ActivityFormValues = {
  title: string;
  details: string;
  type: string;
  occurredAtUtc: string;
  contactId: string;
  userId: string;
};

type ActivityFormProps = {
  contacts: Contact[];
  users: User[];
  initialValues?: ActivityFormValues;
  heading?: string;
  submitLabel?: string;
  onCancel?: () => void;
  onSubmit: (values: ActivityFormValues) => Promise<void>;
};

export const emptyActivityFormValues: ActivityFormValues = {
  title: "",
  details: "",
  type: "Note",
  occurredAtUtc: new Date().toISOString().slice(0, 16),
  contactId: "",
  userId: ""
};

export function ActivityForm({
  contacts,
  users,
  initialValues = emptyActivityFormValues,
  heading = "New Activity",
  submitLabel = "Save Activity",
  onCancel,
  onSubmit
}: ActivityFormProps) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(onCancel);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const update = (field: keyof ActivityFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
      if (!isEditing) {
        setValues({
          ...emptyActivityFormValues,
          occurredAtUtc: new Date().toISOString().slice(0, 16)
        });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">{heading}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Activity title" value={values.title} onChange={(e) => update("title", e.target.value)} />
        <select className="rounded-2xl border border-slate-200 px-4 py-3" value={values.type} onChange={(e) => update("type", e.target.value)}>
          {["Call", "Email", "Meeting", "Task", "Note"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input className="rounded-2xl border border-slate-200 px-4 py-3" type="datetime-local" value={values.occurredAtUtc} onChange={(e) => update("occurredAtUtc", e.target.value)} />
        <select className="rounded-2xl border border-slate-200 px-4 py-3" value={values.contactId} onChange={(e) => update("contactId", e.target.value)}>
          <option value="">Select contact</option>
          {contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.firstName} {contact.lastName}
            </option>
          ))}
        </select>
        <select className="rounded-2xl border border-slate-200 px-4 py-3" value={values.userId} onChange={(e) => update("userId", e.target.value)}>
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
        <textarea className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Details" value={values.details} onChange={(e) => update("details", e.target.value)} />
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
