import { ShieldCheck, UsersRound } from "lucide-react";

export default function SpaceHeader({ space }) {
  return (
    <section className="space-header">
      <div>
        <div className="kicker">Team space</div>
        <h2>{space.title}</h2>
        <p>{space.description}</p>
      </div>
      <div className="space-meta">
        <span><UsersRound size={16} /> {space.members.length} members</span>
        <span><ShieldCheck size={16} /> {space.security}</span>
      </div>
      <div className="member-strip" aria-label="Space members">
        {[...space.members, space.admin].map((member) => (
          <span key={member}>{member}</span>
        ))}
      </div>
    </section>
  );
}
