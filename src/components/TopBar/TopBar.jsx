import { useMemo } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useTodo } from "../../hooks/useTodo";
import ClearDoneButton from "./ClearDoneButton";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function TopBar({ onOpenSidebar }) {
  const { state, dispatch } = useTodo();

  const doneCount = useMemo(() => {
    const fid = state.activeFolderId;
    return state.tasks.filter((t) => t.folderId === fid && t.done).length;
  }, [state.tasks, state.activeFolderId]);
  const activeFolder = state.folders.find((f) => f.id === state.activeFolderId);
  const folderName = activeFolder?.name;

  const clearDone = () => {
    if (!doneCount) return;
    const ok = window.confirm(`Clear done tasks in „${folderName}“ folder?`);
    if (!ok) return;
    dispatch({ type: "CLEAR_DONE_TASKS", folderId: state.activeFolderId });
  };

  return (
    <div className="flex-1">
      {/* MOBILE*/}
      <div className="flex md:hidden flex-col gap-2">
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
            <ClearDoneButton count={doneCount} onClear={clearDone} />
            <ThemeToggle />
          </div>
        </div>
        <SearchBar />
        <div className="flex justify-center">
          <FilterBar />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between gap-3">
        <span className="text-lg font-bold">TODO</span>

        <div className="flex-1 flex flex-row justify-center items-center gap-2">
          <SearchBar />
          <FilterBar />
          <ClearDoneButton count={doneCount} onClear={clearDone} />
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}
