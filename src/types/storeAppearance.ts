import { WidgetsManagerConfig } from './widgetEditor';
import { BannersManagerConfig } from './bannerEditor';
import { FooterConfig } from './footerEditor';

export type AppearanceTab =
  | 'top_bar'
  | 'topbar'
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

export type ViewMode = 'provider' | 'storefront';
export type DevicePreview = 'desktop' | 'tablet' | 'mobile';

export type TopBarPositionMode = 'normal' | 'sticky' | 'fixed';
export type TopBarContainerPreset = 'full' | 'wide' | 'standard' | 'narrow';
export type TopBarHeight = 'compact' | 'normal' | 'relaxed' | 'custom';

export interface TopBarElementItem {
  id: string;
  enabled: boolean;
}

export interface TopBarZone {
  id: string;
  name: string;
  width: number;
  widthType?: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right' | 'between';
  verticalAlign?: string;
  direction?: string;
  flexWrap?: string;
  gap?: number;
  paddingX?: number;
  isLocked?: boolean;
  isHidden?: boolean;
  elements: TopBarElementItem[];
}

export interface TopBarSocialItem {
  platform: string;
  url: string;
  label?: string;
}

export interface TopBarElementCustomSetting {
  customText?: string;
  customLink?: string;
  customBadge?: string;
  customBadgeColor?: string;
  customBadgeTextColor?: string;
  target?: '_self' | '_blank' | string;
  action?: string;
  customColor?: string;
  customBgColor?: string;
  customHoverColor?: string;
  customHoverBgColor?: string;
  iconColor?: string;
  customBorderRadius?: string | number;
  customPadding?: string;
  customFontSize?: string;
  customFontWeight?: string;
  fontFamily?: string;
  letterSpacing?: 'tighter' | 'normal' | 'wide' | 'widest' | string;
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  customWidthType?: 'auto' | 'fixed';
  customWidthValue?: number;
  separatorStyle?: 'line' | 'dot' | 'slash';
  visibility?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
  };
}

export interface TopBarConfig {
  enabled: boolean;
  elementId?: string;
  position?: TopBarPositionMode;
  containerWidth?: number;
  containerPreset?: TopBarContainerPreset;
  containerMaxWidth?: number;
  height?: TopBarHeight;
  customHeight?: number;
  paddingY?: number;
  paddingX?: number;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderBottom?: boolean;
  borderBottomColor?: string;
  borderBottomWidth?: number;
  borderTop?: boolean;
  borderTopColor?: string;
  borderTopWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | string;
  borderRadius?: number;
  gradientBackground?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDegree?: number;
  glassmorphism?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'glow' | string;
  showDividers?: boolean;
  dividerStyle?: 'line' | 'dot' | 'slash' | 'none';
  announcementText?: string;
  phone?: string;
  email?: string;
  location?: string;
  workingHours?: string;
  socialItems: TopBarSocialItem[];
  zones: TopBarZone[];
  elementSettings: Record<string, TopBarElementCustomSetting>;
  activePresetId?: string;
  zIndex?: number;
  fontFamily?: string;
}

export interface LogoConfig {
  enabled?: boolean;
  elementId?: string;
  cssClass?: string;
  logoType: 'text' | 'image' | 'combined';
  imageUrl?: string;
  imageDarkUrl?: string;
  imageMobileUrl?: string;
  previousImageUrl?: string;
  textName: string;
  showTagline?: boolean;
  tagline?: string;
  taglineColor?: string;
  taglineFontSize?: number;
  taglineFontStyle?: string;
  textColor?: string;
  accentColor?: string;
  gradientText?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  textFont?: 'sans' | 'display' | 'serif' | 'mono';
  textWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  customFontSize?: number;
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  textLetterSpacing?: 'tighter' | 'normal' | 'wide' | 'widest';
  iconName?: string;
  sygnetPosition?: 'left' | 'right' | 'top';
  sygnetSize?: number;
  desktopHeight: number;
  mobileHeight?: number;
  maxWidth: number;
  lockAspectRatio?: boolean;
  offsetX?: number;
  offsetY?: number;
  paddingY?: number;
  paddingX?: number;
  alignment?: 'left' | 'center' | 'right';
  showContainerBox?: boolean;
  containerStyle?: {
    enabled?: boolean;
    backgroundType?: 'none' | 'color' | 'glass';
    backgroundColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderType?: string;
    borderRadius?: number;
    shadowType?: 'none' | 'sm' | 'md' | 'glow';
  };
  filters?: {
    brightness?: number;
    contrast?: number;
    saturate?: number;
    grayscale?: number;
    opacity?: number;
    blur?: number;
    sepia?: number;
    hueRotate?: number;
  };
  transform?: {
    scale?: number;
    rotate?: number;
    translateX?: number;
    translateY?: number;
    skewX?: number;
    skewY?: number;
  };
  hoverEffect?: 'none' | 'scale' | 'opacity' | 'glow' | 'rotate';
  hoverConfig?: any;
  scrollConfig?: {
    enabled?: boolean;
    scrolledHeight?: number;
  };
  useSameLogoOnAllDevices?: boolean;
  hideOnDesktop?: boolean;
  hideOnTablet?: boolean;
  hideOnMobile?: boolean;
  isLink?: boolean;
  targetUrl?: string;
  openInNewTab?: boolean;
  altText?: string;
  ariaLabel?: string;
  seoTitle?: string;
  activePresetId?: string;
}

