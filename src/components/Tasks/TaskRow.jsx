import { useState } from "react";
import { useTaskActions } from "../../hooks/useTaskActions";
import ConfettiRainCanvas from "../ConfettiRainCanvas";
import DeleteButton from "./row/DeleteButton";
import TaskCheckbox from "./row/TaskCheckbox";
import TaskTitle from "./row/TaskTitle";
export default function TaskRow({ task: taskProp }) {
  const { task, isActive, toggle, remove, select } = useTaskActions(
    taskProp.id
  );
  const [rains, setRains] = useState([]);

  if (!task) return null;

  const onToggle = (e) => {
    e.stopPropagation();
    const willBeDone = !task.done;
    if (willBeDone) {
      const id = crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random()}`;
      setRains((rs) => [...rs, id]);
    } else {
      setRains([]);
    }
    toggle();
  };

  const onRemove = (e) => {
    e.stopPropagation();
    remove();
  };

  return (
    <li
      onClick={select}
      className={`card px-4 py-0 relative cursor-pointer min-w-0
    ${isActive ? "ring-1 ring-[var(--primary)] bg-[var(--primary)]/5" : ""}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <TaskCheckbox checked={task.done} onChange={onToggle} />
        <TaskTitle title={task.title} done={task.done} oneLine />
        <DeleteButton onClick={onRemove} />
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
