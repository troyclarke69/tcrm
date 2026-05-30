type DashboardCardsProps = {
  contacts: number;
  deals: number;
  activities: number;
  users: number;
};

const cards = [
  { key: "contacts", label: "Contacts" },
  { key: "deals", label: "Deals" },
  { key: "activities", label: "Activities" },
  { key: "users", label: "Users" }
] as const;

export function DashboardCards(props: DashboardCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div key={card.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{props[card.key]}</p>
        </div>
      ))}
    </section>
  );
}
