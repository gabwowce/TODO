import { useTodo } from "../../hooks/useTodo";
import FilterPills from "./FilterPills";

export default function FilterBar() {
  const { state, dispatch } = useTodo();
  return (
    <FilterPills
      value={state.ui.filter}
      onChange={(f) => dispatch({ type: "SET_FILTER", filter: f })}
    />
  );
}
