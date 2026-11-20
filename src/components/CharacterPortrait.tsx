import type { CharacterClass, FantasyCharacter } from '../data/characters';

interface CharacterPortraitProps {
  character: FantasyCharacter;
  variant: number;
  compact?: boolean;
}

interface PaletteConfig {
  bgTop: string;
  bgBottom: string;
  aura: string;
  rimLight: string;
  primary: string;
  secondary: string;
  trim: string;
  cloak: string;
}

const CLASS_PALETTES: Record<CharacterClass, PaletteConfig[]> = {
  Mage: [
    {
      bgTop: '#0F1B3D',
      bgBottom: '#130F26',
      aura: '#3B82F6',
      rimLight: '#93C5FD',
      primary: '#1E3A8A',
      secondary: '#312E81',
      trim: '#F59E0B',
      cloak: '#172554',
    },
    {
      bgTop: '#1E133A',
      bgBottom: '#0C1628',
      aura: '#8B5CF6',
      rimLight: '#C4B5FD',
      primary: '#4C1D95',
      secondary: '#1E293B',
      trim: '#38BDF8',
      cloak: '#2E1065',
    },
    {
      bgTop: '#0B2436',
      bgBottom: '#101522',
      aura: '#06B6D4',
      rimLight: '#67E8F9',
      primary: '#164E63',
      secondary: '#1E293B',
      trim: '#FBBF24',
      cloak: '#083344',
    },
  ],
  Rogue: [
    {
      bgTop: '#241019',
      bgBottom: '#0D0E14',
      aura: '#EF4444',
      rimLight: '#FCA5A5',
      primary: '#27272A',
      secondary: '#450A0A',
      trim: '#DC2626',
      cloak: '#18181B',
    },
    {
      bgTop: '#161326',
      bgBottom: '#0A0D12',
      aura: '#F43F5E',
      rimLight: '#FDA4AF',
      primary: '#1F2937',
      secondary: '#4C0519',
      trim: '#94A3B8',
      cloak: '#111827',
    },
    {
      bgTop: '#1B1A17',
      bgBottom: '#0C0C0E',
      aura: '#F97316',
      rimLight: '#FDBA74',
      primary: '#292524',
      secondary: '#7C2D12',
      trim: '#EAB308',
      cloak: '#1C1917',
    },
  ],
  Warrior: [
    {
      bgTop: '#2D180B',
      bgBottom: '#121014',
      aura: '#F59E0B',
      rimLight: '#FCD34D',
      primary: '#475569',
      secondary: '#78350F',
      trim: '#D97706',
      cloak: '#7F1D1D',
    },
    {
      bgTop: '#261414',
      bgBottom: '#101318',
      aura: '#EF4444',
      rimLight: '#FDBA74',
      primary: '#334155',
      secondary: '#57534E',
      trim: '#94A3B8',
      cloak: '#991B1B',
    },
    {
      bgTop: '#1C222D',
      bgBottom: '#0D1117',
      aura: '#FB923C',
      rimLight: '#FED7AA',
      primary: '#3F3F46',
      secondary: '#1E293B',
      trim: '#F59E0B',
      cloak: '#312E81',
    },
  ],
  Archer: [
    {
      bgTop: '#0E2920',
      bgBottom: '#0B1214',
      aura: '#10B981',
      rimLight: '#6EE7B7',
      primary: '#14532D',
      secondary: '#422006',
      trim: '#D97706',
      cloak: '#064E3B',
    },
    {
      bgTop: '#1A2B18',
      bgBottom: '#0E1210',
      aura: '#84CC16',
      rimLight: '#BEF264',
      primary: '#365314',
      secondary: '#451A03',
      trim: '#A3E635',
      cloak: '#1A2E05',
    },
    {
      bgTop: '#0F2429',
      bgBottom: '#0B1116',
      aura: '#2DD4BF',
      rimLight: '#99F6E4',
      primary: '#115E59',
      secondary: '#3F2E21',
      trim: '#FBBF24',
      cloak: '#134E4A',
    },
  ],
  Paladin: [
    {
      bgTop: '#2D210B',
      bgBottom: '#11131B',
      aura: '#FBBF24',
      rimLight: '#FDE68A',
      primary: '#CBD5E1',
      secondary: '#1E3A8A',
      trim: '#F59E0B',
      cloak: '#B91C1C',
    },
    {
      bgTop: '#1D243B',
      bgBottom: '#0E121B',
      aura: '#FDE047',
      rimLight: '#FEF08A',
      primary: '#E2E8F0',
      secondary: '#312E81',
      trim: '#D97706',
      cloak: '#1D4ED8',
    },
    {
      bgTop: '#2A1B14',
      bgBottom: '#111116',
      aura: '#FB923C',
      rimLight: '#FDE68A',
      primary: '#D6D3D1',
      secondary: '#7C2D12',
      trim: '#FBBF24',
      cloak: '#9A3412',
    },
  ],
};

