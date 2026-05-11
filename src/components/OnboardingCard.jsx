import { BookOpenCheck, Upload, UserPlus } from "lucide-react";

export default function OnboardingCard({ onImport, onInvite, onAccess }) {
  return (
    <section className="onboarding-card">
      <div>
        <div className="kicker">Welcome to Team Spaces</div>
        <h3>Secure collaboration for casework, meetings and team memory</h3>
        <p>Create secure spaces for casework, meetings and team collaboration.</p>
        <p>Bring in notes you’ve already created in Beam Notes, then organise them by project, document type and team.</p>
        <p>Collaborate without sending sensitive information over email. Access, review and sharing stay controlled in one place.</p>
      </div>
      <div className="onboarding-actions">
        <button type="button" className="primary-button" onClick={onImport}><Upload size={17} /> Import notes</button>
        <button type="button" className="secondary-button" onClick={onInvite}><UserPlus size={17} /> Invite people</button>
        <button type="button" className="secondary-button" onClick={onAccess}><BookOpenCheck size={17} /> Learn about access controls</button>
      </div>
    </section>
  );
}
