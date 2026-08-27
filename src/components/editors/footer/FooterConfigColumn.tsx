import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  FooterConfig,
  FooterSectionItem,
  FooterLinkItem,
  FooterShapePreset,
  FooterWidthPreset
} from '../../../types/footerEditor';
import {
  Sliders,
  Palette,
  Square,
  LayoutGrid,
  Type,
  Mail,
  Share2,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Plus,
  Trash2,
  Link,
  RotateCcw,
  Lock,
  Unlock,
  Check,
  Building2,
  FileText
} from 'lucide-react';

interface FooterConfigColumnProps {
  activeConfigTab: string;
  setActiveConfigTab: (tab: string) => void;
  onOpenAddModal: () => void;
}

export const FooterConfigColumn: React.FC<FooterConfigColumnProps> = ({
  activeConfigTab,
  setActiveConfigTab,
  onOpenAddModal
}) => {
  const {
    state,
    updateFooter,
    resetFooter,
    selectedFooterSectionId,
    setSelectedFooterSectionId
  } = useStoreAppearance();

  const footer = state.footer;

  const tabs = [
    { id: 'general', label: 'Główny & Kształt', icon: Square },
    { id: 'background', label: 'Tło & Obraz', icon: Palette },
    { id: 'border_shadow', label: 'Ramka & Cień', icon: Sliders },
    { id: 'layout', label: 'Układ Kolumn', icon: LayoutGrid },
    { id: 'brand', label: 'Brand & Logo', icon: Building2 },
    { id: 'sections', label: 'Sekcje & Linki', icon: Link },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'socialMedia', label: 'Social Media', icon: Share2 },
    { id: 'payments', label: 'Płatności & Trust', icon: CreditCard },
    { id: 'bottomBar', label: 'Dolny Pasek', icon: FileText },
    { id: 'responsive', label: 'Mobile & Ekrany', icon: Smartphone }
  ];

  // Currently selected dynamic section
  const currentSection = footer.sections.find(s => s.id === selectedFooterSectionId) || footer.sections[0];

  const handleAddLinkToCurrentSection = () => {
    if (!currentSection) return;
    const newLink: FooterLinkItem = {
      id: `link_${Date.now()}`,
      text: 'Nowy odnośnik',
      url: '/nowa-strona',
      isHidden: false
    };

    updateFooter(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === currentSection.id ? {
        ...s,
        links: [...(s.links || []), newLink]
      } : s)
    }));
  };

  const handleUpdateLink = (linkId: string, updates: Partial<FooterLinkItem>) => {
    if (!currentSection) return;
    updateFooter(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === currentSection.id ? {
        ...s,
        links: (s.links || []).map(l => l.id === linkId ? { ...l, ...updates } : l)
      } : s)
    }));
  };

  const handleDeleteLink = (linkId: string) => {
    if (!currentSection) return;
    updateFooter(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === currentSection.id ? {
        ...s,
        links: (s.links || []).filter(l => l.id !== linkId)
      } : s)
    }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-200 select-none">
      {/* Top Tab Bar Navigation */}
      <div className="flex items-center gap-1 p-2 border-b border-slate-800 bg-slate-950/40 overflow-x-auto no-scrollbar">
        {tabs.map(tab => {
          const IconComp = tab.icon;
          const isActive = activeConfigTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveConfigTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Settings Form Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* ============================================================ */}
        {/* TAB 1: GŁÓWNY & KSZTAŁT & ROZMIARY */}
        {/* ============================================================ */}
        {activeConfigTab === 'general' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                Wymiary & Szerokość Stopki
              </h3>
              <p className="text-[11px] text-slate-400">Dostosuj szerokość tła oraz kontenera treści (Punkty 3, 4)</p>
            </div>

            {/* Szerokość tła */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">Szerokość Tła (Background Width)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'full', label: '100% Pełna szerokość ekranu' },
                  { id: 'wide_1400', label: 'Szeroka (Max 1440px)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => updateFooter(prev => ({ ...prev, size: { ...prev.size, backgroundWidth: opt.id as any } }))}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                      footer.size.backgroundWidth === opt.id
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Szerokość kontenera treści */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">Szerokość Zawartości (Content Width)</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'wide_1400', label: '1440px (Szeroki)' },
                  { id: 'standard_1200', label: '1200px (Standard)' },
                  { id: 'compact_1000', label: '1000px (Kompakt)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => updateFooter(prev => ({ ...prev, size: { ...prev.size, contentWidth: opt.id as any } }))}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                      footer.size.contentWidth === opt.id
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dopełnienia (Padding) */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Wewnętrzny Odstęp (Padding px)</span>
                <button
                  onClick={() => updateFooter(prev => ({
                    ...prev,
                    size: {
                      ...prev.size,
                      padding: { ...prev.size.padding, isLocked: !prev.size.padding.isLocked }
                    }
                  }))}
                  className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
                >
                  {footer.size.padding.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{footer.size.padding.isLocked ? 'Połączone boki' : 'Niezależne boki'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Góra', key: 'top' },
                  { label: 'Prawa', key: 'right' },
                  { label: 'Dół', key: 'bottom' },
                  { label: 'Lewa', key: 'left' }
                ].map(item => (
                  <div key={item.key}>
                    <span className="text-[10px] text-slate-400 block mb-1">{item.label}</span>
                    <input
                      type="number"
                      value={(footer.size.padding as any)[item.key]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        updateFooter(prev => {
                          if (prev.size.padding.isLocked) {
                            return {
                              ...prev,
                              size: {
                                ...prev.size,
                                padding: { top: val, right: val, bottom: val, left: val, isLocked: true }
                              }
                            };
                          }
                          return {
                            ...prev,
                            size: {
                              ...prev.size,
                              padding: { ...prev.size.padding, [item.key]: val }
                            }
                          };
                        });
                      }}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kształt & Zaokrąglenia (Punkt 5) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Kształt Narożników & Krawędzi</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rectangle', label: 'Prostokąt (0px)' },
                  { id: 'rounded', label: 'Zaokrąglona góra (24px)' },
                  { id: 'extra_rounded', label: 'Mocne zaokrąglenie (32px)' },
                  { id: 'wave_top', label: 'Efekt fali (Wave)' }
                ].map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => {
                      if (shape.id === 'wave_top') {
                        updateFooter(prev => ({
                          ...prev,
                          shape: { ...prev.shape, preset: shape.id as any, clipPath: 'wave' }
                        }));
                      } else if (shape.id === 'rectangle') {
                        updateFooter(prev => ({
                          ...prev,
                          shape: { ...prev.shape, preset: shape.id as any, borderRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, clipPath: 'none' }
                        }));
                      } else if (shape.id === 'extra_rounded') {
                        updateFooter(prev => ({
                          ...prev,
                          shape: { ...prev.shape, preset: shape.id as any, borderRadius: 32, borderTopLeftRadius: 32, borderTopRightRadius: 32, clipPath: 'none' }
                        }));
                      } else {
                        updateFooter(prev => ({
                          ...prev,
                          shape: { ...prev.shape, preset: shape.id as any, borderRadius: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24, clipPath: 'none' }
                        }));
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs text-left font-medium transition-all ${
                      footer.shape.preset === shape.id
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {shape.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: TŁO & GRADIENT & OBRAZ (Punkty 6, 7, 8, 9) */}
        {/* ============================================================ */}
        {activeConfigTab === 'background' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Tło Stopki</h3>
              <p className="text-[11px] text-slate-400">Jednolity kolor, gradient liniowy/radialny, zdjęcie lub glassmorphism</p>
            </div>

            {/* Background Type selector */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'color', label: 'Kolor' },
                { id: 'gradient', label: 'Gradient' },
                { id: 'glassmorphism', label: 'Glass' },
                { id: 'image', label: 'Obraz' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => updateFooter(prev => ({ ...prev, background: { ...prev.background, type: t.id as any } }))}
                  className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all ${
                    footer.background.type === t.id
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* COLOR */}
            {footer.background.type === 'color' && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <label className="block text-xs font-medium text-slate-300">Kolor tła</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={footer.background.color || '#090d16'}
                    onChange={(e) => updateFooter(prev => ({ ...prev, background: { ...prev.background, color: e.target.value } }))}
                    className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={footer.background.color || '#090d16'}
                    onChange={(e) => updateFooter(prev => ({ ...prev, background: { ...prev.background, color: e.target.value } }))}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white uppercase font-mono"
                  />
                </div>
              </div>
            )}

            {/* GRADIENT */}
            {footer.background.type === 'gradient' && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Kąt nachylenia ({footer.background.gradient.angle || 180}°)</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={footer.background.gradient.angle || 180}
                    onChange={(e) => updateFooter(prev => ({
                      ...prev,
                      background: {
                        ...prev.background,
                        gradient: { ...prev.background.gradient, angle: parseInt(e.target.value) }
                      }
                    }))}
                    className="w-28"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-medium text-slate-300 block">Kolory gradientu</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={footer.background.gradient.colors[0] || '#0f172a'}
                      onChange={(e) => {
                        const newColors = [...footer.background.gradient.colors];
                        newColors[0] = e.target.value;
                        updateFooter(prev => ({
                          ...prev,
                          background: { ...prev.background, gradient: { ...prev.background.gradient, colors: newColors } }
                        }));
                      }}
                      className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <span className="text-xs text-slate-500">do</span>
                    <input
                      type="color"
                      value={footer.background.gradient.colors[1] || '#030712'}
                      onChange={(e) => {
                        const newColors = [...footer.background.gradient.colors];
                        newColors[1] = e.target.value;
                        updateFooter(prev => ({
                          ...prev,
                          background: { ...prev.background, gradient: { ...prev.background.gradient, colors: newColors } }
                        }));
                      }}
                      className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* GLASSMORPHISM */}
            {footer.background.type === 'glassmorphism' && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Siła Rozmycia (Blur: {footer.background.glassmorphism.blurPx}px)</span>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={footer.background.glassmorphism.blurPx}
                    onChange={(e) => updateFooter(prev => ({
                      ...prev,
                      background: {
                        ...prev.background,
                        glassmorphism: { ...prev.background.glassmorphism, blurPx: parseInt(e.target.value) }
                      }
                    }))}
                    className="w-28"
                  />
                </div>
              </div>
            )}

            {/* IMAGE */}
            {footer.background.type === 'image' && (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                <label className="block text-xs font-medium text-slate-300">URL Obrazu w tle</label>
                <input
                  type="text"
                  value={footer.background.image.url}
                  onChange={(e) => updateFooter(prev => ({
                    ...prev,
                    background: {
                      ...prev.background,
                      image: { ...prev.background.image, url: e.target.value }
                    }
                  }))}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            )}

            {/* OVERLAY (Punkt 9) */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Nakładka Przyciemniająca (Overlay)</span>
                <input
                  type="checkbox"
                  checked={footer.overlay.enabled}
                  onChange={(e) => updateFooter(prev => ({
                    ...prev,
                    overlay: { ...prev.overlay, enabled: e.target.checked }
                  }))}
                  className="rounded border-slate-700 text-blue-600 focus:ring-blue-500"
                />
              </div>
              {footer.overlay.enabled && (
                <div className="space-y-2 pt-2 border-t border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Przezroczystość ({footer.overlay.opacity}%)</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={footer.overlay.opacity}
                      onChange={(e) => updateFooter(prev => ({
                        ...prev,
                        overlay: { ...prev.overlay, opacity: parseInt(e.target.value) }
                      }))}
                      className="w-28"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: RAMKA & CIEŃ (Punkty 10, 11) */}
        {/* ============================================================ */}
        {activeConfigTab === 'border_shadow' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Obramowanie & Cień</h3>
              <p className="text-[11px] text-slate-400">Górna krawędź oddzielająca stopkę od treści oraz cienie</p>
            </div>

            {/* Border settings */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <span className="text-xs font-semibold text-white block">Górna Ramka (Border Top)</span>
              <div className="grid grid-cols-3 gap-2">
                {['none', 'solid', 'dashed'].map(st => (
                  <button
                    key={st}
                    onClick={() => updateFooter(prev => ({ ...prev, border: { ...prev.border, style: st as any } }))}
                    className={`p-2 rounded-xl border text-xs capitalize text-center ${
                      footer.border.style === st
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                    }`}
                  >
                    {st === 'none' ? 'Brak' : st === 'solid' ? 'Ciągła' : 'Kreskowana'}
                  </button>
                ))}
              </div>

              {footer.border.style !== 'none' && (
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="color"
                    value={footer.border.color.startsWith('#') ? footer.border.color : '#3b82f6'}
                    onChange={(e) => updateFooter(prev => ({ ...prev, border: { ...prev.border, color: e.target.value } }))}
                    className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Grubość: {footer.border.width.top}px</span>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={footer.border.width.top}
                      onChange={(e) => updateFooter(prev => ({
                        ...prev,
                        border: { ...prev.border, width: { ...prev.border.width, top: parseInt(e.target.value) } }
                      }))}
                      className="w-28"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Shadow Presets */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <span className="text-xs font-semibold text-white block">Cień Stopki (Box Shadow)</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'Brak' },
                  { id: 'md', label: 'Średni' },
                  { id: 'xl', label: 'Głęboki' },
                  { id: 'glow', label: 'Poświata Neon' }
                ].map(sh => (
                  <button
                    key={sh.id}
                    onClick={() => updateFooter(prev => ({ ...prev, shadow: { ...prev.shadow, preset: sh.id as any } }))}
                    className={`p-2 rounded-xl border text-xs text-center ${
                      footer.shadow.preset === sh.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                    }`}
                  >
                    {sh.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: UKŁAD KOLUMN (Punkty 12, 16) */}
        {/* ============================================================ */}
        {activeConfigTab === 'layout' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Układ & Siatka Kolumn</h3>
              <p className="text-[11px] text-slate-400">Liczba kolumn i odstępy między sekcjami w stopce</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <label className="block text-xs font-medium text-slate-300">Liczba kolumn na ekranie Desktop</label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 4, 5].map(cols => (
                  <button
                    key={cols}
                    onClick={() => updateFooter(prev => ({
                      ...prev,
                      layout: { ...prev.layout, columnsCountDesktop: cols }
                    }))}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center ${
                      footer.layout.columnsCountDesktop === cols
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                    }`}
                  >
                    {cols} Kolumny
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-300">Odstęp Poziomy (Gap X: {footer.layout.gapDesktopX}px)</span>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={footer.layout.gapDesktopX}
                  onChange={(e) => updateFooter(prev => ({
                    ...prev,
                    layout: { ...prev.layout, gapDesktopX: parseInt(e.target.value) }
                  }))}
                  className="w-28"
                />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                <span className="text-xs font-medium text-slate-300">Odstęp Pionowy (Gap Y: {footer.layout.gapDesktopY}px)</span>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={footer.layout.gapDesktopY}
                  onChange={(e) => updateFooter(prev => ({
                    ...prev,
                    layout: { ...prev.layout, gapDesktopY: parseInt(e.target.value) }
                  }))}
                  className="w-28"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: BRAND & LOGO (Punkty 14, 15) */}
        {/* ============================================================ */}
        {activeConfigTab === 'brand' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Tożsamość & Brand w Stopce</h3>
              <p className="text-[11px] text-slate-400">Prezentacja logo, hasła marki oraz opisu działalności</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Pokaż blok Brandu</span>
                <input
                  type="checkbox"
                  checked={footer.brand.enabled}
                  onChange={(e) => updateFooter(prev => ({
                    ...prev,
                    brand: { ...prev.brand, enabled: e.target.checked }
                  }))}
                  className="rounded border-slate-700 text-blue-600 focus:ring-blue-500"
                />
              </div>

              {footer.brand.enabled && (
                <div className="space-y-3 pt-3 border-t border-slate-700/60">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nazwa Sklepu (Tekst Logo)</label>
                    <input
                      type="text"
                      value={footer.brand.logoText}
                      onChange={(e) => updateFooter(prev => ({ ...prev, brand: { ...prev.brand, logoText: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Slogan / Podtytuł</label>
                    <input
                      type="text"
                      value={footer.brand.tagline || ''}
                      onChange={(e) => updateFooter(prev => ({ ...prev, brand: { ...prev.brand, tagline: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Opis firmy w stopce</label>
                    <textarea
                      rows={3}
                      value={footer.brand.description}
                      onChange={(e) => updateFooter(prev => ({ ...prev, brand: { ...prev.brand, description: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: SEKCJE & LINKI (Punkty 13, 17, 18, 26) */}
        {/* ============================================================ */}
        {activeConfigTab === 'sections' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                  Edycja Kolumny: {currentSection?.title || 'Wybierz sekcję'}
                </h3>
                <p className="text-[11px] text-slate-400">Dodawaj linki, odznaki promocyjne i ustawienia nagłówka</p>
              </div>
              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nowa Kolumna</span>
              </button>
            </div>

            {currentSection && (
              <div className="space-y-4">
                {/* Title */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-medium">Tytuł Kolumny</label>
                    <input
                      type="text"
                      value={currentSection.title}
                      onChange={(e) => updateFooter(prev => ({
                        ...prev,
                        sections: prev.sections.map(s => s.id === currentSection.id ? { ...s, title: e.target.value } : s)
                      }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-semibold"
                    />
                  </div>
                </div>

                {/* Links list */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Lista Odnośników ({currentSection.links?.length || 0})</span>
                    <button
                      onClick={handleAddLinkToCurrentSection}
                      className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Dodaj Link</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentSection.links?.map((link, idx) => (
                      <div key={link.id} className="p-3 bg-slate-900/80 border border-slate-700/70 rounded-xl space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={link.text}
                            onChange={(e) => handleUpdateLink(link.id, { text: e.target.value })}
                            placeholder="Tekst linku"
                            className="flex-1 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white font-medium"
                          />
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                            placeholder="/adres-url"
                            className="flex-1 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[11px] text-slate-300 font-mono"
                          />
                          <input
                            type="text"
                            value={link.badgeText || ''}
                            onChange={(e) => handleUpdateLink(link.id, { badgeText: e.target.value })}
                            placeholder="Odznaka (HIT)"
                            className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[11px] text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 7: NEWSLETTER (Punkt 22) */}
        {/* ============================================================ */}
        {activeConfigTab === 'newsletter' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Newsletter VIP w Stopce</h3>
              <p className="text-[11px] text-slate-400">Konfiguracja pola zapisu, zachęty rabatowej i wyglądu formularza</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Włącz Moduł Newslettera</span>
                <input
                  type="checkbox"
                  checked={footer.newsletter.enabled}
                  onChange={(e) => updateFooter(prev => ({
                    ...prev,
                    newsletter: { ...prev.newsletter, enabled: e.target.checked }
                  }))}
                  className="rounded border-slate-700 text-blue-600 focus:ring-blue-500"
                />
              </div>

              {footer.newsletter.enabled && (
                <div className="space-y-3 pt-3 border-t border-slate-700/60">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Nagłówek</label>
                    <input
                      type="text"
                      value={footer.newsletter.title}
                      onChange={(e) => updateFooter(prev => ({ ...prev, newsletter: { ...prev.newsletter, title: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Podtytuł / Zachęta</label>
                    <input
                      type="text"
                      value={footer.newsletter.subtitle}
                      onChange={(e) => updateFooter(prev => ({ ...prev, newsletter: { ...prev.newsletter, subtitle: e.target.value } }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Tekst Przycisku</label>
                      <input
                        type="text"
                        value={footer.newsletter.buttonText}
                        onChange={(e) => updateFooter(prev => ({ ...prev, newsletter: { ...prev.newsletter, buttonText: e.target.value } }))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Kolor Przycisku</label>
                      <input
                        type="color"
                        value={footer.newsletter.buttonBgColor || '#2563eb'}
                        onChange={(e) => updateFooter(prev => ({ ...prev, newsletter: { ...prev.newsletter, buttonBgColor: e.target.value } }))}
                        className="w-full h-9 bg-transparent border-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 8: SOCIAL MEDIA (Punkt 21) */}
        {/* ============================================================ */}
        {activeConfigTab === 'socialMedia' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Social Media</h3>
              <p className="text-[11px] text-slate-400">Ikony profili społecznościowych, kolory i efekty hover</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <span className="text-xs font-semibold text-white block">Kształt Ikon</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rounded', label: 'Zaokrąglone' },
                  { id: 'circle', label: 'Okrągłe' },
                  { id: 'pill', label: 'Pigułka z tekstem' }
                ].map(st => (
                  <button
                    key={st.id}
                    onClick={() => updateFooter(prev => ({ ...prev, socialMedia: { ...prev.socialMedia, style: st.id as any } }))}
                    className={`p-2 rounded-xl border text-xs text-center ${
                      footer.socialMedia.style === st.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 9: PŁATNOŚCI & CERTYFIKATY (Punkty 23, 24) */}
        {/* ============================================================ */}
        {activeConfigTab === 'payments' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Płatności & Odznaki Zaufania</h3>
              <p className="text-[11px] text-slate-400">Obsługiwane bramki płatnicze oraz certyfikaty bezpieczeństwa</p>
            </div>

            {/* Payments */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Sekcja Metod Płatności</span>
                <input
                  type="checkbox"
                  checked={footer.payments.enabled}
                  onChange={(e) => updateFooter(prev => ({ ...prev, payments: { ...prev.payments, enabled: e.target.checked } }))}
                  className="rounded border-slate-700 text-blue-600 focus:ring-blue-500"
                />
              </div>

              {footer.payments.enabled && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/60">
                  {footer.payments.methods.map(method => (
                    <button
                      key={method.id}
                      onClick={() => updateFooter(prev => ({
                        ...prev,
                        payments: {
                          ...prev.payments,
                          methods: prev.payments.methods.map(m => m.id === method.id ? { ...m, enabled: !m.enabled } : m)
                        }
                      }))}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                        method.enabled
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-500'
                      }`}
                    >
                      <span>{method.label}</span>
                      {method.enabled && <Check className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 10: DOLNY PASEK & COPYRIGHT (Punkt 25) */}
        {/* ============================================================ */}
        {activeConfigTab === 'bottomBar' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Dolny Pasek (Bottom Bar)</h3>
              <p className="text-[11px] text-slate-400">Prawa autorskie, nota prawna oraz odnośniki do regulaminów</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nazwa Podmiotu Prawnego</label>
                <input
                  type="text"
                  value={footer.bottomBar.storeName}
                  onChange={(e) => updateFooter(prev => ({ ...prev, bottomBar: { ...prev.bottomBar, storeName: e.target.value } }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Tekst Praw Autorskich</label>
                <input
                  type="text"
                  value={footer.bottomBar.copyrightText}
                  onChange={(e) => updateFooter(prev => ({ ...prev, bottomBar: { ...prev.bottomBar, copyrightText: e.target.value } }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 11: RESPONSYWNOŚĆ & MOBILE (Punkty 31, 32) */}
        {/* ============================================================ */}
        {activeConfigTab === 'responsive' && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">Zachowanie na Smartfonach</h3>
              <p className="text-[11px] text-slate-400">Tryb akordeonu dla kolumn linków i optymalizacja dotykowa</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <span className="text-xs font-semibold text-white block">Tryb Układu na Telefonach</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'accordion', label: 'Akordeon (Zwijane kolumny)' },
                  { id: 'single_column', label: 'Jedna długa kolumna' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => updateFooter(prev => ({
                      ...prev,
                      responsive: {
                        ...prev.responsive,
                        mobile: { ...prev.responsive.mobile, layoutMode: mode.id as any }
                      }
                    }))}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left ${
                      footer.responsive?.mobile?.layoutMode === mode.id
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
