import { useCallback, useMemo } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

export default function useSidebarFolders(state, dispatch) {
  const folders = state.folders;

  const inbox = folders.find((f) => f.id === "inbox");
  const others = folders.filter((f) => f.id !== "inbox");

  const tasks = state.tasks;

  const counts = useMemo(() => {
    const map = {};
    for (let i = 0; i < tasks.length; i++) {
      const fid = tasks[i].folderId;
      map[fid] = (map[fid] || 0) + 1;
    }
    return map;
  }, [tasks]);

  const getCount = (id) => counts[id] || 0;

  const onSelect = useCallback(
    (id) => {
      dispatch({ type: "SET_ACTIVE_FOLDER", id });
    },
    [dispatch]
  );

  const onRename = useCallback(
    (f) => {
      const nv = prompt("Rename to:", f.name);
      if (nv && nv.trim())
        dispatch({ type: "RENAME_FOLDER", id: f.id, name: nv.trim() });
    },
    [dispatch]
  );

  const onDelete = useCallback(
    (f) => {
      if (confirm("Delete folder and its tasks?"))
        dispatch({ type: "DELETE_FOLDER", id: f.id });
    },
    [dispatch]
  );

  function createNewFolder(name) {
    const exists = folders.some(
      (f) => (f.name || "").toLowerCase() === name.trim().toLowerCase()
    );
    if (exists) {
      alert("Folder already exists");
      return;
    }
    dispatch({ type: "ADD_FOLDER", name: name.trim() });
  }

  const buildInboxMenuItems = useCallback(function () {
    return [];
  }, []);

  const buildFolderMenuItems = useCallback(
    function (folder) {
      return [
        {
          key: "rename",
          label: "Rename",
          icon: <RiEdit2Line />,
          onClick: () => onRename(folder),
        },
        {
          key: "delete",
          label: "Delete",
          icon: <RiDeleteBinLine />,
          onClick: () => onDelete(folder),
          danger: true,
        },
        // Pvz., ateity: pin, archive ar pan
      ];
    },
    [onRename, onDelete]
  );

  return {
    folders,
    inbox,
    others,
    counts,
    getCount,
    onSelect,
    onRename,
    onDelete,
    createNewFolder,
    buildInboxMenuItems,
    buildFolderMenuItems,
  };
}
