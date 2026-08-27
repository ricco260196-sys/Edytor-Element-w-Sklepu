import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { PRODUCTS_GRID_PRESETS } from '../../../data/defaultProductsGrid';
import { SYSTEM_PRODUCTS, SystemProduct } from '../../../data/marketplaceCatalogue';
import { ProductCardElementKey, ProductGridDisplayMode } from '../../../types/storeAppearance';
import {
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  LayoutGrid,
  Copy,
  ClipboardCheck,
  RotateCcw,
  Check,
  Sliders,
  Database,
  Search,
  ChevronRight,
  Star,
  ShoppingBag,
  ExternalLink,
  Info
} from 'lucide-react';

interface ProductsListColumnProps {
  selectedProductId?: string | null;
  onSelectProduct?: (id: string | null) => void;
}

export const ProductsListColumn: React.FC<ProductsListColumnProps> = ({
  selectedProductId,
  onSelectProduct
}) => {
  const {
    state,
    updateProductsGrid,
    applyProductsGridPreset,
    copyProductsGridStyle,
    pasteProductsGridStyle,
    resetProductsGrid,
    productsGridClipboardStyle,
    triggerToast
  } = useStoreAppearance();

  const config = state.productsGrid;
  const [activeSubTab, setActiveSubTab] = useState<'presets' | 'structure' | 'datasource'>('presets');
  const [catalogSearch, setCatalogSearch] = useState('');

  // Move element up or down in order
  const moveElement = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...config.elementsOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    updateProductsGrid({ elementsOrder: newOrder });
    triggerToast('info', 'Zmieniono kolejność', 'Zaktualizowano układ elementów na karcie produktu.');
  };

  // Element labels dictionary
  const elementLabels: { [key in ProductCardElementKey]: { label: string; icon: string; desc: string } } = {
    image: { label: 'Zdjęcie produktu (Galeria)', icon: 'Image', desc: 'Główna fotografia lub karuzela zdjęć' },
    badge: { label: 'Odznaka / Badge promocji', icon: 'Tag', desc: 'Etykieta HIT, Nowość, Wyprzedaż, Bestseller' },
    category_brand: { label: 'Kategoria i Marka', icon: 'Layers', desc: 'Informacja o kategorii i producencie' },
    name: { label: 'Tytuł / Nazwa produktu', icon: 'Type', desc: 'Główna nazwa pobrana z katalogu' },
    description: { label: 'Krótki opis produktu', icon: 'AlignLeft', desc: 'Zajawka specyfikacji lub parametrów' },
    rating: { label: 'Ocena gwiazdkowa i opinie', icon: 'Star', desc: 'Średnia ocen oraz liczba recenzji' },
    price: { label: 'Cena i rabat %', icon: 'CreditCard', desc: 'Cena aktualna, poprzednia przekreślona i -%' },
    stock: { label: 'Dostępność w magazynie', icon: 'CheckCircle', desc: 'Wskaźnik dostępności i stan sztuk' },
    variants: { label: 'Miniatury wariantów', icon: 'Palette', desc: 'Próbki kolorystyczne lub rozmiarowe' },
    buttons: { label: 'Przyciski akcji (Koszyk / Kup)', icon: 'ShoppingBag', desc: 'Główny przycisk Do koszyka i Kup teraz' }
  };

  const filteredCatalog = SYSTEM_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    p.vendorName.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900/90 text-slate-200 divide-y divide-slate-800/80">
      {/* 1. Module Header & Main Visibility Switch */}
      <div className="p-4 bg-slate-950/60 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Główna Siatka Produktów
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Widżet prezentacji produktów z marketplace
          </p>
        </div>

        {/* Global Widget Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => updateProductsGrid({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* 2. Sub-tab switcher */}
      <div className="p-2 bg-slate-950/40 grid grid-cols-3 gap-1 text-xs">
        <button
          onClick={() => setActiveSubTab('presets')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'presets'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Style & Presety</span>
        </button>

        <button
          onClick={() => setActiveSubTab('structure')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'structure'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Układ Karty</span>
        </button>

        <button
          onClick={() => setActiveSubTab('datasource')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'datasource'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Dane Systemu</span>
        </button>
      </div>

      {/* 3. Sub-tab content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: PRESETS & QUICK MODES */}
        {activeSubTab === 'presets' && (
          <div className="space-y-4">
            {/* Quick Display Mode Selectors */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Szybki wybór trybu wyświetlania:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'cards', label: 'Standardowe Karty', icon: 'LayoutGrid' },
                  { id: 'compact_grid', label: 'Kompaktowa Siatka (Gęsta)', icon: 'Grid' },
                  { id: 'large_cards', label: 'Duże Karty (Showcase)', icon: 'Maximize2' },
                  { id: 'list', label: 'Lista Pionowa', icon: 'List' },
                  { id: 'carousel', label: 'Karuzela Pozioma', icon: 'Sliders' },
                  { id: 'grid', label: 'Siatka Bezramkowa', icon: 'Box' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => updateProductsGrid({ displayMode: mode.id as ProductGridDisplayMode })}
                    className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center gap-2 ${
                      config.displayMode === mode.id
                        ? 'border-blue-500 bg-blue-600/20 text-blue-300 font-semibold ring-1 ring-blue-500/50'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${config.displayMode === mode.id ? 'bg-blue-400' : 'bg-slate-600'}`} />
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Presets List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Gotowe szablony stylistyczne (11 styli):
                </label>
                <span className="text-[10px] text-slate-400">1 kliknięcie</span>
              </div>

              <div className="space-y-2">
                {PRODUCTS_GRID_PRESETS.map((preset) => {
                  const isActive = config.activePreset === preset.id;

                  return (
                    <div
                      key={preset.id}
                      onClick={() => applyProductsGridPreset(preset.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isActive
                          ? 'border-blue-500 bg-blue-950/40 ring-1 ring-blue-500/40 shadow-sm'
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {preset.name}
                          </span>
                          <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-slate-800 text-slate-400 rounded-md">
                            {preset.category}
                          </span>
                        </div>
                        {isActive && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-blue-400">
                            <Check className="w-3.5 h-3.5" /> Aktywny
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                        {preset.description}
                      </p>

                      {/* Color dots preview */}
                      <div className="flex items-center gap-1.5 pt-1 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 mr-1">Paleta:</span>
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-xs"
                          style={{ backgroundColor: preset.previewColors.bg }}
                          title="Tło sekcji"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-xs"
                          style={{ backgroundColor: preset.previewColors.cardBg }}
                          title="Karta"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-xs"
                          style={{ backgroundColor: preset.previewColors.accent }}
                          title="Akcent i przycisk"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-xs"
                          style={{ backgroundColor: preset.previewColors.text }}
                          title="Tekst"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STRUCTURE & ELEMENTS ORDER */}
        {activeSubTab === 'structure' && (
          <div className="space-y-4">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-1">
                <Info className="w-3.5 h-3.5" />
                <span>Kolejność i hierarchia karty</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Zmieniaj kolejność elementów metodą góra/dół lub włączaj/wyłączaj poszczególne bloki w karcie produktu.
              </p>
            </div>

            {/* Elements order organizer */}
            <div className="space-y-1.5">
              {config.elementsOrder.map((elemKey, idx) => {
                const info = elementLabels[elemKey] || { label: elemKey, desc: '' };
                const isVisible = (config.visibility as any)[elemKey] ?? true;

                return (
                  <div
                    key={elemKey}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between gap-2 transition-all hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-400 flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-200 truncate">
                          {info.label}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {info.desc}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Move up */}
                      <button
                        disabled={idx === 0}
                        onClick={() => moveElement(idx, 'up')}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-700"
                        title="Przesuń wyżej"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move down */}
                      <button
                        disabled={idx === config.elementsOrder.length - 1}
                        onClick={() => moveElement(idx, 'down')}
                        className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white disabled:opacity-20 hover:bg-slate-700"
                        title="Przesuń niżej"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Visibility toggle */}
                      <button
                        onClick={() => {
                          const currentVis = (config.visibility as any)[elemKey];
                          updateProductsGrid({
                            visibility: {
                              ...config.visibility,
                              [elemKey]: !currentVis
                            }
                          });
                        }}
                        className={`p-1 rounded transition-colors ${
                          isVisible
                            ? 'bg-blue-600/30 text-blue-400 hover:bg-blue-600/50'
                            : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                        title={isVisible ? 'Ukryj element' : 'Pokaż element'}
                      >
                        {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: DATA SOURCE INTEGRATION */}
        {activeSubTab === 'datasource' && (
          <div className="space-y-3">
            <div className="bg-emerald-950/30 border border-emerald-800/60 p-3 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Database className="w-4 h-4" />
                <span>Połączono z bazą marketplace</span>
              </div>
              <p className="text-[11px] text-emerald-200/80 mt-1 leading-relaxed">
                Dane produktów (zdjęcia, ceny, warianty, stany) są pobierane w czasie rzeczywistym z systemu marketplace. Edytor odpowiada wyłącznie za szablon i warstwę prezentacji.
              </p>
            </div>

            {/* Search catalog */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtruj produkty w systemie..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* List of system products */}
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredCatalog.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct && onSelectProduct(String(prod.id))}
                  className={`p-2 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                    selectedProductId === String(prod.id)
                      ? 'border-blue-500 bg-blue-950/40 ring-1 ring-blue-500/50'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <img
                    src={prod.images[0]}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {prod.name}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="text-blue-400 font-bold">{prod.price.toFixed(2)} {prod.currency}</span>
                      <span>•</span>
                      <span className="truncate">{prod.category}</span>
                      {prod.badge && (
                        <span className="px-1 py-0.2 text-[9px] font-bold bg-amber-900/50 text-amber-300 rounded">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer Actions (Copy, Paste, Reset) */}
      <div className="p-3 bg-slate-950/80 flex items-center justify-between gap-2">
        <button
          onClick={copyProductsGridStyle}
          className="flex-1 py-1.5 px-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          title="Kopiuj styl do schowka"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Kopiuj styl</span>
        </button>

        <button
          onClick={pasteProductsGridStyle}
          disabled={!productsGridClipboardStyle}
          className="flex-1 py-1.5 px-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-30 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          title="Wklej styl ze schowka"
        >
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>Wklej styl</span>
        </button>

        <button
          onClick={resetProductsGrid}
          className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors"
          title="Zresetuj do ustawień domyślnych"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
