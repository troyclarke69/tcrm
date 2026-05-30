import { DealForm, emptyDealFormValues, type DealFormValues } from "../components/DealForm";
import { DealList } from "../components/DealList";
import type { Contact, Deal } from "../types/models";

type DealsPageProps = {
  contacts: Contact[];
  deals: Deal[];
  selectedDeal: Deal | null;
  onCreateDeal: (values: DealFormValues) => Promise<void>;
  onUpdateDeal: (dealId: string, values: DealFormValues) => Promise<void>;
  onDeleteDeal: (deal: Deal) => Promise<void>;
  onSelectDeal: (deal: Deal) => void;
  onCancelEdit: () => void;
};

export function DealsPage({
  contacts,
  deals,
  selectedDeal,
  onCreateDeal,
  onUpdateDeal,
  onDeleteDeal,
  onSelectDeal,
  onCancelEdit
}: DealsPageProps) {
  const initialValues = selectedDeal
    ? {
        title: selectedDeal.title,
        value: selectedDeal.value.toString(),
        stage: selectedDeal.stage,
        expectedCloseDateUtc: selectedDeal.expectedCloseDateUtc?.slice(0, 10) ?? "",
        notes: selectedDeal.notes,
        contactId: selectedDeal.contactId
      }
    : emptyDealFormValues;

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
      <DealForm
        contacts={contacts}
        initialValues={initialValues}
        heading={selectedDeal ? "Edit Deal" : "New Deal"}
        submitLabel={selectedDeal ? "Update Deal" : "Add Deal"}
        onCancel={selectedDeal ? onCancelEdit : undefined}
        onSubmit={(values) =>
          selectedDeal
            ? onUpdateDeal(selectedDeal.id, values)
            : onCreateDeal(values)
        }
      />
      <DealList
        deals={deals}
        selectedDealId={selectedDeal?.id ?? null}
        onSelectDeal={onSelectDeal}
        onDeleteDeal={onDeleteDeal}
      />
    </div>
  );
}
