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
  health: number;
  mana: number;
  strength: number;
  attributes: CharacterAttributes;
  portraitVariant?: number;
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

const BACKSTORY_BUILDERS: Record<
  CharacterClass,
  { openings: string[]; closings: string[] }
> = {
  Mage: {
    openings: [
      'Born beneath a fractured eclipse in {origin}, {name} mastered forbidden sigils after unlocking an observatory vault long thought barren.',
      'Once a quiet scribe in the high scriptorium of {origin}, {name} survived an arcane tempest that etched glowing constellations across their memory.',
      'Trained by reclusive storm-callers along the cliffs near {origin}, {name} proved their worth as a {ancestry} mage by binding lightning into glass.',
      'Exiled from the Conclave of {origin} for questioning an ancient prophecy, {name} carried a single unburnt folio into the mist.',
      'As a young {ancestry} apprentice in {origin}, {name} discovered that whispered ink on parchment could stir dormant ley lines awake.',
      'Raised among ruined star-towers outside {origin}, {name} taught themselves high spellcraft from cracked astrolabes and soot-stained grimoires.',
      'After sealing a rift that threatened to swallow {origin} in shadow, {name} emerged as a seasoned mage marked by faint silver sparks.',
      'Sworn to recover the lost volumes of {origin}, {name} left gilded halls behind to study raw magic where empires crumbled.',
    ],
    closings: [
      'Now {firstName} travels the borderlands bearing their {gear}, seeking the missing keystone to an ancient celestial chart.',
      'Guided by omens in rising ember smoke, {firstName} trades protective wards for forgotten manuscripts and truths no king dares speak.',
      'Wherever restless spirits or cursed relics surface, {firstName} steps forward with {gear} ready to unravel the spell.',
      'Though rivals still hunt their research, {firstName} charts uncharted ruins in pursuit of a spell that could mend a broken realm.',
      'With {gear} at their side, {firstName} seeks fellow wanderers brave enough to cross the cursed thresholds of the outer marches.',
      'Every tavern rumor of waking monoliths draws {firstName} onward, determined to outwit the shadow before its tide returns.',
      'Bearing their {gear}, {firstName} walks a lonely road between mortal courts and older powers stirring beneath the stone.',
      'Still haunted by what whispered from the void, {firstName} hones each incantation for the reckoning yet to come.',
    ],
  },
  Rogue: {
    openings: [
      'Raised in the fog-choked alleys and canal vaults of {origin}, {name} learned early that a quiet step outlasts any drawn blade.',
      'Once a trusted cipher-runner for rival lords in {origin}, {name} vanished the night a sealed ledger revealed a royal betrayal.',
      'As a sharp-eyed {ancestry} cutpurse in {origin}, {name} rose from rooftop lookouts to become a rogue whispered about in gilded halls.',
      'Known across the harbor taverns of {origin} as a phantom locksmith, {name} never left a mark—only empty strongboxes belonging to tyrants.',
      'Framed for a heist that shook the merchant guild of {origin}, {name} slipped past iron grates with nothing but wit and nerve.',
      'Trained by shadow-brokers beneath the cobblestones of {origin}, {name} mastered every lock, ledger, and false crest in the realm.',
      'When mercenaries burned their safehouse in {origin}, {name} swore to turn every stolen secret against the syndicate that ordered it.',
      'A prodigy of sleight-of-hand from the backstreets of {origin}, {name} built a reputation for stealing back heirlooms meant for the poor.',
    ],
    closings: [
      'Today {firstName} moves unseen through border courts bearing their {gear}, taking only contracts that strike at corrupt crowns.',
      'Always counting exits before speaking, {firstName} keeps three forged passes and their {gear} tucked close for a sudden escape.',
      'With {gear} concealed beneath a weathered cloak, {firstName} sells dangerous truths to those who can still afford honor.',
      'Rumor says {firstName} can slip past dragon-warded vaults, yet they never betray a companion once a coin is shared.',
      'Armed with {gear} and an unerring memory for voices, {firstName} hunts the traitorous patron who left them to the gallows.',
      'From moonlit rooftops to smoky inns, {firstName} collects debts in silence and vanishes before the watchmen raise a lantern.',
      'Bearing their {gear}, {firstName} follows rumors of a sunken treasury said to hold the proof that could clear their name.',
      'Though bounty posters carry their likeness, {firstName} walks freely in plain sight—always one step ahead of the bounty.',
    ],
  },
  Warrior: {
    openings: [
      'Forged in the brutal border skirmishes beyond {origin}, {name} stood alone at a shattered gate until dawn finally broke the siege.',
      'Once a proud shield-bearer of {origin}, {name} walked away from a corrupt warlord rather than raise steel against innocent villagers.',
      'Born to iron-workers in the cold valleys of {origin}, this battle-hardened {ancestry} warrior learned to trust tempered steel above promises.',
      'Sole survivor of a vanished company from {origin}, {name} carries seven campaign scars and the unbroken oath of fallen comrades.',
      'After winning freedom in the fighting pits of {origin} without yielding honor, {name} swore never to fight for another lord’s amusement.',
      'Raised guarding mountain passes above {origin}, {name} earned renown as a steadfast warrior who never yielded an inch of stone.',
      'When frost-raiders descended upon {origin}, {name} rallied townsfolk with an iron voice and drove the warband back into the dark.',
      'Trained since youth in the garrison yards of {origin}, {name} carries the discipline of old campaigns into every new fray.',
    ],
    closings: [
      'Now {firstName} escorts endangered caravans bearing their {gear}, standing firm wherever monsters prowl the road.',
      'Before every march, {firstName} sharpens their {gear} by firelight and vows to bring every ally back alive.',
      'With {gear} slung ready, {firstName} travels from frontier keep to frontier keep seeking the lost banner of their regiment.',
      'Though battlefields have tried to break them, {firstName} anchors wavering allies with steady steel and unflinching grit.',
      'Bearing their {gear}, {firstName} answers calls for aid that gilded knights consider too perilous or unprofitable.',
      'Every scar tells of a bridge held or a comrade saved, and {firstName} still seeks one final clash worthy of song.',
      'With {gear} in hand, {firstName} walks the scarred highroads, turning back raiders before they reach quiet hearthfires.',
      'Quiet around the campfire yet fierce in the breach, {firstName} lets deeds written in iron speak louder than boasts.',
    ],
  },
  Archer: {
    openings: [
      'Raised beneath the towering canopy outside {origin}, {name} learned to read shifting winds before most youths could string a bow.',
      'A keen-eyed {ancestry} tracker from the wild borders of {origin}, {name} once guided lost travelers across blizzards without losing a single soul.',
      'After outshooting royal marksmen at the autumn trials of {origin}, {name} refused a courtly post to patrol the untamed wilds.',
      'Trained by silent foresters who watched the marches of {origin}, {name} became an archer capable of threading an arrow through falling leaves.',
      'When creeping blight poisoned the timberlands near {origin}, {name} followed its blackened trail deep into forgotten valleys.',
      'Known along the ridgeways of {origin} as a sentinel who never sleeps on watch, {name} spots ambushes miles before they spring.',
      'Left orphaned by a beast-pack outside {origin}, {name} grew up listening to the forest and answering danger with swift, silent flight.',
      'Having mapped three uncharted passes above {origin}, {name} returned with proof of ancient wings stirring in the peaks.',
    ],
    closings: [
      'Now {firstName} ranges across distant ridges bearing their {gear}, striking threats down before allies even hear the bowstring.',
      'Carving personal fletching beside quiet embers, {firstName} keeps their {gear} ready for whatever stalks the dark timber.',
      'With {gear} strapped tight across their shoulder, {firstName} tracks a relentless quarry that left {origin} in ashes.',
      'No fog or gale can spoil the aim of {firstName}, whose {gear} has turned the tide of a dozen desperate ambushes.',
      'Guided by subtle marks on bark and stone, {firstName} protects remote settlements far beyond the reach of royal patrols.',
      'Bearing their {gear}, {firstName} sells sharp eyes and steady arrows to expeditions bound for perilous ruins.',
      'Every arrow carried by {firstName} is fletched for a purpose, and none are loosed until the wind itself agrees.',
      'Still roaming the outer wilds with {gear}, {firstName} guards the forgotten trails where maps simply end.',
    ],
  },
  Paladin: {
    openings: [
      'Knighted on the steps of {origin} after holding a burning bridge alone, {name} carries a vow forged in sunrise and ash.',
      'Born to humble shrine-keepers in {origin}, this steadfast {ancestry} paladin took up sacred arms when undead hordes marched at dusk.',
      'Once a haunted squire who broke under fear outside {origin}, {name} swore an unbreakable oath to shield the helpless ever after.',
      'Inducted into the vigil orders of {origin}, {name} proved that true radiance shines brightest inside plague-darkened crypts.',
      'Bearing the tarnished crest of a disgraced house from {origin}, {name} rides to redeem their bloodline through selfless mercy.',
      'Chosen by an ancient temple bell that rang unbidden in {origin}, {name} left quiet cloisters behind to confront waking evil.',
      'When darkness veiled the pilgrim roads near {origin}, {name} lit a lone sanctuary lantern and stood watch until morning.',
      'Sworn before the high altar of {origin}, {name} tempered fierce martial skill with calm compassion for the downtrodden.',
    ],
    closings: [
      'Now {firstName} rides through shadowed provinces bearing their {gear}, banishing dread wherever pilgrims lose hope.',
      'Polishing their {gear} at first light each dawn, {firstName} honors every promise spoken aloud—even before hostile kings.',
      'With {gear} gleaming against the gloom, {firstName} shields the wounded first and seeks justice without cruelty.',
      'Though tempting bargains whisper from cursed shrines, {firstName} stands immovable with {gear} raised in quiet defiance.',
      'Bearing their {gear}, {firstName} follows rumors of a desecrated relic that must be reclaimed before the next solstice.',
      'Where tyrants rule through terror, {firstName} arrives with {gear} and an oath that cannot be bought or broken.',
      'Every dawn renews the resolve of {firstName}, whose steady presence steadies frightened hearts in the darkest vault.',
      'Guided by faith rather than gold, {firstName} walks the realm’s scarred roads until peace takes root once more.',
    ],
  },
};

