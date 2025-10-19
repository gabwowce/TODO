export default function TaskHeader({ isDone, createdAt, statusStyle }) {
  return (
    <div className="p-4 border-b border-[var(--border)] bg-[var(--card)]">
      <div className="flex items-center gap-3 text-sm">
        <span
          style={statusStyle}
          className="px-2 py-0.5 rounded-full bg-[var(--b-bg)] text-[var(--b-fg)] ring-1 ring-[var(--b-ring)]"
        >
          {isDone ? "Done" : "Active"}
        </span>
        {createdAt && (
          <span className="text-[var(--muted)]">
            • Created: {createdAt.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
