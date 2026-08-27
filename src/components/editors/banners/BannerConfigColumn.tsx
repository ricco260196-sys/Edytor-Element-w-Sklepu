import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  BannerInstance,
  BannerPresetStyleName,
  BannerShapePreset,
  BannerImageTextLayout
} from '../../../types/bannerEditor';
import { BANNER_STYLE_PRESETS } from '../../../data/defaultBanners';
import {
  Sliders,
  Type,
  Maximize,
  Palette,
  Image as ImageIcon,
  MousePointerClick,
  Sparkles,
  Move,
  RotateCcw,
  Copy,
  Check,
  Layout,
  Layers,
  ChevronDown,
  ChevronUp,
  Eye,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

interface BannerConfigColumnProps {
  onOpenMainSliderModal: () => void;
}

type ConfigTab = 'content' | 'shape_size' | 'bg_border' | 'image_layout' | 'typo_cta' | 'effects_spacing';

const SAMPLE_IMAGE_PRESETS = [
  { label: 'Elegancja Moda', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Smartfony & Tech', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Audio & Słuchawki', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Wnętrza & Dom', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Zegarki & Luksus', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80' },
  { label: 'Kosmetyki & Spa', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80' }
];

export const BannerConfigColumn: React.FC<BannerConfigColumnProps> = ({
  onOpenMainSliderModal
}) => {
  const {
    state,
    selectedBannerId,
    updateBanner,
    resetBanner,
    applyBannerPreset,
    copyBannerStyle,
    pasteBannerStyle,
    bannerClipboardStyle
  } = useStoreAppearance();

  const [activeTab, setActiveTab] = useState<ConfigTab>('content');
  const [showImageLibrary, setShowImageLibrary] = useState(false);

  const banners = state.banners?.items || [];
  const currentBanner = banners.find(b => b.id === selectedBannerId) || banners[0];

  if (!currentBanner) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>Wybierz element z listy po lewej stronie, aby edytować jego styl.</p>
      </div>
    );
  }

  const isMainSlider = currentBanner.type === 'main_slider_preview' || currentBanner.isSystemMainSlider;

  // Handler helpers
  const handleUpdate = (updater: Partial<BannerInstance> | ((prev: BannerInstance) => BannerInstance)) => {
    updateBanner(currentBanner.id, updater);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/95 text-slate-200 border-l border-slate-800">
      {/* 1. TOP ELEMENT IDENTIFIER & PRESETS BAR */}
      <div className="p-4 border-b border-slate-800 space-y-3 shrink-0 bg-slate-950/60">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider block">
              Wybrany element do konfiguracji:
            </span>
            <h2 className="text-sm font-bold text-white truncate">
              {currentBanner.displayName || currentBanner.name}
            </h2>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              title="Kopiuj styl wizualny tego elementu"
              onClick={() => copyBannerStyle(currentBanner.id)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              title="Wklej skopiowany styl"
              disabled={!bannerClipboardStyle}
              onClick={() => pasteBannerStyle(currentBanner.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                bannerClipboardStyle
                  ? 'bg-blue-600/30 text-blue-300 hover:bg-blue-600/50 border border-blue-500/40'
                  : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              title="Przywróć domyślny styl elementu"
              onClick={() => resetBanner(currentBanner.id, 'all')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Style Presets Selector */}
        {!isMainSlider && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-slate-300">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Gotowe style (Presety):</span>
              </span>
              <span className="text-[10px] text-slate-500">1-kliknięcie</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
              {(Object.keys(BANNER_STYLE_PRESETS) as BannerPresetStyleName[]).map(presetKey => {
                const p = BANNER_STYLE_PRESETS[presetKey];
                const isActive = currentBanner.activePreset === presetKey;
                return (
                  <button
                    key={presetKey}
                    type="button"
                    onClick={() => applyBannerPreset(currentBanner.id, presetKey)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dedicated Main Slider Callout */}
        {isMainSlider && (
          <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
              <Sliders className="w-4 h-4" />
              <span>Dedykowany Edytor Głównego Slidera</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-snug">
              Zgodnie z wymogami projektu, w tym edytorze slider ma jedynie podgląd. Kliknij poniższy przycisk, aby przejść do dedykowanego edytora slajdów.
            </p>
            <button
              type="button"
              onClick={onOpenMainSliderModal}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 active:scale-98 text-white font-bold text-xs shadow transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Otwórz Edytor Głównego Slidera</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. CONFIG CATEGORY TABS */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/40 overflow-x-auto scrollbar-none shrink-0 px-2">
        {[
          { id: 'content', label: 'Treść & Widoczność', icon: Type },
          { id: 'shape_size', label: 'Kształt & Rozmiar', icon: Maximize },
          { id: 'bg_border', label: 'Tło & Obramowanie', icon: Palette },
          { id: 'image_layout', label: 'Obraz & Układ', icon: ImageIcon },
          { id: 'typo_cta', label: 'Typografia & CTA', icon: MousePointerClick },
          { id: 'effects_spacing', label: 'Efekty & Odstępy', icon: Move }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ConfigTab)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. SETTINGS CONTENT PANELS */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: CONTENT & VISIBILITY */}
        {/* ========================================================= */}
        {activeTab === 'content' && (
          <div className="space-y-5">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Type className="w-4 h-4 text-blue-400" />
                <span>Teksty i Hasła Reklamowe</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Tytuł Główny (Nagłówek):
                </label>
                <input
                  type="text"
                  value={currentBanner.content.title}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      content: { ...prev.content, title: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                  placeholder="np. Nowa Kolekcja Wiosna / Lato"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Podtytuł / Opis:
                </label>
                <textarea
                  rows={3}
                  value={currentBanner.content.subtitle}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      content: { ...prev.content, subtitle: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                  placeholder="Krótki tekst zachęcający do zakupu..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Tekst wyróżnika (Dodatkowa korzyść / USP):
                </label>
                <input
                  type="text"
                  value={currentBanner.content.highlightText || ''}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      content: { ...prev.content, highlightText: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                  placeholder="np. Darmowa dostawa od 150 zł &bull; Wysyłka w 24h"
                />
              </div>
            </div>

            {/* Badge & Promo codes */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Odznaka & Kody Rabatowe</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Tekst Odznaki (Badge):
                  </label>
                  <input
                    type="text"
                    value={currentBanner.content.badgeText || ''}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        content: { ...prev.content, badgeText: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                    placeholder="np. HIT SEZONU"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Rabat / Zniżka (%):
                  </label>
                  <input
                    type="text"
                    value={currentBanner.content.discountText || ''}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        content: { ...prev.content, discountText: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                    placeholder="np. -30% RABATU"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kod Rabatowy:
                  </label>
                  <input
                    type="text"
                    value={currentBanner.content.promoCode || ''}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        content: { ...prev.content, promoCode: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:border-blue-500 outline-none"
                    placeholder="np. WIOSNA2026"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kolor tła odznaki:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentBanner.content.badgeBgColor || '#3b82f6'}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          content: { ...prev.content, badgeBgColor: e.target.value }
                        }))
                      }
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentBanner.content.badgeBgColor || '#3b82f6'}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          content: { ...prev.content, badgeBgColor: e.target.value }
                        }))
                      }
                      className="flex-1 px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Visibility Toggles */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Przełączniki Widoczności Elementów</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'showHeader', label: 'Nagłówek (Tytuł)' },
                  { key: 'showSubtitle', label: 'Podtytuł / Opis' },
                  { key: 'showBadge', label: 'Odznaka promocyjna' },
                  { key: 'showCtaButton', label: 'Przycisk akcji (CTA)' },
                  { key: 'showImage', label: 'Obraz graficzny' },
                  { key: 'showCountdown', label: 'Licznik czasu' }
                ].map(item => {
                  const isChecked = (currentBanner.visibility as any)[item.key];
                  return (
                    <label
                      key={item.key}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={e =>
                          handleUpdate(prev => ({
                            ...prev,
                            visibility: {
                              ...prev.visibility,
                              [item.key]: e.target.checked
                            }
                          }))
                        }
                        className="rounded border-slate-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-300 font-medium">{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SHAPE & SIZE */}
        {/* ========================================================= */}
        {activeTab === 'shape_size' && (
          <div className="space-y-5">
            {/* Shape Presets */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Maximize className="w-4 h-4 text-blue-400" />
                <span>Kształt i Zaokrąglenia</span>
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rectangle', label: 'Prostokąt (0px)' },
                  { id: 'rounded', label: 'Zaokrąglony (12px)' },
                  { id: 'card', label: 'Karta (20px)' },
                  { id: 'pill', label: 'Pill / Owal (9999px)' },
                  { id: 'ellipse', label: 'Elipsa (50%)' },
                  { id: 'custom', label: 'Niestandardowy' }
                ].map(shapeItem => {
                  const isSelected = currentBanner.shape.preset === shapeItem.id;
                  return (
                    <button
                      key={shapeItem.id}
                      type="button"
                      onClick={() => {
                        let radius = currentBanner.shape.borderRadius;
                        if (shapeItem.id === 'rectangle') radius = 0;
                        else if (shapeItem.id === 'rounded') radius = 12;
                        else if (shapeItem.id === 'card') radius = 20;
                        else if (shapeItem.id === 'pill') radius = 9999;
                        else if (shapeItem.id === 'ellipse') radius = 50;

                        handleUpdate(prev => ({
                          ...prev,
                          shape: {
                            ...prev.shape,
                            preset: shapeItem.id as BannerShapePreset,
                            borderRadius: radius
                          }
                        }));
                      }}
                      className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/30 text-white border-blue-500 ring-1 ring-blue-500'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {shapeItem.label}
                    </button>
                  );
                })}
              </div>

              {/* Radius slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Promień zaokrąglenia (Border Radius):</span>
                  <span className="font-mono text-blue-400">{currentBanner.shape.borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={48}
                  value={currentBanner.shape.borderRadius}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      shape: {
                        ...prev.shape,
                        borderRadius: parseInt(e.target.value) || 0
                      }
                    }))
                  }
                  className="w-full accent-blue-500"
                />
              </div>

              {/* Individual corners toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentBanner.shape.individualCorners}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        shape: {
                          ...prev.shape,
                          individualCorners: e.target.checked
                        }
                      }))
                    }
                    className="rounded border-slate-700 text-blue-600"
                  />
                  <span>Osobny promień dla każdego narożnika</span>
                </label>

                {currentBanner.shape.individualCorners && (
                  <div className="grid grid-cols-2 gap-2 mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 block">Lewy górny (TL):</span>
                      <input
                        type="number"
                        value={currentBanner.shape.corners.topLeft}
                        onChange={e =>
                          handleUpdate(prev => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: {
                                ...prev.shape.corners,
                                topLeft: parseInt(e.target.value) || 0
                              }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-slate-500 block">Prawy górny (TR):</span>
                      <input
                        type="number"
                        value={currentBanner.shape.corners.topRight}
                        onChange={e =>
                          handleUpdate(prev => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: {
                                ...prev.shape.corners,
                                topRight: parseInt(e.target.value) || 0
                              }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-slate-500 block">Lewy dolny (BL):</span>
                      <input
                        type="number"
                        value={currentBanner.shape.corners.bottomLeft}
                        onChange={e =>
                          handleUpdate(prev => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: {
                                ...prev.shape.corners,
                                bottomLeft: parseInt(e.target.value) || 0
                              }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-slate-500 block">Prawy dolny (BR):</span>
                      <input
                        type="number"
                        value={currentBanner.shape.corners.bottomRight}
                        onChange={e =>
                          handleUpdate(prev => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: {
                                ...prev.shape.corners,
                                bottomRight: parseInt(e.target.value) || 0
                              }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Clip path */}
              <div className="pt-3 border-t border-slate-800">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Styl wycinania konturu (Clip Path):
                </label>
                <select
                  value={currentBanner.shape.clipPath || 'none'}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      shape: {
                        ...prev.shape,
                        clipPath: e.target.value as any
                      }
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="none">Brak (Standardowy)</option>
                  <option value="diagonal_left">Skośny ścięty z lewej</option>
                  <option value="diagonal_right">Skośny ścięty z prawej</option>
                  <option value="polygon_badge">Odznaka / Wstęga</option>
                </select>
              </div>
            </div>

            {/* Size & Dimensions */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layout className="w-4 h-4 text-purple-400" />
                <span>Rozmiar Kontenera</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Tryb szerokości:
                  </label>
                  <select
                    value={currentBanner.size.widthMode}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        size: {
                          ...prev.size,
                          widthMode: e.target.value as any
                        }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="full">100% (Pełna szerokość)</option>
                    <option value="standard_1200">Standardowa (1200px)</option>
                    <option value="wide_1400">Szeroka (1400px)</option>
                    <option value="compact_960">Kompaktowa (960px)</option>
                    <option value="custom">Własna</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Minimalna wysokość (px):
                  </label>
                  <input
                    type="number"
                    value={parseInt(currentBanner.size.minHeight || '200') || 200}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        size: {
                          ...prev.size,
                          minHeight: `${parseInt(e.target.value) || 0}px`
                        }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: BACKGROUND & BORDER */}
        {/* ========================================================= */}
        {activeTab === 'bg_border' && (
          <div className="space-y-5">
            {/* Background type */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4 text-blue-400" />
                <span>Tło Banera</span>
              </h3>

              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'color', label: 'Kolor' },
                  { id: 'gradient', label: 'Gradient' },
                  { id: 'image', label: 'Obraz' },
                  { id: 'transparent', label: 'Przezroczyste' }
                ].map(bgType => (
                  <button
                    key={bgType.id}
                    type="button"
                    onClick={() =>
                      handleUpdate(prev => ({
                        ...prev,
                        background: {
                          ...prev.background,
                          type: bgType.id as any
                        }
                      }))
                    }
                    className={`p-2 rounded-lg text-xs font-medium text-center border cursor-pointer ${
                      currentBanner.background.type === bgType.id
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {bgType.label}
                  </button>
                ))}
              </div>

              {currentBanner.background.type === 'color' && (
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kolor tła:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentBanner.background.color}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          background: {
                            ...prev.background,
                            color: e.target.value
                          }
                        }))
                      }
                      className="w-9 h-9 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentBanner.background.color}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          background: {
                            ...prev.background,
                            color: e.target.value
                          }
                        }))
                      }
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              )}

              {currentBanner.background.type === 'gradient' && (
                <div className="space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-400 block mb-1">Kolor 1 (Początkowy):</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentBanner.background.gradient?.color1 || '#0f172a'}
                          onChange={e =>
                            handleUpdate(prev => ({
                              ...prev,
                              background: {
                                ...prev.background,
                                gradient: {
                                  ...prev.background.gradient!,
                                  color1: e.target.value
                                }
                              }
                            }))
                          }
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent"
                        />
                        <span className="font-mono text-slate-300">
                          {currentBanner.background.gradient?.color1}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1">Kolor 2 (Końcowy):</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={currentBanner.background.gradient?.color2 || '#1e293b'}
                          onChange={e =>
                            handleUpdate(prev => ({
                              ...prev,
                              background: {
                                ...prev.background,
                                gradient: {
                                  ...prev.background.gradient!,
                                  color2: e.target.value
                                }
                              }
                            }))
                          }
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent"
                        />
                        <span className="font-mono text-slate-300">
                          {currentBanner.background.gradient?.color2}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Kierunek gradientu:</label>
                    <select
                      value={currentBanner.background.gradient?.direction || '135deg'}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          background: {
                            ...prev.background,
                            gradient: {
                              ...prev.background.gradient!,
                              direction: e.target.value
                            }
                          }
                        }))
                      }
                      className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-white"
                    >
                      <option value="135deg">Po przekątnej (135°)</option>
                      <option value="90deg">W poziomie (90° Lewo -&gt; Prawo)</option>
                      <option value="180deg">W pionie (180° Góra -&gt; Dół)</option>
                      <option value="45deg">Kąt ostry (45°)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Overlay */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Warstwa Nakładki (Overlay)</span>
                </h3>
                <input
                  type="checkbox"
                  checked={currentBanner.overlay.enabled}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      overlay: {
                        ...prev.overlay,
                        enabled: e.target.checked
                      }
                    }))
                  }
                  className="rounded border-slate-700 text-blue-600"
                />
              </div>

              {currentBanner.overlay.enabled && (
                <div className="space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span>Krycie nakładki (Opacity):</span>
                      <span className="font-mono text-cyan-400">{currentBanner.overlay.opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={currentBanner.overlay.opacity}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          overlay: {
                            ...prev.overlay,
                            opacity: parseInt(e.target.value) || 0
                          }
                        }))
                      }
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Kolor nakładki:</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={currentBanner.overlay.color}
                        onChange={e =>
                          handleUpdate(prev => ({
                            ...prev,
                            overlay: {
                              ...prev.overlay,
                              color: e.target.value
                            }
                          }))
                        }
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent"
                      />
                      <input
                        type="text"
                        value={currentBanner.overlay.color}
                        onChange={e =>
                          handleUpdate(prev => ({
                            ...prev,
                            overlay: {
                              ...prev.overlay,
                              color: e.target.value
                            }
                          }))
                        }
                        className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Border & Shadow */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <span>Obramowanie i Cień</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Styl obramowania:
                  </label>
                  <select
                    value={currentBanner.border.style}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        border: {
                          ...prev.border,
                          style: e.target.value as any
                        }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="none">Brak ramki</option>
                    <option value="solid">Linia ciągła (Solid)</option>
                    <option value="dashed">Kreskowana (Dashed)</option>
                    <option value="dotted">Kropkowana (Dotted)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Grubość ramki (px):
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={currentBanner.border.width}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        border: {
                          ...prev.border,
                          width: parseInt(e.target.value) || 0
                        }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Efekt cienia (Shadow Preset):
                </label>
                <select
                  value={currentBanner.shadow.preset}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      shadow: {
                        ...prev.shadow,
                        enabled: e.target.value !== 'none',
                        preset: e.target.value as any
                      }
                    }))
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="none">Brak cienia</option>
                  <option value="sm">Lekki cień (SM)</option>
                  <option value="md">Średni cień (MD)</option>
                  <option value="lg">Głęboki cień (LG)</option>
                  <option value="xl">Bardzo głęboki (XL)</option>
                  <option value="glow">Poświata (Glow)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: IMAGE & LAYOUT */}
        {/* ========================================================= */}
        {activeTab === 'image_layout' && (
          <div className="space-y-5">
            {/* Image URL & Gallery */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span>Grafika Banera</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowImageLibrary(prev => !prev)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>{showImageLibrary ? 'Ukryj galerię' : 'Wybierz z biblioteki'}</span>
                </button>
              </div>

              {showImageLibrary && (
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                  {SAMPLE_IMAGE_PRESETS.map((sample, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        handleUpdate(prev => ({
                          ...prev,
                          image: { ...prev.image, url: sample.url }
                        }));
                        setShowImageLibrary(false);
                      }}
                      className="group relative h-16 rounded-lg overflow-hidden border border-slate-800 hover:border-blue-500 cursor-pointer"
                    >
                      <img src={sample.url} alt={sample.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center p-1 text-center">
                        <span className="text-[10px] font-bold text-white group-hover:text-blue-300">
                          {sample.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Adres URL zdjęcia:
                </label>
                <input
                  type="text"
                  value={currentBanner.image.url || ''}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      image: { ...prev.image, url: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:border-blue-500 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Dopasowanie (Object Fit):
                  </label>
                  <select
                    value={currentBanner.image.objectFit}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        image: { ...prev.image, objectFit: e.target.value as any }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="cover">Cover (Wypełnij kadr)</option>
                    <option value="contain">Contain (Cały obraz)</option>
                    <option value="fill">Fill (Rozciągnij)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Proporcje (Aspect Ratio):
                  </label>
                  <select
                    value={currentBanner.image.aspectRatio}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        image: { ...prev.image, aspectRatio: e.target.value as any }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="16:9">16:9 (Panoramiczny)</option>
                    <option value="4:3">4:3 (Standard)</option>
                    <option value="1:1">1:1 (Kwadrat)</option>
                    <option value="21:9">21:9 (Ultraszeroki)</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image Effects Sliders */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Filtry i Efekty Graficzne</span>
              </h3>

              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Skala szarości (Grayscale):</span>
                    <span className="font-mono text-amber-400">{currentBanner.image.effects.grayscale}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={currentBanner.image.effects.grayscale}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        image: {
                          ...prev.image,
                          effects: {
                            ...prev.image.effects,
                            grayscale: parseInt(e.target.value) || 0
                          }
                        }
                      }))
                    }
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Jasność (Brightness):</span>
                    <span className="font-mono text-amber-400">{currentBanner.image.effects.brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={150}
                    value={currentBanner.image.effects.brightness}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        image: {
                          ...prev.image,
                          effects: {
                            ...prev.image.effects,
                            brightness: parseInt(e.target.value) || 100
                          }
                        }
                      }))
                    }
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Layout Direction (Image + Text) */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layout className="w-4 h-4 text-purple-400" />
                <span>Układ: Obrazek + Opis</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'image_left', label: 'Obraz z LEWEJ' },
                  { id: 'image_right', label: 'Obraz z PRAWEJ' },
                  { id: 'image_top', label: 'Obraz na GÓRZE' },
                  { id: 'image_bottom', label: 'Obraz na DOLE' }
                ].map(layoutOpt => (
                  <button
                    key={layoutOpt.id}
                    type="button"
                    onClick={() =>
                      handleUpdate(prev => ({
                        ...prev,
                        layout: {
                          ...prev.layout,
                          direction: layoutOpt.id as BannerImageTextLayout
                        }
                      }))
                    }
                    className={`p-2 rounded-lg text-xs font-medium text-center border cursor-pointer ${
                      currentBanner.layout.direction === layoutOpt.id
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {layoutOpt.label}
                  </button>
                ))}
              </div>

              {/* Proportion slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Proporcja szerokości obrazu (%):</span>
                  <span className="font-mono text-purple-400">{currentBanner.layout.imageProportion}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={75}
                  value={currentBanner.layout.imageProportion}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      layout: {
                        ...prev.layout,
                        imageProportion: parseInt(e.target.value) || 50
                      }
                    }))
                  }
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: TYPOGRAPHY & CTA */}
        {/* ========================================================= */}
        {activeTab === 'typo_cta' && (
          <div className="space-y-5">
            {/* Title Typography */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Type className="w-4 h-4 text-blue-400" />
                <span>Typografia Tytułu</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Rozmiar fontu (px):
                  </label>
                  <input
                    type="number"
                    min={14}
                    max={64}
                    value={currentBanner.typography.title.fontSize}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        typography: {
                          ...prev.typography,
                          title: {
                            ...prev.typography.title,
                            fontSize: parseInt(e.target.value) || 24
                          }
                        }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Wyrównanie tekstu:
                  </label>
                  <select
                    value={currentBanner.typography.title.textAlign}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        typography: {
                          ...prev.typography,
                          title: {
                            ...prev.typography.title,
                            textAlign: e.target.value as any
                          }
                        }
                      }))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="left">Do lewej</option>
                    <option value="center">Wyśrodkowany</option>
                    <option value="right">Do prawej</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Kolor tytułu:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentBanner.typography.title.color}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        typography: {
                          ...prev.typography,
                          title: {
                            ...prev.typography.title,
                            color: e.target.value
                          }
                        }
                      }))
                    }
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent"
                  />
                  <input
                    type="text"
                    value={currentBanner.typography.title.color}
                    onChange={e =>
                      handleUpdate(prev => ({
                        ...prev,
                        typography: {
                          ...prev.typography,
                          title: {
                            ...prev.typography.title,
                            color: e.target.value
                          }
                        }
                      }))
                    }
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                  />
                </div>
              </div>
            </div>

            {/* CTA Button Configuration */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-emerald-400" />
                <span>Przycisk Akcji (CTA)</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Etykieta przycisku:
                </label>
                <input
                  type="text"
                  value={currentBanner.cta.text}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      cta: { ...prev.cta, text: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:border-blue-500 outline-none"
                  placeholder="np. Kup Teraz / Sprawdź"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kolor tła przycisku:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentBanner.cta.appearance.bgColor}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          cta: {
                            ...prev.cta,
                            appearance: {
                              ...prev.cta.appearance,
                              bgColor: e.target.value
                            }
                          }
                        }))
                      }
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent"
                    />
                    <input
                      type="text"
                      value={currentBanner.cta.appearance.bgColor}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          cta: {
                            ...prev.cta,
                            appearance: {
                              ...prev.cta.appearance,
                              bgColor: e.target.value
                            }
                          }
                        }))
                      }
                      className="flex-1 px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Kolor tekstu CTA:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentBanner.cta.appearance.textColor}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          cta: {
                            ...prev.cta,
                            appearance: {
                              ...prev.cta.appearance,
                              textColor: e.target.value
                            }
                          }
                        }))
                      }
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent"
                    />
                    <input
                      type="text"
                      value={currentBanner.cta.appearance.textColor}
                      onChange={e =>
                        handleUpdate(prev => ({
                          ...prev,
                          cta: {
                            ...prev.cta,
                            appearance: {
                              ...prev.cta.appearance,
                              textColor: e.target.value
                            }
                          }
                        }))
                      }
                      className="flex-1 px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Zaokrąglenie przycisku (Border Radius):
                </label>
                <input
                  type="range"
                  min={0}
                  max={32}
                  value={currentBanner.cta.appearance.borderRadius}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      cta: {
                        ...prev.cta,
                        appearance: {
                          ...prev.cta.appearance,
                          borderRadius: parseInt(e.target.value) || 0
                        }
                      }
                    }))
                  }
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: EFFECTS, SPACING & RESET */}
        {/* ========================================================= */}
        {activeTab === 'effects_spacing' && (
          <div className="space-y-5">
            {/* Hover Effects */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Efekty po Najechaniu (Hover)</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Brak efektu' },
                  { id: 'zoom_image', label: 'Zoom zdjęcia' },
                  { id: 'lift', label: 'Uniesienie w górę' },
                  { id: 'glow', label: 'Poświata (Glow)' }
                ].map(hoverOpt => (
                  <button
                    key={hoverOpt.id}
                    type="button"
                    onClick={() =>
                      handleUpdate(prev => ({
                        ...prev,
                        hover: {
                          ...prev.hover,
                          effect: hoverOpt.id as any
                        }
                      }))
                    }
                    className={`p-2 rounded-lg text-xs font-medium text-center border cursor-pointer ${
                      currentBanner.hover.effect === hoverOpt.id
                        ? 'bg-amber-600/30 text-amber-300 border-amber-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {hoverOpt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Padding & Spacing */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Move className="w-4 h-4 text-blue-400" />
                <span>Odstępy Wewnętrzne i Marginesy</span>
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Wypełnienie wewnętrzne (Padding):</span>
                  <span className="font-mono text-blue-400">{currentBanner.spacing.padding.top}px</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={48}
                  value={currentBanner.spacing.padding.top}
                  onChange={e => {
                    const val = parseInt(e.target.value) || 16;
                    handleUpdate(prev => ({
                      ...prev,
                      spacing: {
                        ...prev.spacing,
                        padding: { top: val, bottom: val, left: val, right: val }
                      }
                    }));
                  }}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Odstęp między elementami (Gap):</span>
                  <span className="font-mono text-blue-400">{currentBanner.spacing.gap}px</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={36}
                  value={currentBanner.spacing.gap}
                  onChange={e =>
                    handleUpdate(prev => ({
                      ...prev,
                      spacing: {
                        ...prev.spacing,
                        gap: parseInt(e.target.value) || 16
                      }
                    }))
                  }
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Section Resets */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 text-rose-400">
                <RotateCcw className="w-4 h-4" />
                <span>Szybkie Resetowanie Sekcji</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => resetBanner(currentBanner.id, 'shape')}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  Resetuj Kształt
                </button>
                <button
                  type="button"
                  onClick={() => resetBanner(currentBanner.id, 'background')}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  Resetuj Tło
                </button>
                <button
                  type="button"
                  onClick={() => resetBanner(currentBanner.id, 'typography')}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  Resetuj Fonty
                </button>
                <button
                  type="button"
                  onClick={() => resetBanner(currentBanner.id, 'all')}
                  className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs font-bold cursor-pointer"
                >
                  Resetuj Cały Element
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
