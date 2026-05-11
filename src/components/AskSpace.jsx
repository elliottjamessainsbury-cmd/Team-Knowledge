import { Search, Sparkles } from "lucide-react";

const prompts = [
  "What actions are still open?",
  "What changed since the last outreach meeting?",
  "Which notes mention temporary accommodation?",
  "Show anything Swathi flagged for review.",
  "Create a handover summary for Priya."
];

export default function AskSpace({ response, onAsk, onOpenSource }) {
  return (
    <section className="card ask-space">
      <div className="card-title"><Sparkles size={18} /> Ask this space</div>
      <div className="ask-input"><Search size={18} /><span>Ask this space about notes, actions or handovers...</span></div>
      <div className="prompt-row">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => onAsk(prompt)}>{prompt}</button>
        ))}
      </div>
      {response && (
        <div className="ai-response">
          <p>{response.body}</p>
          <div className="sources-line">
            <strong>Sources:</strong>
            {response.sources.map((source) => (
              <button key={source.id} type="button" onClick={() => onOpenSource(source.id)}>{source.title}</button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
