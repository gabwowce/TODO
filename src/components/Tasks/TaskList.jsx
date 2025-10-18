import { useTodo } from "../../hooks/useTodo";
import TaskRow from "./TaskRow";

export default function TaskList() {
  const { state } = useTodo();
  const { activeFolderId, tasks, ui } = state;

  const list = tasks
    .filter((t) => t.folderId === activeFolderId)
    .filter((t) =>
      ui.filter === "active" ? !t.done : ui.filter === "done" ? t.done : true
    )
    .filter((t) =>
      ui.query ? t.title.toLowerCase().includes(ui.query.toLowerCase()) : true
    );

  return (
    <ul className="flex flex-col gap-3 pb-5">
      {list.map((t) => (
        <TaskRow key={t.id} task={t} />
      ))}
      {list.length === 0 && (
        <li className="text-[var(--muted)] italic">Tuščia.</li>
      )}
    </ul>
  );
}
