import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  StoreAppearanceState,
  TopBarConfig,
  LogoConfig,
  MainMenuConfig,
  SearchBarConfig,
  InteractiveButtonsConfig,
  InteractiveButtonItem,
  CategoriesWidgetConfig,
  ProductsGridWidgetConfig,
  ProductGridPresetStyleName,
  MenuItem
} from '../types/storeAppearance';
import {
  initialAppearanceState,
  defaultTopBarConfig,
  defaultLogoConfig,
  defaultMainMenuConfig,
  defaultSearchBarConfig,
  defaultButtonsConfig,
  defaultCategoriesConfig,
  defaultProductsGridConfig,
  defaultWidgetsManagerConfig
} from '../data/defaultAppearance';
import { BUTTON_PRESETS, createDefaultButton } from '../data/defaultButtons';
import { CATEGORIES_PRESETS } from '../data/defaultCategories';
import { PRODUCTS_GRID_PRESETS } from '../data/defaultProductsGrid';
import {
  WIDGET_STYLE_PRESETS,
  defaultShape,
  defaultBackground,
  defaultBorder,
  defaultShadow,
  defaultTypography,
  defaultSpacing,
  defaultInternalLayout
} from '../data/defaultWidgets';
import {
  WidgetsManagerConfig,
  WidgetInstance,
  WidgetPreviewState
} from '../types/widgetEditor';
import {
  BannersManagerConfig,
  BannerInstance,
  MainSliderDedicatedConfig,
  BannerPresetStyleName
} from '../types/bannerEditor';
import {
  defaultBannersManagerConfig,
  defaultBannerInstances,
  defaultMainSliderConfig,
  BANNER_STYLE_PRESETS
} from '../data/defaultBanners';
import {
  FooterConfig,
  FooterPresetStyleName
} from '../types/footerEditor';
import {
  defaultFooterConfig,
  FOOTER_PRESETS
} from '../data/defaultFooters';
import { SYSTEM_CATEGORIES, SYSTEM_PRODUCTS, SystemProduct } from '../data/marketplaceCatalogue';

const STORAGE_KEY = 'marketplace_pro_store_appearance_v2';
const PUBLISHED_KEY = 'marketplace_pro_store_published_v2';
const HISTORY_KEY = 'marketplace_pro_store_history_v2';

export type AppearanceTab =
  | 'topbar'
  | 'top_bar'
  | 'logo'
  | 'main_menu'
  | 'menu'
  | 'search_bar'
  | 'search'
  | 'buttons'
  | 'actions'
  | 'categories'
  | 'kategorie'
  | 'products'
  | 'produkty'
  | 'widgets'
  | 'widget_editor'
  | 'widzety'
  | 'banners'
  | 'banners_sliders'
  | 'banery'
  | 'footer'
  | 'stopka'
  | 'footer_editor'
  | 'overview';

export type ViewMode = 'editor' | 'provider' | 'storefront';
export type DevicePreview = 'desktop' | 'tablet' | 'mobile';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface ValidationIssue {
  id: string;
  itemId: string;
  itemLabel: string;
  type: 'empty_url' | 'broken_link' | 'missing_category' | 'invalid_format' | 'no_children';
  severity: 'warning' | 'error' | 'info';
  message: string;
  suggestedFixUrl?: string;
}

export interface AppearanceVersion {
  id: string;
  versionName: string;
  timestamp: string;
  author: string;
  description: string;
  state: StoreAppearanceState;
}

interface StoreAppearanceContextType {
  state: StoreAppearanceState;
  savedState: StoreAppearanceState;
  publishedState: StoreAppearanceState;
  isDirty: boolean;
  activeTab: AppearanceTab;
  setActiveTab: (tab: AppearanceTab) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  devicePreview: DevicePreview;
  setDevicePreview: (device: DevicePreview) => void;
  isLoadingStudio: boolean;
  openVisualStudio: (module?: AppearanceTab) => void;
  updateTopBar: (updates: Partial<TopBarConfig>) => void;
  updateLogo: (updates: Partial<LogoConfig>) => void;
  updateMainMenu: (updates: Partial<MainMenuConfig>) => void;
  updateSearchBar: (updates: Partial<SearchBarConfig>) => void;
  updateButtons: (updates: Partial<InteractiveButtonsConfig>) => void;
  updateCategories: (updates: Partial<CategoriesWidgetConfig>) => void;
  resetCategories: () => void;
  applyCategoriesPreset: (presetKey: string) => void;
  categoriesClipboardStyle: Partial<CategoriesWidgetConfig> | null;
  copyCategoriesStyle: () => void;
  pasteCategoriesStyle: () => void;

  // Products Grid Engine Actions
  updateProductsGrid: (updates: Partial<ProductsGridWidgetConfig>) => void;
  resetProductsGrid: () => void;
  applyProductsGridPreset: (presetKey: ProductGridPresetStyleName | string) => void;
  productsGridClipboardStyle: Partial<ProductsGridWidgetConfig> | null;
  copyProductsGridStyle: () => void;
  pasteProductsGridStyle: () => void;

  // Widgets Manager Engine Actions
  selectedWidgetId: string | null;
  setSelectedWidgetId: (id: string | null) => void;
  updateWidget: (widgetId: string, updates: Partial<WidgetInstance> | ((prev: WidgetInstance) => WidgetInstance)) => void;
  updateWidgetsManager: (updates: Partial<WidgetsManagerConfig>) => void;
  addWidget: (template: WidgetInstance) => void;
  removeWidget: (widgetId: string) => void;
  toggleWidgetEnabled: (widgetId: string) => void;
  duplicateWidget: (widgetId: string) => void;
  resetWidget: (widgetId: string, section?: 'all' | 'shape' | 'background' | 'border' | 'shadow' | 'typography' | 'spacing' | 'layout') => void;
  applyWidgetPreset: (widgetId: string, presetKey: string) => void;
  widgetClipboardStyle: Partial<WidgetInstance> | null;
  copyWidgetStyle: (widgetId: string) => void;
  pasteWidgetStyle: (widgetId: string) => void;
  widgetPreviewState: WidgetPreviewState;
  setWidgetPreviewState: (state: WidgetPreviewState) => void;

  // Banners & Sliders Engine Actions
  selectedBannerId: string | null;
  setSelectedBannerId: (id: string | null) => void;
  updateBanner: (bannerId: string, updates: Partial<BannerInstance> | ((prev: BannerInstance) => BannerInstance)) => void;
  updateBannersManager: (updates: Partial<BannersManagerConfig>) => void;
  updateMainSliderDedicated: (updates: Partial<MainSliderDedicatedConfig> | ((prev: MainSliderDedicatedConfig) => MainSliderDedicatedConfig)) => void;
  addBanner: (template: BannerInstance) => void;
  removeBanner: (bannerId: string) => void;
  toggleBannerEnabled: (bannerId: string) => void;
  duplicateBanner: (bannerId: string) => void;
  resetBanner: (bannerId: string, section?: 'all' | 'shape' | 'background' | 'border' | 'shadow' | 'typography' | 'spacing' | 'layout' | 'image' | 'cta' | 'hover') => void;
  applyBannerPreset: (bannerId: string, presetKey: BannerPresetStyleName | string) => void;
  bannerClipboardStyle: Partial<BannerInstance> | null;
  copyBannerStyle: (bannerId: string) => void;
  pasteBannerStyle: (bannerId: string) => void;
  isMainSliderModalOpen: boolean;
  setIsMainSliderModalOpen: (open: boolean) => void;

  // Footer Engine Actions
  selectedFooterSectionId: string | null;
  setSelectedFooterSectionId: (id: string | null) => void;
  updateFooter: (updater: Partial<FooterConfig> | ((prev: FooterConfig) => FooterConfig)) => void;
  resetFooter: (section?: 'all' | 'shape' | 'background' | 'border' | 'shadow' | 'typography' | 'spacing' | 'newsletter' | 'contact' | 'brand' | 'bottomBar') => void;
  applyFooterPreset: (presetKey: FooterPresetStyleName | string) => void;
  footerClipboardStyle: Partial<FooterConfig> | null;
  copyFooterStyle: () => void;
  pasteFooterStyle: () => void;

