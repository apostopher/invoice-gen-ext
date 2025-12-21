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
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const result = calculateProviderFees(+data.totalCollection, +data.labFees);
    downloadFeesPdf({
      ...result,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };
  return (
    <div style={{ fontFamily: "system-ui", padding: 12, width: 260 }}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="label-text">Start Date</span>
          <input
            type="date"
            required
            onInput={(event) => event.currentTarget.setCustomValidity("")}
            onInvalid={(event) =>
              event.currentTarget.setCustomValidity(
                "Please enter a valid start date"
              )
            }
            className="input-num"
            {...register("startDate")}
          />
        </label>
        <label>
          <span className="label-text">End Date</span>
          <input
            type="date"
            required
            onInput={(event) => event.currentTarget.setCustomValidity("")}
            onInvalid={(event) =>
              event.currentTarget.setCustomValidity(
                "Please enter a valid end date"
              )
            }
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
            min="0"
            onInput={(event) => event.currentTarget.setCustomValidity("")}
            onInvalid={(event) =>
              event.currentTarget.setCustomValidity(
                "Please enter a valid total collection amount"
              )
            }
            {...register("totalCollection")}
          />
        </label>
        <label>
          <span className="label-text">Lab Fees</span>
          <input
            type="number"
            step="0.01"
            required
            min="0"
            onInput={(event) => event.currentTarget.setCustomValidity("")}
            onInvalid={(event) =>
              event.currentTarget.setCustomValidity(
                "Please enter a valid lab fees amount"
              )
            }
            className="input-num"
            {...register("labFees")}
          />
        </label>
        <button className="submit-btn" type="submit">
          Generate PDF
        </button>
      </form>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
