/** Small right-pointing arrow used beside text links. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`size-[0.8em] ${className}`}>
      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
