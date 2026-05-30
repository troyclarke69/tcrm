import { ActivityForm, emptyActivityFormValues, type ActivityFormValues } from "../components/ActivityForm";
import { ActivityManager } from "../components/ActivityManager";
import type { Activity, Contact, User } from "../types/models";

type ActivitiesPageProps = {
  activities: Activity[];
  contacts: Contact[];
  users: User[];
  selectedActivity: Activity | null;
  selectedContactFilter: string;
  onFilterChange: (contactId: string) => void;
  onCreateActivity: (values: ActivityFormValues) => Promise<void>;
  onUpdateActivity: (activityId: string, values: ActivityFormValues) => Promise<void>;
  onDeleteActivity: (activity: Activity) => Promise<void>;
  onSelectActivity: (activity: Activity) => void;
  onCancelEdit: () => void;
};

export function ActivitiesPage({
  activities,
  contacts,
  users,
  selectedActivity,
  selectedContactFilter,
  onFilterChange,
  onCreateActivity,
  onUpdateActivity,
  onDeleteActivity,
  onSelectActivity,
  onCancelEdit
}: ActivitiesPageProps) {
  const initialValues = selectedActivity
    ? {
        title: selectedActivity.title,
        details: selectedActivity.details,
        type: selectedActivity.type,
        occurredAtUtc: selectedActivity.occurredAtUtc.slice(0, 16),
        contactId: selectedActivity.contactId,
        userId: selectedActivity.userId ?? ""
      }
    : emptyActivityFormValues;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Activities</h2>
            <p className="mt-1 text-sm text-slate-500">Use the API-backed timeline to create, edit, delete, and filter follow-ups.</p>
          </div>
          <select className="rounded-2xl border border-slate-200 px-4 py-3 text-sm" value={selectedContactFilter} onChange={(event) => onFilterChange(event.target.value)}>
            <option value="">All contacts</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.firstName} {contact.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <ActivityForm
          contacts={contacts}
          users={users}
          initialValues={initialValues}
          heading={selectedActivity ? "Edit Activity" : "New Activity"}
          submitLabel={selectedActivity ? "Update Activity" : "Add Activity"}
          onCancel={selectedActivity ? onCancelEdit : undefined}
          onSubmit={(values) =>
            selectedActivity
              ? onUpdateActivity(selectedActivity.id, values)
              : onCreateActivity(values)
          }
        />
        <ActivityManager
          activities={activities}
          selectedActivityId={selectedActivity?.id ?? null}
          onSelectActivity={onSelectActivity}
          onDeleteActivity={onDeleteActivity}
        />
      </div>
    </div>
  );
}
