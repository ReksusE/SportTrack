// "10.11.2026" -> "2026-11-10" (для input type="date")
export function toIsoDate(ruDate) {
  const [day, month, year] = ruDate.split(".");
  return day && month && year ? `${year}-${month}-${day}` : "";
}

// "2026-11-10" -> "10.11.2026"
export function toRuDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

export function medalByPlace(place) {
  return { 1: "Золото", 2: "Серебро", 3: "Бронза" }[place] ?? "—";
}

export function formatToday(date = new Date()) {
  const text = date
    .toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    .replace(/\s?г\.$/, "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function pluralDays(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} день`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} дня`;
  return `${n} дней`;
}

export function daysUntil(isoDate, from = new Date()) {
  const target = new Date(`${isoDate}T00:00:00`);
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((target - start) / 86_400_000);
}
