import { useMemo, useState } from "react";
import AchievementTable from "../components/AchievementTable";
import { messages, ui } from "../content/microtexts";

const ALL = "Все виды спорта";

export default function Achievements({ items, onOpen, onAdd, onDelete }) {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState(ALL);
  const filtered = useMemo(() => items.filter((item) => {
    const matchesSearch = `${item.competition} ${item.athlete} ${item.sport}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesSearch && (sport === ALL || item.sport === sport);
  }), [items, search, sport]);

  return (
    <div className="st-page">
      <div className="st-page-heading">
        <div>
          <div className="st-eyebrow">База результатов</div>
          <h1>{ui.achievements}</h1>
          <p>Все спортивные результаты и награды в одном месте.</p>
        </div>
        <button className="st-button st-button--primary" type="button" onClick={onAdd}>{ui.addWorkout}</button>
      </div>

      <section className="st-panel" aria-labelledby="ach-history">
        <h2 className="st-panel__title" id="ach-history">{ui.history}</h2>
        {items.length === 0 ? (
          <div className="st-empty">
            <strong>{messages.empty}</strong>
            <button className="st-button st-button--primary" type="button" onClick={onAdd}>{ui.addWorkout}</button>
          </div>
        ) : (
          <>
            <div className="st-toolbar">
              <label className="st-search">
                <span aria-hidden="true">⌕</span>
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={ui.search} aria-label={ui.search} />
              </label>
              <label className="st-filter">
                <span>{ui.filter}</span>
                <select value={sport} onChange={(e) => setSport(e.target.value)}>
                  <option>{ALL}</option>
                  {[...new Set(items.map((x) => x.sport))].map((x) => <option key={x}>{x}</option>)}
                </select>
              </label>
              <span className="st-results-count" aria-live="polite">{filtered.length} из {items.length}</span>
            </div>
            <AchievementTable items={filtered} onOpen={onOpen} onDelete={onDelete} showAthlete />
          </>
        )}
      </section>
    </div>
  );
}