export type MenuItemType =
  | 'link'
  | 'page'
  | 'category'
  | 'subcategory'
  | 'product'
  | 'collection'
  | 'blog'
  | 'article'
  | 'custom_url'
  | 'external_link'
  | 'button'
  | 'system_action'
  | 'dropdown'
  | 'megamenu';

export type MenuSystemAction =
  | 'open_cart'
  | 'open_account'
  | 'open_search'
  | 'open_menu'
  | 'login'
  | 'register'
  | 'wishlist'
  | 'notifications';

export interface MegaMenuSectionItem {
  id: string;
  label: string;
  url: string;
  isHot?: boolean;
  badge?: string;
  count?: number;
}

export interface MegaMenuSection {
  id: string;
  title: string;
  titleUrl?: string;
  icon?: string;
  items: MegaMenuSectionItem[];
}

export interface MegaMenuPromoBanner {
  enabled: boolean;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  targetUrl?: string;
  badge?: string;
  badgeBg?: string;
  ctaText?: string;
  width?: number;
  height?: number;
  objectFit?: string;
  radius?: number;
  overlayColor?: string;
  overlayOpacity?: number;
  hoverZoom?: boolean;
}

export interface MegaMenuConfig {
  enabled: boolean;
  columnsCount: number;
  widthMode: 'container' | 'full_width' | 'custom_px';
  customWidthPx?: number;
  minHeightPx?: number;
  padding?: number;
  gap?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  shadow?: string;
  sections: MegaMenuSection[];
  promoBanner?: MegaMenuPromoBanner;
}

export interface SubmenuItem {
  id: string;
  label: string;
  url: string;
  type?: MenuItemType;
  icon?: string;
  badge?: string;
  productCount?: number;
  children?: SubmenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: MenuItemType;
  icon?: string;
  iconConfig?: {
    enabled?: boolean;
    name?: string;
    type?: string;
    size?: number;
    color?: string;
    hoverColor?: string;
    position?: 'left' | 'right' | 'top';
    gap?: number;
    animation?: string;
  };
  badge?: string;
  badgeColor?: string;
  badgeConfig?: {
    enabled?: boolean;
    text?: string;
    textColor?: string;
    bgColor?: string;
    size?: string;
    paddingX?: number;
    paddingY?: number;
    position?: string;
    radius?: number;
    borderWidth?: number;
    borderColor?: string;
    shadow?: string;
    animation?: string;
  };
  countConfig?: {
    enabled?: boolean;
    count: number;
    color?: string;
    size?: number;
    position?: string;
    separator?: string;
  };
  productCount?: number;
  children?: SubmenuItem[];
  megaMenu?: MegaMenuConfig;
  isExpandedInTree?: boolean;
  isHidden?: boolean;
  isLocked?: boolean;
  customWidth?: number;
  titleAttr?: string;
  tooltipText?: string;
  openInNewTab?: boolean;
  relNoFollow?: boolean;
  relNoOpener?: boolean;
  systemAction?: MenuSystemAction;
  visibility?: {
    desktop?: boolean;
    tablet?: boolean;
    mobile?: boolean;
    auth?: 'all' | 'logged_in' | 'guest';
    role?: 'all' | 'customer' | 'seller' | 'provider' | 'admin';
    condition?: string;
  };
  translations?: Record<string, {
    label: string;
    url: string;
    badge?: string;
    tooltip?: string;
  }>;
}

export type MainMenuItem = MenuItem;

export interface MainMenuConfig {
  enabled?: boolean;
  name?: string;
  elementId?: string;
  cssClass?: string;
  containerWidthType?: 'full' | 'wide' | 'standard' | 'narrow' | 'custom';
  customWidthPx?: number;
  heightPx?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  itemGapPx?: number;
  horizontalAlign?: 'left' | 'center' | 'right' | 'between';
  positionMode?: 'normal' | 'sticky' | 'fixed';
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  activeColor?: string;
  spacing?: 'compact' | 'normal' | 'relaxed';
  linkStyle?: 'pill' | 'underline' | 'simple' | 'subtle_box';
  uppercase?: boolean;
  sticky?: boolean;
  fontFamily?: 'sans' | 'display' | 'serif' | 'mono';
  typography?: {
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: number;
  };
  background?: {
    color?: string;
    glassmorphism?: boolean;
    backdropBlur?: string;
  };
  border?: {
    type?: 'none' | 'bottom' | 'top' | 'all';
    width?: number;
    style?: string;
    color?: string;
  };
  shadow?: {
    type?: 'none' | 'sm' | 'md' | 'lg' | 'glow';
  };
  dropdown?: {
    openTrigger?: 'hover' | 'click' | 'hover_and_click';
    animationType?: 'slide_down' | 'fade' | 'scale';
    openDelayMs?: number;
    closeDelayMs?: number;
    borderRadius?: number;
  };
  scrollBehavior?: {
    beforeScrollTransparent?: boolean;
    scrolledBlur?: boolean;
    scrollThresholdPx?: number;
    scrolledHeight?: number;
    scrolledBgColor?: string;
  };
  mobile?: {
    type?: 'drawer_left' | 'drawer_right' | 'fullscreen';
    drawerWidthPx?: number;
    backgroundColor?: string;
  };
  animations?: {
    disableAll?: boolean;
    hoverAnimation?: string;
    durationMs?: number;
  };
  dynamicSync?: {
    autoAddNewCategories?: boolean;
    autoRemoveStale?: boolean;
    sortOrder?: string;
    lastSyncedAt?: string;
  };
  showCategoryDrawerButton?: boolean;
  categoryButtonText?: string;
  categoryButtonBg?: string;
  categoryButtonTextCol?: string;
  ctaButton?: {
    enabled?: boolean;
    label?: string;
    url?: string;
    backgroundColor?: string;
    textColor?: string;
    icon?: string;
    borderRadius?: number;
  };
  search?: {
    enabled?: boolean;
    placeholder?: string;
  };
  items: MenuItem[];
  activePresetId?: string;
}

