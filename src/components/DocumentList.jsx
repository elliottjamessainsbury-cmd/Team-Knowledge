import { FileText, Lock, UsersRound } from "lucide-react";

export default function DocumentList({ documents, selectedIds, onToggleSelect, onOpenDocument, highlightedTitles }) {
  if (!documents.length) {
    return (
      <section className="card empty-state">
        <h3>No notes in this space yet.</h3>
        <p>Import recent Beam Notes or create a new note to start collaborating securely.</p>
      </section>
    );
  }

  return (
    <section className="document-section">
      <div className="section-heading">
        <div>
          <div className="kicker">Documents</div>
          <h3>Notes and source material</h3>
        </div>
        <span>{documents.length} items</span>
      </div>
      <div className="document-list">
        {documents.map((doc) => (
          <article
            key={doc.id}
            className={highlightedTitles?.includes(doc.title) ? "document-card highlighted" : "document-card"}
          >
            <label className="select-box" aria-label={`Select ${doc.title}`}>
              <input
                type="checkbox"
                checked={selectedIds.includes(doc.id)}
                onChange={() => onToggleSelect(doc.id)}
              />
            </label>
            <div className="document-main">
              <div className="doc-title-row">
                <h4>{doc.title}</h4>
                <span className="tag type-tag"><FileText size={14} /> {doc.type}</span>
              </div>
              <p>{doc.preview}</p>
              <div className="doc-meta">
                <span>Owner: {doc.owner}</span>
                <span><UsersRound size={14} /> {doc.collaborators.length ? doc.collaborators.join(", ") : "No collaborators"}</span>
                <span>Updated {doc.lastUpdated}</span>
              </div>
            </div>
            <div className="document-side">
              <span className="tag status-tag">{doc.status}</span>
              <span className="tag security-tag"><Lock size={13} /> {doc.security}</span>
              <button type="button" className="open-button" onClick={() => onOpenDocument(doc.id)}>Open</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
