import { useTaskActions } from "../../hooks/useTaskActions";
import { useTodo } from "../../hooks/useTodo";
import TaskDetails from "./TaskDetails";

export default function TaskDetailsResponsive() {
  const { state } = useTodo();
  const selectedTaskId = state.ui?.selectedTaskId;
  const open = Boolean(selectedTaskId);

  const { deselect } = useTaskActions(selectedTaskId);

  return (
    <>
      {/* pastovi dešinė panelė */}
      <aside className="hidden lg:block w-[420px] border-l border-[var(--border)] bg-[var(--bg)]">
        <TaskDetails />
      </aside>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-[90] lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={deselect}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!open}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[min(100%,420px)]
            bg-[var(--bg)] border-l border-[var(--border)] shadow-xl
            transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          role="dialog"
          aria-label="Task details"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-12 border-b border-[var(--border)] bg-[var(--card)]">
            <div className="text-sm font-medium">Details</div>
            <button
              onClick={deselect}
              className="h-8 w-8 rounded grid place-items-center hover:bg-white/5"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="h-[calc(100%-3rem)] overflow-y-auto">
            <TaskDetails />
          </div>
        </div>
      </div>
    </>
  );
}
