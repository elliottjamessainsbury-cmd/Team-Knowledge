import { Bot, FileSearch, RefreshCw, SendToBack } from "lucide-react";

export default function AISpaceBrief({ space, highlightedSources, onViewSources, onCreateHandover }) {
  if (!space.brief) {
    return (
      <section className="card quiet-card">
        <div className="card-title"><Bot size={18} /> AI Space Brief</div>
        <p>Add notes to this space to generate an AI Space Brief.</p>
      </section>
    );
  }

  return (
    <section className="ai-brief">
      <div className="card-title"><Bot size={18} /> AI Space Brief</div>
      <p className="brief-body">{space.brief.body}</p>
      <div className="chip-row">
        {space.brief.chips.map((chip) => <span key={chip} className="chip">{chip}</span>)}
      </div>
      <p className="guardrail">Generated from notes in this space. Review source material before acting.</p>
      {highlightedSources && (
        <div className="source-list">
          {space.brief.sources.map((source) => <span key={source}>{source}</span>)}
        </div>
      )}
      <div className="action-row">
        <button type="button" className="secondary-button"><RefreshCw size={16} /> Refresh brief</button>
        <button type="button" className="secondary-button" onClick={onCreateHandover}><SendToBack size={16} /> Create handover</button>
        <button type="button" className="secondary-button" onClick={onViewSources}><FileSearch size={16} /> View sources</button>
      </div>
    </section>
  );
}
