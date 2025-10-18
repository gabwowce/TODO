import { useEffect, useRef, useState } from "react";

export default function useDropdownMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (e.target.closest("[data-portal-menu]")) return;
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    const onCloseAll = () => setOpen(false);

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    window.addEventListener("close-all-menus", onCloseAll);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
      window.removeEventListener("close-all-menus", onCloseAll);
    };
  }, []);

  const openExclusively = () => {
    window.dispatchEvent(new Event("close-all-menus"));
    setOpen(true);
  };

  return { open, setOpen, openExclusively, rootRef };
}
