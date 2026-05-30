import type { Activity } from "../types/models";

type ActivityTimelineProps = {
  activities: Activity[];
};

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Activity Timeline</h2>
        <span className="text-sm text-slate-500">{activities.length} entries</span>
      </div>
      <div className="mt-6 space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="relative border-l-2 border-brand-200 pl-5">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-600" />
            <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
            <p className="text-sm text-slate-500">
              {activity.contactName} • {new Date(activity.occurredAtUtc).toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-slate-600">{activity.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
