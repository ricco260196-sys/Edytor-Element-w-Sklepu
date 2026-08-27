import React from 'react';
import { Sparkles, Sliders } from 'lucide-react';

interface ElementorLoadingScreenProps {
  moduleName: string;
}

export const ElementorLoadingScreen: React.FC<ElementorLoadingScreenProps> = ({ moduleName }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#07090E]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 select-none animate-in fade-in duration-200">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30 animate-bounce">
          <Sliders className="w-8 h-8" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <h2 className="text-xl font-black uppercase tracking-tight text-white mb-2">
        Ładowanie Edytora: {moduleName}
      </h2>
      <p className="text-xs text-slate-400 font-mono max-w-sm mb-6">
        Inicjalizacja 3-kolumnowego obszaru roboczego, synchronizacja stref i renderera czasu rzeczywistego...
      </p>

      <div className="w-64 bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-full animate-pulse" />
      </div>
    </div>
  );
};
