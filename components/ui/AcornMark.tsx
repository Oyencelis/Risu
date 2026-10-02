type AcornMarkProps = {
  className?: string;
  /** When set, the mark is announced as an image. Otherwise it is decorative. */
  title?: string;
};

/** The Risu mark. "Risu" is Japanese for squirrel. */
export function AcornMark({ className, title }: AcornMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M12 5c0-1.2.3-2 1.1-2.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.8 11.2c0-3.9 3.2-6.2 7.2-6.2s7.2 2.3 7.2 6.2c0 .4-.3.8-.8.8H5.6c-.5 0-.8-.4-.8-.8Z"
        fill="currentColor"
      />
      <path
        d="M6.6 13.6h10.8c0 3.6-2.3 6.5-5.4 8.2-3.1-1.7-5.4-4.6-5.4-8.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
