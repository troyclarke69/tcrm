import { UserForm, emptyUserFormValues, type UserFormValues } from "../components/UserForm";
import { UserList } from "../components/UserList";
import type { User } from "../types/models";

type UsersPageProps = {
  users: User[];
  selectedUser: User | null;
  onCreateUser: (values: UserFormValues) => Promise<void>;
  onUpdateUser: (userId: string, values: UserFormValues) => Promise<void>;
  onDeleteUser: (user: User) => Promise<void>;
  onSelectUser: (user: User) => void;
  onCancelEdit: () => void;
};

export function UsersPage({
  users,
  selectedUser,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
  onSelectUser,
  onCancelEdit
}: UsersPageProps) {
  const initialValues = selectedUser
    ? {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        password: ""
      }
    : emptyUserFormValues;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr] xl:grid-cols-[0.95fr_1.35fr]">
      <UserForm
        initialValues={initialValues}
        heading={selectedUser ? "Edit User" : "New User"}
        submitLabel={selectedUser ? "Update User" : "Add User"}
        onCancel={selectedUser ? onCancelEdit : undefined}
        onSubmit={(values) => selectedUser ? onUpdateUser(selectedUser.id, values) : onCreateUser(values)}
      />
      <UserList
        users={users}
        selectedUserId={selectedUser?.id ?? null}
        onSelectUser={onSelectUser}
        onDeleteUser={onDeleteUser}
      />
    </div>
  );
}
