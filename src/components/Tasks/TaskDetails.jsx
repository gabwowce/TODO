// src/components/Tasks/TaskDetails.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import ConfettiRainCanvas from "../ConfettiRainCanvas";

export default function TaskDetails() {
  const { state, dispatch } = useTodo();
  const selectedId = state.ui?.selectedTaskId;
  const task =
    (Array.isArray(state.tasks) &&
      state.tasks.find((x) => x.id === selectedId)) ||
    null;

  const [text, setText] = useState("");
  const [rain, setRain] = useState(false); // konfeti valdymas
  const [justSaved, setJustSaved] = useState(false);

  // kad "Saved ✓" išsijungtų patikimai
  const timeoutRef = useRef(null);

  useEffect(() => {
    setText(task ? task.title || "" : "");
  }, [task]);

  const save = useCallback(() => {
    if (!task) return;
    const t = (text || "").trim();
    if (!t || t === task.title) return;

    dispatch({ type: "UPDATE_TASK_TITLE", id: task.id, title: t });

    setJustSaved(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustSaved(false), 1500);
  }, [text, task, dispatch]);

  // Ctrl/Cmd + S
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  // jei nėra pasirinkto task
  if (!task) {
    return (
      <div className="p-8 text-[var(--muted)]">
        Select a task to view details
      </div>
    );
  }

  const toggle = () => {
    const willBeDone = !task.done;
    if (willBeDone) setRain(true); // DONE → paleidžiam konfeti
    else setRain(false); // Active → stabdom konfeti
    dispatch({ type: "TOGGLE_TASK", id: task.id });
  };

  const remove = () => {
    if (confirm("Delete this task?")) {
      dispatch({ type: "DELETE_TASK", id: task.id });
    }
  };

  const createdAt = task.createdAt ? new Date(task.createdAt) : null;

  // statuso ženklelis (naudoja CSS kintamuosius iš :root/.dark)
  const statusStyle = task.done
    ? {
        "--b-bg": "var(--status-done-bg)",
        "--b-fg": "var(--status-done-fg)",
        "--b-ring": "var(--status-done-ring)",
      }
    : {
        "--b-bg": "var(--status-active-bg)",
        "--b-fg": "var(--status-active-fg)",
        "--b-ring": "var(--status-active-ring)",
      };

  return (
    <div className="flex flex-col h-full">
      {/* Viršus */}
      <div className="p-4 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center gap-3 text-sm">
          <span
            style={statusStyle}
            className="px-2 py-0.5 rounded-full bg-[var(--b-bg)] text-[var(--b-fg)] ring-1 ring-[var(--b-ring)]"
          >
            {task.done ? "Done" : "Active"}
          </span>
          {createdAt && (
            <span className="text-[var(--muted)]">
              • Created: {createdAt.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* „Baltas lapas“ */}
      <div className="p-4 flex-1 min-h-0">
        <textarea
          className="w-full h-full min-h-[320px] flex-1 resize-none bg-[var(--bg)] text-[var(--fg)]
                     rounded-xl border border-[var(--border)] shadow-sm p-4 leading-6 outline-none
                     focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
          placeholder="Write your task details here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Apačios veiksmai */}
      <div className="sticky bottom-0 left-0 right-0 bg-[var(--card)]/95 backdrop-blur border-t border-[var(--border)]">
        <div className="p-4 flex items-center justify-between gap-2">
          <button
            onClick={remove}
            className="px-4 h-10 rounded-full text-white bg-[var(--danger)] hover:opacity-90"
          >
            Delete
          </button>

          <div className="flex gap-2 items-center">
            <button
              onClick={toggle}
              className={`px-4 h-10 rounded-full text-white ${
                task.done
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {task.done ? "Mark as Active" : "Mark as Done"}
            </button>

            <button
              onClick={save}
              disabled={!text.trim() || justSaved}
              className={`px-4 h-10 rounded-full
                ${
                  justSaved
                    ? "bg-[var(--success)] text-[var(--success-fg)]"
                    : text.trim()
                    ? "bg-[var(--primary)] text-white hover:opacity-90"
                    : "bg-[var(--primary)]/40 text-white/80 cursor-not-allowed"
                }`}
            >
              {justSaved ? "Saved ✓" : "Save"}
            </button>

            {/* ekrano skaitytuvams */}
            <span className="sr-only" aria-live="polite">
              {justSaved ? "Saved" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Konfeti per visą ekraną */}
      {rain && (
        <ConfettiRainCanvas
          onDone={() => setRain(false)} // baigus – paslepiam
          pieces={140}
          duration={3500}
          speed={2}
        />
      )}
    </div>
  );
}
