import React, { useState, useEffect } from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import {
  MainSliderDedicatedConfig,
  MainSliderSlide
} from '../../../types/bannerEditor';
import {
  X,
  Plus,
  Trash2,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Image as ImageIcon,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface MainSliderDedicatedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MainSliderDedicatedModal: React.FC<MainSliderDedicatedModalProps> = ({
  isOpen,
  onClose
}) => {
  const {
    state,
    updateMainSliderDedicated,
    triggerToast
  } = useStoreAppearance();

  const mainSliderConfig: MainSliderDedicatedConfig = state.banners?.mainSlider || {
    enabled: true,
    autoplay: true,
    autoplayIntervalMs: 5000,
    pauseOnHover: true,
    transitionEffect: 'fade',
    transitionDurationMs: 600,
    showArrows: true,
    arrowsStyle: 'glass',
    showDots: true,
    dotsStyle: 'bars',
    heightDesktopPx: 480,
    heightTabletPx: 380,
    heightMobilePx: 300,
    borderRadius: 20,
    slides: []
  };

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [selectedEditingSlideId, setSelectedEditingSlideId] = useState<string>(
    mainSliderConfig.slides[0]?.id || ''
  );
  const [isPlayingLive, setIsPlayingLive] = useState<boolean>(mainSliderConfig.autoplay);

  // Auto rotation in preview
  useEffect(() => {
    if (!isOpen || !isPlayingLive || mainSliderConfig.slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex(prev => (prev + 1) % mainSliderConfig.slides.length);
    }, mainSliderConfig.autoplayIntervalMs || 5000);
    return () => clearInterval(interval);
  }, [isOpen, isPlayingLive, mainSliderConfig.autoplayIntervalMs, mainSliderConfig.slides.length]);

  if (!isOpen) return null;

  const currentEditingSlide =
    mainSliderConfig.slides.find(s => s.id === selectedEditingSlideId) ||
    mainSliderConfig.slides[0];

  const handleUpdateConfig = (
    updater: Partial<MainSliderDedicatedConfig> | ((prev: MainSliderDedicatedConfig) => MainSliderDedicatedConfig)
  ) => {
    updateMainSliderDedicated(updater);
  };

  const handleUpdateSlide = (
    slideId: string,
    updates: Partial<MainSliderSlide>
  ) => {
    handleUpdateConfig(prev => ({
      ...prev,
      slides: prev.slides.map(s => (s.id === slideId ? { ...s, ...updates } : s))
    }));
  };

  const handleAddSlide = () => {
    const newSlide: MainSliderSlide = {
      id: `slide-${Date.now()}`,
      isActive: true,
      title: 'Nowy Promocyjny Slajd',
      subtitle: 'Przykładowy opis oferty i rabatu w głównym sliderze sklepu.',
      badge: 'NOWOŚĆ',
      buttonText: 'Sprawdź Ofertę',
      buttonLink: '/nowosci',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&auto=format&fit=crop&q=80',
      bgGradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 58, 138, 0.6) 100%)',
      textColor: '#ffffff'
    };

    handleUpdateConfig(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));

    setSelectedEditingSlideId(newSlide.id);
    setActiveSlideIndex(mainSliderConfig.slides.length);
    triggerToast('success', 'Dodano slajd', 'Nowy slajd został dodany do głównego slidera.');
  };

  const handleDeleteSlide = (slideId: string) => {
    if (mainSliderConfig.slides.length <= 1) {
      triggerToast('warning', 'Nie można usunąć', 'Główny slider musi zawierać co najmniej jeden slajd.');
      return;
    }

    handleUpdateConfig(prev => ({
      ...prev,
      slides: prev.slides.filter(s => s.id !== slideId)
    }));

    setActiveSlideIndex(0);
    triggerToast('info', 'Usunięto slajd', 'Slajd został usunięty ze slidera.');
  };

  const activeDisplaySlide = mainSliderConfig.slides[activeSlideIndex] || mainSliderConfig.slides[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Edytor Głównego Slidera</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  Dedykowany Moduł
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Konfiguracja slajdów, rotacji, animacji przejść i zachowania głównego banera sklepu
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Banner on Separation */}
        <div className="px-4 py-2.5 bg-blue-950/40 border-b border-blue-900/50 flex items-center gap-2 text-xs text-blue-200 shrink-0">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            <strong>Zasada separacji zadań:</strong> Edytor Banerów i Sliderów odpowiada wyłącznie za styl wizualny, podczas gdy w tym dedykowanym module konfigurujesz kompletną logikę rotacji, slajdy i przejścia.
          </span>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. LIVE SLIDER PREVIEW */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Interaktywny podgląd LIVE:</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlayingLive(prev => !prev)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer"
                >
                  {isPlayingLive ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  <span>{isPlayingLive ? 'Zatrzymaj rotację' : 'Wznów rotację'}</span>
                </button>
                <span>Slajd {activeSlideIndex + 1} z {mainSliderConfig.slides.length}</span>
              </div>
            </div>

            {/* Slider Live Container */}
            <div
              style={{
                height: `${mainSliderConfig.heightDesktopPx}px`,
                borderRadius: `${mainSliderConfig.borderRadius}px`
              }}
              className="relative w-full overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group select-none transition-all"
            >
              {/* Background Image */}
              {activeDisplaySlide?.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={activeDisplaySlide.imageUrl}
                    alt={activeDisplaySlide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/45 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10" />
                </div>
              )}

              {/* Slide Content */}
              <div className="relative z-20 h-full p-8 sm:p-12 flex flex-col justify-between max-w-2xl text-white">
                {/* Badge */}
                {activeDisplaySlide?.badge && (
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600/40 text-blue-300 border border-blue-400/40 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                      <Zap className="w-3 h-3" />
                      <span>{activeDisplaySlide.badge}</span>
                    </span>
                  </div>
                )}

                {/* Main Heading & Subtitle */}
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                    {activeDisplaySlide?.title}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed drop-shadow">
                    {activeDisplaySlide?.subtitle}
                  </p>

                  {/* CTA */}
                  {activeDisplaySlide?.buttonText && (
                    <div className="pt-3">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/40 border border-blue-400/30 transition-all cursor-pointer"
                      >
                        <span>{activeDisplaySlide.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Dots in Preview */}
                {mainSliderConfig.showDots && (
                  <div className="flex items-center gap-2 pt-4">
                    {mainSliderConfig.slides.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`h-2.5 rounded-full transition-all cursor-pointer ${
                          idx === activeSlideIndex
                            ? 'w-8 bg-blue-500 shadow-md'
                            : 'w-2.5 bg-slate-600/80 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              {mainSliderConfig.showArrows && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlideIndex(prev =>
                        prev === 0 ? mainSliderConfig.slides.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700/80 backdrop-blur-md transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlideIndex(prev =>
                        (prev + 1) % mainSliderConfig.slides.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700/80 backdrop-blur-md transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 2. SPLIT CONFIGURATION: SLIDES LIST & GLOBAL SLIDER SETTINGS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Slides Manager */}
            <div className="space-y-4 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Slajdy w rotacji ({mainSliderConfig.slides.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Dodaj slajd</span>
                </button>
              </div>

              {/* Slides Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {mainSliderConfig.slides.map((slide, idx) => {
                  const isSelected = selectedEditingSlideId === slide.id;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        setSelectedEditingSlideId(slide.id);
                        setActiveSlideIndex(idx);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <span>Slajd {idx + 1}</span>
                      <span className="text-[10px] opacity-80 truncate max-w-[100px]">
                        ({slide.title})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Editing Form for Current Slide */}
              {currentEditingSlide && (
                <div className="space-y-3.5 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">
                      Edycja: Slajd &bull; {currentEditingSlide.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(currentEditingSlide.id)}
                      className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Usuń ten slajd</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Tytuł slajdu:</label>
                    <input
                      type="text"
                      value={currentEditingSlide.title}
                      onChange={e => handleUpdateSlide(currentEditingSlide.id, { title: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Podtytuł / Opis:</label>
                    <textarea
                      rows={2}
                      value={currentEditingSlide.subtitle}
                      onChange={e => handleUpdateSlide(currentEditingSlide.id, { subtitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Odznaka (Badge):</label>
                      <input
                        type="text"
                        value={currentEditingSlide.badge || ''}
                        onChange={e => handleUpdateSlide(currentEditingSlide.id, { badge: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Przycisk CTA (Tekst):</label>
                      <input
                        type="text"
                        value={currentEditingSlide.buttonText || ''}
                        onChange={e => handleUpdateSlide(currentEditingSlide.id, { buttonText: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Adres URL grafiki tła:</label>
                    <input
                      type="text"
                      value={currentEditingSlide.imageUrl || ''}
                      onChange={e => handleUpdateSlide(currentEditingSlide.id, { imageUrl: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Global Slider Behaviour & Autoplay */}
            <div className="space-y-4 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800 text-xs">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Rotacja, Animacje i Nawigacja</span>
              </h3>

              {/* Autoplay toggle */}
              <div className="space-y-3">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="font-semibold text-slate-200">Automatyczna rotacja (Autoplay)</span>
                  <input
                    type="checkbox"
                    checked={mainSliderConfig.autoplay}
                    onChange={e =>
                      handleUpdateConfig(prev => ({
                        ...prev,
                        autoplay: e.target.checked
                      }))
                    }
                    className="rounded border-slate-700 text-blue-600"
                  />
                </label>

                {mainSliderConfig.autoplay && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Czas wyświetlania slajdu (Interwał):</span>
                      <span className="font-mono text-amber-400">
                        {((mainSliderConfig.autoplayIntervalMs || 5000) / 1000).toFixed(1)}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2000}
                      max={12000}
                      step={500}
                      value={mainSliderConfig.autoplayIntervalMs || 5000}
                      onChange={e =>
                        handleUpdateConfig(prev => ({
                          ...prev,
                          autoplayIntervalMs: parseInt(e.target.value) || 5000
                        }))
                      }
                      className="w-full accent-amber-500"
                    />
                  </div>
                )}
              </div>

              {/* Transition effect */}
              <div className="pt-2 border-t border-slate-800/80">
                <label className="block text-slate-400 mb-1">Efekt przejścia między slajdami:</label>
                <select
                  value={mainSliderConfig.transitionEffect}
                  onChange={e =>
                    handleUpdateConfig(prev => ({
                      ...prev,
                      transitionEffect: e.target.value as any
                    }))
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="fade">Płynne zanikanie (Fade)</option>
                  <option value="slide">Przesuwanie horyzontalne (Slide)</option>
                  <option value="zoom">Powiększenie (Zoom in)</option>
                  <option value="cube">Kostka 3D (Cube)</option>
                </select>
              </div>

              {/* Heights */}
              <div className="pt-2 border-t border-slate-800/80">
                <label className="block text-slate-400 mb-1">Wysokość slidera na komputerach (px):</label>
                <input
                  type="number"
                  min={300}
                  max={700}
                  value={mainSliderConfig.heightDesktopPx}
                  onChange={e =>
                    handleUpdateConfig(prev => ({
                      ...prev,
                      heightDesktopPx: parseInt(e.target.value) || 480
                    }))
                  }
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>

              {/* Arrow and Dot toggles */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mainSliderConfig.showArrows}
                    onChange={e =>
                      handleUpdateConfig(prev => ({
                        ...prev,
                        showArrows: e.target.checked
                      }))
                    }
                    className="rounded border-slate-700 text-blue-600"
                  />
                  <span>Strzałki boczne</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mainSliderConfig.showDots}
                    onChange={e =>
                      handleUpdateConfig(prev => ({
                        ...prev,
                        showDots: e.target.checked
                      }))
                    }
                    className="rounded border-slate-700 text-blue-600"
                  />
                  <span>Kropki nawigacji</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Zmiany w głównym sliderze zapisują się automatycznie w stanie platformy.
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Zatwierdź i Zamknij</span>
          </button>
        </div>
      </div>
    </div>
  );
};
