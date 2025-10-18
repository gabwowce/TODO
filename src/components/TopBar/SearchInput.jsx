import { RiCloseLine, RiSearchLine } from "react-icons/ri";

export default function SearchInput({
  value = "",
  onChange,
  placeholder = "Search tasks…",
  onClear,
}) {
  return (
    <div className="w-full max-w-xl input-group">
      <RiSearchLine className="text-[var(--muted)] text-lg" aria-hidden />
      <input
        className="input-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label="Search tasks"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange?.("");
            onClear?.();
          }}
          className="btn-ghost h-7 px-2"
          aria-label="Clear search"
          title="Clear search"
        >
          <RiCloseLine />
        </button>
      )}
    </div>
  );
}
