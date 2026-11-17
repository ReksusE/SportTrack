import StatusBadge from "../components/StatusBadge";

const initials = (name) => name.split(" ").map((x) => x[0]).slice(0, 2).join("");

export default function CoachReview({ items, onUpdate }) {
  const pending = items.filter((item) => item.status === "На проверке");
  return (
    <div className="st-page">
      <div className="st-page-heading">
        <div>
          <div className="st-eyebrow">Рабочее место тренера</div>
          <h1>Подтверждение достижений</h1>
          <p>Проверьте данные спортсменов и примите решение по заявкам.</p>
        </div>
        <div className="st-review-counter"><strong className="st-num">{pending.length}</strong><span>ожидают проверки</span></div>
      </div>

      <section className="st-panel" aria-labelledby="rev-list">
        <div className="st-panel__heading">
          <div><h2 id="rev-list">Входящие заявки</h2><p>Список отправленных на подтверждение результатов</p></div>
          <span className="st-results-count">{items.length} всего</span>
        </div>
        {items.length === 0 ? (
          <div className="st-empty"><strong>Заявок пока нет</strong><span>Новые достижения появятся здесь после отправки спортсменом.</span></div>
        ) : (
          <div className="st-review-list">
            {items.map((item) => (
              <article className="st-review-item" key={item.id}>
                <div className="st-avatar" aria-hidden="true">{initials(item.athlete)}</div>
                <div className="st-review-item__body">
                  <div className="st-review-item__top"><strong>{item.athlete}</strong><StatusBadge status={item.status} /></div>
                  <h3>{item.competition}</h3>
                  <p>{item.sport} · <span className="st-num">{item.date}</span> · Результат: <b className="st-num">{item.result}</b></p>
                  {item.status === "На проверке" ? (
                    <div className="st-review-actions">
                      <button className="st-button st-button--primary" type="button" onClick={() => onUpdate(item.id, "Подтверждено")} aria-label={`Подтвердить: ${item.competition}`}>Подтвердить</button>
                      <button className="st-button st-button--secondary" type="button" onClick={() => onUpdate(item.id, "Отклонено")} aria-label={`Отклонить: ${item.competition}`}>Отклонить</button>
                    </div>
                  ) : <span className="st-review-complete">Решение сохранено</span>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
