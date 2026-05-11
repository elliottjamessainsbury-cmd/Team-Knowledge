import { Building2, FolderPlus, LockKeyhole, ShieldCheck } from "lucide-react";
import { users } from "../mockData";

const navItems = ["Team Spaces", "Recent Beam Notes", "Access Requests", "Admin"];

export default function LeftRail({ spaces, selectedSpaceId, onSelectSpace, onCreateSpace }) {
  return (
    <aside className="left-rail">
      <div className="org-block">
        <div className="org-icon"><Building2 size={22} /></div>
        <div>
          <h1>Northbridge Council</h1>
          <p>Beam Team Spaces</p>
        </div>
      </div>

      <div className="current-user">
        <div className="avatar">{users.james.initials}</div>
        <div>
          <strong>{users.james.name}</strong>
          <span>{users.james.role}</span>
        </div>
      </div>

      <nav className="nav-list" aria-label="Primary navigation">
        {navItems.map((item, index) => (
          <button key={item} className={index === 0 ? "nav-item active" : "nav-item"} type="button">
            {index === 0 ? <ShieldCheck size={17} /> : <LockKeyhole size={17} />}
            {item}
          </button>
        ))}
      </nav>

      <div className="spaces-header">
        <span>Spaces</span>
        <button type="button" className="icon-soft" onClick={onCreateSpace} aria-label="Create space">
          <FolderPlus size={17} />
        </button>
      </div>

      <div className="space-list">
        {spaces.map((space) => (
          <button
            key={space.id}
            type="button"
            className={space.id === selectedSpaceId ? "space-link selected" : "space-link"}
            onClick={() => onSelectSpace(space.id)}
          >
            <span>{space.title}</span>
            <small>{space.security}</small>
          </button>
        ))}
      </div>

      <button type="button" className="create-space-button" onClick={onCreateSpace}>
        <FolderPlus size={18} />
        Create space
      </button>
    </aside>
  );
}
