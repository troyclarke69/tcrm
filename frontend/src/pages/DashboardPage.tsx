import { DashboardCards } from "../components/DashboardCards";
import { ActivityManager } from "../components/ActivityManager";
import type { Activity, Contact, Deal, User } from "../types/models";

type DashboardPageProps = {
  contacts: Contact[];
  deals: Deal[];
  activities: Activity[];
  users: User[];
};

export function DashboardPage({ contacts, deals, activities, users }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <DashboardCards contacts={contacts.length} deals={deals.length} activities={activities.length} users={users.length} />
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] xl:grid-cols-[1.35fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Pipeline Snapshot</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {["Prospect", "Qualified", "Proposal", "Negotiation", "Won", "Lost"].map((stage) => (
              <div key={stage} className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{stage}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {deals.filter((deal) => deal.stage === stage).length}
                </p>
              </div>
            ))}
          </div>
        </section>
        <ActivityManager activities={activities.slice(0, 5)} />
      </div>
    </div>
  );
}
