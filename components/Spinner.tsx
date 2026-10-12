type SpinnerProps = {
  className?: string;
  label?: string;
};

export default function Spinner({
  className = "h-8 w-8 border-[3px]",
  label = "Loading",
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block shrink-0 animate-spin rounded-full border-current border-t-transparent ${className}`}
    />
  );
}