export interface SearchBarConfig {
  enabled: boolean;
  displayMode: 'standard' | 'expanded' | 'compact' | 'fullscreen';
  activePresetId?: string;
  dimensions: {
    heightPx: number;
    maxWidthPx: number;
    zIndex?: number;
    widthType?: 'auto' | 'full' | 'custom';
    customWidthPx?: number;
  };
  structure: {
    showSearchIcon: boolean;
    showSubmitButton: boolean;
    submitButtonText: string;
    submitButtonIcon?: boolean;
    showClearButton: boolean;
    showVoiceSearch: boolean;
    showQrScanner: boolean;
    showCategoryFilter: boolean;
    categoryFilterPosition?: 'left' | 'right';
    selectedCategoryScope?: string;
    placeholderText: string;
    placeholderRotatorEnabled: boolean;
    placeholderRotatorIntervalMs?: number;
    placeholderRotatorItems: string[];
  };
  engine: {
    fuzzyMatching: boolean;
    diacriticsInsensitive: boolean;
    synonymsEnabled: boolean;
    highlightMatchingText: boolean;
    minCharsToTrigger: number;
    debounceMs: number;
    maxResultsCount: number;
  };
  suggestions: {
    enabled: boolean;
    showSearchHistory: boolean;
    maxHistoryItems?: number;
    popularSearches: string[];
    showTrendingBadges?: boolean;
    showProductThumbnails: boolean;
    showPrice: boolean;
    showCategoryTag: boolean;
    showVendorName: boolean;
    showStockStatus: boolean;
  };
  resultsDropdown: {
    maxHeightPx: number;
    loadingSkeletonRows?: number;
    showViewAllButton: boolean;
    viewAllButtonLabel?: string;
    quickAddCartButton: boolean;
    emptyStateTitle?: string;
    emptyStateSubtitle?: string;
    emptyStateShowRecommendations: boolean;
  };
  appearance: {
    backgroundColor: string;
    focusedBackgroundColor: string;
    textColor: string;
    placeholderColor: string;
    borderColor: string;
    focusedBorderColor: string;
    borderWidth?: number;
    borderStyle?: string;
    borderRadius: number;
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'glow';
    focusGlowColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    buttonBorderRadius?: number;
    categoryFilterBg?: string;
    categoryFilterText?: string;
    dropdownBgColor?: string;
    dropdownBorderColor?: string;
  };
  typography: {
    fontFamily?: 'sans' | 'display' | 'serif' | 'mono';
    fontSizePx: number;
    fontWeight?: string;
  };
  animations: {
    expandOnFocus: boolean;
    pulseGlowOnActive: boolean;
    transitionDurationMs: number;
  };
  mobile: {
    autoFocusOnOpen?: boolean;
    fullScreenModalOnMobile?: boolean;
  };
  accessibility: {
    keyboardShortcutsEnabled: boolean;
    shortcutKey?: string;
    ariaLabel: string;
    clearButtonAriaLabel?: string;
  };
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}

export type InteractiveButtonSystemType =
  | 'login'
  | 'register'
  | 'admin_panel'
  | 'user_account'
  | 'cart'
  | 'wishlist'
  | 'notifications'
  | 'messages'
  | 'custom';

export type ButtonShapePreset =
  | 'rectangle'
  | 'rounded'
  | 'extra_rounded'
  | 'pill'
  | 'circle'
  | 'square';

export type ButtonDisplayMode = 'text_only' | 'icon_only' | 'icon_text' | 'text_icon';
export type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';
export type ButtonBackgroundType = 'solid' | 'linear_gradient' | 'radial_gradient' | 'glass' | 'image' | 'transparent';
export type ButtonBorderStyle = 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'gradient';

export type ButtonHoverEffect =
  | 'none'
  | 'scale'
  | 'lift'
  | 'glow'
  | 'underline'
  | 'border_pulse'
  | 'shine'
  | 'ripple'
  | 'icon_move'
  | 'bg_slide';

export type ButtonAnimationType =
  | 'none'
  | 'fade'
  | 'scale'
  | 'slide'
  | 'bounce'
  | 'pulse'
  | 'glow'
  | 'shake'
  | 'shine'
  | 'ripple'
  | 'rotate';

export type ButtonPresetStyleName =
  | 'minimal'
  | 'modern'
  | 'premium'
  | 'glass'
  | 'neon'
  | 'rounded'
  | 'outline'
  | 'ghost'
  | 'solid'
  | 'floating'
  | 'icon_button'
  | 'dark'
  | 'clean'
  | 'pill';

