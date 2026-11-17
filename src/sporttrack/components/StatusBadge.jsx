// Статус всегда дублируется текстом, цвет — только дополнение (раздел 5 отчёта)
const tones = { "Подтверждено": "success", "Отклонено": "danger" };

export default function StatusBadge({ status }) {
  const tone = tones[status] ?? "warning";
  return <span className={`st-status is-${tone}`}><i aria-hidden="true" />{status}</span>;
}
