import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  Search,
  Sliders,
  Sparkles,
  Layers,
  History,
  TrendingUp,
  Filter,
  Plus,
  Trash2
} from 'lucide-react';

export const SearchBarContentColumn: React.FC = () => {
  const { state, updateSearchBar, triggerToast } = useStoreAppearance();
  const { searchBar } = state;

  const [activeTab, setActiveTab] = useState<'elements' | 'engine' | 'suggestions'>('elements');
  const [newRotatorItem, setNewRotatorItem] = useState('');
  const [newPopularItem, setNewPopularItem] = useState('');

  const { structure, engine, suggestions } = searchBar;

  const handleAddRotatorItem = () => {
    if (!newRotatorItem.trim()) return;
    const items = [...(structure.placeholderRotatorItems || []), newRotatorItem.trim()];
    updateSearchBar({
      structure: {
        ...structure,
        placeholderRotatorItems: items
      }
    });
    setNewRotatorItem('');
    triggerToast('success', 'Dodano placeholder', 'Nowy tekst rotatora został dodany.');
  };

  const handleRemoveRotatorItem = (index: number) => {
    const items = structure.placeholderRotatorItems.filter((_, i) => i !== index);
    updateSearchBar({
      structure: {
        ...structure,
        placeholderRotatorItems: items
      }
    });
  };

  const handleAddPopularItem = () => {
    if (!newPopularItem.trim()) return;
    const items = [...(suggestions.popularSearches || []), newPopularItem.trim()];
    updateSearchBar({
      suggestions: {
        ...suggestions,
        popularSearches: items
      }
    });
    setNewPopularItem('');
    triggerToast('success', 'Dodano popularną frazę', 'Nowa fraza została dodana do podpowiedzi.');
  };

  const handleRemovePopularItem = (index: number) => {
    const items = suggestions.popularSearches.filter((_, i) => i !== index);
    updateSearchBar({
      suggestions: {
        ...suggestions,
        popularSearches: items
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200 select-none">
      {/* Switcher */}
      <div className="flex items-center justify-between px-2 py-2 bg-slate-950 border-b border-slate-800 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('elements')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'elements'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Komponenty
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('engine')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'engine'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Silnik & Tryb
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('suggestions')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'suggestions'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Podpowiedzi
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: ELEMENTS */}
        {activeTab === 'elements' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Elementy Interfejsu Szukajki
              </span>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Filtr Kategorii (Dropdown)</span>
                  <input
                    type="checkbox"
                    checked={structure.showCategoryFilter}
                    onChange={(e) =>
                      updateSearchBar({ structure: { ...structure, showCategoryFilter: e.target.checked } })
                    }
                    className="rounded bg-slate-800 border-slate-700 text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Wyszukiwanie Głosowe (Mikrofon)</span>
                  <input
                    type="checkbox"
                    checked={structure.showVoiceSearch}
                    onChange={(e) =>
                      updateSearchBar({ structure: { ...structure, showVoiceSearch: e.target.checked } })
                    }
                    className="rounded bg-slate-800 border-slate-700 text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Skaner Kodów QR / Kreskowych</span>
                  <input
                    type="checkbox"
                    checked={structure.showQrScanner}
                    onChange={(e) =>
                      updateSearchBar({ structure: { ...structure, showQrScanner: e.target.checked } })
                    }
                    className="rounded bg-slate-800 border-slate-700 text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Przycisk "Szukaj" (Submit)</span>
                  <input
                    type="checkbox"
                    checked={structure.showSubmitButton}
                    onChange={(e) =>
                      updateSearchBar({ structure: { ...structure, showSubmitButton: e.target.checked } })
                    }
                    className="rounded bg-slate-800 border-slate-700 text-blue-600"
                  />
                </label>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Główny tekst zastępczy (Placeholder)</label>
                <input
                  type="text"
                  value={structure.placeholderText || ''}
                  onChange={(e) =>
                    updateSearchBar({ structure: { ...structure, placeholderText: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Rotator Section */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  Rotator Placeholderów
                </span>
                <input
                  type="checkbox"
                  checked={structure.placeholderRotatorEnabled}
                  onChange={(e) =>
                    updateSearchBar({
                      structure: { ...structure, placeholderRotatorEnabled: e.target.checked }
                    })
                  }
                  className="rounded bg-slate-800 border-slate-700 text-blue-600"
                />
              </div>

              {structure.placeholderRotatorEnabled && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRotatorItem}
                      onChange={(e) => setNewRotatorItem(e.target.value)}
                      placeholder="np. Szukaj butów sportowych..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddRotatorItem}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    {structure.placeholderRotatorItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 bg-slate-900 rounded border border-slate-800 text-xs"
                      >
                        <span className="truncate text-slate-300">{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRotatorItem(idx)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ENGINE */}
        {activeTab === 'engine' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Tryb Wyszukiwania & Fuzzy Matching
              </span>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Algorytm wyszukiwania</label>
                <select
                  value={engine.searchMode || 'fuzzy'}
                  onChange={(e) =>
                    updateSearchBar({ engine: { ...engine, searchMode: e.target.value as any } })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white"
                >
                  <option value="fuzzy">Fuzzy Matching (Tolerancja literówek)</option>
                  <option value="prefix">Prefiksowe (Zaczyna się od...)</option>
                  <option value="exact">Dokładne dopasowanie (Exact)</option>
                  <option value="semantic">Semantyczne / AI</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Opóźnienie wpisywania (Debounce ms): <span className="text-white font-mono">{engine.debounceMs}ms</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="25"
                  value={engine.debounceMs || 200}
                  onChange={(e) =>
                    updateSearchBar({ engine: { ...engine, debounceMs: Number(e.target.value) } })
                  }
                  className="w-full h-1 bg-slate-700 rounded appearance-none accent-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Minimalna liczba znaków: <span className="text-white font-mono">{engine.minCharsToTrigger}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={engine.minCharsToTrigger || 2}
                  onChange={(e) =>
                    updateSearchBar({ engine: { ...engine, minCharsToTrigger: Number(e.target.value) } })
                  }
                  className="w-full h-1 bg-slate-700 rounded appearance-none accent-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SUGGESTIONS */}
        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Popularne Frazy & Historia
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Pokaż historię wyszukiwań</span>
                <input
                  type="checkbox"
                  checked={suggestions.showSearchHistory}
                  onChange={(e) =>
                    updateSearchBar({ suggestions: { ...suggestions, showSearchHistory: e.target.checked } })
                  }
                  className="rounded bg-slate-800 border-slate-700 text-blue-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300 block">Popularne Frazy w Podpowiedziach</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPopularItem}
                    onChange={(e) => setNewPopularItem(e.target.value)}
                    placeholder="np. Smartwatch, Słuchawki ANC..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddPopularItem}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {suggestions.popularSearches.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-1.5 bg-slate-900 rounded border border-slate-800 text-xs"
                    >
                      <span className="truncate text-slate-300">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePopularItem(idx)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
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