  // Interactive Storefront & Live Simulation State
  cartItems: { product: SystemProduct; quantity: number }[];
  wishlistIds: string[];
  quickViewProduct: SystemProduct | null;
  setQuickViewProduct: (prod: SystemProduct | null) => void;
  addToCart: (product: SystemProduct, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  toggleWishlist: (product: SystemProduct) => void;
  clearCart: () => void;

  // Button-specific engine actions
  activeButtonId: string;
  setActiveButtonId: (id: string) => void;
  updateButtonItem: (itemId: string, updater: Partial<InteractiveButtonItem> | ((prev: InteractiveButtonItem) => InteractiveButtonItem)) => void;
  addButtonItem: (item: InteractiveButtonItem) => void;
  deleteButtonItem: (itemId: string) => void;
  duplicateButtonItem: (itemId: string) => void;
  reorderButtonItems: (items: InteractiveButtonItem[]) => void;
  resetButtonItem: (itemId: string) => void;
  applyButtonPreset: (itemId: string, presetKey: string) => void;
  buttonClipboardStyle: Partial<InteractiveButtonItem> | null;
  copyButtonStyle: (item: InteractiveButtonItem) => void;
  pasteButtonStyle: (targetItemId: string) => void;
  
  // History Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Save & Publish
  saveDraft: () => void;
  publishSettings: () => void;
  resetToDefaultSettings: () => void;
  resetToFactoryDefaults?: () => void;
  hasUnsavedChanges?: boolean;
  discardChanges: () => void;
  restoreVersion: (version: AppearanceVersion) => void;
  versionHistory: AppearanceVersion[];

  // Dynamic Sync & Link Validation
  synchronizeCategoriesWithSystem: () => void;
  validationIssues: ValidationIssue[];
  autoFixValidationIssue: (issueId: string) => void;
  autoFixAllIssues: () => void;

  // Clipboard for copying elements & styles
  clipboardItem: MenuItem | null;
  clipboardStyle: any | null;
  copyItemToClipboard: (item: MenuItem) => void;
  copyStyleToClipboard: (style: any) => void;

  // Toasts
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  triggerToast: (type: ToastNotification['type'], title: string, message: string) => void;

  // Unsaved changes confirmation dialog
  showUnsavedDialog: boolean;
  setShowUnsavedDialog: (show: boolean) => void;
  pendingNavigationAction: (() => void) | null;
  setPendingNavigationAction: (action: (() => void) | null) => void;
}

const StoreAppearanceContext = createContext<StoreAppearanceContextType | undefined>(undefined);

export const StoreAppearanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load current draft state
  const [state, setState] = useState<StoreAppearanceState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          topBar: { ...defaultTopBarConfig, ...(parsed.topBar || {}) },
          logo: { ...defaultLogoConfig, ...(parsed.logo || {}) },
          mainMenu: { ...defaultMainMenuConfig, ...(parsed.mainMenu || {}) },
          searchBar: { ...defaultSearchBarConfig, ...(parsed.searchBar || {}) },
          buttons: { ...defaultButtonsConfig, ...(parsed.buttons || {}) },
          categories: { ...defaultCategoriesConfig, ...(parsed.categories || {}) },
          productsGrid: { ...defaultProductsGridConfig, ...(parsed.productsGrid || {}) },
          widgets: { ...defaultWidgetsManagerConfig, ...(parsed.widgets || {}) },
          banners: { ...defaultBannersManagerConfig, ...(parsed.banners || {}) }
        };
      }
    } catch (e) {
      console.error('Error loading stored appearance settings:', e);
    }
    return initialAppearanceState;
  });

  const [savedState, setSavedState] = useState<StoreAppearanceState>(state);
  const [publishedState, setPublishedState] = useState<StoreAppearanceState>(() => {
    try {
      const pub = localStorage.getItem(PUBLISHED_KEY);
      if (pub) return JSON.parse(pub);
    } catch (e) {
      // ignore
    }
    return state;
  });

  // Undo / Redo stacks
  const [historyStack, setHistoryStack] = useState<StoreAppearanceState[]>([state]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isInternalStateChange = useRef(false);
  const historyDebounceTimer = useRef<any>(null);

  // Version history
  const [versionHistory, setVersionHistory] = useState<AppearanceVersion[]>(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) return JSON.parse(savedHistory);
    } catch (e) {}
    return [
      {
        id: 'v_init',
        versionName: 'Wersja Pierwotna (Inicjalna)',
        timestamp: new Date().toLocaleString('pl-PL'),
        author: 'System Marketplace',
        description: 'Domyślna konfiguracja sklepu z pełnym Mega Menu',
        state: initialAppearanceState
      }
    ];
  });

  const [activeTab, setActiveTab] = useState<AppearanceTab>('topbar');
  const [viewMode, setViewMode] = useState<ViewMode>('editor');
  const [devicePreview, setDevicePreview] = useState<DevicePreview>('desktop');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isLoadingStudio, setIsLoadingStudio] = useState<boolean>(false);

  // Unsaved changes dialog guard
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigationAction, setPendingNavigationAction] = useState<(() => void) | null>(null);

  // Clipboard for copy/paste
  const [clipboardItem, setClipboardItem] = useState<MenuItem | null>(null);
  const [clipboardStyle, setClipboardStyle] = useState<any | null>(null);

  // Widgets Manager local states
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>('widget-featured-products');
  const [widgetClipboardStyle, setWidgetClipboardStyle] = useState<Partial<WidgetInstance> | null>(null);
  const [widgetPreviewState, setWidgetPreviewState] = useState<WidgetPreviewState>('normal');

  // Banners & Sliders Manager local states
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>('banner_img_text_1');
  const [bannerClipboardStyle, setBannerClipboardStyle] = useState<Partial<BannerInstance> | null>(null);
  const [isMainSliderModalOpen, setIsMainSliderModalOpen] = useState<boolean>(false);

  // Footer Manager local states
  const [selectedFooterSectionId, setSelectedFooterSectionId] = useState<string | null>('sec_categories');
  const [footerClipboardStyle, setFooterClipboardStyle] = useState<Partial<FooterConfig> | null>(null);

  const isDirty = JSON.stringify(state) !== JSON.stringify(savedState);

  const triggerToast = useCallback((type: ToastNotification['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Push to history on updates (debounced to avoid performance lag)
  const pushToHistory = useCallback((newState: StoreAppearanceState) => {
    if (isInternalStateChange.current) return;
    if (historyDebounceTimer.current) {
      clearTimeout(historyDebounceTimer.current);
    }
    historyDebounceTimer.current = setTimeout(() => {
      setHistoryStack(prev => {
        const current = prev.slice(0, historyIndex + 1);
        return [...current, newState].slice(-25); // retain last 25 steps
      });
      setHistoryIndex(prev => Math.min(prev + 1, 24));
    }, 250);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isInternalStateChange.current = true;
      const targetState = historyStack[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setState(targetState);
      triggerToast('info', 'Cofnięto zmianę (Undo)', 'Przywrócono poprzedni krok w historii edytora.');
      setTimeout(() => { isInternalStateChange.current = false; }, 50);
    }
  }, [historyIndex, historyStack, triggerToast]);

  const redo = useCallback(() => {
    if (historyIndex < historyStack.length - 1) {
      isInternalStateChange.current = true;
      const targetState = historyStack[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setState(targetState);
      triggerToast('info', 'Ponowiono zmianę (Redo)', 'Zastosowano krok w przód w historii.');
      setTimeout(() => { isInternalStateChange.current = false; }, 50);
    }
  }, [historyIndex, historyStack, triggerToast]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < historyStack.length - 1;

  const openVisualStudio = useCallback((moduleToOpen?: AppearanceTab) => {
    const target = moduleToOpen || activeTab;
    setActiveTab(target);
    setIsLoadingStudio(true);
    setTimeout(() => {
      setIsLoadingStudio(false);
    }, 400);
  }, [activeTab]);

  const updateTopBar = useCallback((updates: Partial<TopBarConfig>) => {
    setState(prev => {
      const next = { ...prev, topBar: { ...prev.topBar, ...updates } };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const updateLogo = useCallback((updates: Partial<LogoConfig>) => {
    setState(prev => {
      const next = { ...prev, logo: { ...prev.logo, ...updates } };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const updateMainMenu = useCallback((updates: Partial<MainMenuConfig>) => {
    setState(prev => {
      const next = { ...prev, mainMenu: { ...prev.mainMenu, ...updates } };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const updateSearchBar = useCallback((updates: Partial<SearchBarConfig>) => {
    setState(prev => {
      const next = { ...prev, searchBar: { ...prev.searchBar, ...updates } };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const [activeButtonId, setActiveButtonId] = useState<string>('cart');
  const [buttonClipboardStyle, setButtonClipboardStyle] = useState<Partial<InteractiveButtonItem> | null>(null);

  const updateButtons = useCallback((updates: Partial<InteractiveButtonsConfig>) => {
    setState(prev => {
      const next = { ...prev, buttons: { ...prev.buttons, ...updates } };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const [categoriesClipboardStyle, setCategoriesClipboardStyle] = useState<Partial<CategoriesWidgetConfig> | null>(null);
  const [productsGridClipboardStyle, setProductsGridClipboardStyle] = useState<Partial<ProductsGridWidgetConfig> | null>(null);

  // Interactive Storefront Simulation State
  const [cartItems, setCartItems] = useState<{ product: SystemProduct; quantity: number }[]>([
    { product: SYSTEM_PRODUCTS[0], quantity: 1 },
    { product: SYSTEM_PRODUCTS[1], quantity: 2 }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    String(SYSTEM_PRODUCTS[0]?.id || 'prod_1'),
    String(SYSTEM_PRODUCTS[2]?.id || 'prod_3')
  ]);
  const [quickViewProduct, setQuickViewProduct] = useState<SystemProduct | null>(null);

  const addToCart = useCallback((product: SystemProduct, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => String(item.product.id) === String(product.id));
      if (existing) {
        return prev.map(item =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    triggerToast('success', 'Dodano do koszyka', `Produkt "${product.name}" (${quantity} szt.) został dodany.`);
  }, [triggerToast]);

  const removeFromCart = useCallback((productId: string | number) => {
    setCartItems(prev => prev.filter(item => String(item.product.id) !== String(productId)));
    triggerToast('info', 'Usunięto z koszyka', 'Produkt został usunięty z koszyka zamówień.');
  }, [triggerToast]);

  const toggleWishlist = useCallback((product: SystemProduct) => {
    const pId = String(product.id);
    setWishlistIds(prev => {
      const exists = prev.includes(pId);
      if (exists) {
        triggerToast('info', 'Usunięto z listy życzeń', `"${product.name}" usunięto z obserwowanych.`);
        return prev.filter(id => id !== pId);
      } else {
        triggerToast('success', 'Dodano do listy życzeń', `"${product.name}" dodano do ulubionych.`);
        return [...prev, pId];
      }
    });
  }, [triggerToast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    triggerToast('info', 'Wyczyszczono koszyk', 'Wszystkie produkty zostały usunięte z koszyka.');
  }, [triggerToast]);

  const updateCategories = useCallback((updates: Partial<CategoriesWidgetConfig>) => {
    setState(prev => {
      const next = { ...prev, categories: { ...prev.categories, ...updates } };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const resetCategories = useCallback(() => {
    setState(prev => {
      const next = { ...prev, categories: defaultCategoriesConfig };
      pushToHistory(next);
      return next;
    });
    triggerToast('info', 'Zresetowano kategorie', 'Przywrócono fabryczne ustawienia wyglądu widżetu kategorii.');
  }, [pushToHistory, triggerToast]);

  const applyCategoriesPreset = useCallback((presetKey: string) => {
    const preset = CATEGORIES_PRESETS.find(p => p.presetKey === presetKey);
    if (!preset) return;

    setState(prev => {
      const current = prev.categories || defaultCategoriesConfig;
      const merged: CategoriesWidgetConfig = {
        ...current,
        ...preset.config,
        activePreset: preset.presetKey,
        border: preset.config.border ? { ...current.border, ...preset.config.border } : current.border,
        image: preset.config.image ? { ...current.image, ...preset.config.image } : current.image,
        overlay: preset.config.overlay ? { ...current.overlay, ...preset.config.overlay } : current.overlay,
        nameTypography: preset.config.nameTypography ? { ...current.nameTypography, ...preset.config.nameTypography } : current.nameTypography,
        productCount: preset.config.productCount ? { ...current.productCount, ...preset.config.productCount } : current.productCount,
        icon: preset.config.icon ? { ...current.icon, ...preset.config.icon } : current.icon,
        shadow: preset.config.shadow ? { ...current.shadow, ...preset.config.shadow } : current.shadow,
        hover: preset.config.hover ? { ...current.hover, ...preset.config.hover } : current.hover,
        responsive: preset.config.responsive ? { ...current.responsive, ...preset.config.responsive } : current.responsive
      };
      const next = { ...prev, categories: merged };
      pushToHistory(next);
      return next;
    });

    triggerToast('success', `Zastosowano preset "${preset.name}"`, 'Zaktualizowano styl wizualny widżetu kategorii.');
  }, [pushToHistory, triggerToast]);

  const copyCategoriesStyle = useCallback(() => {
    const current = state.categories || defaultCategoriesConfig;
    const snapshot: Partial<CategoriesWidgetConfig> = JSON.parse(JSON.stringify({
      displayMode: current.displayMode,
      columnsDesktop: current.columnsDesktop,
      cardLayout: current.cardLayout,
      contentAlign: current.contentAlign,
      cardPadding: current.cardPadding,
      cardGap: current.cardGap,
      backgroundColor: current.backgroundColor,
      backgroundType: current.backgroundType,
      glassmorphism: current.glassmorphism,
      image: current.image,
      overlay: current.overlay,
      nameTypography: current.nameTypography,
      productCount: current.productCount,
      icon: current.icon,
      border: current.border,
      shadow: current.shadow,
      hover: current.hover,
      animation: current.animation
    }));
    setCategoriesClipboardStyle(snapshot);
    triggerToast('info', 'Skopiowano styl widżetu kategorii', 'Kompletny zestaw parametrów wyglądu zapisany w schowku.');
  }, [state.categories, triggerToast]);

  const pasteCategoriesStyle = useCallback(() => {
    if (!categoriesClipboardStyle) {
      triggerToast('warning', 'Schowek stylu kategorii jest pusty', 'Najpierw skopiuj styl kategorii.');
      return;
    }
    updateCategories(categoriesClipboardStyle);
    triggerToast('success', 'Wklejono styl kategorii', 'Zastosowano skopiowane parametry wizualne do widżetu kategorii.');
  }, [categoriesClipboardStyle, updateCategories, triggerToast]);

  const updateProductsGrid = useCallback((updates: Partial<ProductsGridWidgetConfig>) => {
    setState(prev => {
      const next = {
        ...prev,
        productsGrid: {
          ...(prev.productsGrid || defaultProductsGridConfig),
          ...updates
        }
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const resetProductsGrid = useCallback(() => {
    setState(prev => {
      const next = { ...prev, productsGrid: defaultProductsGridConfig };
      pushToHistory(next);
      return next;
    });
    triggerToast('info', 'Zresetowano układ siatki produktów', 'Przywrócono fabryczną konfigurację widżetu.');
  }, [pushToHistory, triggerToast]);

  const applyProductsGridPreset = useCallback((presetKey: ProductGridPresetStyleName | string) => {
    const preset = PRODUCTS_GRID_PRESETS.find(p => p.id === presetKey);
    if (!preset) return;

    setState(prev => {
      const current = prev.productsGrid || defaultProductsGridConfig;
      const merged: ProductsGridWidgetConfig = {
        ...current,
        ...preset.config,
        activePreset: preset.id,
        image: preset.config.image ? { ...current.image, ...preset.config.image } : current.image,
        border: preset.config.border ? { ...current.border, ...preset.config.border } : current.border,
        shadow: preset.config.shadow ? { ...current.shadow, ...preset.config.shadow } : current.shadow,
        nameTypography: preset.config.nameTypography ? { ...current.nameTypography, ...preset.config.nameTypography } : current.nameTypography,
        metaTypography: preset.config.metaTypography ? { ...current.metaTypography, ...preset.config.metaTypography } : current.metaTypography,
        price: preset.config.price ? { ...current.price, ...preset.config.price } : current.price,
        buttons: preset.config.buttons ? {
          ...current.buttons,
          ...preset.config.buttons,
          addToCart: { ...current.buttons.addToCart, ...(preset.config.buttons.addToCart || {}) }
        } : current.buttons,
        glassmorphism: preset.config.glassmorphism ? { ...current.glassmorphism, ...preset.config.glassmorphism } : current.glassmorphism
      };
      const next = { ...prev, productsGrid: merged };
      pushToHistory(next);
      return next;
    });

    triggerToast('success', `Zastosowano styl "${preset.name}"`, 'Zaktualizowano wygląd siatki produktów.');
  }, [pushToHistory, triggerToast]);

  const copyProductsGridStyle = useCallback(() => {
    const current = state.productsGrid || defaultProductsGridConfig;
    const snapshot: Partial<ProductsGridWidgetConfig> = JSON.parse(JSON.stringify({
      displayMode: current.displayMode,
      columnsDesktop: current.columnsDesktop,
      columnsTablet: current.columnsTablet,
      columnsMobile: current.columnsMobile,
      gapDesktopX: current.gapDesktopX,
      gapDesktopY: current.gapDesktopY,
      cardPadding: current.cardPadding,
      backgroundType: current.backgroundType,
      backgroundColor: current.backgroundColor,
      glassmorphism: current.glassmorphism,
      image: current.image,
      nameTypography: current.nameTypography,
      metaTypography: current.metaTypography,
      descriptionTypography: current.descriptionTypography,
      price: current.price,
      currency: current.currency,
      rating: current.rating,
      badge: current.badge,
      buttons: current.buttons,
      hover: current.hover,
      border: current.border,
      shadow: current.shadow,
      elementsOrder: current.elementsOrder,
      visibility: current.visibility,
      animation: current.animation
    }));
    setProductsGridClipboardStyle(snapshot);
    triggerToast('info', 'Skopiowano styl siatki produktów', 'Wszystkie parametry wizualne zostały zapisane do schowka.');
  }, [state.productsGrid, triggerToast]);

  const pasteProductsGridStyle = useCallback(() => {
    if (!productsGridClipboardStyle) {
      triggerToast('warning', 'Schowek stylu produktów jest pusty', 'Najpierw skopiuj styl siatki produktów.');
      return;
    }
    updateProductsGrid(productsGridClipboardStyle);
    triggerToast('success', 'Wklejono styl produktów', 'Zastosowano skopiowany styl do siatki produktów.');
  }, [productsGridClipboardStyle, updateProductsGrid, triggerToast]);

  // Widgets Manager Handlers
  const updateWidgetsManager = useCallback((updates: Partial<WidgetsManagerConfig>) => {
    setState(prev => {
      const next = {
        ...prev,
        widgets: {
          ...(prev.widgets || defaultWidgetsManagerConfig),
          ...updates
        }
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const updateWidget = useCallback((
    widgetId: string,
    updater: Partial<WidgetInstance> | ((prev: WidgetInstance) => WidgetInstance)
  ) => {
    setState(prev => {
      const currentWidgets = prev.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
      const updatedWidgets = currentWidgets.map(w => {
        if (w.id !== widgetId) return w;
        if (typeof updater === 'function') {
          return updater(w);
        }
        return { ...w, ...updater };
      });
      const next = {
        ...prev,
        widgets: {
          ...(prev.widgets || defaultWidgetsManagerConfig),
          widgets: updatedWidgets
        }
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const addWidget = useCallback((template: WidgetInstance) => {
    const newId = `widget-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newWidget: WidgetInstance = {
      ...JSON.parse(JSON.stringify(template)),
      id: newId,
      name: `${template.name} (Kopia)`
    };

    setState(prev => {
      const currentWidgets = prev.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
      const next = {
        ...prev,
        widgets: {
          ...(prev.widgets || defaultWidgetsManagerConfig),
          widgets: [...currentWidgets, newWidget]
        }
      };
      pushToHistory(next);
      return next;
    });

    setSelectedWidgetId(newId);
    triggerToast('success', `Dodano widżet: ${newWidget.displayName || newWidget.name}`, 'Widżet został dodany do listy i wybrany do edycji.');
  }, [pushToHistory, triggerToast]);

  const removeWidget = useCallback((widgetId: string) => {
    setState(prev => {
      const currentWidgets = prev.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
      const filtered = currentWidgets.filter(w => w.id !== widgetId);
      const next = {
        ...prev,
        widgets: {
          ...(prev.widgets || defaultWidgetsManagerConfig),
          widgets: filtered
        }
      };
      pushToHistory(next);
      return next;
    });

    setSelectedWidgetId(prevId => (prevId === widgetId ? null : prevId));
    triggerToast('info', 'Usunięto widżet', 'Widżet został usunięty z listy.');
  }, [pushToHistory, triggerToast]);

  const toggleWidgetEnabled = useCallback((widgetId: string) => {
    setState(prev => {
      const currentWidgets = prev.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
      let targetStatus = false;
      const updated = currentWidgets.map(w => {
        if (w.id === widgetId) {
          targetStatus = !w.enabled;
          return { ...w, enabled: !w.enabled };
        }
        return w;
      });
      const next = {
        ...prev,
        widgets: {
          ...(prev.widgets || defaultWidgetsManagerConfig),
          widgets: updated
        }
      };
      pushToHistory(next);
      return next;
    });
    triggerToast('info', 'Zmieniono status widżetu', 'Stan aktywności widżetu został zaktualizowany.');
  }, [pushToHistory, triggerToast]);

  const duplicateWidget = useCallback((widgetId: string) => {
    const currentWidgets = state.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
    const target = currentWidgets.find(w => w.id === widgetId);
    if (!target) return;

    const newId = `widget-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const cloned: WidgetInstance = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      displayName: `${target.displayName} (Duplikat)`
    };

    setState(prev => {
      const widgetsList = prev.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
      const next = {
        ...prev,
        widgets: {
          ...(prev.widgets || defaultWidgetsManagerConfig),
          widgets: [...widgetsList, cloned]
        }
      };
      pushToHistory(next);
      return next;
    });

    setSelectedWidgetId(newId);
    triggerToast('success', 'Zduplikowano widżet', `Utworzono kopię: ${cloned.displayName}`);
  }, [state.widgets, pushToHistory, triggerToast]);

  const resetWidget = useCallback((
    widgetId: string,
    section: 'all' | 'shape' | 'background' | 'border' | 'shadow' | 'typography' | 'spacing' | 'layout' = 'all'
  ) => {
    const currentWidgets = state.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
    const current = currentWidgets.find(w => w.id === widgetId);
    if (!current) return;

    const defaultWidget = defaultWidgetsManagerConfig.widgets.find(w => w.type === current.type) || defaultWidgetsManagerConfig.widgets[0];

    updateWidget(widgetId, prev => {
      if (section === 'shape') {
        return { ...prev, shape: JSON.parse(JSON.stringify(defaultWidget.shape || defaultShape)) };
      }
      if (section === 'background') {
        return { ...prev, background: JSON.parse(JSON.stringify(defaultWidget.background || defaultBackground)) };
      }
      if (section === 'border') {
        return { ...prev, border: JSON.parse(JSON.stringify(defaultWidget.border || defaultBorder)) };
      }
      if (section === 'shadow') {
        return { ...prev, shadow: JSON.parse(JSON.stringify(defaultWidget.shadow || defaultShadow)) };
      }
      if (section === 'typography') {
        return { ...prev, typography: JSON.parse(JSON.stringify(defaultWidget.typography || defaultTypography)) };
      }
      if (section === 'spacing') {
        return { ...prev, spacing: JSON.parse(JSON.stringify(defaultWidget.spacing || defaultSpacing)) };
      }
      if (section === 'layout') {
        return { ...prev, layout: JSON.parse(JSON.stringify(defaultWidget.layout || defaultInternalLayout)) };
      }
      return {
        ...prev,
        shape: JSON.parse(JSON.stringify(defaultWidget.shape)),
        size: JSON.parse(JSON.stringify(defaultWidget.size)),
        layout: JSON.parse(JSON.stringify(defaultWidget.layout)),
        background: JSON.parse(JSON.stringify(defaultWidget.background)),
        border: JSON.parse(JSON.stringify(defaultWidget.border)),
        shadow: JSON.parse(JSON.stringify(defaultWidget.shadow)),
        typography: JSON.parse(JSON.stringify(defaultWidget.typography)),
        spacing: JSON.parse(JSON.stringify(defaultWidget.spacing)),
        button: JSON.parse(JSON.stringify(defaultWidget.button)),
        icon: JSON.parse(JSON.stringify(defaultWidget.icon)),
        hover: JSON.parse(JSON.stringify(defaultWidget.hover)),
        animation: JSON.parse(JSON.stringify(defaultWidget.animation)),
        responsive: JSON.parse(JSON.stringify(defaultWidget.responsive))
      };
    });

    triggerToast('info', 'Zresetowano styl widżetu', `Przywrócono domyślne parametry dla sekcji: ${section === 'all' ? 'cały wygląd' : section}.`);
  }, [state.widgets, updateWidget, triggerToast]);

  const applyWidgetPreset = useCallback((widgetId: string, presetKey: string) => {
    const preset = WIDGET_STYLE_PRESETS[presetKey];
    if (!preset) return;

    updateWidget(widgetId, prev => {
      const updated: WidgetInstance = {
        ...prev,
        activePreset: preset.id,
        shape: preset.shape ? { ...prev.shape, ...preset.shape } : prev.shape,
        background: preset.background ? { ...prev.background, ...preset.background } : prev.background,
        border: preset.border ? { ...prev.border, ...preset.border } : prev.border,
        shadow: preset.shadow ? { ...prev.shadow, ...preset.shadow } : prev.shadow,
        typography: preset.typography ? {
          ...prev.typography,
          title: preset.typography.title ? { ...prev.typography.title, ...preset.typography.title } : prev.typography.title,
          subtitle: preset.typography.subtitle ? { ...prev.typography.subtitle, ...preset.typography.subtitle } : prev.typography.subtitle
        } : prev.typography,
        button: preset.button ? { ...prev.button, ...preset.button } : prev.button,
        hover: preset.hover ? { ...prev.hover, ...preset.hover } : prev.hover
      };
      return updated;
    });

    triggerToast('success', `Zastosowano preset "${preset.name}"`, 'Zaktualizowano wygląd wybranego widżetu.');
  }, [updateWidget, triggerToast]);

  const copyWidgetStyle = useCallback((widgetId: string) => {
    const currentWidgets = state.widgets?.widgets || defaultWidgetsManagerConfig.widgets;
    const target = currentWidgets.find(w => w.id === widgetId);
    if (!target) return;

    const snapshot: Partial<WidgetInstance> = JSON.parse(JSON.stringify({
      shape: target.shape,
      size: target.size,
      layout: target.layout,
      background: target.background,
      border: target.border,
      shadow: target.shadow,
      typography: target.typography,
      spacing: target.spacing,
      button: target.button,
      icon: target.icon,
      hover: target.hover,
      animation: target.animation,
      responsive: target.responsive
    }));

    setWidgetClipboardStyle(snapshot);
    triggerToast('info', 'Skopiowano styl widżetu', 'Wszystkie właściwości wizualne (bez treści) zostały skopiowane do schowka.');
  }, [state.widgets, triggerToast]);

  const pasteWidgetStyle = useCallback((widgetId: string) => {
    if (!widgetClipboardStyle) {
      triggerToast('warning', 'Schowek stylu jest pusty', 'Najpierw skopiuj styl innego widżetu.');
      return;
    }

    updateWidget(widgetId, prev => ({
      ...prev,
      shape: widgetClipboardStyle.shape ? { ...prev.shape, ...widgetClipboardStyle.shape } : prev.shape,
      size: widgetClipboardStyle.size ? { ...prev.size, ...widgetClipboardStyle.size } : prev.size,
      layout: widgetClipboardStyle.layout ? { ...prev.layout, ...widgetClipboardStyle.layout } : prev.layout,
      background: widgetClipboardStyle.background ? { ...prev.background, ...widgetClipboardStyle.background } : prev.background,
      border: widgetClipboardStyle.border ? { ...prev.border, ...widgetClipboardStyle.border } : prev.border,
      shadow: widgetClipboardStyle.shadow ? { ...prev.shadow, ...widgetClipboardStyle.shadow } : prev.shadow,
      typography: widgetClipboardStyle.typography ? { ...prev.typography, ...widgetClipboardStyle.typography } : prev.typography,
      spacing: widgetClipboardStyle.spacing ? { ...prev.spacing, ...widgetClipboardStyle.spacing } : prev.spacing,
      button: widgetClipboardStyle.button ? { ...prev.button, ...widgetClipboardStyle.button } : prev.button,
      icon: widgetClipboardStyle.icon ? { ...prev.icon, ...widgetClipboardStyle.icon } : prev.icon,
      hover: widgetClipboardStyle.hover ? { ...prev.hover, ...widgetClipboardStyle.hover } : prev.hover,
      animation: widgetClipboardStyle.animation ? { ...prev.animation, ...widgetClipboardStyle.animation } : prev.animation,
      responsive: widgetClipboardStyle.responsive ? { ...prev.responsive, ...widgetClipboardStyle.responsive } : prev.responsive
    }));

    triggerToast('success', 'Wklejono styl widżetu', 'Zastosowano skopiowany styl graficzny.');
  }, [widgetClipboardStyle, updateWidget, triggerToast]);

  // ============================================================
  // BANNERS & SLIDERS ENGINE IMPLEMENTATION
  // ============================================================
  const updateBannersManager = useCallback((updates: Partial<BannersManagerConfig>) => {
    setState(prev => {
      const next = {
        ...prev,
        banners: {
          ...(prev.banners || defaultBannersManagerConfig),
          ...updates
        }
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const updateBanner = useCallback((
    bannerId: string,
    updater: Partial<BannerInstance> | ((prev: BannerInstance) => BannerInstance)
  ) => {
    setState(prev => {
      const currentItems = prev.banners?.items || defaultBannersManagerConfig.items;
      const updatedItems = currentItems.map(b => {
        if (b.id !== bannerId) return b;
        if (typeof updater === 'function') {
          return updater(b);
        }
        return { ...b, ...updater };
      });
      const next = {
        ...prev,
        banners: {
          ...(prev.banners || defaultBannersManagerConfig),
          items: updatedItems
        }
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const updateMainSliderDedicated = useCallback((
    updater: Partial<MainSliderDedicatedConfig> | ((prev: MainSliderDedicatedConfig) => MainSliderDedicatedConfig)
  ) => {
    setState(prev => {
      const currentConfig = prev.banners?.mainSlider || defaultMainSliderConfig;
      const nextConfig = typeof updater === 'function' ? updater(currentConfig) : { ...currentConfig, ...updater };
      const next = {
        ...prev,
        banners: {
          ...(prev.banners || defaultBannersManagerConfig),
          mainSlider: nextConfig
        }
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const addBanner = useCallback((template: BannerInstance) => {
    const newId = `banner-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newBanner: BannerInstance = {
      ...JSON.parse(JSON.stringify(template)),
      id: newId,
      name: `${template.name} (Kopia)`
    };

    setState(prev => {
      const currentItems = prev.banners?.items || defaultBannersManagerConfig.items;
      const next = {
        ...prev,
        banners: {
          ...(prev.banners || defaultBannersManagerConfig),
          items: [...currentItems, newBanner]
        }
      };
      pushToHistory(next);
      return next;
    });

    setSelectedBannerId(newId);
    triggerToast('success', `Dodano element: ${newBanner.displayName || newBanner.name}`, 'Element został dodany do biblioteki i zaznaczony do edycji.');
  }, [pushToHistory, triggerToast]);

  const removeBanner = useCallback((bannerId: string) => {
    setState(prev => {
      const currentItems = prev.banners?.items || defaultBannersManagerConfig.items;
      const filtered = currentItems.filter(b => b.id !== bannerId);
      const next = {
        ...prev,
        banners: {
          ...(prev.banners || defaultBannersManagerConfig),
          items: filtered
        }
      };
      pushToHistory(next);
      return next;
    });

    setSelectedBannerId(prevId => (prevId === bannerId ? null : prevId));
    triggerToast('info', 'Usunięto element banera', 'Element został usunięty z listy.');
  }, [pushToHistory, triggerToast]);

  const toggleBannerEnabled = useCallback((bannerId: string) => {
    setState(prev => {
      const currentItems = prev.banners?.items || defaultBannersManagerConfig.items;
      const updated = currentItems.map(b => {
        if (b.id === bannerId) {
          return { ...b, enabled: !b.enabled };
        }
        return b;
      });
      const next = {
        ...prev,
        banners: {
          ...(prev.banners || defaultBannersManagerConfig),
          items: updated
        }
      };
      pushToHistory(next);
      return next;
    });
    triggerToast('info', 'Zmieniono status elementu', 'Stan widoczności banera został zaktualizowany.');
  }, [pushToHistory, triggerToast]);

  const duplicateBanner = useCallback((bannerId: string) => {
    const currentItems = state.banners?.items || defaultBannersManagerConfig.items;
    const target = currentItems.find(b => b.id === bannerId);
    if (!target) return;

    const newId = `banner-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const cloned: BannerInstance = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      name: `${target.name} (Duplikat)`,
      displayName: `${target.displayName} (Duplikat)`
    };

    setState(prev => {
      const itemsList = prev.banners?.items || defaultBannersManagerConfig.items;
      const next = {
        ...prev,
        banners: {
          ...(prev.banners || defaultBannersManagerConfig),
          items: [...itemsList, cloned]
        }
      };
      pushToHistory(next);
      return next;
    });

    setSelectedBannerId(newId);
    triggerToast('success', 'Zduplikowano element banera', 'Utworzono wierną kopię wybranego banera.');
  }, [state.banners, pushToHistory, triggerToast]);

  const resetBanner = useCallback((
    bannerId: string,
    section: 'all' | 'shape' | 'background' | 'border' | 'shadow' | 'typography' | 'spacing' | 'layout' | 'image' | 'cta' | 'hover' = 'all'
  ) => {
    const defaultBanner = defaultBannerInstances.find(b => b.id === bannerId) || defaultBannerInstances[0];
    if (!defaultBanner) return;

    updateBanner(bannerId, prev => {
      if (section === 'shape') {
        return { ...prev, shape: JSON.parse(JSON.stringify(defaultBanner.shape)) };
      }
      if (section === 'background') {
        return { ...prev, background: JSON.parse(JSON.stringify(defaultBanner.background)), overlay: JSON.parse(JSON.stringify(defaultBanner.overlay)) };
      }
      if (section === 'border') {
        return { ...prev, border: JSON.parse(JSON.stringify(defaultBanner.border)) };
      }
      if (section === 'shadow') {
        return { ...prev, shadow: JSON.parse(JSON.stringify(defaultBanner.shadow)) };
      }
      if (section === 'typography') {
        return { ...prev, typography: JSON.parse(JSON.stringify(defaultBanner.typography)) };
      }
      if (section === 'spacing') {
        return { ...prev, spacing: JSON.parse(JSON.stringify(defaultBanner.spacing)) };
      }
      if (section === 'layout') {
        return { ...prev, layout: JSON.parse(JSON.stringify(defaultBanner.layout)) };
      }
      if (section === 'image') {
        return { ...prev, image: JSON.parse(JSON.stringify(defaultBanner.image)) };
      }
      if (section === 'cta') {
        return { ...prev, cta: JSON.parse(JSON.stringify(defaultBanner.cta)) };
      }
      if (section === 'hover') {
        return { ...prev, hover: JSON.parse(JSON.stringify(defaultBanner.hover)), animation: JSON.parse(JSON.stringify(defaultBanner.animation)) };
      }
      return {
        ...prev,
        shape: JSON.parse(JSON.stringify(defaultBanner.shape)),
        size: JSON.parse(JSON.stringify(defaultBanner.size)),
        background: JSON.parse(JSON.stringify(defaultBanner.background)),
        overlay: JSON.parse(JSON.stringify(defaultBanner.overlay)),
        border: JSON.parse(JSON.stringify(defaultBanner.border)),
        shadow: JSON.parse(JSON.stringify(defaultBanner.shadow)),
        spacing: JSON.parse(JSON.stringify(defaultBanner.spacing)),
        image: JSON.parse(JSON.stringify(defaultBanner.image)),
        layout: JSON.parse(JSON.stringify(defaultBanner.layout)),
        typography: JSON.parse(JSON.stringify(defaultBanner.typography)),
        cta: JSON.parse(JSON.stringify(defaultBanner.cta)),
        hover: JSON.parse(JSON.stringify(defaultBanner.hover)),
        animation: JSON.parse(JSON.stringify(defaultBanner.animation)),
        visibility: JSON.parse(JSON.stringify(defaultBanner.visibility)),
        responsive: JSON.parse(JSON.stringify(defaultBanner.responsive))
      };
    });

    triggerToast('info', 'Zresetowano parametry banera', `Przywrócono domyślne parametry dla sekcji: ${section === 'all' ? 'cały wygląd' : section}.`);
  }, [updateBanner, triggerToast]);

  const applyBannerPreset = useCallback((bannerId: string, presetKey: BannerPresetStyleName | string) => {
    const preset = BANNER_STYLE_PRESETS[presetKey as BannerPresetStyleName];
    if (!preset) return;

    updateBanner(bannerId, prev => {
      const updated: BannerInstance = {
        ...prev,
        activePreset: presetKey as BannerPresetStyleName,
        shape: preset.shape ? { ...prev.shape, ...preset.shape } : prev.shape,
        background: preset.background ? { ...prev.background, ...preset.background } : prev.background,
        border: preset.border ? { ...prev.border, ...preset.border } : prev.border,
        shadow: preset.shadow ? { ...prev.shadow, ...preset.shadow } : prev.shadow,
        typography: {
          ...prev.typography,
          title: preset.typography.title ? { ...prev.typography.title, ...preset.typography.title } : prev.typography.title,
          subtitle: preset.typography.subtitle ? { ...prev.typography.subtitle, ...preset.typography.subtitle } : prev.typography.subtitle
        },
        cta: preset.cta ? {
          ...prev.cta,
          appearance: {
            ...prev.cta.appearance,
            ...(preset.cta.appearance || {})
          }
        } : prev.cta
      };
      return updated;
    });

    triggerToast('success', `Zastosowano preset "${preset.name}"`, 'Zaktualizowano styl graficzny wybranego banera.');
  }, [updateBanner, triggerToast]);

  const copyBannerStyle = useCallback((bannerId: string) => {
    const currentItems = state.banners?.items || defaultBannersManagerConfig.items;
    const target = currentItems.find(b => b.id === bannerId);
    if (!target) return;

    const snapshot: Partial<BannerInstance> = JSON.parse(JSON.stringify({
      shape: target.shape,
      size: target.size,
      background: target.background,
      overlay: target.overlay,
      border: target.border,
      shadow: target.shadow,
      spacing: target.spacing,
      image: {
        ...target.image,
        url: undefined // do not overwrite target image url, only visual styling & effects
      },
      layout: target.layout,
      typography: target.typography,
      cta: target.cta,
      hover: target.hover,
      animation: target.animation,
      responsive: target.responsive
    }));

    setBannerClipboardStyle(snapshot);
    triggerToast('info', 'Skopiowano styl banera', 'Styl graficzny (bez treści i zdjęcia) został skopiowany do schowka.');
  }, [state.banners, triggerToast]);

  const pasteBannerStyle = useCallback((bannerId: string) => {
    if (!bannerClipboardStyle) {
      triggerToast('warning', 'Schowek stylu jest pusty', 'Najpierw skopiuj styl innego banera.');
      return;
    }

    updateBanner(bannerId, prev => ({
      ...prev,
      shape: bannerClipboardStyle.shape ? { ...prev.shape, ...bannerClipboardStyle.shape } : prev.shape,
      size: bannerClipboardStyle.size ? { ...prev.size, ...bannerClipboardStyle.size } : prev.size,
      background: bannerClipboardStyle.background ? { ...prev.background, ...bannerClipboardStyle.background } : prev.background,
      overlay: bannerClipboardStyle.overlay ? { ...prev.overlay, ...bannerClipboardStyle.overlay } : prev.overlay,
      border: bannerClipboardStyle.border ? { ...prev.border, ...bannerClipboardStyle.border } : prev.border,
      shadow: bannerClipboardStyle.shadow ? { ...prev.shadow, ...bannerClipboardStyle.shadow } : prev.shadow,
      spacing: bannerClipboardStyle.spacing ? { ...prev.spacing, ...bannerClipboardStyle.spacing } : prev.spacing,
      image: bannerClipboardStyle.image ? {
        ...prev.image,
        aspectRatio: bannerClipboardStyle.image.aspectRatio || prev.image.aspectRatio,
        objectFit: bannerClipboardStyle.image.objectFit || prev.image.objectFit,
        objectPosition: bannerClipboardStyle.image.objectPosition || prev.image.objectPosition,
        borderRadius: bannerClipboardStyle.image.borderRadius ?? prev.image.borderRadius,
        effects: bannerClipboardStyle.image.effects ? { ...prev.image.effects, ...bannerClipboardStyle.image.effects } : prev.image.effects
      } : prev.image,
      layout: bannerClipboardStyle.layout ? { ...prev.layout, ...bannerClipboardStyle.layout } : prev.layout,
      typography: bannerClipboardStyle.typography ? { ...prev.typography, ...bannerClipboardStyle.typography } : prev.typography,
      cta: bannerClipboardStyle.cta ? { ...prev.cta, ...bannerClipboardStyle.cta } : prev.cta,
      hover: bannerClipboardStyle.hover ? { ...prev.hover, ...bannerClipboardStyle.hover } : prev.hover,
      animation: bannerClipboardStyle.animation ? { ...prev.animation, ...bannerClipboardStyle.animation } : prev.animation,
      responsive: bannerClipboardStyle.responsive ? { ...prev.responsive, ...bannerClipboardStyle.responsive } : prev.responsive
    }));

    triggerToast('success', 'Wklejono styl banera', 'Zastosowano skopiowany styl graficzny do wybranego banera.');
  }, [bannerClipboardStyle, updateBanner, triggerToast]);

  // ============================================================
  // FOOTER ENGINE IMPLEMENTATION
  // ============================================================
  const updateFooter = useCallback((updater: Partial<FooterConfig> | ((prev: FooterConfig) => FooterConfig)) => {
    setState(prev => {
      const currentFooter = prev.footer || defaultFooterConfig;
      const updatedFooter = typeof updater === 'function' ? updater(currentFooter) : { ...currentFooter, ...updater };
      const next = {
        ...prev,
        footer: updatedFooter
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const resetFooter = useCallback((
    section: 'all' | 'shape' | 'background' | 'border' | 'shadow' | 'typography' | 'spacing' | 'newsletter' | 'contact' | 'brand' | 'bottomBar' = 'all'
  ) => {
    updateFooter(prev => {
      if (section === 'shape') {
        return { ...prev, shape: JSON.parse(JSON.stringify(defaultFooterConfig.shape)) };
      }
      if (section === 'background') {
        return {
          ...prev,
          background: JSON.parse(JSON.stringify(defaultFooterConfig.background)),
          overlay: JSON.parse(JSON.stringify(defaultFooterConfig.overlay))
        };
      }
      if (section === 'border') {
        return { ...prev, border: JSON.parse(JSON.stringify(defaultFooterConfig.border)) };
      }
      if (section === 'shadow') {
        return { ...prev, shadow: JSON.parse(JSON.stringify(defaultFooterConfig.shadow)) };
      }
      if (section === 'typography') {
        return { ...prev, typography: JSON.parse(JSON.stringify(defaultFooterConfig.typography)) };
      }
      if (section === 'spacing') {
        return { ...prev, size: JSON.parse(JSON.stringify(defaultFooterConfig.size)) };
      }
      if (section === 'newsletter') {
        return { ...prev, newsletter: JSON.parse(JSON.stringify(defaultFooterConfig.newsletter)) };
      }
      if (section === 'contact') {
        return { ...prev, contact: JSON.parse(JSON.stringify(defaultFooterConfig.contact)) };
      }
      if (section === 'brand') {
        return { ...prev, brand: JSON.parse(JSON.stringify(defaultFooterConfig.brand)) };
      }
      if (section === 'bottomBar') {
        return { ...prev, bottomBar: JSON.parse(JSON.stringify(defaultFooterConfig.bottomBar)) };
      }
      return JSON.parse(JSON.stringify(defaultFooterConfig));
    });

    triggerToast('info', 'Zresetowano stopkę sklepu', `Przywrócono domyślne parametry dla: ${section === 'all' ? 'cała stopka' : section}.`);
  }, [updateFooter, triggerToast]);

  const applyFooterPreset = useCallback((presetKey: FooterPresetStyleName | string) => {
    const preset = FOOTER_PRESETS[presetKey as FooterPresetStyleName];
    if (!preset) return;

    updateFooter(prev => ({
      ...prev,
      ...preset,
      activePreset: presetKey as FooterPresetStyleName
    }));

    triggerToast('success', `Zastosowano preset stopki`, `Aktywowano styl "${preset.name || presetKey}".`);
  }, [updateFooter, triggerToast]);

  const copyFooterStyle = useCallback(() => {
    const current = state.footer || defaultFooterConfig;
    const snapshot: Partial<FooterConfig> = JSON.parse(JSON.stringify({
      shape: current.shape,
      size: current.size,
      background: current.background,
      overlay: current.overlay,
      border: current.border,
      shadow: current.shadow,
      typography: current.typography,
      layout: current.layout,
      animations: current.animations,
      responsive: current.responsive
    }));

    setFooterClipboardStyle(snapshot);
    triggerToast('info', 'Skopiowano styl stopki', 'Styl wizualny, obramowania, cienie i kolory zostały skopiowane do schowka.');
  }, [state.footer, triggerToast]);

  const pasteFooterStyle = useCallback(() => {
    if (!footerClipboardStyle) {
      triggerToast('warning', 'Schowek stylu stopki jest pusty', 'Najpierw skopiuj styl stopki.');
      return;
    }

    updateFooter(prev => ({
      ...prev,
      shape: footerClipboardStyle.shape ? { ...prev.shape, ...footerClipboardStyle.shape } : prev.shape,
      size: footerClipboardStyle.size ? { ...prev.size, ...footerClipboardStyle.size } : prev.size,
      background: footerClipboardStyle.background ? { ...prev.background, ...footerClipboardStyle.background } : prev.background,
      overlay: footerClipboardStyle.overlay ? { ...prev.overlay, ...footerClipboardStyle.overlay } : prev.overlay,
      border: footerClipboardStyle.border ? { ...prev.border, ...footerClipboardStyle.border } : prev.border,
      shadow: footerClipboardStyle.shadow ? { ...prev.shadow, ...footerClipboardStyle.shadow } : prev.shadow,
      typography: footerClipboardStyle.typography ? { ...prev.typography, ...footerClipboardStyle.typography } : prev.typography,
      layout: footerClipboardStyle.layout ? { ...prev.layout, ...footerClipboardStyle.layout } : prev.layout,
      animations: footerClipboardStyle.animations ? { ...prev.animations, ...footerClipboardStyle.animations } : prev.animations,
      responsive: footerClipboardStyle.responsive ? { ...prev.responsive, ...footerClipboardStyle.responsive } : prev.responsive
    }));

    triggerToast('success', 'Wklejono styl stopki', 'Zastosowano skopiowany styl do aktualnej konfiguracji stopki.');
  }, [footerClipboardStyle, updateFooter, triggerToast]);

  const updateButtonItem = useCallback((
    itemId: string,
    updater: Partial<InteractiveButtonItem> | ((prev: InteractiveButtonItem) => InteractiveButtonItem)
  ) => {
    setState(prev => {
      const currentItems = prev.buttons?.items || defaultButtonsConfig.items;
      const updatedItems = currentItems.map(item => {
        if (item.id !== itemId) return item;
        if (typeof updater === 'function') {
          return updater(item);
        }
        return { ...item, ...updater };
      });
      const next = {
        ...prev,
        buttons: {
          ...prev.buttons,
          items: updatedItems
        }
      };
      pushToHistory(next);
      return next;
    });
  }, [pushToHistory]);

  const addButtonItem = useCallback((item: InteractiveButtonItem) => {
    setState(prev => {
      const currentItems = prev.buttons?.items || defaultButtonsConfig.items;
      const next = {
        ...prev,
        buttons: {
          ...prev.buttons,
          items: [...currentItems, item],
          activeElementId: item.id
        }
      };
      pushToHistory(next);
      return next;
    });
    setActiveButtonId(item.id);
    triggerToast('success', 'Dodano nowy element', `Element "${item.name}" został pomyślnie utworzony.`);
  }, [pushToHistory, triggerToast]);

  const deleteButtonItem = useCallback((itemId: string) => {
    setState(prev => {
      const currentItems = prev.buttons?.items || defaultButtonsConfig.items;
      const target = currentItems.find(i => i.id === itemId);
      if (target?.isSystem) {
        return prev;
      }
      const filtered = currentItems.filter(i => i.id !== itemId);
      const next = {
        ...prev,
        buttons: {
          ...prev.buttons,
          items: filtered,
          activeElementId: filtered[0]?.id || 'login'
        }
      };
      pushToHistory(next);
      return next;
    });
    setActiveButtonId(prev => (prev === itemId ? 'login' : prev));
    triggerToast('info', 'Usunięto element', 'Własny element został trwale usunięty z listy.');
  }, [pushToHistory, triggerToast]);

  const duplicateButtonItem = useCallback((itemId: string) => {
    const currentItems = state.buttons?.items || defaultButtonsConfig.items;
    const source = currentItems.find(i => i.id === itemId);
    if (!source) return;

    const newId = `custom_btn_${Date.now().toString(36)}`;
    const duplicated: InteractiveButtonItem = {
      ...JSON.parse(JSON.stringify(source)),
      id: newId,
      name: `${source.name} (Kopia)`,
      isSystem: false,
      systemType: 'custom',
      order: currentItems.length + 1,
      content: {
        ...source.content,
        customId: `btn_${newId}`,
        text: `${source.content.text} (Kopia)`
      }
    };

    addButtonItem(duplicated);
  }, [state.buttons?.items, addButtonItem]);

  const reorderButtonItems = useCallback((items: InteractiveButtonItem[]) => {
    const updated = items.map((item, idx) => ({ ...item, order: idx + 1 }));
    updateButtons({ items: updated });
  }, [updateButtons]);

  const resetButtonItem = useCallback((itemId: string) => {
    const defaultItem = defaultButtonsConfig.items.find(i => i.id === itemId);
    if (defaultItem) {
      updateButtonItem(itemId, JSON.parse(JSON.stringify(defaultItem)));
      triggerToast('info', 'Zresetowano element', `Przywrócono domyślne parametry dla: ${defaultItem.name}`);
    }
  }, [updateButtonItem, triggerToast]);

  const applyButtonPreset = useCallback((itemId: string, presetKey: string) => {
    const preset = BUTTON_PRESETS.find(p => p.presetKey === presetKey);
    if (!preset) return;

    updateButtonItem(itemId, (current) => {
      const modifications = preset.apply(current);
      return {
        ...current,
        ...modifications,
        background: modifications.background ? { ...current.background, ...modifications.background } : current.background,
        border: modifications.border ? { ...current.border, ...modifications.border } : current.border,
        typography: modifications.typography ? { ...current.typography, ...modifications.typography } : current.typography,
        shadow: modifications.shadow ? { ...current.shadow, ...modifications.shadow } : current.shadow
      };
    });
    triggerToast('success', `Zastosowano styl: ${preset.name}`, preset.description);
  }, [updateButtonItem, triggerToast]);

  const copyButtonStyle = useCallback((item: InteractiveButtonItem) => {
    const styleSnapshot = {
      typography: JSON.parse(JSON.stringify(item.typography)),
      background: JSON.parse(JSON.stringify(item.background)),
      border: JSON.parse(JSON.stringify(item.border)),
      shadow: JSON.parse(JSON.stringify(item.shadow)),
      spacing: JSON.parse(JSON.stringify(item.spacing)),
      states: JSON.parse(JSON.stringify(item.states)),
      effects: JSON.parse(JSON.stringify(item.effects)),
      transform: JSON.parse(JSON.stringify(item.transform))
    };
    setButtonClipboardStyle(styleSnapshot as any);
    triggerToast('info', 'Skopiowano styl przycisku', `Styl wizualny elementu "${item.name}" jest gotowy do wklejenia.`);
  }, [triggerToast]);

  const pasteButtonStyle = useCallback((targetItemId: string) => {
    if (!buttonClipboardStyle) {
      triggerToast('warning', 'Schowek stylu jest pusty', 'Najpierw skopiuj styl z dowolnego elementu.');
      return;
    }
    updateButtonItem(targetItemId, (current) => ({
      ...current,
      typography: buttonClipboardStyle.typography ? { ...current.typography, ...buttonClipboardStyle.typography } : current.typography,
      background: buttonClipboardStyle.background ? { ...current.background, ...buttonClipboardStyle.background } : current.background,
      border: buttonClipboardStyle.border ? { ...current.border, ...buttonClipboardStyle.border } : current.border,
      shadow: buttonClipboardStyle.shadow ? { ...current.shadow, ...buttonClipboardStyle.shadow } : current.shadow,
      spacing: buttonClipboardStyle.spacing ? { ...current.spacing, ...buttonClipboardStyle.spacing } : current.spacing,
      states: buttonClipboardStyle.states ? { ...current.states, ...buttonClipboardStyle.states } : current.states,
      effects: buttonClipboardStyle.effects ? { ...current.effects, ...buttonClipboardStyle.effects } : current.effects,
      transform: buttonClipboardStyle.transform ? { ...current.transform, ...buttonClipboardStyle.transform } : current.transform
    }));
    triggerToast('success', 'Wklejono styl przycisku', 'Zastosowano skopiowane parametry wizualne do wybranego elementu.');
  }, [buttonClipboardStyle, updateButtonItem, triggerToast]);

  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSavedState(state);
      triggerToast('success', 'Wersja robocza zapisana', 'Ustawienia zostały bezpiecznie zapisane jako wersja robocza.');
    } catch (err) {
      console.error('Failed to save settings:', err);
      triggerToast('error', 'Błąd zapisu', 'Nie udało się zapisać wersji roboczej.');
    }
  }, [state, triggerToast]);

  const publishSettings = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(PUBLISHED_KEY, JSON.stringify(state));
      setSavedState(state);
      setPublishedState(state);

      const newVersion: AppearanceVersion = {
        id: `v_${Date.now()}`,
        versionName: `Publikacja v${(versionHistory.length + 1).toFixed(1)}`,
        timestamp: new Date().toLocaleString('pl-PL'),
        author: 'Administrator',
        description: `Opublikowano zmiany wyglądu sklepu`,
        state
      };

      const updatedHistory = [newVersion, ...versionHistory].slice(0, 10);
      setVersionHistory(updatedHistory);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

      triggerToast('success', 'Opublikowano w sklepie!', 'Nowa wersja wyglądu jest teraz aktywna dla wszystkich klientów.');
    } catch (err) {
      console.error('Failed to publish:', err);
      triggerToast('error', 'Błąd publikacji', 'Nie udało się opublikować wyglądu.');
    }
  }, [state, triggerToast, versionHistory]);

  const restoreVersion = useCallback((version: AppearanceVersion) => {
    setState(version.state);
    pushToHistory(version.state);
    triggerToast('info', 'Przywrócono wersję', `Przywrócono stan z punktu: ${version.versionName}`);
  }, [pushToHistory, triggerToast]);

  const resetToDefaultSettings = useCallback(() => {
    setState(initialAppearanceState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAppearanceState));
      setSavedState(initialAppearanceState);
      pushToHistory(initialAppearanceState);
      triggerToast('info', 'Przywrócono domyślne', 'Wszystkie edytory zostały zresetowane do ustawień fabrycznych.');
    } catch (err) {
      console.error('Failed to reset settings:', err);
    }
  }, [pushToHistory, triggerToast]);

  const discardChanges = useCallback(() => {
    setState(savedState);
    pushToHistory(savedState);
    triggerToast('warning', 'Cofnięto zmiany', 'Przywrócono ostatnio zapisaną wersję roboczą.');
  }, [savedState, pushToHistory, triggerToast]);

  // Synchronize dynamic store categories with system catalogue
  const synchronizeCategoriesWithSystem = useCallback(() => {
    const currentItems = [...state.mainMenu.items];
    const shopItemIndex = currentItems.findIndex(i => i.id === 'item_shop_mega' || i.type === 'megamenu');

    // Build fresh multi-level category items from SYSTEM_CATEGORIES
    const dynamicCategories = SYSTEM_CATEGORIES.map(cat => ({
      id: `cat_${cat.slug}`,
      label: cat.name,
      url: cat.url,
      type: 'category' as const,
      icon: cat.icon,
      productCount: cat.productCount,
      children: cat.subcategories.map(sub => ({
        id: `sub_${sub.slug}`,
        label: sub.name,
        url: sub.url,
        type: 'subcategory' as const,
        productCount: sub.productCount
      }))
    }));

    if (shopItemIndex !== -1) {
      currentItems[shopItemIndex] = {
        ...currentItems[shopItemIndex],
        children: dynamicCategories,
        countConfig: {
          enabled: true,
          count: SYSTEM_CATEGORIES.reduce((acc, c) => acc + c.productCount, 0),
          color: '#64748b',
          size: 11,
          position: 'inline',
          separator: 'parentheses'
        }
      };
    }

    const updatedMainMenu: MainMenuConfig = {
      ...state.mainMenu,
      items: currentItems,
      dynamicSync: {
        ...state.mainMenu.dynamicSync,
        lastSyncedAt: new Date().toLocaleTimeString('pl-PL')
      }
    };

    updateMainMenu(updatedMainMenu);
    triggerToast('success', 'Zsynchronizowano z katalogiem!', `Pobrano ${SYSTEM_CATEGORIES.length} kategorii głównych i aktualne liczniki produktów.`);
  }, [state.mainMenu, updateMainMenu, triggerToast]);

  // Link validation & broken URL detector
  const validationIssues: ValidationIssue[] = React.useMemo(() => {
    const issues: ValidationIssue[] = [];
    const checkItem = (item: MenuItem) => {
      if (!item.url || item.url.trim() === '') {
        issues.push({
          id: `iss_${item.id}_empty`,
          itemId: item.id,
          itemLabel: item.label,
          type: 'empty_url',
          severity: 'error',
          message: `Pozycja "${item.label}" ma pusty adres URL. Może to spowodować błąd 404 u klienta.`,
          suggestedFixUrl: '/'
        });
      } else if (item.url.startsWith('http://')) {
        issues.push({
          id: `iss_${item.id}_http`,
          itemId: item.id,
          itemLabel: item.label,
          type: 'invalid_format',
          severity: 'warning',
          message: `Adres URL używa niezabezpieczonego protokołu HTTP zamiast HTTPS.`,
          suggestedFixUrl: item.url.replace('http://', 'https://')
        });
      }

      if (item.type === 'dropdown' && (!item.children || item.children.length === 0)) {
        issues.push({
          id: `iss_${item.id}_no_child`,
          itemId: item.id,
          itemLabel: item.label,
          type: 'no_children',
          severity: 'info',
          message: `Pozycja oznaczona jako "Rozwijane Menu (Dropdown)" nie posiada żadnych podelementów.`
        });
      }

      if (item.children) {
        item.children.forEach(sub => {
          if (!sub.url || sub.url.trim() === '') {
            issues.push({
              id: `iss_sub_${sub.id}_empty`,
              itemId: sub.id,
              itemLabel: `${item.label} > ${sub.label}`,
              type: 'empty_url',
              severity: 'error',
              message: `Podelement "${sub.label}" ma pusty adres URL.`,
              suggestedFixUrl: '#'
            });
          }
        });
      }
    };

    state.mainMenu.items.forEach(checkItem);
    return issues;
  }, [state.mainMenu.items]);

  const autoFixValidationIssue = useCallback((issueId: string) => {
    const issue = validationIssues.find(i => i.id === issueId);
    if (!issue || !issue.suggestedFixUrl) return;

    const items = state.mainMenu.items.map(item => {
      if (item.id === issue.itemId) {
        return { ...item, url: issue.suggestedFixUrl! };
      }
      if (item.children) {
        const children = item.children.map(sub =>
          sub.id === issue.itemId ? { ...sub, url: issue.suggestedFixUrl! } : sub
        );
        return { ...item, children };
      }
      return item;
    });

    updateMainMenu({ items });
    triggerToast('success', 'Naprawiono link!', `Zaktualizowano adres URL pozycji ${issue.itemLabel}`);
  }, [validationIssues, state.mainMenu.items, updateMainMenu, triggerToast]);

  const autoFixAllIssues = useCallback(() => {
    let fixCount = 0;
    const items = state.mainMenu.items.map(item => {
      let newItem = { ...item };
      if (!newItem.url || newItem.url.trim() === '') {
        newItem.url = '/';
        fixCount++;
      } else if (newItem.url.startsWith('http://')) {
        newItem.url = newItem.url.replace('http://', 'https://');
        fixCount++;
      }
      if (newItem.children) {
        newItem.children = newItem.children.map(sub => {
          if (!sub.url || sub.url.trim() === '') {
            fixCount++;
            return { ...sub, url: '#' };
          }
          return sub;
        });
      }
      return newItem;
    });

    updateMainMenu({ items });
    triggerToast('success', 'Naprawiono wszystkie problemy', `Automatycznie skorygowano ${fixCount} nieprawidłowości w adresach URL.`);
  }, [state.mainMenu.items, updateMainMenu, triggerToast]);

  const copyItemToClipboard = useCallback((item: MenuItem) => {
    setClipboardItem(JSON.parse(JSON.stringify(item)));
    triggerToast('info', 'Skopiowano pozycję', `Pozycja "${item.label}" została skopiowana do schowka.`);
  }, [triggerToast]);

  const copyStyleToClipboard = useCallback((style: any) => {
    setClipboardStyle(JSON.parse(JSON.stringify(style)));
    triggerToast('info', 'Skopiowano styl', 'Zestaw reguł stylistycznych zapisany w schowku.');
  }, [triggerToast]);

  return (
    <StoreAppearanceContext.Provider
      value={{
        state,
        savedState,
        publishedState,
        isDirty,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        devicePreview,
        setDevicePreview,
        isLoadingStudio,
        openVisualStudio,
        updateTopBar,
        updateLogo,
        updateMainMenu,
        updateSearchBar,
        updateButtons,
        updateCategories,
        resetCategories,
        applyCategoriesPreset,
        categoriesClipboardStyle,
        copyCategoriesStyle,
        pasteCategoriesStyle,
        updateProductsGrid,
        resetProductsGrid,
        applyProductsGridPreset,
        productsGridClipboardStyle,
        copyProductsGridStyle,
        pasteProductsGridStyle,
        selectedWidgetId,
        setSelectedWidgetId,
        updateWidget,
        updateWidgetsManager,
        addWidget,
        removeWidget,
        toggleWidgetEnabled,
        duplicateWidget,
        resetWidget,
        applyWidgetPreset,
        widgetClipboardStyle,
        copyWidgetStyle,
        pasteWidgetStyle,
        widgetPreviewState,
        setWidgetPreviewState,

        // Banners & Sliders
        selectedBannerId,
        setSelectedBannerId,
        updateBanner,
        updateBannersManager,
        updateMainSliderDedicated,
        addBanner,
        removeBanner,
        toggleBannerEnabled,
        duplicateBanner,
        resetBanner,
        applyBannerPreset,
        bannerClipboardStyle,
        copyBannerStyle,
        pasteBannerStyle,
        isMainSliderModalOpen,
        setIsMainSliderModalOpen,

        // Footer Engine
        selectedFooterSectionId,
        setSelectedFooterSectionId,
        updateFooter,
        resetFooter,
        applyFooterPreset,
        footerClipboardStyle,
        copyFooterStyle,
        pasteFooterStyle,

        cartItems,
        wishlistIds,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        toggleWishlist,
        clearCart,
        activeButtonId,
        setActiveButtonId,
        updateButtonItem,
        addButtonItem,
        deleteButtonItem,
        duplicateButtonItem,
        reorderButtonItems,
        resetButtonItem,
        applyButtonPreset,
        buttonClipboardStyle,
        copyButtonStyle,
        pasteButtonStyle,
        undo,
        redo,
        canUndo,
        canRedo,
        saveDraft,
        publishSettings,
        resetToDefaultSettings,
        resetToFactoryDefaults: resetToDefaultSettings,
        hasUnsavedChanges: isDirty,
        discardChanges,
        restoreVersion,
        versionHistory,
        synchronizeCategoriesWithSystem,
        validationIssues,
        autoFixValidationIssue,
        autoFixAllIssues,
        clipboardItem,
        clipboardStyle,
        copyItemToClipboard,
        copyStyleToClipboard,
        toasts,
        dismissToast,
        triggerToast,
        showUnsavedDialog,
        setShowUnsavedDialog,
        pendingNavigationAction,
        setPendingNavigationAction
      }}
    >
      {children}
    </StoreAppearanceContext.Provider>
  );
};

export const useStoreAppearance = () => {
  const context = useContext(StoreAppearanceContext);
  if (!context) {
    throw new Error('useStoreAppearance must be used within a StoreAppearanceProvider');
  }
  return context;
};
