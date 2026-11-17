import { useState } from "react";
import Modal from "./Modal";
import { messages, ui } from "../content/microtexts";
import { sports } from "../data/mockData";
import { toIsoDate } from "../utils/format";

const emptyForm = { competition: "", sport: sports[0], date: "", result: "", place: "1" };

function toForm(item) {
  if (!item) return emptyForm;
  return { competition: item.competition, sport: item.sport, date: toIsoDate(item.date), result: item.result, place: String(item.place ?? 1) };
}

// Одна форма для добавления и редактирования
export default function AchievementFormModal({ item, onSubmit, onClose }) {
  const isEdit = Boolean(item);
  const [form, setForm] = useState(() => toForm(item));
  const [errors, setErrors] = useState({});

  const setField = (name) => (event) => {
    setForm((current) => ({ ...current, [name]: event.target.value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.competition.trim()) next.competition = messages.required;
    if (!form.date) next.date = messages.required;
    if (!form.result.trim()) next.result = messages.required;
    const place = Number(form.place);
    if (form.place === "") next.place = messages.required;
    else if (!Number.isInteger(place) || place < 1) next.place = messages.invalid;
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ ...form, competition: form.competition.trim(), result: form.result.trim(), place: Number(form.place) });
  };

  const hasRequiredError = Object.values(errors).includes(messages.required);
  const hasErrors = Object.values(errors).some(Boolean);

  const field = (name) => ({
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `err-${name}` : undefined,
  });
  const fieldError = (name) => errors[name] && <span className="st-field-error" id={`err-${name}`}>{errors[name]}</span>;

  return (
    <Modal title={isEdit ? ui.edit : ui.addWorkout} onClose={onClose}>
      <form className="st-form" onSubmit={submit} noValidate>
        {hasErrors && <div className="st-form-alert" role="alert">{hasRequiredError ? messages.formError : messages.invalid}</div>}
        <label>Название соревнования
          <input value={form.competition} onChange={setField("competition")} placeholder="Например, Кубок города" {...field("competition")} />
          {fieldError("competition")}
        </label>
        <div className="st-form__row">
          <label>Вид спорта
            <select value={form.sport} onChange={setField("sport")}>{sports.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
          <label>Дата
            <input type="date" value={form.date} onChange={setField("date")} {...field("date")} />
            {fieldError("date")}
          </label>
        </div>
        <div className="st-form__row">
          <label>Результат
            <input value={form.result} onChange={setField("result")} placeholder="00:58.42" {...field("result")} />
            {fieldError("result")}
          </label>
          <label>Занятое место
            <input type="number" min="1" value={form.place} onChange={setField("place")} {...field("place")} />
            {fieldError("place")}
          </label>
        </div>
        <div className="st-form__actions">
          <button type="button" className="st-button st-button--secondary" onClick={onClose}>{ui.cancel}</button>
          <button className="st-button st-button--primary" type="submit">{isEdit ? ui.save : ui.add}</button>
        </div>
      </form>
    </Modal>
  );
}