export interface ButtonBoxValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
  linked: boolean;
}

export interface ButtonRadiusValues {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  linked: boolean;
}

export interface ButtonStateStyle {
  textColor?: string;
  bgColor?: string;
  bgGradient?: string[];
  borderColor?: string;
  iconColor?: string;
  scale?: number;
  translateY?: number;
  opacity?: number;
  shadow?: string;
  glowColor?: string;
  glowIntensity?: number;
}

export interface ButtonResponsiveOverride {
  enabled?: boolean;
  text?: string;
  showIcon?: boolean;
  displayMode?: 'text_only' | 'icon_only' | 'icon_text' | 'text_icon';
  fontSizePx?: number;
  width?: string;
  height?: string;
  padding?: ButtonBoxValues;
  margin?: ButtonBoxValues;
}

export interface InteractiveButtonItem {
  id: string;
  name: string;
  systemType: InteractiveButtonSystemType;
  isSystem: boolean;
  enabled: boolean;
  visible: boolean;
  order: number;
  
  // 6. Treść
  content: {
    text: string;
    textDesktop?: string;
    textTablet?: string;
    textMobile?: string;
    tooltip?: string;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    ariaLabel?: string;
    customId?: string;
    elementType: 'standard' | 'icon_text' | 'icon_only' | 'link' | 'dropdown' | 'badge_counter' | 'custom';
  };

  // 7. Ikona
  icon: {
    name: string;
    show: boolean;
    customSvg?: string;
    position: 'left' | 'right' | 'top' | 'bottom';
    sizePx: number;
    color?: string;
    opacity: number;
    gapPx: number;
    hoverIcon?: string;
    activeIcon?: string;
    disabledIcon?: string;
    animation: 'none' | 'rotate' | 'shake' | 'pulse' | 'bounce' | 'slide' | 'scale';
  };

  // 8. Układ & 9. Rozmiar
  layout: {
    displayMode: 'text_only' | 'icon_only' | 'icon_text' | 'text_icon';
    align: 'left' | 'center' | 'right';
    verticalAlign: 'top' | 'center' | 'bottom';
    widthType: 'auto' | 'fixed' | 'full' | 'custom';
    width: string;
    height: string;
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    overflow: 'visible' | 'hidden' | 'auto' | 'scroll';
    positioning: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
    cursor: 'pointer' | 'default' | 'grab' | 'not-allowed';
  };

  // 10. Odstępy
  spacing: {
    padding: ButtonBoxValues;
    margin: ButtonBoxValues;
  };

  // 11. Typografia
  typography: {
    fontFamily: 'sans' | 'display' | 'serif' | 'mono';
    fontSizePx: number;
    fontWeight: '300' | '400' | '500' | '600' | '700' | '800';
    lineHeight: string;
    letterSpacing: 'tighter' | 'normal' | 'wide' | 'widest';
    textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
    textDecoration: 'none' | 'underline';
    color: string;
  };

  // 12. Tło & 16. Glassmorphism
  background: {
    type: 'solid' | 'linear_gradient' | 'radial_gradient' | 'glass' | 'image' | 'transparent';
    color: string;
    gradientColors: string[];
    gradientAngle: number;
    opacity: number;
    imageUrl?: string;
    imagePosition?: string;
    backdropBlur: number;
    glassmorphism: {
      enabled: boolean;
      blur: number;
      borderOpacity: number;
      highlight: boolean;
    };
  };

  // 13. Obramowanie & 14. Zaokrąglenie
  border: {
    style: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
    color: string;
    width: ButtonBoxValues;
    radius: ButtonRadiusValues;
    shapePreset: ButtonShapePreset;
    isGradientBorder?: boolean;
    isInnerBorder?: boolean;
  };

  // 15. Cień & 17. Glow / Neon
  shadow: {
    enabled: boolean;
    type: 'outer' | 'inner';
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
    glow: {
      enabled: boolean;
      type: 'outer' | 'inner' | 'neon';
      color: string;
      intensity: number;
      radius: number;
      opacity: number;
    };
  };

  // 18. Transformacje & 19. 3D
  transform: {
    translateX: number;
    translateY: number;
    rotate: number;
    scale: number;
    skewX: number;
    skewY: number;
    enable3d: boolean;
    rotateX: number;
    rotateY: number;
    perspective: number;
  };

  // 20. Stany
  states: {
    hover: ButtonStateStyle;
    active: ButtonStateStyle;
    focus: ButtonStateStyle;
    disabled: ButtonStateStyle;
    loading: ButtonStateStyle;
  };

  // 21. Efekty Hover, 22. Animacje, 30. Ripple, 31. Shine
  effects: {
    hoverEffect: ButtonHoverEffect;
    animation: {
      type: ButtonAnimationType;
      durationMs: number;
      delayMs: number;
      easing: 'ease' | 'linear' | 'ease-in-out' | 'cubic-bezier';
      loop: boolean;
    };
    ripple: {
      enabled: boolean;
      color: string;
      speedMs: number;
    };
    shine: {
      enabled: boolean;
      color: string;
      speedMs: number;
      direction: 'left-right' | 'top-bottom';
    };
  };