function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function getSkinTone(ancestry: string, seed: number): { base: string; shadow: string; highlight: string } {
  const humanTones = [
    { base: '#F2C6A0', shadow: '#C99068', highlight: '#FCE0C8' },
    { base: '#D99B72', shadow: '#A86B46', highlight: '#EEBA96' },
    { base: '#9C6242', shadow: '#704128', highlight: '#BA7E5C' },
    { base: '#EBC2AE', shadow: '#BC8A74', highlight: '#FADCD0' },
  ];

  switch (ancestry) {
    case 'High Elf':
      return seed % 2 === 0
        ? { base: '#F5D9C6', shadow: '#CBA48E', highlight: '#FFF0E4' }
        : { base: '#E8D5DE', shadow: '#BA9FAD', highlight: '#F8EBF1' };
    case 'Wood Elf':
      return seed % 2 === 0
        ? { base: '#D4A17A', shadow: '#A16F4C', highlight: '#E8BD9C' }
        : { base: '#C79B74', shadow: '#946B48', highlight: '#DFB692' };
    case 'Half-Elf':
      return humanTones[seed % humanTones.length];
    case 'Mountain Dwarf':
      return seed % 2 === 0
        ? { base: '#DFAA86', shadow: '#B07956', highlight: '#F3C7A9' }
        : { base: '#C78A68', shadow: '#945D40', highlight: '#DEA688' };
    case 'Half-Orc':
      return seed % 2 === 0
        ? { base: '#8FA376', shadow: '#62754C', highlight: '#ADC094' }
        : { base: '#7B8F6B', shadow: '#516343', highlight: '#99AD88' };
    case 'Tiefling':
      return [
        { base: '#B94A56', shadow: '#802832', highlight: '#D86C78' },
        { base: '#8B5A8C', shadow: '#5B345E', highlight: '#AA78AB' },
        { base: '#C25948', shadow: '#8A3427', highlight: '#DD7969' },
      ][seed % 3];
    case 'Aasimar':
      return seed % 2 === 0
        ? { base: '#F5DFC6', shadow: '#CBB08F', highlight: '#FFF5E6' }
        : { base: '#DFBA98', shadow: '#AF8967', highlight: '#F5D5B6' };
    default:
      return humanTones[seed % humanTones.length];
  }
}

function getHairColor(characterClass: CharacterClass, ancestry: string, seed: number): { base: string; shade: string; shine: string } {
  if (ancestry === 'High Elf' || ancestry === 'Aasimar') {
    const noble = [
      { base: '#E5E7EB', shade: '#9CA3AF', shine: '#FFFFFF' },
      { base: '#F3D27A', shade: '#C49A3B', shine: '#FEF08A' },
      { base: '#C7D2FE', shade: '#818CF8', shine: '#EEF2FF' },
    ];
    return noble[seed % noble.length];
  }
  if (ancestry === 'Tiefling') {
    const infernal = [
      { base: '#1E1B2E', shade: '#0D0B14', shine: '#6D28D9' },
      { base: '#4C1D24', shade: '#2A0B10', shine: '#E11D48' },
      { base: '#E2E8F0', shade: '#94A3B8', shine: '#FFFFFF' },
    ];
    return infernal[seed % infernal.length];
  }

  const all = [
    { base: '#27272A', shade: '#09090B', shine: '#52525B' },
    { base: '#5C3317', shade: '#361B0A', shine: '#8B5A2B' },
    { base: '#A63A24', shade: '#6B1F11', shine: '#D96548' },
    { base: '#D4A24E', shade: '#9C6E22', shine: '#F2CC7E' },
    { base: '#CBD5E1', shade: '#64748B', shine: '#F8FAFC' },
    { base: '#1E293B', shade: '#0F172A', shine: '#38BDF8' },
  ];

  const offset = characterClass === 'Mage' ? 4 : characterClass === 'Archer' ? 1 : 0;
  return all[(seed + offset) % all.length];
}

function getEyeColor(characterClass: CharacterClass, ancestry: string, seed: number): string {
  if (ancestry === 'Tiefling') return seed % 2 === 0 ? '#FBBF24' : '#F43F5E';
  if (ancestry === 'Aasimar') return '#FDE047';
  switch (characterClass) {
    case 'Mage':
      return seed % 2 === 0 ? '#38BDF8' : '#A78BFA';
    case 'Rogue':
      return seed % 2 === 0 ? '#F87171' : '#34D399';
    case 'Warrior':
      return seed % 2 === 0 ? '#F59E0B' : '#94A3B8';
    case 'Archer':
      return seed % 2 === 0 ? '#34D399' : '#FBBF24';
    case 'Paladin':
      return seed % 2 === 0 ? '#FBBF24' : '#60A5FA';
  }
}

