import { useEffect, useRef, useState } from "react";
import { useTaskActions } from "./useTaskActions";

export function useTaskDetails(selectedId) {
  const { task, toggle, remove, update } = useTaskActions(selectedId);
  const [text, setText] = useState("");
  const [rain, setRain] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    setText(task?.title ?? "");
  }, [task]);

  const save = () => {
    if (!task) return;
    update(text);
    setJustSaved(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustSaved(false), 1500);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const toggleAndSetRain = () => {
    if (!task) return;
    setRain(!task.done);
    toggle();
  };

  const createdAt = task?.createdAt;
  const isTaskDone = task?.done;

  return {
    task,
    text,
    setText,
    save,
    justSaved,
    toggle,
    toggleAndSetRain,
    remove,
    rain,
    setRain,
    createdAt,
    isTaskDone,
  };
}
