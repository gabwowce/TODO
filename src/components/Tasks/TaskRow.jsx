import { useState } from "react";
import { RiCheckLine, RiDeleteBinLine } from "react-icons/ri";
import { useTodo } from "../../hooks/useTodo";
import ConfettiRainCanvas from "../ConfettiRainCanvas";

export default function TaskRow({ task }) {
  const { state, dispatch } = useTodo();
  const [rains, setRains] = useState([]);
  const isActive = state.ui?.selectedTaskId === task.id;

  const toggle = (e) => {
    e.stopPropagation();
    const next = !task.done;
    if (next) {
      const id = crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random()}`;
      setRains((rs) => [...rs, id]);
    } else {
      setRains([]);
    }
    dispatch({ type: "TOGGLE_TASK", id: task.id });
  };

  const remove = (e) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_TASK", id: task.id });
  };

  const select = () => dispatch({ type: "SELECT_TASK", id: task.id });

  return (
    <li
      onClick={select}
      className={`card px-4 py-0 relative cursor-pointer
        ${isActive ? "ring-1 ring-[var(--primary)] bg-[var(--primary)]/5" : ""}
      `}
    >
      <div className="flex items-center gap-3 flex-nowrap overflow-x-auto no-scrollbar">
        <label
          className="relative inline-flex items-center select-none shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={task.done}
            onChange={toggle}
            className="sr-only peer"
          />
          <span className="h-5 w-5 rounded-md border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center transition-all duration-200 peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] peer-focus:ring-2 peer-focus:ring-[var(--primary)]/40 peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
            <RiCheckLine className="text-white text-[14px] opacity-0 scale-75 transition-all duration-200" />
          </span>
        </label>

        {/* Pavadinimas – nelaužomas į kitą eilutę, trumpinamas */}
        <span
          className={`flex-1 min-w-0 py-3 truncate ${
            task.done ? "line-through opacity-70" : ""
          }`}
          title={task.title}
        >
          {task.title}
        </span>

        <button
          className="btn-icon group shrink-0"
          title="Delete"
          aria-label="Delete"
          onClick={remove}
        >
          <RiDeleteBinLine className="text-lg transition-all duration-150 group-hover:text-[var(--danger)]" />
        </button>
      </div>

      {rains.map((id) => (
        <ConfettiRainCanvas
          key={id}
          onDone={() => setRains((rs) => rs.filter((x) => x !== id))}
          pieces={100}
          duration={500}
          speed={3}
        />
      ))}
    </li>
  );
}
