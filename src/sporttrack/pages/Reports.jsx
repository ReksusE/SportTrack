import { useMemo, useState } from "react";

const ALL = "Все виды спорта";

export default function Reports({ achievements }) {
  const [period, setPeriod] = useState("2026");
  const [sport, setSport] = useState(ALL);
  const [reportType, setReportType] = useState("Сводка достижений");
  const [generated, setGenerated] = useState(false);
  const filtered = useMemo(
    () => achievements.filter((item) => (sport === ALL || item.sport === sport) && item.date.endsWith(period)),
    [achievements, sport, period]
  );
  const confirmed = filtered.filter((item) => item.status === "Подтверждено").length;
  const prizes = filtered.filter((x) => x.place <= 3).length;
  const change = (setter) => (e) => { setter(e.target.value); setGenerated(false); };

  return (
    <div className="st-page">
      <div className="st-page-heading">
        <div>
          <div className="st-eyebrow">Аналитика и экспорт</div>
          <h1>Формирование отчётов</h1>
          <p>Настройте параметры и сформируйте сводку спортивных результатов.</p>
        </div>
      </div>

      <div className="st-report-grid">
        <section className="st-panel" aria-labelledby="rep-params">
          <div className="st-panel__heading"><div><h2 id="rep-params">Параметры отчёта</h2><p>Выберите необходимые данные</p></div></div>
          <form className="st-form" onSubmit={(e) => { e.preventDefault(); setGenerated(true); }}>
            <label>Тип отчёта
              <select value={reportType} onChange={change(setReportType)}>
                <option>Сводка достижений</option><option>Результаты по видам спорта</option><option>Отчёт по спортсменам</option>
              </select>
            </label>
            <label>Отчётный период
              <select value={period} onChange={change(setPeriod)}>
                <option value="2026">2026 год</option><option value="2025">2025 год</option><option value="2024">2024 год</option>
              </select>
            </label>
            <label>Вид спорта
              <select value={sport} onChange={change(setSport)}>
                <option>{ALL}</option>
                {[...new Set(achievements.map((x) => x.sport))].map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <div className="st-form__hint">Отчёт будет сформирован на основе записей: <span className="st-num">{filtered.length}</span>.</div>
            <button className="st-button st-button--primary st-button--wide" type="submit">Сформировать отчёт</button>
          </form>
        </section>

        <section className="st-panel st-report-preview" aria-labelledby="rep-preview">
          <div className="st-panel__heading">
            <div><h2 id="rep-preview">Предварительный просмотр</h2><p>{generated ? "Отчёт сформирован" : "Здесь появится результат"}</p></div>
            <span className="st-file-icon" aria-hidden="true">PDF</span>
          </div>
          <div className="st-preview-sheet">
            <div className="st-preview-brand">S / SportTrack</div>
            <div className="st-eyebrow">Аналитический отчёт</div>
            <h3>{reportType}</h3>
            <p>{period} год · {sport}</p>
            <div className="st-preview-stats">
              <div><strong className="st-num">{filtered.length}</strong><span>Записей</span></div>
              <div><strong className="st-num">{confirmed}</strong><span>Подтверждено</span></div>
              <div><strong className="st-num">{prizes}</strong><span>Призовых мест</span></div>
            </div>
            <div className="st-preview-line" />
            <span className="st-preview-foot">SportTrack · Система учёта спортивных достижений</span>
          </div>
          {generated && (
            <div className="st-inline-success" role="status">
              {filtered.length ? "Предпросмотр обновлён." : "За выбранный период пока нет тренировок. Измените параметры отчёта."}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
