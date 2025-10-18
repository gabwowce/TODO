export default function Button({ children, onClick, disabled = false, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!disabled}
      aria-disabled={!disabled}
      title={title}
      className={`btn shrink-0 whitespace-nowrap px-4
        ${
          !disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
        }`}
    >
      {children}
    </button>
  );
}
