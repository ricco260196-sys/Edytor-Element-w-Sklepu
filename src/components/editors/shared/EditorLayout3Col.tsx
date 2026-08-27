import React, { useState, useEffect, useRef } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Palette,
  Eye,
  Maximize2,
  Minimize2,
  Save,
  Send,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Undo2,
  Redo2
} from 'lucide-react';

export type DeviceViewport = 'desktop' | 'tablet' | 'mobile';

interface EditorLayout3ColProps {
  moduleTitle: string;
  moduleSubtitle: string;
  moduleIcon: React.ReactNode;
  activeModule: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'products' | 'widgets' | 'banners' | 'banners_sliders' | 'banery' | 'overview';
  onSelectModule: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'products' | 'widgets' | 'banners' | 'banners_sliders' | 'banery' | 'overview') => void;
  leftColumnContent: React.ReactNode;
  centerCanvasContent: React.ReactNode;
  rightColumnContent: React.ReactNode;
  deviceViewport: DeviceViewport;
  onDeviceChange: (device: DeviceViewport) => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  viewMode: 'element' | 'full_header';
  onViewModeChange: (mode: 'element' | 'full_header') => void;
  onResetToDefaults?: () => void;
  selectedElementName?: string | null;
  onDeselectElement?: () => void;
  isModified?: boolean;
}

