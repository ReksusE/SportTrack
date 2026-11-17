import StatCard from "../components/StatCard";
import AchievementTable from "../components/AchievementTable";
import StatusBadge from "../components/StatusBadge";
import { messages, motivationOfTheDay, ui } from "../content/microtexts";
import { upcomingEvent } from "../data/mockData";
import { daysUntil, pluralDays } from "../utils/format";

const initials = (name) => name.split(" ").map((x) => x[0]).slice(0, 2).join("");

export default function Dashboard({ achievements, requests, goal, onOpen, onNavigate, onAdd, onSetGoal }) {
  const confirmed = achievements.filter((item) => item.status === "Подтверждено").length;
  const medals = achievements.filter((item) => item.medal && item.medal !== "—").length;
  const pending = requests.filter((r) => r.status === "На проверке").length;
  const goalDone = confirmed >= goal;
  const goalPercent = Math.min(100, Math.round((confirmed / goal) * 100));
  const daysLeft = daysUntil(upcomingEvent.isoDate);
  const eventDate = new Date(`${upcomingEvent.isoDate}T00:00:00`);

  return (
    <div className="st-page">
      <div className="st-page-heading">
        <div>
          <div className="st-eyebrow">Обзор показателей</div>
          <h1>Добро пожаловать!</h1>
          <p>{motivationOfTheDay()}</p>
        </div>
        <button className="st-button st-button--primary" type="button" onClick={onAdd}>{ui.addWorkout}</button>
      </div>

      <div className="st-stats-grid">
        <StatCard label="Всего достижений" value={achievements.length} note="Записей в системе" icon="◆" />
        <StatCard label="Подтверждено" value={confirmed} note="Успешно проверено" icon="✓" />
        <StatCard label="Медали" value={medals} note="Призовые результаты" icon="★" tone="orange" />
        <StatCard label="На проверке" value={pending} note="Ожидают решения тренера" icon="◷" tone="neutral" />
      </div>

      <section className="st-panel" aria-labelledby="dash-recent">
        <div className="st-panel__heading">
          <div><h2 id="dash-recent">{ui.history}</h2><p>Недавно добавленные результаты спортсменов</p></div>
          <button className="st-text-button" type="button" onClick={() => onNavigate("achievements")}>{ui.achievements} →</button>
        </div>
        <AchievementTable
          items={achievements.slice(0, 4)}
          onOpen={onOpen}
          emptyState={<div className="st-empty"><strong>{messages.empty}</strong><button className="st-button st-button--primary" type="button" onClick={onAdd}>{ui.addWorkout}</button></div>}
        />
      </section>

      <div className="st-two-columns">
        <section className="st-panel" aria-labelledby="dash-requests">
          <div className="st-panel__heading">
            <div><h2 id="dash-requests">Заявки на проверку</h2><p>Требуют внимания тренера</p></div>
            <button className="st-text-button" type="button" onClick={() => onNavigate("review")}>Открыть →</button>
          </div>
          <div className="st-request-list">
            {requests.slice(0, 3).map((r) => (
              <div className="st-request" key={r.id}>
                <div className="st-avatar" aria-hidden="true">{initials(r.athlete)}</div>
                <div className="st-request__info"><strong>{r.athlete}</strong><span>{r.competition}</span></div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </section>

        <div className="st-stack">
          <section className="st-panel" aria-labelledby="dash-goal">
            <div className="st-panel__heading">
              <div><h2 id="dash-goal">Моя цель</h2><p>Подтверждённые результаты</p></div>
              <span className="st-goal-count st-num">{confirmed} / {goal}</span>
            </div>
            <div className="st-progress" role="progressbar" aria-label="Прогресс цели" aria-valuemin={0} aria-valuemax={100} aria-valuenow={goalPercent}>
              <div className="st-progress__bar" style={{ width: `${goalPercent}%` }} />
            </div>
            <p className={`st-goal-text ${goalDone ? "is-done" : ""}`}>
              {goalDone ? messages.goalReached : `До цели осталось: ${goal - confirmed}`}
            </p>
            <div className="st-goal-actions">
              <button className="st-button st-button--secondary" type="button" onClick={onSetGoal}>{ui.setGoal}</button>
              <button className="st-button st-button--primary" type="button" onClick={() => onNavigate("reports")}>{ui.progress}</button>
            </div>
          </section>

          <section className="st-panel" aria-labelledby="dash-event">
            <div className="st-panel__heading">
              <div><h2 id="dash-event">Ближайшее событие</h2><p>Календарь соревнований</p></div>
              <span className="st-calendar-icon" aria-hidden="true">▦</span>
            </div>
            <div className="st-event">
              <div className="st-event__date" aria-hidden="true">
                <strong className="st-num">{eventDate.getDate()}</strong>
                <span>{eventDate.toLocaleDateString("ru-RU", { month: "short" }).replace(".", "")}</span>
              </div>
              <div>
                <strong>{upcomingEvent.title}</strong>
                <span>{upcomingEvent.place}</span>
                {daysLeft >= 0 && <small>{daysLeft === 0 ? "Начинается сегодня" : `До начала ${pluralDays(daysLeft)}`}</small>}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
