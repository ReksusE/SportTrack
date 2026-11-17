import StatusBadge from "./StatusBadge";
import { ui } from "../content/microtexts";

export default function AchievementTable({ items, onOpen, onDelete, showAthlete = false, emptyState }) {
  if (!items.length) {
    return emptyState ?? (
      <div className="st-empty">
        <strong>Ничего не найдено</strong>
        <span>Измените параметры поиска или фильтр.</span>
      </div>
    );
  }
  return (
    <div className="st-table-wrap">
      <table className="st-table">
        <thead>
          <tr>
            <th scope="col">Соревнование</th>
            {showAthlete && <th scope="col">Спортсмен</th>}
            <th scope="col">Вид спорта</th>
            <th scope="col">Дата</th>
            <th scope="col">Результат</th>
            <th scope="col">Место</th>
            <th scope="col">Статус</th>
            {onDelete && <th scope="col"><span className="st-visually-hidden">Действия</span></th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><button className="st-table__link" type="button" onClick={() => onOpen?.(item.id)}>{item.competition}</button></td>
              {showAthlete && <td>{item.athlete}</td>}
              <td>{item.sport}</td>
              <td className="st-num">{item.date}</td>
              <td className="st-table__result st-num">{item.result}</td>
              <td><span className="st-place st-num">{item.place ?? "—"}</span></td>
              <td><StatusBadge status={item.status} /></td>
              {onDelete && (
                <td>
                  <button className="st-more" type="button" title={ui.remove} aria-label={`${ui.remove}: ${item.competition}`} onClick={() => onDelete(item.id)}>×</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
