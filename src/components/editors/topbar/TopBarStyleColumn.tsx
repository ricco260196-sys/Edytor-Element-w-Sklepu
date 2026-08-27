import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  Palette,
  Layout,
  Layers,
  Sparkles,
  Sliders,
  Type,
  Square,
  Maximize2
} from 'lucide-react';

export const TopBarStyleColumn: React.FC = () => {
  const { state, updateTopBar, triggerToast } = useStoreAppearance();
  const { topBar } = state;

  const [activeSection, setActiveSection] = useState<'layout' | 'colors' | 'borders' | 'typography'>('colors');

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-200 select-none">
      {/* Tab Switcher */}
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
          onClick={() => setActiveSection('layout')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'layout'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          Wymiary
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('borders')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'borders'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Square className="w-3.5 h-3.5" />
          Ramki
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Toggle Paska */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Aktywacja Paska Górnego</div>
            <div className="text-[11px] text-slate-400">Włącz lub wyłącz renderowanie paska</div>
          </div>
          <button
            type="button"
            onClick={() => updateTopBar({ enabled: !topBar.enabled })}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              topBar.enabled ? 'bg-purple-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                topBar.enabled ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* COLORS & BACKGROUND */}
        {activeSection === 'colors' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Tło & Gradient
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor tła podstawowy</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={topBar.backgroundColor || '#0f172a'}
                    onChange={(e) => updateTopBar({ backgroundColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={topBar.backgroundColor || '#0f172a'}
                    onChange={(e) => updateTopBar({ backgroundColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor tekstu domyślny</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={topBar.textColor || '#ffffff'}
                    onChange={(e) => updateTopBar({ textColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={topBar.textColor || '#ffffff'}
                    onChange={(e) => updateTopBar({ textColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-300">Tło Gradientowe</span>
                  <input
                    type="checkbox"
                    checked={topBar.gradientBackground || false}
                    onChange={(e) => updateTopBar({ gradientBackground: e.target.checked })}
                    className="rounded bg-slate-800 border-slate-700 text-purple-600"
                  />
                </div>

                {topBar.gradientBackground && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Od</label>
                      <input
                        type="color"
                        value={topBar.gradientFrom || '#0f172a'}
                        onChange={(e) => updateTopBar({ gradientFrom: e.target.value })}
                        className="w-full h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Do</label>
                      <input
                        type="color"
                        value={topBar.gradientTo || '#1e293b'}
                        onChange={(e) => updateTopBar({ gradientTo: e.target.value })}
                        className="w-full h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT & SIZING */}
        {activeSection === 'layout' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Wysokość & Padding
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Wariant wysokości</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-lg">
                  {(['compact', 'normal', 'relaxed'] as const).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => updateTopBar({ height: h })}
                      className={`py-1.5 text-xs font-semibold rounded capitalize ${
                        topBar.height === h ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Szerokość kontenera (%): <span className="text-white font-mono">{topBar.containerWidth || 100}%</span>
                </label>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={topBar.containerWidth || 100}
                  onChange={(e) => updateTopBar({ containerWidth: Number(e.target.value) })}
                  className="w-full h-1 bg-slate-700 rounded appearance-none accent-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Padding pionowy (px)</label>
                  <input
                    type="number"
                    value={topBar.paddingY ?? 4}
                    onChange={(e) => updateTopBar({ paddingY: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Padding poziomy (px)</label>
                  <input
                    type="number"
                    value={topBar.paddingX ?? 16}
                    onChange={(e) => updateTopBar({ paddingX: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BORDERS & SHADOWS */}
        {activeSection === 'borders' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Dolna Krawędź (Border)
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Włącz dolną ramkę</span>
                <input
                  type="checkbox"
                  checked={topBar.borderBottom || false}
                  onChange={(e) => updateTopBar({ borderBottom: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-purple-600"
                />
              </div>

              {topBar.borderBottom && (
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Grubość (px)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={topBar.borderBottomWidth || 1}
                        onChange={(e) => updateTopBar({ borderBottomWidth: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Kolor ramki</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={topBar.borderBottomColor || '#1e293b'}
                          onChange={(e) => updateTopBar({ borderBottomColor: e.target.value })}
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-slate-400">
                          {topBar.borderBottomColor || '#1e293b'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
