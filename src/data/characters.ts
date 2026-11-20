export type CharacterClass = 'Mage' | 'Rogue' | 'Warrior' | 'Archer' | 'Paladin';

export interface CharacterAttributes {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  characterClass: CharacterClass;
  role: string;
  ancestry: string;
  origin: string;
  alignment: string;
  trait: string;
  signatureGear: string;
  backstory: string;
  attributes: CharacterAttributes;
}

export interface ClassDefinition {
  name: CharacterClass;
  role: string;
  primaryStat: keyof CharacterAttributes;
  summary: string;
  accentHex: string;
  firstNames: string[];
  surnames: string[];
  gearOptions: string[];
  traits: string[];
  backstories: string[];
  statProfile: Record<keyof CharacterAttributes, [number, number]>;
}

export const CLASS_DEFINITIONS: Record<CharacterClass, ClassDefinition> = {
  Mage: {
    name: 'Mage',
    role: 'Arcane Spellcaster',
    primaryStat: 'INT',
    summary: 'Commands elemental forces and ancient sigils through disciplined study.',
    accentHex: '#60A5FA',
    firstNames: [
      'Aeloria',
      'Theron',
      'Vaelis',
      'Seraphina',
      'Mordecai',
      'Lyra',
      'Caelum',
      'Isolde',
      'Zephyrus',
      'Nyxia',
      'Orin',
      'Calista',
      'Aldous',
      'Elowen',
      'Soren',
      'Astrid',
    ],
    surnames: [
      'Starweaver',
      'Ashmantle',
      'Frostspire',
      'Runeward',
      'Veyl',
      'Duskwhisper',
      'Mooncrest',
      'Solstice',
      'Emberglen',
      'Mistvale',
      'Thornbook',
      'Aetheris',
    ],
    gearOptions: [
      'Cedar Runestaff & Brass Astrolabe',
      'Obsidian Grimoire & Silver Focus',
      'Lantern of Bound Starlight',
      'Ivory Wand of the Frost Spire',
      'Spellwoven Mantle & Quartz Seal',
    ],
    traits: [
      'Memorizes every glyph seen',
      'Speaks three forgotten dialects',
      'Unflinching under arcane storm',
      'Carries inked wards on both cuffs',
      'Reads omens in drifting embers',
    ],
    backstories: [
      'Exiled from the High Observatory after decoding a sealed celestial chart, they now wander the borderlands seeking its missing twin.',
      'Trained by storm-callers along the northern cliffs, they trade protective wards for passage and forgotten manuscripts.',
      'Former archivist of a sunken library who escaped with a single charred folio that still hums with quiet resonance.',
    ],
    statProfile: {
      STR: [7, 11],
      DEX: [10, 14],
      CON: [10, 14],
      INT: [16, 20],
      WIS: [13, 17],
      CHA: [10, 15],
    },
  },
  Rogue: {
    name: 'Rogue',
    role: 'Shadow Infiltrator',
    primaryStat: 'DEX',
    summary: 'Moves unseen across rooftops and courts, relying on wit and precision.',
    accentHex: '#F87171',
    firstNames: [
      'Kaelen',
      'Vesper',
      'Corvus',
      'Sable',
      'Jarek',
      'Tamsin',
      'Ronan',
      'Mira',
      'Dorian',
      'Nadia',
      'Fenn',
      'Evelina',
      'Garrick',
      'Wren',
      'Lucian',
      'Zara',
    ],
    surnames: [
      'Nightstep',
      'Lockhart',
      'Blackbriar',
      'Crowfoot',
      'Vance',
      'Glasskey',
      'Ashford',
      'Quickblade',
      'Holloway',
      'Coinpurse',
      'Shadowfen',
      'Rook',
    ],
    gearOptions: [
      'Twin Folded-Steel Stilettos',
      'Masterwork Pickset & Waxed Cloak',
      'Weighted Grappling Hook & Smoke Vials',
      'Whisper-Edge Dirk & Signet Ring',
      'Concealed Wrist Crossbow & Ledger',
    ],
    traits: [
      'Counts exits before sitting down',
      'Never forgets a voice or debt',
      'Walks silently over gravel and frost',
      'Keeps three forged letters of transit',
      'Spots rigged locks at a glance',
    ],
    backstories: [
      'Raised among canal smugglers in Freehaven, they take only contracts that strike back at corrupt merchant guilds.',
      'A former courier for rival noble houses who vanished after intercepting a royal cipher no one was meant to read.',
      'Known in harbor taverns as a phantom locksmith, they can open any vault—yet refuse to steal heirlooms.',
    ],
    statProfile: {
      STR: [8, 12],
      DEX: [16, 20],
      CON: [10, 14],
      INT: [12, 16],
      WIS: [10, 14],
      CHA: [13, 17],
    },
  },
  Warrior: {
    name: 'Warrior',
    role: 'Frontline Vanguard',
    primaryStat: 'STR',
    summary: 'Masters heavy steel and shieldcraft to hold the line against any foe.',
    accentHex: '#F59E0B',
    firstNames: [
      'Torvald',
      'Brynn',
      'Gideon',
      'Valeria',
      'Kragar',
      'Freya',
      'Marcus',
      'Sigrid',
      'Draven',
      'Rowan',
      'Bram',
      'Helga',
      'Cassian',
      'Astrid',
      'Thane',
      'Leona',
    ],
    surnames: [
      'Ironhelm',
      'Stonebreaker',
      'Vanguard',
      'Oakhart',
      'Stormshield',
      'Redblade',
      'Cragborn',
      'Hammerfall',
      'Grimward',
      'Steelvein',
      'Wolfbrand',
      'ridge',
    ].map((s) => s.charAt(0).toUpperCase() + s.slice(1)),
    gearOptions: [
      'Notched Greatsword & Kite Shield',
      'Bearded Battleaxe & Chain Hauberk',
      'Tempered Halberd & Iron Gauntlets',
      'Bastard Sword & Wolf-Fur Mantle',
      'Riveted Tower Shield & Mace',
    ],
    traits: [
      'Sleeps lightly beside sharpened steel',
      'Anchors frightened allies in battle',
      'Bears seven campaign tally marks',
      'Refuses to yield ground once sworn',
      'Tends armor before resting at camp',
    ],
    backstories: [
      'Sole survivor of the Iron Pass garrison, they travel from town to town escorting caravans through monster-haunted valleys.',
      'Once a pit champion who bought their freedom with honor intact, they now lend their blade to frontier settlements.',
      'Forged in the highland border wars, they seek the lost banner of their fallen company across the southern marches.',
    ],
    statProfile: {
      STR: [16, 20],
      DEX: [10, 14],
      CON: [15, 19],
      INT: [8, 12],
      WIS: [10, 14],
      CHA: [9, 14],
    },
  },
  Archer: {
    name: 'Archer',
    role: 'Precision Marksman',
    primaryStat: 'DEX',
    summary: 'Reads wind and terrain to strike distant targets with unerring focus.',
    accentHex: '#34D399',
    firstNames: [
      'Sylvan',
      'Kira',
      'Lorian',
      'Elowen',
      'Gareth',
      'Faye',
      'Caspian',
      'Talia',
      'Rowan',
      'Briar',
      'Alden',
      'Sienna',
      'Haldir',
      'Maren',
      'Corin',
      'Linnea',
    ],
    surnames: [
      'Swiftbow',
      'Greenwood',
      'Hawkwind',
      'Fletcher',
      'Mossbrook',
      'Pinecrest',
      'Farstrider',
      'Thornarrow',
      'Clearwater',
      'Staghorn',
      'Reed',
      'Vale',
    ],
    gearOptions: [
      'Laminated Yew Recurve & Quiver',
      'Ashwood Longbow & Hunting Knife',
      'Ranger Spyglass & Camouflage Cloak',
      'Horn-Tipped Shortbow & Snare Kit',
      'Silver-Fletched Arrows & Leather Bracer',
    ],
    traits: [
      'Tracks a stag across bare granite',
      'Calculates crosswinds in a heartbeat',
      'Carves personal fletching by firelight',
      'Never wastes a single arrow',
      'Knows every edible root in the wilds',
    ],
    backstories: [
      'Raised as a sentinel of the Whispering Canopy, they patrol the outer marches for poachers and encroaching blight.',
      'A renowned scout who mapped three uncharted mountain passes before returning with warnings of waking dragons.',
      'Trained by royal foresters, they left courtly tournaments behind to protect remote villages from winter wolves.',
    ],
    statProfile: {
      STR: [10, 14],
      DEX: [16, 20],
      CON: [11, 15],
      INT: [10, 14],
      WIS: [14, 18],
      CHA: [9, 13],
    },
  },
  Paladin: {
    name: 'Paladin',
    role: 'Sacred Knight',
    primaryStat: 'CHA',
    summary: 'Binds martial prowess to an unbreakable vow of justice and protection.',
    accentHex: '#FBBF24',
    firstNames: [
      'Aurelia',
      'Cedric',
      'Seraphiel',
      'Galahad',
      'Helena',
      'Valen',
      'Beatrice',
      'Lucan',
      'Caelia',
      'Roland',
      'Evangeline',
      'Alaric',
      'Sabine',
      'Hadrian',
      'Claire',
      'Gavriel',
    ],
    surnames: [
      'Dawnshield',
      'Lightbringer',
      'Oathkeeper',
      'Suncrest',
      'Trueheart',
      'Silvervow',
      'Aegis',
      'Brighthelm',
      'Hallow',
      'Vigil',
      'Goldmane',
      'Solis',
    ],
    gearOptions: [
      'Consecrated Warhammer & Sun Tabard',
      'Burnished Longsword & Oath Reliquary',
      'Gilded Heater Shield & Lance',
      'Silvered Mace & Blessed Censer',
      'Tempered Plate & Banner of Dawn',
    ],
    traits: [
      'Keeps every promise spoken aloud',
      'Radiates calm in the darkest crypt',
      'Polishes armor each dawn in vigil',
      'Shields the wounded before striking',
      'Speaks truth even before hostile kings',
    ],
    backstories: [
      'Sworn to the Order of the Silver Lantern, they ride into plague-stricken provinces to defend pilgrims and banish undead.',
      'Once a squire who stood alone at a burning bridge, their courage earned knighthood and a sacred relic of dawn.',
      'Bound by an ancient family oath, they seek redemption for an ancestor’s betrayal by championing the defenseless.',
    ],
    statProfile: {
      STR: [15, 19],
      DEX: [9, 13],
      CON: [14, 18],
      INT: [9, 13],
      WIS: [12, 16],
      CHA: [15, 19],
    },
  },
};

