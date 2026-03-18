export function LogoBT({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Warm gradient background circle */}
      <defs>
        <linearGradient id="bt-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#bt-grad)" />

      {/* Abstract B — two organic bowls with a sound wave curve */}
      <path
        d="M10 6.5h5.5c2.8 0 5 1.6 5 4.2 0 1.8-1 3.1-2.6 3.7v.2c2 .5 3.4 2.1 3.4 4.2 0 3-2.5 4.7-5.6 4.7H10V6.5z
           M13.2 13.4h2.6c1.6 0 2.5-.9 2.5-2.2 0-1.4-1-2.1-2.6-2.1h-2.5v4.3z
           M13.2 21h2.9c1.8 0 2.9-1 2.9-2.5 0-1.5-1.1-2.4-3-2.4h-2.8V21z"
        fill="white"
      />

      {/* Subtle sound wave accent */}
      <path
        d="M23 10.5c1.2 1.5 1.8 3.4 1.8 5.5s-.6 4-1.8 5.5"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
