import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { BannerDynamicRenderer } from './renderers/BannerDynamicRenderer';
import { BannerSimulatedState } from '../../../types/bannerEditor';
import {
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Grid,
  Layers,
  Sliders,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface BannerLiveCanvasProps {
  onOpenMainSliderModal: () => void;
}

export const BannerLiveCanvas: React.FC<BannerLiveCanvasProps> = ({
  onOpenMainSliderModal
}) => {
  const {
    state,
    selectedBannerId,
    devicePreview,
    triggerToast
  } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [previewScope, setPreviewScope] = useState<'selected_only' | 'all_active'>('selected_only');
  const [simulatedState, setSimulatedState] = useState<BannerSimulatedState>('normal');
  const [canvasBgTheme, setCanvasBgTheme] = useState<'dark' | 'slate' | 'light' | 'checkered'>('dark');
  const [showGuides, setShowGuides] = useState<boolean>(false);

  const banners = state.banners?.items || [];
  const selectedBanner = banners.find(b => b.id === selectedBannerId) || banners[0];

  const handleCtaClick = (bannerTitle: string) => {
    triggerToast('info', 'Kliknięcie CTA', `Wywołano akcję przycisku banera: "${bannerTitle}".`);
  };

  // Viewport widths
  const getContainerWidth = () => {
    switch (deviceViewport) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'max-w-4xl';
    }
  };

  // Canvas background class
  const getCanvasBgClass = () => {
    switch (canvasBgTheme) {
      case 'light':
        return 'bg-slate-100 text-slate-900';
      case 'slate':
        return 'bg-slate-900 text-slate-100';
      case 'checkered':
        return 'bg-slate-950 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] text-white';
      case 'dark':
      default:
        return 'bg-[#0b0f19] text-white';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-slate-200 overflow-hidden select-none">
      {/* 1. TOP LIVE CANVAS TOOLBAR */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setDeviceViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceViewport === 'desktop'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceViewport === 'tablet'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceViewport === 'mobile'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>

        {/* Center: Scope Toggle (Selected vs All) & State Simulation */}
        <div className="flex items-center gap-2">
          {/* Scope */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setPreviewScope('selected_only')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                previewScope === 'selected_only'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Wybrany element
            </button>
            <button
              type="button"
              onClick={() => setPreviewScope('all_active')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                previewScope === 'all_active'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Wszystkie aktywne ({banners.filter(b => b.enabled).length})
            </button>
          </div>

          {/* State Simulation Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 text-[11px]">Symulacja stanu:</span>
            <select
              value={simulatedState}
              onChange={e => setSimulatedState(e.target.value as BannerSimulatedState)}
              className="bg-transparent text-white font-medium outline-none cursor-pointer text-xs"
            >
              <option value="normal" className="bg-slate-900 text-white">Normalny</option>
              <option value="hover" className="bg-slate-900 text-white">Po najechaniu (Hover)</option>
              <option value="active" className="bg-slate-900 text-white">Aktywny (Active/Click)</option>
              <option value="disabled" className="bg-slate-900 text-white">Wyłączony (Disabled)</option>
              <option value="loading" className="bg-slate-900 text-white">Ładowanie (Loading)</option>
              <option value="empty" className="bg-slate-900 text-white">Pusty (Empty)</option>
              <option value="error" className="bg-slate-900 text-white">Błąd (Error)</option>
            </select>
          </div>
        </div>

        {/* Right: Zoom & Background & Guides */}
        <div className="flex items-center gap-2">
          {/* Background switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {[
              { id: 'dark', title: 'Ciemny', color: 'bg-slate-950 border-slate-700' },
              { id: 'slate', title: 'Grafit', color: 'bg-slate-800 border-slate-600' },
              { id: 'light', title: 'Jasny', color: 'bg-slate-200 border-slate-400' },
              { id: 'checkered', title: 'Siatka', color: 'bg-slate-900 border-dashed border-blue-500' }
            ].map(theme => (
              <button
                key={theme.id}
                type="button"
                title={`Tło podglądu: ${theme.title}`}
                onClick={() => setCanvasBgTheme(theme.id as any)}
                className={`w-5 h-5 rounded border transition-all cursor-pointer ${theme.color} ${
                  canvasBgTheme === theme.id ? 'ring-2 ring-blue-500 scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Guides Toggle */}
          <button
            type="button"
            title="Przełącz linie pomocnicze kontenera"
            onClick={() => setShowGuides(prev => !prev)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              showGuides
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 15))}
              className="p-0.5 text-slate-400 hover:text-white cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] w-9 text-center text-blue-400 font-semibold">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
              className="p-0.5 text-slate-400 hover:text-white cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 100 && (
              <button
                type="button"
                title="Przywróć 100%"
                onClick={() => setZoomLevel(100)}
                className="ml-1 text-[10px] text-slate-400 hover:text-amber-400 cursor-pointer"
              >
                100%
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. CANVAS WORKSPACE */}
      <div className={`flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center transition-colors duration-300 ${getCanvasBgClass()}`}>
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center center',
            transition: 'transform 150ms ease-out'
          }}
          className={`w-full ${getContainerWidth()} transition-all duration-300 relative`}
        >
          {/* Guides Overlay */}
          {showGuides && (
            <div className="absolute inset-0 border-2 border-dashed border-blue-500/50 pointer-events-none rounded-2xl z-30 flex items-start justify-between p-2">
              <span className="bg-blue-600 text-white font-mono text-[10px] px-2 py-0.5 rounded shadow">
                Kontener: {deviceViewport.toUpperCase()}
              </span>
              <span className="bg-blue-600 text-white font-mono text-[10px] px-2 py-0.5 rounded shadow">
                Wyrównanie LIVE
              </span>
            </div>
          )}

          {/* Render Scope: Selected Only */}
          {previewScope === 'selected_only' && selectedBanner && (
            <div className="space-y-4">
              {/* Element Header Badge */}
              <div className="flex items-center justify-between text-xs px-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold text-slate-200">
                    Podgląd wybranego elementu: {selectedBanner.displayName || selectedBanner.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  ID: {selectedBanner.id} &bull; Typ: {selectedBanner.type}
                </span>
              </div>

              {/* Dynamic Banner Instance */}
              <BannerDynamicRenderer
                banner={selectedBanner}
                deviceViewport={deviceViewport}
                simulatedState={simulatedState}
                onOpenMainSliderModal={onOpenMainSliderModal}
                onCtaClick={() => handleCtaClick(selectedBanner.content.title)}
              />

              {/* Dedicated Banner Information Note */}
              {selectedBanner.type === 'main_slider_preview' && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3">
                  <SlidersHorizontal className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-300 font-bold mb-0.5">
                      Podgląd Głównego Slidera
                    </strong>
                    <p className="text-amber-200/80 leading-relaxed">
                      Zgodnie z zasadami architektury, Główny Slider ma dedykowany moduł konfiguracji slajdów, animacji i rotacji. W tym oknie możesz sprawdzić jak komponuje się z resztą sklepu lub kliknąć przycisk powyżej, aby otworzyć jego dedykowany edytor.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Render Scope: All Active In Flow */}
          {previewScope === 'all_active' && (
            <div className="space-y-6">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2 font-bold text-blue-400">
                  <Layers className="w-4 h-4" />
                  <span>Stos wszystkich aktywnych elementów w sekwencji</span>
                </span>
                <span className="text-slate-400">
                  Elementów aktywnych: {banners.filter(b => b.enabled).length}
                </span>
              </div>

              {banners
                .filter(b => b.enabled)
                .map(banner => (
                  <div key={banner.id} className="relative group">
                    <BannerDynamicRenderer
                      banner={banner}
                      deviceViewport={deviceViewport}
                      simulatedState={simulatedState}
                      onOpenMainSliderModal={onOpenMainSliderModal}
                      onCtaClick={() => handleCtaClick(banner.content.title)}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. CANVAS BOTTOM STATUS BAR */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Podgląd w czasie rzeczywistym aktywny
          </span>
          <span className="text-slate-600">|</span>
          <span>Viewport: {deviceViewport === 'desktop' ? '1280px+' : deviceViewport === 'tablet' ? '768px' : '390px'}</span>
          <span className="text-slate-600">|</span>
          <span>Stan: {simulatedState}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Kształt: {selectedBanner?.shape?.preset || 'karta'}</span>
          <span className="text-slate-600">&bull;</span>
          <span>Zaokrąglenie: {selectedBanner?.shape?.borderRadius || 0}px</span>
        </div>
      </div>
    </div>
  );
};
