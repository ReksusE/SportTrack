import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Toast from "./components/Toast";
import AchievementFormModal from "./components/AchievementFormModal";
import GoalModal from "./components/GoalModal";
import Dashboard from "./pages/Dashboard";
import Achievements from "./pages/Achievements";
import AchievementDetail from "./pages/AchievementDetail";
import CoachReview from "./pages/CoachReview";
import Reports from "./pages/Reports";
import { initialAchievements, initialRequests } from "./data/mockData";
import { messages, motivationAt, ui } from "./content/microtexts";
import { medalByPlace, toRuDate } from "./utils/format";
import "./styles/sporttrack.scss";

const pageTitles = {
  dashboard: ui.stats,
  achievements: ui.achievements,
  detail: "Карточка достижения",
  review: "Подтверждение достижений",
  reports: "Формирование отчётов",
};

export default function SportTrackApp() {
  const [activePage, setActivePage] = useState("dashboard");
  const [achievements, setAchievements] = useState(initialAchievements);
  const [requests, setRequests] = useState(initialRequests);
  const [selectedAchievementId, setSelectedAchievementId] = useState(1);
  const [form, setForm] = useState(null); // null | { item?: achievement }
  const [goalOpen, setGoalOpen] = useState(false);
  const [goal, setGoal] = useState(5);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const toastCounter = useRef(0);
  const actionsCounter = useRef(0);

  // Демонстрация состояния загрузки (в рабочей системе здесь будет запрос к API)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const showToast = useCallback((text, hint, tone = "success") => {
    toastCounter.current += 1;
    setToast({ id: toastCounter.current, text, hint, tone });
  }, []);
  const closeToast = useCallback(() => setToast(null), []);

  const selectedAchievement = useMemo(
    () => achievements.find((item) => item.id === selectedAchievementId) ?? achievements[0],
    [achievements, selectedAchievementId]
  );

  const navigate = (page) => { setActivePage(page); window.scrollTo?.(0, 0); };
  const openDetails = (id) => { setSelectedAchievementId(id); navigate("detail"); };

  const submitForm = (values) => {
    const medal = medalByPlace(values.place);
    const date = toRuDate(values.date);
    if (form.item) {
      setAchievements((current) => current.map((item) => item.id === form.item.id ? { ...item, ...values, date, medal } : item));
      showToast(messages.saveSuccess);
    } else {
      const nextId = Math.max(0, ...achievements.map((item) => item.id)) + 1;
      setAchievements((current) => [{ ...values, id: nextId, date, medal, athlete: "Александр Иванов", status: "На проверке", coachNote: "" }, ...current]);
      actionsCounter.current += 1;
      showToast(messages.addSuccess, motivationAt(actionsCounter.current));
    }
    setForm(null);
  };

  const deleteAchievement = (id) => {
    setAchievements((current) => current.filter((item) => item.id !== id));
    if (activePage === "detail" && selectedAchievementId === id) navigate("achievements");
    showToast(messages.removeSuccess);
  };

  const updateRequest = (id, status) => {
    setRequests((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    showToast(status === "Подтверждено" ? "Заявка подтверждена" : "Заявка отклонена");
  };

  const submitGoal = (value) => {
    setGoal(value);
    setGoalOpen(false);
    showToast(messages.saveSuccess);
  };

  const openAdd = () => setForm({});
  const openEdit = (item) => setForm({ item });

  const renderPage = () => {
    switch (activePage) {
      case "achievements":
        return <Achievements items={achievements} onOpen={openDetails} onAdd={openAdd} onDelete={deleteAchievement} />;
      case "detail":
        return selectedAchievement
          ? <AchievementDetail item={selectedAchievement} onBack={() => navigate("achievements")} onEdit={openEdit} onDelete={deleteAchievement} />
          : <Achievements items={achievements} onOpen={openDetails} onAdd={openAdd} onDelete={deleteAchievement} />;
      case "review":
        return <CoachReview items={requests} onUpdate={updateRequest} />;
      case "reports":
        return <Reports achievements={achievements} />;
      default:
        return <Dashboard achievements={achievements} requests={requests} goal={goal} onOpen={openDetails} onNavigate={navigate} onAdd={openAdd} onSetGoal={() => setGoalOpen(true)} />;
    }
  };

  return (
    <div className="st-app">
      <a className="st-skip" href="#st-content">Перейти к содержимому</a>
      <Sidebar activePage={activePage} onNavigate={navigate} />
      <div className="st-main">
        <Topbar title={pageTitles[activePage] || "SportTrack"} />
        <main className="st-content" id="st-content" tabIndex={-1}>
          {loading
            ? <div className="st-loading" role="status"><span className="st-spinner" aria-hidden="true" />{messages.loading}</div>
            : renderPage()}
        </main>
      </div>
      {form && <AchievementFormModal item={form.item} onSubmit={submitForm} onClose={() => setForm(null)} />}
      {goalOpen && <GoalModal current={goal} onSubmit={submitGoal} onClose={() => setGoalOpen(false)} />}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
