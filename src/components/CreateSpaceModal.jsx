import { FolderPlus } from "lucide-react";
import Modal from "./Modal";

export default function CreateSpaceModal({ onCreate, onClose }) {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onCreate({
      title: data.get("title"),
      description: data.get("description"),
      team: data.get("team"),
      security: data.get("security"),
      members: data.get("members")
    });
  }

  return (
    <Modal title="Create space" onClose={onClose}>
      <form className="stacked-form" onSubmit={submit}>
        <label>Space name<input name="title" defaultValue="Rough sleeping outreach - June" /></label>
        <label>Description<textarea name="description" defaultValue="Shared workspace for outreach notes and follow-ups from the June outreach cycle." /></label>
        <label>Team<input name="team" defaultValue="Housing outreach" /></label>
        <label>Security level
          <select name="security" defaultValue="Team only">
            <option>Team only</option>
            <option>Restricted</option>
            <option>Manager access</option>
          </select>
        </label>
        <label>Initial members<input name="members" defaultValue="James Patel, Swathi Rao" /></label>
        <button type="submit" className="primary-button"><FolderPlus size={16} /> Create space</button>
      </form>
    </Modal>
  );
}
