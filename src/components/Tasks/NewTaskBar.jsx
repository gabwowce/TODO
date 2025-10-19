import { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { useTodo } from "../../hooks/useTodo";
import Button from "../Button";

export default function NewTaskBar() {
  const { dispatch } = useTodo();
  const [title, setTitle] = useState("");
  const add = () => {
    const t = title.trim();
    if (!t) return;
    dispatch({ type: "ADD_TASK", title: t });
    setTitle("");
  };

  return (
    <div className="flex items-center gap-2 w-full py-2">
      <div className="flex-1 flex items-center gap-3  h-12 pl-3 pr-2">
        <div className="shrink-0 w-6 h-6 rounded-full bg-[var(--primary)]/15 flex items-center justify-center">
          <RiAddLine
            className="text-[var(--primary)] text-xl"
            aria-hidden="true"
          />
          <span className="sr-only">Add task</span>
        </div>
        <input
          className="flex-1 input min-w-0 w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
          placeholder="Add a new task… (Press Enter)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          aria-label="Add a new task"
        />
      </div>

      <Button
        onClick={add}
        disabled={title.trim()}
        aria-disabled={title.trim()}
        title="Add task"
      >
        Add
      </Button>
    </div>
  );
}
