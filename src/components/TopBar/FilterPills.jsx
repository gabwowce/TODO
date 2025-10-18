const FILTERS = { all: "All", active: "Active", done: "Done" };

export default function FilterPills({ value, onChange }) {
  return (
    <div className="pill-group" role="tablist" aria-label="Filter tasks">
      {Object.entries(FILTERS).map(([key, label]) => {
        const active = value === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={`pill ${active ? "pill-active" : ""}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
