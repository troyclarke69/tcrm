type NavbarProps = {
  email?: string | null;
  onSignOut?: () => void;
};

export function Navbar({ email, onSignOut }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-500">TCRM</p>
          <h1 className="text-lg font-semibold text-slate-900">Starter CRM Workspace</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm text-brand-700">
            {email ?? "Signed out"}
          </div>
          {email && onSignOut ? (
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" type="button" onClick={onSignOut}>
              Sign Out
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
