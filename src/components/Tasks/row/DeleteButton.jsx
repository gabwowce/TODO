import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteButton({ onClick }) {
  return (
    <button
      className="btn-icon group shrink-0"
      title="Delete"
      aria-label="Delete"
      onClick={onClick}
    >
      <RiDeleteBinLine className="text-lg transition-all duration-150 group-hover:text-[var(--danger)]" />
    </button>
  );
}