  // 25. Badge / Licznik
  badge: {
    enabled: boolean;
    dataSource: 'cart_count' | 'wishlist_count' | 'notifications_count' | 'messages_count' | 'custom';
    customValue?: string | number;
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    offsetX: number;
    offsetY: number;
    sizePx: number;
    bgColor: string;
    textColor: string;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    pulseAnimation: boolean;
  };

  // 26. Dropdown / Panel
  dropdown: {
    enabled: boolean;
    trigger: 'click' | 'hover';
    widthPx: number;
    maxHeightPx: number;
    position: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'fullscreen-mobile';
    bgColor: string;
    borderColor: string;
    borderRadius: number;
    shadow: 'sm' | 'md' | 'lg' | 'xl';
    items?: Array<{
      id: string;
      label: string;
      icon?: string;
      action?: string;
      url?: string;
      badge?: string;
      isDivider?: boolean;
    }>;
  };

  // 27. Akcja po kliknięciu & 28. Link
  action: {
    type: 'link' | 'page' | 'category' | 'product' | 'dropdown' | 'modal' | 'system_action' | 'custom_js';
    url?: string;
    target?: '_self' | '_blank';
    systemActionName?: string;
    modalId?: string;
  };

  // 32. Widoczność & 33. Warunkowe
  visibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
    requiresAuth: 'all' | 'logged_in' | 'logged_out';
    role: 'all' | 'customer' | 'admin' | 'vendor';
  };

  // 34. Responsywność
  responsive: {
    tablet?: Partial<ButtonResponsiveOverride>;
    mobile?: Partial<ButtonResponsiveOverride>;
  };

  // 40. Globalne style
  useGlobalStyles: boolean;
  isGlobalComponent?: boolean;
}

export interface InteractiveButtonsConfig {
  enabled: boolean;
  name: string;
  activeElementId: string;
  globalDefaults: {
    fontFamily: 'sans' | 'display' | 'serif' | 'mono';
    primaryColor: string;
    primaryTextColor: string;
    accentColor: string;
    borderRadius: number;
    defaultShadow: string;
    transitionDurationMs: number;
  };
  items: InteractiveButtonItem[];
}

export type CategoriesDisplayMode =
  | 'list'
  | 'grid'
  | 'tiles'
  | 'carousel'
  | 'slider'
  | 'horizontal_list'
  | 'list_with_icons'
  | 'list_with_images'
  | 'tiles_with_images';

export type CategoriesCardLayout =
  | 'image_top'
  | 'image_bottom'
  | 'image_left'
  | 'image_right'
  | 'image_background'
  | 'text_over_image'
  | 'text_below_image';

export type CategoriesSortOrder =
  | 'system_default'
  | 'alpha_asc'
  | 'alpha_desc'
  | 'popularity'
  | 'product_count_desc'
  | 'newest'
  | 'custom';

export type CategoriesImageAspectRatio = '1:1' | '4:3' | '16:9' | '3:2' | 'circle' | 'auto';
export type CategoriesImageObjectFit = 'cover' | 'contain' | 'fill';
export type CategoriesPlaceholderMode = 'default_image' | 'category_icon' | 'solid_color' | 'gradient' | 'initial_letter';
export type CategoriesHoverImageEffect = 'none' | 'zoom' | 'scale' | 'blur' | 'brightness' | 'darken' | 'lighten' | 'grayscale' | 'rotate' | 'shine';
export type CategoriesAnimationType = 'none' | 'fade' | 'slide_up' | 'scale' | 'zoom' | 'bounce' | 'float' | 'glow' | 'reveal';
export type CategoriesRadiusPreset = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'pill' | 'circle' | 'custom';
export type CategoriesPresetStyleName =
  | 'minimal'
  | 'modern'
  | 'premium'
  | 'glass'
  | 'neon'
  | 'clean'
  | 'cards'
  | 'image_cards'
  | 'rounded'
  | 'compact'
  | 'large_categories';

