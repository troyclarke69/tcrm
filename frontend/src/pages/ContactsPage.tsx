import { ContactForm, emptyContactFormValues, type ContactFormValues } from "../components/ContactForm";
import { ActivityForm, type ActivityFormValues } from "../components/ActivityForm";
import { ContactList } from "../components/ContactList";
import { DealForm, type DealFormValues } from "../components/DealForm";
import type { Contact, User } from "../types/models";

type ContactsPageProps = {
  contacts: Contact[];
  users: User[];
  selectedContact: Contact | null;
  onCreateContact: (values: ContactFormValues) => Promise<void>;
  onUpdateContact: (contactId: string, values: ContactFormValues) => Promise<void>;
  onDeleteContact: (contact: Contact) => Promise<void>;
  onSelectContact: (contact: Contact) => void;
  onCancelEdit: () => void;
  onCreateDealForContact: (values: DealFormValues) => Promise<void>;
  onCreateActivityForContact: (values: ActivityFormValues) => Promise<void>;
};

export function ContactsPage({
  contacts,
  users,
  selectedContact,
  onCreateContact,
  onUpdateContact,
  onDeleteContact,
  onSelectContact,
  onCancelEdit,
  onCreateDealForContact,
  onCreateActivityForContact
}: ContactsPageProps) {
  const initialValues = selectedContact
    ? {
        firstName: selectedContact.firstName,
        lastName: selectedContact.lastName,
        email: selectedContact.email,
        phone: selectedContact.phone,
        company: selectedContact.company,
        notes: selectedContact.notes
      }
    : emptyContactFormValues;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <ContactForm
          initialValues={initialValues}
          heading={selectedContact ? "Edit Contact" : "New Contact"}
          submitLabel={selectedContact ? "Update Contact" : "Add Contact"}
          onCancel={selectedContact ? onCancelEdit : undefined}
          onSubmit={(values) =>
            selectedContact
              ? onUpdateContact(selectedContact.id, values)
              : onCreateContact(values)
          }
        />
        {selectedContact ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions For {selectedContact.firstName} {selectedContact.lastName}</h2>
            <p className="mt-1 text-sm text-slate-500">Create a deal or activity directly from the selected contact.</p>
            <div className="mt-6 grid gap-6">
              <DealForm
                contacts={contacts}
                initialValues={{
                  title: "",
                  value: "",
                  stage: "Prospect",
                  expectedCloseDateUtc: "",
                  notes: "",
                  contactId: selectedContact.id
                }}
                heading={`New Deal For ${selectedContact.firstName}`}
                submitLabel="Add Deal"
                onSubmit={onCreateDealForContact}
              />
              <ActivityForm
                contacts={contacts}
                users={users}
                initialValues={{
                  title: "",
                  details: "",
                  type: "Note",
                  occurredAtUtc: new Date().toISOString().slice(0, 16),
                  contactId: selectedContact.id,
                  userId: ""
                }}
                heading={`New Activity For ${selectedContact.firstName}`}
                submitLabel="Add Activity"
                onSubmit={onCreateActivityForContact}
              />
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Contact Quick Actions</h2>
            <p className="mt-2 text-sm text-slate-500">
              Choose <span className="font-semibold text-slate-700">Manage</span> beside a contact to create a deal or activity directly from the Contacts page.
            </p>
          </section>
        )}
      </div>

      <ContactList
        contacts={contacts}
        selectedContactId={selectedContact?.id ?? null}
        onSelectContact={onSelectContact}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}
