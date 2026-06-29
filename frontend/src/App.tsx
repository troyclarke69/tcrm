import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { apiClient } from "./api/client";
import type { ActivityFormValues } from "./components/ActivityForm";
import type { ContactFormValues } from "./components/ContactForm";
import type { DealFormValues } from "./components/DealForm";
import type { UserFormValues } from "./components/UserForm";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { AuthPage } from "./pages/AuthPage";
import { ContactsPage } from "./pages/ContactsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DealsPage } from "./pages/DealsPage";
import { UsersPage } from "./pages/UsersPage";
import type { Activity, Contact, Deal, User } from "./types/models";

type AuthResponse = {
  token: string;
  userId: string;
  email: string;
  fullName: string;
};

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedActivityFilter, setSelectedActivityFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    void refreshAllData(token);
  }, [token]);

  async function refreshAllData(authToken: string, contactFilter?: string) {
    try {
      const activityPath = contactFilter
        ? `/activities?contactId=${contactFilter}`
        : "/activities";

      const [contactsResponse, dealsResponse, activitiesResponse, usersResponse] = await Promise.all([
        apiClient.get<Contact[]>("/contacts", authToken),
        apiClient.get<Deal[]>("/deals", authToken),
        apiClient.get<Activity[]>(activityPath, authToken),
        apiClient.get<User[]>("/users", authToken)
      ]);

      setContacts(contactsResponse);
      setDeals(dealsResponse);
      setActivities(activitiesResponse);
      setUsers(usersResponse);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load data");
    }
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const auth = await apiClient.post<AuthResponse>("/auth/login", values);
      setToken(auth.token);
      setEmail(auth.email);
      setError(null);
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed");
    }
  };

  const handleRegister = async (values: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      const auth = await apiClient.post<AuthResponse>("/auth/register", values);
      setToken(auth.token);
      setEmail(auth.email);
      setError(null);
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Registration failed");
    }
  };

  const handleSignOut = () => {
    setToken(null);
    setEmail(null);
    setContacts([]);
    setDeals([]);
    setActivities([]);
    setUsers([]);
    setSelectedContact(null);
    setSelectedDeal(null);
    setSelectedActivity(null);
    setSelectedUser(null);
    setSelectedActivityFilter("");
    setError(null);
  };

  const refreshWithCurrentFilter = async () => {
    if (!token) {
      return;
    }

    await refreshAllData(token, selectedActivityFilter);
  };

  const handleCreateContact = async (values: ContactFormValues) => {
    if (!token) {
      return;
    }

    await apiClient.post("/contacts", values, token);
    await refreshWithCurrentFilter();
  };

  const handleUpdateContact = async (contactId: string, values: ContactFormValues) => {
    if (!token) {
      return;
    }

    await apiClient.put(`/contacts/${contactId}`, values, token);
    setSelectedContact(null);
    await refreshWithCurrentFilter();
  };

  const handleDeleteContact = async (contact: Contact) => {
    if (!token || !window.confirm(`Delete ${contact.firstName} ${contact.lastName}?`)) {
      return;
    }

    await apiClient.delete(`/contacts/${contact.id}`, token);
    if (selectedContact?.id === contact.id) {
      setSelectedContact(null);
    }
    await refreshWithCurrentFilter();
  };

  const handleCreateDeal = async (values: DealFormValues) => {
    if (!token || !values.contactId) {
      return;
    }

    await apiClient.post(
      "/deals",
      {
        title: values.title,
        value: Number(values.value),
        stage: values.stage,
        expectedCloseDateUtc: values.expectedCloseDateUtc
          ? new Date(`${values.expectedCloseDateUtc}T00:00:00Z`).toISOString()
          : null,
        notes: values.notes,
        contactId: values.contactId,
        ownerId: null
      },
      token
    );

    await refreshWithCurrentFilter();
  };

  const handleUpdateDeal = async (dealId: string, values: DealFormValues) => {
    if (!token || !values.contactId) {
      return;
    }

    await apiClient.put(
      `/deals/${dealId}`,
      {
        title: values.title,
        value: Number(values.value),
        stage: values.stage,
        expectedCloseDateUtc: values.expectedCloseDateUtc
          ? new Date(`${values.expectedCloseDateUtc}T00:00:00Z`).toISOString()
          : null,
        notes: values.notes,
        contactId: values.contactId,
        ownerId: null
      },
      token
    );

    setSelectedDeal(null);
    await refreshWithCurrentFilter();
  };

  const handleDeleteDeal = async (deal: Deal) => {
    if (!token || !window.confirm(`Delete deal "${deal.title}"?`)) {
      return;
    }

    await apiClient.delete(`/deals/${deal.id}`, token);
    if (selectedDeal?.id === deal.id) {
      setSelectedDeal(null);
    }
    await refreshWithCurrentFilter();
  };

  const handleCreateActivity = async (values: ActivityFormValues) => {
    if (!token || !values.contactId) {
      return;
    }

    await apiClient.post(
      "/activities",
      {
        title: values.title,
        details: values.details,
        type: values.type,
        occurredAtUtc: new Date(values.occurredAtUtc).toISOString(),
        contactId: values.contactId,
        userId: values.userId || null
      },
      token
    );

    await refreshWithCurrentFilter();
  };

  const handleUpdateActivity = async (activityId: string, values: ActivityFormValues) => {
    if (!token || !values.contactId) {
      return;
    }

    await apiClient.put(
      `/activities/${activityId}`,
      {
        title: values.title,
        details: values.details,
        type: values.type,
        occurredAtUtc: new Date(values.occurredAtUtc).toISOString(),
        contactId: values.contactId,
        userId: values.userId || null
      },
      token
    );

    setSelectedActivity(null);
    await refreshWithCurrentFilter();
  };

  const handleDeleteActivity = async (activity: Activity) => {
    if (!token || !window.confirm(`Delete activity "${activity.title}"?`)) {
      return;
    }

    await apiClient.delete(`/activities/${activity.id}`, token);
    if (selectedActivity?.id === activity.id) {
      setSelectedActivity(null);
    }
    await refreshWithCurrentFilter();
  };

  const handleActivityFilterChange = async (contactId: string) => {
    if (!token) {
      return;
    }

    setSelectedActivity(null);
    setSelectedActivityFilter(contactId);
    await refreshAllData(token, contactId);
  };

  const handleCreateUser = async (values: UserFormValues) => {
    if (!token) {
      return;
    }

    await apiClient.post("/users", values, token);
    await refreshWithCurrentFilter();
  };

  const handleUpdateUser = async (userId: string, values: UserFormValues) => {
    if (!token) {
      return;
    }

    await apiClient.put(`/users/${userId}`, values, token);
    setSelectedUser(null);
    await refreshWithCurrentFilter();
  };

  const handleDeleteUser = async (user: User) => {
    if (!token || !window.confirm(`Delete user "${user.email}"?`)) {
      return;
    }

    await apiClient.delete(`/users/${user.id}`, token);
    if (selectedUser?.id === user.id) {
      setSelectedUser(null);
    }
    await refreshWithCurrentFilter();
  };

  if (!token) {
    return <AuthPage error={error} onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar email={email} onSignOut={handleSignOut} onMenuToggle={() => setIsSidebarOpen(true)} />
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[224px_1fr]">
        <div className="lg:hidden">
          <div className={`fixed inset-y-0 left-0 z-40 w-[calc(100%-2rem)] max-w-xs transform border-r border-slate-200 bg-white p-4 shadow-soft transition duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
          {isSidebarOpen ? (
            <div className="fixed inset-0 z-30 bg-slate-900/40" onClick={() => setIsSidebarOpen(false)} />
          ) : null}
        </div>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="space-y-6">
          <section className="rounded-3xl bg-brand-900 px-6 py-8 text-white shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-200">Starter Kit</p>
            <h2 className="mt-2 text-3xl font-semibold">Manage contacts, deals, and activities in one place.</h2>
            <p className="mt-3 max-w-2xl text-sm text-brand-100">
              This starter UI is wired to the Web API and gives you a foundation for CRM workflows, auth, and AI-assisted follow-up actions.
            </p>
          </section>

          {error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div>
          ) : null}

          <Routes>
            <Route path="/" element={<DashboardPage contacts={contacts} deals={deals} activities={activities} users={users} />} />
            <Route
              path="/contacts"
              element={
                <ContactsPage
                  contacts={contacts}
                  users={users}
                  selectedContact={selectedContact}
                  onCreateContact={handleCreateContact}
                  onUpdateContact={handleUpdateContact}
                  onDeleteContact={handleDeleteContact}
                  onSelectContact={setSelectedContact}
                  onCancelEdit={() => setSelectedContact(null)}
                  onCreateDealForContact={handleCreateDeal}
                  onCreateActivityForContact={handleCreateActivity}
                />
              }
            />
            <Route
              path="/deals"
              element={
                <DealsPage
                  contacts={contacts}
                  deals={deals}
                  selectedDeal={selectedDeal}
                  onCreateDeal={handleCreateDeal}
                  onUpdateDeal={handleUpdateDeal}
                  onDeleteDeal={handleDeleteDeal}
                  onSelectDeal={setSelectedDeal}
                  onCancelEdit={() => setSelectedDeal(null)}
                />
              }
            />
            <Route
              path="/activities"
              element={
                <ActivitiesPage
                  activities={activities}
                  contacts={contacts}
                  users={users}
                  selectedActivity={selectedActivity}
                  selectedContactFilter={selectedActivityFilter}
                  onFilterChange={handleActivityFilterChange}
                  onCreateActivity={handleCreateActivity}
                  onUpdateActivity={handleUpdateActivity}
                  onDeleteActivity={handleDeleteActivity}
                  onSelectActivity={setSelectedActivity}
                  onCancelEdit={() => setSelectedActivity(null)}
                />
              }
            />
            <Route
              path="/users"
              element={
                <UsersPage
                  users={users}
                  selectedUser={selectedUser}
                  onCreateUser={handleCreateUser}
                  onUpdateUser={handleUpdateUser}
                  onDeleteUser={handleDeleteUser}
                  onSelectUser={setSelectedUser}
                  onCancelEdit={() => setSelectedUser(null)}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
