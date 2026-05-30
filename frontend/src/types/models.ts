export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
  createdAtUtc: string;
  dealCount?: number;
  activityCount?: number;
};

export type Deal = {
  id: string;
  title: string;
  value: number;
  stage: string;
  expectedCloseDateUtc?: string | null;
  notes: string;
  contactId: string;
  contactName: string;
  ownerId?: string | null;
  ownerName?: string | null;
  createdAtUtc: string;
};

export type Activity = {
  id: string;
  title: string;
  details: string;
  type: string;
  occurredAtUtc: string;
  contactId: string;
  contactName: string;
  userId?: string | null;
  userName?: string | null;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAtUtc: string;
};
