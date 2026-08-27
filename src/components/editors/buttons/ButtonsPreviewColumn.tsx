import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { InteractiveButtonRenderer } from './InteractiveButtonRenderer';
import { InteractiveButtonItem, DevicePreview } from '../../../types/storeAppearance';
import {
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Sparkles,
  Layers,
  Sliders,
  Maximize2,
  Minimize2,
  RefreshCw,
  Info,
  CheckCircle2,
  ChevronDown,
  ShoppingBag,
  Bell,
  Heart,
  MessageSquare
} from 'lucide-react';

interface ButtonsPreviewColumnProps {
  selectedButtonId: string;
  onSelectButton: (id: string) => void;
  deviceViewport: DevicePreview;
  onDeviceChange: (device: DevicePreview) => void;
  viewMode: 'element' | 'full_header';
  onViewModeChange: (mode: 'element' | 'full_header') => void;
}

export type PreviewForcedState = 'normal' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading' | 'dropdown';

export const ButtonsPreviewColumn: React.FC<ButtonsPreviewColumnProps> = ({
  selectedButtonId,
  onSelectButton,
  deviceViewport,
  onDeviceChange,
  viewMode,
  onViewModeChange
}) => {
  const { state, updateButtons } = useStoreAppearance();

  // Test state simulation
  const [forcedState, setForcedState] = useState<PreviewForcedState>('normal');
  const [canvasBg, setCanvasBg] = useState<'grid' | 'dark' | 'light' | 'checker'>('grid');
  const [simCartCount, setSimCartCount] = useState<number>(3);
  const [simWishlistCount, setSimWishlistCount] = useState<number>(5);
  const [simNotifCount, setSimNotifCount] = useState<number>(2);
  const [simMsgCount, setSimMsgCount] = useState<number>(4);
  const [showInspectorBadge, setShowInspectorBadge] = useState<boolean>(true);

  const buttonItems = (state.buttons?.items || []).sort((a, b) => a.order - b.order);
  const globalConfig = state.buttons?.global || {
    spacingGapPx: 12,
    alignment: 'right',
    containerPaddingPx: 8,
    mobileWrap: 'scroll'
  };

  // Filter items visible on current device
  const visibleItems = buttonItems.filter(item => {
    if (deviceViewport === 'desktop') return item.visibility.desktop;
    if (deviceViewport === 'tablet') return item.visibility.tablet;
    if (deviceViewport === 'mobile') return item.visibility.mobile;
    return true;
  });

  const selectedItem = buttonItems.find(i => i.id === selectedButtonId);

  // Background styling for canvas
  const getCanvasBackgroundClass = () => {
    switch (canvasBg) {
      case 'dark':
        return 'bg-slate-950';
      case 'light':
        return 'bg-slate-100';
      case 'checker':
        return 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-200';
      case 'grid':
      default:
        return 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] bg-slate-950';
    }
  };

  // Viewport container width calculation
  const getViewportWidth = () => {
    switch (deviceViewport) {
      case 'mobile':
        return 'max-w-[420px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full max-w-5xl';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Top Preview Controls Toolbar */}
      <div className="px-4 py-2.5 bg-slate-900/90 backdrop-blur-xs border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
        {/* State selector pills */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1 border-r border-slate-800 mr-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Stan:
          </span>
          {(['normal', 'hover', 'active', 'disabled', 'loading', 'dropdown'] as PreviewForcedState[]).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setForcedState(st)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium capitalize transition-all ${
                forcedState === st
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {st === 'normal' ? 'Normalny' : st === 'hover' ? 'Hover (Najechanie)' : st === 'active' ? 'Active (Wciśnięty)' : st === 'disabled' ? 'Zablokowany' : st === 'loading' ? 'Wczytywanie' : 'Dropdown'}
            </button>
          ))}
        </div>

        {/* Live Counter Simulation & Canvas theme */}
        <div className="flex items-center gap-3">
          {/* Badge count quick adjuster */}
          <div className="hidden xl:flex items-center gap-2 text-xs bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-400">
            <span className="text-[10px] uppercase font-bold text-slate-500">Symulacja liczników:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-blue-400 flex items-center gap-0.5">
                <ShoppingBag className="w-3 h-3" />
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={simCartCount}
                  onChange={(e) => setSimCartCount(parseInt(e.target.value) || 0)}
                  className="w-8 bg-slate-800 border border-slate-700 text-white text-center rounded text-[11px] py-0.5"
                />
              </span>
              <span className="text-[11px] text-rose-400 flex items-center gap-0.5">
                <Heart className="w-3 h-3" />
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={simWishlistCount}
                  onChange={(e) => setSimWishlistCount(parseInt(e.target.value) || 0)}
                  className="w-8 bg-slate-800 border border-slate-700 text-white text-center rounded text-[11px] py-0.5"
                />
              </span>
            </div>
          </div>

          {/* Canvas Background switch */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setCanvasBg('grid')}
              className={`px-2 py-0.5 rounded text-[10px] ${canvasBg === 'grid' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400'}`}
            >
              Siatka
            </button>
            <button
              onClick={() => setCanvasBg('dark')}
              className={`px-2 py-0.5 rounded text-[10px] ${canvasBg === 'dark' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400'}`}
            >
              Ciemne
            </button>
            <button
              onClick={() => setCanvasBg('light')}
              className={`px-2 py-0.5 rounded text-[10px] ${canvasBg === 'light' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400'}`}
            >
              Jasne
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className={`flex-1 overflow-auto p-4 md:p-8 flex flex-col items-center justify-start transition-colors duration-200 ${getCanvasBackgroundClass()}`}>
        {/* Device Frame Wrapper */}
        <div
          className={`w-full ${getViewportWidth()} transition-all duration-300 rounded-2xl border border-slate-800/80 shadow-2xl bg-white/95 text-slate-900 overflow-hidden flex flex-col min-h-[360px]`}
        >
          {/* Mock Browser Header for Realistic Context */}
          <div className="bg-slate-900 text-slate-400 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-800 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-400">
                https://twojsklep.pl/marketplace
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">
                Viewport: {deviceViewport.toUpperCase()} ({deviceViewport === 'mobile' ? '420px' : deviceViewport === 'tablet' ? '768px' : '100%'})
              </span>
            </div>
          </div>

          {/* Render Mode A: Full Store Header Context */}
          {viewMode === 'full_header' ? (
            <div className="flex flex-col bg-white">
              {/* Mini TopBar */}
              <div
                style={{
                  backgroundColor: state.topBar?.background?.color || '#0f172a',
                  color: state.topBar?.typography?.color || '#ffffff'
                }}
                className="px-4 py-1.5 text-xs flex items-center justify-between"
              >
                <span>Darmowa dostawa od 200 zł | Szybka wysyłka 24h</span>
                <span className="text-[11px] opacity-80">Infolinia: +48 800 123 456</span>
              </div>

              {/* Main Header Row with Logo, Search and Buttons */}
              <div className="px-6 py-4 flex items-center justify-between gap-4 border-b border-slate-100">
                {/* Logo area */}
                <div className="shrink-0 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                    M
                  </div>
                  <span className="font-black text-lg tracking-tight text-slate-900">
                    MARKET<span className="text-blue-600">PLACE</span>
                  </span>
                </div>

                {/* Simulated Search bar */}
                <div className="flex-1 max-w-md hidden md:block">
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      placeholder="Szukaj produktów, marek i kategorii..."
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl text-slate-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Interactive Buttons Cluster in Real Header */}
                <div
                  style={{
                    gap: `${globalConfig.spacingGapPx}px`,
                    padding: `${globalConfig.containerPaddingPx}px`
                  }}
                  className={`flex items-center ${
                    globalConfig.alignment === 'left'
                      ? 'justify-start'
                      : globalConfig.alignment === 'center'
                      ? 'justify-center'
                      : 'justify-end'
                  }`}
                >
                  {visibleItems.map((item) => (
                    <InteractiveButtonRenderer
                      key={item.id}
                      item={item}
                      device={deviceViewport}
                      forcedState={forcedState}
                      isSelected={item.id === selectedButtonId}
                      onSelect={() => onSelectButton(item.id)}
                      cartCount={simCartCount}
                      wishlistCount={simWishlistCount}
                      notificationsCount={simNotifCount}
                      messagesCount={simMsgCount}
                    />
                  ))}
                </div>
              </div>

              {/* Simulated Content Area */}
              <div className="p-8 bg-slate-50 min-h-[220px] flex flex-col items-center justify-center text-center text-slate-400">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Podgląd kontekstowy nagłówka sklepu
                </p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                  Kliknij w dowolny przycisk na pasku powyżej, aby natychmiast edytować jego parametry w panelu po prawej stronie.
                </p>
              </div>
            </div>
          ) : (
            /* Render Mode B: Isolated Element Canvas (Elementor style) */
            <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center bg-slate-50">
              <div className="w-full text-center mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-200/70 px-2.5 py-1 rounded-full">
                  Strefa przycisków interaktywnych
                </span>
              </div>

              {/* Button Cluster Container with ruler/guides */}
              <div className="relative p-6 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-sm w-full">
                <div
                  style={{
                    gap: `${globalConfig.spacingGapPx}px`,
                    padding: `${globalConfig.containerPaddingPx}px`
                  }}
                  className={`flex flex-wrap items-center ${
                    globalConfig.alignment === 'left'
                      ? 'justify-start'
                      : globalConfig.alignment === 'center'
                      ? 'justify-center'
                      : 'justify-end'
                  }`}
                >
                  {visibleItems.length === 0 ? (
                    <div className="text-xs text-slate-400 py-6 text-center w-full">
                      Wszystkie przyciski są ukryte na tym urządzeniu ({deviceViewport}).
                    </div>
                  ) : (
                    visibleItems.map((item) => (
                      <div key={item.id} className="relative group/box">
                        <InteractiveButtonRenderer
                          item={item}
                          device={deviceViewport}
                          forcedState={forcedState}
                          isSelected={item.id === selectedButtonId}
                          onSelect={() => onSelectButton(item.id)}
                          cartCount={simCartCount}
                          wishlistCount={simWishlistCount}
                          notificationsCount={simNotifCount}
                          messagesCount={simMsgCount}
                        />

                        {/* Hover tag helper */}
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover/box:opacity-100 transition-opacity pointer-events-none bg-slate-900 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap z-30">
                          {item.name}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Selected Item Quick Action Badge */}
              {selectedItem && (
                <div className="mt-6 flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs text-xs text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  <span className="font-semibold">
                    Zaznaczony element: <span className="text-blue-600 font-bold">{selectedItem.name}</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 text-[11px]">
                    Typ: <span className="font-medium text-slate-700 capitalize">{selectedItem.systemType}</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 text-[11px]">
                    Wyświetlanie: <span className="font-medium text-slate-700">{selectedItem.layout.displayMode}</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
