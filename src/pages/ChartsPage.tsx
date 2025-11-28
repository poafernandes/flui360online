import React, { useEffect, useState } from 'react';
import { HabitStorageService, StoredHabit } from '../services/HabitStorageService';


function Walking() {
  return <span role="img" aria-label="Caminhada">🚶‍♂️</span>;
}
function Water() {
  return <span role="img" aria-label="Hidratação">💧</span>;
}
function Running() {
  return <span role="img" aria-label="Exercício">🏃‍♂️</span>;
}
function Bed() {
  return <span role="img" aria-label="Sono">🛏️</span>;
}

const iconMap: Record<string, React.ReactNode> = {
  Caminhada: <Walking />,
  Hidratação: <Water />,
  Exercício: <Running />,
  Sono: <Bed />,
};

const goals: Record<string, number> = {
  Caminhada: 5,
  Hidratação: 2000,
  Exercício: 1,
  Sono: 8,
};

const units: Record<string, string> = {
  Caminhada: 'km',
  Hidratação: 'ml',
  Exercício: 'hora',
  Sono: 'horas',
};

const ChartsPage: React.FC = () => {
  const [habits, setHabits] = useState<StoredHabit[]>([]);

  useEffect(() => {
    setHabits(HabitStorageService.getHabits());
    const handler = () => setHabits(HabitStorageService.getHabits());
    window.addEventListener('habitsUpdated', handler);
    return () => window.removeEventListener('habitsUpdated', handler);
  }, []);

  return (
    <div className="px-6 mt-4 pb-24 min-h-screen w-full">
      <div className="mb-6">
        <h2 className="font-['Inter:Bold',sans-serif] text-[20px] text-gray-800">Gráficos de Progresso</h2>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
        {/* Resumo de Progresso */}
        <div className="bg-white rounded-lg p-6 shadow-lg w-full">
          <h3 className="font-['Inter:Medium',sans-serif] text-[14px] text-gray-800 mb-3">Resumo de Hoje</h3>
          <div className="space-y-3">
            {habits.map((habit) => (
              <div className="flex items-center justify-between" key={habit.name}>
                <div className="flex items-center gap-2">
                  {iconMap[habit.iconName || habit.name] || <span role="img" aria-label="Hábito">🌟</span>}
                  <span className="font-['Inter:Regular',sans-serif] text-[12px]">{habit.name}</span>
                </div>
                <span className="font-['Inter:Bold',sans-serif] text-[12px] text-gray-800">
                  {habit.trackingType === 'time'
                    ? `${habit.initialValue} ${habit.unitLabel}`
                    : `${habit.initialValue.toFixed(2)} ${habit.unitLabel}`}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Status das Metas */}
        <div className="bg-white rounded-lg p-6 shadow-lg w-full">
          <h3 className="font-['Inter:Medium',sans-serif] text-[14px] text-gray-800 mb-3">Status das Metas</h3>
          <div className="space-y-2">
            {habits.map((habit) => {
              const goal = goals[habit.iconName || habit.name] || habit.targetValue;
              const progress = Math.min((habit.initialValue / goal) * 100, 100);
              return (
                <div key={habit.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-['Inter:Regular',sans-serif] text-[11px] text-gray-600">{habit.name}</span>
                    <span className="font-['Inter:Medium',sans-serif] text-[11px] text-gray-800">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all bg-cyan-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
