import { ui } from "../content/microtexts";

const navigation = [
  { id: "dashboard", label: ui.stats, icon: "⌂" },
  { id: "achievements", label: ui.achievements, icon: "◆" },
  { id: "review", label: "Проверка тренера", icon: "✓" },
  { id: "reports", label: "Отчёты", icon: "▤" },
];

export default function Sidebar({ activePage, onNavigate }) {
  const current = activePage === "detail" ? "achievements" : activePage;
  return (
    <aside className="st-sidebar">
      <div className="st-brand">
        <div className="st-brand__mark" aria-hidden="true">S</div>
        <div><strong>SportTrack</strong><span>учёт достижений</span></div>
      </div>
      <div className="st-sidebar__caption">Рабочее пространство</div>
      <nav className="st-nav" aria-label="Основная навигация">
        {navigation.map((item) => (
          <button
            className={`st-nav__item ${current === item.id ? "is-active" : ""}`}
            key={item.id}
            type="button"
            aria-current={current === item.id ? "page" : undefined}
            onClick={() => onNavigate(item.id)}
          >
            <span className="st-nav__icon" aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="st-sidebar__bottom">
        <div className="st-user">
          <div className="st-avatar" aria-hidden="true">ВС</div>
          <div><strong>Владислав Савченко</strong><span>Администратор</span></div>
        </div>
      </div>
    </aside>
  );
}
