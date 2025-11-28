
import React, { useState } from 'react';
import { HabitStorageService, StoredHabit } from '../services/HabitStorageService';

interface HabitCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    trackingType: 'time' | 'numerical';
    goalValue: number;
    unit: string;
  }) => void;
}

const HabitCreationModal: React.FC<HabitCreationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [trackingType, setTrackingType] = useState<'time' | 'numerical'>('time');
  const [goalValue, setGoalValue] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !goalValue || !unit.trim()) {
      setError('Preencha todos os campos.');
      return;
    }
    setError('');

    onSubmit({
      name: name.trim(),
      trackingType,
      goalValue: Number(goalValue),
      unit: unit.trim(),
    });
    setName('');
    setGoalValue('');
    setUnit('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 relative animate-fade-in">
        <button
          aria-label="Fechar modal"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 rounded-full p-1 focus:outline-none"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Novo Hábito</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-200"
              placeholder="Ex: Meditação"
              maxLength={32}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Tipo de acompanhamento</label>
            <select
              value={trackingType}
              onChange={e => setTrackingType(e.target.value as 'time' | 'numerical')}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-200"
            >
              <option value="time">Tempo</option>
              <option value="numerical">Numérico</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Meta</label>
            <input
              type="number"
              value={goalValue}
              onChange={e => setGoalValue(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-200"
              placeholder="Ex: 30"
              min={1}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Unidade</label>
            <input
              type="text"
              value={unit}
              onChange={e => setUnit(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-cyan-200"
              placeholder="Ex: minutos, km, ml"
              maxLength={16}
              required
            />
          </div>
          {error && <div className="text-xs text-red-600 text-center">{error}</div>}
          <button
            type="submit"
            className="mt-2 w-full bg-cyan-600 text-white rounded-lg py-2 font-semibold hover:bg-cyan-700 transition-all"
          >
            Salvar Hábito
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitCreationModal;
