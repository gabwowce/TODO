import { createPortal } from "react-dom";

export default function OverlayMenuPortal({
  anchorRect,
  items,
  maxWidth = 240,
}) {
  if (!anchorRect || !items?.length) return null;

  const style = {
    position: "fixed",
    top: Math.round(anchorRect.bottom + 6) + "px",
    left:
      Math.round(Math.min(anchorRect.left, window.innerWidth - maxWidth)) +
      "px",
    zIndex: 1000,
  };

  return createPortal(
    <div
      style={style}
      data-portal-menu
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div role="menu" className="card shadow-lg p-1 min-w-44">
        {items.map((it) => (
          <button
            key={it.key}
            role="menuitem"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--border)]/40 ${
              it.danger ? "text-[var(--danger)]" : ""
            }`}
            onClick={it.onClick}
          >
            {it.icon ? <span className="text-current">{it.icon}</span> : null}
            <span>{it.label}</span>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}