export const CHARACTER_CLASSES: CharacterClass[] = [
  'Mage',
  'Rogue',
  'Warrior',
  'Archer',
  'Paladin',
];

const ANCESTRIES = [
  'Human',
  'High Elf',
  'Half-Elf',
  'Mountain Dwarf',
  'Wood Elf',
  'Half-Orc',
  'Tiefling',
  'Aasimar',
];

const ORIGINS = [
  'Silverkeep',
  'Highland March',
  'Freehaven',
  'Ashenvale',
  'Stormwatch',
  'Sunspire',
  'Frostford',
  'Oakenshield',
];

const ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildUniqueName(def: ClassDefinition, usedNames?: Set<string>): string {
  for (let attempt = 0; attempt < 40; attempt++) {
    const first = randomItem(def.firstNames);
    const last = randomItem(def.surnames);
    const candidate = `${first} ${last}`;
    if (!usedNames || !usedNames.has(candidate)) {
      return candidate;
    }
  }
  const first = randomItem(def.firstNames);
  const last = randomItem(def.surnames);
  const numeral = randomItem(['II', 'III', 'of the Vale', 'of Dawn', 'the Bold', 'the Wanderer']);
  return `${first} ${last} ${numeral}`;
}

export function generateRandomCharacter(
  usedNames?: Set<string>,
  options?: { forcedClass?: CharacterClass; excludeClass?: CharacterClass }
): FantasyCharacter {
  let availableClasses = CHARACTER_CLASSES;
  if (options?.excludeClass && CHARACTER_CLASSES.length > 1) {
    availableClasses = CHARACTER_CLASSES.filter((c) => c !== options.excludeClass);
  }

  const chosenClass = options?.forcedClass ?? randomItem(availableClasses);
  const def = CLASS_DEFINITIONS[chosenClass];

  const attributes: CharacterAttributes = {
    STR: randomInt(def.statProfile.STR[0], def.statProfile.STR[1]),
    DEX: randomInt(def.statProfile.DEX[0], def.statProfile.DEX[1]),
    CON: randomInt(def.statProfile.CON[0], def.statProfile.CON[1]),
    INT: randomInt(def.statProfile.INT[0], def.statProfile.INT[1]),
    WIS: randomInt(def.statProfile.WIS[0], def.statProfile.WIS[1]),
    CHA: randomInt(def.statProfile.CHA[0], def.statProfile.CHA[1]),
  };

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: buildUniqueName(def, usedNames),
    characterClass: chosenClass,
    role: def.role,
    ancestry: randomItem(ANCESTRIES),
    origin: randomItem(ORIGINS),
    alignment: randomItem(ALIGNMENTS),
    trait: randomItem(def.traits),
    signatureGear: randomItem(def.gearOptions),
    backstory: randomItem(def.backstories),
    attributes,
  };
}
