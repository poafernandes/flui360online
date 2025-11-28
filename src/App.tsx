import { useState, useEffect } from 'react';
import { HabitStorageService, StoredHabit } from './services/HabitStorageService';

import Header from './components/Header';
import SideDrawerMenu from './components/SideDrawerMenu';


import HabitsPage from './pages/HabitsPage';
import ChartsPage from './pages/ChartsPage';
import SettingsPage from './pages/SettingsPage';
import RecommendationsPage from './pages/RecommendationsPage';

import svgPaths from "./imports/svg-a6cdtbew9j";

type HabitType = 'walking' | 'water' | 'exercise' | 'sleep';
type NavigationTab = 'habits' | 'charts';

interface HabitState {
  isRunning: boolean;
  elapsedTime: number; // em segundos
  progress: number; // progresso em relação à meta
  status: 'idle' | 'completed' | 'exceeded' | 'failed';
  startTime: number | null;
  liters?: number; // para hidratação
  distance?: number; // para caminhada com geolocation
}

function MapMarkerAlt() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="map-marker-alt">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_223)" id="map-marker-alt">
          <path d={svgPaths.p208c0580} fill="var(--fill-0, #FBBF24)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_223">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2({ location }: { location: string | null }) {
  return (
    <div className="absolute content-center flex flex-wrap gap-[8px] items-center justify-end left-[24px] top-[162px] w-[354px]">
      <MapMarkerAlt />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[14px] text-gray-800 w-[330px]">
        {location || 'Rua Abc, 123 - Bairro'}
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-gray-800 w-[330px]">Você está aqui</p>
    </div>
  );
}

function TitleAndLocal({ location }: { location: string | null }) {
  return (
    <div className="absolute contents left-[24px] top-[136px]" data-name="Title and Local">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[24px] not-italic text-[20px] text-gray-800 text-nowrap top-[136px] whitespace-pre">Flui360</p>
      <Frame2 location={location} />
    </div>
  );
}


const defaultHabits: StoredHabit[] = [
  {
    name: 'Caminhada',
    trackingType: 'numerical',
    targetValue: 5,
    unitLabel: 'km',
    initialValue: 0,
    iconName: 'Caminhada',
  },
  {
    name: 'Hidratação',
    trackingType: 'numerical',
    targetValue: 2000,
    unitLabel: 'ml',
    initialValue: 0,
    iconName: 'Hidratação',
  },
  {
    name: 'Exercício',
    trackingType: 'time',
    targetValue: 1,
    unitLabel: 'hora',
    initialValue: 0,
    iconName: 'Exercício',
  },
  {
    name: 'Sono',
    trackingType: 'time',
    targetValue: 8,
    unitLabel: 'horas',
    initialValue: 0,
    iconName: 'Sono',
  },
];

// Ensure default habits are initialized synchronously before any render
HabitStorageService.initDefaultHabitsIfEmpty(defaultHabits);

