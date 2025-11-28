import { Habit } from '../components/HabitCard';

const STORAGE_KEY = 'habits';

export type StoredHabit = Omit<Habit, 'icon'> & { iconName?: string };

export const HabitStorageService = {
  initDefaultHabitsIfEmpty(defaultHabits: StoredHabit[]) {
    if (HabitStorageService.getHabits().length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHabits));
    }
  },
    
  getHabits(): StoredHabit[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        console.log('[HabitStorageService] getHabits: No data found, returning empty array.');
        return [];
      }
      const habits = JSON.parse(data);
      console.log('[HabitStorageService] getHabits: Loaded habits:', habits);
      return habits;
    } catch (e) {
      console.log('[HabitStorageService] getHabits: Error parsing habits:', e);
      return [];
    }
  },

  addHabit(newHabit: StoredHabit): void {
    const habits = HabitStorageService.getHabits();
    habits.push(newHabit);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    console.log('[HabitStorageService] addHabit: Added new habit:', newHabit);
    console.log('[HabitStorageService] addHabit: All habits after add:', habits);
    window.dispatchEvent(new Event('habitsUpdated'));
  },

  updateHabit(updatedHabit: StoredHabit): void {
    const habits = HabitStorageService.getHabits();
    const idx = habits.findIndex(h => h.name === updatedHabit.name);
    if (idx !== -1) {
      console.log('[HabitStorageService] updateHabit: Before update:', habits);
      habits[idx] = updatedHabit;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
      console.log('[HabitStorageService] updateHabit: Updated habit:', updatedHabit);
      console.log('[HabitStorageService] updateHabit: All habits after update:', habits);
      window.dispatchEvent(new Event('habitsUpdated'));
    } else {
      console.log('[HabitStorageService] updateHabit: Habit not found for update:', updatedHabit);
    }
  },
};
