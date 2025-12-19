import { format, parse } from "date-fns";
export type FeeBreakdown = {
  totalCollection: number;
  labFees: number;
  receiptsAfterLab: number;
  providerShareGross: number; // 42% GST-inclusive
  gstComponent: number; // GST to remit (10% of gross)
  providerNetPayable: number; // Amount paid to provider
};

export type BreakdownWithDates = FeeBreakdown & {
  startDate: string;
  endDate: string;
};

export function formatDate(date?: string): string {
  if (!date || date === "") return format(new Date(), "do MMM yyyy");
  return format(parse(date, "yyyy-MM-dd", new Date()), "do MMM yyyy");
}
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    currencySign: "accounting",
  }).format(value);
}

export function calculateProviderFees(
  totalCollection: number,
  labFees: number,
  splitRate = 0.42,
  gstRate = 0.1
): FeeBreakdown {
  if (totalCollection < 0 || labFees < 0) {
    throw new Error("Amounts cannot be negative");
  }

  if (labFees > totalCollection) {
    throw new Error("Lab fees cannot exceed total collection");
  }

  const receiptsAfterLab = round2(totalCollection - labFees);

  // 42% of receipts (GST-inclusive)
  const providerShareGross = round2(receiptsAfterLab * splitRate);

  // Extract GST from the GST-inclusive amount
  const gstComponent = round2(providerShareGross * (gstRate / (1 + gstRate)));

  const providerNetPayable = round2(providerShareGross - gstComponent);

  return {
    totalCollection,
    labFees,
    receiptsAfterLab,
    providerShareGross,
    gstComponent,
    providerNetPayable,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
