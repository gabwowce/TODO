import { useEffect, useMemo, useReducer } from "react";
import { Ctx } from "./TodoContext";
import { initial, reducer } from "./todo-store.js";

export default function TodoProvider({ children }) {
  const core = JSON.parse(localStorage.getItem("todo-app") || "{}");

  const [state, dispatch] = useReducer(reducer, { ...initial, ...core });

  const { folders, tasks, activeFolderId } = state;

  useEffect(() => {
    localStorage.setItem(
      "todo-app",
      JSON.stringify({ folders, tasks, activeFolderId })
    );
  }, [folders, tasks, activeFolderId]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
