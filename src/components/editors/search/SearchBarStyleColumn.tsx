import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  Palette,
  Layout,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const SearchBarStyleColumn: React.FC = () => {
  const { state, updateSearchBar } = useStoreAppearance();
  const { searchBar } = state;

  const [activeSection, setActiveSection] = useState<'appearance' | 'dimensions'>('appearance');
  const { appearance, dimensions } = searchBar;

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-200 select-none">
      {/* Switcher */}
      <div className="flex items-center justify-between px-2 py-2 bg-slate-950 border-b border-slate-800 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSection('appearance')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'appearance'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Kolory & Styl
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('dimensions')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'dimensions'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          Wymiary & Kształt
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* APPEARANCE */}
        {activeSection === 'appearance' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Kolorystyka Pola Szukania
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor tła</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={appearance.backgroundColor || '#f8fafc'}
                    onChange={(e) =>
                      updateSearchBar({ appearance: { ...appearance, backgroundColor: e.target.value } })
                    }
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={appearance.backgroundColor || '#f8fafc'}
                    onChange={(e) =>
                      updateSearchBar({ appearance: { ...appearance, backgroundColor: e.target.value } })
                    }
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor ramki (Border)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={appearance.borderColor || '#e2e8f0'}
                    onChange={(e) =>
                      updateSearchBar({ appearance: { ...appearance, borderColor: e.target.value } })
                    }
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={appearance.borderColor || '#e2e8f0'}
                    onChange={(e) =>
                      updateSearchBar({ appearance: { ...appearance, borderColor: e.target.value } })
                    }
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor przycisku Szukaj</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={appearance.buttonBgColor || '#2563eb'}
                    onChange={(e) =>
                      updateSearchBar({ appearance: { ...appearance, buttonBgColor: e.target.value } })
                    }
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={appearance.buttonBgColor || '#2563eb'}
                    onChange={(e) =>
                      updateSearchBar({ appearance: { ...appearance, buttonBgColor: e.target.value } })
                    }
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DIMENSIONS */}
        {activeSection === 'dimensions' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Kształt & Wysokość
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Wysokość paska (px): <span className="text-white font-mono">{dimensions.heightPx}px</span>
                </label>
                <input
                  type="range"
                  min="36"
                  max="60"
                  value={dimensions.heightPx || 44}
                  onChange={(e) =>
                    updateSearchBar({ dimensions: { ...dimensions, heightPx: Number(e.target.value) } })
                  }
                  className="w-full h-1 bg-slate-700 rounded appearance-none accent-purple-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Zaokrąglenie rogów (px): <span className="text-white font-mono">{appearance.borderRadius}px</span>
                </label>
                <input
                  type="range"
                  min="4"
                  max="30"
                  value={appearance.borderRadius || 16}
                  onChange={(e) =>
                    updateSearchBar({ appearance: { ...appearance, borderRadius: Number(e.target.value) } })
                  }
                  className="w-full h-1 bg-slate-700 rounded appearance-none accent-purple-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
