import React from 'react';

interface AddHabitButtonProps {
  onClick: () => void;
}

const AddHabitButton: React.FC<AddHabitButtonProps> = ({ onClick }) => {
  return (
    <button
      aria-label="Adicionar novo hábito"
      title="Adicionar hábito"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-cyan-600 text-white shadow-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );
};

export default AddHabitButton;
