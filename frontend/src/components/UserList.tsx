import type { User } from "../types/models";

type UserListProps = {
  users: User[];
  selectedUserId?: string | null;
  onSelectUser: (user: User) => void;
  onDeleteUser: (user: User) => Promise<void>;
};

export function UserList({ users, selectedUserId, onSelectUser, onDeleteUser }: UserListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={`border-t border-slate-100 ${selectedUserId === user.id ? "bg-brand-50/60" : ""}`}>
                <td className="px-6 py-4 font-medium text-slate-900">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-slate-600">{new Date(user.createdAtUtc).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => onSelectUser(user)} type="button">
                      Edit
                    </button>
                    <button className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50" onClick={() => void onDeleteUser(user)} type="button">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
