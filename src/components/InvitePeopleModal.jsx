import { UserPlus } from "lucide-react";
import Modal from "./Modal";

const suggestedUsers = [
  "Swathi Rao - Senior Caseworker",
  "Priya Morgan - Team Manager",
  "Tom Ellis - Outreach Worker"
];

export default function InvitePeopleModal({ onInvite, onClose }) {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onInvite({
      person: data.get("person") || "Priya Morgan",
      role: data.get("role"),
      reason: data.get("reason") || "Review open actions before next team meeting.",
      expiry: data.get("expiry")
    });
  }

  return (
    <Modal title="Invite people to this space" onClose={onClose}>
      <form className="stacked-form" onSubmit={submit}>
        <label>Search people<input name="person" placeholder="Priya Morgan" /></label>
        <label>Role
          <select name="role" defaultValue="Manager reviewer">
            <option>Viewer</option>
            <option>Commenter</option>
            <option>Editor</option>
            <option>Manager reviewer</option>
          </select>
        </label>
        <label>Access reason<textarea name="reason" defaultValue="Review open actions before next team meeting." /></label>
        <label>Expiry
          <select name="expiry" defaultValue="30 days">
            <option>No expiry</option>
            <option>7 days</option>
            <option>30 days</option>
            <option>Custom</option>
          </select>
        </label>
        <div className="suggested-users">
          {suggestedUsers.map((user) => <span key={user}>{user}</span>)}
        </div>
        <p className="guardrail">Access is logged and visible to organisation admins.</p>
        <button type="submit" className="primary-button"><UserPlus size={16} /> Send invite</button>
      </form>
    </Modal>
  );
}
