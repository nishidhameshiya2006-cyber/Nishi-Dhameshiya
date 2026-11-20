import type { CharacterClass } from '../data/characters';

interface ClassEmblemProps {
  characterClass: CharacterClass;
  role: string;
  compact?: boolean;
}

const EMBLEM_THEMES: Record<
  CharacterClass,
  {
    bgGradient: string;
    stroke: string;
    accent: string;
    label: string;
  }
> = {
  Mage: {
    bgGradient: 'radial-gradient(circle at 50% 42%, rgba(56, 189, 248, 0.16), rgba(18, 14, 11, 0.96) 76%)',
    stroke: '#93C5FD',
    accent: '#38BDF8',
    label: 'Arcane Order',
  },
  Rogue: {
    bgGradient: 'radial-gradient(circle at 50% 42%, rgba(239, 68, 68, 0.16), rgba(18, 14, 11, 0.96) 76%)',
    stroke: '#FCA5A5',
    accent: '#F87171',
    label: 'Shadow Guild',
  },
  Warrior: {
    bgGradient: 'radial-gradient(circle at 50% 42%, rgba(217, 155, 67, 0.20), rgba(18, 14, 11, 0.96) 76%)',
    stroke: '#FCD34D',
    accent: '#E5B85C',
    label: 'Iron Vanguard',
  },
  Archer: {
    bgGradient: 'radial-gradient(circle at 50% 42%, rgba(20, 184, 166, 0.17), rgba(18, 14, 11, 0.96) 76%)',
    stroke: '#6EE7B7',
    accent: '#2DD4BF',
    label: 'Sylvan Watch',
  },
  Paladin: {
    bgGradient: 'radial-gradient(circle at 50% 42%, rgba(234, 179, 8, 0.22), rgba(18, 14, 11, 0.96) 76%)',
    stroke: '#FDE68A',
    accent: '#FBBF24',
    label: 'Oath of Dawn',
  },
};

function renderCrestArtwork(characterClass: CharacterClass, stroke: string, accent: string) {
  switch (characterClass) {
    case 'Mage':
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="120" cy="130" r="68" stroke={stroke} strokeOpacity="0.24" strokeWidth="1.2" strokeDasharray="4 6" />
          <circle cx="120" cy="130" r="52" stroke={stroke} strokeOpacity="0.4" strokeWidth="1.4" />
          {/* Arcane Star & Staff */}
          <path d="M120 44 L120 226" stroke={stroke} strokeWidth="2.5" />
          <path d="M120 56 L138 82 L120 108 L102 82 Z" stroke={accent} strokeWidth="2" fill={accent} fillOpacity="0.14" />
          <circle cx="120" cy="82" r="6" fill={accent} />
          <path d="M84 114 Q120 92 156 114" stroke={stroke} strokeWidth="1.6" strokeOpacity="0.7" />
          <path d="M78 148 Q120 172 162 148" stroke={stroke} strokeWidth="1.6" strokeOpacity="0.7" />
          <path d="M104 202 L120 186 L136 202" stroke={stroke} strokeWidth="1.8" />
        </g>
      );

    case 'Rogue':
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="120" cy="130" r="68" stroke={stroke} strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="3 6" />
          {/* Crescent Veil */}
          <path d="M156 82 A56 56 0 1 0 156 178 A44 44 0 1 1 156 82 Z" stroke={stroke} strokeOpacity="0.35" strokeWidth="1.5" fill={accent} fillOpacity="0.1" />
          {/* Twin Crossed Daggers */}
          <path d="M72 184 L164 76" stroke={stroke} strokeWidth="2.4" />
          <path d="M164 76 L154 96 L146 88 Z" fill={accent} stroke={accent} strokeWidth="1.2" />
          <path d="M76 164 L94 182" stroke={accent} strokeWidth="2.5" />
          <path d="M168 184 L76 76" stroke={stroke} strokeWidth="2.4" />
          <path d="M76 76 L86 96 L94 88 Z" fill={accent} stroke={accent} strokeWidth="1.2" />
          <path d="M164 164 L146 182" stroke={accent} strokeWidth="2.5" />
        </g>
      );

    case 'Warrior':
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="120,56 176,84 170,154 120,206 70,154 64,84" stroke={stroke} strokeOpacity="0.34" strokeWidth="1.6" fill={accent} fillOpacity="0.08" />
          <polygon points="120,70 162,92 158,148 120,190 82,148 78,92" stroke={stroke} strokeOpacity="0.2" strokeWidth="1.2" />
          {/* Greatsword */}
          <path d="M120 46 L120 218" stroke={stroke} strokeWidth="3" />
          <path d="M113 62 L120 44 L127 62 L127 166 L113 166 Z" stroke={stroke} strokeWidth="1.8" fill={stroke} fillOpacity="0.1" />
          <path d="M88 166 L152 166" stroke={accent} strokeWidth="3.2" />
          <circle cx="120" cy="220" r="5" fill={accent} />
        </g>
      );

    case 'Archer':
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="120" cy="130" r="68" stroke={stroke} strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="4 6" />
          {/* Drawn Recurve Bow */}
          <path d="M98 58 C154 84 154 176 98 202" stroke={stroke} strokeWidth="3" />
          <path d="M98 58 L98 202" stroke={stroke} strokeOpacity="0.45" strokeWidth="1.2" />
          {/* Fletched Arrow */}
          <path d="M62 130 L182 130" stroke={accent} strokeWidth="2.4" />
          <path d="M182 130 L166 122 L170 130 L166 138 Z" fill={accent} stroke={accent} strokeWidth="1.2" />
          <path d="M68 123 L78 130 L68 137" stroke={stroke} strokeWidth="1.6" />
          <path d="M78 123 L88 130 L78 137" stroke={stroke} strokeWidth="1.6" />
        </g>
      );

    case 'Paladin':
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Radiant Halo */}
          <circle cx="120" cy="108" r="46" stroke={accent} strokeOpacity="0.38" strokeWidth="1.4" />
          <path d="M120 46 L120 62 M120 154 L120 170 M58 108 L74 108 M166 108 L182 108" stroke={accent} strokeOpacity="0.6" strokeWidth="1.6" />
          <path d="M76 64 L88 76 M164 64 L152 76 M76 152 L88 140 M164 152 L152 140" stroke={accent} strokeOpacity="0.4" strokeWidth="1.4" />
          {/* Consecrated Crest & Warhammer */}
          <path d="M120 68 L120 218" stroke={stroke} strokeWidth="2.8" />
          <rect x="86" y="88" width="68" height="28" rx="4" stroke={stroke} strokeWidth="2.2" fill={accent} fillOpacity="0.14" />
          <path d="M98 88 L98 116 M142 88 L142 116" stroke={accent} strokeWidth="1.6" />
          <path d="M96 184 L120 206 L144 184" stroke={stroke} strokeOpacity="0.55" strokeWidth="1.8" />
        </g>
      );
  }
}