export interface CategoriesWidgetConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  showSectionHeader: boolean;
  headerAlignment: 'left' | 'center' | 'right' | 'between';
  displayMode: CategoriesDisplayMode;
  columnsDesktop: number | 'auto';
  columnsTablet: number;
  columnsMobile: number | 'auto';
  limitCount: number | 'all';
  customLimitCount?: number;
  paginationType: 'none' | 'show_more' | 'load_more' | 'pagination_dots' | 'slider_arrows';
  sortOrder: CategoriesSortOrder;
  filterFeaturedOnly: boolean;
  filterWithProductsOnly: boolean;
  containerWidthPreset: 'full' | 'wide' | 'standard' | 'narrow';
  containerMaxWidth?: number;
  cardLayout: CategoriesCardLayout;
  contentAlign: 'left' | 'center' | 'right';
  cardHeightMode: 'auto' | 'fixed' | 'aspect_ratio';
  cardFixedHeight?: number;
  cardPadding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    isLocked?: boolean;
  };
  cardGap: number;
  sectionPaddingY: number;
  sectionPaddingX: number;
  backgroundType: 'solid' | 'gradient' | 'glass' | 'transparent' | 'image';
  backgroundColor: string;
  backgroundGradient?: {
    from: string;
    to: string;
    degree: number;
  };
  glassmorphism: {
    enabled: boolean;
    blurPx: number;
    opacity: number;
  };
  image: {
    show: boolean;
    widthPx?: number;
    heightPx?: number;
    aspectRatio: CategoriesImageAspectRatio;
    objectFit: CategoriesImageObjectFit;
    objectPosition: 'center' | 'top' | 'bottom' | 'left' | 'right';
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    shadow: 'none' | 'sm' | 'md' | 'lg';
    opacity: number;
    placeholderMode: CategoriesPlaceholderMode;
    customPlaceholderUrl?: string;
    placeholderBgColor: string;
  };
  overlay: {
    type: 'none' | 'solid' | 'gradient' | 'dark' | 'light' | 'custom';
    color: string;
    opacity: number;
    hoverOpacity: number;
  };
  nameTypography: {
    show: boolean;
    fontSizePx: number;
    fontFamily: 'sans' | 'display' | 'serif' | 'mono';
    fontWeight: '400' | '500' | '600' | '700' | '800';
    color: string;
    hoverColor: string;
    lineHeight: number;
    letterSpacing: string;
    textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
    maxLines: 1 | 2 | 'none';
  };
  productCount: {
    show: boolean;
    position: 'below_name' | 'inline' | 'badge_top_right' | 'badge_top_left' | 'badge_bottom_right' | 'pill';
    formatTemplate: string;
    fontSizePx: number;
    color: string;
    bgColor: string;
    borderColor?: string;
    borderRadius: number;
    padding: string;
    showZeroCount: boolean;
  };
  icon: {
    show: boolean;
    source: 'system' | 'default_icon' | 'none';
    defaultIconName: string;
    sizePx: number;
    color: string;
    hoverColor?: string;
    position: 'beside_name' | 'above_name' | 'corner_badge' | 'replace_image';
    bgColor?: string;
    borderRadius?: number;
    padding?: number;
    opacity: number;
  };
  border: {
    style: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
    width: number;
    color: string;
    hoverColor?: string;
    radiusPreset: CategoriesRadiusPreset;
    radiusTopLeft: number;
    radiusTopRight: number;
    radiusBottomRight: number;
    radiusBottomLeft: number;
  };
  shadow: {
    preset: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'glow' | 'custom';
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
  };
  hover: {
    cardBgColor?: string;
    cardTextColor?: string;
    cardScale: number;
    translateYPx: number;
    shadowPreset?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'glow';
    borderColor?: string;
    glowColor?: string;
    imageEffect: CategoriesHoverImageEffect;
    imageScale: number;
    transitionDurationMs: number;
  };
  animation: {
    type: CategoriesAnimationType;
    durationMs: number;
    staggerDelayMs: number;
    easing: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';
  };
  showMoreButton: {
    show: boolean;
    text: string;
    icon: string;
    position: 'center' | 'left' | 'right' | 'full_width' | 'header_right';
    action: 'expand_inline' | 'navigate_to_all_categories';
    targetUrl?: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    borderRadius: number;
    hoverBgColor: string;
    hoverTextColor: string;
    shadow: 'none' | 'sm' | 'md' | 'lg';
  };
  responsive: {
    tablet?: {
      columns?: number;
      limitCount?: number;
      fontSizePx?: number;
      cardHeight?: number;
      cardPadding?: number;
      gap?: number;
      showImage?: boolean;
      showProductCount?: boolean;
    };
    mobile?: {
      columns?: number | 'auto';
      limitCount?: number;
      fontSizePx?: number;
      cardHeight?: number;
      cardPadding?: number;
      gap?: number;
      showImage?: boolean;
      showProductCount?: boolean;
      displayMode?: CategoriesDisplayMode;
    };
  };
  useGlobalStyles: boolean;
  activePreset?: CategoriesPresetStyleName;
}

export type ProductGridDisplayMode =
  | 'grid'
  | 'cards'
  | 'compact_grid'
  | 'large_cards'
  | 'list'
  | 'horizontal_list'
  | 'carousel'
  | 'slider'
  | 'masonry';

export type ProductGridImageAspectRatio = '1:1' | '4:3' | '16:9' | '3:4' | '3:2' | 'circle' | 'auto';
export type ProductGridImageObjectFit = 'cover' | 'contain' | 'fill';
export type ProductGridMultiImageBehavior = 'first_only' | 'hover_second' | 'slider' | 'thumbnails' | 'hover_swap';
export type ProductGridImageHoverEffect = 'none' | 'zoom' | 'scale' | 'fade' | 'blur' | 'brightness' | 'grayscale' | 'overlay' | 'shine';
export type ProductGridPlaceholderMode = 'default' | 'custom' | 'icon' | 'solid' | 'gradient';

export type ProductGridRadiusPreset = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'pill' | 'custom';
export type ProductGridShadowPreset = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'glow' | 'custom';

export type ProductGridPresetStyleName =
  | 'minimal'
  | 'modern'
  | 'premium'
  | 'glass'
  | 'neon'
  | 'clean'
  | 'cards'
  | 'product_cards'
  | 'compact'
  | 'large_cards'
  | 'marketplace';

export type ProductCardElementKey =
  | 'image'
  | 'badge'
  | 'category_brand'
  | 'name'
  | 'description'
  | 'rating'
  | 'price'
  | 'buttons'
  | 'stock'
  | 'variants';

