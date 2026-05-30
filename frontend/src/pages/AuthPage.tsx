import { useState } from "react";

type AuthMode = "login" | "register";

type AuthValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthPageProps = {
  error: string | null;
  onLogin: (values: Pick<AuthValues, "email" | "password">) => Promise<void>;
  onRegister: (values: AuthValues) => Promise<void>;
};

const defaultValues: AuthValues = {
  firstName: "",
  lastName: "",
  email: "starter@tcrm.local",
  password: "Password123!"
};

export function AuthPage({ error, onLogin, onRegister }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [values, setValues] = useState(defaultValues);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof AuthValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "login") {
        await onLogin({ email: values.email, password: values.password });
      } else {
        await onRegister(values);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
      <div className="grid w-full gap-6 lg:grid-cols-[1.2fr_0.9fr]">
        <section className="rounded-[2rem] bg-brand-900 p-10 text-white shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200">TCRM</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">Starter CRM for contacts, deals, users, and activities.</h1>
          <p className="mt-4 max-w-xl text-sm text-brand-100">
            Sign in to manage the starter workspace, or register a fresh user to continue building your local CRM demo.
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex gap-2 rounded-2xl bg-slate-100 p-1">
            {(["login", "register"] as AuthMode[]).map((option) => (
              <button
                key={option}
                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${mode === option ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
                type="button"
                onClick={() => setMode(option)}
              >
                {option === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="First name" value={values.firstName} onChange={(e) => update("firstName", e.target.value)} />
                <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Last name" value={values.lastName} onChange={(e) => update("lastName", e.target.value)} />
              </div>
            ) : null}
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" type="email" value={values.email} onChange={(e) => update("email", e.target.value)} />
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Password" type="password" value={values.password} onChange={(e) => update("password", e.target.value)} />
            {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
            <button className="w-full rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700" disabled={submitting} type="submit">
              {submitting ? "Working..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