export function ClassEmblem({ characterClass, role, compact = false }: ClassEmblemProps) {
  const theme = EMBLEM_THEMES[characterClass];

  return (
    <div
      className={`relative flex flex-col justify-between w-full select-none overflow-hidden ${
        compact
          ? 'h-[230px] p-4 border-b border-[#C99B49]/25'
          : 'h-full min-h-[320px] md:min-h-[440px] p-6 border-b md:border-b-0 md:border-r border-[#C99B49]/25'
      }`}
      style={{ background: theme.bgGradient }}
    >
      {/* Alchemical Plate Header */}
      <div className="flex items-center justify-between text-xs tracking-wide text-[#C8B99B]">
        <span>{theme.label}</span>
        <span className="font-mono text-[#A68B5B]">{characterClass}</span>
      </div>

      {/* Centered Heraldic SVG Plate */}
      <div className={`flex-1 flex items-center justify-center ${compact ? 'py-1' : 'py-4'}`}>
        <svg
          viewBox="0 0 240 260"
          className={compact ? 'w-32 h-36' : 'w-48 h-52 sm:w-56 sm:h-60 transition-transform duration-200'}
          role="img"
          aria-label={`${characterClass} class emblem`}
        >
          <rect
            x="16"
            y="16"
            width="208"
            height="228"
            rx="10"
            fill="none"
            stroke="rgba(201, 155, 73, 0.25)"
            strokeWidth="1"
          />
          <rect
            x="22"
            y="22"
            width="196"
            height="216"
            rx="6"
            fill="none"
            stroke="rgba(201, 155, 73, 0.12)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          {renderCrestArtwork(characterClass, theme.stroke, theme.accent)}
        </svg>
      </div>

      {/* Bottom Class Role Caption */}
      {!compact && (
        <div className="pt-3 border-t border-[#C99B49]/20 flex items-center justify-between">
          <span className="text-xs font-medium text-[#E8DEC8]">{role}</span>
          <span
            className="text-xs font-mono font-medium"
            style={{ color: theme.accent }}
          >
            {characterClass}
          </span>
        </div>
      )}
    </div>
  );
}
