import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Check,
  ClipboardList,
  FileLock2,
  FileText,
  History,
  LayoutDashboard,
  Lightbulb,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
  UsersRound,
  X
} from "lucide-react";
import {
  aiSummary,
  anonymisationPreview,
  chartData,
  chartFilters,
  complianceItems,
  currentUser,
  patterns,
  privacyLevels,
  recentNotes,
  sourceSettings,
  teamProjects,
  trustItems,
  users,
  organisation
} from "./mockData";

const navItems = ["Team Space", "Stored Notes", "Insights", "Actions", "Access & Audit"];
const inviteCandidates = [
  { name: "K Davids", role: "Housing Officer", initials: "KD" },
  { name: "Anastasiiya Bell", role: "Support Coordinator", initials: "AB" },
  { name: "Kendra Martinetti", role: "Team Collaborator", initials: "KM" }
];

function Modal({ title, eyebrow, children, onClose, wide = false }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className={wide ? "modal wide" : "modal"} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <div>
            {eyebrow && <div className="kicker">{eyebrow}</div>}
            <h2 id="modal-title">{title}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function LeftRail({ selectedProjectId, onSelectProject, onNavClick }) {
  return (
    <aside className="left-rail">
      <div className="brand-block">
        <div className="beam-wordmark">beam</div>
        <button type="button" className="rail-collapse" aria-label="Collapse navigation">
          <ArrowLeft size={18} />
        </button>
      </div>

      <div className="org-copy">
        <strong>{organisation}</strong>
        <span>TEAM KNOWLEDGE</span>
      </div>

      <div className="current-user">
        <div className="avatar">{currentUser.initials}</div>
        <div>
          <strong>{currentUser.name}</strong>
          <span>{currentUser.role}</span>
        </div>
      </div>

      <nav className="nav-list" aria-label="Primary navigation">
        {navItems.map((item, index) => {
          const Icon = [LayoutDashboard, FileText, Lightbulb, ClipboardList, History][index];
          return (
            <button
              key={item}
              className={index === 0 ? "nav-item active" : "nav-item"}
              type="button"
              onClick={() => onNavClick(item)}
            >
              <Icon size={18} />
              <span className="truncate">{item}</span>
            </button>
          );
        })}
      </nav>

      <div className="spaces-header">
        <span>Team projects</span>
        <button type="button" className="icon-soft" aria-label="Create team project">
          <Plus size={16} />
        </button>
      </div>

      <div className="space-list">
        {teamProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={project.id === selectedProjectId ? "space-link selected" : "space-link"}
            onClick={() => onSelectProject(project.id)}
          >
            <span className="truncate two-line">{project.title}</span>
            <small className="truncate">{project.subtitle}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ProjectHero({ project, onAddNote, onInvite, onCreateAction }) {
  return (
    <section className="project-hero">
      <div>
        <div className="kicker">TEAM KNOWLEDGE</div>
        <h1>{project.heroTitle}</h1>
      </div>
      <div className="project-meta">
        <span>Created by <strong>{project.createdBy}</strong></span>
        <p className="truncate two-line">{project.topic}</p>
        <p className="access-reminder truncate two-line">{project.accessReminder}</p>
      </div>
      <div className="loop-actions">
        <button type="button" className="primary-button" onClick={onAddNote}><Plus size={17} /> Add a note</button>
        <button type="button" className="secondary-button" onClick={onInvite}><UserPlus size={17} /> Add team members</button>
        <button type="button" className="secondary-button" onClick={onCreateAction}><ClipboardList size={17} /> Create team action</button>
      </div>
      <div className="member-strip" aria-label="Team members">
        <span>Team members</span>
        {project.members.map((name) => {
          const user = users.find((item) => item.name === name);
          return <span key={name}>{user?.initials || name.slice(0, 2)} {name}</span>;
        })}
      </div>
    </section>
  );
}

function AiSummaryCard({ project, onShowCharts, onCreateBriefing }) {
  const chips = [
    project.stats.lastUpdated,
    `${project.stats.anonymised} anonymised`,
    `${project.stats.raw} shared raw notes`,
    `${project.stats.policies} policy references`,
    project.stats.updated
  ];

  return (
    <section className="summary-card">
      <div className="card-title"><Sparkles size={18} /> AI summary</div>
      <p className="brief-body">{aiSummary.body}</p>
      <div className="chip-row">
        {chips.map((chip) => <span key={chip} className="chip truncate">{chip}</span>)}
      </div>
      <div className="summary-actions">
        <strong>Suggested actions (AI)</strong>
        <div className="action-row">
          <button type="button" className="secondary-button" onClick={onShowCharts}>View graphs</button>
          <button type="button" className="secondary-button">Summarise findings</button>
          <button type="button" className="secondary-button" onClick={onCreateBriefing}>Create team briefing</button>
        </div>
      </div>
    </section>
  );
}

function ChartsSection({ activeFilter, onFilterChange }) {
  const maxEngagement = Math.max(...chartData.engagement);
  const maxBarrier = Math.max(...chartData.barriers.map((item) => item.value));

  return (
    <section className="charts-section" id="charts-section">
      <div className="charts-heading">
        <div>
          <h2>Northbridge unhoused trends</h2>
        </div>
        <label className="filter-control">
          <span>Filter</span>
          <select value={activeFilter} onChange={(event) => onFilterChange(event.target.value)}>
            {chartFilters.map((filter) => <option key={filter}>{filter}</option>)}
          </select>
        </label>
      </div>

      <div className="analytics-card">
        <div className="analytics-intro">
          <span className="blue-pill">{activeFilter}</span>
          <h3>Analytics Snapshot</h3>
          <p>Generated from sample uploaded notes, summaries and shared project evidence.</p>
        </div>

        <div className="bubble-chart-card">
          <div className="bubble-chart" aria-label="Barrier share chart">
            {chartData.bubbles.map((bubble) => (
              <div key={bubble.label} className={`bubble ${bubble.size}`}>
                <strong>{bubble.value}</strong>
                <span>{bubble.label}</span>
              </div>
            ))}
          </div>
          <button type="button" className="share-button">Share graph</button>
        </div>

        <div className="line-chart-card">
          <h3>Community engagement</h3>
          <div className="line-chart" aria-label="Community engagement line chart">
            {chartData.engagement.map((value, index) => (
              <span
                key={`${value}-${index}`}
                className="line-point"
                style={{ left: `${8 + index * 9.4}%`, bottom: `${(value / maxEngagement) * 82}%` }}
              />
            ))}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline points="8,68 17,60 26,56 35,51 44,43 53,39 62,34 71,26 80,20 90,8" />
            </svg>
          </div>
          <button type="button" className="share-button">Share graph</button>
        </div>

        <div className="bar-chart-card">
          <h3>Top barriers in uploaded data</h3>
          <div className="bar-list">
            {chartData.barriers.map((item) => (
              <div key={item.label} className="bar-row">
                <span className="truncate">{item.label}</span>
                <div><i style={{ width: `${(item.value / maxBarrier) * 100}%` }} /></div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <button type="button" className="share-button">Share snapshot</button>
        </div>
      </div>
    </section>
  );
}

function RightPanel({ actions, sourceRows, onOpenSources }) {
  return (
    <aside className="right-panel">
      <section className="side-card trust-card">
        <div className="card-title"><ShieldCheck size={18} /> Trust</div>
        <p>TEAM KNOWLEDGE is built to help teams collaborate without exposing unnecessary raw notes.</p>
        <ul>
          {trustItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="side-card">
        <div className="card-title"><FileLock2 size={18} /> Visibility levels</div>
        <div className="level-list">
          {privacyLevels.map((level) => (
            <div key={level.id} className="level-row">
              <div className="mini-icon">{level.id === "aggregate" ? <BarChart3 size={15} /> : level.id === "anonymised" ? <FileLock2 size={15} /> : <FileText size={15} />}</div>
              <div>
                <strong>{level.title}</strong>
                <p className="truncate two-line">{level.short}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="side-footer">Access can only be changed by the author of each note.</p>
      </section>

      <section className="side-card">
        <div className="card-title"><Search size={18} /> Search</div>
        <div className="source-mini-list">
          {sourceRows.slice(0, 3).map((source) => (
            <button key={source.id} type="button" onClick={onOpenSources}>
              <strong className="truncate two-line">{source.title}</strong>
              <span className="truncate two-line">{source.level} - {source.visible}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="side-card">
        <div className="card-title"><ClipboardList size={18} /> Team actions</div>
        {actions.length ? (
          <div className="action-list">
            {actions.map((action) => (
              <div key={action.title} className="saved-action">
                <strong className="truncate two-line">{action.title}</strong>
                <span>{action.owner} - due {action.dueDate}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted-text">You can auto-generate a to-do list to share out to the team here.</p>
        )}
      </section>

      <section className="side-card compliance-card">
        <div className="card-title"><ShieldCheck size={18} /> Compliance</div>
        <p className="compliance-safe">Your data is safe on beam.</p>
        <a className="learn-more-link" href="#" onClick={(event) => event.preventDefault()}>Learn more</a>
        <div className="compliance-grid">
          {complianceItems.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>
    </aside>
  );
}

function SourceSettingsModal({ sources, onClose }) {
  return (
    <Modal title="Source settings" eyebrow="Access & audit" onClose={onClose} wide>
      <p className="modal-copy">Review what each uploaded note shares with this team project. Controls are mocked for this prototype.</p>
      <div className="source-settings-list">
        {sources.map((source) => (
          <article key={source.id} className="source-setting-row">
            <div>
              <h3>{source.title}</h3>
              <p>Contributor: {source.contributor}</p>
            </div>
            <div>
              <span className="tag">{source.level}</span>
              <p>{source.visible}</p>
            </div>
            <div className="row-actions">
              <button type="button" className="secondary-button">Change level</button>
              <button type="button" className="secondary-button">View what's shared</button>
              <button type="button" className="secondary-button">Remove from project</button>
            </div>
          </article>
        ))}
      </div>
    </Modal>
  );
}

function ContributeNoteModal({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedNoteId, setSelectedNoteId] = useState("outreach-meeting-12-may");
  const [privacyLevel, setPrivacyLevel] = useState("anonymised");
  const [toggles, setToggles] = useState({ snippets: true, actions: true, policies: true, transcript: false });
  const selectedNote = recentNotes.find((note) => note.id === selectedNoteId) || recentNotes[0];

  return (
    <Modal
      title={step === 1 ? "Add a note" : step === 2 ? "Choose visibility" : "Preview anonymised note"}
      eyebrow="Review before sharing"
      onClose={onClose}
      wide
    >
      {step === 1 && (
        <div className="flow-stack">
          <p className="modal-copy">Add a reviewed Beam Note to this team project. You choose how much detail is shared.</p>
          <div className="note-picker">
            {recentNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                className={selectedNoteId === note.id ? "note-option selected" : "note-option"}
                onClick={() => setSelectedNoteId(note.id)}
              >
                <span className="radio-dot" />
                <div>
                  <strong className="truncate">{note.title}</strong>
                  <p className="truncate">{note.type} - {note.status} - Owner: {note.owner}</p>
                  <small className="truncate">Suggested project: {note.suggestedProject}</small>
                </div>
              </button>
            ))}
          </div>
          <div className="modal-actions horizontal">
            <button type="button" className="primary-button" onClick={() => setStep(2)}>Continue</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flow-stack">
          <p className="modal-copy">Selected source: <strong>{selectedNote.title}</strong>. Choose what the team can see before uploading.</p>
          <div className="privacy-options">
            {privacyLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                className={privacyLevel === level.id ? "privacy-option selected" : "privacy-option"}
                onClick={() => setPrivacyLevel(level.id)}
              >
                <span className="check-dot">{privacyLevel === level.id && <Check size={14} />}</span>
                <strong>{level.title}</strong>
                <p className="truncate three-line">{level.copy}</p>
                <div className="mini-list">
                  <span>Who can see</span>
                  {level.whoCanSee.map((item) => <small key={item} className="truncate">{item}</small>)}
                </div>
                <em className="truncate two-line">Best for: {level.bestFor}</em>
              </button>
            ))}
          </div>
          <div className="modal-actions horizontal split">
            <button type="button" className="secondary-button" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="primary-button" onClick={() => setStep(3)}>Preview sharing</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flow-stack">
          <div className="preview-grid">
            <section className="preview-column">
              <h3>Original note excerpt</h3>
              <p>{anonymisationPreview.original}</p>
            </section>
            <section className="preview-column anonymised">
              <h3>Anonymised version</h3>
              <p>{anonymisationPreview.anonymised}</p>
            </section>
          </div>

          <div className="redaction-box">
            <strong>Highlighted redactions</strong>
            <div className="redaction-list">
              {anonymisationPreview.redactions.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>

          <div className="toggle-grid">
            {[
              ["snippets", "Include anonymised snippets"],
              ["actions", "Include action themes"],
              ["policies", "Include policy questions"],
              ["transcript", "Include raw transcript"]
            ].map(([key, label]) => (
              <label key={key} className="toggle-row">
                <input
                  type="checkbox"
                  checked={toggles[key]}
                  onChange={() => setToggles((current) => ({ ...current, [key]: !current[key] }))}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <p className="guardrail">Review before contributing. You control what is shared.</p>

          <div className="modal-actions horizontal split">
            <button type="button" className="secondary-button" onClick={() => setStep(2)}>Back</button>
            <button type="button" className="secondary-button">Edit anonymised text</button>
            <button type="button" className="primary-button" onClick={() => onComplete(selectedNote, privacyLevel)}>Add to project</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function InviteModal({ onClose, onInvite }) {
  const [selected, setSelected] = useState("K Davids");
  const [query, setQuery] = useState("");
  const filteredCandidates = inviteCandidates.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()) || user.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal title="Add team members" eyebrow="Organisation members" onClose={onClose}>
      <div className="flow-stack">
        <p className="modal-copy">Add people from Northbridge Council to this team project. They will see uploaded summaries and any notes explicitly shared with them.</p>
        <label className="member-search">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search organisation members" />
        </label>
        <div className="invite-list">
          {filteredCandidates.map((user) => (
            <button key={user.name} type="button" className={selected === user.name ? "invite-option selected" : "invite-option"} onClick={() => setSelected(user.name)}>
              <span className="avatar small">{user.initials}</span>
              <span><strong>{user.name}</strong><small>{user.role}</small></span>
            </button>
          ))}
        </div>
        <div className="modal-actions horizontal split">
          <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
          <button type="button" className="primary-button" onClick={() => onInvite(selected)}>Add team member</button>
        </div>
      </div>
    </Modal>
  );
}

function ActionModal({ pattern, onClose, onSave }) {
  const action = pattern || patterns[0];
  const [owner, setOwner] = useState("Priya Morgan");
  const [dueDate, setDueDate] = useState("20 May");

  return (
    <Modal title="Create team action" eyebrow="Suggested by AI" onClose={onClose}>
      <div className="stacked-form">
        <label>
          Action
          <input value={action.actionTitle} readOnly />
        </label>
        <label>
          Owner
          <select value={owner} onChange={(event) => setOwner(event.target.value)}>
            <option>Priya Morgan</option>
            <option>Swathi Rao</option>
            <option>James Patel</option>
          </select>
        </label>
        <label>
          Due date
          <input value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        </label>
        <label>
          Suggested next step
          <textarea value={action.nextStep} readOnly />
        </label>
        <div className="modal-actions horizontal split">
          <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
          <button type="button" className="primary-button" onClick={() => onSave({ title: action.actionTitle, owner, dueDate, pattern: action.title })}>Save action</button>
        </div>
      </div>
    </Modal>
  );
}

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState("rough-sleeping-outreach");
  const [modal, setModal] = useState(null);
  const [sourceRows, setSourceRows] = useState(sourceSettings);
  const [actions, setActions] = useState([]);
  const [toast, setToast] = useState("");
  const [selectedPattern, setSelectedPattern] = useState(patterns[0]);
  const [activeFilter, setActiveFilter] = useState(chartFilters[0]);

  const selectedProject = useMemo(
    () => teamProjects.find((project) => project.id === selectedProjectId) || teamProjects[0],
    [selectedProjectId]
  );

  function openActionModal(pattern = patterns[0]) {
    setSelectedPattern(pattern);
    setModal("action");
  }

  function completeContribution(note, privacyLevel) {
    const level = privacyLevels.find((item) => item.id === privacyLevel) || privacyLevels[1];
    setSourceRows((current) => [
      {
        id: `${note.id}-upload`,
        title: note.title,
        contributor: "James Patel",
        level: level.title,
        visible: level.id === "anonymised" ? "Redacted snippets and themes" : level.id === "aggregate" ? "Summary only" : "Full note for named collaborators"
      },
      ...current
    ]);
    setModal(null);
    setToast(`Note added as ${level.title.toLowerCase()}. Raw note remains private unless shared.`);
    window.setTimeout(() => setToast(""), 4500);
  }

  function saveAction(action) {
    setActions((current) => [action, ...current]);
    setModal(null);
    setToast("Team action saved.");
    window.setTimeout(() => setToast(""), 3500);
  }

  function inviteMember(name) {
    setModal(null);
    setToast(`${name} added to this team project.`);
    window.setTimeout(() => setToast(""), 3500);
  }

  return (
    <div className="app-shell">
      <LeftRail
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onNavClick={(item) => {
          if (item === "Insights") {
            document.getElementById("charts-section")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      <main className="main-panel">
        <ProjectHero
          project={selectedProject}
          onAddNote={() => setModal("contribute")}
          onInvite={() => setModal("invite")}
          onCreateAction={() => openActionModal(patterns[0])}
        />
        <AiSummaryCard
          project={selectedProject}
          onShowCharts={() => document.getElementById("charts-section")?.scrollIntoView({ behavior: "smooth" })}
          onCreateBriefing={() => openActionModal(patterns[2])}
        />
        <ChartsSection activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </main>

      <RightPanel
        actions={actions}
        sourceRows={sourceRows}
        onOpenSources={() => setModal("sources")}
      />

      {toast && <div className="toast"><Check size={17} /> {toast}</div>}
      {modal === "contribute" && <ContributeNoteModal onClose={() => setModal(null)} onComplete={completeContribution} />}
      {modal === "sources" && <SourceSettingsModal sources={sourceRows} onClose={() => setModal(null)} />}
      {modal === "action" && <ActionModal pattern={selectedPattern} onClose={() => setModal(null)} onSave={saveAction} />}
      {modal === "invite" && <InviteModal onClose={() => setModal(null)} onInvite={inviteMember} />}
    </div>
  );
}
