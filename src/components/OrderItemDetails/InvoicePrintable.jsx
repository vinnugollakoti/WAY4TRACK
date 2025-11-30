// InvoicePrintable.jsx
import React, { forwardRef } from "react";
import "./invoice.css";

/*
 Props:
  - order: order object
  - items: array of items [{ name, qty, rate, hsn, cgstPercent, sgstPercent, description }]
  - company: { name, addressLines: [], gstin }
  - totals: { subtotal, totalCgst, totalSgst, totalAmount, amountInWords }
*/
const InvoicePrintable = forwardRef(({ order, items, company, totals }, ref) => {
  return (
    <div className="invoice-page" ref={ref} id="invoice">
      <div className="invoice-border">
        <header className="inv-header">
          <div className="inv-logo">
            <img src="/images/sharon.png" alt="logo" />
          </div>

          <div className="inv-company">
            <h1>{company.name}</h1>
            {company.addressLines?.map((l, i) => (
              <div key={i} className="small">{l}</div>
            ))}
            {company.gstin && <div className="small">GSTIN: {company.gstin}</div>}
          </div>

          <div className="inv-title">
            <div className="title-text">Invoice</div>
          </div>
        </header>

        <section className="meta-row">
          <div className="meta-right">
            <div>Place of Supply: <strong>{order?.placeOfSupply || "Andhra Pradesh"}</strong></div>
          </div>
        </section>

        <hr />

        <section className="addresses">
          <div className="addr">
            <h4>Bill To</h4>
            <div className="bold">{order.deliveryAddress?.name || "-"}</div>
            <div className="small">{order.deliveryAddress?.addressLine1 || ""}</div>
            <div className="small">{order.deliveryAddress?.city || ""} {order.deliveryAddress?.state || ""}</div>
          </div>

          <div className="addr">
            <h4>Shipping To</h4>
            <div className="bold">{order.deliveryAddress?.name || "-"}</div>
            <div className="small">{order.deliveryAddress?.addressLine1 || ""}</div>
            <div className="small">{order.deliveryAddress?.city || ""} {order.deliveryAddress?.state || ""}</div>
          </div>
        </section>

        <table className="inv-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Items</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>CGST%</th>
              <th>CGST Amt</th>
              <th>SGST%</th>
              <th>SGST Amt</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <div className="item-name">{it.name}</div>
                  {it.description && <div className="small">{it.description}</div>}
                </td>
                <td>{it.hsn || "-"}</td>
                <td>{it.qty}</td>
                <td>{(it.rate ?? it.price ?? 0).toFixed(2)}</td>
                <td>{(it.cgstPercent ?? it.taxPercent ?? 0)}%</td>
                <td>{( (it.rate ?? it.price ?? 0) * it.qty * ((it.cgstPercent ?? it.taxPercent ?? 0)/100) ).toFixed(2)}</td>
                <td>{(it.sgstPercent ?? it.taxPercent ?? 0)}%</td>
                <td>{( (it.rate ?? it.price ?? 0) * it.qty * ((it.sgstPercent ?? it.taxPercent ?? 0)/100) ).toFixed(2)}</td>
                <td>{( (it.rate ?? it.price ?? 0) * it.qty + ( (it.rate ?? it.price ?? 0) * it.qty * ((it.cgstPercent ?? it.taxPercent ?? 0)/100) ) + ( (it.rate ?? it.price ?? 0) * it.qty * ((it.sgstPercent ?? it.taxPercent ?? 0)/100) ) ).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="summary">
          <div className="summary-left">
            <div><strong>Notes</strong></div>
            <div className="small">Looking forward</div>

            <div className="bank">
              <h4>Bank Details:</h4>
              <div className="small">Payment To: Sharon Telematics Pvt Ltd., Visakhapatnam</div>
              <div className="small">A/c No: 131905001314</div>
              <div className="small">Bank: ICICI Bank (India), BUTCHIRAJU PALAM-5300027</div>
              <div className="small">IFSC: ICIC0001319</div>
            </div>
          </div>

          <div className="summary-right">
            <div className="sum-row"><span>Subtotal</span><span>₹{totals.subtotal.toFixed(2)}</span></div>
            <div className="sum-row"><span>Total CGST</span><span>₹{totals.totalCgst.toFixed(2)}</span></div>
            <div className="sum-row"><span>Total SGST</span><span>₹{totals.totalSgst.toFixed(2)}</span></div>
            <div className="sum-final"><span>Amount Due:</span><span>₹{totals.totalAmount.toFixed(2)} RS</span></div>
            <div className="small">Total In Words: {totals.amountInWords || "-"}</div>

            <div className="sign-block">
              <div>For {company.name}</div>
              <img src="/images/sign.png" alt="sign" className="sign-img" />
              <div className="small">Authorised Signatory</div>
            </div>
          </div>
        </section>

        <footer className="inv-footer">All Disputes are subject to Visakhapatnam jurisdiction.</footer>
      </div>
    </div>
  );
});

export default InvoicePrintable;
