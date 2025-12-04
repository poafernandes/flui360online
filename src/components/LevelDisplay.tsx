import React, { useEffect } from 'react';
import { useLevel, LEVEL_REQUIREMENTS } from '../contexts/LevelContext';

type LevelDisplayProps = {
  avatarSrc?: string;
  variant?: 'floating' | 'inline';
};

const LEVEL_COLORS: Record<number, string> = {
  1: 'from-blue-500 to-cyan-400',
  2: 'from-purple-600 to-indigo-500',
  3: 'from-indigo-700 to-violet-500',
  4: 'from-yellow-400 to-orange-400',
  5: 'from-red-500 to-pink-500',
};

const LevelDisplay: React.FC<LevelDisplayProps> = ({ avatarSrc, variant = 'floating' }) => {
  const { level, currentXP, xpToNext, showLevelUpToast, clearLevelUpToast } = useLevel();

  const gradient = LEVEL_COLORS[level] || 'from-gray-500 to-gray-400';
  const currentRequirement = LEVEL_REQUIREMENTS[Math.max(0, level - 1)] ?? 0;
  const nextRequirement = LEVEL_REQUIREMENTS[level] ?? currentRequirement;
  const progressPercent =
    nextRequirement === currentRequirement ? 100 : Math.min(100, Math.round(((currentXP - currentRequirement) / (nextRequirement - currentRequirement)) * 100));

  useEffect(() => {
    if (!showLevelUpToast) return;
    const t = setTimeout(() => clearLevelUpToast(), 5000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLevelUpToast]);

  // Inline variant (header) - colorful card
  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-3 px-3 py-2 rounded-xl shadow-lg text-white bg-gradient-to-r ${gradient} border border-white/10`}>
        {/* Avatar / badge */}
        <div className="relative w-12 h-12 rounded-full ring-2 ring-white/25 overflow-hidden flex-shrink-0">
          {avatarSrc ? (
            <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">⭐</div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-white text-xs text-gray-800 font-bold rounded-full px-2 py-0.5 shadow-sm border border-white">
            {level}
          </div>
        </div>

        {/* Level info */}
        <div className="flex flex-col items-start">
          <div className="text-sm font-semibold">Nível {level}</div>
          <div className="text-xs opacity-90">XP: {currentXP}{xpToNext !== null ? ` • ${xpToNext} para o próximo` : ''}</div>

          {/* Progress bar with border */}
          <div className="mt-2 w-40">
            <div className="p-0.5 rounded-lg bg-white/20"> {/* outer border-like container */}
              <div className="bg-white/10 rounded-lg overflow-hidden">
                <div
                  className="h-2 rounded-lg transition-all"
                  style={{
                    width: `${progressPercent}%`,
                    background: 'rgba(255,255,255,0.95)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Floating variant (keeps previous behavior) but more colorful card
  return (
    <>
      <div className={`fixed top-4 right-4 z-50 p-3 rounded-xl text-white shadow-2xl flex items-center gap-3 bg-gradient-to-r ${gradient} border border-white/20`}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-xl font-bold overflow-hidden">
          {avatarSrc ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" /> : '⭐'}
        </div>
        <div>
          <div className="text-sm font-semibold">Nível {level}</div>
          <div className="text-xs opacity-90">XP: {currentXP}{xpToNext !== null ? ` • ${xpToNext} para o próximo` : ''}</div>
          <div className="w-44 mt-2 p-0.5 rounded-lg bg-white/20">
            <div className="bg-white/10 rounded-lg overflow-hidden">
              <div
                className="h-2 rounded-lg transition-all"
                style={{
                  width: `${progressPercent}%`,
                  background: 'rgba(255,255,255,0.95)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {showLevelUpToast && (
        <div className="fixed top-20 right-4 z-60 bg-white rounded-xl p-4 flex items-center gap-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-yellow-300">✨</div>
          <div>
            <div className="font-bold text-gray-800">Parabéns!</div>
            <div className="text-sm text-gray-600">Você atingiu o Nível {level}!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default LevelDisplay;