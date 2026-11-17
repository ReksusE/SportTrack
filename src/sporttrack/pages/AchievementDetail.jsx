import StatusBadge from "../components/StatusBadge";
import { ui } from "../content/microtexts";

export default function AchievementDetail({ item, onBack, onEdit, onDelete }) {
  if (!item) return null;
  return (
    <div className="st-page">
      <button className="st-back-button" type="button" onClick={onBack}>← {ui.achievements}</button>
      <div className="st-page-heading">
        <div>
          <div className="st-eyebrow">Информация о результате</div>
          <h1>{item.competition}</h1>
          <p>{item.sport} · <span className="st-num">{item.date}</span></p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="st-detail-grid">
        <section className="st-panel st-detail-main" aria-labelledby="det-result">
          <div className="st-medal-illustration" aria-hidden="true">★<span>{item.medal || "Результат"}</span></div>
          <h2 id="det-result">Результат спортсмена</h2>
          <div className="st-result-value st-num">{item.result}</div>
          <p className="st-muted">Итоговый результат соревнования</p>
        </section>

        <section className="st-panel" aria-labelledby="det-info">
          <h2 className="st-panel__title" id="det-info">Основные сведения</h2>
          <dl className="st-info-list">
            <div><dt>Спортсмен</dt><dd>{item.athlete}</dd></div>
            <div><dt>Вид спорта</dt><dd>{item.sport}</dd></div>
            <div><dt>Дата проведения</dt><dd className="st-num">{item.date}</dd></div>
            <div><dt>Занятое место</dt><dd className="st-num">{item.place} место</dd></div>
            <div><dt>Статус</dt><dd><StatusBadge status={item.status} /></dd></div>
          </dl>
        </section>

        <section className="st-panel st-detail-note" aria-labelledby="det-note">
          <h2 className="st-panel__title" id="det-note">Заметка тренера</h2>
          {item.coachNote
            ? <p className="st-note">{item.coachNote}</p>
            : <p className="st-note st-note--empty">Тренер пока не оставил заметку.</p>}
        </section>

        <section className="st-panel st-detail-docs" aria-labelledby="det-docs">
          <h2 className="st-panel__title" id="det-docs">Подтверждающие документы</h2>
          <div className="st-document">
            <span className="st-document__icon" aria-hidden="true">PDF</span>
            <div><strong>Протокол соревнования</strong><span>Документ не прикреплён в демо-версии</span></div>
          </div>
          <p className="st-help">В рабочей системе здесь будут доступны загруженные дипломы, грамоты и протоколы.</p>
        </section>
      </div>

      <div className="st-detail-actions">
        <button className="st-button st-button--danger" type="button" onClick={() => onDelete(item.id)}>{ui.remove}</button>
        <button className="st-button st-button--primary" type="button" onClick={() => onEdit(item)}>{ui.edit}</button>
      </div>
    </div>
  );
}
