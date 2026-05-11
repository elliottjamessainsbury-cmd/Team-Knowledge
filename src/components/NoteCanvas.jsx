import { MessageSquarePlus, PanelRightClose, ShieldCheck } from "lucide-react";

const tabs = ["Summary", "Raw transcript", "Actions", "Comments", "Activity"];

function fallbackDetails(document) {
  return {
    summary: `Summary generated from source material.\n\n${document.preview.replace("AI preview: ", "")}`,
    sourceBullets: [
      { label: "Main theme", source: "Source note" },
      { label: "Review reminder", source: "Source note" }
    ],
    transcript: [
      {
        time: "00:00",
        title: "Source excerpt",
        text: "This prototype uses synthetic source material. Review the original Beam Note before acting."
      }
    ],
    actions: [
      { title: "Review source material before sharing", owner: document.owner, status: "Open", due: "Next team review" }
    ],
    comments: [],
    activity: [`${document.owner} added this document to the space`, "AI summary generated from source material"]
  };
}

export default function NoteCanvas({ document, activeTab, setActiveTab, comments, onAddComment, onClose }) {
  if (!document) return null;
  const details = document.details || fallbackDetails(document);

  function submitComment(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = data.get("comment")?.trim();
    if (body) {
      onAddComment(document.id, body);
      event.currentTarget.reset();
    }
  }

  return (
    <aside className="note-canvas">
      <div className="canvas-header">
        <div>
          <div className="kicker">Open note canvas</div>
          <h2>{document.title}</h2>
          <div className="canvas-tags">
            <span className="tag type-tag">{document.type}</span>
            <span className="tag status-tag">{document.status}</span>
            <span className="tag security-tag"><ShieldCheck size={13} /> {document.security}</span>
          </div>
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close note canvas">
          <PanelRightClose size={20} />
        </button>
      </div>

      <div className="canvas-meta">
        <span>Owner: {document.owner}</span>
        <span>Collaborators: {document.collaborators.length ? document.collaborators.join(", ") : "None"}</span>
      </div>

      <div className="tabs" role="tablist" aria-label="Note canvas tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="canvas-body">
        {activeTab === "Summary" && (
          <div className="canvas-section">
            <p className="guardrail">Draft generated from source material. Review source material before acting.</p>
            <p className="summary-copy">{details.summary}</p>
            <div className="source-bullets">
              {details.sourceBullets.map((item) => (
                <button key={`${item.label}-${item.source}`} type="button">
                  <span>{item.label}</span>
                  <strong>source: {item.source}</strong>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Raw transcript" && (
          <div className="transcript-list">
            {details.transcript.map((section) => (
              <article key={section.time} className="transcript-section">
                <h3>{section.time} - {section.title}</h3>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === "Actions" && (
          <div className="action-list">
            {details.actions.map((action) => (
              <article key={action.title} className="action-item">
                <h3>{action.title}</h3>
                <span>Owner: {action.owner}</span>
                <span>Status: {action.status}</span>
                <span>Due: {action.due}</span>
              </article>
            ))}
          </div>
        )}

        {activeTab === "Comments" && (
          <div className="comments-panel">
            {[...details.comments, ...(comments[document.id] || [])].length ? (
              [...details.comments, ...(comments[document.id] || [])].map((comment, index) => (
                <article key={`${comment.author}-${index}`} className="comment">
                  <div className="avatar">{comment.initials}</div>
                  <div>
                    <strong>{comment.author}</strong>
                    <time>{comment.time}</time>
                    <p>{comment.body}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="muted-text">No comments yet. Add a comment to collaborate with your team.</p>
            )}
            <form className="comment-form" onSubmit={submitComment}>
              <textarea name="comment" placeholder="Add a comment for the team..." />
              <button type="submit" className="primary-button"><MessageSquarePlus size={16} /> Add comment</button>
            </form>
          </div>
        )}

        {activeTab === "Activity" && (
          <ul className="canvas-activity">
            {details.activity.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )}
      </div>
    </aside>
  );
}