export default function App() {
  const [habits, setHabits] = useState<Record<HabitType, HabitState>>({
    walking: { isRunning: false, elapsedTime: 0, progress: 0, status: 'idle', startTime: null, distance: 0 },
    water: { isRunning: false, elapsedTime: 0, progress: 0, status: 'idle', startTime: null, liters: 0 },
    exercise: { isRunning: false, elapsedTime: 0, progress: 0, status: 'idle', startTime: null },
    sleep: { isRunning: false, elapsedTime: 0, progress: 0, status: 'idle', startTime: null },
  });

  const [lastPosition, setLastPosition] = useState<GeolocationPosition | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | null>(null);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Função para obter mensagem de erro específica
  const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Permissão de localização negada. Por favor, permita o acesso à localização nas configurações do navegador.';
      case error.POSITION_UNAVAILABLE:
        return 'Localização indisponível. Verifique se o GPS está ativado no dispositivo.';
      case error.TIMEOUT:
        return 'Tempo esgotado ao obter localização. Tente novamente.';
      default:
        return 'Erro desconhecido ao obter localização.';
    }
  };

  const getUserLocation = async () => {
    setLocationError(null);

    if (!('geolocation' in navigator)) {
      const errorMsg = 'Geolocalização não disponível neste navegador';
      setLocationError(errorMsg);
      alert(errorMsg);
      setLocationEnabled(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 20000, // Aumentado para 20 segundos
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      setCoordinates({ lat: latitude, lon: longitude });
      setLocationPermission('granted');
      setLocationError(null);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'HabitTrackerApp/1.0'
            }
          }
        );
        const data = await response.json();

        if (data.address) {
          const { road, suburb, city, state, town, village } = data.address;
          const locationString = `${road || suburb || town || village || 'Localização'}, ${city || state || ''}`;
          setCurrentLocation(locationString);
        } else {
          setCurrentLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        }
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
        setCurrentLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
      }

      setLocationEnabled(true);
    } catch (error: any) {
      console.error('Erro ao obter localização:', error);
      let errorMessage = 'Erro desconhecido ao obter localização.';
      
      if (error instanceof GeolocationPositionError) {
        errorMessage = getGeolocationErrorMessage(error);
      } else if (error.code) {
        errorMessage = getGeolocationErrorMessage(error);
      }
      
      setLocationError(errorMessage);
      alert(errorMessage);
      setLocationPermission('denied');
      setLocationEnabled(false);
    }
  };

  // Função para desativar localização
  const disableLocation = () => {
    setLocationEnabled(false);
    setCurrentLocation(null);
    setCoordinates(null);
  };

  // Função para alternar localização
  const handleToggleLocation = () => {
    if (locationEnabled) {
      disableLocation();
    } else {
      getUserLocation();
    }
  };

  // Solicita permissão de localização
  const requestLocationPermission = async () => {
    if (!('geolocation' in navigator)) {
      console.log('Geolocalização não disponível neste navegador');
      return false;
    }

    try {
      // Tenta obter a posição atual, o que automaticamente solicita permissão
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });
      
      setLocationPermission('granted');
      setLastPosition(position);
      return true;
    } catch (error) {
      console.log('Permissão de localização negada ou erro:', error);
      setLocationPermission('denied');
      return false;
    }
  };

  // Função para calcular distância entre duas coordenadas (fórmula de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Geolocation para rastreamento de caminhada
  useEffect(() => {
    if (habits.walking.isRunning && 'geolocation' in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          if (lastPosition) {
            const distance = calculateDistance(
              lastPosition.coords.latitude,
              lastPosition.coords.longitude,
              position.coords.latitude,
              position.coords.longitude
            );

            // Atualiza apenas se a distância for significativa (mais de 5 metros)
            if (distance > 0.005) {
              setHabits(prev => ({
                ...prev,
                walking: {
                  ...prev.walking,
                  distance: (prev.walking.distance || 0) + distance
                }
              }));
            }
          }
          setLastPosition(position);
        },
        (error) => {
          console.error('Erro ao obter localização:', error.message);
          // Fallback: usa cálculo baseado em tempo se geolocalização falhar
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
      setWatchId(id);
    } else if (!habits.walking.isRunning && watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setLastPosition(null);
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [habits.walking.isRunning, lastPosition, watchId]);

  // Atualiza os timers a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setHabits(prev => {
        const updated = { ...prev };
        let hasChanges = false;

        (Object.keys(updated) as HabitType[]).forEach(type => {
          if (updated[type].isRunning && type !== 'water') {
            updated[type] = {
              ...updated[type],
              elapsedTime: updated[type].elapsedTime + 1
            };
            hasChanges = true;

            // Verifica se atingiu ou ultrapassou a meta
            const goals = {
              walking: 5, // 5 km
              water: 3, // 3 litros
              exercise: 3600, // 1 hora em segundos
              sleep: 8 * 3600, // 8 horas em segundos
            };

            // Para caminhada, usa a distância real se disponível
            const currentProgress = type === 'walking' && updated[type].distance !== undefined
              ? updated[type].distance
              : type === 'walking'
              ? (updated[type].elapsedTime / 3600) * 5 // fallback para cálculo de tempo
              : updated[type].elapsedTime;

            if (currentProgress >= goals[type] && updated[type].status === 'idle') {
              updated[type].status = 'completed';
            }

            if (currentProgress > goals[type] * 1.1 && updated[type].status === 'completed') {
              updated[type].status = 'exceeded';
            }
          }
        });

        return hasChanges ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Verifica o status da hidratação sempre que os litros mudam
  useEffect(() => {
    setHabits(prev => {
      const waterLiters = prev.water.liters || 0;
      const goal = 3;
      
      if (waterLiters >= goal && prev.water.status === 'idle') {
        return {
          ...prev,
          water: { ...prev.water, status: 'completed' }
        };
      }
      
      if (waterLiters > goal * 1.1 && prev.water.status === 'completed') {
        return {
          ...prev,
          water: { ...prev.water, status: 'exceeded' }
        };
      }
      
      return prev;
    });
  }, [habits.water.liters]);



  const [drawerOpen, setDrawerOpen] = useState(false);
  type RouteKey = 'dashboard' | 'charts' | 'recommendations';
  const [activeRoute, setActiveRoute] = useState<RouteKey>('dashboard');
  const [showSettings, setShowSettings] = useState(false);

  const handleNavigate = (route: RouteKey) => {
    setActiveRoute(route);
    setShowSettings(false);
  };

  return (
    <div className="bg-neutral-100 relative size-full min-h-screen" data-name="iPhone 16 Pro - 1">
      {/* Header with hamburger icon */}
      <Header
        onConfigClick={() => setShowSettings(true)}
        setDrawerOpen={setDrawerOpen}
      />
      {/* Side Drawer Menu */}
      <SideDrawerMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={handleNavigate}
        activeRoute={activeRoute}
      />
      <div className="flex">
        {showSettings ? (
          <SettingsPage
            locationEnabled={locationEnabled}
            coordinates={coordinates}
            handleToggleLocation={handleToggleLocation}
          />
        ) : (
          <>
            {activeRoute === 'dashboard' && <HabitsPage />}
            {activeRoute === 'charts' && <ChartsPage habits={habits} />}
            {activeRoute === 'recommendations' && <RecommendationsPage />}
          </>
        )}
      </div>
    </div>
  );
}