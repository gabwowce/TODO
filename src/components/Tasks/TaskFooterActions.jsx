export default function TaskFooterActions({
  isDone,
  onDelete,
  onToggle,
  onSave,
  canSave,
  justSaved,
}) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[var(--card)]/95 backdrop-blur border-t border-[var(--border)]">
      <div className="p-4 flex items-center justify-between gap-2">
        <button
          onClick={onDelete}
          className="px-4 h-10 rounded-full text-white bg-[var(--danger)] hover:opacity-90"
        >
          Delete
        </button>
        <div className="flex gap-2 items-center">
          <button
            onClick={onToggle}
            className={`px-4 h-10 rounded-full text-white ${
              isDone
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isDone ? "Mark as Active" : "Mark as Done"}
          </button>
          <button
            onClick={onSave}
            disabled={!canSave || justSaved}
            className={`px-4 h-10 rounded-full ${
              justSaved
                ? "bg-[var(--success)] text-[var(--success-fg)]"
                : canSave
                ? "bg-[var(--primary)] text-white hover:opacity-90"
                : "bg-[var(--primary)]/40 text-white/80 cursor-not-allowed"
            }`}
          >
            {justSaved ? "Saved ✓" : "Save"}
          </button>
          <span className="sr-only" aria-live="polite">
            {justSaved ? "Saved" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
