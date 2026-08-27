import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  CategoriesDisplayMode,
  CategoriesCardLayout
} from '../../../types/storeAppearance';
import {
  Sliders,
  Layout,
  Image as ImageIcon,
  Type,
  Hash,
  Sparkles,
  Layers,
  Square,
  Sun,
  MousePointer,
  ArrowRight,
  Smartphone,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Palette,
  Lock,
  Unlock,
  Check,
  Eye,
  Settings,
  Maximize2
} from 'lucide-react';

export const CategoriesConfigColumn: React.FC = () => {
  const { state, updateCategories } = useStoreAppearance();
  const config = state.categories;

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    header: true,
    layout: true,
    card: false,
    image: false,
    overlay: false,
    typography: false,
    counter: false,
    icon: false,
    border: false,
    shadow: false,
    hover: false,
    button: false,
    responsive: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    Object.keys(openSections).forEach(k => { allOpen[k] = true; });
    setOpenSections(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    Object.keys(openSections).forEach(k => { allClosed[k] = false; });
    setOpenSections(allClosed);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 divide-y divide-slate-800">
      {/* Header */}
      <div className="p-3 bg-slate-950/70 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Sliders className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Parametry Wizualne
            </h3>
            <p className="text-[11px] text-slate-400">
              Personalizacja Stylu i Układu
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={expandAll}
            className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded border border-slate-800 transition-all"
          >
            Rozwiń
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded border border-slate-800 transition-all"
          >
            Zwiń
          </button>
        </div>
      </div>

      {/* Main Accordion List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
        {/* 1. SEKCJA & NAGŁÓWEK */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('header')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-400" />
              <span>1. Nagłówek Sekcji & Widoczność</span>
            </div>
            {openSections.header ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.header && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <label className="flex items-center justify-between p-2 rounded-md bg-slate-900/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Włącz widżet kategorii</span>
                  <p className="text-[10px] text-slate-400">Wyświetlaj sekcję kategorii na stronie</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={e => updateCategories({ enabled: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-md bg-slate-900/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Pokaż nagłówek sekcji</span>
                  <p className="text-[10px] text-slate-400">Tytuł i podtytuł nad kafelkami</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.showSectionHeader}
                  onChange={e => updateCategories({ showSectionHeader: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                />
              </label>

              {config.showSectionHeader && (
                <>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Tytuł sekcji</label>
                    <input
                      type="text"
                      value={config.title}
                      onChange={e => updateCategories({ title: e.target.value })}
                      placeholder="np. Przeglądaj Kategorie"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Podtytuł sekcji</label>
                    <input
                      type="text"
                      value={config.subtitle || ''}
                      onChange={e => updateCategories({ subtitle: e.target.value })}
                      placeholder="np. Wybierz interesujący Cię dział z tysiącami produktów"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-blue-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Wyrównanie nagłówka</label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded border border-slate-800">
                      {(['left', 'center', 'right'] as const).map(align => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateCategories({ headerAlignment: align })}
                          className={`py-1 text-center font-medium rounded text-[11px] capitalize ${
                            config.headerAlignment === align ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {align === 'left' ? 'Do lewej' : align === 'center' ? 'Środek' : 'Do prawej'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Margines Y (px)</label>
                  <input
                    type="number"
                    value={config.sectionPaddingY}
                    onChange={e => updateCategories({ sectionPaddingY: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                    min={0}
                    max={120}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Margines X (px)</label>
                  <input
                    type="number"
                    value={config.sectionPaddingX}
                    onChange={e => updateCategories({ sectionPaddingX: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                    min={0}
                    max={80}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. UKŁAD & KOLUMNY */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('layout')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-blue-400" />
              <span>2. Układ & Kolumny Siatki</span>
            </div>
            {openSections.layout ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.layout && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Kolumny na Desktop</label>
                <div className="grid grid-cols-6 gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-center">
                  {[2, 3, 4, 5, 6, 'auto'].map(col => (
                    <button
                      key={String(col)}
                      type="button"
                      onClick={() => updateCategories({ columnsDesktop: col as any })}
                      className={`py-1 text-xs font-semibold rounded ${
                        config.columnsDesktop === col ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {col === 'auto' ? 'Auto' : col}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Tablet (kolumny)</label>
                  <select
                    value={config.columnsTablet}
                    onChange={e => updateCategories({ columnsTablet: Number(e.target.value) as any })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    <option value={2}>2 kolumny</option>
                    <option value={3}>3 kolumny</option>
                    <option value={4}>4 kolumny</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Mobile (kolumny)</label>
                  <select
                    value={config.columnsMobile}
                    onChange={e => updateCategories({ columnsMobile: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    <option value={1}>1 kolumna</option>
                    <option value={2}>2 kolumny</option>
                    <option value="auto">Auto / Slider</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Szerokość kontenera</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded border border-slate-800">
                  {[
                    { id: 'full', label: '100%' },
                    { id: 'wide', label: '1380px' },
                    { id: 'standard', label: '1200px' },
                    { id: 'narrow', label: '960px' }
                  ].map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => updateCategories({ containerWidthPreset: w.id as any })}
                      className={`py-1 text-center font-medium rounded text-[11px] ${
                        config.containerWidthPreset === w.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Odstęp między kafelkami (Gap)</span>
                  <span className="font-mono text-slate-200">{config.cardGap}px</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={40}
                  step={2}
                  value={config.cardGap}
                  onChange={e => updateCategories({ cardGap: Number(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Wyrównanie treści kafelka</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded border border-slate-800">
                  {(['left', 'center', 'right'] as const).map(align => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateCategories({ contentAlign: align })}
                      className={`py-1 text-center font-medium rounded text-[11px] capitalize ${
                        config.contentAlign === align ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {align === 'left' ? 'Do lewej' : align === 'center' ? 'Środek' : 'Do prawej'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. KAFELKI & GEOMETRIA */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('card')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-blue-400" />
              <span>3. Kafelki, Padding & Tło</span>
            </div>
            {openSections.card ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.card && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Układ wewnętrzny (Card Layout)</label>
                <select
                  value={config.cardLayout}
                  onChange={e => updateCategories({ cardLayout: e.target.value as CategoriesCardLayout })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 text-xs"
                >
                  <option value="image_top">Zdjęcie na górze (Image Top)</option>
                  <option value="image_left">Zdjęcie po lewej (Image Left)</option>
                  <option value="image_right">Zdjęcie po prawej (Image Right)</option>
                  <option value="image_bottom">Zdjęcie na dole (Image Bottom)</option>
                  <option value="image_background">Zdjęcie jako pełne tło (Image Background)</option>
                  <option value="text_over_image">Tekst nałożony na zdjęcie (Text over Image)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Tryb wysokości</label>
                  <select
                    value={config.cardHeightMode}
                    onChange={e => updateCategories({ cardHeightMode: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    <option value="auto">Auto (Dopasowana)</option>
                    <option value="fixed">Stała (px)</option>
                  </select>
                </div>
                {config.cardHeightMode === 'fixed' && (
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Wysokość (px)</label>
                    <input
                      type="number"
                      value={config.cardFixedHeight || 180}
                      onChange={e => updateCategories({ cardFixedHeight: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                      min={60}
                      max={400}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Padding kafelka (px)</label>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {(['top', 'right', 'bottom', 'left'] as const).map(side => (
                    <div key={side}>
                      <span className="text-[9px] text-slate-500 uppercase">{side}</span>
                      <input
                        type="number"
                        value={config.cardPadding[side]}
                        onChange={e => {
                          const val = Number(e.target.value);
                          if (config.cardPadding.isLocked) {
                            updateCategories({
                              cardPadding: { top: val, right: val, bottom: val, left: val, isLocked: true }
                            });
                          } else {
                            updateCategories({
                              cardPadding: { ...config.cardPadding, [side]: val }
                            });
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1 text-center text-xs text-slate-200"
                        min={0}
                        max={60}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Kolor tła kafelka</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.backgroundColor.startsWith('#') ? config.backgroundColor : '#ffffff'}
                    onChange={e => updateCategories({ backgroundColor: e.target.value })}
                    className="w-7 h-7 rounded border border-slate-700 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.backgroundColor}
                    onChange={e => updateCategories({ backgroundColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-200"
                  />
                </div>
              </div>

              <label className="flex items-center justify-between p-2 rounded-md bg-slate-900/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Efekt Szkła (Glassmorphism)</span>
                  <p className="text-[10px] text-slate-400">Półprzezroczystość z rozmyciem tła</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.glassmorphism.enabled}
                  onChange={e => updateCategories({
                    glassmorphism: { ...config.glassmorphism, enabled: e.target.checked },
                    backgroundType: e.target.checked ? 'glass' : 'solid'
                  })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                />
              </label>

              {config.glassmorphism.enabled && (
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Moc rozmycia (Blur)</span>
                    <span className="font-mono text-slate-200">{config.glassmorphism.blurPx}px</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={30}
                    value={config.glassmorphism.blurPx}
                    onChange={e => updateCategories({
                      glassmorphism: { ...config.glassmorphism, blurPx: Number(e.target.value) }
                    })}
                    className="w-full accent-blue-600"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. ZDJĘCIA & PLACEHOLDER */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('image')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>4. Zdjęcia & Miniatury</span>
            </div>
            {openSections.image ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.image && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <label className="flex items-center justify-between p-2 rounded-md bg-slate-900/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Pokaż zdjęcia kategorii</span>
                  <p className="text-[10px] text-slate-400">Miniatury lub tła pobrane z systemu</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.image.show}
                  onChange={e => updateCategories({
                    image: { ...config.image, show: e.target.checked }
                  })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                />
              </label>

              {config.image.show && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Wysokość zdjęcia (px)</label>
                      <input
                        type="number"
                        value={config.image.heightPx || 110}
                        onChange={e => updateCategories({
                          image: { ...config.image, heightPx: Number(e.target.value) }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                        min={30}
                        max={350}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Proporcje (Aspect Ratio)</label>
                      <select
                        value={config.image.aspectRatio}
                        onChange={e => updateCategories({
                          image: { ...config.image, aspectRatio: e.target.value as any }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                      >
                        <option value="1:1">Kwadrat (1:1)</option>
                        <option value="4:3">Klasyczny (4:3)</option>
                        <option value="16:9">Panoramiczny (16:9)</option>
                        <option value="circle">Okrąg (Circle)</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Dopasowanie (Object-fit)</label>
                      <select
                        value={config.image.objectFit}
                        onChange={e => updateCategories({
                          image: { ...config.image, objectFit: e.target.value as any }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                      >
                        <option value="cover">Cover (Wypełnij)</option>
                        <option value="contain">Contain (Zmieść)</option>
                        <option value="fill">Fill (Rozciągnij)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Zaokrąglenie zdjęcia (px)</label>
                      <input
                        type="number"
                        value={config.image.borderRadius}
                        onChange={e => updateCategories({
                          image: { ...config.image, borderRadius: Number(e.target.value) }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                        min={0}
                        max={9999}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Placeholder przy braku zdjęcia</label>
                    <select
                      value={config.image.placeholderMode}
                      onChange={e => updateCategories({
                        image: { ...config.image, placeholderMode: e.target.value as any }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1.5 text-xs"
                    >
                      <option value="default_image">Domyślna grafika marketplace</option>
                      <option value="category_icon">Ikona kategorii</option>
                      <option value="solid_color">Jednolity kolor tła</option>
                      <option value="initial_letter">Inicjał nazwy kategorii</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* 5. OVERLAY & PRZYCIEMNIENIE */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('overlay')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>5. Overlay & Warstwa Cienia</span>
            </div>
            {openSections.overlay ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.overlay && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Typ warstwy (Overlay Type)</label>
                <select
                  value={config.overlay.type}
                  onChange={e => updateCategories({
                    overlay: { ...config.overlay, type: e.target.value as any }
                  })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 text-xs"
                >
                  <option value="none">Brak overlayu</option>
                  <option value="solid">Jednolity kolor</option>
                  <option value="gradient">Gradient od dołu</option>
                  <option value="dark">Ciemny filtr (Darken)</option>
                  <option value="light">Jasny filtr (Lighten)</option>
                </select>
              </div>

              {config.overlay.type !== 'none' && (
                <>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Przezroczystość normalna</span>
                      <span className="font-mono text-slate-200">{config.overlay.opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={config.overlay.opacity}
                      onChange={e => updateCategories({
                        overlay: { ...config.overlay, opacity: Number(e.target.value) }
                      })}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Przezroczystość na Hover</span>
                      <span className="font-mono text-slate-200">{config.overlay.hoverOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={config.overlay.hoverOpacity}
                      onChange={e => updateCategories({
                        overlay: { ...config.overlay, hoverOpacity: Number(e.target.value) }
                      })}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* 6. TYPOGRAFIA NAZWY */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('typography')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-400" />
              <span>6. Typografia Nazwy Kategorii</span>
            </div>
            {openSections.typography ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.typography && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Rozmiar fontu (px)</label>
                  <input
                    type="number"
                    value={config.nameTypography.fontSizePx}
                    onChange={e => updateCategories({
                      nameTypography: { ...config.nameTypography, fontSizePx: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                    min={10}
                    max={36}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Grubość (Weight)</label>
                  <select
                    value={config.nameTypography.fontWeight}
                    onChange={e => updateCategories({
                      nameTypography: { ...config.nameTypography, fontWeight: e.target.value }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    <option value="400">Regular (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">SemiBold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">ExtraBold (800)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Krój pisma</label>
                  <select
                    value={config.nameTypography.fontFamily}
                    onChange={e => updateCategories({
                      nameTypography: { ...config.nameTypography, fontFamily: e.target.value as any }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    <option value="sans">Modern Sans (Bezszeryfowy)</option>
                    <option value="display">Display (Nowoczesny)</option>
                    <option value="serif">Serif (Elegancki)</option>
                    <option value="mono">Monospace (Kodowy)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Transformacja tekstu</label>
                  <select
                    value={config.nameTypography.textTransform}
                    onChange={e => updateCategories({
                      nameTypography: { ...config.nameTypography, textTransform: e.target.value as any }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    <option value="none">Brak (Normalny)</option>
                    <option value="uppercase">WIELKIE LITERY</option>
                    <option value="capitalize">Pierwsza Wielka</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Kolor tekstu</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={config.nameTypography.color.startsWith('#') ? config.nameTypography.color : '#0f172a'}
                      onChange={e => updateCategories({
                        nameTypography: { ...config.nameTypography, color: e.target.value }
                      })}
                      className="w-6 h-6 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={config.nameTypography.color}
                      onChange={e => updateCategories({
                        nameTypography: { ...config.nameTypography, color: e.target.value }
                      })}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[11px] font-mono text-slate-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Kolor na Hover</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={config.nameTypography.hoverColor.startsWith('#') ? config.nameTypography.hoverColor : '#2563eb'}
                      onChange={e => updateCategories({
                        nameTypography: { ...config.nameTypography, hoverColor: e.target.value }
                      })}
                      className="w-6 h-6 rounded border border-slate-700 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={config.nameTypography.hoverColor}
                      onChange={e => updateCategories({
                        nameTypography: { ...config.nameTypography, hoverColor: e.target.value }
                      })}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[11px] font-mono text-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 7. LICZNIK PRODUKTÓW */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('counter')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-400" />
              <span>7. Licznik Produktów & Badge</span>
            </div>
            {openSections.counter ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.counter && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <label className="flex items-center justify-between p-2 rounded-md bg-slate-900/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Pokaż licznik produktów</span>
                  <p className="text-[10px] text-slate-400">Liczba ofert dostępnych w kategorii</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.productCount.show}
                  onChange={e => updateCategories({
                    productCount: { ...config.productCount, show: e.target.checked }
                  })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                />
              </label>

              {config.productCount.show && (
                <>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Pozycja licznika</label>
                    <select
                      value={config.productCount.position}
                      onChange={e => updateCategories({
                        productCount: { ...config.productCount, position: e.target.value as any }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 text-xs"
                    >
                      <option value="below_name">Pod nazwą kategorii</option>
                      <option value="inline">W linii obok nazwy</option>
                      <option value="badge_top_right">Plakietka w prawym górnym rogu</option>
                      <option value="badge_top_left">Plakietka w lewym górnym rogu</option>
                      <option value="pill">Pigułka z tłem</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Szablon tekstu</label>
                    <input
                      type="text"
                      value={config.productCount.formatTemplate}
                      onChange={e => updateCategories({
                        productCount: { ...config.productCount, formatTemplate: e.target.value }
                      })}
                      placeholder="{count} produktów"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Użyj tagu {"{count}"} w miejscu liczby</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Rozmiar fontu (px)</label>
                      <input
                        type="number"
                        value={config.productCount.fontSizePx}
                        onChange={e => updateCategories({
                          productCount: { ...config.productCount, fontSizePx: Number(e.target.value) }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                        min={9}
                        max={18}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Kolor tekstu</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={config.productCount.color.startsWith('#') ? config.productCount.color : '#64748b'}
                          onChange={e => updateCategories({
                            productCount: { ...config.productCount, color: e.target.value }
                          })}
                          className="w-6 h-6 rounded border border-slate-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={config.productCount.color}
                          onChange={e => updateCategories({
                            productCount: { ...config.productCount, color: e.target.value }
                          })}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[11px] font-mono text-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* 8. OBRAMOWANIE & CORNERS */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('border')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-blue-400" />
              <span>8. Obramowanie & Zaokrąglenie (Radius)</span>
            </div>
            {openSections.border ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.border && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Styl obramowania</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-center">
                  {(['none', 'solid', 'dashed', 'dotted'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => updateCategories({
                        border: { ...config.border, style: st }
                      })}
                      className={`py-1 text-xs font-medium rounded capitalize ${
                        config.border.style === st ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {st === 'none' ? 'Brak' : st === 'solid' ? 'Ciągła' : st === 'dashed' ? 'Kreska' : 'Kropki'}
                    </button>
                  ))}
                </div>
              </div>

              {config.border.style !== 'none' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Grubość (px)</label>
                    <input
                      type="number"
                      value={config.border.width}
                      onChange={e => updateCategories({
                        border: { ...config.border, width: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                      min={1}
                      max={8}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Kolor ramki</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={config.border.color.startsWith('#') ? config.border.color : '#e2e8f0'}
                        onChange={e => updateCategories({
                          border: { ...config.border, color: e.target.value }
                        })}
                        className="w-6 h-6 rounded border border-slate-700 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={config.border.color}
                        onChange={e => updateCategories({
                          border: { ...config.border, color: e.target.value }
                        })}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[11px] font-mono text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Zaokrąglenie rogów (Radius)</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-center">
                  {[
                    { id: 'none', label: '0px' },
                    { id: 'sm', label: '4px' },
                    { id: 'md', label: '8px' },
                    { id: 'lg', label: '14px' },
                    { id: 'xl', label: '20px' },
                    { id: '2xl', label: '28px' },
                    { id: 'pill', label: 'Pill' },
                    { id: 'circle', label: 'Koło' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => updateCategories({
                        border: { ...config.border, radiusPreset: r.id as any }
                      })}
                      className={`py-1 text-[11px] font-medium rounded ${
                        config.border.radiusPreset === r.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 9. CIENIE & GLOW */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('shadow')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-blue-400" />
              <span>9. Cienie & Efekt Glow</span>
            </div>
            {openSections.shadow ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.shadow && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Preset cienia</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-center">
                  {[
                    { id: 'none', label: 'Brak' },
                    { id: 'sm', label: 'Mały' },
                    { id: 'md', label: 'Średni' },
                    { id: 'lg', label: 'Duży' },
                    { id: 'xl', label: 'XL' },
                    { id: '2xl', label: '2XL' },
                    { id: 'glow', label: 'Glow' }
                  ].map(sh => (
                    <button
                      key={sh.id}
                      type="button"
                      onClick={() => updateCategories({
                        shadow: { ...config.shadow, preset: sh.id as any }
                      })}
                      className={`py-1 text-[11px] font-medium rounded ${
                        config.shadow.preset === sh.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 10. HOVER & ANIMACJE */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('hover')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-blue-400" />
              <span>10. Efekty Hover & Animacja</span>
            </div>
            {openSections.hover ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.hover && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Skala kafelka</label>
                  <select
                    value={config.hover.cardScale}
                    onChange={e => updateCategories({
                      hover: { ...config.hover, cardScale: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                  >
                    <option value={1.0}>Brak (1.0x)</option>
                    <option value={1.02}>Subtelna (+2%)</option>
                    <option value={1.04}>Wyraźna (+4%)</option>
                    <option value={1.08}>Duża (+8%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Uniesienie (Y px)</label>
                  <input
                    type="number"
                    value={config.hover.translateYPx}
                    onChange={e => updateCategories({
                      hover: { ...config.hover, translateYPx: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                    min={-20}
                    max={0}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Efekt zdjęcia na hover</label>
                <select
                  value={config.hover.imageEffect}
                  onChange={e => updateCategories({
                    hover: { ...config.hover, imageEffect: e.target.value as any }
                  })}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 text-xs"
                >
                  <option value="none">Brak efektu</option>
                  <option value="zoom">Płynny zoom zdjęcia</option>
                  <option value="scale">Powiększenie</option>
                  <option value="brightness">Rozjaśnienie (Brightness)</option>
                  <option value="darken">Przyciemnienie (Darken)</option>
                  <option value="grayscale">Skala szarości</option>
                  <option value="rotate">Lekki obrót</option>
                  <option value="shine">Błysk / Kontrast</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Czas trwania przejścia (Transition)</span>
                  <span className="font-mono text-slate-200">{config.hover.transitionDurationMs}ms</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={600}
                  step={50}
                  value={config.hover.transitionDurationMs}
                  onChange={e => updateCategories({
                    hover: { ...config.hover, transitionDurationMs: Number(e.target.value) }
                  })}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* 11. PRZYCISK ZOBACZ WIĘCEJ */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('button')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              <span>11. Przycisk „Zobacz Więcej”</span>
            </div>
            {openSections.button ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.button && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <label className="flex items-center justify-between p-2 rounded-md bg-slate-900/60 border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-200 text-xs">Pokaż przycisk rozwijania</span>
                  <p className="text-[10px] text-slate-400">Wyświetlany pod siatką kategorii</p>
                </div>
                <input
                  type="checkbox"
                  checked={config.showMoreButton.show}
                  onChange={e => updateCategories({
                    showMoreButton: { ...config.showMoreButton, show: e.target.checked }
                  })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                />
              </label>

              {config.showMoreButton.show && (
                <>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Tekst przycisku</label>
                    <input
                      type="text"
                      value={config.showMoreButton.text}
                      onChange={e => updateCategories({
                        showMoreButton: { ...config.showMoreButton, text: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Pozycja</label>
                      <select
                        value={config.showMoreButton.position}
                        onChange={e => updateCategories({
                          showMoreButton: { ...config.showMoreButton, position: e.target.value as any }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                      >
                        <option value="center">Środek</option>
                        <option value="left">Do lewej</option>
                        <option value="right">Do prawej</option>
                        <option value="full_width">Pełna szerokość</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Akcja po kliknięciu</label>
                      <select
                        value={config.showMoreButton.action}
                        onChange={e => updateCategories({
                          showMoreButton: { ...config.showMoreButton, action: e.target.value as any }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
                      >
                        <option value="expand_inline">Rozwiń na miejscu</option>
                        <option value="link">Przejdź do /kategorie</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* 12. RESPONSYWNOŚĆ */}
        <div className="rounded-lg bg-slate-950/60 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('responsive')}
            className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-slate-200 hover:bg-slate-850 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>12. Ustawienia Responsywne (RWD)</span>
            </div>
            {openSections.responsive ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.responsive && (
            <div className="p-3 border-t border-slate-800 space-y-3">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-2">
                <span className="font-bold text-slate-200">📱 Smartfon (Mobile):</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Kolumny</label>
                    <select
                      value={config.responsive.mobile?.columns || 2}
                      onChange={e => updateCategories({
                        responsive: {
                          ...config.responsive,
                          mobile: { ...config.responsive.mobile, columns: Number(e.target.value) }
                        }
                      })}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs"
                    >
                      <option value={1}>1 kolumna</option>
                      <option value={2}>2 kolumny</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Limit pozycji</label>
                    <select
                      value={config.responsive.mobile?.limitCount || 6}
                      onChange={e => updateCategories({
                        responsive: {
                          ...config.responsive,
                          mobile: { ...config.responsive.mobile, limitCount: Number(e.target.value) }
                        }
                      })}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs"
                    >
                      <option value={4}>4 kategorie</option>
                      <option value={6}>6 kategorii</option>
                      <option value={8}>8 kategorii</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
