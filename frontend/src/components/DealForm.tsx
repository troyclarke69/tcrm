import { useEffect, useState } from "react";
import type { Contact } from "../types/models";

export type DealFormValues = {
  title: string;
  value: string;
  stage: string;
  expectedCloseDateUtc: string;
  notes: string;
  contactId: string;
};

type DealFormProps = {
  contacts: Contact[];
  initialValues?: DealFormValues;
  heading?: string;
  submitLabel?: string;
  onCancel?: () => void;
  onSubmit: (values: DealFormValues) => Promise<void>;
};

export const emptyDealFormValues: DealFormValues = {
  title: "",
  value: "",
  stage: "Prospect",
  expectedCloseDateUtc: "",
  notes: "",
  contactId: ""
};

export function DealForm({
  contacts,
  initialValues = emptyDealFormValues,
  heading = "New Deal",
  submitLabel = "Save Deal",
  onCancel,
  onSubmit
}: DealFormProps) {
  const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(onCancel);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const update = (field: keyof DealFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
      if (!isEditing) {
        setValues(emptyDealFormValues);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">{heading}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Deal title" value={values.title} onChange={(e) => update("title", e.target.value)} />
        <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Value" type="number" value={values.value} onChange={(e) => update("value", e.target.value)} />
        <select className="rounded-2xl border border-slate-200 px-4 py-3" value={values.stage} onChange={(e) => update("stage", e.target.value)}>
          {["Prospect", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        <input className="rounded-2xl border border-slate-200 px-4 py-3" type="date" value={values.expectedCloseDateUtc} onChange={(e) => update("expectedCloseDateUtc", e.target.value)} />
        <select className="rounded-2xl border border-slate-200 px-4 py-3" value={values.contactId} onChange={(e) => update("contactId", e.target.value)}>
          <option value="">Select contact</option>
          {contacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.firstName} {contact.lastName}
            </option>
          ))}
        </select>
        <textarea className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Notes" value={values.notes} onChange={(e) => update("notes", e.target.value)} />
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
