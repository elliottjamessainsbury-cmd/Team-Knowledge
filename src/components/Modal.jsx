import { X } from "lucide-react";

export default function Modal({ title, eyebrow = "Prototype interaction", children, onClose, size = "normal" }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className={`modal ${size === "wide" ? "wide" : ""}`} role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="kicker">{eyebrow}</div>
            <h2>{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
