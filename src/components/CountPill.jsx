export default function CountPill({ count, color = "primary" }) {
  return (
    <span
      className={`ml-auto text-xs px-2 h-5 rounded-full bg-[var(--${color})] text-[var(--${color}-fg)] flex items-center`}
    >
      {count}
    </span>
  );
}
