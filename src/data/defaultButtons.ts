import { InteractiveButtonItem, InteractiveButtonsConfig, ButtonPresetStyleName } from '../types/storeAppearance';

export const createDefaultButton = (
  id: string,
  name: string,
  systemType: InteractiveButtonItem['systemType'],
  iconName: string,
  text: string,
  badgeCount?: number,
  isSystem = true
): InteractiveButtonItem => ({
  id,
  name,
  systemType,
  isSystem,
  enabled: true,
  visible: true,
  order: 0,
  content: {
    text,
    textDesktop: text,
    textTablet: text,
    textMobile: '',
    tooltip: name,
    tooltipPosition: 'bottom',
    ariaLabel: name,
    customId: `btn_${id}`,
    elementType: badgeCount !== undefined ? 'badge_counter' : 'icon_text'
  },
  icon: {
    name: iconName,
    show: true,
    position: 'left',
    sizePx: 18,
    color: '',
    opacity: 1,
    gapPx: 8,
    animation: 'none'
  },
  layout: {
    displayMode: 'icon_text',
    align: 'center',
    verticalAlign: 'center',
    widthType: 'auto',
    width: 'auto',
    height: '42px',
    minWidth: '42px',
    overflow: 'visible',
    positioning: 'relative',
    cursor: 'pointer'
  },
  spacing: {
    padding: { top: 8, right: 14, bottom: 8, left: 14, linked: false },
    margin: { top: 0, right: 4, bottom: 0, left: 4, linked: false }
  },
  typography: {
    fontFamily: 'sans',
    fontSizePx: 13,
    fontWeight: '600',
    lineHeight: '1.2',
    letterSpacing: 'normal',
    textTransform: 'none',
    textDecoration: 'none',
    color: '#0f172a'
  },
  background: {
    type: 'solid',
    color: '#f8fafc',
    gradientColors: ['#3b82f6', '#1d4ed8'],
    gradientAngle: 135,
    opacity: 1,
    backdropBlur: 0,
    glassmorphism: {
      enabled: false,
      blur: 12,
      borderOpacity: 0.2,
      highlight: true
    }
  },
  border: {
    style: 'solid',
    color: '#e2e8f0',
    width: { top: 1, right: 1, bottom: 1, left: 1, linked: true },
    radius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, linked: true },
    shapePreset: 'rounded'
  },
  shadow: {
    enabled: true,
    type: 'outer',
    x: 0,
    y: 1,
    blur: 2,
    spread: 0,
    color: 'rgba(0,0,0,0.05)',
    opacity: 1,
    glow: {
      enabled: false,
      type: 'outer',
      color: '#3b82f6',
      intensity: 0.5,
      radius: 8,
      opacity: 0.5
    }
  },
  transform: {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
    enable3d: false,
    rotateX: 0,
    rotateY: 0,
    perspective: 1000
  },
  states: {
    hover: {
      bgColor: '#f1f5f9',
      borderColor: '#cbd5e1',
      textColor: '#0284c7',
      translateY: -1,
      scale: 1.02
    },
    active: {
      bgColor: '#e2e8f0',
      scale: 0.98,
      translateY: 0
    },
    focus: {
      borderColor: '#3b82f6',
      glowColor: '#3b82f6',
      glowIntensity: 0.4
    },
    disabled: {
      opacity: 0.5,
      bgColor: '#f1f5f9',
      textColor: '#94a3b8'
    },
    loading: {
      opacity: 0.7
    }
  },
  effects: {
    hoverEffect: 'lift',
    animation: {
      type: 'none',
      durationMs: 300,
      delayMs: 0,
      easing: 'ease',
      loop: false
    },
    ripple: {
      enabled: true,
      color: 'rgba(255,255,255,0.4)',
      speedMs: 400
    },
    shine: {
      enabled: false,
      color: 'rgba(255,255,255,0.6)',
      speedMs: 1500,
      direction: 'left-right'
    }
  },
  badge: {
    enabled: badgeCount !== undefined,
    dataSource: id === 'cart' ? 'cart_count' : id === 'wishlist' ? 'wishlist_count' : id === 'notifications' ? 'notifications_count' : id === 'messages' ? 'messages_count' : 'custom',
    customValue: badgeCount || 0,
    position: 'top-right',
    offsetX: 6,
    offsetY: -6,
    sizePx: 18,
    bgColor: '#ef4444',
    textColor: '#ffffff',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#ffffff',
    pulseAnimation: id === 'cart' || id === 'notifications'
  },
  dropdown: {
    enabled: id === 'user_account' || id === 'cart' || id === 'notifications' || id === 'messages',
    trigger: 'click',
    widthPx: 280,
    maxHeightPx: 380,
    position: 'bottom-right',
    bgColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderRadius: 14,
    shadow: 'lg',
    items: id === 'user_account' ? [
      { id: '1', label: 'Mój Profil & Ustawienia', icon: 'User', action: 'profile' },
      { id: '2', label: 'Moje Zamówienia', icon: 'Package', action: 'orders', badge: '3' },
      { id: '3', label: 'Adresy dostawy', icon: 'MapPin', action: 'addresses' },
      { id: '4', label: 'Płatności i Karty', icon: 'CreditCard', action: 'payments' },
      { id: 'div', label: '', isDivider: true },
      { id: '5', label: 'Wyloguj się', icon: 'LogOut', action: 'logout' }
    ] : id === 'cart' ? [
      { id: 'c1', label: 'Smartfon Pro Max (x1)', icon: 'Smartphone', badge: '3 499 zł' },
      { id: 'c2', label: 'Słuchawki Bezprzewodowe (x2)', icon: 'Headphones', badge: '598 zł' },
      { id: 'div', label: '', isDivider: true },
      { id: 'c_checkout', label: 'Przejdź do kasy (4 097 zł)', icon: 'ArrowRight', action: 'checkout' }
    ] : id === 'notifications' ? [
      { id: 'n1', label: 'Twoje zamówienie #1042 zostało wysłane!', icon: 'Truck', badge: 'Teraz' },
      { id: 'n2', label: 'Rabat -20% na elektronikę kończy się dziś', icon: 'Percent', badge: '2h temu' },
      { id: 'n3', label: 'Nowa odpowiedź w dyskusji o produkcie', icon: 'MessageCircle', badge: 'Wczoraj' }
    ] : [
      { id: 'm1', label: 'Sprzedawca TechZone: Witamy w kontakcie', icon: 'MessageSquare', badge: 'Nowa' },
      { id: 'm2', label: 'Obsługa Klienta: Sprawa #8821 rozwiązana', icon: 'CheckCircle' }
    ]
  },
  action: {
    type: 'system_action',
    systemActionName: id,
    url: id === 'login' ? '/login' : id === 'register' ? '/register' : id === 'admin_panel' ? '/admin' : undefined,
    target: '_self'
  },
  visibility: {
    desktop: true,
    tablet: true,
    mobile: true,
    requiresAuth: id === 'admin_panel' || id === 'user_account' ? 'logged_in' : id === 'login' || id === 'register' ? 'logged_out' : 'all',
    role: id === 'admin_panel' ? 'admin' : 'all'
  },
  responsive: {
    tablet: {
      enabled: true,
      displayMode: id === 'login' || id === 'register' ? 'text_only' : 'icon_only',
      padding: { top: 8, right: 10, bottom: 8, left: 10, linked: false }
    },
    mobile: {
      enabled: true,
      displayMode: 'icon_only',
      padding: { top: 8, right: 8, bottom: 8, left: 8, linked: true }
    }
  },
  useGlobalStyles: false,
  isGlobalComponent: true
});

