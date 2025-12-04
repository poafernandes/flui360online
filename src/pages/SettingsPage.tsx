import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { HabitStorageService, StoredHabit } from '../services/HabitStorageService';


interface SettingsPageProps {
  locationEnabled: boolean;
  coordinates: { lat: number; lon: number } | null;
  handleToggleLocation: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ locationEnabled, coordinates, handleToggleLocation }) => {
  const [habits, setHabits] = useState<StoredHabit[]>([]);

  useEffect(() => {
    setHabits(HabitStorageService.getHabits());
    const handler = () => setHabits(HabitStorageService.getHabits());
    window.addEventListener('habitsUpdated', handler);
    return () => window.removeEventListener('habitsUpdated', handler);
  }, []);

  const handleTargetChange = (name: string, value: number) => {
    const habit = habits.find(h => h.name === name);
    if (habit) {
      const updated = { ...habit, targetValue: value };
      HabitStorageService.updateHabit(updated);
    }
  };

  const handleUnitChange = (name: string, value: string) => {
    const habit = habits.find(h => h.name === name);
    if (habit) {
      const updated = { ...habit, unitLabel: value };
      HabitStorageService.updateHabit(updated);
    }
  };

  return (
    <div className="px-6 pt-2 w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md mx-auto">
        {/* Page Title Container: appears immediately below the fixed header */}
        <div className="mb-6">
          <h2 className="font-['Inter:Bold',sans-serif] text-[20px] text-gray-800">Configurações</h2>
        </div>
        {/* Primary Content */}
        <div className="space-y-4">
          {/* Configurações de Metas */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-['Inter:Medium',sans-serif] text-[14px] text-gray-800 mb-3">Metas Diárias</h3>
            <div className="space-y-3">
              {habits.map((habit, idx) => (
                <div className="flex items-center justify-between py-2 border-b border-gray-100" key={habit.name}>
                  <span className="font-['Inter:Regular',sans-serif] text-[12px] text-gray-600">{habit.name}</span>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={habit.targetValue}
                      min={1}
                      className="w-16 rounded border border-gray-300 px-2 py-1 text-xs focus:ring-2 focus:ring-cyan-200"
                      onChange={e => handleTargetChange(habit.name, Number(e.target.value))}
                    />
                    <input
                      type="text"
                      value={habit.unitLabel}
                      maxLength={16}
                      className="w-16 rounded border border-gray-300 px-2 py-1 text-xs focus:ring-2 focus:ring-cyan-200"
                      onChange={e => handleUnitChange(habit.name, e.target.value)}
                    />
                    {/* delete button (only in settings) */}
                    <button
                      aria-label={`Excluir hábito ${habit.name}`}
                      title={`Excluir ${habit.name}`}
                      onClick={() => {
                        // confirmation toast with action buttons
                        toast.custom((t) => (
                          <div className="bg-white rounded-lg shadow-md p-3 flex flex-col gap-3 w-72">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">!</div>
                              <div>
                                <div className="font-semibold text-gray-800">Confirmar exclusão</div>
                                <div className="text-xs text-gray-600">Deseja excluir o hábito "{habit.name}"? Essa ação não pode ser desfeita.</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                className="px-3 py-1 rounded text-sm bg-gray-100 text-gray-700"
                                onClick={() => toast.dismiss(t.id)}
                              >
                                Cancelar
                              </button>
                              <button
                                className="px-3 py-1 rounded text-sm bg-red-600 text-white"
                                onClick={() => {
                                  HabitStorageService.deleteHabit(habit.name);
                                  // close confirm toast and show feedback
                                  toast.dismiss(t.id);
                                  toast.success('Hábito excluído');
                                }}
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        ), { duration: Infinity });
                      }}
                      className="ml-1 inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white shadow-sm hover:opacity-90"
                    >
                      −
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
    {/* Notificações */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-['Inter:Medium',sans-serif] text-[14px] text-gray-800 mb-3">Notificações</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-['Inter:Regular',sans-serif] text-[12px] text-gray-600">Lembretes diários</span>
                <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter:Regular',sans-serif] text-[12px] text-gray-600">Alertas de meta</span>
                <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Localização */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-['Inter:Medium',sans-serif] text-[14px] text-gray-800 mb-3">Localização</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-['Inter:Regular',sans-serif] text-[12px] text-gray-600">Ativar localização</span>
                <button 
                  onClick={handleToggleLocation}
                  className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                    locationEnabled ? 'bg-cyan-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    locationEnabled ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>
              {locationEnabled && coordinates && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="font-['Inter:Regular',sans-serif] text-[10px] text-gray-500 mb-1">Coordenadas:</p>
                  <p className="font-['Inter:Medium',sans-serif] text-[11px] text-gray-800">
                    Lat: {coordinates.lat.toFixed(6)}
                  </p>
                  <p className="font-['Inter:Medium',sans-serif] text-[11px] text-gray-800">
                    Lon: {coordinates.lon.toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Sobre */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-['Inter:Medium',sans-serif] text-[14px] text-gray-800 mb-2">Sobre</h3>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-gray-600 leading-relaxed">
              Aplicativo de Registro de Hábitos v1.0
            </p>
            <p className="font-['Inter:Regular',sans-serif] text-[11px] text-gray-600 mt-2">
              Acompanhe seus hábitos diários e alcance suas metas de saúde.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
