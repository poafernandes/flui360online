
import React from 'react';

type NavigationTab = 'habits' | 'charts';

interface NavigationMenuProps {
	activeTab: NavigationTab;
	onTabChange: (tab: NavigationTab) => void;
}

const Activity = (props: any) => <span {...props}>🏃‍♂️</span>;
const BarChart3 = (props: any) => <span {...props}>📊</span>;

const NavigationMenu: React.FC<NavigationMenuProps> = ({ activeTab, onTabChange }) => {
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
			<div className="flex items-center justify-around px-6 py-3 max-w-md mx-auto">
				<button
					onClick={() => onTabChange('habits')}
					className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
						activeTab === 'habits' ? 'text-cyan-600' : 'text-gray-500'
					}`}
				>
					<Activity className={`size-6 ${activeTab === 'habits' ? 'stroke-[2.5]' : 'stroke-2'}`} />
					<span className="font-['Inter:Medium',sans-serif] text-[10px]">Hábitos</span>
				</button>

				<button
					onClick={() => onTabChange('charts')}
					className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
						activeTab === 'charts' ? 'text-cyan-600' : 'text-gray-500'
					}`}
				>
					<BarChart3 className={`size-6 ${activeTab === 'charts' ? 'stroke-[2.5]' : 'stroke-2'}`} />
					<span className="font-['Inter:Medium',sans-serif] text-[10px]">Gráficos</span>
				</button>
			</div>
		</div>
	);
};

export default NavigationMenu;
