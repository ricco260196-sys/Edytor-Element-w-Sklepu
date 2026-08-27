import React, { useState, useEffect, useRef } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { SearchBarConfig } from '../../types/storeAppearance';
import { SYSTEM_CATEGORIES } from '../../data/marketplaceCatalogue';
import {
  executeMarketplaceSearch,
  SearchQueryResult,
  SearchProductItem
} from '../../data/marketplaceSearchEngine';
import { IconRenderer } from '../common/IconRenderer';
import {
  Search,
  X,
  Mic,
  QrCode,
  ChevronDown,
  Sparkles,
  History,
  TrendingUp,
  Store,
  Folder,
  ArrowRight,
  ShoppingCart,
  Star,
  Zap,
  Check,
  RotateCcw
} from 'lucide-react';

interface StoreSearchBarProps {
  customConfig?: SearchBarConfig;
  forcedState?: 'normal' | 'focus' | 'results' | 'empty' | 'loading';
  forcedQuery?: string;
  isCanvasSimulated?: boolean;
  onSearchSubmit?: (query: string, category: string) => void;
  className?: string;
}

export const StoreSearchBar: React.FC<StoreSearchBarProps> = ({
  customConfig,
  forcedState,
  forcedQuery,
  isCanvasSimulated = false,
  onSearchSubmit,
  className = ''
}) => {
  const { state, triggerToast } = useStoreAppearance();
  const searchConfig = customConfig || state.searchBar;

  const {
    enabled,
    dimensions,
    structure,
    engine,
    suggestions,
    resultsDropdown,
    appearance,
    typography,
    animations,
    accessibility
  } = searchConfig;

  // Search query state
  const [internalQuery, setInternalQuery] = useState(forcedQuery || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    structure.selectedCategoryScope || 'all'
  );
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchQueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Smartfony 5G',
    'Słuchawki ANC bezprzewodowe',
    'Klawiatura mechaniczna'
  ]);
  const [voiceActive, setVoiceActive] = useState(false);
  const [rotatorIndex, setRotatorIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync forcedQuery
  useEffect(() => {
    if (forcedQuery !== undefined) {
      setInternalQuery(forcedQuery);
    }
  }, [forcedQuery]);

  // Handle Placeholder Rotator
  useEffect(() => {
    if (!structure.placeholderRotatorEnabled || structure.placeholderRotatorItems.length <= 1) return;
    const interval = setInterval(() => {
      setRotatorIndex(prev => (prev + 1) % structure.placeholderRotatorItems.length);
    }, structure.placeholderRotatorIntervalMs || 4000);
    return () => clearInterval(interval);
  }, [structure.placeholderRotatorEnabled, structure.placeholderRotatorItems, structure.placeholderRotatorIntervalMs]);

  // Handle Search Execution
  useEffect(() => {
    if (forcedState === 'loading') {
      setIsLoading(true);
      return;
    }

    if (forcedState === 'empty') {
      setIsLoading(false);
      setSearchResults({
        products: [],
        categories: [],
        vendors: [],
        popularSuggestions: [],
        totalMatchesCount: 0,
        executionTimeMs: 4
      });
      return;
    }

    const q = forcedQuery !== undefined ? forcedQuery : internalQuery;
    if (!q || q.trim().length < (engine.minCharsToTrigger || 2)) {
      setSearchResults(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const res = executeMarketplaceSearch(q, selectedCategory, engine);
      setSearchResults(res);
      setIsLoading(false);
    }, engine.debounceMs || 200);

    return () => clearTimeout(timer);
  }, [internalQuery, forcedQuery, selectedCategory, forcedState, engine]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isCanvasSimulated && forcedState) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCanvasSimulated, forcedState]);

  // Keyboard shortcut listener (e.g. '/')
  useEffect(() => {
    if (!accessibility.keyboardShortcutsEnabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === accessibility.shortcutKey && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [accessibility]);

  if (!enabled) {
    return null;
  }

  const currentPlaceholder =
    structure.placeholderRotatorEnabled && structure.placeholderRotatorItems.length > 0
      ? structure.placeholderRotatorItems[rotatorIndex]
      : structure.placeholderText || 'Szukaj produktów...';

  const shouldShowDropdown =
    forcedState === 'results' ||
    forcedState === 'empty' ||
    forcedState === 'loading' ||
    forcedState === 'focus' ||
    (isFocused && (internalQuery.length >= (engine.minCharsToTrigger || 2) || suggestions.enabled));

  // Category name resolver
  const getSelectedCategoryLabel = () => {
    if (selectedCategory === 'all') return 'Wszystkie';
    const found = SYSTEM_CATEGORIES.find(c => c.id === selectedCategory);
    return found ? found.name : 'Kategoria';
  };

  const handleClear = () => {
    setInternalQuery('');
    setSearchResults(null);
    inputRef.current?.focus();
  };

  const handleVoiceSearch = () => {
    setVoiceActive(true);
    triggerToast?.('info', 'Wyszukiwanie głosowe', 'Nasłuchiwanie... (Symulacja Web Speech API)');
    setTimeout(() => {
      setInternalQuery('Słuchawki bezprzewodowe');
      setVoiceActive(false);
    }, 1500);
  };

  const handleQrSearch = () => {
    triggerToast?.('info', 'Skaner Kodów QR / EAN', 'Uruchomiono kamerę do skanowania kodów kreskowych produktu.');
  };

  const handlePerformSubmit = (targetQuery?: string) => {
    const q = targetQuery !== undefined ? targetQuery : internalQuery;
    if (!q) return;

    // Add to history
    setSearchHistory(prev => [q, ...prev.filter(item => item !== q)].slice(0, suggestions.maxHistoryItems || 5));
    setIsFocused(false);
    setIsCategoryDropdownOpen(false);

    if (onSearchSubmit) {
      onSearchSubmit(q, selectedCategory);
    } else {
      triggerToast?.('success', 'Wyszukiwanie', `Wyszukano frazę: "${q}" w kategorii: ${getSelectedCategoryLabel()}`);
    }
  };

  // Compute shadow style
  const getBoxShadow = () => {
    if (isFocused) {
      return `0 0 0 3px ${appearance.focusGlowColor || 'rgba(37, 99, 235, 0.2)'}`;
    }
    if (appearance.shadow === 'sm') return '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    if (appearance.shadow === 'md') return '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    if (appearance.shadow === 'lg') return '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    if (appearance.shadow === 'glow') return `0 0 15px ${appearance.focusGlowColor || 'rgba(37, 99, 235, 0.3)'}`;
    return 'none';
  };

  return (
    <div
      ref={containerRef}
      className={`relative transition-all select-none ${className}`}
      style={{
        zIndex: dimensions.zIndex || 40,
        maxWidth: dimensions.widthType === 'custom' ? `${dimensions.customWidthPx}px` : `${dimensions.maxWidthPx || 720}px`,
        width: dimensions.widthType === 'full' ? '100%' : '100%'
      }}
    >
      {/* 1. MAIN SEARCH BAR CONTAINER */}
      <div
        className="w-full flex items-center transition-all"
        style={{
          height: `${dimensions.heightPx || 44}px`,
          backgroundColor: isFocused ? appearance.focusedBackgroundColor : appearance.backgroundColor,
          borderColor: isFocused ? appearance.focusedBorderColor : appearance.borderColor,
          borderWidth: `${appearance.borderWidth || 1}px`,
          borderStyle: appearance.borderStyle || 'solid',
          borderRadius: `${appearance.borderRadius || 16}px`,
          boxShadow: getBoxShadow(),
          transitionDuration: `${animations.transitionDurationMs || 200}ms`
        }}
      >
        {/* CATEGORY FILTER (Left Position) */}
        {structure.showCategoryFilter && structure.categoryFilterPosition === 'left' && (
          <div className="relative shrink-0 h-full flex items-center border-r" style={{ borderColor: appearance.borderColor }}>
            <button
              type="button"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="h-full px-3 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: appearance.categoryFilterBg || 'transparent',
                color: appearance.categoryFilterText || appearance.textColor
              }}
            >
              <span className="truncate max-w-[110px]">{getSelectedCategoryLabel()}</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Category selection popup */}
            {isCategoryDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1.5 max-h-72 overflow-y-auto text-xs"
              >
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Wybierz zakres kategorii
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setIsCategoryDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    selectedCategory === 'all' ? 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    Wszystkie kategorie
                  </span>
                  {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>

                {SYSTEM_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                      selectedCategory === cat.id ? 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <IconRenderer name={cat.icon} size={14} className="text-slate-400" />
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-slate-400">({cat.productCount})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SEARCH ICON */}
        {structure.showSearchIcon && (
          <div className="pl-3.5 pr-1 flex items-center shrink-0" style={{ color: appearance.placeholderColor }}>
            <Search className="w-4 h-4" />
          </div>
        )}

        {/* TEXT INPUT FIELD */}
        <div className="relative flex-1 h-full flex items-center min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={internalQuery}
            onChange={(e) => setInternalQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handlePerformSubmit();
              } else if (e.key === 'Escape') {
                setIsFocused(false);
              }
            }}
            placeholder={currentPlaceholder}
            aria-label={accessibility.ariaLabel || 'Wyszukiwarka'}
            className="w-full h-full bg-transparent px-2.5 focus:outline-none truncate"
            style={{
              color: appearance.textColor,
              fontFamily: typography.fontFamily === 'display' ? 'Plus Jakarta Sans, sans-serif' : 'inherit',
              fontSize: `${typography.fontSizePx || 13}px`,
              fontWeight: typography.fontWeight || '400'
            }}
          />
        </div>

        {/* INTERACTIVE ACTIONS: CLEAR, VOICE, QR */}
        <div className="flex items-center gap-1 pr-1.5 shrink-0">
          {/* CLEAR BUTTON */}
          {structure.showClearButton && internalQuery.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
              title={accessibility.clearButtonAriaLabel || 'Wyczyść zapytanie'}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* VOICE SEARCH */}
          {structure.showVoiceSearch && (
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-1.5 rounded-full transition-all ${
                voiceActive
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Wyszukiwanie głosowe"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          )}

          {/* QR / BARCODE SCANNER */}
          {structure.showQrScanner && (
            <button
              type="button"
              onClick={handleQrSearch}
              className="p-1.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
              title="Skanuj kod kreskowy / QR"
            >
              <QrCode className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        {structure.showSubmitButton && (
          <div className="pr-1 shrink-0">
            <button
              type="button"
              onClick={() => handlePerformSubmit()}
              className="h-[34px] px-4 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              style={{
                backgroundColor: appearance.buttonBgColor || '#2563eb',
                color: appearance.buttonTextColor || '#ffffff',
                borderRadius: `${appearance.buttonBorderRadius || 12}px`
              }}
            >
              {structure.submitButtonIcon && <Search className="w-3.5 h-3.5" />}
              <span>{structure.submitButtonText || 'Szukaj'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. AUTOCOMPLETE & RESULTS DROPDOWN MODAL */}
      {shouldShowDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          style={{
            backgroundColor: appearance.dropdownBgColor || '#ffffff',
            borderColor: appearance.dropdownBorderColor || '#e2e8f0',
            maxHeight: `${resultsDropdown.maxHeightPx || 480}px`
          }}
        >
          {/* A. LOADING SKELETON */}
          {isLoading && (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Przeszukiwanie bazy ofert...</span>
              </div>
              {Array.from({ length: resultsDropdown.loadingSkeletonRows || 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* B. INITIAL SUGGESTIONS & SEARCH HISTORY */}
          {!isLoading && (!searchResults || searchResults.products.length === 0 && !internalQuery) && (
            <div className="p-4 space-y-4 text-xs">
              {suggestions.showSearchHistory && searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" />
                      Ostatnie wyszukiwania
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchHistory([])}
                      className="text-[10px] hover:text-rose-500 lowercase underline"
                    >
                      wyczyść
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {searchHistory.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setInternalQuery(item);
                          handlePerformSubmit(item);
                        }}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 rounded-lg text-slate-700 dark:text-slate-300 font-medium transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3 h-3 text-slate-400" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.popularSearches && suggestions.popularSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                    Popularne w tym tygodniu
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {suggestions.popularSearches.map((term, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setInternalQuery(term);
                          handlePerformSubmit(term);
                        }}
                        className="text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-slate-700 dark:text-slate-300 transition-colors group"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <span className="w-4 text-center font-bold text-[10px] text-slate-400 group-hover:text-blue-600">
                            {idx + 1}
                          </span>
                          {term}
                        </span>
                        {suggestions.showTrendingBadges && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                            TREND
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* C. LIVE RESULTS */}
          {!isLoading && searchResults && searchResults.totalMatchesCount > 0 && (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[420px] overflow-y-auto custom-scrollbar">
              {searchResults.categories.length > 0 && (
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Pasujące kategorie
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {searchResults.categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          handlePerformSubmit();
                        }}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Folder className="w-3 h-3 text-blue-500" />
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400">({cat.productCount})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Produkty ({searchResults.totalMatchesCount})</span>
                  <span className="text-[9px] text-slate-400 font-normal">
                    Czas: {searchResults.executionTimeMs} ms
                  </span>
                </div>

                {searchResults.products.map(prod => (
                  <div
                    key={prod.id}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                    onClick={() => handlePerformSubmit(prod.name)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {suggestions.showProductThumbnails && (
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200 dark:border-slate-700"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors truncate">
                          {prod.name}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          {suggestions.showCategoryTag && (
                            <span className="bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.2 rounded text-[10px]">
                              {prod.category}
                            </span>
                          )}
                          {suggestions.showVendorName && prod.vendorName && (
                            <span className="flex items-center gap-1">
                              <Store className="w-3 h-3 text-slate-400" />
                              {prod.vendorName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex items-center gap-3">
                      {suggestions.showPrice && (
                        <div>
                          <div className="text-xs font-black text-slate-900 dark:text-white">
                            {prod.price.toFixed(2)} zł
                          </div>
                          {prod.oldPrice && (
                            <div className="text-[10px] text-slate-400 line-through">
                              {prod.oldPrice.toFixed(2)} zł
                            </div>
                          )}
                        </div>
                      )}

                      {resultsDropdown.quickAddCartButton && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerToast?.('success', 'Dodano do koszyka', `${prod.name} został dodany.`);
                          }}
                          className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                          title="Szybkie dodanie do koszyka"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {resultsDropdown.showViewAllButton && (
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900/80 text-center">
                  <button
                    type="button"
                    onClick={() => handlePerformSubmit()}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{resultsDropdown.viewAllButtonLabel || 'Zobacz wszystkie wyniki'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* D. EMPTY STATE */}
          {!isLoading && searchResults && searchResults.totalMatchesCount === 0 && internalQuery.length >= (engine.minCharsToTrigger || 2) && (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  {resultsDropdown.emptyStateTitle || 'Brak wyników'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  {resultsDropdown.emptyStateSubtitle || 'Nie znaleźliśmy produktów pasujących do Twojego zapytania.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
