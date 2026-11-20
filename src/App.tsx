import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Check,
  Copy,
  Dices,
  Download,
  Image as ImageIcon,
  Layers,
  RefreshCw,
  RotateCcw,
  ScrollText,
  Trash2,
} from 'lucide-react';
import {
  CHARACTER_CLASSES,
  CLASS_DEFINITIONS,
  type CharacterAttributes,
  type CharacterClass,
  type FantasyCharacter,
  generateRandomCharacter,
  generateUniqueBackstory,
  generateVitalStats,
} from './data/characters';
import { ClassEmblem } from './components/ClassEmblem';
import { CharacterPortrait } from './components/CharacterPortrait';
import { AlchemicalDivider, WorkbenchCornerFiligree } from './components/AlchemicalOrnaments';
import { VitalStatBars } from './components/VitalStatBars';

const STAT_KEYS: (keyof CharacterAttributes)[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const DECK_STORAGE_KEY = 'realm-forge-saved-deck';
const LEGACY_SAVED_KEY = 'realm-forge-saved-characters';

function loadDeckCharacters(): FantasyCharacter[] {
  try {
    const raw =
      window.localStorage.getItem(DECK_STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_SAVED_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is FantasyCharacter =>
          typeof item === 'object' &&
          item !== null &&
          typeof (item as FantasyCharacter).id === 'string' &&
          typeof (item as FantasyCharacter).name === 'string' &&
          typeof (item as FantasyCharacter).characterClass === 'string' &&
          (item as FantasyCharacter).characterClass in CLASS_DEFINITIONS
      )
      .map((item) => {
        const hasVitals =
          typeof item.health === 'number' &&
          typeof item.mana === 'number' &&
          typeof item.strength === 'number';
        if (hasVitals) return item;
        return { ...item, ...generateVitalStats() };
      });
  } catch {
    return [];
  }
}

function formatCharacterSheet(char: FantasyCharacter): string {
  const statsLine = STAT_KEYS.map((key) => `${key} ${char.attributes[key]}`).join(' | ');
  return [
    `${char.name} — ${char.characterClass} (${char.role})`,
    `${char.ancestry} · ${char.origin} · ${char.alignment}`,
    `Vitals: Health ${char.health}/100 | Mana ${char.mana}/100 | Strength ${char.strength}/100`,
    `Gear: ${char.signatureGear}`,
    `Trait: ${char.trait}`,
    `Attributes: ${statsLine}`,
    '',
    char.backstory,
  ].join('\n');
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  const [deck, setDeck] = useState<FantasyCharacter[]>(() => loadDeckCharacters());

  const usedNamesRef = useRef<Set<string>>(
    new Set(deck.map((entry) => entry.name))
  );
  const usedBackstoriesRef = useRef<Set<string>>(
    new Set(deck.map((entry) => entry.backstory))
  );

  const [character, setCharacter] = useState<FantasyCharacter>(() => {
    const initial = generateRandomCharacter(usedNamesRef.current);
    usedNamesRef.current.add(initial.name);
    usedBackstoriesRef.current.add(initial.backstory);
    return initial;
  });

  const [history, setHistory] = useState<FantasyCharacter[]>([]);
  const [portraitsById, setPortraitsById] = useState<Record<string, number>>(() => {
    const initialMap: Record<string, number> = {};
    for (const saved of deck) {
      if (typeof saved.portraitVariant === 'number') {
        initialMap[saved.id] = saved.portraitVariant;
      }
    }
    return initialMap;
  });
  const [copied, setCopied] = useState(false);
  const [deckNotice, setDeckNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch {
      // Ignore storage quota or private browsing write errors
    }
  }, [deck]);

  const isCurrentInDeck = deck.some((entry) => entry.id === character.id);
  const currentPortraitVariant = portraitsById[character.id] ?? character.portraitVariant;
  const hasPortrait = typeof currentPortraitVariant === 'number';

  const showDeckNotice = (message: string) => {
    setDeckNotice(message);
    window.setTimeout(() => {
      setDeckNotice((current) => (current === message ? null : current));
    }, 2400);
  };

  const applyPortraitVariant = (nextVariant: number) => {
    setPortraitsById((prev) => ({ ...prev, [character.id]: nextVariant }));
    setCharacter((prev) => ({ ...prev, portraitVariant: nextVariant }));
    setDeck((prev) =>
      prev.map((entry) =>
        entry.id === character.id ? { ...entry, portraitVariant: nextVariant } : entry
      )
    );
    setHistory((prev) =>
      prev.map((entry) =>
        entry.id === character.id ? { ...entry, portraitVariant: nextVariant } : entry
      )
    );
  };

  const handleGeneratePortrait = () => {
    const nextVariant = hasPortrait ? currentPortraitVariant + 1 : 1;
    applyPortraitVariant(nextVariant);
  };

  const handleRegeneratePortrait = () => {
    const nextVariant = (currentPortraitVariant ?? 0) + 1;
    applyPortraitVariant(nextVariant);
  };

  const handleGenerateBackstory = () => {
    const nextBackstory = generateUniqueBackstory(character, usedBackstoriesRef.current);
    usedBackstoriesRef.current.add(nextBackstory);

    setCharacter((prev) => ({ ...prev, backstory: nextBackstory }));
    setDeck((prev) =>
      prev.map((entry) =>
        entry.id === character.id ? { ...entry, backstory: nextBackstory } : entry
      )
    );
    setHistory((prev) =>
      prev.map((entry) =>
        entry.id === character.id ? { ...entry, backstory: nextBackstory } : entry
      )
    );
    setCopied(false);
  };

  const handleGenerateCharacter = (forcedClass?: CharacterClass) => {
    const next = generateRandomCharacter(usedNamesRef.current, {
      forcedClass,
      excludeClass: forcedClass ? undefined : character.characterClass,
    });
    usedNamesRef.current.add(next.name);
    usedBackstoriesRef.current.add(next.backstory);

    setHistory((prev) => [character, ...prev.filter((item) => item.id !== character.id)].slice(0, 6));
    setCharacter(next);
    setCopied(false);
    setDeckNotice(null);
  };

  const handleSaveToDeck = () => {
    const cardSnapshot: FantasyCharacter =
      typeof currentPortraitVariant === 'number'
        ? { ...character, portraitVariant: currentPortraitVariant }
        : { ...character };

    const alreadySaved = deck.some(
      (entry) =>
        entry.id === cardSnapshot.id ||
        (entry.name === cardSnapshot.name && entry.characterClass === cardSnapshot.characterClass)
    );

    if (alreadySaved) {
      setDeck((prev) =>
        prev.map((entry) => (entry.id === cardSnapshot.id ? cardSnapshot : entry))
      );
      showDeckNotice(`${character.name} is already in My Deck.`);
      return;
    }

    setDeck((prev) => [cardSnapshot, ...prev]);
    showDeckNotice(`${character.name} added to My Deck.`);
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleClearDeck = () => {
    setDeck([]);
    setDeckNotice(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleInspectCharacter = (target: FantasyCharacter) => {
    if (target.id === character.id) return;
    setHistory((prev) =>
      [character, ...prev.filter((entry) => entry.id !== target.id && entry.id !== character.id)].slice(0, 6)
    );
    setCharacter(target);
    setCopied(false);
    setDeckNotice(null);
  };

  const handleCopySummary = async () => {
    const text = formatCharacterSheet(character);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadSheet = () => {
    const text = formatCharacterSheet(character);
    const slug = character.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug || 'character'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activeClassDef = CLASS_DEFINITIONS[character.characterClass];

  return (
    <div className="min-h-screen flex flex-col alchemist-workbench text-[#F3E9D2] relative">
      {/* Subtle Mineral & Parchment Surface Grain */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 alchemist-grain opacity-90" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 border-b border-[#C99B49]/25 bg-[#0F0C09]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a
            href="#sheet"
            className="font-display text-lg sm:text-xl font-bold tracking-wide text-[#ECC574] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
          >
            Realm Forge
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#C8B99B]"
          >
            <a
              href="#sheet"
              className="hover:text-[#FBF2DC] hover:underline underline-offset-4 decoration-[#C99B49]/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              Player Card
            </a>
            <a
              href="#classes"
              className="hover:text-[#FBF2DC] hover:underline underline-offset-4 decoration-[#C99B49]/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              Classes
            </a>
            <a
              href="#my-deck"
              className="hover:text-[#FBF2DC] hover:underline underline-offset-4 decoration-[#C99B49]/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              My Deck
            </a>
            <a
              href="#recent"
              className="hover:text-[#FBF2DC] hover:underline underline-offset-4 decoration-[#C99B49]/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              Recent
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium text-[#F3E9D2] bg-[#1B1510]/85 border border-[#C99B49]/35 rounded-lg hover:bg-[#261D15] hover:border-[#E5B85C]/65 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#D4A44C]" aria-hidden="true" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Alchemist Workbench Content */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-6 py-8 md:py-12 space-y-14">
        {/* Active RPG Player Card Stage */}
        <section id="sheet" aria-labelledby="character-name">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#FBF2DC] text-balance tracking-wide">
                Fantasy RPG Player Card Forge
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-[#C8B99B] max-w-2xl">
                Roll an adventurer with random Health, Mana, and Strength stats, conjure a portrait and backstory, then save them to My Deck.
              </p>
            </div>
          </div>

          {/* Primary Bordered Fantasy Player Card */}
          <motion.article
            key={character.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative alchemist-ledger border-2 border-[#C99B49]/45 rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch"
          >
            <WorkbenchCornerFiligree />

            {/* Left Card Portrait / Codex Plate */}
            <div className="md:w-[320px] lg:w-[360px] shrink-0">
              {hasPortrait ? (
                <motion.div
                  key={`${character.id}-portrait-${currentPortraitVariant}`}
                  initial={prefersReducedMotion ? false : { opacity: 0.35, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <CharacterPortrait
                    character={character}
                    variant={currentPortraitVariant}
                  />
                </motion.div>
              ) : (
                <ClassEmblem
                  characterClass={character.characterClass}
                  role={character.role}
                />
              )}
            </div>

            {/* Right Player Card Details */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-7">
              <div>
                {/* Unboxed Origin Metadata */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#C8B99B]">
                  <span>{character.ancestry}</span>
                  <span aria-hidden="true" className="text-[#9A7437]">·</span>
                  <span>{character.origin}</span>
                  <span aria-hidden="true" className="text-[#9A7437]">·</span>
                  <span>{character.alignment}</span>
                </div>

                {/* Decorative Fantasy Character Name */}
                <h2
                  id="character-name"
                  className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.14] font-bold tracking-wide text-[#FBF2DC] text-balance [text-shadow:0_2px_18px_rgba(229,184,92,0.22)]"
                >
                  {character.name}
                </h2>

                <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-[#B69B72]">Class</span>
                  <span
                    className="text-xl sm:text-2xl font-semibold tracking-tight"
                    style={{ color: activeClassDef.accentHex }}
                  >
                    {character.characterClass}
                  </span>
                  <span aria-hidden="true" className="text-[#8E6D3B]">—</span>
                  <span className="text-sm sm:text-base text-[#E8DEC8]">
                    {character.role}
                  </span>
                </div>

                {/* Character Backstory */}
                <motion.p
                  key={character.backstory}
                  initial={prefersReducedMotion ? false : { opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 text-sm sm:text-base leading-relaxed text-[#DDD1BA] max-w-2xl"
                >
                  {character.backstory}
                </motion.p>

                {/* Random Character Vitals: Health, Mana, Strength Progress Bars */}
                <div className="mt-6">
                  <AlchemicalDivider />
                  <div className="mt-5">
                    <VitalStatBars
                      health={character.health}
                      mana={character.mana}
                      strength={character.strength}
                    />
                  </div>
                </div>

                {/* Equipment & Trait Details */}
                <div className="mt-6">
                  <div className="brass-rule mb-5" />
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-xs font-medium text-[#B69B72]">Signature Gear</dt>
                      <dd className="mt-1 text-[#F5EAD4] font-medium">{character.signatureGear}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[#B69B72]">Defining Trait</dt>
                      <dd className="mt-1 text-[#F5EAD4] font-medium">{character.trait}</dd>
                    </div>
                  </dl>
                </div>

                {/* Tabular RPG Attribute Strip */}
                <div className="mt-5">
                  <div className="brass-rule mb-4" />
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {STAT_KEYS.map((stat) => {
                      const isPrimary = stat === activeClassDef.primaryStat;
                      return (
                        <div key={stat} className="flex flex-col">
                          <span className="text-xs font-medium text-[#B69B72]">
                            {stat}
                          </span>
                          <span
                            className={`mt-0.5 font-mono tabular-nums text-lg font-semibold ${
                              isPrimary ? 'text-[#F2C56D]' : 'text-[#F3E9D2]'
                            }`}
                          >
                            {character.attributes[stat]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Workbench Action Controls */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleGenerateCharacter()}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[46px] rounded-lg bg-gradient-to-b from-[#E5B85C] to-[#BA832A] hover:from-[#ECC574] hover:to-[#C89034] active:scale-[0.99] text-[#140F0A] font-semibold text-sm sm:text-base shadow-[0_6px_22px_-6px_rgba(212,155,53,0.5)] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <Dices className="w-4 h-4" aria-hidden="true" />
                    <span>Generate Character</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGeneratePortrait}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] rounded-lg border border-teal-400/45 bg-teal-950/55 hover:bg-teal-900/65 hover:border-teal-300/70 text-teal-100 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                  >
                    <ImageIcon className="w-4 h-4 text-teal-300" aria-hidden="true" />
                    <span>Generate Portrait</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRegeneratePortrait}
                    disabled={!hasPortrait}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] rounded-lg border text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                      hasPortrait
                        ? 'border-[#C99B49]/45 bg-[#201811] text-[#F3E9D2] hover:bg-[#2A2017] hover:border-[#E5B85C]/70 cursor-pointer'
                        : 'border-[#C99B49]/15 bg-[#15110E] text-[#7D6C52] cursor-not-allowed opacity-65'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    <span>Regenerate Portrait</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerateBackstory}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[46px] rounded-lg border border-[#C99B49]/45 bg-[#201811] hover:bg-[#2A2017] hover:border-[#E5B85C]/75 text-[#F3E9D2] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <ScrollText className="w-4 h-4 text-[#E5B85C]" aria-hidden="true" />
                    <span>Generate Backstory</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveToDeck}
                    aria-pressed={isCurrentInDeck}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] rounded-lg border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                      isCurrentInDeck
                        ? 'border-teal-400/50 bg-teal-950/50 text-teal-100 hover:bg-teal-900/60'
                        : 'border-[#C99B49]/45 bg-[#1B140E] text-[#FBF2DC] hover:bg-[#271E15] hover:border-[#E5B85C]/70'
                    }`}
                  >
                    <Layers
                      className={`w-4 h-4 ${isCurrentInDeck ? 'text-teal-300' : 'text-[#E5B85C]'}`}
                      aria-hidden="true"
                    />
                    <span>Save to Deck</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadSheet}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg border border-[#C99B49]/30 bg-[#18130F] text-xs sm:text-sm font-medium text-[#E8DEC8] hover:bg-[#231B14] hover:border-[#C99B49]/55 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                  >
                    <Download className="w-4 h-4 text-[#C99B49]" aria-hidden="true" />
                    <span>Download</span>
                  </button>

                  {deckNotice ? (
                    <span className="text-xs font-medium text-teal-300">{deckNotice}</span>
                  ) : (
                    isCurrentInDeck && (
                      <span className="text-xs text-[#C8B99B]">In My Deck</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </section>

        {/* Class Compendium / Quick Class Roll */}
        <section id="classes" aria-labelledby="classes-heading" className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4">
            <h2 id="classes-heading" className="font-display text-xl font-bold text-[#FBF2DC] tracking-wide">
              Adventurer Classes
            </h2>
            <p className="text-xs sm:text-sm text-[#C8B99B]">
              Select any class below to roll a new player card from that archetype.
            </p>
          </div>
          <AlchemicalDivider />

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CHARACTER_CLASSES.map((className) => {
              const def = CLASS_DEFINITIONS[className];
              const isCurrent = character.characterClass === className;
              return (
                <button
                  key={className}
                  type="button"
                  onClick={() => handleGenerateCharacter(className)}
                  className={`text-left p-4 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                    isCurrent
                      ? 'bg-[#221A12] border-[#E5B85C]/70 shadow-[inset_0_1px_0_rgba(235,192,109,0.22)]'
                      : 'bg-[#16120E]/90 border-[#C99B49]/25 hover:border-[#C99B49]/55 hover:bg-[#1E1712]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="font-semibold text-base"
                      style={{ color: def.accentHex }}
                    >
                      {def.name}
                    </span>
                    <span className="font-mono text-xs text-[#B69B72] tabular-nums">
                      {def.primaryStat}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-[#E8DEC8]">{def.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#C8B99B]">
                    {def.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* My Deck — Saved Fantasy Player Cards */}
        <section id="my-deck" aria-labelledby="deck-heading" className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div>
              <h2 id="deck-heading" className="font-display text-xl font-bold text-[#FBF2DC] tracking-wide">
                My Deck
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-[#C8B99B]">
                {deck.length === 0
                  ? 'Save player cards from the workbench to build your party deck.'
                  : `${deck.length} saved ${deck.length === 1 ? 'player card' : 'player cards'} stored in this browser.`}
              </p>
            </div>

            {deck.length > 0 && (
              <button
                type="button"
                onClick={handleClearDeck}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-medium text-[#C8B99B] hover:text-[#FBF2DC] rounded-lg border border-[#C99B49]/25 hover:bg-[#231B14] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear Deck</span>
              </button>
            )}
          </div>
          <AlchemicalDivider />

          {deck.length === 0 ? (
            <p className="mt-5 text-sm text-[#9A8B71]">
              Click Save to Deck on any character card above to collect it here.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deck.map((card) => {
                const def = CLASS_DEFINITIONS[card.characterClass];
                const isActive = card.id === character.id;
                const cardPortraitVariant = portraitsById[card.id] ?? card.portraitVariant;
                return (
                  <article
                    key={card.id}
                    className={`relative alchemist-ledger rounded-xl overflow-hidden flex flex-col border-2 transition-colors ${
                      isActive ? 'border-[#E5B85C]/80' : 'border-[#C99B49]/35'
                    }`}
                  >
                    <WorkbenchCornerFiligree />

                    {/* Card Portrait or Class Emblem */}
                    {typeof cardPortraitVariant === 'number' ? (
                      <CharacterPortrait
                        character={card}
                        variant={cardPortraitVariant}
                        compact
                      />
                    ) : (
                      <ClassEmblem
                        characterClass={card.characterClass}
                        role={card.role}
                        compact
                      />
                    )}

                    {/* Card Body */}
                    <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#C8B99B]">
                          <span>{card.ancestry}</span>
                          <span aria-hidden="true" className="text-[#9A7437]">·</span>
                          <span>{card.origin}</span>
                        </div>

                        <h3 className="mt-1.5 font-display text-xl font-bold text-[#FBF2DC] tracking-wide text-balance">
                          {card.name}
                        </h3>

                        <div className="mt-1 flex items-baseline gap-2 text-sm">
                          <span className="font-semibold" style={{ color: def.accentHex }}>
                            {card.characterClass}
                          </span>
                          <span aria-hidden="true" className="text-[#8E6D3B]">—</span>
                          <span className="text-xs text-[#C8B99B]">{card.role}</span>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-[#DDD1BA]">
                          {card.backstory}
                        </p>

                        <div className="mt-4 pt-3 border-t border-[#C99B49]/20">
                          <VitalStatBars
                            health={card.health}
                            mana={card.mana}
                            strength={card.strength}
                            compact
                          />
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-[#C99B49]/20 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleInspectCharacter(card)}
                          className={`px-3.5 py-2 min-h-[40px] rounded-lg border text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                            isActive
                              ? 'border-[#E5B85C]/65 bg-[#2A2016] text-[#F2C56D]'
                              : 'border-[#C99B49]/35 bg-[#1B140E] text-[#F3E9D2] hover:bg-[#261D15]'
                          }`}
                        >
                          {isActive ? 'Displayed' : 'Inspect Card'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveFromDeck(card.id)}
                          aria-label={`Remove ${card.name} from My Deck`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg text-xs font-medium text-[#C8B99B] hover:text-red-400 hover:bg-[#2A2018] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent Rolls History */}
        <section id="recent" aria-labelledby="recent-heading" className="pt-2">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div>
              <h2 id="recent-heading" className="font-display text-xl font-bold text-[#FBF2DC] tracking-wide">
                Recent Rolls
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-[#C8B99B]">
                Previously generated characters from this session.
              </p>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-medium text-[#C8B99B] hover:text-[#FBF2DC] rounded-lg hover:bg-[#231B14] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <AlchemicalDivider />

          {history.length === 0 ? (
            <p className="mt-5 text-sm text-[#9A8B71]">
              Click Generate Character to track recent session rolls here.
            </p>
          ) : (
            <div className="mt-5 divide-y divide-[#C99B49]/15 border border-[#C99B49]/25 rounded-xl bg-[#16120E]/90 overflow-hidden">
              {history.map((item) => {
                const def = CLASS_DEFINITIONS[item.characterClass];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleInspectCharacter(item)}
                    className="w-full px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left hover:bg-[#211A13]/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-400"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display font-semibold text-base text-[#FBF2DC]">
                        {item.name}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: def.accentHex }}
                      >
                        {item.characterClass}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#C8B99B] font-mono tabular-nums">
                      <span>HP {item.health}</span>
                      <span aria-hidden="true" className="text-[#8E6D3B]">·</span>
                      <span>MP {item.mana}</span>
                      <span aria-hidden="true" className="text-[#8E6D3B]">·</span>
                      <span>STR {item.strength}</span>
                      <span aria-hidden="true" className="text-[#8E6D3B]">·</span>
                      <span className="font-sans text-[#E8DEC8]">Inspect</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 border-t border-[#C99B49]/20 mt-auto bg-[#0C0A08]/80">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9A8B71]">
          <span>Realm Forge</span>
          <span>Fantasy RPG Player Card Forge</span>
        </div>
      </footer>
    </div>
  );
}