export interface ProductsGridWidgetConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  showSectionHeader: boolean;
  headerAlignment: 'left' | 'center' | 'right' | 'between';
  containerWidthPreset: 'full' | 'wide' | 'standard' | 'narrow';
  containerMaxWidth?: number;
  
  // 3. Układ siatki
  displayMode: ProductGridDisplayMode;
  
  // 4. Liczba kolumn
  columnsDesktop: number | 'auto';
  columnsTablet: number;
  columnsMobile: number | 'auto';
  
  // 5. Odstępy
  gapDesktopX: number;
  gapDesktopY: number;
  gapTabletX: number;
  gapTabletY: number;
  gapMobileX: number;
  gapMobileY: number;
  sectionPaddingY: number;
  sectionPaddingX: number;
  
  // 6. Wymiary karty
  cardWidthMode: 'auto' | 'fixed' | 'percentage';
  cardFixedWidthPx?: number;
  cardMinWidthPx?: number;
  cardMaxWidthPx?: number;
  cardHeightMode: 'auto' | 'equal' | 'fixed';
  cardFixedHeightPx?: number;
  cardMinHeightPx?: number;
  cardMaxHeightPx?: number;
  cardPadding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    isLocked?: boolean;
  };
  
  // 7, 8, 9, 10. Zdjęcie produktu
  image: {
    show: boolean;
    aspectRatio: ProductGridImageAspectRatio;
    objectFit: ProductGridImageObjectFit;
    objectPosition: 'center' | 'top' | 'bottom';
    heightPx?: number;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
    shadow: 'none' | 'sm' | 'md' | 'lg';
    opacity: number;
    multiImageBehavior: ProductGridMultiImageBehavior;
    hoverEffect: ProductGridImageHoverEffect;
    zoomScale: number;
    placeholderMode: ProductGridPlaceholderMode;
    customPlaceholderUrl?: string;
    placeholderIcon: string;
    placeholderBgColor: string;
  };
  
  // 11, 27. Tło karty & Glassmorphism
  backgroundType: 'solid' | 'gradient' | 'glass' | 'image' | 'transparent';
  backgroundColor: string;
  backgroundGradient?: {
    from: string;
    to: string;
    degree: number;
  };
  glassmorphism: {
    enabled: boolean;
    blurPx: number;
    opacity: number;
    borderGlow: boolean;
    highlight: boolean;
  };
  
  // 12. Nazwa produktu (Typografia)
  nameTypography: {
    show: boolean;
    fontFamily: 'sans' | 'display' | 'serif' | 'mono';
    fontSizePx: number;
    fontWeight: '400' | '500' | '600' | '700' | '800';
    color: string;
    hoverColor: string;
    lineHeight: number;
    letterSpacing: string;
    textAlign: 'left' | 'center' | 'right';
    maxLines: 1 | 2 | 3 | 'none';
    textTransform: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  };
  
  // Kategoria / Marka nad nazwą
  metaTypography: {
    showCategory: boolean;
    showBrand: boolean;
    fontFamily: 'sans' | 'display' | 'serif' | 'mono';
    fontSizePx: number;
    fontWeight: '400' | '500' | '600';
    color: string;
    textTransform: 'none' | 'uppercase' | 'capitalize';
  };
  
  // Krótki opis
  descriptionTypography: {
    show: boolean;
    fontSizePx: number;
    color: string;
    maxLines: 1 | 2 | 3;
    lineHeight: number;
  };
  
  // 13. Cena
  price: {
    show: boolean;
    fontSizePx: number;
    fontFamily: 'sans' | 'display' | 'serif' | 'mono';
    fontWeight: '500' | '600' | '700' | '800' | '900';
    color: string;
    align: 'left' | 'center' | 'right' | 'between';
    showOldPrice: boolean;
    oldPriceColor: string;
    oldPriceStrikethrough: boolean;
    oldPriceFontSizePx: number;
    promoDiscountBadge: {
      show: boolean;
      textTemplate: '-{discount}%';
      bgColor: string;
      textColor: string;
      borderRadius: number;
    };
  };
  
  // 14. Waluta
  currency: {
    symbolPosition: 'prefix' | 'suffix';
    spacing: 'none' | 'small' | 'normal';
    style: 'standard' | 'subscript' | 'uppercase';
  };
  
  // 15, 16. Ocena produktu & Liczba opinii
  rating: {
    show: boolean;
    showStars: boolean;
    showScore: boolean;
    showReviewsCount: boolean;
    starColor: string;
    emptyStarColor: string;
    starSizePx: number;
    reviewsFormat: '({count})' | '{count} opinii' | '{count} ocen';
    reviewsColor: string;
    reviewsFontSizePx: number;
    position: 'inline' | 'separate_row';
  };
  
  // 17, 18. Badge produktu
  badge: {
    show: boolean;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
    fontSizePx: number;
    fontWeight: '600' | '700' | '800';
    borderRadius: number;
    padding: string;
    shadow: 'none' | 'sm' | 'md';
    customColors: {
      newArrivalBg: string;
      newArrivalText: string;
      saleBg: string;
      saleText: string;
      bestsellerBg: string;
      bestsellerText: string;
      recommendedBg: string;
      recommendedText: string;
      outOfStockBg: string;
      outOfStockText: string;
    };
  };
  
  // 19, 20, 21, 22. Przyciski produktu
  buttons: {
    addToCart: {
      show: boolean;
      text: string;
      icon: string;
      iconPosition: 'left' | 'right' | 'only_icon';
      size: 'sm' | 'md' | 'lg' | 'full_width';
      bgColor: string;
      textColor: string;
      borderColor: string;
      borderRadius: number;
      shadow: 'none' | 'sm' | 'md' | 'lg';
      hoverBgColor: string;
      hoverTextColor: string;
      animation: 'scale' | 'bounce' | 'glow' | 'none';
      showSuccessFeedback: boolean;
    };
    buyNow: {
      show: boolean;
      text: string;
      icon: string;
      bgColor: string;
      textColor: string;
      borderRadius: number;
      hoverBgColor: string;
    };
    wishlist: {
      show: boolean;
      icon: string;
      sizePx: number;
      color: string;
      activeColor: string;
      bgColor: string;
      activeBgColor: string;
      borderColor: string;
      borderRadius: number;
      position: 'top_right' | 'top_left' | 'beside_cart' | 'floating';
      animation: 'heart_bounce' | 'pulse' | 'none';
    };
    quickView: {
      show: boolean;
      icon: string;
      text: string;
      position: 'hover_overlay' | 'card_bottom' | 'icon_button';
      bgColor: string;
      textColor: string;
      borderRadius: number;
    };
    detailsLink: {
      show: boolean;
      text: string;
      icon: string;
    };
  };
  
  // 23. Hover karty
  hover: {
    cardBgColor?: string;
    borderColor?: string;
    shadowPreset: ProductGridShadowPreset;
    scale: number;
    translateYPx: number;
    showOverlay: boolean;
    overlayColor: string;
    overlayOpacity: number;
    transitionDurationMs: number;
  };
  
  // 24, 25. Border & Border Radius
  border: {
    style: 'none' | 'solid' | 'dashed' | 'dotted';
    width: number;
    color: string;
    hoverColor?: string;
    sides: {
      top: boolean;
      right: boolean;
      bottom: boolean;
      left: boolean;
    };
    radiusPreset: ProductGridRadiusPreset;
    radiusTopLeft: number;
    radiusTopRight: number;
    radiusBottomRight: number;
    radiusBottomLeft: number;
  };
  
  // 26. Cień (Shadow)
  shadow: {
    preset: ProductGridShadowPreset;
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
  };
  
  // 29. Układ elementów karty (kolejność)
  elementsOrder: ProductCardElementKey[];
  
  // 30. Widoczność elementów
  visibility: {
    image: boolean;
    badge: boolean;
    category: boolean;
    brand: boolean;
    name: boolean;
    description: boolean;
    rating: boolean;
    reviewsCount: boolean;
    price: boolean;
    oldPrice: boolean;
    promoDiscount: boolean;
    addToCart: boolean;
    buyNow: boolean;
    wishlist: boolean;
    quickView: boolean;
    stockStatus: boolean;
    variants: boolean;
  };
  
  // 31, 32. Sortowanie & Filtrowanie
  sortingFiltering: {
    sortOrder: 'system_default' | 'newest' | 'popularity' | 'price_asc' | 'price_desc' | 'rating_desc' | 'promotions';
    showSortDropdown: boolean;
    showFilterBar: boolean;
    filterCategories: boolean;
    filterPriceRange: boolean;
    filterBrands: boolean;
    filterInStockOnly: boolean;
    filterOnSaleOnly: boolean;
    activeCategoryFilter?: string;
  };
  
  // 33, 34. Paginacja & Załaduj więcej
  pagination: {
    type: 'pagination_classic' | 'load_more' | 'show_more' | 'infinite_scroll' | 'none';
    itemsPerPage: number;
    loadMoreButton: {
      text: string;
      icon: string;
      bgColor: string;
      textColor: string;
      borderColor: string;
      borderRadius: number;
      hoverBgColor: string;
      hoverTextColor: string;
      shadow: 'none' | 'sm' | 'md' | 'lg';
      width: 'auto' | 'full' | 'fixed';
      heightPx?: number;
    };
  };
  
  // 36, 37. Responsywność & Mobile
  responsive: {
    tablet?: {
      columns?: number;
      fontSizePx?: number;
      gapX?: number;
      gapY?: number;
      cardPadding?: number;
      showDescription?: boolean;
    };
    mobile?: {
      columns?: number | 'auto';
      layoutMode?: 'grid' | 'compact' | 'horizontal_carousel';
      fontSizePx?: number;
      gapX?: number;
      gapY?: number;
      cardPadding?: number;
      iconOnlyButtons?: boolean;
      hideSecondaryInfo?: boolean;
    };
  };
  
  // 38, 39. Animacje & Micro-interactions
  animation: {
    type: 'none' | 'fade' | 'slide_up' | 'scale' | 'zoom' | 'bounce' | 'float' | 'glow' | 'reveal';
    durationMs: number;
    staggerDelayMs: number;
    easing: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';
  };
  
  // 41. Globalne style
  useGlobalStyles: boolean;
  activePreset?: ProductGridPresetStyleName;
  isDemoData?: boolean;
}

export interface StoreAppearanceState {
  topBar: TopBarConfig;
  logo: LogoConfig;
  mainMenu: MainMenuConfig;
  searchBar: SearchBarConfig;
  buttons: InteractiveButtonsConfig;
  categories: CategoriesWidgetConfig;
  productsGrid: ProductsGridWidgetConfig;
  widgets: WidgetsManagerConfig;
  banners: BannersManagerConfig;
  footer: FooterConfig;
}


