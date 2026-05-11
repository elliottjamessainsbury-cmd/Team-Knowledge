import { FilePlus2 } from "lucide-react";
import Modal from "./Modal";
import { documentTypes, securityLevels } from "../mockData";

export default function CreateNoteModal({ onCreate, onClose }) {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onCreate({
      title: data.get("title"),
      type: data.get("type"),
      security: data.get("security"),
      content: data.get("content")
    });
  }

  return (
    <Modal title="Create note" onClose={onClose}>
      <form className="stacked-form" onSubmit={submit}>
        <label>Note title<input name="title" defaultValue="New outreach follow-up note" /></label>
        <label>Document type
          <select name="type" defaultValue="Follow-up">
            {documentTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label>Security level
          <select name="security" defaultValue="Team only">
            {securityLevels.map((level) => <option key={level}>{level}</option>)}
          </select>
        </label>
        <label>Initial content<textarea name="content" defaultValue="Synthetic note created inside this secure team space." /></label>
        <button type="submit" className="primary-button"><FilePlus2 size={16} /> Create note</button>
      </form>
    </Modal>
  );
}
