const paths: Record<string, string> = {
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4.2-14.2-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1Z",
  layers: "m12 2 10 5-10 5L2 7l10-5Zm-10 10 10 5 10-5M2 17l10 5 10-5",
  spark: "M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4",
  agent: "M12 8V4m0 0H9m3 0h3M5 8h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Zm4 5v1m6-1v1",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  db: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8ZM7 12h2.5l1.5-3 2 6 1.5-3H17",
  chart: "M3 3v18h18M7 15l4-4 3 3 6-7",
  bank: "M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M12 3l9 5H3l9-5Z",
  food: "M4 3v8a3 3 0 0 0 3 3v7M10 3v8a3 3 0 0 1-3 3M7 3v5m11-5c-2 0-3 2-3 6v4h3v8",
  cart: "M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6m4 14h.01M18 21h.01",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  cloud: "M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.3 12 3.5 3.5 0 0 0 6.5 19h11Z",
  plane: "M17.8 19.2 16 11l3.5-3.5A2.1 2.1 0 0 0 16.5 4.5L13 8 4.8 6.2 3 8l6.5 4L6 15.5l-2.5-.5L2 16.5l4 1.5 1.5 4L9 20.5l-.5-2.5L12 14.5l4 6.5 1.8-1.8Z",
  play: "M8 5v14l11-7L8 5Z",
  truck: "M1 4h13v12H1V4Zm13 5h4l4 4v3h-8V9ZM5.5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm13 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Zm0 0A2.5 2.5 0 0 0 6.5 22H20v-5",
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z",
  leaf: "M11 20A7 7 0 0 1 4 13c0-6 5-10 16-10 0 11-4 16-9 17Zm0 0c0-5 2-8 6-11",
  grid: "M3 3h7v7H3V3Zm11 0h7v7h-7V3Zm0 11h7v7h-7v-7ZM3 14h7v7H3v-7Z",
  rocket: "M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1ZM12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2Z",
  trophy: "M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4Zm0 2H4a3 3 0 0 0 3 3m10-3h3a3 3 0 0 1-3 3",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  arrowLeft: "M19 12H5m6 6-6-6 6-6",
  upRight: "M7 17 17 7M8 7h9v9",
  chevron: "m6 9 6 6 6-6",
  check: "m5 12 5 5L20 7",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z",
  mail: "M3 5h18v14H3V5Zm0 0 9 8 9-8",
  menu: "M3 7h18M3 12h18M3 17h18",
  close: "M18 6 6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  lock: "M6 11h12v10H6V11Zm2 0V7a4 4 0 0 1 8 0v4",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z",
  up: "m18 15-6-6-6 6",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
};

export default function Icon({ name, className = "size-5", strokeWidth = 1.7 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}

// Decorative laurel wreath used beside award headings.
export function Laurel({ flip = false, className = "h-20" }: { flip?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 40 80" className={`${className} ${flip ? "-scale-x-100" : ""}`} fill="currentColor" aria-hidden>
      <path d="M30 76C14 68 6 52 8 30" fill="none" stroke="currentColor" strokeWidth="2" />
      {[14, 24, 34, 44, 54, 64].map((y, i) => (
        <g key={y}>
          <ellipse cx={i < 3 ? 6 : 10 + i} cy={y} rx="6" ry="3" transform={`rotate(-35 ${i < 3 ? 6 : 10 + i} ${y})`} />
          <ellipse cx={i < 3 ? 15 : 19 + i} cy={y + 4} rx="6" ry="3" transform={`rotate(35 ${i < 3 ? 15 : 19 + i} ${y + 4})`} />
        </g>
      ))}
    </svg>
  );
}
