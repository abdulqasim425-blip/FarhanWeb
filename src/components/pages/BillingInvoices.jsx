import "./pages.css";

const invoices = [
  {
    id: "INV-2025-011",
    date: "Nov 15, 2025",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-2025-010",
    date: "Oct 15, 2025",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-2025-009",
    date: "Sep 15, 2025",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-2025-008",
    date: "Aug 15, 2025",
    amount: "$29.00",
    status: "Paid",
  },
  {
    id: "INV-2025-007",
    date: "Jul 15, 2025",
    amount: "$29.00",
    status: "Refunded",
  },
];

export default function BillingInvoices() {
  return (
    <div className="page">
      <div className="page__container">
        <h1 className="page__title">Invoices</h1>
        <p className="page__subtitle">Your billing history</p>

        <div className="card card--flush">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="mono">{inv.id}</td>
                  <td className="muted">{inv.date}</td>
                  <td className="bold">{inv.amount}</td>
                  <td>
                    <span
                      className={`status ${
                        inv.status === "Paid"
                          ? "status--paid"
                          : "status--refunded"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="link">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
