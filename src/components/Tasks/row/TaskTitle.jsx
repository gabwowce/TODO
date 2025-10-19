export default function TaskTitle({ title, done, oneLine = true }) {
  return (
    <span
      className={`flex-1 min-w-0 py-3 ${
        oneLine
          ? "overflow-hidden text-ellipsis whitespace-nowrap"
          : "whitespace-normal break-words"
      } ${done ? "line-through opacity-70" : ""}`}
      title={title}
    >
      {title}
    </span>
  );
}
