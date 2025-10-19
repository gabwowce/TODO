import { useState } from "react";
import Button from "../Button";
export default function NewFolderForm({ onAdd, placeholder = "New Folder" }) {
  const [name, setName] = useState("");

  const canAdd = name.trim().length > 0;
  const submit = () => {
    if (!canAdd) return;
    onAdd(name.trim());
    setName("");
  };

  return (
    <div className="mt-5 w-full border-t border-[var(--border)] pt-5">
      <div className="flex items-stretch gap-2">
        <input
          className="input flex-1 min-w-0"
          placeholder={placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          aria-label="New folder name"
        />

        <Button
          onClick={submit}
          disabled={canAdd}
          aria-disabled={canAdd}
          title="Add folder"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
