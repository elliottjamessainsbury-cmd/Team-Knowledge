export const currentUser = {
  name: "James Patel",
  role: "Housing Officer",
  initials: "JP"
};

export const organisation = "Northbridge Council";

export const users = [
  { name: "James Patel", role: "Housing Officer", initials: "JP" },
  { name: "Swathi Rao", role: "Senior Caseworker", initials: "SR" },
  { name: "Priya Morgan", role: "Team Lead", initials: "PM" },
  { name: "Tom Ellis", role: "Outreach Worker", initials: "TE" }
];

export const teamProjects = [
  {
    id: "rough-sleeping-outreach",
    title: "Rough sleeping outreach",
    subtitle: "James, Priya, Swathi, Tom",
    heroTitle: "Northbridge unhoused findings",
    createdBy: "James Patel",
    topic:
      "Share notes and find out reasons why unhoused people in the community aren't able to receive their housing plans.",
    accessReminder:
      "Team members can contribute notes and view summaries. Raw notes are only visible when the note author explicitly shares them.",
    members: ["James Patel", "Swathi Rao", "Priya Morgan", "Tom Ellis"],
    stats: { anonymised: 5, raw: 2, policies: 3, updated: "Updated today", lastUpdated: "Last update 17:25 by James Patel" }
  },
  {
    id: "temporary-accommodation-follow-ups",
    title: "Temporary accommodation follow-ups",
    subtitle: "Redworth team +1 other",
    heroTitle: "Temporary accommodation follow-up themes",
    createdBy: "Swathi Rao",
    topic: "Combine follow-up notes to understand placement delays, provider contact and escalation points.",
    accessReminder: "Only note authors can change source visibility. Shared summaries are available to project members.",
    members: ["Swathi Rao", "James Patel", "Tom Ellis"],
    stats: { anonymised: 3, raw: 1, policies: 2, updated: "Updated yesterday", lastUpdated: "Last update 15:10 by Swathi Rao" }
  },
  {
    id: "adult-social-care-reviews",
    title: "Adult social care reviews",
    subtitle: "Contains externals",
    heroTitle: "Adult social care review patterns",
    createdBy: "Priya Morgan",
    topic: "Bring reviewed notes together to identify recurring care review questions and support gaps.",
    accessReminder: "External collaborators only see notes shared directly with them.",
    members: ["Priya Morgan", "Swathi Rao"],
    stats: { anonymised: 3, raw: 0, policies: 2, updated: "Updated 2 days ago", lastUpdated: "Last update 09:40 by Priya Morgan" }
  },
  {
    id: "hospital-discharge-support",
    title: "Hospital discharge support",
    subtitle: "Discharge team + 5 others",
    heroTitle: "Hospital discharge support findings",
    createdBy: "Priya Morgan",
    topic: "Track practical barriers across discharge planning notes and agree team actions.",
    accessReminder: "Sensitive source material remains private unless explicitly shared by its author.",
    members: ["Priya Morgan", "Swathi Rao", "James Patel"],
    stats: { anonymised: 2, raw: 0, policies: 1, updated: "Updated 4 days ago", lastUpdated: "Last update 11:05 by Priya Morgan" }
  }
];

export const aiSummary = {
  body:
    "This project comprises meeting notes from 18-21st June 2026, Priya's most recent study, and anonymised day-to-day notes taken by Tom and Swathi in the Northbridge unhoused community.\nRecurring themes this month: missing ID documents, temporary accommodation follow-up, unclear escalation routes and missed follow-up ownership.\n\n6 contributed notes were missing a clear next action. 9 referenced the same policy area. 4 workers asked similar questions about acceptable evidence.",
  suggestedActions: ["View graphs", "Summarise findings", "Create team briefing"]
};

export const privacyLevels = [
  {
    id: "aggregate",
    title: "Aggregate only",
    short: "Only a summary is included, without any personal details",
    copy: "The note contributes to counts, themes and trends. No snippets or raw text are visible to others.",
    whoCanSee: ["Team members see summaries", "No personal details are included", "Raw note remains private"],
    bestFor: "Sensitive notes where the team can still learn from the pattern."
  },
  {
    id: "anonymised",
    title: "Anonymised evidence",
    short: "Redacted snippets and themes. Raw note private.",
    copy: "The note contributes to patterns and short redacted examples. Names, locations and identifying details are removed.",
    whoCanSee: ["Team members see redacted examples", "Raw note remains private", "Author can change access later"],
    bestFor: "Notes that help explain a pattern but should not expose personal details."
  },
  {
    id: "raw",
    title: "Shared raw note",
    short: "Full note visible to named collaborators only.",
    copy: "Named collaborators can view the full note, summary and transcript.",
    whoCanSee: ["Selected collaborators can view raw content", "Access is logged", "Contributor can remove access later"],
    bestFor: "Active collaboration with named teammates."
  }
];