export function CharacterPortrait({ character, variant, compact = false }: CharacterPortraitProps) {
  const baseSeed = hashSeed(`${character.id}-${character.name}-${character.characterClass}-${variant}`);
  const paletteList = CLASS_PALETTES[character.characterClass];
  const palette = paletteList[(baseSeed + variant) % paletteList.length];

  const skin = getSkinTone(character.ancestry, baseSeed + variant);
  const hair = getHairColor(character.characterClass, character.ancestry, baseSeed + variant * 3);
  const eyeColor = getEyeColor(character.characterClass, character.ancestry, baseSeed + variant);

  const hairStyle = (baseSeed + variant) % 5;
  const expression = (baseSeed + variant * 2) % 4;
  const flipPose = (baseSeed + variant) % 2 === 1;
  const hasScar = ((baseSeed + variant) % 3 === 0) && character.characterClass !== 'Paladin';
  const hasHoodOrHelm = (variant % 3 === 2) && (character.characterClass === 'Rogue' || character.characterClass === 'Archer' || character.characterClass === 'Mage');
  const isPointedEars = ['High Elf', 'Wood Elf', 'Half-Elf'].includes(character.ancestry);
  const isDwarf = character.ancestry === 'Mountain Dwarf';
  const isHalfOrc = character.ancestry === 'Half-Orc';
  const isTiefling = character.ancestry === 'Tiefling';
  const isAasimar = character.ancestry === 'Aasimar';

  const ink = '#0B0E14';
  const gearLower = character.signatureGear.toLowerCase();
  const idSuffix = compact ? 'deck' : 'stage';
  const gradId = `bg-${character.id}-${variant}-${idSuffix}`.replace(/[^a-zA-Z0-9_-]/g, '');
  const auraId = `aura-${character.id}-${variant}-${idSuffix}`.replace(/[^a-zA-Z0-9_-]/g, '');

  return (
    <div
      className={`relative flex flex-col justify-between w-full select-none overflow-hidden bg-[#120E0B] ${
        compact
          ? 'h-[230px] border-b border-[#C99B49]/25'
          : 'h-full min-h-[340px] md:min-h-[440px] border-b md:border-b-0 md:border-r border-[#C99B49]/25'
      }`}
    >
      <svg
        viewBox="0 0 360 440"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-full flex-1"
        role="img"
        aria-label={`Cartoon RPG portrait of ${character.name}, ${character.ancestry} ${character.characterClass}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.bgTop} />
            <stop offset="100%" stopColor={palette.bgBottom} />
          </linearGradient>
          <radialGradient id={auraId} cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor={palette.aura} stopOpacity="0.45" />
            <stop offset="55%" stopColor={palette.aura} stopOpacity="0.14" />
            <stop offset="100%" stopColor={palette.aura} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cartoon RPG Backdrop */}
        <rect width="360" height="440" fill={`url(#${gradId})`} />
        <rect width="360" height="440" fill={`url(#${auraId})`} />

        {/* Subtle Stylized Rays / Crest Ring */}
        <g opacity="0.24" stroke={palette.rimLight} fill="none">
          <circle cx="180" cy="186" r="118" strokeWidth="1.5" strokeDasharray="8 6" />
          <circle cx="180" cy="186" r="96" strokeWidth="1" />
          {character.characterClass === 'Mage' && (
            <polygon points="180,62 288,248 72,248" strokeWidth="1.2" />
          )}
          {character.characterClass === 'Paladin' && (
            <>
              <line x1="180" y1="20" x2="180" y2="320" strokeWidth="1.5" />
              <line x1="40" y1="186" x2="320" y2="186" strokeWidth="1.5" />
            </>
          )}
        </g>

        {/* Atmospheric Class Particles */}
        <g fill={palette.rimLight} opacity="0.72">
          <circle cx={68 + (variant * 17) % 40} cy={88 + (variant * 23) % 45} r="3" />
          <circle cx={280 - (variant * 13) % 35} cy={74 + (variant * 19) % 50} r="2.2" />
          <circle cx={54 + (variant * 29) % 35} cy={238 - (variant * 11) % 30} r="2.5" />
          <circle cx={302 - (variant * 21) % 35} cy={220 + (variant * 17) % 40} r="3.2" />
          <path d="M294 128 l4 -10 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 Z" opacity="0.65" />
        </g>

        {/* Aasimar Celestial Halo behind head */}
        {isAasimar && (
          <g>
            <ellipse
              cx="180"
              cy="92"
              rx="64"
              ry="18"
              fill="none"
              stroke="#FDE047"
              strokeWidth="4"
              opacity="0.85"
            />
            <ellipse
              cx="180"
              cy="92"
              rx="64"
              ry="18"
              fill="none"
              stroke="#FEF9C3"
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* Main Character Group (mirrors pose on flipPose) */}
        <g transform={flipPose ? 'translate(360, 0) scale(-1, 1)' : undefined}>
          {/* Back Cloak / Mantle */}
          <path
            d="M52 440 C58 310, 102 258, 180 258 C258 258, 302 310, 308 440 Z"
            fill={palette.cloak}
            stroke={ink}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Quiver behind shoulder for Archer */}
          {character.characterClass === 'Archer' && (
            <g transform="translate(228, 188) rotate(22)">
              <rect x="0" y="20" width="24" height="86" rx="6" fill="#5C3A21" stroke={ink} strokeWidth="3" />
              <line x1="6" y1="20" x2="4" y2="-10" stroke="#D4A373" strokeWidth="3" />
              <polygon points="4,-14 0,-2 8,-2" fill={palette.rimLight} stroke={ink} strokeWidth="1.5" />
              <line x1="15" y1="20" x2="15" y2="-14" stroke="#D4A373" strokeWidth="3" />
              <polygon points="15,-18 11,-6 19,-6" fill={palette.rimLight} stroke={ink} strokeWidth="1.5" />
            </g>
          )}

          {/* Back Hair Layer */}
          {!hasHoodOrHelm && hairStyle === 0 && (
            <path
              d="M110 144 C96 196, 96 266, 114 294 L246 294 C264 266, 264 196, 250 144 C236 92, 124 92, 110 144 Z"
              fill={hair.shade}
              stroke={ink}
              strokeWidth="3.2"
            />
          )}
          {!hasHoodOrHelm && hairStyle === 3 && (
            <path
              d="M214 102 C258 96, 272 152, 248 214 C236 184, 224 148, 210 128 Z"
              fill={hair.base}
              stroke={ink}
              strokeWidth="3"
            />
          )}

          {/* Hood Back Layer if hooded */}
          {hasHoodOrHelm && (
            <path
              d="M96 174 C94 94, 134 62, 180 62 C226 62, 266 94, 264 174 L274 274 L86 274 Z"
              fill={palette.cloak}
              stroke={ink}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          )}

          {/* Neck */}
          <path
            d="M156 232 L156 286 C168 294, 192 294, 204 286 L204 232 Z"
            fill={skin.shadow}
            stroke={ink}
            strokeWidth="3"
          />

          {/* Class Torso, Clothing & Armor */}
          {character.characterClass === 'Mage' && (
            <g>
              {/* Layered Arcane Robe */}
              <path
                d="M72 440 L94 298 C122 272, 152 266, 180 266 C208 266, 238 272, 266 298 L288 440 Z"
                fill={palette.primary}
                stroke={ink}
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* High Mystic Collar */}
              <path
                d="M104 298 L120 242 L154 274 L180 296 L206 274 L240 242 L256 298 L212 340 L180 356 L148 340 Z"
                fill={palette.secondary}
                stroke={ink}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Gold Trim & Arcane Brooch */}
              <path d="M126 254 L154 284 M234 254 L206 284" stroke={palette.trim} strokeWidth="3.5" strokeLinecap="round" />
              <path d="M180 302 L194 324 L180 346 L166 324 Z" fill={palette.aura} stroke={palette.rimLight} strokeWidth="2.5" />
            </g>
          )}

          {character.characterClass === 'Rogue' && (
            <g>
              {/* Fitted Leather Jerkin */}
              <path
                d="M76 440 L96 294 C126 270, 154 266, 180 266 C206 266, 234 270, 264 294 L284 440 Z"
                fill={palette.primary}
                stroke={ink}
                strokeWidth="3.5"
              />
              {/* Asymmetric Cowl Scarf */}
              <path
                d="M124 262 C156 282, 204 282, 236 262 L248 308 C206 324, 154 324, 112 308 Z"
                fill={palette.secondary}
                stroke={ink}
                strokeWidth="3"
              />
              {/* Crossed Bandolier & Buckles */}
              <path d="M114 296 L246 426" stroke="#451A03" strokeWidth="14" strokeLinecap="round" />
              <path d="M114 296 L246 426" stroke={ink} strokeWidth="2" />
              <rect x="166" y="346" width="22" height="16" rx="2" fill={palette.trim} stroke={ink} strokeWidth="2.5" />
            </g>
          )}

          {character.characterClass === 'Warrior' && (
            <g>
              {/* Heavy Plate Cuirass */}
              <path
                d="M66 440 L84 292 C118 266, 150 262, 180 262 C210 262, 242 266, 276 292 L294 440 Z"
                fill={palette.primary}
                stroke={ink}
                strokeWidth="3.5"
              />
              {/* Fur-lined Mantle Collar */}
              <path
                d="M108 274 Q144 306 180 296 Q216 306 252 274 Q236 254 180 262 Q124 254 108 274 Z"
                fill="#78716C"
                stroke={ink}
                strokeWidth="3"
              />
              {/* Heavy Pauldrons */}
              <path d="M62 330 C60 280, 98 262, 134 278 L118 338 Z" fill={palette.secondary} stroke={ink} strokeWidth="3.2" />
              <path d="M298 330 C300 280, 262 262, 226 278 L242 338 Z" fill={palette.secondary} stroke={ink} strokeWidth="3.2" />
              <path d="M74 302 L120 292" stroke={palette.trim} strokeWidth="3" />
              <path d="M286 302 L240 292" stroke={palette.trim} strokeWidth="3" />
              <path d="M180 300 L180 434" stroke={palette.trim} strokeWidth="3" strokeDasharray="10 6" />
            </g>
          )}

          {character.characterClass === 'Archer' && (
            <g>
              {/* Ranger Tunic & Leather Harness */}
              <path
                d="M78 440 L98 294 C126 270, 154 266, 180 266 C206 266, 234 270, 262 294 L282 440 Z"
                fill={palette.primary}
                stroke={ink}
                strokeWidth="3.5"
              />
              {/* Woodland Shoulder Guard */}
              <path
                d="M84 328 C84 282, 114 266, 146 280 L132 334 Z"
                fill={palette.secondary}
                stroke={ink}
                strokeWidth="3"
              />
              <path d="M138 282 L222 396" stroke={palette.secondary} strokeWidth="12" strokeLinecap="round" />
              <circle cx="154" cy="304" r="5" fill={palette.trim} stroke={ink} strokeWidth="2" />
              <path d="M148 270 L180 306 L212 270" fill="none" stroke={palette.trim} strokeWidth="3" />
            </g>
          )}

          {character.characterClass === 'Paladin' && (
            <g>
              {/* Gleaming Breastplate & Tabard */}
              <path
                d="M68 440 L86 292 C118 266, 150 262, 180 262 C210 262, 242 266, 274 292 L292 440 Z"
                fill={palette.primary}
                stroke={ink}
                strokeWidth="3.5"
              />
              {/* Sacred Tabard */}
              <path d="M142 284 L218 284 L228 440 L132 440 Z" fill={palette.secondary} stroke={ink} strokeWidth="3" />
              <path d="M180 308 L180 398 M156 340 L204 340" stroke={palette.trim} strokeWidth="5" strokeLinecap="round" />
              {/* Winged / Sunburst Pauldrons */}
              <path d="M58 326 C58 274, 102 256, 138 276 L122 334 Z" fill={palette.primary} stroke={ink} strokeWidth="3.2" />
              <path d="M302 326 C302 274, 258 256, 222 276 L238 334 Z" fill={palette.primary} stroke={ink} strokeWidth="3.2" />
              <path d="M68 292 L126 286 M292 292 L234 286" stroke={palette.trim} strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {/* Ears (Pointed for Elves, Rounded otherwise) */}
          {isPointedEars ? (
            <g fill={skin.base} stroke={ink} strokeWidth="2.8" strokeLinejoin="round">
              <path d="M122 172 L86 150 L118 194 Z" />
              <path d="M238 172 L274 150 L242 194 Z" />
              <circle cx="98" cy="166" r="3" fill={palette.trim} stroke={ink} strokeWidth="1.5" />
            </g>
          ) : (
            <g fill={skin.base} stroke={ink} strokeWidth="2.8">
              <ellipse cx="118" cy="182" rx="9" ry="14" />
              <ellipse cx="242" cy="182" rx="9" ry="14" />
            </g>
          )}

          {/* Head / Cartoon Cel-Shaded Face Shape */}
          <path
            d={
              isDwarf || isHalfOrc
                ? 'M122 146 C122 104, 238 104, 238 146 L236 206 C234 236, 206 250, 180 250 C154 250, 126 236, 124 206 Z'
                : 'M122 146 C122 102, 238 102, 238 146 C238 194, 224 226, 180 248 C136 226, 122 194, 122 146 Z'
            }
            fill={skin.base}
            stroke={ink}
            strokeWidth="3.2"
          />

          {/* Cel-Shaded Face Shadow */}
          <path
            d="M124 148 C124 190, 138 222, 178 244 C150 226, 140 194, 140 150 C140 128, 152 114, 176 110 C142 112, 124 128, 124 148 Z"
            fill={skin.shadow}
            opacity="0.48"
          />

          {/* Tiefling Horns */}
          {isTiefling && (
            <g fill="#2B1D24" stroke={ink} strokeWidth="3" strokeLinejoin="round">
              {variant % 2 === 0 ? (
                <>
                  <path d="M138 124 C118 96, 102 68, 118 44 C122 72, 138 92, 152 114 Z" />
                  <path d="M222 124 C242 96, 258 68, 242 44 C238 72, 222 92, 208 114 Z" />
                </>
              ) : (
                <>
                  <path d="M136 122 C96 108, 86 64, 124 52 C110 74, 124 96, 148 112 Z" />
                  <path d="M224 122 C264 108, 274 64, 236 52 C250 74, 236 96, 212 112 Z" />
                </>
              )}
            </g>
          )}

          {/* Optional Scar / War Paint */}
          {hasScar && (
            <path
              d="M204 150 L218 192"
              stroke={skin.shadow}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* Expressive Cartoon Eyes & Brows */}
          <g>
            {/* Eyebrows */}
            {expression === 1 ? (
              <>
                <path d="M138 156 L166 164" stroke={ink} strokeWidth="4.2" strokeLinecap="round" />
                <path d="M222 156 L194 164" stroke={ink} strokeWidth="4.2" strokeLinecap="round" />
              </>
            ) : expression === 0 ? (
              <>
                <path d="M138 158 Q152 150 166 158" fill="none" stroke={ink} strokeWidth="3.8" strokeLinecap="round" />
                <path d="M194 162 L222 154" stroke={ink} strokeWidth="3.8" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M138 158 Q152 152 166 158" fill="none" stroke={ink} strokeWidth="3.8" strokeLinecap="round" />
                <path d="M194 158 Q208 152 222 158" fill="none" stroke={ink} strokeWidth="3.8" strokeLinecap="round" />
              </>
            )}

            {/* Eyes */}
            <ellipse cx="154" cy="174" rx="10" ry="7.5" fill="#F8FAFC" stroke={ink} strokeWidth="2.4" />
            <ellipse cx="206" cy="174" rx="10" ry="7.5" fill="#F8FAFC" stroke={ink} strokeWidth="2.4" />
            <circle cx="155" cy="174" r="5" fill={eyeColor} />
            <circle cx="205" cy="174" r="5" fill={eyeColor} />
            <circle cx="155" cy="174" r="2.2" fill={ink} />
            <circle cx="205" cy="174" r="2.2" fill={ink} />
            <circle cx="157" cy="172" r="1.6" fill="#FFFFFF" />
            <circle cx="207" cy="172" r="1.6" fill="#FFFFFF" />
          </g>

          {/* Stylized Nose */}
          <path
            d="M180 172 L175 196 L185 198"
            fill="none"
            stroke={skin.shadow}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rogue Mask (variant-dependent) OR Mouth */}
          {character.characterClass === 'Rogue' && variant % 2 === 1 ? (
            <path
              d="M126 196 Q180 206 234 196 L224 236 Q180 254 136 236 Z"
              fill={palette.secondary}
              stroke={ink}
              strokeWidth="3"
            />
          ) : (
            <g>
              {expression === 0 && (
                <path d="M164 216 Q184 224 200 212" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
              )}
              {expression === 1 && (
                <path d="M164 220 Q180 214 196 220" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
              )}
              {expression === 2 && (
                <path d="M168 218 L192 218" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
              )}
              {expression === 3 && (
                <path d="M166 216 Q180 225 194 216" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
              )}
            </g>
          )}

          {/* Half-Orc Tusks */}
          {isHalfOrc && (
            <g fill="#FEF3C7" stroke={ink} strokeWidth="2">
              <path d="M162 220 L158 206 L168 216 Z" />
              <path d="M198 220 L202 206 L192 216 Z" />
            </g>
          )}

          {/* Mountain Dwarf Braided Beard */}
          {isDwarf && (
            <g>
              <path
                d="M124 194 C122 238, 146 276, 180 286 C214 276, 238 238, 236 194 C220 214, 202 216, 180 212 C158 216, 140 214, 124 194 Z"
                fill={hair.base}
                stroke={ink}
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
              <rect x="172" y="254" width="16" height="10" rx="2" fill={palette.trim} stroke={ink} strokeWidth="2" />
            </g>
          )}

          {/* Front Hair Styles (unless hooded) */}
          {!hasHoodOrHelm && hairStyle === 0 && (
            <path
              d="M116 154 C118 104, 152 88, 184 90 C216 92, 242 110, 244 154 C228 130, 204 122, 180 128 C154 122, 132 132, 116 154 Z"
              fill={hair.base}
              stroke={ink}
              strokeWidth="3"
            />
          )}
          {!hasHoodOrHelm && hairStyle === 1 && (
            <path
              d="M114 154 L120 112 L144 96 L160 74 L182 94 L208 78 L220 104 L246 116 L244 154 C226 130, 200 120, 180 132 C158 118, 134 128, 114 154 Z"
              fill={hair.base}
              stroke={ink}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          )}
          {!hasHoodOrHelm && hairStyle === 2 && (
            <path
              d="M118 152 C118 98, 160 84, 204 92 C234 98, 244 126, 242 154 C214 120, 166 116, 118 152 Z"
              fill={hair.base}
              stroke={ink}
              strokeWidth="3"
            />
          )}
          {!hasHoodOrHelm && hairStyle === 3 && (
            <path
              d="M118 150 C122 100, 156 88, 180 88 C206 88, 238 100, 242 150 C220 122, 198 122, 180 124 C162 122, 140 122, 118 150 Z"
              fill={hair.base}
              stroke={ink}
              strokeWidth="3"
            />
          )}
          {!hasHoodOrHelm && hairStyle === 4 && (
            <path
              d="M116 162 C116 102, 154 88, 184 88 C218 88, 244 108, 244 158 L224 134 L204 148 L184 124 L154 148 L136 132 Z"
              fill={hair.base}
              stroke={ink}
              strokeWidth="3"
              strokeLinejoin="round"
            />
          )}

          {/* Hair Highlight Ribbon */}
          {!hasHoodOrHelm && (
            <path
              d="M144 108 Q180 98 214 110"
              fill="none"
              stroke={hair.shine}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.55"
            />
          )}

          {/* Hood Front Rim if hooded */}
          {hasHoodOrHelm && (
            <path
              d="M98 176 C100 100, 136 66, 180 66 C224 66, 260 100, 262 176 C244 128, 214 104, 180 104 C146 104, 116 128, 98 176 Z"
              fill={palette.cloak}
              stroke={ink}
              strokeWidth="3.2"
            />
          )}

          {/* Signature Weapon / Class Focus Held Prominently */}
          {character.characterClass === 'Mage' && (
            <g transform="translate(274, 116) rotate(8)">
              {/* Runestaff or Lantern / Grimoire Glow */}
              <line x1="16" y1="64" x2="16" y2="336" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
              <line x1="16" y1="64" x2="16" y2="336" stroke={ink} strokeWidth="2.5" />
              {gearLower.includes('lantern') ? (
                <g transform="translate(0, 10)">
                  <rect x="4" y="20" width="24" height="34" rx="4" fill={palette.trim} stroke={ink} strokeWidth="2.8" />
                  <circle cx="16" cy="37" r="8" fill={palette.rimLight} />
                </g>
              ) : (
                <g>
                  <circle cx="16" cy="40" r="24" fill={palette.aura} opacity="0.28" />
                  <path d="M16 14 L30 40 L16 66 L2 40 Z" fill={palette.aura} stroke={palette.rimLight} strokeWidth="3" />
                  <circle cx="16" cy="40" r="6" fill="#FFFFFF" />
                </g>
              )}
            </g>
          )}

          {character.characterClass === 'Rogue' && (
            <g>
              {gearLower.includes('crossbow') ? (
                <g transform="translate(248, 272) rotate(-14)">
                  <rect x="10" y="22" width="14" height="72" rx="4" fill="#451A03" stroke={ink} strokeWidth="2.8" />
                  <path d="M-14 34 Q17 14 48 34" fill="none" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
                  <line x1="17" y1="6" x2="17" y2="54" stroke="#E2E8F0" strokeWidth="3" />
                </g>
              ) : (
                <g transform="translate(256, 250) rotate(14)">
                  {/* Twin Steel Stiletto */}
                  <path d="M16 0 L24 88 L8 88 Z" fill="#E2E8F0" stroke={ink} strokeWidth="2.8" strokeLinejoin="round" />
                  <line x1="16" y1="8" x2="16" y2="86" stroke="#94A3B8" strokeWidth="2" />
                  <rect x="4" y="88" width="24" height="7" rx="2" fill={palette.trim} stroke={ink} strokeWidth="2.5" />
                  <rect x="11" y="95" width="10" height="28" rx="3" fill="#27272A" stroke={ink} strokeWidth="2.5" />
                </g>
              )}
            </g>
          )}

          {character.characterClass === 'Warrior' && (
            <g transform="translate(268, 128) rotate(10)">
              {gearLower.includes('axe') ? (
                <g>
                  <line x1="18" y1="42" x2="18" y2="320" stroke="#5C3A21" strokeWidth="11" strokeLinecap="round" />
                  <line x1="18" y1="42" x2="18" y2="320" stroke={ink} strokeWidth="2.5" />
                  <path d="M18 46 C-16 32, -26 98, 18 106 Z" fill="#CBD5E1" stroke={ink} strokeWidth="3.2" strokeLinejoin="round" />
                </g>
              ) : (
                <g>
                  {/* Greatsword resting over shoulder */}
                  <path d="M18 0 L30 22 L30 206 L6 206 L6 22 Z" fill="#E2E8F0" stroke={ink} strokeWidth="3.2" strokeLinejoin="round" />
                  <line x1="18" y1="18" x2="18" y2="202" stroke="#94A3B8" strokeWidth="2.5" />
                  <rect x="-8" y="204" width="52" height="12" rx="4" fill={palette.trim} stroke={ink} strokeWidth="3" />
                  <rect x="12" y="216" width="12" height="44" rx="3" fill="#451A03" stroke={ink} strokeWidth="2.8" />
                </g>
              )}
            </g>
          )}

          {character.characterClass === 'Archer' && (
            <g transform="translate(254, 150)">
              {/* Drawn Recurve Bow */}
              <path
                d="M10 18 C48 64, 48 188, 10 234"
                fill="none"
                stroke="#78350F"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M10 18 C48 64, 48 188, 10 234"
                fill="none"
                stroke={ink}
                strokeWidth="2.5"
              />
              <line x1="10" y1="18" x2="10" y2="234" stroke="#E2E8F0" strokeWidth="1.8" />
              {/* Nocked Arrow */}
              <line x1="-24" y1="126" x2="54" y2="126" stroke="#FDE68A" strokeWidth="3.2" />
              <polygon points="58,126 44,119 46,126 44,133" fill={palette.rimLight} stroke={ink} strokeWidth="1.8" />
            </g>
          )}

          {character.characterClass === 'Paladin' && (
            <g transform="translate(264, 146) rotate(8)">
              {gearLower.includes('sword') ? (
                <g>
                  <path d="M18 0 L28 24 L28 192 L8 192 L8 24 Z" fill="#F8FAFC" stroke={ink} strokeWidth="3" />
                  <line x1="18" y1="22" x2="18" y2="188" stroke={palette.aura} strokeWidth="3" />
                  <rect x="-6" y="192" width="48" height="11" rx="3" fill={palette.trim} stroke={ink} strokeWidth="2.8" />
                  <rect x="12" y="203" width="12" height="38" rx="3" fill="#1E3A8A" stroke={ink} strokeWidth="2.5" />
                </g>
              ) : (
                <g>
                  {/* Consecrated Warhammer */}
                  <line x1="18" y1="36" x2="18" y2="292" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
                  <line x1="18" y1="36" x2="18" y2="292" stroke={ink} strokeWidth="2.5" />
                  <rect x="-12" y="32" width="60" height="36" rx="5" fill="#E2E8F0" stroke={ink} strokeWidth="3.2" />
                  <line x1="2" y1="34" x2="2" y2="66" stroke={palette.trim} strokeWidth="4" />
                  <line x1="34" y1="34" x2="34" y2="66" stroke={palette.trim} strokeWidth="4" />
                </g>
              )}
            </g>
          )}
        </g>

        {/* Bottom Vignette Gradient */}
        <linearGradient id={`${gradId}-vignette`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="68%" stopColor="#120E0B" stopOpacity="0" />
          <stop offset="100%" stopColor="#120E0B" stopOpacity="0.9" />
        </linearGradient>
        <rect width="360" height="440" fill={`url(#${gradId}-vignette)`} />

        {/* Subtle Inner Antique Brass Frame */}
        <rect
          x="10"
          y="10"
          width="340"
          height="420"
          rx="4"
          fill="none"
          stroke="#C99B49"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
      </svg>

      {/* Subtle Portrait Caption Bar */}
      {!compact && (
        <div className="px-5 py-3.5 bg-[#120E0B]/95 border-t border-[#C99B49]/25 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#F3E9D2] truncate">{character.name}</p>
            <p className="text-[11px] text-[#C8B99B] truncate">
              {character.ancestry} · {character.role}
            </p>
          </div>
          <span
            className="text-xs font-mono font-medium shrink-0"
            style={{ color: palette.rimLight }}
          >
            {character.characterClass}
          </span>
        </div>
      )}
    </div>
  );
}
