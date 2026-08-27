import React, { useState } from 'react';
import {
  FooterConfig,
  FooterSectionItem,
  FooterLinkItem,
  FooterContactItem,
  FooterSocialItem
} from '../../../../types/footerEditor';
import { DevicePreview } from '../../../../types/storeAppearance';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  RotateCcw,
  Truck,
  Headphones,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  Lock,
  Globe,
  CreditCard
} from 'lucide-react';

interface FooterDynamicRendererProps {
  config: FooterConfig;
  device?: DevicePreview;
  isInteractive?: boolean;
  selectedSectionId?: string | null;
  onSelectSection?: (sectionId: string) => void;
  onSelectSubElement?: (elementKey: string) => void;
}

export const FooterDynamicRenderer: React.FC<FooterDynamicRendererProps> = ({
  config,
  device = 'desktop',
  isInteractive = true,
  selectedSectionId = null,
  onSelectSection,
  onSelectSubElement
}) => {
  const [mobileExpandedSections, setMobileExpandedSections] = useState<Record<string, boolean>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(true);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  if (!config || !config.enabled) {
    return (
      <div id="footer-disabled-placeholder" className="w-full py-8 text-center text-xs text-slate-500 bg-slate-900/40 border-t border-slate-800/60">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 rounded-full text-slate-400">
          <Lock className="w-3.5 h-3.5 text-slate-500" /> Stopka sklepu jest wyłączona w ustawieniach
        </span>
      </div>
    );
  }

  const toggleMobileAccordion = (secId: string) => {
    setMobileExpandedSections(prev => ({
      ...prev,
      [secId]: !prev[secId]
    }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 4000);
  };

  // Determine current device-based layout properties
  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';

  const paddingValues = isMobile && config.responsive?.mobile?.padding
    ? config.responsive.mobile.padding
    : isTablet && config.responsive?.tablet?.padding
    ? config.responsive.tablet.padding
    : config.size.padding;

  const currentCols = isMobile
    ? (config.responsive?.mobile?.columnsCount || config.layout.columnsCountMobile || 1)
    : isTablet
    ? (config.responsive?.tablet?.columnsCount || config.layout.columnsCountTablet || 2)
    : (config.layout.columnsCountDesktop || 4);

  const gapX = isMobile ? config.layout.gapMobileX : isTablet ? config.layout.gapTabletX : config.layout.gapDesktopX;
  const gapY = isMobile ? config.layout.gapMobileY : isTablet ? config.layout.gapTabletY : config.layout.gapDesktopY;

  // Background styling
  const getBackgroundStyle = (): React.CSSProperties => {
    const bg = config.background;
    const style: React.CSSProperties = {};

    if (bg.type === 'color') {
      style.backgroundColor = bg.color;
    } else if (bg.type === 'gradient') {
      const colorsStr = bg.gradient.colors.join(', ');
      if (bg.gradient.type === 'radial') {
        style.backgroundImage = `radial-gradient(${bg.gradient.position || 'center'}, ${colorsStr})`;
      } else {
        style.backgroundImage = `linear-gradient(${bg.gradient.angle || 180}deg, ${colorsStr})`;
      }
      style.opacity = (bg.gradient.opacity ?? 100) / 100;
    } else if (bg.type === 'image' && bg.image.url) {
      style.backgroundImage = `url("${bg.image.url}")`;
      style.backgroundSize = bg.image.fit || 'cover';
      style.backgroundPosition = bg.image.position || 'center';
      style.backgroundRepeat = bg.image.repeat || 'no-repeat';
      style.backgroundColor = bg.color || '#090d16';
    } else if (bg.type === 'glassmorphism') {
      style.backgroundColor = bg.color || 'rgba(15, 23, 42, 0.75)';
      style.backdropFilter = `blur(${bg.glassmorphism.blurPx || 16}px)`;
      style.WebkitBackdropFilter = `blur(${bg.glassmorphism.blurPx || 16}px)`;
    } else if (bg.type === 'transparent') {
      style.backgroundColor = 'transparent';
    }

    return style;
  };

  // Border & shape styling
  const getShapeAndBorderStyle = (): React.CSSProperties => {
    const shape = config.shape;
    const border = config.border;
    const shadow = config.shadow;

    const style: React.CSSProperties = {};

    // Border Radius
    if (shape.useIndividualCorners) {
      style.borderTopLeftRadius = `${shape.borderTopLeftRadius}px`;
      style.borderTopRightRadius = `${shape.borderTopRightRadius}px`;
      style.borderBottomRightRadius = `${shape.borderBottomRightRadius}px`;
      style.borderBottomLeftRadius = `${shape.borderBottomLeftRadius}px`;
    } else {
      style.borderRadius = `${shape.borderRadius}px`;
    }

    // Clip paths
    if (shape.clipPath === 'wave') {
      style.clipPath = 'polygon(0% 4%, 15% 1%, 30% 5%, 45% 0%, 60% 4%, 75% 1%, 90% 5%, 100% 1%, 100% 100%, 0% 100%)';
    } else if (shape.clipPath === 'slant') {
      style.clipPath = 'polygon(0% 4%, 100% 0%, 100% 100%, 0% 100%)';
    } else if (shape.clipPath === 'curve') {
      style.clipPath = 'ellipse(100% 100% at 50% 100%)';
    } else if (shape.clipPath === 'trapezoid') {
      style.clipPath = 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)';
    }

    // Borders
    if (border.style !== 'none') {
      style.borderStyle = border.style;
      style.borderColor = border.color;
      style.borderTopWidth = `${border.width.top}px`;
      style.borderRightWidth = `${border.width.right}px`;
      style.borderBottomWidth = `${border.width.bottom}px`;
      style.borderLeftWidth = `${border.width.left}px`;
    }

    // Shadows
    if (shadow.preset !== 'none') {
      if (shadow.preset === 'glow') {
        style.boxShadow = `0 0 35px ${shadow.color || 'rgba(59, 130, 246, 0.4)'}`;
      } else if (shadow.preset === 'custom') {
        style.boxShadow = `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
      } else {
        style.boxShadow = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
      }
    }

    return style;
  };

  const getContentWidthClass = () => {
    switch (config.size.contentWidth) {
      case 'full':
        return 'w-full px-4 sm:px-8';
      case 'wide_1400':
        return 'max-w-[1440px] mx-auto w-full';
      case 'standard_1200':
        return 'max-w-6xl mx-auto w-full';
      case 'compact_1000':
        return 'max-w-4xl mx-auto w-full';
      default:
        return 'max-w-[1400px] mx-auto w-full';
    }
  };

  // Helper for rendering icons
  const renderContactIcon = (type: string, iconName?: string) => {
    const props = {
      size: config.contact.iconSizePx || 18,
      style: { color: config.contact.iconColor || '#38bdf8' }
    };
    switch (type) {
      case 'phone': return <PhoneCall {...props} />;
      case 'email': return <Mail {...props} />;
      case 'address': return <MapPin {...props} />;
      case 'hours': return <Clock {...props} />;
      default: return <Globe {...props} />;
    }
  };

  const renderBadgeIcon = (iconName?: string) => {
    const props = { size: 22, className: "text-blue-400 shrink-0" };
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'RotateCcw': return <RotateCcw {...props} />;
      case 'Truck': return <Truck {...props} />;
      case 'Headphones': return <Headphones {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  // Social platform icon renderer
  const renderSocialIcon = (item: FooterSocialItem) => {
    const size = config.socialMedia.iconSizePx || 18;
    const color = item.iconColor || config.socialMedia.color || '#ffffff';

    const getSocialSvg = () => {
      switch (item.platform) {
        case 'facebook':
          return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          );
        case 'instagram':
          return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          );
        case 'youtube':
          return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          );
        case 'tiktok':
          return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.28c0 2.66-1.12 5.08-3.15 6.64-1.92 1.48-4.49 2.05-6.88 1.49-3.03-.71-5.46-2.98-6.19-5.99-.78-3.21.36-6.66 2.87-8.64 1.83-1.44 4.25-1.97 6.52-1.39v4.13c-1.09-.34-2.31-.22-3.3.36-.97.57-1.57 1.63-1.56 2.76.01 1.43 1.05 2.65 2.47 2.86 1.34.2 2.73-.52 3.27-1.74.19-.44.29-.91.29-1.39V.02z"/>
            </svg>
          );
        case 'twitter_x':
          return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          );
        case 'linkedin':
          return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          );
        default:
          return <Globe size={size} />;
      }
    };

    const getShapeClasses = () => {
      switch (config.socialMedia.style) {
        case 'circle': return 'rounded-full';
        case 'square': return 'rounded-none';
        case 'pill': return 'rounded-full px-3';
        case 'minimal': return 'rounded-lg bg-transparent';
        case 'rounded':
        default:
          return 'rounded-xl';
      }
    };

    return (
      <a
        key={item.id}
        href={item.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label || item.platform}
        className={`inline-flex items-center justify-center transition-all duration-200 ${getShapeClasses()} ${
          config.socialMedia.hoverEffect === 'lift'
            ? 'hover:-translate-y-1 hover:shadow-lg'
            : config.socialMedia.hoverEffect === 'scale'
            ? 'hover:scale-110'
            : config.socialMedia.hoverEffect === 'glow'
            ? 'hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]'
            : ''
        }`}
        style={{
          width: config.socialMedia.style === 'pill' ? 'auto' : `${(config.socialMedia.iconSizePx || 18) + 20}px`,
          height: `${(config.socialMedia.iconSizePx || 18) + 20}px`,
          backgroundColor: item.bgColor || config.socialMedia.bgColor || 'rgba(255, 255, 255, 0.08)',
          color: color
        }}
      >
        {getSocialSvg()}
        {config.socialMedia.style === 'pill' && item.label && (
          <span className="ml-2 text-xs font-medium">{item.label}</span>
        )}
      </a>
    );
  };

  // Payment method badge renderer
  const renderPaymentBadge = (method: { id: string; methodId: string; label: string; enabled: boolean }) => {
    if (!method.enabled) return null;

    return (
      <span
        key={method.id}
        className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold tracking-wider transition-all duration-150 hover:bg-slate-700/80 hover:text-white"
        title={method.label}
      >
        {method.methodId === 'blik' ? (
          <span className="text-rose-400 font-black">BLIK</span>
        ) : method.methodId === 'visa' ? (
          <span className="text-sky-400 font-bold italic tracking-tighter">VISA</span>
        ) : method.methodId === 'mastercard' ? (
          <span className="text-amber-400 font-bold">MC</span>
        ) : method.methodId === 'p24' ? (
          <span className="text-emerald-400 font-bold">P24</span>
        ) : method.methodId === 'payu' ? (
          <span className="text-lime-400 font-bold">PayU</span>
        ) : method.methodId === 'apple_pay' ? (
          <span className="text-white font-medium">ApplePay</span>
        ) : method.methodId === 'google_pay' ? (
          <span className="text-blue-300 font-medium">GPay</span>
        ) : method.methodId === 'paypal' ? (
          <span className="text-indigo-400 font-bold italic">PayPal</span>
        ) : method.methodId === 'klarna' ? (
          <span className="text-pink-400 font-bold">Klarna</span>
        ) : (
          <span>{method.label}</span>
        )}
      </span>
    );
  };

  return (
    <footer
      id={config.elementId || 'store-main-footer'}
      className="relative w-full overflow-hidden transition-all duration-300 select-none"
      style={{
        ...getShapeAndBorderStyle(),
        ...getBackgroundStyle(),
        minHeight: config.size.minHeight || 'auto',
        paddingTop: `${paddingValues.top}px`,
        paddingRight: `${paddingValues.right}px`,
        paddingBottom: `${paddingValues.bottom}px`,
        paddingLeft: `${paddingValues.left}px`,
        marginTop: `${config.size.margin?.top || 0}px`,
        marginBottom: `${config.size.margin?.bottom || 0}px`
      }}
    >
      {/* Background Overlay Layer */}
      {config.overlay?.enabled && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity"
          style={{
            backgroundColor: config.overlay.type === 'color' ? config.overlay.color : undefined,
            backgroundImage: config.overlay.type === 'gradient' ? `linear-gradient(180deg, ${config.overlay.gradient.join(', ')})` : undefined,
            opacity: (config.overlay.opacity ?? 40) / 100,
            mixBlendMode: (config.overlay.blendMode as any) || 'multiply'
          }}
        />
      )}

      {/* Main Container */}
      <div className={`relative z-10 ${getContentWidthClass()}`}>
        {/* TOP SECTION: TRUST BADGES (If enabled and placed at top) */}
        {config.trustBadges?.enabled && (
          <div
            id="footer-trust-badges-bar"
            onClick={() => onSelectSubElement && onSelectSubElement('trustBadges')}
            className={`mb-12 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer transition-all ${
              selectedSectionId === 'trustBadges' ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:border-slate-600'
            }`}
          >
            {config.trustBadges.items.filter(b => b.enabled).map(badge => (
              <div key={badge.id} className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {renderBadgeIcon(badge.iconName)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">{badge.title}</h4>
                  {badge.subtitle && (
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{badge.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MAIN MULTI-COLUMN GRID */}
        <div
          id="footer-main-columns-grid"
          className="grid transition-all duration-300"
          style={{
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, minmax(0, 1fr))' : `repeat(${currentCols}, minmax(0, 1fr))`,
            columnGap: `${gapX}px`,
            rowGap: `${gapY}px`,
            alignItems: config.layout.alignItems || 'start'
          }}
        >
          {/* 1. BRAND & IDENTITY COLUMN */}
          {config.brand?.enabled && (
            <div
              id="footer-brand-column"
              onClick={() => onSelectSubElement && onSelectSubElement('brand')}
              className={`flex flex-col gap-4 cursor-pointer p-4 rounded-xl transition-all ${
                selectedSectionId === 'brand' ? 'ring-2 ring-blue-500 bg-blue-500/5' : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Logo / Brand Name */}
              {config.brand.showLogo && (
                <div className="flex items-center gap-3">
                  {config.brand.logoUrl ? (
                    <img
                      src={config.brand.logoUrl}
                      alt={config.brand.logoText || 'Store Logo'}
                      style={{
                        maxWidth: `${config.brand.logoWidthPx || 180}px`,
                        maxHeight: `${config.brand.logoHeightPx || 42}px`
                      }}
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
                        M
                      </div>
                      <div>
                        <span className="text-xl font-black text-white tracking-tight block">
                          {config.brand.logoText || 'MarketPlace Pro'}
                        </span>
                        {config.brand.tagline && (
                          <span className="text-[11px] font-medium text-blue-400 block tracking-wide uppercase">
                            {config.brand.tagline}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {config.brand.showDescription && config.brand.description && (
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: config.typography.body.color,
                    fontSize: `${config.typography.body.fontSizePx}px`,
                    lineHeight: config.typography.body.lineHeight
                  }}
                >
                  {config.brand.description}
                </p>
              )}

              {/* Social Media (if placed under brand) */}
              {config.socialMedia?.enabled && (
                <div className="mt-2 flex flex-wrap gap-2.5 items-center">
                  {config.socialMedia.items.map(renderSocialIcon)}
                </div>
              )}
            </div>
          )}

          {/* 2. DYNAMIC LINK COLUMNS / SECTIONS */}
          {config.sections.filter(s => s.enabled).map(section => {
            const isAccordionOpen = mobileExpandedSections[section.id] ?? false;

            return (
              <div
                key={section.id}
                id={`footer-sec-${section.id}`}
                onClick={() => onSelectSection && onSelectSection(section.id)}
                className={`flex flex-col gap-3 p-3.5 rounded-xl cursor-pointer transition-all ${
                  selectedSectionId === section.id ? 'ring-2 ring-blue-500 bg-blue-500/5' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Column Header (With Mobile Accordion Trigger if mobile) */}
                {section.showTitle && (
                  <div
                    onClick={(e) => {
                      if (isMobile && config.responsive?.mobile?.layoutMode === 'accordion') {
                        e.stopPropagation();
                        toggleMobileAccordion(section.id);
                      }
                    }}
                    className="flex items-center justify-between group"
                  >
                    <h3
                      className="transition-colors"
                      style={{
                        fontFamily: config.typography.headings.fontFamily,
                        fontSize: `${config.typography.headings.fontSizePx}px`,
                        fontWeight: config.typography.headings.fontWeight as any,
                        color: config.typography.headings.color,
                        letterSpacing: config.typography.headings.letterSpacing,
                        textTransform: config.typography.headings.textTransform,
                        lineHeight: config.typography.headings.lineHeight
                      }}
                    >
                      {section.title}
                    </h3>

                    {/* Accent Underline indicator */}
                    {config.typography.headings.showUnderlineAccent && !isMobile && (
                      <div
                        className="h-0.5 w-6 rounded-full mt-1"
                        style={{ backgroundColor: config.typography.headings.underlineAccentColor || '#3b82f6' }}
                      />
                    )}

                    {/* Mobile Chevron toggle */}
                    {isMobile && config.responsive?.mobile?.layoutMode === 'accordion' && (
                      <button className="p-1 text-slate-400 group-hover:text-white">
                        {isAccordionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    )}
                  </div>
                )}

                {/* Column Links List */}
                {(!isMobile || config.responsive?.mobile?.layoutMode !== 'accordion' || isAccordionOpen) && (
                  <ul className="flex flex-col gap-2.5 mt-1">
                    {section.links?.map(link => (
                      <li key={link.id} className="transition-transform duration-150 group">
                        <a
                          href={link.url || '#'}
                          className="inline-flex items-center gap-2 transition-all duration-150"
                          style={{
                            color: config.typography.links.normal.color,
                            fontSize: `${config.typography.links.normal.fontSizePx}px`,
                            fontWeight: config.typography.links.normal.fontWeight as any,
                            textDecoration: config.typography.links.normal.textDecoration
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = config.typography.links.hover.color;
                            e.currentTarget.style.textDecoration = config.typography.links.hover.textDecoration;
                            e.currentTarget.style.transform = `translateX(${config.typography.links.hover.translateX}px)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = config.typography.links.normal.color;
                            e.currentTarget.style.textDecoration = config.typography.links.normal.textDecoration;
                            e.currentTarget.style.transform = 'translateX(0px)';
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{link.text}</span>

                          {/* Link Badge (e.g., HIT, -40%) */}
                          {link.badgeText && (
                            <span
                              className="px-1.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider text-white shadow-sm"
                              style={{ backgroundColor: link.badgeColor || '#3b82f6' }}
                            >
                              {link.badgeText}
                            </span>
                          )}

                          {link.openInNewTab && (
                            <ExternalLink size={12} className="opacity-40 group-hover:opacity-100" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* 3. CONTACT INFO COLUMN */}
          {config.contact?.enabled && (
            <div
              id="footer-contact-column"
              onClick={() => onSelectSubElement && onSelectSubElement('contact')}
              className={`flex flex-col gap-3.5 p-3.5 rounded-xl cursor-pointer transition-all ${
                selectedSectionId === 'contact' ? 'ring-2 ring-blue-500 bg-blue-500/5' : 'hover:bg-white/[0.02]'
              }`}
            >
              {config.contact.title && (
                <h3
                  style={{
                    fontFamily: config.typography.headings.fontFamily,
                    fontSize: `${config.typography.headings.fontSizePx}px`,
                    fontWeight: config.typography.headings.fontWeight as any,
                    color: config.typography.headings.color,
                    letterSpacing: config.typography.headings.letterSpacing,
                    textTransform: config.typography.headings.textTransform
                  }}
                >
                  {config.contact.title}
                </h3>
              )}

              <div className="flex flex-col gap-3">
                {config.contact.items.map(item => (
                  <div key={item.id} className="flex items-start gap-3 group">
                    {config.contact.showIcons && (
                      <div
                        className="p-2 rounded-lg shrink-0 flex items-center justify-center transition-colors group-hover:bg-blue-500/20"
                        style={{
                          backgroundColor: config.contact.iconBgColor || 'rgba(56, 189, 248, 0.12)',
                          borderRadius: `${config.contact.iconBorderRadius || 8}px`
                        }}
                      >
                        {renderContactIcon(item.type, item.icon)}
                      </div>
                    )}
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
                        {item.label}
                      </span>
                      {item.linkUrl ? (
                        <a
                          href={item.linkUrl}
                          className="text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-slate-200 block">
                          {item.value}
                        </span>
                      )}
                      {item.subtext && (
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {item.subtext}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. NEWSLETTER WIDGET BOX */}
          {config.newsletter?.enabled && (
            <div
              id="footer-newsletter-card"
              onClick={() => onSelectSubElement && onSelectSubElement('newsletter')}
              className={`p-5 rounded-2xl cursor-pointer transition-all flex flex-col gap-3.5 ${
                selectedSectionId === 'newsletter' ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:border-slate-600'
              }`}
              style={{
                backgroundColor: config.newsletter.cardStyle === 'card'
                  ? 'rgba(30, 41, 59, 0.6)'
                  : config.newsletter.cardStyle === 'glow'
                  ? 'rgba(15, 23, 42, 0.85)'
                  : 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: config.newsletter.cardStyle === 'glow' ? '0 0 25px rgba(37, 99, 235, 0.25)' : 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <h3
                  className="font-bold text-white tracking-tight"
                  style={{ fontSize: `${config.typography.headings.fontSizePx}px` }}
                >
                  {config.newsletter.title || 'Zapisz się do Newslettera'}
                </h3>
                {config.newsletter.badgeText && (
                  <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300">
                    {config.newsletter.badgeText}
                  </span>
                )}
              </div>

              {config.newsletter.subtitle && (
                <p className="text-xs text-slate-400 leading-relaxed">
                  {config.newsletter.subtitle}
                </p>
              )}

              {/* Form */}
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2.5 mt-1">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={config.newsletter.placeholder || 'Twój adres e-mail...'}
                    required
                    className="flex-1 px-3.5 py-2.5 text-sm rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    style={{
                      backgroundColor: config.newsletter.inputBgColor || '#1e293b',
                      color: config.newsletter.inputTextColor || '#ffffff',
                      borderColor: config.newsletter.inputBorderColor || 'rgba(255, 255, 255, 0.15)',
                      borderWidth: '1px'
                    }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-150 flex items-center justify-center gap-1.5 shadow-md active:scale-95 shrink-0"
                    style={{
                      backgroundColor: config.newsletter.buttonBgColor || '#2563eb',
                      color: config.newsletter.buttonTextColor || '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      if (config.newsletter.buttonHoverBgColor) {
                        e.currentTarget.style.backgroundColor = config.newsletter.buttonHoverBgColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = config.newsletter.buttonBgColor || '#2563eb';
                    }}
                  >
                    <span>{config.newsletter.buttonText || 'Zapisz'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Consent checkbox */}
                {config.newsletter.showTermsConsent && (
                  <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newsletterConsent}
                      onChange={(e) => setNewsletterConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{config.newsletter.termsConsentText || 'Zgadzam się na przetwarzanie danych osobowych.'}</span>
                  </label>
                )}

                {newsletterSubmitted && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-1.5 animate-fadeIn">
                    <CheckCircle size={14} />
                    <span>Dziękujemy! Twój kod rabatowy został wysłany.</span>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* PAYMENT METHODS SECTION */}
        {config.payments?.enabled && (
          <div
            id="footer-payments-bar"
            onClick={() => onSelectSubElement && onSelectSubElement('payments')}
            className={`mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer transition-all ${
              selectedSectionId === 'payments' ? 'ring-2 ring-blue-500 p-3 rounded-xl' : ''
            }`}
          >
            {config.payments.title && (
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {config.payments.title}
              </span>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {config.payments.methods.map(renderPaymentBadge)}
            </div>
          </div>
        )}

        {/* BOTTOM BAR: COPYRIGHT & LEGAL LINKS */}
        {config.bottomBar?.enabled && (
          <div
            id="footer-bottom-bar"
            onClick={() => onSelectSubElement && onSelectSubElement('bottomBar')}
            className={`mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs cursor-pointer transition-all ${
              selectedSectionId === 'bottomBar' ? 'ring-2 ring-blue-500 p-3 rounded-xl' : ''
            }`}
            style={{
              borderTop: config.bottomBar.showDivider ? `1px ${config.bottomBar.dividerStyle || 'solid'} ${config.bottomBar.dividerColor || 'rgba(255,255,255,0.08)'}` : 'none',
              color: config.bottomBar.textColor || '#64748b'
            }}
          >
            {/* Copyright Statement */}
            <div className="flex items-center gap-2 text-center md:text-left">
              <span>
                © {config.bottomBar.autoYear ? new Date().getFullYear() : config.bottomBar.customYear || '2026'}{' '}
                <strong className="text-slate-300 font-semibold">{config.bottomBar.storeName || 'MarketPlace Pro'}</strong>.{' '}
                {config.bottomBar.copyrightText || 'Wszelkie prawa zastrzeżone.'}
              </span>
            </div>

            {/* Legal / Policy Links */}
            {config.bottomBar.legalLinks && config.bottomBar.legalLinks.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px]">
                {config.bottomBar.legalLinks.map((leg, idx) => (
                  <React.Fragment key={leg.id || idx}>
                    <a
                      href={leg.url || '#'}
                      className="hover:text-slate-200 transition-colors"
                    >
                      {leg.text}
                    </a>
                    {idx < config.bottomBar.legalLinks.length - 1 && (
                      <span className="text-slate-700">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
