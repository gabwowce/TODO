import { RiFolderLine, RiInboxLine } from "react-icons/ri";
import useSidebarFolders from "../../hooks/useSidebarFolders";
import { useTodo } from "../../hooks/useTodo";
import FolderItem from "./FolderItem";
import NewFolderForm from "./NewFolderForm";

export default function Sidebar() {
  const { state, dispatch } = useTodo();
  const {
    inbox,
    others,
    getCount,
    onSelect,
    buildFolderMenuItems,
    createNewFolder,
  } = useSidebarFolders(state, dispatch);

  return (
    <div className="flex flex-col h-full">
      <div className="pb-3">
        {inbox && (
          <FolderItem
            id={inbox.id}
            name={inbox.name}
            icon={<RiInboxLine />}
            active={state.activeFolderId === inbox.id}
            count={getCount(inbox.id)}
            onSelect={onSelect}
            menuItems={[]}
          />
        )}
      </div>

      <h3 className="text-m font-medium text-[var(--fg)] mb-2">Folders</h3>
      <ul className="flex flex-col gap-1">
        {others.map((f) => (
          <FolderItem
            key={f.id}
            id={f.id}
            name={f.name}
            icon={<RiFolderLine />}
            active={state.activeFolderId === f.id}
            count={getCount(f.id)}
            onSelect={onSelect}
            menuItems={buildFolderMenuItems(f)}
          />
        ))}
      </ul>

      <NewFolderForm onAdd={createNewFolder} />
    </div>
  );
}
