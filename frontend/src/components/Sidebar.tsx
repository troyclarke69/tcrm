import { NavLink } from "react-router-dom";

type SidebarProps = {
  onClose?: () => void;
};

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/contacts", label: "Contacts" },
  { to: "/deals", label: "Deals" },
  { to: "/activities", label: "Activities" },
  { to: "/users", label: "Users" }
];

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-soft lg:sticky lg:top-24 lg:z-0 lg:w-46">
      <div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
        <p className="text-sm font-semibold text-slate-700">Navigation</p>
        {onClose ? (
          <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50" type="button" onClick={onClose}>
            <span className="sr-only">Close navigation</span>
            <svg className="h-5 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M6 6l8 8M14 6l-8 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
