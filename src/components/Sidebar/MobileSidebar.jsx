import { useEffect, useRef } from "react";
import { useTodo } from "../../hooks/useTodo";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ open, onClose }) {
  const { state } = useTodo();
  const activeId = state.activeFolderId;
  const prevIdRef = useRef(activeId);

  // Uždaryk, kai aktyvus folderis pasikeičia (vartotojas pasirinko iš sidebaro)
  useEffect(() => {
    if (!open) {
      prevIdRef.current = activeId;
      return;
    }
    if (prevIdRef.current !== activeId) onClose?.();
    prevIdRef.current = activeId;
  }, [activeId, open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 z-[60] bg-black/40 transition-opacity
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        aria-hidden={!open}
      />
      <aside
        role="dialog"
        aria-label="Sidebar"
        className={`
          md:hidden fixed left-0 top-0 h-full w-[min(85vw,320px)]
          bg-[var(--card)] border-r border-[var(--border)] shadow-xl
          transition-transform duration-300 will-change-transform z-[70]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 h-12 border-b border-[var(--border)] bg-[var(--card)]">
          <div className="text-sm font-medium">Menu</div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded grid place-items-center hover:bg-white/5"
            aria-label="Close menu"
            title="Close"
          >
            ×
          </button>
        </div>
        <div className="h-[calc(100%-3rem)] overflow-y-auto p-4">
          <Sidebar />
        </div>
      </aside>
    </>
  );
}
