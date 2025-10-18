import { useEffect, useState } from "react";
import TodoProvider from "../src/app/TodoProvider";
import MobileSidebar from "./components/Sidebar/MobileSidebar";
import Sidebar from "./components/Sidebar/Sidebar";
import NewTaskBar from "./components/Tasks/NewTaskBar";
import TaskDetails from "./components/Tasks/TaskDetails";
import TaskDetailsSheet from "./components/Tasks/TaskDetailsSheet";
import TaskList from "./components/Tasks/TaskList";
import TopBar from "./components/TopBar/TopBar";
import { useTodo } from "./hooks/useTodo";

function Shell() {
  const { state } = useTodo();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeFolder = state.folders.find((f) => f.id === state.activeFolderId);

  // body scroll lock kai atidarytas
  useEffect(() => {
    if (!sidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* Header su hamburger (tik <md) */}
      <header className="flex items-center gap-3 px-6 py-3 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="flex-1">
          <TopBar onOpenSidebar={() => setSidebarOpen(true)} />
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        {/* Desktop sidebar (≥md) */}
        <aside className="hidden md:block flex-none w-[280px] border-r border-[var(--border)] bg-[var(--card)] p-4">
          <Sidebar />
        </aside>

        {/* Main */}
        <main className="relative flex-1 min-w-0 min-h-0">
          <div className="min-h-0 overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="sticky top-0 z-10 bg-[var(--bg)]/90 backdrop-blur pb-3 pt-2">
                <h1 className="text-xl font-semibold">{activeFolder?.name}</h1>
                <NewTaskBar />
              </div>
              <TaskList />
              <div className="h-12" />
            </div>
          </div>
        </main>

        {/* ≥lg pastovi dešinė panelė */}
        <aside className="hidden lg:block w-[420px] border-l border-[var(--border)] bg-[var(--bg)]">
          <TaskDetails />
        </aside>

        {/* Mobilus sidebar <md */}
        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <TaskDetailsSheet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <Shell />
    </TodoProvider>
  );
}
