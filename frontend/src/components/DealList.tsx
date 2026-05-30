import type { Deal } from "../types/models";

type DealListProps = {
  deals: Deal[];
  selectedDealId?: string | null;
  onSelectDeal: (deal: Deal) => void;
  onDeleteDeal: (deal: Deal) => Promise<void>;
};

export function DealList({ deals, selectedDealId, onSelectDeal, onDeleteDeal }: DealListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Deals</h2>
      </div>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        {deals.map((deal) => {
          const isSelected = selectedDealId === deal.id;

          return (
            <article key={deal.id} className={`rounded-3xl border p-5 ${isSelected ? "border-brand-300 bg-brand-50/40" : "border-slate-200"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{deal.title}</h3>
                  <p className="text-sm text-slate-500">{deal.contactName}</p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {deal.stage}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-900">${deal.value.toLocaleString()}</p>
              <p className="mt-3 text-sm text-slate-600">{deal.notes || "No notes yet."}</p>
              <div className="mt-4 flex gap-2">
                <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => onSelectDeal(deal)} type="button">
                  Edit
                </button>
                <button className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50" onClick={() => void onDeleteDeal(deal)} type="button">
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
