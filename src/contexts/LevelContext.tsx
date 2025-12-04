import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type LevelContextType = {
  level: number;
  currentXP: number;
  xpToNext: number | null;
  addXP: (amount: number) => void;
  grantXPForHabit: (habitId: string) => boolean;
  dailyCompleted: Record<string, boolean>;
  resetDailyIfNeeded: () => void;
  showLevelUpToast: boolean;
  clearLevelUpToast: () => void;
};

const STORAGE_XP = 'playerXP';
const STORAGE_LEVEL = 'playerLevel';
const STORAGE_DAILY = 'dailyXPRecord';

export const LEVEL_REQUIREMENTS = [0, 100, 300, 600, 1000, 1500]; // cumulative XP thresholds per level (index 0 -> level 1)
export const XP_PER_HABIT_COMPLETION = 50;

const LevelContext = createContext<LevelContextType | undefined>(undefined);

export const LevelProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [currentXP, setCurrentXP] = useState<number>(() => {
    const v = localStorage.getItem(STORAGE_XP);
    return v ? Number(v) : 0;
  });
  const [level, setLevel] = useState<number>(() => {
    const v = localStorage.getItem(STORAGE_LEVEL);
    return v ? Number(v) : 1;
  });
  const [dailyRecord, setDailyRecord] = useState<{ date: string; completed: Record<string, boolean> }>(() => {
    const raw = localStorage.getItem(STORAGE_DAILY);
    if (!raw) return { date: new Date().toISOString().slice(0, 10), completed: {} };
    try {
      return JSON.parse(raw);
    } catch {
      return { date: new Date().toISOString().slice(0, 10), completed: {} };
    }
  });
  const [showLevelUpToast, setShowLevelUpToast] = useState(false);

  // utility: compute level from XP
  const computeLevelFromXP = (xp: number) => {
    // LEVEL_REQUIREMENTS: index 0 -> level 1 (0 xp), index 1 -> level 2 (100 xp), ...
    for (let i = LEVEL_REQUIREMENTS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_REQUIREMENTS[i]) {
        return i + 1;
      }
    }
    return 1;
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_XP, String(currentXP));
  }, [currentXP]);

  useEffect(() => {
    localStorage.setItem(STORAGE_LEVEL, String(level));
  }, [level]);

  useEffect(() => {
    localStorage.setItem(STORAGE_DAILY, JSON.stringify(dailyRecord));
  }, [dailyRecord]);

  // level recalculation when XP changes
  useEffect(() => {
    const newLevel = computeLevelFromXP(currentXP);
    if (newLevel > level) {
      setLevel(newLevel);
      setShowLevelUpToast(true);
      // toast will be cleared by consumer or via clearLevelUpToast
    } else if (newLevel < level) {
      // in case XP decreased for any reason, sync level down
      setLevel(newLevel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentXP]);

  const xpToNext = useMemo(() => {
    const nextIndex = level; // level n has requirement at index n-1, next level requirement index = level
    if (nextIndex >= LEVEL_REQUIREMENTS.length) return null;
    return LEVEL_REQUIREMENTS[nextIndex] - currentXP;
  }, [currentXP, level]);

  const resetDailyIfNeeded = () => {
    const today = new Date().toISOString().slice(0, 10);
    if (dailyRecord.date !== today) {
      setDailyRecord({ date: today, completed: {} });
    }
  };

  // call once on mount/day-change from consumers as needed
  useEffect(() => {
    resetDailyIfNeeded();
    // also set an interval that checks day change at midnight is optional; for simplicity keep simple
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addXP = (amount: number) => {
    if (amount <= 0) return;
    setCurrentXP(prev => prev + amount);
  };

  const grantXPForHabit = (habitId: string) => {
    resetDailyIfNeeded();
    if (dailyRecord.completed[habitId]) {
      return false; // already granted today
    }
    // mark as granted
    setDailyRecord(prev => {
      const next = { ...prev, completed: { ...prev.completed, [habitId]: true } };
      return next;
    });
    addXP(XP_PER_HABIT_COMPLETION);
    return true;
  };

  const clearLevelUpToast = () => setShowLevelUpToast(false);

  return (
    <LevelContext.Provider
      value={{
        level,
        currentXP,
        xpToNext,
        addXP,
        grantXPForHabit,
        dailyCompleted: dailyRecord.completed,
        resetDailyIfNeeded,
        showLevelUpToast,
        clearLevelUpToast,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const ctx = useContext(LevelContext);
  if (!ctx) throw new Error('useLevel must be used within LevelProvider');
  return ctx;
};