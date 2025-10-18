import { memo, useRef, useState } from "react";
import { RiMore2Fill } from "react-icons/ri";
import useDropdownMenu from "../../hooks/useDropdownMenu";
import CountPill from "../CountPill";
import OverlayMenuPortal from "../OverlayMenuPortal";

function FolderItem({
  id,
  name,
  active = false,
  count = 0,
  icon = null,
  onSelect,
  menuItems = [],
}) {
  const { open, setOpen, openExclusively, rootRef } = useDropdownMenu();
  const triggerRef = useRef(null);
  const [rect, setRect] = useState(null);
  const hasMenu = menuItems.length > 0;

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    if (open) return setOpen(false);
    const r = triggerRef.current?.getBoundingClientRect() ?? null;
    setRect(r);
    openExclusively();
  };
  const textCls = active ? "text-[var(--primary-fg)]" : "text-[var(--fg)]";
  const iconCls = active ? "text-[var(--primary-fg)]" : "text-[var(--muted)]";
  const moreColorCls =
    open || active
      ? "text-[var(--primary-fg)]"
      : "text-[var(--muted)] group-hover:text-[var(--fg)]";
  const baseRowCls =
    "group flex items-center gap-2 rounded-full px-4 py-1 cursor-pointer hover:bg-[var(--border)]/40";
  const activeRowCls =
    "bg-[var(--primary)] ring-1 ring-[var(--primary)] hover:bg-[var(--primary)]";
  const rowCls = `${baseRowCls} ${active ? activeRowCls : ""}`;
  const moreBtnBase = "btn-icon h-8 px-2 transition-opacity";
  const moreBtnOpen = "opacity-100";
  const moreBtnClosed = "opacity-0 group-hover:opacity-100 focus:opacity-100";

  const moreBtnCls = `${moreBtnBase} ${open ? moreBtnOpen : moreBtnClosed}`;

  return (
    <li ref={rootRef} className="flex flex-col ">
      <div className={rowCls} onClick={() => onSelect?.(id)}>
        {icon ? <span className={iconCls}>{icon}</span> : null}
        <span className={`truncate flex-1 ${textCls}`}>{name}</span>
        <span className={textCls}>
          <CountPill count={count} color="transparent" />
        </span>

        {hasMenu && (
          <button
            ref={triggerRef}
            type="button"
            className={moreBtnCls}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Folder actions"
            onClick={handleToggleMenu}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <RiMore2Fill className={moreColorCls} />
          </button>
        )}
      </div>

      {open && hasMenu && (
        <OverlayMenuPortal anchorRect={rect} items={menuItems} />
      )}
    </li>
  );
}

export default memo(FolderItem);
