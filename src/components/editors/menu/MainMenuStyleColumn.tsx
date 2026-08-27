import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { Palette, Layout } from 'lucide-react';

export const MainMenuStyleColumn: React.FC = () => {
  const { state, updateMainMenu } = useStoreAppearance();
  const { mainMenu } = state;

  const [activeSection, setActiveSection] = useState<'colors' | 'layout'>('colors');

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
          onClick={() => setActiveSection('layout')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeSection === 'layout'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          Układ
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* COLORS */}
        {activeSection === 'colors' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Tło & Tekst Menu
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor tła paska menu</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={mainMenu.backgroundColor || '#ffffff'}
                    onChange={(e) => updateMainMenu({ backgroundColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={mainMenu.backgroundColor || '#ffffff'}
                    onChange={(e) => updateMainMenu({ backgroundColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor tekstu linków</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={mainMenu.textColor || '#1e293b'}
                    onChange={(e) => updateMainMenu({ textColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={mainMenu.textColor || '#1e293b'}
                    onChange={(e) => updateMainMenu({ textColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Kolor po najechaniu (Hover)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={mainMenu.hoverColor || '#2563eb'}
                    onChange={(e) => updateMainMenu({ hoverColor: e.target.value })}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={mainMenu.hoverColor || '#2563eb'}
                    onChange={(e) => updateMainMenu({ hoverColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LAYOUT */}
        {activeSection === 'layout' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Odstępy i Styl Linków
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Styl linków</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-lg">
                  {(['default', 'pill', 'underline'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateMainMenu({ linkStyle: s })}
                      className={`py-1.5 text-xs font-semibold rounded capitalize ${
                        mainMenu.linkStyle === s ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Odstępy między elementami</label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-lg">
                  {(['compact', 'normal', 'relaxed'] as const).map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => updateMainMenu({ spacing: sp })}
                      className={`py-1.5 text-xs font-semibold rounded capitalize ${
                        mainMenu.spacing === sp ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
