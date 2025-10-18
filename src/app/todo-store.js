export const KEY = "todo-app";
export const initial = {
  folders: [{ id: "inbox", name: "Inbox", icon: "inbox" }],
  tasks: [], // {id, folderId, title, done, createdAt}
  activeFolderId: "inbox",
  ui: { query: "", filter: "all", selectedTaskId: "" }, // filter: all | active | done
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_FOLDER":
      return { ...state, activeFolderId: action.id };
    case "ADD_FOLDER": {
      const id = crypto.randomUUID();
      return {
        ...state,
        folders: [
          ...state.folders,
          { id: id, name: action.name, icon: "folder" },
        ],
        activeFolderId: id,
      };
    }
    case "RENAME_FOLDER":
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === action.id ? { ...folder, name: action.name } : folder
        ),
      };
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter((folder) => folder.id !== action.id),
        tasks: state.tasks.filter((task) => task.folderId !== action.id),
        activeFolderId:
          state.activeFolderId === action.id ? "inbox" : state.activeFolderId,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: crypto.randomUUID(),
            folderId: state.activeFolderId,
            title: action.title,
            done: false,
            createdAt: Date.now(),
          },
        ],
      };
    case "SELECT_TASK":
      return { ...state, ui: { ...state.ui, selectedTaskId: action.id } };
    case "UPDATE_TASK_TITLE":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, done: !task.done } : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case "CLEAR_DONE_TASKS":
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.done === false)],
      };
    case "SET_QUERY":
      return { ...state, ui: { ...state.ui, query: action.query } };
    case "SET_FILTER":
      return { ...state, ui: { ...state.ui, filter: action.filter } };
    case "REPLACE_ALL":
      return action.state;
    default:
      return state;
  }
}
