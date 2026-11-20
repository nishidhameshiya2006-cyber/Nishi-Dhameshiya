import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy, Dices, RotateCcw } from 'lucide-react';
import {
  CHARACTER_CLASSES,
  CLASS_DEFINITIONS,
  type CharacterAttributes,
  type CharacterClass,
  type FantasyCharacter,
  generateRandomCharacter,
} from './data/characters';
import { ClassEmblem } from './components/ClassEmblem';

const STAT_KEYS: (keyof CharacterAttributes)[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const usedNamesRef = useRef<Set<string>>(new Set());

  const [character, setCharacter] = useState<FantasyCharacter>(() => {
    const initial = generateRandomCharacter();
    usedNamesRef.current.add(initial.name);
    return initial;
  });

  const [history, setHistory] = useState<FantasyCharacter[]>([]);
  const [copied, setCopied] = useState(false);

  const handleGenerateCharacter = (forcedClass?: CharacterClass) => {
    const next = generateRandomCharacter(usedNamesRef.current, {
      forcedClass,
      excludeClass: forcedClass ? undefined : character.characterClass,
    });
    usedNamesRef.current.add(next.name);

    setHistory((prev) => [character, ...prev].slice(0, 6));
    setCharacter(next);
    setCopied(false);
  };

  const handleCopySummary = async () => {
    const statsLine = STAT_KEYS.map((key) => `${key} ${character.attributes[key]}`).join(' | ');
    const text = [
      `${character.name} — ${character.characterClass} (${character.role})`,
      `${character.ancestry} · ${character.origin} · ${character.alignment}`,
      `Gear: ${character.signatureGear}`,
      `Trait: ${character.trait}`,
      `Attributes: ${statsLine}`,
      character.backstory,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const activeClassDef = CLASS_DEFINITIONS[character.characterClass];

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1216] text-stone-100">
      {/* Top Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0F1216]/95">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a
            href="#sheet"
            className="font-display text-lg font-bold tracking-wide text-stone-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
          >
            Realm Forge
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-400"
          >
            <a
              href="#sheet"
              className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              Character Sheet
            </a>
            <a
              href="#classes"
              className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              Classes
            </a>
            <a
              href="#roster"
              className="hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              Recent Rolls
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium text-stone-200 border border-white/15 rounded-lg hover:bg-white/5 hover:border-white/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 md:py-12 space-y-14">
        {/* Hero Intro & Focal Character Stage */}
        <section id="sheet" aria-labelledby="character-name">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-100 text-balance">
                Fantasy Character Creator
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-stone-400 max-w-2xl">
                Roll a random adventurer with a unique name, classic RPG class, attributes, and background hook.
              </p>
            </div>
          </div>

          {/* Single-Elevation Character Dossier */}
          <motion.article
            key={character.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#161B22] border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row items-stretch"
          >
            {/* Left Portrait / Heraldic Plate */}
            <div className="md:w-[320px] lg:w-[360px] shrink-0">
              <ClassEmblem
                characterClass={character.characterClass}
                role={character.role}
              />
            </div>

            {/* Right Character Details */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8">
              <div>
                {/* Clean Unboxed Metadata */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-stone-400">
                  <span>{character.ancestry}</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>{character.origin}</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span>{character.alignment}</span>
                </div>

                {/* Character Name & Class Clearly Displayed */}
                <h2
                  id="character-name"
                  className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-50 text-balance"
                >
                  {character.name}
                </h2>

                <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-stone-400">Class</span>
                  <span
                    className="text-xl sm:text-2xl font-semibold tracking-tight"
                    style={{ color: activeClassDef.accentHex }}
                  >
                    {character.characterClass}
                  </span>
                  <span aria-hidden="true" className="text-stone-600">—</span>
                  <span className="text-sm sm:text-base text-stone-300">
                    {character.role}
                  </span>
                </div>

                {/* Backstory */}
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-stone-300 max-w-2xl">
                  {character.backstory}
                </p>

                {/* Hairline Equipment & Trait Details */}
                <dl className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs font-medium text-stone-400">Signature Gear</dt>
                    <dd className="mt-1 text-stone-100 font-medium">{character.signatureGear}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-stone-400">Defining Trait</dt>
                    <dd className="mt-1 text-stone-100 font-medium">{character.trait}</dd>
                  </div>
                </dl>

                {/* Tabular Attribute Strip */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {STAT_KEYS.map((stat) => {
                      const isPrimary = stat === activeClassDef.primaryStat;
                      return (
                        <div key={stat} className="flex flex-col">
                          <span className="text-xs font-medium text-stone-400">
                            {stat}
                          </span>
                          <span
                            className={`mt-0.5 font-mono tabular-nums text-lg font-semibold ${
                              isPrimary ? 'text-amber-400' : 'text-stone-100'
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

              {/* Primary Action Zone */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleGenerateCharacter()}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[46px] rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-stone-950 font-semibold text-sm sm:text-base transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  <Dices className="w-4 h-4" aria-hidden="true" />
                  <span>Generate Character</span>
                </button>

                <span className="text-xs text-stone-400">
                  Rolls a unique name and random class on every click.
                </span>
              </div>
            </div>
          </motion.article>
        </section>

        {/* Class Compendium / Quick Class Roll */}
        <section id="classes" aria-labelledby="classes-heading" className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-white/10">
            <h2 id="classes-heading" className="font-display text-xl font-bold text-stone-100">
              Adventurer Classes
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Select any class below to roll a character specifically from that archetype.
            </p>
          </div>

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
                      ? 'bg-[#1B222C] border-amber-500/50'
                      : 'bg-[#161B22] border-white/10 hover:border-white/25 hover:bg-[#1B222C]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="font-semibold text-base"
                      style={{ color: def.accentHex }}
                    >
                      {def.name}
                    </span>
                    <span className="font-mono text-xs text-stone-400 tabular-nums">
                      {def.primaryStat}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-stone-300">{def.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">
                    {def.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recent Rolls Roster */}
        <section id="roster" aria-labelledby="roster-heading" className="pt-2">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 id="roster-heading" className="font-display text-xl font-bold text-stone-100">
                Recent Characters
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-stone-400">
                Previously generated characters from this session.
              </p>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-medium text-stone-400 hover:text-stone-100 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="mt-5 text-sm text-stone-500">
              Click Generate Character to build your party roster.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-white/10 border border-white/10 rounded-xl bg-[#161B22] overflow-hidden">
              {history.map((item) => {
                const def = CLASS_DEFINITIONS[item.characterClass];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setHistory((prev) =>
                        [character, ...prev.filter((entry) => entry.id !== item.id)].slice(0, 6)
                      );
                      setCharacter(item);
                      setCopied(false);
                    }}
                    className="w-full px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left hover:bg-white/[0.03] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-amber-400"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display font-semibold text-base text-stone-100">
                        {item.name}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: def.accentHex }}
                      >
                        {item.characterClass}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      <span>{item.ancestry}</span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span>{item.origin}</span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      <span className="text-stone-300">Inspect</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-white/10 mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <span>Realm Forge</span>
          <span>Fantasy Character Creator</span>
        </div>
      </footer>
    </div>
  );
}
