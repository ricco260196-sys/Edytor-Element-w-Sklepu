import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  InteractiveButtonItem,
  ButtonDisplayMode,
  ButtonIconPosition,
  ButtonHoverEffect,
  ButtonBackgroundType,
  ButtonBorderStyle,
  DevicePreview
} from '../../../types/storeAppearance';
import { BUTTON_PRESETS } from '../../../data/defaultButtons';
import * as LucideIcons from 'lucide-react';
import {
  Type,
  Image as ImageIcon,
  Layout,
  Maximize,
  Move,
  Palette,
  Square,
  Sparkles,
  Zap,
  MousePointer,
  Bell,
  ListFilter,
  Link2,
  Smartphone,
  Copy,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Sliders,
  Check,
  Eye,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

interface ButtonsConfigColumnProps {
  selectedButtonId: string;
  onSelectButton: (id: string) => void;
}

const COMMON_ICONS = [
  'ShoppingCart', 'ShoppingBag', 'Heart', 'Bell', 'MessageSquare',
  'User', 'LogIn', 'UserPlus', 'ShieldCheck', 'Search',
  'Star', 'Sparkles', 'Gift', 'Tag', 'Flame',
  'Zap', 'Phone', 'HelpCircle', 'SlidersHorizontal', 'Grid',
  'ChevronRight', 'ArrowRight', 'Check', 'Download', 'Share2'
];

export const ButtonsConfigColumn: React.FC<ButtonsConfigColumnProps> = ({
  selectedButtonId,
  onSelectButton
}) => {
  const {
    state,
    updateButtonItem,
    updateButtons,
    resetButtonItem,
    applyButtonPreset,
    copyButtonStyle,
    pasteButtonStyle,
    buttonClipboardStyle,
    triggerToast
  } = useStoreAppearance();

  // Active accordion section
  const [activeSection, setActiveSection] = useState<string>('content');
  const [activeStateTab, setActiveStateTab] = useState<'hover' | 'active' | 'focus' | 'disabled'>('hover');
  const [isPaddingLinked, setIsPaddingLinked] = useState<boolean>(true);
  const [isMarginLinked, setIsMarginLinked] = useState<boolean>(true);
  const [isRadiusLinked, setIsRadiusLinked] = useState<boolean>(true);

  const items = state.buttons?.items || [];
  const currentItem = items.find(i => i.id === selectedButtonId);

  if (!currentItem) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-slate-400 text-center border-l border-slate-800">
        <Sliders className="w-10 h-10 text-slate-600 mb-3" />
        <h3 className="text-sm font-bold text-slate-200">Brak zaznaczonego przycisku</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Wybierz element z listy po lewej stronie lub kliknij w niego w podglądzie, aby rozpocząć konfigurację.
        </p>
      </div>
    );
  }

  const toggleSection = (sectionKey: string) => {
    setActiveSection(prev => (prev === sectionKey ? '' : sectionKey));
  };

  const handleUpdate = (updater: Partial<InteractiveButtonItem>) => {
    updateButtonItem(currentItem.id, updater);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 border-l border-slate-800">
      {/* Top Header info */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur-xs shrink-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Konfigurator Elementora
            </span>
            <h2 className="text-sm font-bold text-white truncate flex items-center gap-1.5 mt-0.5">
              <span>{currentItem.name}</span>
              {currentItem.isSystem && (
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                  System
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => copyButtonStyle(currentItem)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Kopiuj styl"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => pasteButtonStyle(currentItem.id)}
              disabled={!buttonClipboardStyle}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 rounded-lg transition-colors"
              title="Wklej styl"
            >
              <Palette className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => resetButtonItem(currentItem.id)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Przywróć domyślne dla tego przycisku"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Sections Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800 text-xs">
        {/* ================= 1. TREŚĆ & TEKSTY ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('content')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-400" />
              1. Treść & Etykiety
            </span>
            {activeSection === 'content' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'content' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Tekst przycisku (Główny)</label>
                <input
                  type="text"
                  value={currentItem.content.text}
                  onChange={(e) => handleUpdate({
                    content: { ...currentItem.content, text: e.target.value }
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Tekst Tablet (opcjonalny)</label>
                  <input
                    type="text"
                    value={currentItem.content.textTablet || ''}
                    onChange={(e) => handleUpdate({
                      content: { ...currentItem.content, textTablet: e.target.value }
                    })}
                    placeholder="Domyślny"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Tekst Mobile (opcjonalny)</label>
                  <input
                    type="text"
                    value={currentItem.content.textMobile || ''}
                    onChange={(e) => handleUpdate({
                      content: { ...currentItem.content, textMobile: e.target.value }
                    })}
                    placeholder="Domyślny"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Podpowiedź (Tooltip po najechaniu)</label>
                <input
                  type="text"
                  value={currentItem.content.tooltip || ''}
                  onChange={(e) => handleUpdate({
                    content: { ...currentItem.content, tooltip: e.target.value }
                  })}
                  placeholder="np. Zobacz zawartość koszyka"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Dostępność (Aria-Label / Screen Reader)</label>
                <input
                  type="text"
                  value={currentItem.content.ariaLabel || ''}
                  onChange={(e) => handleUpdate({
                    content: { ...currentItem.content, ariaLabel: e.target.value }
                  })}
                  placeholder="np. Przycisk koszyka zakupowego"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= 2. IKONA ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('icon')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              2. Ikona & Grafika
            </span>
            {activeSection === 'icon' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'icon' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Wyświetlaj ikonę</span>
                <input
                  type="checkbox"
                  checked={currentItem.icon.show}
                  onChange={(e) => handleUpdate({
                    icon: { ...currentItem.icon, show: e.target.checked }
                  })}
                  className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 w-4 h-4"
                />
              </div>

              {currentItem.icon.show && (
                <>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Wybór ikony</label>
                    <div className="grid grid-cols-6 gap-1.5 p-2 bg-slate-900 border border-slate-800 rounded-xl max-h-36 overflow-y-auto">
                      {COMMON_ICONS.map((iconName) => {
                        const IconComp = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
                        const isChosen = currentItem.icon.name === iconName;
                        return (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => handleUpdate({
                              icon: { ...currentItem.icon, name: iconName }
                            })}
                            className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                              isChosen
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                            title={iconName}
                          >
                            <IconComp className="w-4 h-4" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Pozycja ikony</label>
                      <select
                        value={currentItem.icon.position}
                        onChange={(e) => handleUpdate({
                          icon: { ...currentItem.icon, position: e.target.value as ButtonIconPosition }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="left">Po lewej</option>
                        <option value="right">Po prawej</option>
                        <option value="top">U góry</option>
                        <option value="bottom">Na dole</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Animacja ikony</label>
                      <select
                        value={currentItem.icon.animation || 'none'}
                        onChange={(e) => handleUpdate({
                          icon: { ...currentItem.icon, animation: e.target.value as any }
                        })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="none">Brak</option>
                        <option value="rotate">Obrót (Spin)</option>
                        <option value="pulse">Pulsowanie</option>
                        <option value="bounce">Podskakiwanie</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Rozmiar ({currentItem.icon.sizePx}px)</label>
                      <input
                        type="range"
                        min="10"
                        max="36"
                        value={currentItem.icon.sizePx}
                        onChange={(e) => handleUpdate({
                          icon: { ...currentItem.icon, sizePx: parseInt(e.target.value) }
                        })}
                        className="w-full accent-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Odstęp od tekstu ({currentItem.icon.gapPx}px)</label>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={currentItem.icon.gapPx}
                        onChange={(e) => handleUpdate({
                          icon: { ...currentItem.icon, gapPx: parseInt(e.target.value) }
                        })}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ================= 3. UKŁAD & WYMIARY ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('layout')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-amber-400" />
              3. Układ & Wymiary
            </span>
            {activeSection === 'layout' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'layout' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Tryb wyświetlania zawartości</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'icon_text', label: 'Ikona + Tekst' },
                    { id: 'icon_only', label: 'Tylko Ikona' },
                    { id: 'text_only', label: 'Tylko Tekst' },
                    { id: 'text_icon', label: 'Tekst + Ikona' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => handleUpdate({
                        layout: { ...currentItem.layout, displayMode: mode.id as ButtonDisplayMode }
                      })}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        currentItem.layout.displayMode === mode.id
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Szerokość</label>
                  <select
                    value={currentItem.layout.widthType}
                    onChange={(e) => handleUpdate({
                      layout: { ...currentItem.layout, widthType: e.target.value as any }
                    })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="auto">Auto (Dopasuj do tekstu)</option>
                    <option value="full">Pełna szerokość (100%)</option>
                    <option value="fixed">Stała szerokość</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Wysokość minimalna</label>
                  <input
                    type="text"
                    value={currentItem.layout.height || '40px'}
                    onChange={(e) => handleUpdate({
                      layout: { ...currentItem.layout, height: e.target.value }
                    })}
                    placeholder="np. 40px"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= 4. ODSTĘPY (PADDING & MARGIN) ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('spacing')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Move className="w-4 h-4 text-indigo-400" />
              4. Odstępy (Padding & Margin)
            </span>
            {activeSection === 'spacing' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'spacing' && (
            <div className="p-4 bg-slate-950/50 space-y-4">
              {/* Padding Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300 font-medium">Padding wewnętrzny (px)</span>
                  <button
                    type="button"
                    onClick={() => setIsPaddingLinked(!isPaddingLinked)}
                    className={`text-[10px] px-2 py-0.5 rounded ${isPaddingLinked ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {isPaddingLinked ? 'Połączone 4 strony' : 'Osobno'}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <div key={side}>
                      <span className="block text-[10px] text-slate-500 text-center uppercase">{side}</span>
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={currentItem.spacing.padding[side]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          if (isPaddingLinked) {
                            handleUpdate({
                              spacing: {
                                ...currentItem.spacing,
                                padding: { top: val, right: val, bottom: val, left: val }
                              }
                            });
                          } else {
                            handleUpdate({
                              spacing: {
                                ...currentItem.spacing,
                                padding: { ...currentItem.spacing.padding, [side]: val }
                              }
                            });
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Margin Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300 font-medium">Margines zewnętrzny (px)</span>
                  <button
                    type="button"
                    onClick={() => setIsMarginLinked(!isMarginLinked)}
                    className={`text-[10px] px-2 py-0.5 rounded ${isMarginLinked ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {isMarginLinked ? 'Połączone' : 'Osobno'}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <div key={side}>
                      <span className="block text-[10px] text-slate-500 text-center uppercase">{side}</span>
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={currentItem.spacing.margin[side]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          if (isMarginLinked) {
                            handleUpdate({
                              spacing: {
                                ...currentItem.spacing,
                                margin: { top: val, right: val, bottom: val, left: val }
                              }
                            });
                          } else {
                            handleUpdate({
                              spacing: {
                                ...currentItem.spacing,
                                margin: { ...currentItem.spacing.margin, [side]: val }
                              }
                            });
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= 5. TYPOGRAFIA ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('typography')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-400" />
              5. Typografia & Font
            </span>
            {activeSection === 'typography' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'typography' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Rozmiar fontu ({currentItem.typography.fontSizePx}px)</label>
                  <input
                    type="range"
                    min="10"
                    max="28"
                    value={currentItem.typography.fontSizePx}
                    onChange={(e) => handleUpdate({
                      typography: { ...currentItem.typography, fontSizePx: parseInt(e.target.value) }
                    })}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Grubość (Weight)</label>
                  <select
                    value={currentItem.typography.fontWeight}
                    onChange={(e) => handleUpdate({
                      typography: { ...currentItem.typography, fontWeight: parseInt(e.target.value) }
                    })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value="400">400 - Normalny</option>
                    <option value="500">500 - Średni</option>
                    <option value="600">600 - Półgruby (Semibold)</option>
                    <option value="700">700 - Pogrubiony (Bold)</option>
                    <option value="800">800 - Extra Bold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Kolor tekstu</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentItem.typography.color}
                      onChange={(e) => handleUpdate({
                        typography: { ...currentItem.typography, color: e.target.value }
                      })}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentItem.typography.color}
                      onChange={(e) => handleUpdate({
                        typography: { ...currentItem.typography, color: e.target.value }
                      })}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Transformacja tekstu</label>
                  <select
                    value={currentItem.typography.textTransform}
                    onChange={(e) => handleUpdate({
                      typography: { ...currentItem.typography, textTransform: e.target.value as any }
                    })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value="none">Brak (Domyślny)</option>
                    <option value="uppercase">WIELKIE LITERY</option>
                    <option value="lowercase">małe litery</option>
                    <option value="capitalize">Pierwsza Wielka</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= 6. TŁO & GLASSMORPHISM ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('background')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-pink-400" />
              6. Tło & Glassmorphism
            </span>
            {activeSection === 'background' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'background' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Rodzaj tła</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'solid', label: 'Jednolite' },
                    { id: 'linear_gradient', label: 'Gradient Liniowy' },
                    { id: 'glass', label: 'Glassmorphism' },
                    { id: 'transparent', label: 'Przezroczyste' }
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => handleUpdate({
                        background: { ...currentItem.background, type: bg.id as ButtonBackgroundType }
                      })}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        currentItem.background.type === bg.id
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              {currentItem.background.type === 'solid' && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Kolor tła</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentItem.background.color}
                      onChange={(e) => handleUpdate({
                        background: { ...currentItem.background, color: e.target.value }
                      })}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentItem.background.color}
                      onChange={(e) => handleUpdate({
                        background: { ...currentItem.background, color: e.target.value }
                      })}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              {currentItem.background.type === 'linear_gradient' && (
                <div className="space-y-2.5">
                  <label className="block text-slate-400 font-medium">Kolory gradientu</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={currentItem.background.gradientColors[0] || '#2563eb'}
                        onChange={(e) => handleUpdate({
                          background: {
                            ...currentItem.background,
                            gradientColors: [e.target.value, currentItem.background.gradientColors[1] || '#1d4ed8']
                          }
                        })}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent"
                      />
                      <span className="text-[11px] text-slate-400">Kolor 1</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={currentItem.background.gradientColors[1] || '#1d4ed8'}
                        onChange={(e) => handleUpdate({
                          background: {
                            ...currentItem.background,
                            gradientColors: [currentItem.background.gradientColors[0] || '#2563eb', e.target.value]
                          }
                        })}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent"
                      />
                      <span className="text-[11px] text-slate-400">Kolor 2</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Kąt gradientu ({currentItem.background.gradientAngle || 135}°)</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={currentItem.background.gradientAngle || 135}
                      onChange={(e) => handleUpdate({
                        background: { ...currentItem.background, gradientAngle: parseInt(e.target.value) }
                      })}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentItem.background.type === 'glass' && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Rozmycie tła Backdrop Blur ({currentItem.background.glassmorphism.blur}px)</label>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={currentItem.background.glassmorphism.blur}
                    onChange={(e) => handleUpdate({
                      background: {
                        ...currentItem.background,
                        glassmorphism: { ...currentItem.background.glassmorphism, blur: parseInt(e.target.value) }
                      }
                    })}
                    className="w-full accent-blue-500"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= 7. OBRAMOWANIE & ZAOKRĄGLENIE ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('border')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Square className="w-4 h-4 text-purple-400" />
              7. Obramowanie & Zaokrąglenie
            </span>
            {activeSection === 'border' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'border' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              {/* Quick Shape Presets */}
              <div>
                <label className="block text-slate-400 font-medium mb-1">Kształt przycisku</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: 'Prostokąt', r: 0 },
                    { label: 'Zaokrąglony', r: 8 },
                    { label: 'Pill (Pigułka)', r: 9999 },
                    { label: 'Okrągły', r: 50 }
                  ].map((shape) => (
                    <button
                      key={shape.label}
                      type="button"
                      onClick={() => handleUpdate({
                        border: {
                          ...currentItem.border,
                          radius: { topLeft: shape.r, topRight: shape.r, bottomRight: shape.r, bottomLeft: shape.r }
                        }
                      })}
                      className="p-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded text-center text-[10px]"
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Styl ramki</label>
                  <select
                    value={currentItem.border.style}
                    onChange={(e) => handleUpdate({
                      border: { ...currentItem.border, style: e.target.value as ButtonBorderStyle }
                    })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value="none">Brak ramki</option>
                    <option value="solid">Ciągła (Solid)</option>
                    <option value="dashed">Kreskowana (Dashed)</option>
                    <option value="dotted">Kropkowana (Dotted)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Kolor ramki</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentItem.border.color}
                      onChange={(e) => handleUpdate({
                        border: { ...currentItem.border, color: e.target.value }
                      })}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent"
                    />
                    <input
                      type="text"
                      value={currentItem.border.color}
                      onChange={(e) => handleUpdate({
                        border: { ...currentItem.border, color: e.target.value }
                      })}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Radius Sliders */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 font-medium">Zaokrąglenie narożników Radius (px)</span>
                  <button
                    type="button"
                    onClick={() => setIsRadiusLinked(!isRadiusLinked)}
                    className={`text-[10px] px-2 py-0.5 rounded ${isRadiusLinked ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {isRadiusLinked ? 'Wszystkie równe' : 'Osobno'}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as const).map((corner) => (
                    <div key={corner}>
                      <span className="block text-[9px] text-slate-500 text-center uppercase">{corner}</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={currentItem.border.radius[corner]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          if (isRadiusLinked) {
                            handleUpdate({
                              border: {
                                ...currentItem.border,
                                radius: { topLeft: val, topRight: val, bottomRight: val, bottomLeft: val }
                              }
                            });
                          } else {
                            handleUpdate({
                              border: {
                                ...currentItem.border,
                                radius: { ...currentItem.border.radius, [corner]: val }
                              }
                            });
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= 8. CIENIE & NEON / GLOW ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('shadow')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              8. Cienie & Poświata Neon
            </span>
            {activeSection === 'shadow' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'shadow' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Włącz cień (Drop Shadow)</span>
                <input
                  type="checkbox"
                  checked={currentItem.shadow.enabled}
                  onChange={(e) => handleUpdate({
                    shadow: { ...currentItem.shadow, enabled: e.target.checked }
                  })}
                  className="rounded bg-slate-900 border-slate-700 text-blue-600 w-4 h-4"
                />
              </div>

              {currentItem.shadow.enabled && (
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Przesunięcie Y ({currentItem.shadow.y}px)</label>
                    <input
                      type="range"
                      min="-20"
                      max="30"
                      value={currentItem.shadow.y}
                      onChange={(e) => handleUpdate({
                        shadow: { ...currentItem.shadow, y: parseInt(e.target.value) }
                      })}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Rozmycie Blur ({currentItem.shadow.blur}px)</label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={currentItem.shadow.blur}
                      onChange={(e) => handleUpdate({
                        shadow: { ...currentItem.shadow, blur: parseInt(e.target.value) }
                      })}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">Poświata Glow / Neon</span>
                  <input
                    type="checkbox"
                    checked={currentItem.shadow.glow.enabled}
                    onChange={(e) => handleUpdate({
                      shadow: {
                        ...currentItem.shadow,
                        glow: { ...currentItem.shadow.glow, enabled: e.target.checked }
                      }
                    })}
                    className="rounded bg-slate-900 border-slate-700 text-blue-600 w-4 h-4"
                  />
                </div>
                {currentItem.shadow.glow.enabled && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Kolor poświaty</label>
                      <input
                        type="color"
                        value={currentItem.shadow.glow.color}
                        onChange={(e) => handleUpdate({
                          shadow: {
                            ...currentItem.shadow,
                            glow: { ...currentItem.shadow.glow, color: e.target.value }
                          }
                        })}
                        className="w-full h-8 rounded border border-slate-700 bg-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= 9. STANY (HOVER, ACTIVE, DISABLED) ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('states')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-orange-400" />
              9. Stany (Hover, Active, Disabled)
            </span>
            {activeSection === 'states' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'states' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              {/* Tab selector for states */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {(['hover', 'active', 'disabled'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setActiveStateTab(st)}
                    className={`flex-1 py-1 text-center rounded text-[11px] font-semibold capitalize transition-all ${
                      activeStateTab === st
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st === 'hover' ? 'Hover (Najechanie)' : st === 'active' ? 'Active (Klik)' : 'Disabled (Blokada)'}
                  </button>
                ))}
              </div>

              {activeStateTab === 'hover' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Kolor tła na Hover</label>
                    <input
                      type="color"
                      value={currentItem.states.hover.bgColor || currentItem.background.color}
                      onChange={(e) => handleUpdate({
                        states: {
                          ...currentItem.states,
                          hover: { ...currentItem.states.hover, bgColor: e.target.value }
                        }
                      })}
                      className="w-full h-8 rounded border border-slate-700 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Kolor tekstu na Hover</label>
                    <input
                      type="color"
                      value={currentItem.states.hover.textColor || currentItem.typography.color}
                      onChange={(e) => handleUpdate({
                        states: {
                          ...currentItem.states,
                          hover: { ...currentItem.states.hover, textColor: e.target.value }
                        }
                      })}
                      className="w-full h-8 rounded border border-slate-700 bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Efekt uniesienia (Lift Y)</label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      value={currentItem.states.hover.translateY || -2}
                      onChange={(e) => handleUpdate({
                        states: {
                          ...currentItem.states,
                          hover: { ...currentItem.states.hover, translateY: parseInt(e.target.value) }
                        }
                      })}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeStateTab === 'active' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Kolor tła przy wciśnięciu</label>
                    <input
                      type="color"
                      value={currentItem.states.active.bgColor || currentItem.background.color}
                      onChange={(e) => handleUpdate({
                        states: {
                          ...currentItem.states,
                          active: { ...currentItem.states.active, bgColor: e.target.value }
                        }
                      })}
                      className="w-full h-8 rounded border border-slate-700 bg-transparent"
                    />
                  </div>
                </div>
              )}

              {activeStateTab === 'disabled' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Przezroczystość Opacity ({currentItem.states.disabled.opacity || 0.5})</label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={currentItem.states.disabled.opacity || 0.5}
                      onChange={(e) => handleUpdate({
                        states: {
                          ...currentItem.states,
                          disabled: { ...currentItem.states.disabled, opacity: parseFloat(e.target.value) }
                        }
                      })}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= 10. BADGE / LICZNIK ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('badge')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-400" />
              10. Badge / Licznik
            </span>
            {activeSection === 'badge' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'badge' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">Włącz Badge (Plakietkę)</span>
                <input
                  type="checkbox"
                  checked={currentItem.badge.enabled}
                  onChange={(e) => handleUpdate({
                    badge: { ...currentItem.badge, enabled: e.target.checked }
                  })}
                  className="rounded bg-slate-900 border-slate-700 text-blue-600 w-4 h-4"
                />
              </div>

              {currentItem.badge.enabled && (
                <>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Źródło danych licznika</label>
                    <select
                      value={currentItem.badge.dataSource}
                      onChange={(e) => handleUpdate({
                        badge: { ...currentItem.badge, dataSource: e.target.value as any }
                      })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                    >
                      <option value="cart_count">Licznik Koszyka (System)</option>
                      <option value="wishlist_count">Licznik Ulubionych (System)</option>
                      <option value="notifications_count">Licznik Powiadomień (System)</option>
                      <option value="messages_count">Licznik Wiadomości (System)</option>
                      <option value="custom">Własna wartość / Liczba</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Kolor tła badge</label>
                      <input
                        type="color"
                        value={currentItem.badge.bgColor}
                        onChange={(e) => handleUpdate({
                          badge: { ...currentItem.badge, bgColor: e.target.value }
                        })}
                        className="w-full h-8 rounded border border-slate-700 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Kolor tekstu</label>
                      <input
                        type="color"
                        value={currentItem.badge.textColor}
                        onChange={(e) => handleUpdate({
                          badge: { ...currentItem.badge, textColor: e.target.value }
                        })}
                        className="w-full h-8 rounded border border-slate-700 bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Animacja pulsowania</span>
                    <input
                      type="checkbox"
                      checked={currentItem.badge.pulseAnimation}
                      onChange={(e) => handleUpdate({
                        badge: { ...currentItem.badge, pulseAnimation: e.target.checked }
                      })}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 w-4 h-4"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ================= 11. AKCJA & LINK ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('action')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-400" />
              11. Akcja & Cel kliknięcia
            </span>
            {activeSection === 'action' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'action' && (
            <div className="p-4 bg-slate-950/50 space-y-3.5">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Typ wyzwalanej akcji</label>
                <select
                  value={currentItem.action.type}
                  onChange={(e) => handleUpdate({
                    action: { ...currentItem.action, type: e.target.value as any }
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white"
                >
                  <option value="link">Przejdź do adresu URL (Link)</option>
                  <option value="modal">Otwórz okno modalne (Modal)</option>
                  <option value="dropdown">Rozwiń menu Dropdown</option>
                  <option value="scroll_to">Przewiń stronę do sekcji</option>
                  <option value="system_event">Wywołaj moduł systemowy</option>
                </select>
              </div>

              {currentItem.action.type === 'link' && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Docelowy adres URL</label>
                  <input
                    type="text"
                    value={currentItem.action.url || ''}
                    onChange={(e) => handleUpdate({
                      action: { ...currentItem.action, url: e.target.value }
                    })}
                    placeholder="np. /sklep/promocje lub https://..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= 12. PRESETY & STYLIZACJA ================= */}
        <div>
          <button
            type="button"
            onClick={() => toggleSection('presets')}
            className="w-full px-4 py-3 flex items-center justify-between font-semibold text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              12. Gotowe Style (Presety)
            </span>
            {activeSection === 'presets' ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
          </button>

          {activeSection === 'presets' && (
            <div className="p-4 bg-slate-950/50 space-y-2.5">
              <p className="text-slate-400 text-[11px] mb-2">
                Wybierz jeden z profesjonalnie przygotowanych stylów, aby natychmiast zastosować go do wybranego przycisku:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {BUTTON_PRESETS.map((preset) => (
                  <button
                    key={preset.presetKey}
                    type="button"
                    onClick={() => applyButtonPreset(currentItem.id, preset.presetKey)}
                    className="w-full p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 rounded-xl flex items-center justify-between text-left transition-all"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{preset.name}</div>
                      <div className="text-[10px] text-slate-500">{preset.description}</div>
                    </div>
                    <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
