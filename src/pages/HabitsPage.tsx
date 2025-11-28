import React, { useState, useEffect } from 'react';
import TrackingCard, { Habit } from '../components/HabitCard';
import { HabitStorageService, StoredHabit } from '../services/HabitStorageService';
import AddHabitButton from '../components/AddHabitButton';
import HabitCreationModal from '../components/HabitCreationModal';

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


const HabitsPage: React.FC = () => {
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [habits, setHabits] = useState<StoredHabit[]>([]);

  useEffect(() => {
    const stored = HabitStorageService.getHabits();
    if (!stored || stored.length === 0) {
      setHabits(HabitStorageService.getHabits());
    } else {
      setHabits(stored);
    }
  }, []);

  useEffect(() => {
    const handler = () => setHabits(HabitStorageService.getHabits());
    window.addEventListener('habitsUpdated', handler);
    return () => window.removeEventListener('habitsUpdated', handler);
  }, []);

  const handleOpenAddHabit = () => setShowAddHabitModal(true);
  const handleCloseAddHabit = () => setShowAddHabitModal(false);

  // Adiciona hábito e atualiza lista
  const handleSubmitHabit = (data: {
    name: string;
    trackingType: 'time' | 'numerical';
    goalValue: number;
    unit: string;
  }) => {
    // Define um ícone padrão baseado no nome, se possível
    const iconName = data.name;
    const newHabit: StoredHabit = {
      name: data.name,
      trackingType: data.trackingType,
      targetValue: data.goalValue,
      unitLabel: data.unit,
      initialValue: 0,
      iconName,
    };
    HabitStorageService.addHabit(newHabit);
    setHabits(HabitStorageService.getHabits());
    setShowAddHabitModal(false);
  };

  // Mapeamento de nome para componente de ícone
  const iconMap: Record<string, React.ReactNode> = {
    Caminhada: <Walking />,
    Hidratação: <Water />,
    Exercício: <Running />,
    Sono: <Bed />,
  };

  // Renderiza o ícone salvo ou um padrão
  const renderHabitIcon = (habit: StoredHabit) => {
    return iconMap[habit.iconName || habit.name] || <span role="img" aria-label="Hábito">🌟</span>;
  };

  // Atualiza hábito no storage
  const handleHabitUpdate = (updated: StoredHabit) => {
    // Remove non-serializable properties (like icon) before saving
    const { icon, ...serializable } = updated as any;
    HabitStorageService.updateHabit(serializable);
    // setHabits(HabitStorageService.getHabits()); // handled by event
  };

  return (
    <div className="px-4 mt-4 pb-24 min-h-screen w-full flex flex-col items-center">
      <div
        className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8"
        data-name="Cards"
      >
        {habits.map((habit, idx) => (
          <TrackingCard
            key={habit.name + idx}
            habit={{
              ...habit,
              icon: renderHabitIcon(habit),
            }}
            onHabitUpdate={handleHabitUpdate}
          />
        ))}
      </div>
      <AddHabitButton onClick={handleOpenAddHabit} />
      <HabitCreationModal
        isOpen={showAddHabitModal}
        onClose={handleCloseAddHabit}
        onSubmit={handleSubmitHabit}
      />
    </div>
  );
};

export default HabitsPage;
