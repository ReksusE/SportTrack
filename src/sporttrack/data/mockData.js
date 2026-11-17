export const sports = ["Плавание", "Лёгкая атлетика", "Баскетбол", "Теннис", "Дзюдо", "Бег", "Настольный теннис"];

export const initialAchievements = [
  { id: 1, competition: "Первенство города по плаванию", sport: "Плавание", date: "18.10.2026", result: "00:58.42", place: 1, athlete: "Александр Иванов", status: "Подтверждено", medal: "Золото", coachNote: "Уверенный старт и ровная дистанция. Следующая цель — улучшить поворот на второй сотне." },
  { id: 2, competition: "Открытый кубок области", sport: "Лёгкая атлетика", date: "04.10.2026", result: "10.84 сек.", place: 2, athlete: "Мария Смирнова", status: "На проверке", medal: "Серебро", coachNote: "" },
  { id: 3, competition: "Весенний турнир", sport: "Баскетбол", date: "21.09.2026", result: "18 очков", place: 3, athlete: "Дмитрий Козлов", status: "Подтверждено", medal: "Бронза", coachNote: "Хорошая реализация штрафных бросков." },
  { id: 4, competition: "Республиканский чемпионат", sport: "Плавание", date: "12.08.2026", result: "01:02.15", place: 4, athlete: "Александр Иванов", status: "Отклонено", medal: "—", coachNote: "В протоколе не совпадает дата заплыва. Загрузите исправленный документ." },
  { id: 5, competition: "Турнир молодых спортсменов", sport: "Теннис", date: "30.07.2026", result: "2:1 по сетам", place: 1, athlete: "Екатерина Орлова", status: "Подтверждено", medal: "Золото", coachNote: "" },
];

export const initialRequests = [
  { id: 11, athlete: "Илья Петров", competition: "Кубок региона по дзюдо", sport: "Дзюдо", date: "09.11.2026", result: "2 место", status: "На проверке" },
  { id: 12, athlete: "Анна Волкова", competition: "Городской забег 5 км", sport: "Бег", date: "08.11.2026", result: "19:42", status: "На проверке" },
  { id: 13, athlete: "Максим Соколов", competition: "Турнир по настольному теннису", sport: "Настольный теннис", date: "06.11.2026", result: "1 место", status: "На проверке" },
];

export const upcomingEvent = {
  isoDate: "2026-11-22",
  title: "Открытый кубок города",
  place: "Лёгкая атлетика · Манеж «Олимп»",
};
