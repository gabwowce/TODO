import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const KEY = "theme"; // 'light' | 'dark'

function applyTheme(next) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      //ignore
    }
    const systemDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return systemDark ? "dark" : "light";
  });

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      //ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-icon group h-10 w-10"
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"}`}
    >
      <span className="inline-grid place-items-center" aria-hidden="true">
        {theme === "dark" ? (
          <BsSun
            className="text-[18px] transition-transform  duration-150
                       group-hover:opacity-80 group-hover:scale-110"
          />
        ) : (
          <BsMoon
            className="text-[18px] transition-transform duration-150
                       group-hover:opacity-80 group-hover:scale-110"
          />
        )}
      </span>
    </button>
  );
}
