import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  WidgetInstance,
  WidgetShapePreset,
  WidgetBgType,
  WidgetBorderStyle,
  WidgetShadowPreset
} from '../../../types/widgetEditor';
import {
  Square,
  Maximize,
  Layout,
  Paintbrush,
  Shield,
  Sun,
  Type,
  Move,
  MousePointer,
  Play,
  Smartphone,
  Layers,
  FileText,
  RotateCcw,
  Copy,
  ChevronDown,
  ChevronRight,
  Sliders,
  Zap
} from 'lucide-react';

export const WidgetsConfigColumn: React.FC = () => {
  const {
    state,
    selectedWidgetId,
    updateWidget,
    resetWidget,
    copyWidgetStyle
  } = useStoreAppearance();

  const [activeSection, setActiveSection] = useState<string>('content');

  const widgetsList: WidgetInstance[] = state.widgets?.widgets || [];
  const selectedWidget = widgetsList.find((w) => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-500">
        <Sliders className="w-8 h-8 mb-3 text-slate-600" />
        <h4 className="text-sm font-bold text-slate-300 mb-1">Wybierz widżet do edycji</h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Kliknij na dowolny widżet w lewym panelu lub bezpośrednio na podglądzie, aby dostosować jego parametry.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950/70 border-l border-slate-800/80 select-none">
      {/* Widget Header & Title */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            Panel Edycji Wyglądu
          </span>
          <h3 className="text-sm font-bold text-white truncate">
            {selectedWidget.displayName || selectedWidget.name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => copyWidgetStyle(selectedWidget.id)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Kopiuj styl wizualny tego widżetu"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => resetWidget(selectedWidget.id, 'all')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
            title="Resetuj wszystkie właściwości widżetu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Accordion / Tabbed Navigation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* SECTION 1: CONTENT */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'content' ? '' : 'content')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white bg-slate-900/60"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>1. Treść, Tytuł i Odznaki</span>
            </div>
            {activeSection === 'content' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'content' && (
            <div className="p-4 space-y-3.5 border-t border-slate-800/60 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Nazwa widżetu w edytorze
                </label>
                <input
                  type="text"
                  value={selectedWidget.displayName}
                  onChange={(e) => updateWidget(selectedWidget.id, { displayName: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Tytuł nagłówka widżetu
                </label>
                <input
                  type="text"
                  value={selectedWidget.content.title || ''}
                  onChange={(e) =>
                    updateWidget(selectedWidget.id, (prev) => ({
                      ...prev,
                      content: { ...prev.content, title: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Podtytuł / Opis wprowadzający
                </label>
                <input
                  type="text"
                  value={selectedWidget.content.subtitle || ''}
                  onChange={(e) =>
                    updateWidget(selectedWidget.id, (prev) => ({
                      ...prev,
                      content: { ...prev.content, subtitle: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Tekst odznaki (Badge / Pill)
                </label>
                <input
                  type="text"
                  value={selectedWidget.content.badgeText || ''}
                  onChange={(e) =>
                    updateWidget(selectedWidget.id, (prev) => ({
                      ...prev,
                      content: { ...prev.content, badgeText: e.target.value }
                    }))
                  }
                  placeholder="np. HIT DNIA, OKAZJA, -20%"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Tekst przycisku akcji
                </label>
                <input
                  type="text"
                  value={selectedWidget.button.text || ''}
                  onChange={(e) =>
                    updateWidget(selectedWidget.id, (prev) => ({
                      ...prev,
                      button: { ...prev.button, text: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: SHAPE */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'shape' ? '' : 'shape')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white bg-slate-900/60"
          >
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-blue-400" />
              <span>2. Kształt i Zaokrąglenia</span>
            </div>
            {activeSection === 'shape' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'shape' && (
            <div className="p-4 space-y-3.5 border-t border-slate-800/60 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  Preset kształtu
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['rectangle', 'rounded_rectangle', 'heavy_rounded', 'pill', 'card', 'custom'] as WidgetShapePreset[]).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          shape: {
                            ...prev.shape,
                            preset: preset,
                            borderRadius:
                              preset === 'rectangle' ? 0 : preset === 'pill' ? 9999 : preset === 'heavy_rounded' ? 32 : preset === 'rounded_rectangle' ? 16 : 8
                          }
                        }))
                      }
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold capitalize transition-all ${
                        selectedWidget.shape.preset === preset
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {preset.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-400">
                    Promień zaokrąglenia (Border Radius)
                  </label>
                  <span className="text-xs font-mono text-blue-400">
                    {selectedWidget.shape.borderRadius}px
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={selectedWidget.shape.borderRadius}
                  onChange={(e) =>
                    updateWidget(selectedWidget.id, (prev) => ({
                      ...prev,
                      shape: { ...prev.shape, borderRadius: parseInt(e.target.value) }
                    }))
                  }
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={selectedWidget.shape.individualCorners || false}
                    onChange={(e) =>
                      updateWidget(selectedWidget.id, (prev) => ({
                        ...prev,
                        shape: { ...prev.shape, individualCorners: e.target.checked }
                      }))
                    }
                    className="rounded accent-blue-600"
                  />
                  <span className="text-[11px] font-semibold text-slate-300">
                    Indywidualne zaokrąglenie każdego rogu
                  </span>
                </label>

                {selectedWidget.shape.individualCorners && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <span className="text-[10px] text-slate-500">Lewy Górny:</span>
                      <input
                        type="number"
                        min="0"
                        max="64"
                        value={selectedWidget.shape.corners.topLeft}
                        onChange={(e) =>
                          updateWidget(selectedWidget.id, (prev) => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: { ...prev.shape.corners, topLeft: parseInt(e.target.value) || 0 }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Prawy Górny:</span>
                      <input
                        type="number"
                        min="0"
                        max="64"
                        value={selectedWidget.shape.corners.topRight}
                        onChange={(e) =>
                          updateWidget(selectedWidget.id, (prev) => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: { ...prev.shape.corners, topRight: parseInt(e.target.value) || 0 }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Lewy Dolny:</span>
                      <input
                        type="number"
                        min="0"
                        max="64"
                        value={selectedWidget.shape.corners.bottomLeft}
                        onChange={(e) =>
                          updateWidget(selectedWidget.id, (prev) => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: { ...prev.shape.corners, bottomLeft: parseInt(e.target.value) || 0 }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Prawy Dolny:</span>
                      <input
                        type="number"
                        min="0"
                        max="64"
                        value={selectedWidget.shape.corners.bottomRight}
                        onChange={(e) =>
                          updateWidget(selectedWidget.id, (prev) => ({
                            ...prev,
                            shape: {
                              ...prev.shape,
                              corners: { ...prev.shape.corners, bottomRight: parseInt(e.target.value) || 0 }
                            }
                          }))
                        }
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: SIZE & LAYOUT */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'size' ? '' : 'size')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white bg-slate-900/60"
          >
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-blue-400" />
              <span>3. Rozmiar i Układ Kontenera</span>
            </div>
            {activeSection === 'size' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'size' && (
            <div className="p-4 space-y-3.5 border-t border-slate-800/60 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Preset szerokości kontenera
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'full', label: '100% Full' },
                    { id: 'standard_1200', label: '1200px' },
                    { id: 'wide_1400', label: '1400px' },
                    { id: 'compact_960', label: '960px' },
                    { id: 'custom', label: 'Własna' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          size: { ...prev.size, containerPreset: mode.id as any }
                        }))
                      }
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold transition-all ${
                        selectedWidget.size.containerPreset === mode.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Liczba kolumn w siatce widżetu
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((cols) => (
                    <button
                      key={cols}
                      type="button"
                      onClick={() =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          layout: { ...prev.layout, columns: cols }
                        }))
                      }
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                        selectedWidget.layout.columns === cols
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {cols} {cols === 1 ? 'kolumna' : 'kolumny'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: BACKGROUND */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'background' ? '' : 'background')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white bg-slate-900/60"
          >
            <div className="flex items-center gap-2">
              <Paintbrush className="w-4 h-4 text-blue-400" />
              <span>4. Tło, Kolory i Gradienty</span>
            </div>
            {activeSection === 'background' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'background' && (
            <div className="p-4 space-y-3.5 border-t border-slate-800/60 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  Rodzaj tła
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'color', label: 'Jednolite' },
                    { id: 'gradient', label: 'Gradient' },
                    { id: 'glassmorphism', label: 'Szkło' },
                    { id: 'transparent', label: 'Brak tła' }
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          background: { ...prev.background, type: bg.id as WidgetBgType }
                        }))
                      }
                      className={`py-1.5 px-1 text-center rounded-lg text-[10px] font-semibold transition-all ${
                        selectedWidget.background.type === bg.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedWidget.background.type === 'color' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Kolor tła
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedWidget.background.color || '#0f172a'}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          background: { ...prev.background, color: e.target.value }
                        }))
                      }
                      className="w-9 h-9 rounded-lg bg-transparent cursor-pointer border border-slate-800"
                    />
                    <input
                      type="text"
                      value={selectedWidget.background.color || '#0f172a'}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          background: { ...prev.background, color: e.target.value }
                        }))
                      }
                      className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono"
                    />
                  </div>
                </div>
              )}

              {selectedWidget.background.type === 'gradient' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400">Kolor początkowy:</span>
                      <input
                        type="color"
                        value={selectedWidget.background.gradient?.color1 || '#1e293b'}
                        onChange={(e) =>
                          updateWidget(selectedWidget.id, (prev) => ({
                            ...prev,
                            background: {
                              ...prev.background,
                              gradient: {
                                ...(prev.background.gradient || { type: 'linear', color2: '#0f172a', direction: '135deg', position: 'center', opacity: 100 }),
                                color1: e.target.value
                              }
                            }
                          }))
                        }
                        className="w-full h-8 rounded bg-transparent cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Kolor końcowy:</span>
                      <input
                        type="color"
                        value={selectedWidget.background.gradient?.color2 || '#0f172a'}
                        onChange={(e) =>
                          updateWidget(selectedWidget.id, (prev) => ({
                            ...prev,
                            background: {
                              ...prev.background,
                              gradient: {
                                ...(prev.background.gradient || { type: 'linear', color1: '#1e293b', direction: '135deg', position: 'center', opacity: 100 }),
                                color2: e.target.value
                              }
                            }
                          }))
                        }
                        className="w-full h-8 rounded bg-transparent cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 5: BORDER & SHADOW */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'border_shadow' ? '' : 'border_shadow')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white bg-slate-900/60"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>5. Obramowanie i Cienie</span>
            </div>
            {activeSection === 'border_shadow' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'border_shadow' && (
            <div className="p-4 space-y-3.5 border-t border-slate-800/60 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400">Styl obramowania:</span>
                  <select
                    value={selectedWidget.border.style}
                    onChange={(e) =>
                      updateWidget(selectedWidget.id, (prev) => ({
                        ...prev,
                        border: { ...prev.border, style: e.target.value as WidgetBorderStyle }
                      }))
                    }
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                  >
                    <option value="none">Brak obramowania</option>
                    <option value="solid">Ciągła (Solid)</option>
                    <option value="dashed">Kreskowana (Dashed)</option>
                    <option value="dotted">Kropkowana (Dotted)</option>
                    <option value="double">Podwójna (Double)</option>
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Grubość (px):</span>
                  <input
                    type="number"
                    min="0"
                    max="8"
                    value={selectedWidget.border.width}
                    onChange={(e) =>
                      updateWidget(selectedWidget.id, (prev) => ({
                        ...prev,
                        border: { ...prev.border, width: parseInt(e.target.value) || 0 }
                      }))
                    }
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>

              {selectedWidget.border.style !== 'none' && (
                <div>
                  <span className="text-[10px] text-slate-400">Kolor obramowania:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={selectedWidget.border.color}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          border: { ...prev.border, color: e.target.value }
                        }))
                      }
                      className="w-8 h-8 rounded bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedWidget.border.color}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          border: { ...prev.border, color: e.target.value }
                        }))
                      }
                      className="flex-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100 font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Shadow Presets */}
              <div className="pt-3 border-t border-slate-800/60">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  Cienie (Elevation Shadow)
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['none', 'sm', 'md', 'lg', 'xl', '2xl'] as WidgetShadowPreset[]).map((sh) => (
                    <button
                      key={sh}
                      type="button"
                      onClick={() =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          shadow: { ...prev.shadow, preset: sh }
                        }))
                      }
                      className={`py-1 px-1 rounded text-[10px] font-medium capitalize text-center transition-all ${
                        selectedWidget.shadow.preset === sh
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: TYPOGRAPHY */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'typography' ? '' : 'typography')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white bg-slate-900/60"
          >
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-400" />
              <span>6. Typografia i Teksty</span>
            </div>
            {activeSection === 'typography' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'typography' && (
            <div className="p-4 space-y-3.5 border-t border-slate-800/60 text-xs">
              <div>
                <span className="text-[11px] font-bold text-slate-300">Tytuł główny widżetu:</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-500">Rozmiar (px):</span>
                    <input
                      type="number"
                      min="14"
                      max="48"
                      value={selectedWidget.typography.title.fontSize}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            title: { ...prev.typography.title, fontSize: parseInt(e.target.value) || 20 }
                          }
                        }))
                      }
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Grubość (Weight):</span>
                    <select
                      value={selectedWidget.typography.title.fontWeight}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            title: { ...prev.typography.title, fontWeight: e.target.value }
                          }
                        }))
                      }
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                    >
                      <option value="400">Regular (400)</option>
                      <option value="600">Semibold (600)</option>
                      <option value="700">Bold (700)</option>
                      <option value="800">Extrabold (800)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-2">
                  <span className="text-[10px] text-slate-500">Kolor tytułu:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="color"
                      value={selectedWidget.typography.title.color}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            title: { ...prev.typography.title, color: e.target.value }
                          }
                        }))
                      }
                      className="w-8 h-8 rounded bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedWidget.typography.title.color}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            title: { ...prev.typography.title, color: e.target.value }
                          }
                        }))
                      }
                      className="flex-1 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="pt-3 border-t border-slate-800/60">
                <span className="text-[11px] font-bold text-slate-300">Podtytuł / Opis:</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-500">Rozmiar (px):</span>
                    <input
                      type="number"
                      min="11"
                      max="24"
                      value={selectedWidget.typography.subtitle.fontSize}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            subtitle: { ...prev.typography.subtitle, fontSize: parseInt(e.target.value) || 13 }
                          }
                        }))
                      }
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Kolor tekstu:</span>
                    <input
                      type="color"
                      value={selectedWidget.typography.subtitle.color}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          typography: {
                            ...prev.typography,
                            subtitle: { ...prev.typography.subtitle, color: e.target.value }
                          }
                        }))
                      }
                      className="w-full h-7 rounded bg-transparent cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 7: SPACING & PADDING */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden">
          <button
            type="button"
            onClick={() => setActiveSection(activeSection === 'spacing' ? '' : 'spacing')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white bg-slate-900/60"
          >
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-blue-400" />
              <span>7. Marginesy i Odstępy (Padding)</span>
            </div>
            {activeSection === 'spacing' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'spacing' && (
            <div className="p-4 space-y-3.5 border-t border-slate-800/60 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-slate-400">
                  Wewnętrzny Padding (px):
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-[10px] text-slate-500">Góra (Top):</span>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={selectedWidget.spacing.padding.top}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          spacing: {
                            ...prev.spacing,
                            padding: { ...prev.spacing.padding, top: parseInt(e.target.value) || 0 }
                          }
                        }))
                      }
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Dół (Bottom):</span>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={selectedWidget.spacing.padding.bottom}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          spacing: {
                            ...prev.spacing,
                            padding: { ...prev.spacing.padding, bottom: parseInt(e.target.value) || 0 }
                          }
                        }))
                      }
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Lewy (Left):</span>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={selectedWidget.spacing.padding.left}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          spacing: {
                            ...prev.spacing,
                            padding: { ...prev.spacing.padding, left: parseInt(e.target.value) || 0 }
                          }
                        }))
                      }
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Prawy (Right):</span>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={selectedWidget.spacing.padding.right}
                      onChange={(e) =>
                        updateWidget(selectedWidget.id, (prev) => ({
                          ...prev,
                          spacing: {
                            ...prev.spacing,
                            padding: { ...prev.spacing.padding, right: parseInt(e.target.value) || 0 }
                          }
                        }))
                      }
                      className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-slate-100"
                    />
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
