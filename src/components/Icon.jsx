const iconPaths = {
  building: (
    <path d="M4 21V5l8-3 8 3v16M2 21h20M8 7h1m6 0h1M8 11h1m6 0h1M8 15h1m6 0h1M11 21v-4h2v4" />
  ),
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11.5V16c2.6 2.7 9.4 2.7 12 0v-4.5M22 9v6" />
    </>
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.82a9.5 9.5 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M5.2 7.7H1.8V22h3.4V7.7ZM3.5 2A2 2 0 1 0 3.5 6a2 2 0 0 0 0-4Zm10.2 5.4c-2 0-3.2 1.1-3.8 2.1h-.1V7.7H6.5V22h3.4v-7.1c0-1.9.4-3.7 2.7-3.7 2.3 0 2.3 2.1 2.3 3.8v7h3.4v-7.9c0-3.9-.8-6.7-4.6-6.7Z"
    />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  external: (
    <path d="M14 4h6v6M20 4 10 14M20 14v6H4V4h6" />
  ),
  play: (
    <path fill="currentColor" stroke="none" d="m8 5 11 7-11 7V5Z" />
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="1" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
};

function Icon({ name, className = "" }) {
  const fillClass = name === "github" || name === "linkedin" || name === "play";

  return (
    <svg
      className={`icon${fillClass ? " fill" : ""}${className ? ` ${className}` : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

export default Icon;
