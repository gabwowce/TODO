import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
  RiListCheck,
  RiSearchLine,
} from "react-icons/ri";

const COPY = {
  all: { title: "No tasks yet", hint: "Add your first task below." },
  active: { title: "All done!", hint: "No active tasks remaining." },
  done: {
    title: "No completed tasks",
    hint: "Completed tasks will appear here.",
  },
  search: (q) => ({ title: "Nothing found", hint: `No results for “${q}”.` }),
};

const ICONS = {
  all: <RiListCheck size={64} className="opacity-40" aria-hidden />,
  active: (
    <RiCheckboxCircleLine
      size={64}
      className="text-emerald-500/70"
      aria-hidden
    />
  ),
  done: (
    <RiCheckboxBlankCircleLine size={64} className="opacity-40" aria-hidden />
  ),
  search: <RiSearchLine size={64} className="opacity-40" aria-hidden />,
};

export default function EmptyState({ filter = "all", query = "" }) {
  const key = query ? "search" : filter;
  const copy = query ? COPY.search(query) : COPY[key] ?? COPY.all;

  return (
    <div className="flex-1 min-h-[50vh] grid place-items-center">
      <div className="flex flex-col items-center text-center">
        {ICONS[key] || ICONS.all}
        <h3 className="mt-2 text-xl font-semibold">{copy.title}</h3>
        <p className="text-sm text-[var(--muted)]">{copy.hint}</p>
      </div>
    </div>
  );
}
