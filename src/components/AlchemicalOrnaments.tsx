export function WorkbenchCornerFiligree() {
  const strokeColor = '#C99B49';

  return (
    <>
      {/* Top-Left Corner Filigree */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="pointer-events-none absolute top-2.5 left-2.5 w-7 h-7 text-[#C99B49]/65"
        fill="none"
      >
        <path d="M2 34 V6 C2 3.8 3.8 2 6 2 H34" stroke={strokeColor} strokeOpacity="0.65" strokeWidth="1.4" />
        <path d="M7 24 V9 C7 7.9 7.9 7 9 7 H24" stroke={strokeColor} strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="7" cy="7" r="2.2" fill={strokeColor} fillOpacity="0.8" />
      </svg>

      {/* Top-Right Corner Filigree */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="pointer-events-none absolute top-2.5 right-2.5 w-7 h-7"
        fill="none"
      >
        <path d="M6 2 H34 C36.2 2 38 3.8 38 6 V34" stroke={strokeColor} strokeOpacity="0.65" strokeWidth="1.4" />
        <path d="M16 7 H31 C32.1 7 33 7.9 33 9 V24" stroke={strokeColor} strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="33" cy="7" r="2.2" fill={strokeColor} fillOpacity="0.8" />
      </svg>

      {/* Bottom-Left Corner Filigree */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="pointer-events-none absolute bottom-2.5 left-2.5 w-7 h-7"
        fill="none"
      >
        <path d="M2 6 V34 C2 36.2 3.8 38 6 38 H34" stroke={strokeColor} strokeOpacity="0.65" strokeWidth="1.4" />
        <path d="M7 16 V31 C7 32.1 7.9 33 9 33 H24" stroke={strokeColor} strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="7" cy="33" r="2.2" fill={strokeColor} fillOpacity="0.8" />
      </svg>

      {/* Bottom-Right Corner Filigree */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="pointer-events-none absolute bottom-2.5 right-2.5 w-7 h-7"
        fill="none"
      >
        <path d="M6 38 H34 C36.2 38 38 36.2 38 34 V6" stroke={strokeColor} strokeOpacity="0.65" strokeWidth="1.4" />
        <path d="M16 33 H31 C32.1 33 33 32.1 33 31 V16" stroke={strokeColor} strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="33" cy="33" r="2.2" fill={strokeColor} fillOpacity="0.8" />
      </svg>
    </>
  );
}

export function AlchemicalDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3 w-full">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C99B49]/40 to-[#C99B49]/60" />
      <svg viewBox="0 0 36 16" className="w-8 h-3.5 shrink-0" fill="none">
        <circle cx="18" cy="8" r="4.5" stroke="#C99B49" strokeOpacity="0.7" strokeWidth="1.1" />
        <path d="M18 1.5 L20.5 8 L18 14.5 L15.5 8 Z" fill="#E5B85C" fillOpacity="0.75" />
        <circle cx="5" cy="8" r="1.3" fill="#C99B49" fillOpacity="0.55" />
        <circle cx="31" cy="8" r="1.3" fill="#C99B49" fillOpacity="0.55" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C99B49]/40 to-[#C99B49]/60" />
    </div>
  );
}
