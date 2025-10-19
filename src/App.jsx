import { useState } from "react";
import TodoProvider from "./app/TodoProvider";
import MobileSidebar from "./components/Sidebar/MobileSidebar";
import Sidebar from "./components/Sidebar/Sidebar";
import NewTaskBar from "./components/Tasks/NewTaskBar";
import TaskDetailsResponsive from "./components/Tasks/TaskDetailsResponsive";
import TaskList from "./components/Tasks/TaskList";
import TopBar from "./components/TopBar/TopBar";
import { useTodo } from "./hooks/useTodo";

function Shell() {
  const { state } = useTodo();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeFolder = state.folders.find((f) => f.id === state.activeFolderId);

  return (
    <div className="h-dvh overflow-hidden flex flex-col">
      <div className="flex-1 min-h-0 flex flex-col overflow-y-auto md:overflow-y-hidden">
        <header className="flex items-center gap-3 px-6 py-3 border-b border-[var(--border)] bg-[var(--card)]">
          <TopBar onOpenSidebar={() => setSidebarOpen(true)} />
        </header>

        <div className="flex-1 min-h-0 md:flex">
          <aside className="hidden md:block flex-none w-[280px] border-r border-[var(--border)] bg-[var(--card)] p-4">
            <Sidebar />
          </aside>

          <main className="flex-1 min-w-0 min-h-0 flex">
            <section className="flex-1 min-h-0 min-w-0 flex flex-col">
              <div className="sticky top-0 z-10 bg-[var(--bg)]/90 backdrop-blur pb-3 pt-2 px-6">
                <h1 className="text-xl font-semibold">{activeFolder?.name}</h1>
                <NewTaskBar />
              </div>

              <TaskList />
            </section>

            <TaskDetailsResponsive />

            <MobileSidebar
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </main>
        </div>
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
