import React, { useState } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { FooterDynamicRenderer } from './renderers/FooterDynamicRenderer';
import { DevicePreview } from '../../../types/storeAppearance';
import {
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Info,
  Layers,
  MousePointerClick
} from 'lucide-react';

interface FooterLiveCanvasProps {
  onSelectSection: (sectionId: string) => void;
  onSelectSubElement: (elementKey: string) => void;
}

export const FooterLiveCanvas: React.FC<FooterLiveCanvasProps> = ({
  onSelectSection,
  onSelectSubElement
}) => {
  const {
    state,
    devicePreview,
    setDevicePreview,
    selectedFooterSectionId
  } = useStoreAppearance();

  const footer = state.footer;
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const getContainerWidth = () => {
    switch (devicePreview) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full max-w-[1500px]';
    }
  };

  const getDeviceDimensions = () => {
    switch (devicePreview) {
      case 'mobile': return '390 × 844 px (iPhone)';
      case 'tablet': return '768 × 1024 px (iPad)';
      case 'desktop': return '1440 × 900 px (Desktop HD)';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden select-none">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md z-10">
        {/* Device Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setDevicePreview('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              devicePreview === 'desktop'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDevicePreview('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              devicePreview === 'tablet'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDevicePreview('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              devicePreview === 'mobile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Info & Dimensions */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Podgląd LIVE: <strong className="text-slate-200">{getDeviceDimensions()}</strong></span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Pomniejsz podgląd"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-300 w-10 text-center">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Powiększ podgląd"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-1"
            title="Resetuj skalę"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Live Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-end justify-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
        <div
          className={`transition-all duration-300 w-full ${getContainerWidth()} shadow-2xl rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/40`}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'bottom center'
          }}
        >
          {/* Simulated Webpage Content Above Footer to give real visual context */}
          <div className="p-6 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-blue-400 animate-bounce" />
              <span>Kliknij dowolny element stopki, aby przejść natychmiast do jego edycji</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
              Koniec strony sklepu (Footer)
            </span>
          </div>

          {/* Actual Footer Dynamic Component */}
          <FooterDynamicRenderer
            config={footer}
            device={devicePreview}
            isInteractive={true}
            selectedSectionId={selectedFooterSectionId}
            onSelectSection={onSelectSection}
            onSelectSubElement={onSelectSubElement}
          />
        </div>
      </div>
    </div>
  );
};
