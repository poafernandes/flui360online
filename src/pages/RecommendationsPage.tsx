import React from 'react';
import RecommendedHabits from '../components/RecommendedHabits';

const RecommendationsPage: React.FC = () => {
  return (
    <div className="px-4 mt-4 pb-24 min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-md mx-auto">
        <h2 className="font-['Inter:Bold',sans-serif] text-[20px] text-gray-800 mb-6">Sugestões de Hábitos</h2>
        <RecommendedHabits />
      </div>
    </div>
  );
};

export default RecommendationsPage;
