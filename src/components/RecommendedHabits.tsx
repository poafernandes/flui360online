import React from 'react';
import { useState } from 'react';
import { HabitStorageService, StoredHabit } from '../services/HabitStorageService';

const recommendedHabits: StoredHabit[] = [
  {
    name: 'Refeições',
    trackingType: 'numerical',
    targetValue: 4,
    unitLabel: 'unidades',
    initialValue: 4, // already fulfilled
    iconName: 'Refeições',
  },
  {
    name: 'Leitura',
    trackingType: 'numerical',
    targetValue: 10,
    unitLabel: 'livros',
    initialValue: 10, // already fulfilled
    iconName: 'Leitura',
  },
];

interface RecommendedHabitsProps {
  onAddHabit?: (habit: StoredHabit) => void;
}

const RecommendedHabits: React.FC<RecommendedHabitsProps> = ({ onAddHabit }) => {
  const [toast, setToast] = useState<string | null>(null);
  const [added, setAdded] = useState<string | null>(null);
  const [userHabits, setUserHabits] = useState(HabitStorageService.getHabits());

  React.useEffect(() => {
    const handler = () => setUserHabits(HabitStorageService.getHabits());
    window.addEventListener('habitsUpdated', handler);
    return () => window.removeEventListener('habitsUpdated', handler);
  }, []);

  const isHabitAdded = (name: string) => userHabits.some(h => h.name === name);

  const handleAdd = (habit: StoredHabit) => {
    if (onAddHabit) {
      onAddHabit(habit);
    } else {
      HabitStorageService.addHabit(habit);
    }
    setAdded(habit.name);
    setToast(`Hábito "${habit.name}" adicionado!`);
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 relative">
      <h3 className="font-['Inter:Medium',sans-serif] text-[15px] text-gray-800 mb-2">Hábitos Recomendados</h3>
      <div className="flex flex-col gap-3">
        {recommendedHabits.map((habit) => {
          const alreadyAdded = isHabitAdded(habit.name);
          return (
            <div
              key={habit.name}
              className={`flex items-center justify-between bg-cyan-50 rounded-lg px-4 py-3 shadow-sm transition-all ${alreadyAdded ? 'opacity-50' : 'opacity-100'}`}
            >
              <div>
                <span className="font-['Inter:Bold',sans-serif] text-[13px] text-gray-800">{habit.name}</span>
                <span className="ml-2 text-xs text-gray-600">{habit.targetValue} {habit.unitLabel}</span>
              </div>
              <button
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${alreadyAdded ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-cyan-500 text-white hover:bg-cyan-600'}`}
                disabled={alreadyAdded}
                onClick={() => handleAdd(habit)}
              >
                {alreadyAdded ? 'Adicionado' : 'Adicionar'}
              </button>
            </div>
          );
        })}
      </div>
      {toast && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-38px] bg-cyan-600 text-white text-xs rounded px-4 py-2 shadow-lg animate-fade-in-out z-10 opacity-90">
          {toast}
        </div>
      )}
    </div>
  );
};

export default RecommendedHabits;
