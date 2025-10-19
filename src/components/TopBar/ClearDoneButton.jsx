import { RiDeleteBinLine } from "react-icons/ri";
import CountPill from "../CountPill";

export default function ClearDoneButton({ count = 0, onClear }) {
  return (
    <button
      type="button"
      onClick={onClear}
      disabled={!count}
      className="btn-ghost h-10 px-3 inline-flex items-center gap-2 disabled:opacity-40"
      aria-label="Clear completed tasks in active folder"
      title="Clear completed tasks in active folder"
    >
      <RiDeleteBinLine className="text-lg" />
      <span className="hidden md:inline text-nowrap">Clear done</span>
      {!!count && <CountPill count={count} color="primary" />}
    </button>
  );
}
