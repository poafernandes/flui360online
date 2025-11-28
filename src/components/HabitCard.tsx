
import React, { useState, useRef, useEffect } from 'react';

export type TrackingType = 'time' | 'numerical';

export interface Habit {
	name: string;
	icon: React.ReactNode;
	trackingType: TrackingType;
	targetValue: number;
	unitLabel: string;
	initialValue: number;
}


interface TrackingCardProps {
	habit: Habit;
	onHabitUpdate?: (updated: any) => void;
}


const TrackingCard: React.FC<TrackingCardProps> = ({ habit, onHabitUpdate }) => {
	const { name, icon, trackingType, targetValue, unitLabel, initialValue } = habit;
	const [isRunning, setIsRunning] = useState(false);
	const [timer, setTimer] = useState(initialValue); 
	const [inputValue, setInputValue] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [showError, setShowError] = useState(false);
	const [shake, setShake] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (trackingType === 'time' && isRunning) {
			intervalRef.current = setInterval(() => {
				setTimer((prev) => prev + 1);
			}, 1000);
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isRunning, trackingType]);

		const formatTime = (seconds: number) => {
			const hours = seconds / 3600;
			return `${hours.toFixed(1)} h`;
		};


	const handleAdd = () => {
		const addValue = parseFloat(inputValue);
		if (!isNaN(addValue) && addValue > 0) {
			const newTimer = timer + addValue;
			setTimer(newTimer);
			setInputValue('');
			setShowToast(true);
			setShowError(false);
			setTimeout(() => setShowToast(false), 1800);
			if (onHabitUpdate) {
				onHabitUpdate({ ...habit, initialValue: newTimer });
			}
		} else {
			setShowError(true);
			setShake(true);
			setTimeout(() => setShake(false), 500);
		}
	};

		return (
			<div className="bg-purple-100 box-border flex flex-col justify-between gap-4 h-full items-stretch p-5 rounded-2xl shadow-lg transition-colors duration-300 w-full min-w-[140px] max-w-full" data-name="TrackingCard">
				<div className="flex items-center gap-3 mb-2">
					<span className="text-2xl">{icon}</span>
					<p className="font-['Inter:Bold',sans-serif] font-bold text-[15px] text-gray-800 whitespace-pre">{name}</p>
				</div>
				<div className="flex items-center justify-between mb-2">
					<span className="font-['Inter:Light',sans-serif] text-[13px] text-gray-600">Meta:</span>
					<span className="bg-amber-400 px-3 py-1 rounded-full font-['Inter:Medium',sans-serif] text-[12px] text-gray-800">{targetValue} {unitLabel}</span>
				</div>
					<div className="flex items-center justify-end mb-3 gap-2">
						{trackingType === 'time' ? (
							<>
								<span className="font-['Inter:Light',sans-serif] text-[15px] text-gray-800">{formatTime(timer)}</span>
								{isRunning && (
									<span className="ml-2 inline-block align-middle">
										<span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Contando"></span>
									</span>
								)}
							</>
						) : (
							<span className="font-['Inter:Light',sans-serif] text-[15px] text-gray-800">{timer.toFixed(2)} {unitLabel}</span>
						)}
					</div>
								{trackingType === 'time' ? (
									<button
										onClick={() => {
											setIsRunning((r) => !r);
											if (!isRunning && onHabitUpdate) {
												// Se parar, salva o valor atual
												onHabitUpdate({ ...habit, initialValue: timer });
											}
										}}
										className={`${isRunning ? 'bg-red-500' : 'bg-cyan-500'} flex items-center justify-center px-4 py-2 rounded-md shadow transition-colors cursor-pointer hover:opacity-80 text-[13px] text-gray-800 font-medium`}
									>
										{isRunning ? 'Parar' : 'Iniciar'}
									</button>
								) : (
							<div className="flex flex-row gap-2 relative">
								<input
									type="number"
									value={inputValue}
									onChange={e => {
										setInputValue(e.target.value);
										if (showError) setShowError(false);
									}}
									className={`flex-1 rounded px-2 py-1 text-xs border ${showError ? 'border-red-500' : 'border-gray-300'} ${shake ? 'animate-shake' : ''}`}
									placeholder={`Adicionar (${unitLabel})`}
									min="0"
									aria-invalid={showError}
								/>
								<button
									onClick={handleAdd}
									className="bg-cyan-500 px-3 py-1 rounded text-xs text-gray-800 hover:opacity-80 font-medium"
								>
									+
								</button>
								{showToast && (
									<div className="absolute left-1/2 -translate-x-1/2 bottom-[-38px] bg-cyan-600 text-white text-xs rounded px-3 py-1 shadow-lg animate-fade-in-out z-10">
										Valor adicionado com sucesso!
									</div>
								)}
								{showError && (
									<div className="absolute left-1/2 -translate-x-1/2 bottom-[-38px] bg-red-600 text-white text-xs rounded px-3 py-1 shadow-lg z-10">
										Por favor, insira um valor positivo válido.
									</div>
								)}
							</div>
						)}

			</div>
	);
};

export default TrackingCard;
