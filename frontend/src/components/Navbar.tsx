type NavbarProps = {
  email?: string | null;
  onSignOut?: () => void;
  onMenuToggle?: () => void;
};

export function Navbar({ email, onSignOut, onMenuToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between max-w-7xl">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-500">TCRM</p>
          <h1 className="text-lg font-semibold text-slate-900">Starter CRM Workspace</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {onMenuToggle ? (
            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden" type="button" onClick={onMenuToggle}>
              <span className="sr-only">Open navigation</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}
          <div className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm text-brand-700 break-words">
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
