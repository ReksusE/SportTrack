export default function StatCard({ label, value, note, icon, tone = "blue" }) {
  return (
    <article className="st-stat-card">
      <div className={`st-stat-card__icon is-${tone}`} aria-hidden="true">{icon}</div>
      <div className="st-stat-card__label">{label}</div>
      <div className="st-stat-card__value">{value}</div>
      <div className="st-stat-card__note">{note}</div>
    </article>
  );
}
