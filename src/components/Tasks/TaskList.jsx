import { useTodo } from "../../hooks/useTodo";
import EmptyState from "../EmptyState";
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
    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden min-w-0">
      <div className="p-6 space-y-4 min-w-0">
        <ul className="flex flex-col gap-3 pb-5">
          {list.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </ul>
        {list.length === 0 && (
          <EmptyState filter={ui.filter} query={ui.query} />
        )}
      </div>
    </div>
  );
}
