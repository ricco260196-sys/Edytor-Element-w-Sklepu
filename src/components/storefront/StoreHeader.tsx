import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { IconRenderer } from '../common/IconRenderer';
import { StoreSearchBar } from '../common/StoreSearchBar';
import { InteractiveButtonRenderer } from '../editors/buttons/InteractiveButtonRenderer';
import {
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  LogIn,
  UserPlus,
  Grid,
  Tag,
  ArrowRight
} from 'lucide-react';

export const StoreHeader: React.FC = () => {
  const { state } = useStoreAppearance();
  const { topBar, logo, mainMenu } = state;

  const [cartCount] = useState(3);
  const [favoritesCount] = useState(5);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Logo Typography & Container Styles
  const computedFontSize = logo.customFontSize || Math.round(logo.desktopHeight * 0.65);
  const fontWeightVal =
    logo.textWeight === 'extrabold'
      ? 800
      : logo.textWeight === 'bold'
      ? 700
      : logo.textWeight === 'semibold'
      ? 600
      : logo.textWeight === 'medium'
      ? 500
      : 400;

  const fontClass =
    logo.textFont === 'serif'
      ? 'font-serif'
      : logo.textFont === 'mono'
      ? 'font-mono'
      : logo.textFont === 'display'
      ? 'font-black'
      : 'font-sans';

  const letterSpacingStyle =
    logo.textLetterSpacing === 'widest'
      ? '0.15em'
      : logo.textLetterSpacing === 'wide'
      ? '0.05em'
      : logo.textLetterSpacing === 'tighter'
      ? '-0.05em'
      : 'normal';

  const logoTextStyle: React.CSSProperties = {
    fontSize: `${computedFontSize}px`,
    fontWeight: fontWeightVal,
    letterSpacing: letterSpacingStyle,
    textTransform: logo.textTransform || 'none',
    ...(logo.gradientText
      ? {
          backgroundImage: `linear-gradient(135deg, ${logo.gradientFrom || '#3b82f6'}, ${logo.gradientTo || '#8b5cf6'})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent'
        }
      : {
          color: logo.textColor || '#0f172a'
        })
  };

  const containerStyle = logo.containerStyle || {};
  const logoFilters = logo.filters || {};
  const logoTransform = logo.transform || {};

  const logoContainerBoxStyle: React.CSSProperties = {
    backgroundColor:
      logo.showContainerBox || containerStyle.enabled
        ? containerStyle.backgroundType === 'glass'
          ? 'rgba(255, 255, 255, 0.75)'
          : containerStyle.backgroundColor || '#ffffff'
        : 'transparent',
    backdropFilter: containerStyle.backgroundType === 'glass' ? 'blur(12px)' : undefined,
    border:
      (logo.showContainerBox || containerStyle.enabled) && containerStyle.borderType !== 'none'
        ? `${containerStyle.borderWidth || 1}px solid ${containerStyle.borderColor || 'rgba(226, 232, 240, 0.8)'}`
        : 'none',
    borderRadius: `${containerStyle.borderRadius ?? 8}px`,
    boxShadow:
      containerStyle.shadowType === 'glow'
        ? `0 0 20px ${logo.accentColor || '#3b82f6'}40`
        : containerStyle.shadowType === 'md'
        ? '0 4px 14px rgba(0, 0, 0, 0.1)'
        : containerStyle.shadowType === 'sm'
        ? '0 2px 6px rgba(0, 0, 0, 0.05)'
        : 'none',
    maxWidth: `${logo.maxWidth}px`,
    paddingTop: `${logo.paddingY ?? 4}px`,
    paddingBottom: `${logo.paddingY ?? 4}px`,
    paddingLeft: `${logo.paddingX ?? 8}px`,
    paddingRight: `${logo.paddingX ?? 8}px`,
    transform: `translate(${logo.offsetX || 0}px, ${logo.offsetY || 0}px) rotate(${logoTransform.rotate || 0}deg) scale(${logoTransform.scale || 1})`,
    filter: `brightness(${logoFilters.brightness ?? 100}%) contrast(${logoFilters.contrast ?? 100}%) saturate(${logoFilters.saturate ?? 100}%) grayscale(${logoFilters.grayscale ?? 0}%)`
  };

  const logoHoverEffectClass =
    logo.hoverEffect === 'scale'
      ? 'hover:scale-105 transition-transform duration-200'
      : logo.hoverEffect === 'opacity'
      ? 'hover:opacity-80 transition-opacity duration-200'
      : logo.hoverEffect === 'glow'
      ? 'hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-200'
      : logo.hoverEffect === 'rotate'
      ? 'hover:rotate-1 transition-transform duration-200'
      : '';

  const sygnetDimension = logo.sygnetSize || Math.max(24, Math.round(logo.desktopHeight * 0.65));

  // Helper to render TopBar elements dynamically
  const renderTopBarElement = (elemId: string) => {
    const custom = topBar.elementSettings[elemId] || {};
    const elemStyle: React.CSSProperties = {
      backgroundColor: custom.customBgColor || 'transparent',
      color: custom.customColor || topBar.textColor || '#ffffff',
      borderRadius: custom.customBorderRadius ? `${custom.customBorderRadius}px` : '4px',
      padding: custom.customPadding ? `${parseInt(custom.customPadding) * 2}px ${parseInt(custom.customPadding) * 4}px` : '2px 6px',
      width: custom.customWidthType === 'fixed' && custom.customWidthValue ? `${custom.customWidthValue}px` : undefined,
      maxWidth: '100%',
      fontWeight: custom.customFontWeight === 'bold' ? 700 : custom.customFontWeight === 'semibold' ? 600 : custom.customFontWeight === 'medium' ? 500 : 400,
      fontSize: custom.customFontSize === 'text-xs' ? '11px' : custom.customFontSize === 'text-base' ? '14px' : custom.customFontSize === 'text-sm' ? '13px' : '12px',
      letterSpacing: custom.letterSpacing === 'widest' ? '0.1em' : custom.letterSpacing === 'wide' ? '0.05em' : 'normal',
      textTransform: custom.textTransform || 'none'
    };

    const baseType = elemId.split('-')[0];
    switch (baseType) {
      case 'promo':
        return (
          <a
            key={elemId}
            href={custom.customLink || '/promocje'}
            target={custom.target || '_self'}
            style={elemStyle}
            className="inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{custom.customText || topBar.announcementText || 'Darmowa dostawa od 200 zł!'}</span>
            {custom.customBadge && (
              <span
                className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ml-1 shrink-0"
                style={{
                  backgroundColor: custom.customBadgeColor || '#ef4444',
                  color: custom.customBadgeTextColor || '#ffffff'
                }}
              >
                {custom.customBadge}
              </span>
            )}
          </a>
        );
      case 'text':
        return (
          <div key={elemId} style={elemStyle} className="truncate">
            {custom.customText || 'Witaj w naszym sklepie!'}
          </div>
        );
      case 'phone':
        return (
          <a
            key={elemId}
            href={custom.customLink || `tel:${custom.customText || topBar.phone || '515444577'}`}
            target={custom.target || '_self'}
            style={elemStyle}
            className="inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity shrink-0"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#34d399' }} />
            <span>{custom.customText || topBar.phone || '+48 515 444 577'}</span>
          </a>
        );
      case 'email':
        return (
          <a
            key={elemId}
            href={custom.customLink || `mailto:${custom.customText || topBar.email || 'kontakt@openmarket.pl'}`}
            target={custom.target || '_self'}
            style={elemStyle}
            className="hidden sm:inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity shrink-0"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#38bdf8' }} />
            <span>{custom.customText || topBar.email || 'kontakt@openmarket.pl'}</span>
          </a>
        );
      case 'location':
        return (
          <div key={elemId} style={elemStyle} className="hidden md:inline-flex items-center gap-1.5 shrink-0">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#f43f5e' }} />
            <span>{custom.customText || topBar.location || 'Warszawa, Polska'}</span>
          </div>
        );
      case 'hours':
        return (
          <div key={elemId} style={elemStyle} className="hidden lg:inline-flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#c084fc' }} />
            <span>{custom.customText || topBar.workingHours || 'Pn-Pt: 8:00 - 18:00'}</span>
          </div>
        );
      case 'social':
        return (
          <div key={elemId} style={elemStyle} className="flex items-center gap-1.5 shrink-0">
            {topBar.socialItems.map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[10px] font-bold uppercase transition-all"
                title={soc.label || soc.platform}
              >
                {soc.platform.slice(0, 1)}
              </a>
            ))}
          </div>
        );
      case 'login':
        return (
          <a
            key={elemId}
            href={custom.customLink || '/login'}
            style={elemStyle}
            className="inline-flex items-center gap-1 hover:opacity-90 transition-opacity shrink-0"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{custom.customText || 'Zaloguj się'}</span>
          </a>
        );
      case 'register':
        return (
          <a
            key={elemId}
            href={custom.customLink || '/register'}
            style={elemStyle}
            className="inline-flex items-center gap-1 hover:opacity-90 transition-opacity shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{custom.customText || 'Rejestracja'}</span>
          </a>
        );
      case 'account':
        return (
          <a
            key={elemId}
            href={custom.customLink || '/konto'}
            style={elemStyle}
            className="inline-flex items-center gap-1 hover:opacity-90 transition-opacity shrink-0"
          >
            <User className="w-3.5 h-3.5" />
            <span>{custom.customText || 'Moje Konto'}</span>
          </a>
        );
      case 'separator':
        return (
          <span key={elemId} className="opacity-30 mx-1 select-none">
            |
          </span>
        );
      default:
        return (
          <div key={elemId} style={elemStyle}>
            {custom.customText || elemId}
          </div>
        );
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 select-none shadow-xs">
      {/* 1. TOP BAR COMPONENT */}
      {topBar.enabled && (
        <div
          id="storefront-topbar"
          className={`w-full transition-all ${topBar.glassmorphism ? 'backdrop-blur-md' : ''}`}
          style={{
            backgroundColor: topBar.backgroundColor || '#0f172a',
            color: topBar.textColor || '#ffffff',
            borderBottom: topBar.borderBottom
              ? `${topBar.borderBottomWidth || 1}px ${topBar.borderStyle || 'solid'} ${topBar.borderBottomColor || '#1e293b'}`
              : 'none',
            borderTop: topBar.borderTop
              ? `${topBar.borderTopWidth || 1}px ${topBar.borderStyle || 'solid'} ${topBar.borderTopColor || '#1e293b'}`
              : 'none',
            minHeight:
              topBar.height === 'compact'
                ? '32px'
                : topBar.height === 'relaxed'
                ? '46px'
                : topBar.height === 'custom'
                ? `${topBar.customHeight || 40}px`
                : '38px',
            paddingTop: `${topBar.paddingY ?? 4}px`,
            paddingBottom: `${topBar.paddingY ?? 4}px`,
            paddingLeft: `${topBar.paddingX ?? 16}px`,
            paddingRight: `${topBar.paddingX ?? 16}px`,
            backgroundImage: topBar.gradientBackground
              ? `linear-gradient(${topBar.gradientDegree || 90}deg, ${topBar.gradientFrom || '#0f172a'}, ${topBar.gradientTo || '#1e293b'})`
              : undefined,
            borderRadius: topBar.borderRadius ? `${topBar.borderRadius}px` : undefined,
            zIndex: topBar.zIndex || 40
          }}
        >
          <div
            className="mx-auto flex flex-row items-center justify-between flex-nowrap overflow-hidden transition-all"
            style={{
              width: `${topBar.containerWidth || 100}%`,
              maxWidth: topBar.containerMaxWidth ? `${topBar.containerMaxWidth}px` : '100%'
            }}
          >
            {topBar.zones
              .filter((z) => !z.isHidden)
              .map((zone) => {
                const alignClass =
                  zone.align === 'left'
                    ? 'justify-start'
                    : zone.align === 'right'
                    ? 'justify-end'
                    : zone.align === 'between'
                    ? 'justify-between'
                    : 'justify-center';

                return (
                  <div
                    key={zone.id}
                    className={`flex flex-row items-center gap-2 flex-nowrap whitespace-nowrap overflow-hidden shrink-0 ${alignClass}`}
                    style={{
                      width: `${zone.width}%`,
                      paddingLeft: `${zone.paddingX || 6}px`,
                      paddingRight: `${zone.paddingX || 6}px`
                    }}
                  >
                    {zone.elements
                      .filter((e) => e.enabled !== false)
                      .map((e) => renderTopBarElement(e.id))}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* 2. MAIN HEADER BAR (LOGO + SEARCH + ACTIONS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* STORE LOGO */}
          {logo.enabled !== false && (
            <div
              id={logo.elementId || 'storefront-main-logo'}
              className={`shrink-0 cursor-pointer ${logo.cssClass || ''} ${logoHoverEffectClass}`}
              style={logoContainerBoxStyle}
              title={logo.seoTitle || logo.altText || 'Logo Sklepu'}
              aria-label={logo.ariaLabel || 'Logo Sklepu'}
            >
              {logo.logoType === 'image' ? (
                <img
                  src={logo.imageUrl || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=60'}
                  alt={logo.altText || 'Logo sklepu'}
                  className="object-contain"
                  style={{
                    height: `${logo.desktopHeight}px`,
                    maxWidth: `${logo.maxWidth}px`
                  }}
                />
              ) : logo.logoType === 'text' ? (
                <div className="flex flex-col">
                  <span className={`leading-none ${fontClass}`} style={logoTextStyle}>
                    {logo.textName || 'MarketPlace PRO'}
                  </span>
                  {logo.showTagline && logo.tagline && (
                    <span
                      className="mt-1 text-[11px] leading-none"
                      style={{ color: logo.taglineColor || '#64748b', fontSize: `${logo.taglineFontSize || 11}px` }}
                    >
                      {logo.tagline}
                    </span>
                  )}
                </div>
              ) : (
                /* Combined Logo */
                <div
                  className={`flex items-center ${
                    logo.sygnetPosition === 'right' ? 'flex-row-reverse gap-3' : 'flex-row gap-3'
                  }`}
                >
                  <div
                    className="rounded-xl text-white shadow-sm flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: logo.accentColor || '#2563eb',
                      width: `${sygnetDimension}px`,
                      height: `${sygnetDimension}px`
                    }}
                  >
                    <IconRenderer name={logo.iconName || 'ShoppingBag'} size={sygnetDimension * 0.55} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`leading-none ${fontClass}`} style={logoTextStyle}>
                      {logo.textName || 'MarketPlace PRO'}
                    </span>
                    {logo.showTagline && logo.tagline && (
                      <span
                        className="mt-1 text-[11px] leading-none"
                        style={{ color: logo.taglineColor || '#64748b', fontSize: `${logo.taglineFontSize || 11}px` }}
                      >
                        {logo.tagline}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEARCH BAR (Center) */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center justify-center px-4 relative">
            <StoreSearchBar />
          </div>

          {/* USER ACTIONS (Interactive Buttons Engine) */}
          <div className="flex items-center gap-2 shrink-0">
            {state.buttons?.items && state.buttons.items.length > 0 ? (
              state.buttons.items
                .filter(b => b.visibility.desktop)
                .sort((a, b) => a.order - b.order)
                .map(btn => (
                  <InteractiveButtonRenderer
                    key={btn.id}
                    item={btn}
                    device="desktop"
                    cartCount={cartCount}
                    wishlistCount={favoritesCount}
                  />
                ))
            ) : (
              <>
                <button className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                </button>

                <button className="flex items-center gap-2 p-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors font-semibold text-xs border border-blue-200">
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  </div>
                  <span className="hidden sm:inline">249,00 zł</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION MENU BAR */}
      <nav
        id="storefront-mainmenu"
        className="w-full transition-all border-t border-slate-100 relative z-30"
        style={{
          backgroundColor: mainMenu.backgroundColor || '#ffffff',
          color: mainMenu.textColor || '#1e293b'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[46px] py-1">
            <div className="flex items-center gap-3 overflow-visible flex-wrap">
              {mainMenu.showCategoryDrawerButton !== false && (
                <div
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer shrink-0 transition-colors"
                  style={{
                    backgroundColor: mainMenu.categoryButtonBg || '#2563eb',
                    color: mainMenu.categoryButtonTextCol || '#ffffff'
                  }}
                >
                  <Grid className="w-4 h-4" />
                  <span>{mainMenu.categoryButtonText || 'Wszystkie Kategorie'}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </div>
              )}

              {/* Menu Items */}
              <div className="flex items-center gap-1 overflow-visible flex-wrap">
                {mainMenu.items.filter(i => !i.isHidden).map((item) => {
                  const isHovered = activeDropdownId === item.id;
                  const hasSub = item.type === 'dropdown' || item.type === 'megamenu' || (item.children && item.children.length > 0);

                  return (
                    <div
                      key={item.id}
                      className="relative py-1 group"
                      onMouseEnter={() => setActiveDropdownId(item.id)}
                      onMouseLeave={() => setActiveDropdownId(null)}
                    >
                      <a
                        href={item.url || '#'}
                        className={`flex items-center gap-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer select-none ${
                          mainMenu.spacing === 'compact'
                            ? 'px-2.5 py-1.5'
                            : mainMenu.spacing === 'relaxed'
                            ? 'px-4 py-2'
                            : 'px-3 py-2'
                        } ${
                          mainMenu.linkStyle === 'pill'
                            ? 'hover:bg-slate-100 rounded-full'
                            : mainMenu.linkStyle === 'underline'
                            ? 'hover:underline underline-offset-4'
                            : 'hover:bg-slate-100'
                        }`}
                        style={{
                          width: item.customWidth ? `${item.customWidth}px` : undefined,
                          color: isHovered ? mainMenu.hoverColor || '#2563eb' : mainMenu.textColor || '#1e293b',
                          textTransform: mainMenu.uppercase ? 'uppercase' : 'none',
                          fontSize: `${mainMenu.typography?.fontSize || 14}px`
                        }}
                      >
                        {item.icon && <IconRenderer name={item.icon} className="w-3.5 h-3.5 opacity-80" />}
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className="px-1.5 py-0.2 rounded-full text-[9px] font-bold text-white leading-none shadow-xs"
                            style={{ backgroundColor: item.badgeColor || '#2563eb' }}
                          >
                            {item.badge}
                          </span>
                        )}
                        {hasSub && <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />}
                      </a>

                      {/* Dropdown Menu */}
                      {item.type === 'dropdown' && isHovered && item.children && (
                        <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-in fade-in duration-150">
                          <div className="space-y-1">
                            {item.children.map((sub) => (
                              <a
                                key={sub.id}
                                href={sub.url}
                                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  {sub.icon ? (
                                    <IconRenderer name={sub.icon} className="w-3.5 h-3.5 text-blue-500" />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                  )}
                                  <span>{sub.label}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mega Menu Dropdown */}
                      {item.type === 'megamenu' && isHovered && item.megaMenu?.enabled && (
                        <div className="absolute left-0 top-full mt-1 w-[800px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50 animate-in fade-in duration-200">
                          <div className="grid grid-cols-4 gap-6">
                            <div className="col-span-3 grid grid-cols-3 gap-4">
                              {(item.megaMenu.sections || []).map((sec) => (
                                <div key={sec.id} className="space-y-2.5">
                                  <div className="font-bold text-xs text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                                    {sec.icon && <IconRenderer name={sec.icon} className="w-3.5 h-3.5 text-blue-600" />}
                                    <span>{sec.title}</span>
                                  </div>
                                  <div className="space-y-1">
                                    {sec.items.map((sub) => (
                                      <a
                                        key={sub.id}
                                        href={sub.url}
                                        className="flex items-center justify-between text-xs text-slate-600 hover:text-blue-600 transition-colors py-0.5"
                                      >
                                        <span>{sub.label}</span>
                                        {sub.count !== undefined && (
                                          <span className="text-[10px] text-slate-400 font-mono">({sub.count})</span>
                                        )}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {item.megaMenu.promoBanner?.enabled && (
                              <div className="col-span-1 rounded-xl bg-slate-900 text-white p-4 flex flex-col justify-between relative overflow-hidden">
                                {item.megaMenu.promoBanner.imageUrl && (
                                  <img
                                    src={item.megaMenu.promoBanner.imageUrl}
                                    alt="Promo"
                                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                                  />
                                )}
                                <div className="relative z-10 space-y-2">
                                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-600 text-white inline-block">
                                    {item.megaMenu.promoBanner.badge || 'PROMO'}
                                  </span>
                                  <div className="font-bold text-xs">{item.megaMenu.promoBanner.title}</div>
                                  <div className="text-[10px] text-slate-300">{item.megaMenu.promoBanner.subtitle}</div>
                                </div>
                                {item.megaMenu.promoBanner.ctaText && (
                                  <a
                                    href={item.megaMenu.promoBanner.targetUrl || '#'}
                                    className="relative z-10 mt-3 inline-flex items-center gap-1 px-3 py-1.5 bg-white text-slate-900 text-[10px] font-bold rounded-lg shadow-sm"
                                  >
                                    <span>{item.megaMenu.promoBanner.ctaText}</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right CTA Button */}
            {mainMenu.ctaButton?.enabled && (
              <a
                href={mainMenu.ctaButton.url || '/sprzedawaj'}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-xs shrink-0 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: mainMenu.ctaButton.backgroundColor || '#059669',
                  color: mainMenu.ctaButton.textColor || '#ffffff'
                }}
              >
                {mainMenu.ctaButton.icon && <IconRenderer name={mainMenu.ctaButton.icon} className="w-3.5 h-3.5" />}
                <span>{mainMenu.ctaButton.label || 'Zostań Sprzedawcą'}</span>
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