export const sourceSettings = [
  {
    id: "check-in-may-07",
    title: "Check-in May 07",
    contributor: "Tom Ellis",
    level: "Anonymised",
    visible: "Redacted themes"
  },
  {
    id: "temporary-accommodation-follow-up",
    title: "Temporary accommodation follow-up",
    contributor: "Swathi Rao",
    level: "Redacted",
    visible: "Redacted snippets"
  },
  {
    id: "provider-call-summary",
    title: "Provider call summary",
    contributor: "James Patel",
    level: "Shared raw note",
    visible: "Full note for James, Swathi and Priya"
  }
];

export const recentNotes = [
  {
    id: "outreach-meeting-12-may",
    title: "Outreach meeting - 12 May",
    type: "Meeting note",
    status: "Reviewed",
    owner: "James Patel",
    suggestedProject: "Rough sleeping outreach"
  },
  {
    id: "shelter-provider-call",
    title: "Follow-up call with shelter provider",
    type: "Voice note",
    status: "Needs review",
    owner: "Tom Ellis",
    suggestedProject: "Temporary accommodation follow-ups"
  },
  {
    id: "case-background-summary",
    title: "Case background summary",
    type: "Case file",
    status: "Reviewed",
    owner: "James Patel",
    suggestedProject: "Rough sleeping outreach"
  }
];

export const anonymisationPreview = {
  original:
    "James met with Martin Lewis near King's Cross on 12 May. Martin said he had lost his passport and was unsure whether the shelter would accept a letter from his GP. Swathi agreed to call Camden Outreach before Friday.",
  anonymised:
    "A housing officer met with a person being supported on 12 May. The person said they had lost photo ID and were unsure whether alternative evidence would be accepted. A team member agreed to contact the outreach provider before Friday.",
  redactions: [
    "Martin Lewis -> a person being supported",
    "King's Cross -> removed",
    "passport -> photo ID",
    "Camden Outreach -> outreach provider",
    "Swathi -> a team member"
  ]
};

export const patterns = [
  {
    id: "missing-id-documents",
    title: "Missing ID documents",
    actionTitle: "Update Missing ID guidance in Knowledge Hub",
    nextStep: "Add accepted alternative evidence examples for no-fixed-address scenarios."
  },
  {
    id: "follow-up-owner-missing",
    title: "Follow-up owner missing",
    actionTitle: "Request owner and due date fields in outreach template",
    nextStep: "Ask the Beam Notes template owner to add owner and due date prompts."
  },
  {
    id: "escalation-route-unclear",
    title: "Escalation route unclear",
    actionTitle: "Create escalation route team briefing",
    nextStep: "Summarise when to escalate temporary accommodation issues and who owns each step."
  }
];

export const trustItems = [
  "Only the note author can change visibility levels.",
  "Raw notes are never shared unless explicitly selected.",
  "Every access change is logged in Access & Audit.",
  "AI summaries are generated from uploaded team data only."
];

export const complianceItems = [
  "Cyber Essentials Plus",
  "ISO/IEC 27001",
  "GDPR",
  "CSA STAR Level 1",
  "HIPAA",
  "NHS DSPT",
  "NIST 800-53 Rev. 5",
  "SOC 2",
  "WCAG 2.2 AA",
  "GovRAMP",
  "IRAP"
];

export const chartFilters = ["All uploaded data", "Anonymised notes", "Shared raw notes", "June 2026"];

export const chartData = {
  engagement: [38, 48, 52, 57, 65, 70, 75, 82, 88, 96],
  barriers: [
    { label: "ID documents", value: 42 },
    { label: "Online access", value: 31 },
    { label: "Follow-up owner", value: 18 },
    { label: "Escalation route", value: 14 }
  ],
  bubbles: [
    { label: "Access to online services", value: "13.53%", size: "large" },
    { label: "Missing ID", value: "9.40%", size: "small" },
    { label: "Follow-up ownership", value: "6.20%", size: "medium" }
  ]
};

export const initialAudit = [
  "Tom Ellis uploaded Check-in May 07 as anonymised.",
  "Swathi Rao added Temporary accommodation follow-up as redacted evidence.",
  "James Patel shared Provider call summary with named collaborators.",
  "Priya Morgan generated an AI summary from uploaded team data."
];
