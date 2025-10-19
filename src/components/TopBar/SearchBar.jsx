import { useTodo } from "../../hooks/useTodo";
import SearchInput from "./SearchInput";

export default function SearchBar() {
  const { state, dispatch } = useTodo();
  return (
    <SearchInput
      value={state.ui?.query ?? ""}
      onChange={(q) => dispatch({ type: "SET_QUERY", query: q })}
      onClear={() => dispatch({ type: "SET_QUERY", query: "" })}
    />
  );
}
