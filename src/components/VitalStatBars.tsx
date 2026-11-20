import { Droplets, Flame, Heart } from 'lucide-react';

interface VitalStatBarsProps {
  health: number;
  mana: number;
  strength: number;
  compact?: boolean;
}

export function VitalStatBars({
  health,
  mana,
  strength,
  compact = false,
}: VitalStatBarsProps) {
  const stats = [
    {
      label: 'Health',
      value: health,
      icon: Heart,
      iconColor: 'text-rose-400',
      fillClass: 'bg-gradient-to-r from-rose-800 via-rose-500 to-rose-400',
      trackClass: 'bg-[#1D1214]',
    },
    {
      label: 'Mana',
      value: mana,
      icon: Droplets,
      iconColor: 'text-teal-300',
      fillClass: 'bg-gradient-to-r from-teal-800 via-teal-500 to-teal-300',
      trackClass: 'bg-[#0F1B1A]',
    },
    {
      label: 'Strength',
      value: strength,
      icon: Flame,
      iconColor: 'text-[#F2C56D]',
      fillClass: 'bg-gradient-to-r from-amber-800 via-amber-500 to-[#F2C56D]',
      trackClass: 'bg-[#1D160D]',
    },
  ];

  return (
    <div className={compact ? 'space-y-2.5' : 'grid grid-cols-1 sm:grid-cols-3 gap-4'}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const clamped = Math.max(0, Math.min(100, stat.value));
        return (
          <div key={stat.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#E8DEC8]">
                <Icon className={`w-3.5 h-3.5 ${stat.iconColor}`} aria-hidden="true" />
                <span>{stat.label}</span>
              </span>
              <span className="font-mono tabular-nums font-semibold text-[#FBF2DC]">
                {clamped}
                <span className="text-[#8E7C5E] font-normal">/100</span>
              </span>
            </div>

            <div
              role="progressbar"
              aria-label={stat.label}
              aria-valuenow={clamped}
              aria-valuemin={0}
              aria-valuemax={100}
              className={`w-full ${compact ? 'h-2' : 'h-2.5'} rounded-full overflow-hidden border border-[#C99B49]/25 ${stat.trackClass}`}
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${stat.fillClass}`}
                style={{ width: `${clamped}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
