import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  Palette,
  Type,
  Maximize2,
  Sliders,
  Sparkles
} from 'lucide-react';

export const LogoStyleColumn: React.FC = () => {
  const { state, updateLogo } = useStoreAppearance();
  const { logo } = state;

  const [activeSection, setActiveSection] = useState<'colors' | 'dimensions' | 'typography'>('colors');

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-200 select-none">
      {/* Switcher */}
      <div className="flex items-center justify-between px-2 py-2 bg-slate-950 border-b border-slate-800 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSection('colors')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'colors'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          Kolory
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('typography')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'typography'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Typografia
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
          Wymiary
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* COLORS */}
        {activeSection === 'colors' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Kolorystyka Logo
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor akcentu / sygnetu</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={logo.accentColor || '#2563eb'}
                    onChange={(e) => updateLogo({ accentColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={logo.accentColor || '#2563eb'}
                    onChange={(e) => updateLogo({ accentColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor tekstu głównego</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={logo.textColor || '#0f172a'}
                    onChange={(e) => updateLogo({ textColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={logo.textColor || '#0f172a'}
                    onChange={(e) => updateLogo({ textColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TYPOGRAPHY */}
        {activeSection === 'typography' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Krój Pisma & Waga
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Rodzina czcionki</label>
                <select
                  value={logo.textFont || 'sans'}
                  onChange={(e) => updateLogo({ textFont: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                >
                  <option value="sans">Nowoczesny Bezszeryfowy (Sans)</option>
                  <option value="display">Wyrazisty Display (Black)</option>
                  <option value="serif">Elegancki Szeryfowy (Serif)</option>
                  <option value="mono">Techniczny (Monospace)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Grubość tekstu</label>
                <select
                  value={logo.textWeight || 'bold'}
                  onChange={(e) => updateLogo({ textWeight: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                >
                  <option value="normal">Normal (400)</option>
                  <option value="medium">Medium (500)</option>
                  <option value="semibold">Semibold (600)</option>
                  <option value="bold">Bold (700)</option>
                  <option value="extrabold">Extra Bold (800)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* DIMENSIONS */}
        {activeSection === 'dimensions' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Wysokość & Skalowanie
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Wysokość Desktop (px): <span className="text-white font-mono">{logo.desktopHeight || 36}px</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={logo.desktopHeight || 36}
                  onChange={(e) => updateLogo({ desktopHeight: Number(e.target.value) })}
                  className="w-full h-1 bg-slate-700 rounded appearance-none accent-purple-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Maksymalna szerokość (px): <span className="text-white font-mono">{logo.maxWidth || 260}px</span>
                </label>
                <input
                  type="range"
                  min="120"
                  max="400"
                  value={logo.maxWidth || 260}
                  onChange={(e) => updateLogo({ maxWidth: Number(e.target.value) })}
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
