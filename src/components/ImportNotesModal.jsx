import { Link2, Plus, Rows3 } from "lucide-react";
import Modal from "./Modal";

export default function ImportNotesModal({ recentNotes, documents, onImport, onClose, onPreview, onCombine }) {
  return (
    <Modal title="Import from recent Beam Notes" onClose={onClose} size="wide">
      <div className="modal-list">
        {recentNotes.map((note) => (
          <article key={note.id} className="import-card">
            <div>
              <h3>{note.title}</h3>
              <p>{note.type} · {note.owner} · Created {note.created}</p>
              <span className="suggestion">{note.suggestion}</span>
              <p>{note.reason}</p>
            </div>
            <div className="modal-actions">
              <button type="button" className="primary-button" onClick={() => onImport(note)}><Plus size={16} /> Import to this space</button>
              <button type="button" className="secondary-button" onClick={() => onPreview(note)}><Rows3 size={16} /> Open preview</button>
              <button type="button" className="secondary-button" onClick={() => onCombine(note, documents[0]?.id)}><Link2 size={16} /> Combine with existing note</button>
            </div>
          </article>
        ))}
      </div>
      <p className="guardrail">Imported notes stay inside this secure team space. No email or external sharing is triggered.</p>
    </Modal>
  );
}
