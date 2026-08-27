import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { DeviceViewport } from '../shared/EditorLayout3Col';
import { StoreSearchBar } from '../../common/StoreSearchBar';
import { StoreHeader } from '../../storefront/StoreHeader';
import { Sparkles, RefreshCw } from 'lucide-react';

interface SearchBarInteractiveCanvasProps {
  deviceViewport: DeviceViewport;
  zoomLevel: number;
  viewMode: 'element' | 'full_header';
}

export const SearchBarInteractiveCanvas: React.FC<SearchBarInteractiveCanvasProps> = ({
  deviceViewport,
  zoomLevel,
  viewMode
}) => {
  const [previewState, setPreviewState] = useState<'normal' | 'focus' | 'results' | 'empty' | 'loading'>('normal');
  const [simulatedQuery, setSimulatedQuery] = useState('');

  const containerWidthClass =
    deviceViewport === 'mobile'
      ? 'w-[420px]'
      : deviceViewport === 'tablet'
      ? 'w-[768px]'
      : 'w-full max-w-4xl';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto relative bg-slate-950/60 custom-scrollbar">
      {/* State simulation bar */}
      <div className="mb-4 bg-slate-900 border border-slate-800 p-1.5 rounded-xl flex items-center gap-1.5 z-20 text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Stan Podglądu:</span>
        <button
          type="button"
          onClick={() => {
            setPreviewState('normal');
            setSimulatedQuery('');
          }}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            previewState === 'normal' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Spoczynek (Domyślny)
        </button>
        <button
          type="button"
          onClick={() => {
            setPreviewState('focus');
            setSimulatedQuery('');
          }}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            previewState === 'focus' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Fokus (Podpowiedzi)
        </button>
        <button
          type="button"
          onClick={() => {
            setPreviewState('results');
            setSimulatedQuery('słuchawki');
          }}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            previewState === 'results' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Wyniki z bazy
        </button>
        <button
          type="button"
          onClick={() => {
            setPreviewState('loading');
            setSimulatedQuery('smart');
          }}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            previewState === 'loading' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Skeleton Ładowania
        </button>
        <button
          type="button"
          onClick={() => {
            setPreviewState('empty');
            setSimulatedQuery('xyz123nieznane');
          }}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            previewState === 'empty' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Brak Wyników
        </button>
      </div>

      <div
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out'
        }}
        className={`${containerWidthClass} transition-all duration-200`}
      >
        {/* Device Frame Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-t-xl px-4 py-2 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[11px] text-slate-400">
              Podgląd Na Żywo: {deviceViewport.toUpperCase()}
            </span>
          </div>

          <span className="text-[10px] text-slate-500 font-mono">
            {viewMode === 'full_header' ? 'Cały nagłówek' : 'Tylko Wyszukiwarka'}
          </span>
        </div>

        {/* Live Canvas Area */}
        <div className="bg-white border-x border-b border-slate-800 rounded-b-xl shadow-2xl overflow-visible p-8 min-h-[300px] flex items-start justify-center">
          {viewMode === 'full_header' ? (
            <div className="w-full">
              <StoreHeader />
            </div>
          ) : (
            <div className="w-full max-w-xl">
              <StoreSearchBar
                forcedState={previewState}
                forcedQuery={simulatedQuery}
                isCanvasSimulated={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
