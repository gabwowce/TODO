import { useContext } from "react";
import { Ctx } from "../app/TodoContext";
export const useTodo = () => useContext(Ctx);
