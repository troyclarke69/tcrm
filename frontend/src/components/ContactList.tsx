import type { Contact } from "../types/models";

type ContactListProps = {
  contacts: Contact[];
  selectedContactId?: string | null;
  onSelectContact: (contact: Contact) => void;
  onDeleteContact: (contact: Contact) => Promise<void>;
};

export function ContactList({
  contacts,
  selectedContactId,
  onSelectContact,
  onDeleteContact
}: ContactListProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Contacts</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Deals</th>
              <th className="px-6 py-3">Activities</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              const isSelected = selectedContactId === contact.id;

              return (
                <tr key={contact.id} className={`border-t border-slate-100 ${isSelected ? "bg-brand-50/60" : ""}`}>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-6 py-4 text-slate-600 whitespace-normal break-words">{contact.company}</td>
                  <td className="px-6 py-4 text-slate-600 whitespace-normal break-words">{contact.email}</td>
                  <td className="px-6 py-4 text-slate-600 whitespace-normal break-words">{contact.dealCount ?? 0}</td>
                  <td className="px-6 py-4 text-slate-600 whitespace-normal break-words">{contact.activityCount ?? 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button className="rounded-xl border border-brand-200 px-3 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-50" onClick={() => onSelectContact(contact)} type="button">
                        Manage
                      </button>
                      <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50" onClick={() => onSelectContact(contact)} type="button">
                        Edit
                      </button>
                      <button className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50" onClick={() => void onDeleteContact(contact)} type="button">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
