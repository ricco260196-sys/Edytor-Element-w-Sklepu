import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { MainMenuItem } from '../../../types/storeAppearance';
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  Layers,
  Link,
  Tag,
  Grid,
  Menu
} from 'lucide-react';

interface MainMenuContentColumnProps {
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
}

export const MainMenuContentColumn: React.FC<MainMenuContentColumnProps> = ({
  selectedItemId,
  onSelectItem
}) => {
  const { state, updateMainMenu, triggerToast } = useStoreAppearance();
  const { mainMenu } = state;

  const [activeTab, setActiveTab] = useState<'tree' | 'item' | 'drawer'>('tree');

  const items = mainMenu.items || [];
  const selectedItem = items.find(i => i.id === selectedItemId);

  const handleAddItem = () => {
    const newItem: MainMenuItem = {
      id: `menu-item-${Date.now()}`,
      label: 'Nowy Link',
      url: '/nowy-link',
      type: 'link',
      badge: '',
      badgeColor: '#2563eb',
      isHidden: false
    };

    updateMainMenu({ items: [...items, newItem] });
    onSelectItem(newItem.id);
    setActiveTab('item');
    triggerToast('success', 'Dodano pozycję menu', 'Nowa pozycja została dodana.');
  };

  const handleRemoveItem = (id: string) => {
    updateMainMenu({ items: items.filter(i => i.id !== id) });
    if (selectedItemId === id) onSelectItem(null);
  };

  const handleUpdateItem = (id: string, updates: Partial<MainMenuItem>) => {
    const updated = items.map(i => (i.id === id ? { ...i, ...updates } : i));
    updateMainMenu({ items: updated });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200 select-none">
      {/* Switcher */}
      <div className="flex items-center justify-between px-2 py-2 bg-slate-950 border-b border-slate-800 gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('tree')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'tree'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Menu className="w-3.5 h-3.5" />
          Drzewo Menu ({items.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('item')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'item'
              ? 'bg-blue-600 text-white shadow-sm'
              : selectedItemId
              ? 'text-blue-400 hover:text-blue-300 hover:bg-slate-800'
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          Pozycja {selectedItemId ? '●' : ''}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('drawer')}
          className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
            activeTab === 'drawer'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          Przycisk Kategorii
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: TREE */}
        {activeTab === 'tree' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pozycje Menu Głównego</h3>
                <p className="text-[11px] text-slate-400">Zarządzaj linkami, rozwijanymi listami i Mega Menu</p>
              </div>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium flex items-center gap-1 shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Dodaj
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item) => {
                const isSelected = selectedItemId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectItem(item.id);
                      setActiveTab('item');
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-semibold text-white truncate">{item.label}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({item.type})</span>
                      {item.badge && (
                        <span
                          className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white"
                          style={{ backgroundColor: item.badgeColor || '#2563eb' }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateItem(item.id, { isHidden: !item.isHidden });
                        }}
                        className={`p-1 rounded ${!item.isHidden ? 'text-emerald-400' : 'text-slate-600'}`}
                      >
                        {!item.isHidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ITEM */}
        {activeTab === 'item' && (
          <div className="space-y-4">
            {!selectedItem ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                <Menu className="w-8 h-8 mx-auto mb-2 opacity-40 text-blue-400" />
                <p className="font-semibold text-slate-400">Nie wybrano pozycji menu</p>
                <p className="text-[11px] mt-1">Wybierz pozycję z drzewa, aby edytować jej parametry.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                    Konfiguracja Linku
                  </span>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Etykieta</label>
                    <input
                      type="text"
                      value={selectedItem.label}
                      onChange={(e) => handleUpdateItem(selectedItem.id, { label: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Adres URL</label>
                    <input
                      type="text"
                      value={selectedItem.url || ''}
                      onChange={(e) => handleUpdateItem(selectedItem.id, { url: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Typ pozycji</label>
                    <select
                      value={selectedItem.type}
                      onChange={(e) => handleUpdateItem(selectedItem.id, { type: e.target.value as any })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1.5 text-xs text-white"
                    >
                      <option value="link">Zwykły Link</option>
                      <option value="dropdown">Rozwijana lista (Dropdown)</option>
                      <option value="megamenu">Mega Menu (Wielokolumnowe)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Badge (opcja)</label>
                      <input
                        type="text"
                        value={selectedItem.badge || ''}
                        onChange={(e) => handleUpdateItem(selectedItem.id, { badge: e.target.value })}
                        placeholder="np. HIT"
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Kolor Badge</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={selectedItem.badgeColor || '#2563eb'}
                          onChange={(e) => handleUpdateItem(selectedItem.id, { badgeColor: e.target.value })}
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <span className="text-[11px] font-mono text-slate-300">
                          {selectedItem.badgeColor || '#2563eb'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DRAWER BUTTON */}
        {activeTab === 'drawer' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                Przycisk Wszystkie Kategorie
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Pokaż przycisk</span>
                <input
                  type="checkbox"
                  checked={mainMenu.showCategoryDrawerButton !== false}
                  onChange={(e) => updateMainMenu({ showCategoryDrawerButton: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-blue-600"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Tekst przycisku</label>
                <input
                  type="text"
                  value={mainMenu.categoryButtonText || 'Wszystkie Kategorie'}
                  onChange={(e) => updateMainMenu({ categoryButtonText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