export const defaultButtonsList: InteractiveButtonItem[] = [
  {
    ...createDefaultButton('login', 'Logowanie', 'login', 'LogIn', 'Zaloguj się'),
    order: 1,
    typography: {
      fontFamily: 'sans',
      fontSizePx: 13,
      fontWeight: '600',
      lineHeight: '1.2',
      letterSpacing: 'normal',
      textTransform: 'none',
      textDecoration: 'none',
      color: '#0f172a'
    },
    background: {
      type: 'solid',
      color: '#f8fafc',
      gradientColors: ['#3b82f6', '#1d4ed8'],
      gradientAngle: 135,
      opacity: 1,
      backdropBlur: 0,
      glassmorphism: { enabled: false, blur: 12, borderOpacity: 0.2, highlight: true }
    },
    border: {
      style: 'solid',
      color: '#cbd5e1',
      width: { top: 1, right: 1, bottom: 1, left: 1, linked: true },
      radius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, linked: true },
      shapePreset: 'rounded'
    }
  },
  {
    ...createDefaultButton('register', 'Rejestracja', 'register', 'UserPlus', 'Dołącz / Rejestracja'),
    order: 2,
    typography: {
      fontFamily: 'sans',
      fontSizePx: 13,
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: 'normal',
      textTransform: 'none',
      textDecoration: 'none',
      color: '#ffffff'
    },
    background: {
      type: 'linear_gradient',
      color: '#2563eb',
      gradientColors: ['#3b82f6', '#1d4ed8'],
      gradientAngle: 135,
      opacity: 1,
      backdropBlur: 0,
      glassmorphism: { enabled: false, blur: 12, borderOpacity: 0.2, highlight: true }
    },
    border: {
      style: 'none',
      color: '#2563eb',
      width: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
      radius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, linked: true },
      shapePreset: 'rounded'
    },
    shadow: {
      enabled: true,
      type: 'outer',
      x: 0,
      y: 2,
      blur: 6,
      spread: 0,
      color: 'rgba(37,99,235,0.25)',
      opacity: 1,
      glow: { enabled: false, type: 'outer', color: '#3b82f6', intensity: 0.5, radius: 8, opacity: 0.5 }
    },
    states: {
      hover: {
        bgColor: '#1d4ed8',
        textColor: '#ffffff',
        translateY: -2,
        scale: 1.02
      },
      active: { bgColor: '#1e40af', scale: 0.98, translateY: 0 },
      focus: { borderColor: '#60a5fa' },
      disabled: { opacity: 0.5 },
      loading: { opacity: 0.7 }
    }
  },
  {
    ...createDefaultButton('admin_panel', 'Panel sterowania', 'admin_panel', 'ShieldCheck', 'Panel Admina'),
    order: 3,
    layout: {
      displayMode: 'icon_text',
      align: 'center',
      verticalAlign: 'center',
      widthType: 'auto',
      width: 'auto',
      height: '42px',
      minWidth: '42px',
      overflow: 'visible',
      positioning: 'relative',
      cursor: 'pointer'
    },
    background: {
      type: 'solid',
      color: '#fef2f2',
      gradientColors: ['#ef4444', '#b91c1c'],
      gradientAngle: 135,
      opacity: 1,
      backdropBlur: 0,
      glassmorphism: { enabled: false, blur: 12, borderOpacity: 0.2, highlight: true }
    },
    typography: {
      fontFamily: 'sans',
      fontSizePx: 13,
      fontWeight: '600',
      lineHeight: '1.2',
      letterSpacing: 'normal',
      textTransform: 'none',
      textDecoration: 'none',
      color: '#b91c1c'
    },
    border: {
      style: 'solid',
      color: '#fecaca',
      width: { top: 1, right: 1, bottom: 1, left: 1, linked: true },
      radius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, linked: true },
      shapePreset: 'rounded'
    }
  },
  {
    ...createDefaultButton('user_account', 'Panel użytkownika', 'user_account', 'User', 'Moje Konto'),
    order: 4,
    content: {
      text: 'Konto',
      textDesktop: 'Jan Kowalski',
      textTablet: 'Konto',
      textMobile: '',
      tooltip: 'Profil użytkownika i zamówienia',
      tooltipPosition: 'bottom',
      ariaLabel: 'Profil użytkownika',
      customId: 'btn_user_account',
      elementType: 'dropdown'
    }
  },
  {
    ...createDefaultButton('cart', 'Koszyk', 'cart', 'ShoppingCart', 'Koszyk', 3),
    order: 5,
    content: {
      text: 'Koszyk',
      textDesktop: '4 097 zł',
      textTablet: '',
      textMobile: '',
      tooltip: 'Twój koszyk zakupowy (3 produkty)',
      tooltipPosition: 'bottom',
      ariaLabel: 'Koszyk zakupowy',
      customId: 'btn_cart',
      elementType: 'badge_counter'
    },
    layout: {
      displayMode: 'icon_text',
      align: 'center',
      verticalAlign: 'center',
      widthType: 'auto',
      width: 'auto',
      height: '42px',
      minWidth: '42px',
      overflow: 'visible',
      positioning: 'relative',
      cursor: 'pointer'
    },
    background: {
      type: 'solid',
      color: '#0f172a',
      gradientColors: ['#1e293b', '#0f172a'],
      gradientAngle: 135,
      opacity: 1,
      backdropBlur: 0,
      glassmorphism: { enabled: false, blur: 12, borderOpacity: 0.2, highlight: true }
    },
    typography: {
      fontFamily: 'sans',
      fontSizePx: 13,
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: 'normal',
      textTransform: 'none',
      textDecoration: 'none',
      color: '#ffffff'
    },
    border: {
      style: 'none',
      color: '#0f172a',
      width: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
      radius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12, linked: true },
      shapePreset: 'rounded'
    },
    shadow: {
      enabled: true,
      type: 'outer',
      x: 0,
      y: 2,
      blur: 8,
      spread: 0,
      color: 'rgba(15,23,42,0.3)',
      opacity: 1,
      glow: { enabled: false, type: 'outer', color: '#3b82f6', intensity: 0.5, radius: 8, opacity: 0.5 }
    },
    states: {
      hover: {
        bgColor: '#1e293b',
        textColor: '#38bdf8',
        translateY: -2,
        scale: 1.02
      },
      active: { bgColor: '#020617', scale: 0.98, translateY: 0 },
      focus: { borderColor: '#38bdf8' },
      disabled: { opacity: 0.5 },
      loading: { opacity: 0.7 }
    }
  },
  {
    ...createDefaultButton('wishlist', 'Ulubione', 'wishlist', 'Heart', 'Ulubione', 5),
    order: 6,
    layout: {
      displayMode: 'icon_only',
      align: 'center',
      verticalAlign: 'center',
      widthType: 'fixed',
      width: '42px',
      height: '42px',
      overflow: 'visible',
      positioning: 'relative',
      cursor: 'pointer'
    },
    content: {
      text: 'Ulubione',
      textDesktop: '',
      textTablet: '',
      textMobile: '',
      tooltip: 'Lista życzeń (5)',
      tooltipPosition: 'bottom',
      ariaLabel: 'Lista życzeń',
      customId: 'btn_wishlist',
      elementType: 'badge_counter'
    }
  },
  {
    ...createDefaultButton('notifications', 'Powiadomienia', 'notifications', 'Bell', 'Powiadomienia', 2),
    order: 7,
    layout: {
      displayMode: 'icon_only',
      align: 'center',
      verticalAlign: 'center',
      widthType: 'fixed',
      width: '42px',
      height: '42px',
      overflow: 'visible',
      positioning: 'relative',
      cursor: 'pointer'
    },
    content: {
      text: 'Powiadomienia',
      textDesktop: '',
      textTablet: '',
      textMobile: '',
      tooltip: 'Centrum powiadomień (2 nowe)',
      tooltipPosition: 'bottom',
      ariaLabel: 'Centrum powiadomień',
      customId: 'btn_notifications',
      elementType: 'badge_counter'
    }
  },
  {
    ...createDefaultButton('messages', 'Wiadomości', 'messages', 'MessageSquare', 'Wiadomości', 4),
    order: 8,
    layout: {
      displayMode: 'icon_only',
      align: 'center',
      verticalAlign: 'center',
      widthType: 'fixed',
      width: '42px',
      height: '42px',
      overflow: 'visible',
      positioning: 'relative',
      cursor: 'pointer'
    },
    content: {
      text: 'Wiadomości',
      textDesktop: '',
      textTablet: '',
      textMobile: '',
      tooltip: 'Wiadomości ze sprzedawcami (4 nieprzeczytane)',
      tooltipPosition: 'bottom',
      ariaLabel: 'Wiadomości',
      customId: 'btn_messages',
      elementType: 'badge_counter'
    }
  }
];

