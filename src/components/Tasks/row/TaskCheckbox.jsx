import { RiCheckLine } from "react-icons/ri";

export default function TaskCheckbox({ checked, onChange }) {
  return (
    <label
      className="relative inline-flex items-center select-none shrink-0"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        aria-label="Toggle task"
      />
      <span className="h-5 w-5 rounded-full border border-[var(--border)] bg-[var(--bg)] flex items-center justify-center transition-all duration-200 peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] peer-focus:ring-2 peer-focus:ring-[var(--primary)]/40 peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
        <RiCheckLine className="text-white text-[14px] opacity-0 scale-75 transition-all duration-200" />
      </span>
    </label>
  );
}
