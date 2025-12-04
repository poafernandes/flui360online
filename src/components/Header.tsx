import React from 'react';

import imgUser from "../assets/dd51a8681595b8a38866d07abb324a31068eaf98.png";
import svgPaths from "../imports/svg-a6cdtbew9j";
import LevelDisplay from './LevelDisplay';

interface HeaderProps {
    onConfigClick: () => void;
    setDrawerOpen?: (open: boolean) => void;
}


const Header: React.FC<HeaderProps> = ({ onConfigClick, setDrawerOpen }) => {
    return (
        <div className="z-50 w-full flex items-center px-4 py-4 bg-white shadow-sm" data-name="Header">
            {/* Left: Hamburger button */}
            <div className="flex items-center justify-start min-w-[48px]">
                <button
                    aria-label="Abrir menu lateral"
                    title="Menu"
                    onClick={() => setDrawerOpen && setDrawerOpen(true)}
                    className="flex items-center justify-center p-2 bg-white rounded-full shadow-md border border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:opacity-80 transition-all"
                    style={{ minWidth: 48, minHeight: 48 }}
                >
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                        <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor" />
                        <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
                        <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
                    </svg>
                </button>
            </div>

            {/* Center: LevelDisplay (replaces user image placeholder) */}
            <div className="flex-1 flex justify-center">
                <div className="relative shrink-0" data-name="LevelDisplayHeader">
                    {/* inline variant uses avatarSrc to replace the star */}
                    <LevelDisplay variant="inline" avatarSrc={imgUser} />
                </div>
            </div>

            {/* Right: Gear icon */}
            <div className="flex items-center justify-end min-w-[48px]">
                <button
                    aria-label="Abrir configurações do aplicativo"
                    title="Configurações"
                    onClick={onConfigClick}
                    className="flex items-center justify-center p-2 bg-white rounded-full shadow-md border border-cyan-200 text-cyan-600 hover:bg-cyan-50 hover:opacity-80 transition-all"
                    style={{ minWidth: 48, minHeight: 48 }}
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.39 1.26 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c0 .66.39 1.26 1 1.51H21a2 2 0 0 1 0 4h-.09c-.66 0-1.26.39-1.51 1z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Header;
