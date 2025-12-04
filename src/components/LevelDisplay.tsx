import React, { useEffect } from 'react';
import { useLevel, LEVEL_REQUIREMENTS } from '../contexts/LevelContext';

type LevelDisplayProps = {
  avatarSrc?: string;
  variant?: 'floating' | 'inline';
};

const LEVEL_COLORS: Record<number, string> = {
  1: 'bg-blue-500',
  2: 'bg-purple-500',
  3: 'bg-indigo-600',
  4: 'bg-yellow-500',
  5: 'bg-red-500',
};

const LevelDisplay: React.FC<LevelDisplayProps> = ({ avatarSrc, variant = 'floating' }) => {
  const { level, currentXP, xpToNext, showLevelUpToast, clearLevelUpToast } = useLevel();

  const levelColor = LEVEL_COLORS[level] || 'bg-gray-500';
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

  // Floating variant (original) or inline (header)
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm`}>
          {avatarSrc ? (
            <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className={`${levelColor} w-full h-full flex items-center justify-center text-white font-bold`}>⭐</div>
          )}
        </div>
        <div className="flex flex-col items-center min-w-[96px]">
          <div className="text-sm text-gray-800 font-semibold">Nível {level}</div>
          <div className="w-24 h-1 bg-gray-200 rounded overflow-hidden mt-1">
            <div style={{ width: `${progressPercent}%` }} className={`${levelColor} h-full`} />
          </div>
        </div>
      </div>
    );
  }

  // default floating behavior (keeps previous style) but replace star if avatar provided
  return (
    <>
      <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg text-white shadow-lg flex items-center gap-3 ${levelColor}`}>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-xl font-bold overflow-hidden">
          {avatarSrc ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" /> : '⭐'}
        </div>
        <div>
          <div className="text-sm">Nível {level}</div>
          <div className="text-xs opacity-90">XP: {currentXP}{xpToNext !== null ? ` • ${xpToNext} para o próximo` : ''}</div>
          <div className="w-40 h-2 bg-white/30 rounded mt-2 overflow-hidden">
            <div style={{ width: `${progressPercent}%` }} className="h-full bg-white rounded" />
          </div>
        </div>
      </div>

      {showLevelUpToast && (
        <div className="fixed top-20 right-4 z-60 bg-white shadow-2xl rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">✨</div>
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