export default function TaskEditor({ text, setText }) {
  return (
    <div className="p-4 flex-1 min-h-0">
      <textarea
        className="w-full h-full min-h-[320px] flex-1 resize-none bg-[var(--bg)] text-[var(--fg)] rounded-xl border border-[var(--border)] shadow-sm p-4 leading-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40"
        placeholder="Write your task details here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
