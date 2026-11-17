import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  // Контейнер живёт всегда, чтобы экранные дикторы озвучивали появившееся сообщение
  return (
    <div className="st-toast-region" role="status" aria-live="polite">
      {toast && (
        <div className={`st-toast is-${toast.tone ?? "success"}`} key={toast.id}>
          <div>
            <strong>{toast.text}</strong>
            {toast.hint && <span>{toast.hint}</span>}
          </div>
          <button type="button" onClick={onClose} aria-label="Закрыть уведомление">×</button>
        </div>
      )}
    </div>
  );
}
