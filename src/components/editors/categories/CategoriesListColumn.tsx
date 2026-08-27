import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { SYSTEM_CATEGORIES, SystemCategory } from '../../../data/marketplaceCatalogue';
import { CATEGORIES_PRESETS } from '../../../data/defaultCategories';
import {
  CategoriesDisplayMode,
  CategoriesPresetStyleName
} from '../../../types/storeAppearance';
import * as LucideIcons from 'lucide-react';
import {
  Database,
  Grid,
  Layers,
  LayoutGrid,
  List,
  Sliders,
  Sparkles,
  Search,
  CheckCircle2,
  Copy,
  ClipboardPaste,
  RotateCcw,
  Eye,
  SlidersHorizontal,
  FolderTree,
  ChevronRight,
  Info,
  ArrowUpDown,
  Tag,
  Boxes,
  Zap,
  Flame,
  Check
} from 'lucide-react';

interface CategoriesListColumnProps {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoriesListColumn: React.FC<CategoriesListColumnProps> = ({
  selectedCategoryId,
  onSelectCategory
}) => {
  const {
    state,
    updateCategories,
    applyCategoriesPreset,
    copyCategoriesStyle,
    pasteCategoriesStyle,
    resetCategories,
    categoriesClipboardStyle
  } = useStoreAppearance();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'categories' | 'presets' | 'data_source'>('categories');

  const config = state.categories;

  // Filtered categories for the explorer list
  const filteredCategories = SYSTEM_CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayModes: { id: CategoriesDisplayMode; label: string; icon: any; desc: string }[] = [
    { id: 'tiles', label: 'Kafelki (Tiles)', icon: LayoutGrid, desc: 'Nowoczesne kafelki z ikoną lub miniaturą' },
    { id: 'grid', label: 'Siatka (Grid)', icon: Grid, desc: 'Klasyczna siatka wielokolumnowa' },
    { id: 'carousel', label: 'Karuzela (Carousel)', icon: Layers, desc: 'Przewijany pasek ze strzałkami nawigacji' },
    { id: 'slider', label: 'Slider', icon: Sliders, desc: 'Płynny poziomy slider z przyciąganiem' },
    { id: 'horizontal_list', label: 'Pigułki / Pasek', icon: Tag, desc: 'Zwarta pozioma lista tagów i pigułek' },
    { id: 'list', label: 'Lista Wierszowa', icon: List, desc: 'Kompaktowa lista jedno- lub wielokolumnowa' },
    { id: 'list_with_icons', label: 'Lista z Ikonami', icon: Boxes, desc: 'Wiersze z kolorowymi ikonami' },
    { id: 'tiles_with_images', label: 'Kafelki ze Zdjęciem', icon: Sparkles, desc: 'Bogate kafelki ze zdjęciem tła' }
  ];

  const renderIcon = (name: string, size = 16) => {
    const IconComp = (LucideIcons as any)[name] || Grid;
    return <IconComp style={{ width: size, height: size }} />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 divide-y divide-slate-800">
      {/* Header Info & Sub-tabs */}
      <div className="p-3 bg-slate-950/70 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <FolderTree className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Widżet Kategorii
              </h3>
              <p className="text-[11px] text-slate-400">
                Układ & Prezentacja Danych
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Aktywny
          </span>
        </div>

        {/* Sub-tabs switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveSubTab('categories')}
            className={`py-1.5 font-medium rounded-md transition-all text-center ${
              activeSubTab === 'categories'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kategorie
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('presets')}
            className={`py-1.5 font-medium rounded-md transition-all text-center ${
              activeSubTab === 'presets'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Presety (11)
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('data_source')}
            className={`py-1.5 font-medium rounded-md transition-all text-center ${
              activeSubTab === 'data_source'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Źródło Danych
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        {/* SUB-TAB 1: Categories Explorer & Display Mode */}
        {activeSubTab === 'categories' && (
          <>
            {/* Quick Sposób Wyświetlania */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Format Prezentacji (Display Mode)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {displayModes.map(mode => {
                  const Icon = mode.icon;
                  const isActive = config.displayMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => updateCategories({ displayMode: mode.id })}
                      className={`p-2 rounded-lg border text-left flex items-start gap-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600/20 border-blue-500 text-blue-200 shadow-xs'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                      <div className="min-w-0">
                        <div className="font-semibold text-[11px] truncate">{mode.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filter & Sort controls */}
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
                  Sortowanie
                </span>
                <select
                  value={config.sortOrder}
                  onChange={e => updateCategories({ sortOrder: e.target.value as any })}
                  className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-hidden"
                >
                  <option value="system_default">Kolejność systemowa</option>
                  <option value="alpha_asc">Alfabetycznie A-Z</option>
                  <option value="alpha_desc">Alfabetycznie Z-A</option>
                  <option value="popularity">Według popularności</option>
                  <option value="product_count_desc">Najwięcej produktów</option>
                  <option value="newest">Najnowsze</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                  Limit wyświetlania
                </span>
                <select
                  value={config.limitCount}
                  onChange={e => {
                    const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                    updateCategories({ limitCount: val as any });
                  }}
                  className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-hidden"
                >
                  <option value="all">Wszystkie (12)</option>
                  <option value="4">4 kategorie</option>
                  <option value="6">6 kategorii</option>
                  <option value="8">8 kategorii</option>
                  <option value="10">10 kategorii</option>
                  <option value="12">12 kategorii</option>
                  <option value="16">16 kategorii</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={config.filterFeaturedOnly}
                    onChange={e => updateCategories({ filterFeaturedOnly: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Tylko wyróżnione</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[11px] text-slate-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={config.filterWithProductsOnly}
                    onChange={e => updateCategories({ filterWithProductsOnly: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Tylko z produktami</span>
                </label>
              </div>
            </div>

            {/* System Categories List Explorer */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Kategorie Systemowe ({filteredCategories.length})
                </label>
                {selectedCategoryId && (
                  <button
                    type="button"
                    onClick={() => onSelectCategory(null)}
                    className="text-[10px] text-blue-400 hover:underline"
                  >
                    Odznacz
                  </button>
                )}
              </div>

              {/* Search input */}
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Szukaj kategorii..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:ring-1 focus:ring-blue-500 outline-hidden"
                />
              </div>

              {/* Category items */}
              <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                {filteredCategories.map((cat) => {
                  const isSelected = selectedCategoryId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => onSelectCategory(isSelected ? null : cat.id)}
                      className={`p-2 rounded-lg border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/30 border-blue-500 text-white'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-md object-cover shrink-0 border border-slate-700"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                            {renderIcon(cat.icon, 14)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-xs truncate flex items-center gap-1.5">
                            <span>{cat.name}</span>
                            {cat.isFeatured && (
                              <Flame className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            /{cat.slug} • {cat.subcategories?.length || 0} podkategorii
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {cat.productCount}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* SUB-TAB 2: Presets */}
        {activeSubTab === 'presets' && (
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/60 text-[11px] text-blue-200">
              <p className="font-semibold mb-0.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Gotowe Presety Wyglądu
              </p>
              <p className="text-blue-300/80">
                Wybierz jeden z 11 zoptymalizowanych szablonów, aby natychmiast przekształcić styl kafelków i siatki.
              </p>
            </div>

            <div className="space-y-2">
              {CATEGORIES_PRESETS.map((preset) => {
                const isCurrent = config.activePreset === preset.presetKey;
                return (
                  <div
                    key={preset.presetKey}
                    onClick={() => applyCategoriesPreset(preset.presetKey)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-slate-950/50 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white flex items-center gap-1.5">
                        {preset.name}
                        {isCurrent && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      </span>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-sm bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {preset.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUB-TAB 3: Data Source Info */}
        {activeSubTab === 'data_source' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/50 text-amber-200">
              <div className="flex items-center gap-2 font-bold text-xs mb-1">
                <Info className="w-4 h-4 text-amber-400" />
                Podział Odpowiedzialności
              </div>
              <p className="text-[11px] text-amber-300/90 leading-relaxed">
                Ten edytor służy <strong>WYŁĄCZNIE</strong> do konfiguracji wyglądu, układu i sposobu prezentacji.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h4 className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                Status Integracji z Systemem
              </h4>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Źródło danych:</span>
                  <span className="font-mono text-emerald-400">Marketplace Catalogue DB</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Liczba kategorii:</span>
                  <span className="font-semibold text-white">{SYSTEM_CATEGORIES.length}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Łączna liczba produktów:</span>
                  <span className="font-semibold text-white">
                    {SYSTEM_CATEGORIES.reduce((acc, c) => acc + (c.productCount || 0), 0).toLocaleString()} szt.
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Tryb synchronizacji:</span>
                  <span className="text-blue-400 font-semibold">Automatyczny (Live)</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <p className="font-semibold text-slate-300 mb-1">Gdzie zarządzać bazą kategorii?</p>
              <p>
                Tworzenie, usuwanie, zmiana nazw kategorii i przypisywanie produktów odbywa się w zakładce <strong>Kategorie / Katalog Produktów</strong> panelu Marketplace.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Quick Actions */}
      <div className="p-3 bg-slate-950/90 border-t border-slate-800 shrink-0 flex items-center justify-between gap-1.5">
        <button
          type="button"
          onClick={copyCategoriesStyle}
          className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md border border-slate-800 flex items-center justify-center gap-1.5 transition-all text-xs font-medium"
          title="Kopiuj styl widżetu kategorii"
        >
          <Copy className="w-3.5 h-3.5 text-blue-400" />
          Kopiuj styl
        </button>
        <button
          type="button"
          onClick={pasteCategoriesStyle}
          disabled={!categoriesClipboardStyle}
          className={`flex-1 py-1.5 px-2 rounded-md border flex items-center justify-center gap-1.5 transition-all text-xs font-medium ${
            categoriesClipboardStyle
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
              : 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'
          }`}
          title="Wklej styl widżetu kategorii"
        >
          <ClipboardPaste className="w-3.5 h-3.5 text-emerald-400" />
          Wklej styl
        </button>
        <button
          type="button"
          onClick={resetCategories}
          className="p-1.5 bg-slate-900 hover:bg-red-950/50 text-slate-400 hover:text-red-400 rounded-md border border-slate-800 hover:border-red-800/50 transition-all"
          title="Przywróć domyślny wygląd kategorii"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
