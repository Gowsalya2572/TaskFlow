
const Loader = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <div
        className={`animate-spin rounded-full border-primary border-t-transparent ${
          sizes[size] || sizes.md
        }`}
      />

      {text && (
        <p className="text-sm text-text-secondary">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
