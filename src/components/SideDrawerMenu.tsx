import React from 'react';


type RouteKey = 'dashboard' | 'charts' | 'recommendations';
interface SideDrawerMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (route: RouteKey) => void;
  activeRoute: RouteKey;
}

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <span className="text-xl">🏠</span> },
  { key: 'charts', label: 'Estatísticas', icon: <span className="text-xl">📊</span> },
  { key: 'recommendations', label: 'Recomendações', icon: <span className="text-xl">💡</span> },
];

const SideDrawerMenu: React.FC<SideDrawerMenuProps> = ({ open, onClose, onNavigate, activeRoute }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <nav
        className={`fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Menu lateral"
      >
        <div className="flex flex-col h-full p-6 gap-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-bold text-cyan-600">Flui360</span>
          </div>
          <ul className="flex flex-col gap-4 flex-1">
            {menuItems.map(item => (
              <li key={item.key}>
                <button
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-colors min-h-[48px] min-w-[48px] ${activeRoute === item.key ? 'bg-cyan-100 text-cyan-700 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                  style={{ minHeight: 48 }}
                  onClick={() => { onNavigate(item.key as RouteKey); onClose(); }}
                >
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-auto text-gray-400 hover:text-gray-700 text-sm flex items-center justify-center rounded min-h-[48px] min-w-[48px] px-4"
            style={{ minHeight: 48 }}
            onClick={onClose}
            aria-label="Fechar menu lateral"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Fechar menu
          </button>
        </div>
      </nav>
    </>
  );
};

export default SideDrawerMenu;
