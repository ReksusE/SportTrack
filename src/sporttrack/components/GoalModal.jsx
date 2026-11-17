import { useState } from "react";
import Modal from "./Modal";
import { messages, ui } from "../content/microtexts";

export default function GoalModal({ current, onSubmit, onClose }) {
  const [value, setValue] = useState(String(current));
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const number = Number(value);
    if (value === "") return setError(messages.required);
    if (!Number.isInteger(number) || number < 1 || number > 100) return setError(messages.invalid);
    onSubmit(number);
  };

  return (
    <Modal title={ui.setGoal} onClose={onClose}>
      <form className="st-form" onSubmit={submit} noValidate>
        <label>Сколько подтверждённых результатов вы хотите набрать
          <input type="number" min="1" max="100" value={value} aria-invalid={error ? "true" : undefined} aria-describedby={error ? "err-goal" : undefined}
            onChange={(e) => { setValue(e.target.value); setError(""); }} />
          {error && <span className="st-field-error" id="err-goal">{error}</span>}
        </label>
        <div className="st-form__actions">
          <button type="button" className="st-button st-button--secondary" onClick={onClose}>{ui.cancel}</button>
          <button className="st-button st-button--primary" type="submit">{ui.save}</button>
        </div>
      </form>
    </Modal>
  );
}
