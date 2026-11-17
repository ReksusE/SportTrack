import { formatToday } from "../utils/format";

export default function Topbar({ title }) {
  return (
    <header className="st-topbar">
      <div className="st-breadcrumb">SportTrack <span aria-hidden="true">/</span> {title}</div>
      <div className="st-topbar__right">
        <span className="st-date">{formatToday()}</span>
        <button className="st-icon-button" type="button" aria-label="Уведомления">♧<i aria-hidden="true" /></button>
        <div className="st-avatar st-avatar--small" aria-hidden="true">ВС</div>
      </div>
    </header>
  );
}
