// src/components/Tasks/TaskDetailsSheet.jsx
import { useEffect, useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import TaskDetails from "./TaskDetails";

function useSmallScreen() {
  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 1023.98px)").matches
      : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const onChange = () => setIsSmall(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return isSmall;
}

export default function TaskDetailsSheet() {
  const { state, dispatch } = useTodo();
  const isSmall = useSmallScreen();

  // atidarom tik kai yra pasirinktas task IR ekranas mažas
  const open = Boolean(state.ui?.selectedTaskId) && isSmall;
  const close = () => dispatch({ type: "SELECT_TASK", id: null });

  // Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Backdrop virš visko */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[90] bg-black/40 transition-opacity lg:hidden
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!open}
      />
      {/* Pats sheet */}
      <aside
        role="dialog"
        aria-label="Task details"
        className={`fixed right-0 top-0 h-full w-[min(100%,420px)]
          bg-[var(--bg)] border-l border-[var(--border)] shadow-xl
          transition-transform duration-300 will-change-transform lg:hidden z-[100]
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-12 border-b border-[var(--border)] bg-[var(--card)]">
          <div className="text-sm font-medium">Details</div>
          <button
            onClick={close}
            className="h-8 w-8 rounded grid place-items-center hover:bg-white/5"
            aria-label="Close details"
            title="Close"
          >
            ×
          </button>
        </div>
        <div className="h-[calc(100%-3rem)] overflow-y-auto">
          <TaskDetails />
        </div>
      </aside>
    </>
  );
}