export const defaultButtonsConfig: InteractiveButtonsConfig = {
  enabled: true,
  name: 'Główny zestaw przycisków i akcji',
  activeElementId: 'cart',
  globalDefaults: {
    fontFamily: 'sans',
    primaryColor: '#2563eb',
    primaryTextColor: '#ffffff',
    accentColor: '#0f172a',
    borderRadius: 10,
    defaultShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transitionDurationMs: 200
  },
  items: defaultButtonsList
};

export const DEFAULT_BUTTONS_CONFIG = defaultButtonsConfig;

export interface ButtonPresetDefinition {
  name: string;
  presetKey: ButtonPresetStyleName;
  description: string;
  apply: (base: InteractiveButtonItem) => Partial<InteractiveButtonItem>;
}

export const BUTTON_PRESETS: ButtonPresetDefinition[] = [
  {
    name: 'Modern Blue',
    presetKey: 'modern',
    description: 'Elegancki, kontrastowy styl z płynnym cieniem i zaokrągleniem 10px',
    apply: () => ({
      background: {
        type: 'linear_gradient',
        color: '#2563eb',
        gradientColors: ['#3b82f6', '#1d4ed8'],
        gradientAngle: 135,
        opacity: 1,
        backdropBlur: 0,
        glassmorphism: { enabled: false, blur: 10, borderOpacity: 0.2, highlight: true }
      },
      typography: {
        fontFamily: 'sans',
        fontSizePx: 13,
        fontWeight: '600',
        lineHeight: '1.2',
        letterSpacing: 'normal',
        textTransform: 'none',
        textDecoration: 'none',
        color: '#ffffff'
      },
      border: {
        style: 'none',
        color: 'transparent',
        width: { top: 0, right: 0, bottom: 0, left: 0, linked: true },
        radius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, linked: true },
        shapePreset: 'rounded'
      },
      shadow: {
        enabled: true,
        type: 'outer',
        x: 0,
        y: 2,
        blur: 6,
        spread: 0,
        color: 'rgba(37,99,235,0.25)',
        opacity: 1,
        glow: { enabled: false, type: 'outer', color: '#3b82f6', intensity: 0.5, radius: 8, opacity: 0.5 }
      }
    })
  },
  {
    name: 'Minimal Outline',
    presetKey: 'outline',
    description: 'Lekki styl obrysowy z delikatnym obramowaniem i subtelnym tłem na hover',
    apply: () => ({
      background: {
        type: 'solid',
        color: 'transparent',
        gradientColors: [],
        gradientAngle: 0,
        opacity: 1,
        backdropBlur: 0,
        glassmorphism: { enabled: false, blur: 0, borderOpacity: 0, highlight: false }
      },
      typography: {
        fontFamily: 'sans',
        fontSizePx: 13,
        fontWeight: '600',
        lineHeight: '1.2',
        letterSpacing: 'normal',
        textTransform: 'none',
        textDecoration: 'none',
        color: '#0f172a'
      },
      border: {
        style: 'solid',
        color: '#cbd5e1',
        width: { top: 1.5, right: 1.5, bottom: 1.5, left: 1.5, linked: true },
        radius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, linked: true },
        shapePreset: 'rounded'
      },
      shadow: {
        enabled: false,
        type: 'outer',
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: 'transparent',
        opacity: 0,
        glow: { enabled: false, type: 'outer', color: '#3b82f6', intensity: 0, radius: 0, opacity: 0 }
      }
    })
  },
  {
    name: 'Glassmorphism Blur',
    presetKey: 'glass',
    description: 'Półprzezroczyste szkło z rozmyciem tła (backdrop blur) i lśniącą ramką',
    apply: () => ({
      background: {
        type: 'glass',
        color: 'rgba(255, 255, 255, 0.45)',
        gradientColors: ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)'],
        gradientAngle: 135,
        opacity: 1,
        backdropBlur: 16,
        glassmorphism: { enabled: true, blur: 16, borderOpacity: 0.35, highlight: true }
      },
      typography: {
        fontFamily: 'sans',
        fontSizePx: 13,
        fontWeight: '600',
        lineHeight: '1.2',
        letterSpacing: 'normal',
        textTransform: 'none',
        textDecoration: 'none',
        color: '#0f172a'
      },
      border: {
        style: 'solid',
        color: 'rgba(255, 255, 255, 0.7)',
        width: { top: 1, right: 1, bottom: 1, left: 1, linked: true },
        radius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12, linked: true },
        shapePreset: 'rounded'
      },
      shadow: {
        enabled: true,
        type: 'outer',
        x: 0,
        y: 4,
        blur: 16,
        spread: 0,
        color: 'rgba(0, 0, 0, 0.08)',
        opacity: 1,
        glow: { enabled: false, type: 'outer', color: '#ffffff', intensity: 0.3, radius: 10, opacity: 0.3 }
      }
    })
  },
  {
    name: 'Cyber Neon Glow',
    presetKey: 'neon',
    description: 'Mroczny styl z intensywną poświatą neonową w kolorze cyjan / błękit',
    apply: () => ({
      background: {
        type: 'solid',
        color: '#090d16',
        gradientColors: ['#0f172a', '#020617'],
        gradientAngle: 180,
        opacity: 1,
        backdropBlur: 0,
        glassmorphism: { enabled: false, blur: 0, borderOpacity: 0, highlight: false }
      },
      typography: {
        fontFamily: 'sans',
        fontSizePx: 13,
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: 'wide',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: '#38bdf8'
      },
      border: {
        style: 'solid',
        color: '#0ea5e9',
        width: { top: 1.5, right: 1.5, bottom: 1.5, left: 1.5, linked: true },
        radius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8, linked: true },
        shapePreset: 'rounded'
      },
      shadow: {
        enabled: true,
        type: 'outer',
        x: 0,
        y: 0,
        blur: 14,
        spread: 1,
        color: 'rgba(14,165,233,0.5)',
        opacity: 1,
        glow: { enabled: true, type: 'neon', color: '#0ea5e9', intensity: 0.85, radius: 14, opacity: 0.8 }
      }
    })
  },
  {
    name: 'Pill Smooth Rounded',
    presetKey: 'pill',
    description: 'Całkowicie owalny kształt pigułki (pill) z miękkim cieniem',
    apply: () => ({
      border: {
        style: 'solid',
        color: '#e2e8f0',
        width: { top: 1, right: 1, bottom: 1, left: 1, linked: true },
        radius: { topLeft: 999, topRight: 999, bottomRight: 999, bottomLeft: 999, linked: true },
        shapePreset: 'pill'
      },
      spacing: {
        padding: { top: 9, right: 20, bottom: 9, left: 20, linked: false },
        margin: { top: 0, right: 4, bottom: 0, left: 4, linked: false }
      }
    })
  },
  {
    name: 'Luxury Dark Obsidian',
    presetKey: 'dark',
    description: 'Głęboka czerń ze złotym lub platynowym akcentem i subtelnym reliefem',
    apply: () => ({
      background: {
        type: 'linear_gradient',
        color: '#0f172a',
        gradientColors: ['#1e293b', '#0f172a'],
        gradientAngle: 180,
        opacity: 1,
        backdropBlur: 0,
        glassmorphism: { enabled: false, blur: 0, borderOpacity: 0, highlight: false }
      },
      typography: {
        fontFamily: 'sans',
        fontSizePx: 13,
        fontWeight: '600',
        lineHeight: '1.2',
        letterSpacing: 'normal',
        textTransform: 'none',
        textDecoration: 'none',
        color: '#f8fafc'
      },
      border: {
        style: 'solid',
        color: '#334155',
        width: { top: 1, right: 1, bottom: 1, left: 1, linked: true },
        radius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, linked: true },
        shapePreset: 'rounded'
      },
      shadow: {
        enabled: true,
        type: 'outer',
        x: 0,
        y: 3,
        blur: 8,
        spread: 0,
        color: 'rgba(0,0,0,0.3)',
        opacity: 1,
        glow: { enabled: false, type: 'outer', color: '#ffffff', intensity: 0, radius: 0, opacity: 0 }
      }
    })
  }
];