export function generateUniqueBackstory(
  char: Pick<FantasyCharacter, 'name' | 'characterClass' | 'ancestry' | 'origin' | 'signatureGear' | 'backstory'>,
  usedBackstories?: Set<string>
): string {
  const pool = BACKSTORY_BUILDERS[char.characterClass];
  const firstName = char.name.split(' ')[0] || char.name;

  const fill = (template: string) =>
    template
      .replaceAll('{name}', char.name)
      .replaceAll('{firstName}', firstName)
      .replaceAll('{ancestry}', char.ancestry.toLowerCase())
      .replaceAll('{origin}', char.origin)
      .replaceAll('{gear}', char.signatureGear);

  for (let attempt = 0; attempt < 64; attempt++) {
    const opening = randomItem(pool.openings);
    const closing = randomItem(pool.closings);
    const candidate = `${fill(opening)} ${fill(closing)}`;
    if (candidate !== char.backstory && (!usedBackstories || !usedBackstories.has(candidate))) {
      return candidate;
    }
  }

  // Guaranteed fallback if pool exhausted for this exact character
  const opening = randomItem(pool.openings);
  const closing = randomItem(pool.closings);
  const fallback = `${fill(opening)} ${fill(closing)}`;
  if (fallback !== char.backstory) {
    return fallback;
  }
  const altClosing = pool.closings.find((c) => `${fill(opening)} ${fill(c)}` !== char.backstory) ?? pool.closings[0];
  return `${fill(opening)} ${fill(altClosing)}`;
}

export function generateVitalStats(): { health: number; mana: number; strength: number } {
  return {
    health: randomInt(50, 100),
    mana: randomInt(20, 100),
    strength: randomInt(10, 100),
  };
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

  const name = buildUniqueName(def, usedNames);
  const ancestry = randomItem(ANCESTRIES);
  const origin = randomItem(ORIGINS);
  const signatureGear = randomItem(def.gearOptions);

  const backstory = generateUniqueBackstory({
    name,
    characterClass: chosenClass,
    ancestry,
    origin,
    signatureGear,
    backstory: '',
  });

  const { health, mana, strength } = generateVitalStats();

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    characterClass: chosenClass,
    role: def.role,
    ancestry,
    origin,
    alignment: randomItem(ALIGNMENTS),
    trait: randomItem(def.traits),
    signatureGear,
    backstory,
    health,
    mana,
    strength,
    attributes,
  };
}
