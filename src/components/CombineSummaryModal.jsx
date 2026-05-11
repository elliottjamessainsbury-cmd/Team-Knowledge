import { Copy, FilePlus2, FileSearch } from "lucide-react";
import Modal from "./Modal";

export default function CombineSummaryModal({ selectedDocuments, onSave, onClose, onViewSources }) {
  return (
    <Modal title="Draft project summary" eyebrow="Source-grounded AI draft" onClose={onClose} size="wide">
      <p className="guardrail">Draft generated from selected notes. Review source material before sharing.</p>
      <div className="summary-grid">
        <section>
          <h3>Key themes</h3>
          <ul>
            <li>Temporary accommodation follow-up</li>
            <li>Missing ID documents</li>
            <li>Health appointment confirmation</li>
            <li>Manager review required</li>
          </ul>
        </section>
        <section>
          <h3>Open actions</h3>
          <ul>
            <li>Confirm provider availability</li>
            <li>Check acceptable ID alternatives</li>
            <li>Confirm health appointment</li>
            <li>Send note to Priya for manager review</li>
          </ul>
        </section>
      </div>
      <section className="handover-box">
        <h3>Suggested handover summary</h3>
        <p>This project is focused on follow-up from the May outreach cycle. The main blockers are temporary accommodation availability and missing ID documents. Swathi is following up with the provider. James is preparing the case background and manager review material.</p>
      </section>
      <section className="source-list visible">
        {selectedDocuments.slice(0, 3).map((doc) => <span key={doc.id}>{doc.title}</span>)}
      </section>
      <div className="action-row">
        <button type="button" className="primary-button" onClick={onSave}><FilePlus2 size={16} /> Save summary to space</button>
        <button type="button" className="secondary-button" onClick={() => navigator.clipboard?.writeText("Draft project summary copied from Beam Team Spaces prototype.")}><Copy size={16} /> Copy draft</button>
        <button type="button" className="secondary-button" onClick={onViewSources}><FileSearch size={16} /> View sources</button>
        <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
      </div>
    </Modal>
  );
}
