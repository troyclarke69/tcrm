import type { Activity } from "../types/models";

type ActivityManagerProps = {
  activities: Activity[];
  selectedActivityId?: string | null;
  onSelectActivity?: (activity: Activity) => void;
  onDeleteActivity?: (activity: Activity) => Promise<void>;
};

export function ActivityManager({
  activities,
  selectedActivityId,
  onSelectActivity,
  onDeleteActivity
}: ActivityManagerProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Activity Timeline</h2>
        <span className="text-sm text-slate-500">{activities.length} entries</span>
      </div>
      <div className="mt-6 space-y-5">
        {activities.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-6 text-sm text-slate-500">
            No activities yet.
          </div>
        ) : null}
        {activities.map((activity) => {
          const isSelected = selectedActivityId === activity.id;

          return (
            <div key={activity.id} className={`relative rounded-2xl border-l-2 pl-5 ${isSelected ? "border-brand-500 bg-brand-50/40 px-4 py-4" : "border-brand-200"}`}>
              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-600" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                  <p className="text-sm text-slate-500">
                    {activity.contactName} | {new Date(activity.occurredAtUtc).toLocaleString()}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {activity.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{activity.details}</p>
              {onSelectActivity && onDeleteActivity ? (
                <div className="mt-4 flex gap-2">
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => onSelectActivity(activity)} type="button">
                    Edit
                  </button>
                  <button className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50" onClick={() => void onDeleteActivity(activity)} type="button">
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
