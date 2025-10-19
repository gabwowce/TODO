import { useTaskDetails } from "../../hooks/useTaskDetails";
import { useTodo } from "../../hooks/useTodo";
import ConfettiRainCanvas from "../ConfettiRainCanvas";
import TaskEditor from "./TaskEditor";
import TaskFooterActions from "./TaskFooterActions";
import TaskHeader from "./TaskHeader";
export default function TaskDetails() {
  const { state } = useTodo();
  const selectedId = state.ui.selectedTaskId;
  const {
    task,
    text,
    setText,
    save,
    justSaved,
    toggleAndSetRain,
    remove,
    rain,
    setRain,
    createdAt,
    isTaskDone,
  } = useTaskDetails(selectedId);

  if (!task)
    return (
      <div className="p-8 text-[var(--muted)]">
        Select a task to view details
      </div>
    );

  const statusStyle =
    isTaskDone === undefined
      ? {}
      : isTaskDone
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
      <TaskHeader
        isDone={isTaskDone}
        createdAt={createdAt}
        statusStyle={statusStyle}
      />
      <TaskEditor text={text} setText={setText} />
      <TaskFooterActions
        isDone={isTaskDone}
        onDelete={remove}
        onToggle={toggleAndSetRain}
        onSave={save}
        canSave={!!text.trim()}
        justSaved={justSaved}
      />
      {rain && (
        <ConfettiRainCanvas
          onDone={() => setRain(false)}
          pieces={140}
          duration={3500}
          speed={2}
        />
      )}
    </div>
  );
}
