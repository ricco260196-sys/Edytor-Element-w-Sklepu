import React, { useState, useEffect } from 'react';
import {
  WidgetInstance,
  WidgetPreviewState,
  WidgetType
} from '../../../../types/widgetEditor';
import { DevicePreview } from '../../../../types/storeAppearance';
import { SYSTEM_PRODUCTS, SystemProduct } from '../../../../data/marketplaceCatalogue';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  Send,
  Mail,
  Flame,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  Zap,
  Percent,
  Gift,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { IconRenderer } from '../../../common/IconRenderer';

interface WidgetDynamicRendererProps {
  widget: WidgetInstance;
  deviceViewport?: DevicePreview | 'desktop' | 'tablet' | 'mobile';
  previewState?: WidgetPreviewState;
  isSelected?: boolean;
  onSelect?: () => void;
  onAddToCart?: (product: SystemProduct) => void;
  onToggleWishlist?: (product: SystemProduct) => void;
  isWishlisted?: (productId: string | number) => boolean;
  onQuickView?: (product: SystemProduct) => void;
}

export const WidgetDynamicRenderer: React.FC<WidgetDynamicRendererProps> = ({
  widget,
  deviceViewport = 'desktop',
  previewState = 'normal',
  isSelected = false,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!widget.enabled && previewState === 'normal' && !isSelected) {
    return null;
  }

  // Generate container styles based on widget configuration
  const getContainerStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};

    // 1. Kształt & Radius
    if (widget.shape.type === 'pill') {
      style.borderRadius = '9999px';
    } else if (widget.shape.type === 'sharp') {
      style.borderRadius = '0px';
    } else if (widget.shape.type === 'custom' || widget.shape.useCustomCorners) {
      style.borderTopLeftRadius = `${widget.shape.topLeftRadiusPx}px`;
      style.borderTopRightRadius = `${widget.shape.topRightRadiusPx}px`;
      style.borderBottomRightRadius = `${widget.shape.bottomRightRadiusPx}px`;
      style.borderBottomLeftRadius = `${widget.shape.bottomLeftRadiusPx}px`;
    } else {
      style.borderRadius = `${widget.shape.borderRadiusPx}px`;
    }

    // 2. Rozmiar
    if (widget.size.widthMode === 'fixed') {
      style.maxWidth = `${widget.size.customWidthPx}px`;
      style.width = '100%';
    } else if (widget.size.widthMode === 'container') {
      style.maxWidth = '1200px';
      style.width = '100%';
    } else {
      style.width = '100%';
    }

    if (widget.size.heightMode === 'fixed') {
      style.height = `${widget.size.customHeightPx}px`;
    } else if (widget.size.heightMode === 'min_height') {
      style.minHeight = `${widget.size.minHeightPx}px`;
    }

    // 3. Tło
    if (widget.background.type === 'solid') {
      style.backgroundColor = widget.background.color;
    } else if (widget.background.type === 'gradient') {
      const grad = widget.background.gradient;
      if (grad.type === 'radial') {
        style.background = `radial-gradient(circle, ${grad.fromColor} 0%, ${grad.toColor} 100%)`;
      } else {
        style.background = `linear-gradient(${grad.degree}deg, ${grad.fromColor} 0%, ${grad.toColor} 100%)`;
      }
    } else if (widget.background.type === 'image' && widget.background.image) {
      style.backgroundImage = `url(${widget.background.image.url})`;
      style.backgroundSize = widget.background.image.size;
      style.backgroundPosition = widget.background.image.position;
      style.backgroundRepeat = widget.background.image.repeat;
    } else if (widget.background.type === 'transparent') {
      style.backgroundColor = 'transparent';
    }

    style.opacity = widget.background.opacity;

    // 4. Obramowanie
    if (widget.border.enabled && widget.border.style !== 'none') {
      style.border = `${widget.border.widthPx}px ${widget.border.style} ${widget.border.color}`;
    } else {
      style.border = 'none';
    }

    // 5. Cienie
    if (widget.shadow.enabled) {
      if (widget.shadow.preset === 'glow') {
        style.boxShadow = `0 0 25px ${widget.shadow.glowColor || 'rgba(59, 130, 246, 0.4)'}`;
      } else if (widget.shadow.preset === 'inner') {
        style.boxShadow = `inset ${widget.shadow.offsetX}px ${widget.shadow.offsetY}px ${widget.shadow.blurRadiusPx}px ${widget.shadow.color}`;
      } else if (widget.shadow.preset === 'custom') {
        style.boxShadow = `${widget.shadow.offsetX}px ${widget.shadow.offsetY}px ${widget.shadow.blurRadiusPx}px ${widget.shadow.spreadRadiusPx}px ${widget.shadow.color}`;
      } else {
        const shadowPresets: Record<string, string> = {
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        };
        style.boxShadow = shadowPresets[widget.shadow.preset] || shadowPresets.md;
      }
    }

    // 6. Glassmorphism
    if (widget.background.glassmorphism?.enabled) {
      style.backdropFilter = `blur(${widget.background.glassmorphism.blurPx}px) saturate(${widget.background.glassmorphism.saturation}%)`;
      (style as any).WebkitBackdropFilter = `blur(${widget.background.glassmorphism.blurPx}px) saturate(${widget.background.glassmorphism.saturation}%)`;
    }

    // 7. Spacing & Padding
    style.padding = `${widget.spacing.paddingTopPx}px ${widget.spacing.paddingRightPx}px ${widget.spacing.paddingBottomPx}px ${widget.spacing.paddingLeftPx}px`;
    style.marginTop = `${widget.spacing.marginTopPx}px`;
    style.marginBottom = `${widget.spacing.marginBottomPx}px`;

    // 8. Overflow & Masks
    if (widget.shape.overflowHidden) {
      style.overflow = 'hidden';
    }

    // 9. Transitions & Animations
    style.transition = `all ${widget.animation.durationMs}ms ${widget.animation.easing}`;

    return style;
  };

  // Helper for rendering button inside widget
  const renderWidgetButton = (label: string, iconName?: string, onClick?: () => void) => {
    const btnCfg = widget.button;
    if (!btnCfg.enabled) return null;

    const btnStyle: React.CSSProperties = {
      backgroundColor: btnCfg.backgroundColor,
      color: btnCfg.textColor,
      border: btnCfg.borderWidthPx > 0 ? `${btnCfg.borderWidthPx}px solid ${btnCfg.borderColor}` : 'none',
      borderRadius: btnCfg.shape === 'pill' ? '9999px' : `${btnCfg.borderRadiusPx}px`,
      padding: `${btnCfg.paddingYPx}px ${btnCfg.paddingXPx}px`,
      fontWeight: btnCfg.fontWeight as any,
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontSize: btnCfg.size === 'sm' ? '12px' : btnCfg.size === 'lg' ? '15px' : '13px'
    };

    return (
      <button
        type="button"
        style={btnStyle}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
        className="group hover:opacity-90 active:scale-98"
      >
        {btnCfg.iconPosition === 'left' && iconName && (
          <IconRenderer name={iconName} className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
        <span>{label}</span>
        {btnCfg.iconPosition === 'right' && iconName && (
          <IconRenderer name={iconName} className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    );
  };

  // Helper for rendering Title and Subtitle
  const renderHeader = () => {
    const typo = widget.typography;
    const isCenter = widget.layout.alignItems === 'center';

    return (
      <div className={`mb-6 ${isCenter ? 'text-center' : 'text-left'}`}>
        {widget.content.badgeText && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold mb-2 bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>{widget.content.badgeText}</span>
          </div>
        )}
        <h3
          style={{
            fontFamily: typo.title.fontFamily,
            fontSize: `${typo.title.fontSizePx}px`,
            fontWeight: typo.title.fontWeight as any,
            lineHeight: typo.title.lineHeight,
            letterSpacing: `${typo.title.letterSpacingEm}em`,
            color: typo.title.color,
            textTransform: typo.title.textTransform as any
          }}
          className="tracking-tight"
        >
          {widget.content.title || widget.displayName}
        </h3>
        {widget.content.subtitle && (
          <p
            style={{
              fontFamily: typo.subtitle.fontFamily,
              fontSize: `${typo.subtitle.fontSizePx}px`,
              fontWeight: typo.subtitle.fontWeight as any,
              lineHeight: typo.subtitle.lineHeight,
              letterSpacing: `${typo.subtitle.letterSpacingEm}em`,
              color: typo.subtitle.color
            }}
            className="mt-1"
          >
            {widget.content.subtitle}
          </p>
        )}
      </div>
    );
  };

  // Content renderers for each specific widget type
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'featured_products':
      case 'promotions': {
        const products = SYSTEM_PRODUCTS.slice(0, widget.content.productCount || 4);
        const gridCols =
          deviceViewport === 'mobile'
            ? 'grid-cols-1'
            : deviceViewport === 'tablet'
            ? 'grid-cols-2'
            : `grid-cols-${Math.min(widget.layout.columnsCount || 4, 4)}`;

        return (
          <div>
            {renderHeader()}
            <div
              className={`grid ${gridCols}`}
              style={{
                gap: `${widget.layout.gapX}px`
              }}
            >
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="group relative rounded-xl border border-slate-700/60 bg-slate-900/60 p-3.5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Badge */}
                    {prod.badge && (
                      <div className="absolute top-5 left-5 z-10 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 shadow-sm">
                        {prod.badge}
                      </div>
                    )}

                    {/* Quick actions top right */}
                    <div className="absolute top-5 right-5 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleWishlist) onToggleWishlist(prod);
                        }}
                        className={`p-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white shadow-md border border-slate-700 transition-colors ${
                          isWishlisted && isWishlisted(prod.id) ? 'text-rose-500' : 'text-slate-300'
                        }`}
                        title="Dodaj do schowka"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onQuickView) onQuickView(prod);
                        }}
                        className="p-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white shadow-md border border-slate-700 transition-colors"
                        title="Szybki podgląd"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-950 mb-3 flex items-center justify-center">
                      <img
                        src={(prod.images && prod.images[0]) || ''}
                        alt={prod.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Category & Title */}
                    <p className="text-[11px] font-medium text-slate-400 mb-0.5">{prod.category}</p>
                    <h4 className="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {prod.name}
                    </h4>

                    {/* Rating */}
                    <div className="flex items-center gap-1 my-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(prod.rating) ? 'fill-current' : 'text-slate-700'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400">({prod.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between mt-2">
                    <div>
                      {prod.oldPrice && (
                        <span className="text-[11px] text-slate-500 line-through mr-1.5">
                          {prod.oldPrice.toFixed(2)} zł
                        </span>
                      )}
                      <span className="text-sm font-bold text-emerald-400">
                        {prod.price.toFixed(2)} zł
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) onAddToCart(prod);
                      }}
                      className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95 shadow-md flex items-center gap-1 text-xs font-semibold"
                      title="Dodaj do koszyka"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {widget.button.enabled && (
              <div className="mt-6 text-center">
                {renderWidgetButton(widget.content.buttonText || 'Zobacz wszystkie oferty', 'ArrowRight')}
              </div>
            )}
          </div>
        );
      }

      case 'newsletter': {
        return (
          <div className="max-w-2xl mx-auto text-center py-2">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
              <Mail className="w-8 h-8" />
            </div>
            {renderHeader()}
            <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">
              Zapisz się do newslettera, aby otrzymywać unikalne kody rabatowe do 20% oraz wcześniejszy dostęp do wyprzedaży.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Dziękujemy! Twój kod rabatowy -15% został wysłany na podany adres e-mail.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailInput) setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Wpisz swój adres e-mail..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: widget.button.backgroundColor || '#2563eb',
                    color: widget.button.textColor || '#ffffff',
                    borderRadius: `${widget.button.borderRadiusPx || 12}px`
                  }}
                  className="w-full sm:w-auto px-6 py-3 font-semibold text-xs transition-all hover:opacity-90 active:scale-95 shrink-0 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{widget.content.buttonText || 'Zapisz się'}</span>
                </button>
              </form>
            )}

            <p className="text-[10px] text-slate-500 mt-3">
              Gwarantujemy zero spamu. Możesz wypisać się w każdej chwili jednym kliknięciem.
            </p>
          </div>
        );
      }

      case 'trust_badges': {
        const badges = [
          {
            icon: 'Truck',
            title: 'Darmowa dostawa od 150 zł',
            desc: 'Szybka wysyłka kurierem w 24h'
          },
          {
            icon: 'RotateCcw',
            title: '30 dni na darmowy zwrot',
            desc: 'Wygodny zwrot paczkomatem'
          },
          {
            icon: 'ShieldCheck',
            title: '100% bezpieczne płatności',
            desc: 'Szyfrowanie SSL & BLIK'
          },
          {
            icon: 'Headphones',
            title: 'Wsparcie klienta 24/7',
            desc: 'Pomoc ekspertów przez czat'
          }
        ];

        return (
          <div>
            {renderHeader()}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 transition-all hover:bg-slate-900/80 hover:border-slate-700"
                >
                  <div
                    style={{
                      backgroundColor: widget.icon.backgroundColor || 'rgba(59, 130, 246, 0.1)',
                      color: widget.icon.color || '#38bdf8'
                    }}
                    className="p-3 rounded-xl shrink-0 flex items-center justify-center border border-blue-500/20"
                  >
                    <IconRenderer name={b.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-100">{b.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'promo_1':
      case 'promo_2': {
        return (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-2">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Oferta Limitowana Czasowo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {widget.content.title || 'Wielka Wyprzedaż Sezonowa'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {widget.content.subtitle || 'Odkryj rabaty do -50% na wybrane kolekcje sprzętu elektronicznego i akcesoriów.'}
              </p>

              <div className="flex items-center gap-3 mt-5">
                {renderWidgetButton(widget.content.buttonText || 'Sprawdź okazje', 'ArrowRight')}
                <span className="text-xs text-slate-400 font-medium">*Oferta ważna do wyczerpania zapasów</span>
              </div>
            </div>

            {/* Visual promo box or discount badge */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 p-1 flex items-center justify-center shadow-2xl rotate-3 transition-transform hover:rotate-0">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center text-center p-3">
                  <Percent className="w-8 h-8 text-amber-400 mb-1" />
                  <span className="text-3xl font-black text-white leading-none">-50%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SUPER OKAZJA</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'countdown_banner': {
        return (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>Koniec Promocji za:</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {widget.content.title || 'Flash Sale 24h – Ostatnie sztuki w super cenie'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {widget.content.subtitle || 'Dodatkowy rabat 20 zł na pierwsze zamówienie z kodem: FLASH20'}
              </p>
            </div>

            {/* Countdown timers */}
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-md">
                <span className="text-lg font-black text-blue-400 leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Godz</span>
              </div>
              <span className="text-xl font-bold text-slate-600">:</span>
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-md">
                <span className="text-lg font-black text-blue-400 leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Min</span>
              </div>
              <span className="text-xl font-bold text-slate-600">:</span>
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-md">
                <span className="text-lg font-black text-rose-400 leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">Sek</span>
              </div>
            </div>

            {renderWidgetButton(widget.content.buttonText || 'Kup teraz z kodem', 'Zap')}
          </div>
        );
      }

      case 'testimonials': {
        const reviews = [
          {
            name: 'Marek Jankowski',
            role: 'Zweryfikowany Klient',
            rating: 5,
            text: 'Błyskawiczna realizacja zamówienia! Paczka dotarła na drugi dzień rano, starannie zabezpieczona. Jakość produktów na najwyższym poziomie.'
          },
          {
            name: 'Anna Wiśniewska',
            role: 'Architekt wnętrz',
            rating: 5,
            text: 'Świetny wybór artykułów i intuicyjna nawigacja sklepu. Doceniam profesjonalną obsługę i pomoc doradców przy doborze akcesoriów.'
          },
          {
            name: 'Piotr Kaczmarek',
            role: 'Klient B2B',
            rating: 5,
            text: 'Zamawiamy regularnie dla naszej firmy. Bardzo dobre ceny, fakturowanie bez zarzutu i bezproblemowe zwroty. Szczerze polecam.'
          }
        ];

        return (
          <div>
            {renderHeader()}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex text-amber-400 mb-3">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">{rev.name}</h5>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {rev.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'faq': {
        const faqs = [
          {
            q: 'Jakie są dostępne metody płatności?',
            a: 'Oferujemy płatności szybkim przelewem online, BLIK, kartami płatniczymi (Visa, MasterCard), Apple Pay, Google Pay oraz płatność przy odbiorze u kuriera.'
          },
          {
            q: 'Ile wynosi czas i koszt dostawy?',
            a: 'Darmowa dostawa obowiązuje dla zamówień powyżej 150 zł. Czas dostawy to zazwyczaj 24-48 godzin roboczych. Realizujemy wysyłki Paczkomatami InPost oraz kurierami DPD i DHL.'
          },
          {
            q: 'Jak wygląda procedura zwrotu towaru?',
            a: 'Masz aż 30 dni na bezpłatny zwrot produktów. Wystarczy wypełnić krótki formularz w panelu klienta i wygenerować darmową etykietę do Paczkomatu.'
          }
        ];

        return (
          <div className="max-w-3xl mx-auto">
            {renderHeader()}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isExpanded = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/40 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                    >
                      <div className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{faq.q}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-blue-400' : ''}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'usp_banner': {
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{widget.content.title || 'Dołącz do Klubu Marketplace Pro'}</h4>
                <p className="text-xs text-slate-400">{widget.content.subtitle || 'Zbieraj punkty za zakupy i wymieniaj je na darmowe produkty oraz kupony rabatowe.'}</p>
              </div>
            </div>
            {renderWidgetButton(widget.content.buttonText || 'Dołącz za darmo', 'Sparkles')}
          </div>
        );
      }

      default:
        return (
          <div>
            {renderHeader()}
            <p className="text-xs text-slate-400">
              {widget.content.bodyText || 'Treść konfigurowalna z poziomu edytora wyglądu widżetu.'}
            </p>
            {widget.button.enabled && (
              <div className="mt-4">
                {renderWidgetButton(widget.content.buttonText || 'Sprawdź ofertę', 'ArrowRight')}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div
      onClick={onSelect}
      style={getContainerStyle()}
      className={`relative cursor-pointer select-none transition-all ${
        isSelected
          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950 shadow-2xl'
          : 'hover:ring-1 hover:ring-blue-400/40'
      }`}
    >
      {/* Selected Widget Badge Overlay */}
      {isSelected && (
        <div className="absolute -top-3 left-4 z-30 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Edytowany: {widget.displayName}</span>
        </div>
      )}

      {renderWidgetContent()}
    </div>
  );
};
