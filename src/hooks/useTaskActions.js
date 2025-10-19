import { useTodo } from "./useTodo";

export function useTaskActions(taskId) {
  const { state, dispatch } = useTodo();
  const task = state.tasks.find((t) => t.id === taskId) ?? null;
  const isActive = state.ui?.selectedTaskId === taskId;
  const toggle = () => {
    if (task) dispatch({ type: "TOGGLE_TASK", id: task.id });
  };
  const remove = () => {
    if (task && confirm("Delete this task?"))
      dispatch({ type: "DELETE_TASK", id: task.id });
  };
  const select = () => {
    if (task) dispatch({ type: "SELECT_TASK", id: task.id });
  };
  const deselect = () => dispatch({ type: "SELECT_TASK", id: null });
  const update = (title) => {
    const t = title?.trim();
    if (task && t && t !== task.title) {
      dispatch({ type: "UPDATE_TASK_TITLE", id: task.id, title: t });
    }
  };

  return { task, toggle, update, remove, select, deselect, isActive };
}
