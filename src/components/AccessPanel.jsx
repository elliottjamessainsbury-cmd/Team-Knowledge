import { ClipboardList, LockKeyhole, UserCheck } from "lucide-react";

export default function AccessPanel({ accessData, extraAudit }) {
  return (
    <section className="access-panel" id="access-panel">
      <div className="section-heading">
        <div>
          <div className="kicker">Admin oversight</div>
          <h3>Access and audit</h3>
        </div>
        <span className="tag security-tag"><LockKeyhole size={13} /> Logged access</span>
      </div>
      <div className="access-grid">
        <div>
          <h4><UserCheck size={16} /> Current access</h4>
          {accessData.current.map((item) => <p key={item}>{item}</p>)}
        </div>
        <div>
          <h4><ClipboardList size={16} /> Pending requests</h4>
          {accessData.pending.map((item) => <p key={item}>{item}</p>)}
        </div>
        <div>
          <h4>Audit trail</h4>
          {[...accessData.audit, ...extraAudit].map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>
    </section>
  );
}