export const EditorLayout3Col: React.FC<EditorLayout3ColProps> = ({
  moduleTitle,
  moduleSubtitle,
  moduleIcon,
  activeModule,
  onSelectModule,
  leftColumnContent,
  centerCanvasContent,
  rightColumnContent,
  deviceViewport,
  onDeviceChange,
  zoomLevel,
  onZoomChange,
  viewMode,
  onViewModeChange,
  onResetToDefaults,
  isModified
}) => {
  const {
    setViewMode,
    saveDraft,
    publishSettings,
    undo,
    redo,
    canUndo,
    canRedo
  } = useStoreAppearance();

  const [isFullscreenCanvas, setIsFullscreenCanvas] = useState(false);

  // Column width states
  const [leftColWidth, setLeftColWidth] = useState<number>(420);
  const [rightColWidth, setRightColWidth] = useState<number>(400);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState<boolean>(false);

  // Dragging states
  const [isDraggingLeft, setIsDraggingLeft] = useState<boolean>(false);
  const [isDraggingRight, setIsDraggingRight] = useState<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const handleLeftSplitterMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingLeft(true);
  };

  const handleRightSplitterMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingRight(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!workspaceRef.current) return;
      const workspaceRect = workspaceRef.current.getBoundingClientRect();

      if (isDraggingLeft) {
        const newLeftWidth = Math.max(300, Math.min(680, e.clientX - workspaceRect.left));
        setLeftColWidth(newLeftWidth);
        if (isLeftCollapsed) setIsLeftCollapsed(false);
      }

      if (isDraggingRight) {
        const newRightWidth = Math.max(300, Math.min(680, workspaceRect.right - e.clientX));
        setRightColWidth(newRightWidth);
        if (isRightCollapsed) setIsRightCollapsed(false);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
    };

    if (isDraggingLeft || isDraggingRight) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDraggingLeft, isDraggingRight, isLeftCollapsed, isRightCollapsed]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* 1. TOP MODULE NAVIGATION & TOOLBAR */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/95 px-4 sm:px-6 flex items-center justify-between shrink-0 z-30 backdrop-blur-md">
        {/* Left: Module Info + Module Switcher Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 mr-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              {moduleIcon}
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white tracking-tight">{moduleTitle}</span>
                {isModified && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Niezapisane</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 leading-none">{moduleSubtitle}</p>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden md:block" />

          {/* Module Switcher Pills */}
          <nav className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-slate-800" aria-label="Wybór sekcji edytora">
            <button
              onClick={() => onSelectModule('topbar')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'topbar'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              1. Pasek Górny
            </button>
            <button
              onClick={() => onSelectModule('logo')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'logo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              2. Logo Sklepu
            </button>
            <button
              onClick={() => onSelectModule('menu')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'menu'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              3. Menu Główne
            </button>
            <button
              onClick={() => onSelectModule('search')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'search' || activeModule === 'search_bar'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              4. Wyszukiwarka
            </button>
            <button
              onClick={() => onSelectModule('buttons')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'buttons' || activeModule === 'actions'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              5. Przyciski i akcje
            </button>
            <button
              onClick={() => onSelectModule('categories')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'categories'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              6. Kategorie
            </button>
            <button
              onClick={() => onSelectModule('products')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'products'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              7. Siatka produktów
            </button>
            <button
              onClick={() => onSelectModule('widgets')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'widgets'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              8. Widżety
            </button>
            <button
              onClick={() => onSelectModule('banners')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'banners' || activeModule === 'banners_sliders' || activeModule === 'banery'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              9. Banery i Slidery
            </button>
            <button
              onClick={() => onSelectModule('overview')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeModule === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Przegląd
            </button>
          </nav>
        </div>

        {/* Center: Device Viewport Controls & Undo / Redo */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <div className="flex items-center gap-0.5 border-r border-slate-800 pr-1.5 mr-1">
            <button
              disabled={!canUndo}
              onClick={undo}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 rounded"
              title="Cofnij zmianę (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              disabled={!canRedo}
              onClick={redo}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 rounded"
              title="Ponów zmianę (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => onDeviceChange('desktop')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                deviceViewport === 'desktop'
                  ? 'bg-slate-800 text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Widok Komputer"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Desktop</span>
            </button>
            <button
              onClick={() => onDeviceChange('tablet')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                deviceViewport === 'tablet'
                  ? 'bg-slate-800 text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Widok Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="text-[11px]">Tablet</span>
            </button>
            <button
              onClick={() => onDeviceChange('mobile')}
              className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-colors ${
                deviceViewport === 'mobile'
                  ? 'bg-slate-800 text-blue-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Widok Telefon (420px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">Mobile</span>
            </button>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Mode Switch: Isolated Element vs Full Header */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => onViewModeChange('element')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                viewMode === 'element'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tylko ten moduł
            </button>
            <button
              onClick={() => onViewModeChange('full_header')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                viewMode === 'full_header'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pełny Nagłówek Sklepu
            </button>
          </div>
        </div>

        {/* Right: Quick actions (Save Draft, Publish, Storefront Preview, Reset) */}
        <div className="flex items-center gap-2">
          <button
            onClick={saveDraft}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all shadow-sm"
            title="Zapisz wersję roboczą"
          >
            <Save className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Zapisz Szkic</span>
          </button>

          <button
            onClick={publishSettings}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-900/30"
            title="Opublikuj zmiany na żywo w sklepie"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publikuj w Sklepie</span>
          </button>

          <button
            onClick={() => setViewMode('storefront')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Zobacz sklep (Storefront)"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
          </button>

          <div className="hidden sm:flex items-center bg-slate-950/80 rounded-lg border border-slate-800 px-1 py-0.5">
            <button
              onClick={() => onZoomChange(Math.max(70, zoomLevel - 10))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Pomniejsz"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 w-10 text-center">{zoomLevel}%</span>
            <button
              onClick={() => onZoomChange(Math.min(130, zoomLevel + 10))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Powiększ"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {onResetToDefaults && (
            <button
              onClick={onResetToDefaults}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
              title="Przywróć domyślne ustawienia"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Domyślne</span>
            </button>
          )}

          <button
            onClick={() => setIsFullscreenCanvas(!isFullscreenCanvas)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            title={isFullscreenCanvas ? 'Zwiń pełny ekran' : 'Pełny ekran'}
          >
            {isFullscreenCanvas ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. THREE COLUMNS WORKSPACE BODY */}
      <div ref={workspaceRef} className="flex-1 flex w-full overflow-hidden relative">
        {/* COLUMN 1: LEFT SETTINGS */}
        {!isFullscreenCanvas && (
          <aside
            id="editor-col-left"
            style={{
              width: isLeftCollapsed ? '0px' : `${leftColWidth}px`,
              minWidth: isLeftCollapsed ? '0px' : '280px',
              maxWidth: '720px'
            }}
            className={`shrink-0 border-r border-slate-800 bg-slate-900/95 flex flex-col h-full overflow-hidden z-10 transition-[width] ${
              isDraggingLeft ? 'transition-none' : 'duration-150'
            }`}
          >
            {!isLeftCollapsed && (
              <>
                <div className="px-3 py-2.5 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <Sliders className="w-4 h-4 text-blue-400 shrink-0" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 truncate">
                      1. Drzewo & Zawartość
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setLeftColWidth(leftColWidth >= 500 ? 380 : leftColWidth >= 420 ? 540 : 460)}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-blue-400 font-mono font-bold transition-colors"
                    >
                      {leftColWidth}px
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLeftCollapsed(true)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Zwiń lewy panel"
                    >
                      <PanelLeftClose className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                  {leftColumnContent}
                </div>
              </>
            )}
          </aside>
        )}

        {/* LEFT DRAG SPLITTER */}
        {!isFullscreenCanvas && (
          <div
            onMouseDown={handleLeftSplitterMouseDown}
            className={`w-2 shrink-0 cursor-col-resize hover:bg-blue-500/40 active:bg-blue-500 flex items-center justify-center relative group z-20 transition-colors ${
              isDraggingLeft ? 'bg-blue-500' : 'bg-slate-900 border-r border-slate-800/80'
            }`}
          >
            {isLeftCollapsed ? (
              <button
                type="button"
                onClick={() => setIsLeftCollapsed(false)}
                className="absolute left-1 top-3 p-1 rounded-md bg-blue-600 text-white shadow-md hover:bg-blue-500 z-30"
                title="Rozwiń lewy panel"
              >
                <PanelLeftOpen className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="w-1 h-8 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
            )}
          </div>
        )}

        {/* COLUMN 2: CENTER INTERACTIVE CANVAS */}
        <main
          id="editor-col-center"
          className="flex-1 min-w-0 flex flex-col h-full bg-slate-950 overflow-hidden relative"
        >
          {centerCanvasContent}
        </main>

        {/* RIGHT DRAG SPLITTER */}
        {!isFullscreenCanvas && (
          <div
            onMouseDown={handleRightSplitterMouseDown}
            className={`w-2 shrink-0 cursor-col-resize hover:bg-purple-500/40 active:bg-purple-500 flex items-center justify-center relative group z-20 transition-colors ${
              isDraggingRight ? 'bg-purple-500' : 'bg-slate-900 border-l border-slate-800/80'
            }`}
          >
            {isRightCollapsed ? (
              <button
                type="button"
                onClick={() => setIsRightCollapsed(false)}
                className="absolute right-1 top-3 p-1 rounded-md bg-purple-600 text-white shadow-md hover:bg-purple-500 z-30"
                title="Rozwiń prawy panel"
              >
                <PanelRightOpen className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="w-1 h-8 rounded-full bg-slate-700 group-hover:bg-purple-400 transition-colors" />
            )}
          </div>
        )}

        {/* COLUMN 3: RIGHT SETTINGS */}
        {!isFullscreenCanvas && (
          <aside
            id="editor-col-right"
            style={{
              width: isRightCollapsed ? '0px' : `${rightColWidth}px`,
              minWidth: isRightCollapsed ? '0px' : '280px',
              maxWidth: '720px'
            }}
            className={`shrink-0 border-l border-slate-800 bg-slate-900/95 flex flex-col h-full overflow-hidden z-10 transition-[width] ${
              isDraggingRight ? 'transition-none' : 'duration-150'
            }`}
          >
            {!isRightCollapsed && (
              <>
                <div className="px-3 py-2.5 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <Palette className="w-4 h-4 text-purple-400 shrink-0" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 truncate">
                      2. Wygląd & Stylistyka
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setRightColWidth(rightColWidth >= 500 ? 380 : rightColWidth >= 400 ? 540 : 460)}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800 hover:bg-slate-700 text-purple-400 font-mono font-bold transition-colors"
                    >
                      {rightColWidth}px
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRightCollapsed(true)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Zwiń prawy panel"
                    >
                      <PanelRightClose className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                  {rightColumnContent}
                </div>
              </>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};
