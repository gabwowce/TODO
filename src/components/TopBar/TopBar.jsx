import { useMemo } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useTodo } from "../../hooks/useTodo";
import ClearDoneButton from "./ClearDoneButton";
import FilterPills from "./FilterPills";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";

export default function TopBar({ onOpenSidebar }) {
  const { state, dispatch } = useTodo();
  const doneCount = useMemo(() => {
    const fid = state.activeFolderId;
    return state.tasks.filter((t) => t.folderId === fid && t.done).length;
  }, [state.tasks, state.activeFolderId]);

  return (
    <>
      {/* ===== MOBILE (<md) ===== */}
      <div className="flex md:hidden flex-col gap-2">
        {/* viršutinė eilutė: hamburger | TODO | veiksmai */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSidebar}
            className="h-9 w-9 rounded-xl grid place-items-center border border-[var(--border)] bg-[var(--card)] hover:bg-white/5"
            aria-label="Open menu"
            title="Open menu"
          >
            <RiMenuLine className="text-[var(--fg)] text-xl" />
          </button>

          <span className="text-lg font-bold">TODO</span>

          <div className="ml-auto flex items-center gap-2">
            <ClearDoneButton
              count={doneCount}
              onClear={() =>
                dispatch({
                  type: "CLEAR_DONE_TASKS",
                  folderId: state.activeFolderId,
                })
              }
            />
            <ThemeToggle />
          </div>
        </div>

        {/* paieška + filtrai (pilnas plotis, filtrai ne tempiasi per visą) */}
        <div className="w-full">
          <SearchInput
            value={state.ui?.query ?? ""}
            onChange={(q) => dispatch({ type: "SET_QUERY", query: q })}
            onClear={() => dispatch({ type: "SET_QUERY", query: "" })}
          />
          <div className="mt-2 w-full flex justify-center">
            <div className="inline-flex items-center gap-2 overflow-x-auto no-scrollbar px-1 mt-2">
              <FilterPills
                value={state.ui.filter}
                onChange={(f) => dispatch({ type: "SET_FILTER", filter: f })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP (≥md) — PALIKTA KAIP BUVO ===== */}
      <div className="hidden md:flex items-center gap-3">
        <span className="text-lg font-bold">TODO</span>

        <div className="flex-1 flex gap-5 justify-center">
          <SearchInput
            value={state.ui?.query ?? ""}
            onChange={(q) => dispatch({ type: "SET_QUERY", query: q })}
            onClear={() => dispatch({ type: "SET_QUERY", query: "" })}
          />

          <FilterPills
            value={state.ui.filter}
            onChange={(f) => dispatch({ type: "SET_FILTER", filter: f })}
          />

          <ClearDoneButton
            count={doneCount}
            onClear={() =>
              dispatch({
                type: "CLEAR_DONE_TASKS",
                folderId: state.activeFolderId,
              })
            }
          />
        </div>

        <ThemeToggle />
      </div>
    </>
  );
}
