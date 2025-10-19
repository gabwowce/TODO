# TODO – paprasta, greita ir responsyvi užduočių aplikacija

TODO aplikacija su aplankais, paieška ir filtravimu (`all` / `active` / `done`), pritaikyta mobile, konfeti efektas kai užduotis pažymima kaip atlikta.

---

## Diegimas

1. Gauk kodą

   ```bash
   git clone https://github.com/gabwowce/TODO
   ```

2. Įdiek priklausomybes

   ```bash
   npm install
   ```

3. Paleisk vystymo režimu (Vite)
   ```bash
   npm run dev
   ```
   Atverk terminale nurodytą adresą (pvz., http://localhost:5173).

---

## Funkcionalumas

- **Aplankai (Folders):** `Inbox` + sukurti aplankai (galima: kurti, pervadinti, trinti).
- **Užduotys (Tasks):** kurti, `Done/Active` perjungimas, trinti.
- **Filtrai:** `all | active | done`.
- **Paieška:** realaus laiko filtras pagal pavadinimą.
- **Clear done:** pašalina visas atliktas užduotis aktyviame aplanke.
- **Užduoties informacija:** dešinėje – pastovi panelė; mobile – „sheet“ iš dešinės.
- **Temos perjungimas:** šviesi / tamsi tema (ThemeToggle).

---

## Technologijos ir architektūra

- **React + Vite + Tailwind**.
- **Globali būsena:** `useReducer` + Context (`TodoProvider`).
- **Logika hookuose** (UI komponentai):
  - `useTodo()` – prieiga prie globalios būsenos ir `dispatch`.
  - `useTaskActions(taskId)` – su konkrečia užduotimi susiję veiksmai (`toggle`, `update`, `remove`, `select`, `deselect`).
  - `useTaskDetails(selectedId)` – redagavimo būsena (tekstai, „Saved ✓“, konfeti).
  - `useConfettiRain()` – canvas animacijos logika.
- **Komponentų sluoksniai:**
  - `TopBar` (`SearchBar`, `FilterBar`, `ThemeToggle`, `ClearDoneButton`)
  - `TaskList` → `TaskRow` (išskaidyta į `TaskCheckbox`, `TaskTitle`, `DeleteButton`)
  - `TaskDetails` (sudarytas iš `TaskHeader`, `TaskEditor`, `TaskFooterActions`)
  - `TaskDetailsResponsive` – vienas komponentas desktop panelėms ir mobiliam „sheet“
  - `Sidebar` / `MobileSidebar`

---

## Būsenos schema

```ts
export const initial = {
  folders: [{ id: "inbox", name: "Inbox", icon: "inbox" }],
  tasks: [], // { id, folderId, title, done, createdAt }
  activeFolderId: "inbox",
  ui: {
    query: "",
    filter: "all", // "all" | "active" | "done"
    selectedTaskId: "",
  },
};
```
