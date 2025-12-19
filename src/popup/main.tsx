import React from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { InvoicePdf } from "./invoice";
import {
  BreakdownWithDates,
  calculateProviderFees,
  formatCurrency,
} from "./calculator";

export async function downloadFeesPdf(data: BreakdownWithDates) {
  const blob = await pdf(<InvoicePdf {...data} />).toBlob();
  const url = URL.createObjectURL(blob);

  try {
    await chrome.downloads.download({
      url,
      filename: "fees-summary.pdf",
      saveAs: true,
    });
  } catch (error) {
    console.error(error);
    alert("Error generating PDF");
  } finally {
    URL.revokeObjectURL(url);
  }
}

type FormData = {
  startDate: string;
  endDate: string;
  totalCollection: string;
  labFees: string;
};
function App() {
  const [result, setResult] = React.useState<BreakdownWithDates | null>(null);
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const result = calculateProviderFees(+data.totalCollection, +data.labFees);
    setResult({ ...result, startDate: data.startDate, endDate: data.endDate });
  };
  return (
    <div style={{ fontFamily: "system-ui", padding: 12, width: 260 }}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="label-text">Start Date</span>
          <input
            type="date"
            required
            className="input-num"
            {...register("startDate")}
          />
        </label>
        <label>
          <span className="label-text">End Date</span>
          <input
            type="date"
            required
            className="input-num"
            {...register("endDate")}
          />
        </label>
        <label>
          <span className="label-text">Total Collection</span>
          <input
            className="input-num"
            type="number"
            required
            step="0.01"
            {...register("totalCollection")}
          />
        </label>
        <label>
          <span className="label-text">Lab Fees</span>
          <input
            type="number"
            step="0.01"
            required
            className="input-num"
            {...register("labFees")}
          />
        </label>
        <button className="submit-btn" type="submit">
          Calculate
        </button>
      </form>
      {result && (
        <div className="result-container">
          <dl className="result-list">
            <dt>Receipts After Lab</dt>
            <dd className="result-value">
              {formatCurrency(result.receiptsAfterLab)}
            </dd>
            <dt>Provider Share 42%</dt>
            <dd className="result-value">
              {formatCurrency(result.providerShareGross)}
            </dd>
            <dt>GST Withheld</dt>
            <dd className="result-value">
              {formatCurrency(0 - result.gstComponent)}
            </dd>
            <dt>Provider Net Payable</dt>
            <dd className="result-value">
              {formatCurrency(result.providerNetPayable)}
            </dd>
          </dl>
          <button
            className="submit-btn"
            onClick={() => downloadFeesPdf(result)}
          >
            generate pdf
          </button>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
