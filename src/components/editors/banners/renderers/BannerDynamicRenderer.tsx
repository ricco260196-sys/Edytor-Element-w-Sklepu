import React, { useState, useEffect } from 'react';
import {
  BannerInstance,
  BannerSimulatedState
} from '../../../../types/bannerEditor';
import {
  ArrowRight,
  ShoppingBag,
  Zap,
  Sparkles,
  Crown,
  Mail,
  Sliders,
  ExternalLink,
  Percent,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { IconRenderer } from '../../../common/IconRenderer';

interface BannerDynamicRendererProps {
  banner: BannerInstance;
  deviceViewport?: 'desktop' | 'tablet' | 'mobile';
  simulatedState?: BannerSimulatedState;
  onOpenMainSliderModal?: () => void;
  onCtaClick?: () => void;
  isInteractive?: boolean;
}

export const BannerDynamicRenderer: React.FC<BannerDynamicRendererProps> = ({
  banner,
  deviceViewport = 'desktop',
  simulatedState = 'normal',
  onOpenMainSliderModal,
  onCtaClick,
  isInteractive = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeHover = simulatedState === 'hover' || isHovered;
  const activeActive = simulatedState === 'active';
  const isDisabled = simulatedState === 'disabled';
  const isLoading = simulatedState === 'loading';
  const isError = simulatedState === 'error';
  const isEmpty = simulatedState === 'empty';

  // Responsive overrides
  const responsiveOverride =
    deviceViewport === 'mobile'
      ? banner.responsive?.mobile
      : deviceViewport === 'tablet'
      ? banner.responsive?.tablet
      : undefined;

  // Compute Layout Direction
  const layoutDirection = responsiveOverride?.layoutDirection || banner.layout.direction;
  const isLayoutHorizontal = layoutDirection === 'image_left' || layoutDirection === 'image_right';
  const isImageFirst = layoutDirection === 'image_left' || layoutDirection === 'image_top';

  // Compute Border Radius
  let borderRadiusStyle = `${banner.shape.borderRadius}px`;
  if (banner.shape.preset === 'rectangle') {
    borderRadiusStyle = '0px';
  } else if (banner.shape.preset === 'pill') {
    borderRadiusStyle = '9999px';
  } else if (banner.shape.preset === 'ellipse') {
    borderRadiusStyle = '50%';
  } else if (banner.shape.individualCorners) {
    const { topLeft, topRight, bottomRight, bottomLeft } = banner.shape.corners;
    borderRadiusStyle = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  }

  // Clip path
  let clipPathStyle: string | undefined = undefined;
  if (banner.shape.clipPath === 'diagonal_left') {
    clipPathStyle = 'polygon(0 0, 100% 0, 100% 90%, 0 100%)';
  } else if (banner.shape.clipPath === 'diagonal_right') {
    clipPathStyle = 'polygon(0 0, 100% 0, 100% 100%, 0 90%)';
  } else if (banner.shape.clipPath === 'polygon_badge') {
    clipPathStyle = 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)';
  } else if (banner.shape.clipPath === 'custom' && banner.shape.customClipPath) {
    clipPathStyle = banner.shape.customClipPath;
  }

  // Compute Background
  let backgroundStyle: React.CSSProperties = {};
  if (banner.background.type === 'color') {
    backgroundStyle.backgroundColor = banner.background.color;
  } else if (banner.background.type === 'gradient' && banner.background.gradient) {
    const g = banner.background.gradient;
    if (g.type === 'linear') {
      const stops = [g.color1, g.color2, g.color3].filter(Boolean).join(', ');
      backgroundStyle.backgroundImage = `linear-gradient(${g.direction || '135deg'}, ${stops})`;
    } else {
      const stops = [g.color1, g.color2, g.color3].filter(Boolean).join(', ');
      backgroundStyle.backgroundImage = `radial-gradient(${g.position || 'circle at center'}, ${stops})`;
    }
  } else if (banner.background.type === 'image' && banner.background.image) {
    backgroundStyle.backgroundImage = `url(${banner.background.image.url})`;
    backgroundStyle.backgroundPosition = banner.background.image.position || 'center';
    backgroundStyle.backgroundSize = banner.background.image.size || 'cover';
    backgroundStyle.backgroundRepeat = banner.background.image.repeat || 'no-repeat';
  } else if (banner.background.type === 'transparent') {
    backgroundStyle.backgroundColor = 'transparent';
  }

  // Compute Border
  const borderStyle: React.CSSProperties = {
    borderStyle: banner.border.style !== 'none' ? banner.border.style : 'none',
    borderWidth: banner.border.style !== 'none' ? `${banner.border.width}px` : '0px',
    borderColor: activeHover && banner.border.hoverColor ? banner.border.hoverColor : banner.border.color
  };

  // Compute Shadow
  let boxShadowValue = 'none';
  if (banner.shadow.enabled && banner.shadow.preset !== 'none') {
    if (banner.shadow.preset === 'sm') boxShadowValue = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    else if (banner.shadow.preset === 'md') boxShadowValue = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    else if (banner.shadow.preset === 'lg') boxShadowValue = '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    else if (banner.shadow.preset === 'xl') boxShadowValue = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    else if (banner.shadow.preset === '2xl') boxShadowValue = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
    else if (banner.shadow.preset === 'glow') boxShadowValue = `0 0 25px ${banner.shadow.color || 'rgba(59, 130, 246, 0.4)'}`;
    else if (banner.shadow.preset === 'custom') {
      boxShadowValue = `${banner.shadow.x}px ${banner.shadow.y}px ${banner.shadow.blur}px ${banner.shadow.spread}px ${banner.shadow.color}`;
    }
  }

  // Hover transformations
  let transformStyle = '';
  if (activeHover && !isDisabled) {
    if (banner.hover.scale && banner.hover.scale !== 1) transformStyle += ` scale(${banner.hover.scale})`;
    if (banner.hover.translateY) transformStyle += ` translateY(${banner.hover.translateY}px)`;
  }
  if (activeActive && !isDisabled) {
    transformStyle += ' scale(0.98)';
  }

  // Spacing (padding & margin)
  const padding = responsiveOverride?.padding || banner.spacing.padding;
  const margin = responsiveOverride?.margin || banner.spacing.margin;
  const gap = responsiveOverride?.gap !== undefined ? responsiveOverride.gap : banner.spacing.gap;

  // Typography styles
  const titleFontSize = responsiveOverride?.titleFontSize || banner.typography.title.fontSize;
  const subtitleFontSize = responsiveOverride?.subtitleFontSize || banner.typography.subtitle.fontSize;

  // Image effects CSS string
  const imgEffects = banner.image.effects;
  const imageFilterStyle = `grayscale(${imgEffects.grayscale}%) blur(${imgEffects.blur}px) brightness(${imgEffects.brightness}%) contrast(${imgEffects.contrast}%) saturate(${imgEffects.saturation}%)`;

  // Image Aspect Ratio
  const aspectClass =
    banner.image.aspectRatio === '1:1'
      ? 'aspect-square'
      : banner.image.aspectRatio === '16:9'
      ? 'aspect-video'
      : banner.image.aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : banner.image.aspectRatio === '3:2'
      ? 'aspect-[3/2]'
      : banner.image.aspectRatio === '21:9'
      ? 'aspect-[21/9]'
      : 'aspect-auto';

  // Loading or Error states
  if (isLoading) {
    return (
      <div
        style={{ borderRadius: borderRadiusStyle, padding: '40px' }}
        className="w-full bg-slate-900 border border-slate-800 animate-pulse flex flex-col items-center justify-center gap-4 text-center min-h-[220px]"
      >
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
        <div className="h-4 bg-slate-800 rounded w-1/3" />
        <div className="h-3 bg-slate-800/60 rounded w-1/2" />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{ borderRadius: borderRadiusStyle, padding: '32px' }}
        className="w-full bg-rose-950/40 border border-rose-800/60 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]"
      >
        <AlertCircle className="w-8 h-8 text-rose-400" />
        <p className="text-sm font-bold text-rose-200">Nie udało się załadować zawartości banera</p>
        <p className="text-xs text-rose-300/70">Wystąpił błąd w konfiguracji źródła mediów lub parametrów.</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        style={{ borderRadius: borderRadiusStyle, padding: '32px' }}
        className="w-full bg-slate-900/60 border border-dashed border-slate-800 flex flex-col items-center justify-center gap-2 text-center min-h-[180px]"
      >
        <ImageIcon className="w-8 h-8 text-slate-600" />
        <p className="text-sm font-semibold text-slate-400">Pusty element banera</p>
        <p className="text-xs text-slate-500">Wprowadź tekst lub wybierz grafikę w panelu bocznym.</p>
      </div>
    );
  }

  // SPECIAL CASE: Main Slider Preview Component
  if (banner.type === 'main_slider_preview' || banner.isSystemMainSlider) {
    return (
      <div
        id={banner.id}
        style={{
          borderRadius: borderRadiusStyle,
          marginTop: `${margin.top}px`,
          marginBottom: `${margin.bottom}px`,
          marginLeft: `${margin.left}px`,
          marginRight: `${margin.right}px`,
          boxShadow: boxShadowValue,
          ...borderStyle,
          ...backgroundStyle,
          clipPath: clipPathStyle
        }}
        className="relative overflow-hidden w-full group transition-all duration-300 select-none"
      >
        {/* Background Image with Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <img
            src={banner.image.url}
            alt={banner.image.altText || 'Główny slider'}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            style={{ filter: imageFilterStyle }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 p-6 sm:p-10 flex flex-col justify-between min-h-[360px] sm:min-h-[440px]">
          {/* Top Row: System Tag & Slider Navigation Indicator */}
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-400/40 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>{banner.content.badgeText || 'GŁÓWNY SLIDER SKLEPU'}</span>
            </div>

            {/* Slider Dots Simulation */}
            <div className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
              <span className="w-6 h-2 rounded-full bg-blue-500" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
          </div>

          {/* Center / Bottom Info */}
          <div className="space-y-4 max-w-xl">
            <h2
              style={{
                fontSize: `${titleFontSize}px`,
                fontWeight: banner.typography.title.fontWeight,
                color: banner.typography.title.color,
                lineHeight: banner.typography.title.lineHeight,
                letterSpacing: banner.typography.title.letterSpacing,
                textAlign: banner.typography.title.textAlign
              }}
              className="text-white drop-shadow-md"
            >
              {banner.content.title}
            </h2>

            <p
              style={{
                fontSize: `${subtitleFontSize}px`,
                fontWeight: banner.typography.subtitle.fontWeight,
                color: banner.typography.subtitle.color,
                lineHeight: banner.typography.subtitle.lineHeight,
                textAlign: banner.typography.subtitle.textAlign
              }}
              className="drop-shadow"
            >
              {banner.content.subtitle}
            </p>

            {/* Dedicated Launcher Button */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenMainSliderModal && onOpenMainSliderModal()}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/40 border border-blue-400/40 transition-all cursor-pointer group/btn"
              >
                <Sliders className="w-4 h-4 text-blue-200 group-hover/btn:rotate-90 transition-transform duration-300" />
                <span>Otwórz Edytor Głównego Slidera</span>
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <span className="text-[11px] text-slate-400 italic">
                (Slajdy, animacje i czas rotacji konfigurowane są w osobnym edytorze)
              </span>
            </div>
          </div>

          {/* Bottom Bar: Slide Controls simulation */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Autoodtwarzanie: Co 5 sekund</span>
            </span>
            <span>Slajd 1 z 3</span>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD / CUSTOM BANNER RENDERER (Image + Text, Promo, Info, Marketing, Image only, CTA)
  return (
    <div
      id={banner.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: borderRadiusStyle,
        marginTop: `${margin.top}px`,
        marginBottom: `${margin.bottom}px`,
        marginLeft: `${margin.left}px`,
        marginRight: `${margin.right}px`,
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
        boxShadow: boxShadowValue,
        transform: transformStyle,
        transition: `all ${banner.hover.transitionDurationMs || 250}ms ease`,
        clipPath: clipPathStyle,
        ...borderStyle,
        ...backgroundStyle,
        opacity: isDisabled ? 0.5 : 1
      }}
      className={`relative overflow-hidden w-full transition-all select-none ${
        isDisabled ? 'pointer-events-none' : ''
      }`}
    >
      {/* Background Image / Overlay if enabled */}
      {banner.overlay.enabled && (
        <div
          style={{
            backgroundColor: banner.overlay.color,
            opacity: banner.overlay.opacity / 100,
            mixBlendMode: banner.overlay.blending as any
          }}
          className="absolute inset-0 pointer-events-none z-10"
        />
      )}

      {/* Main Flex Layout */}
      <div
        style={{
          gap: `${gap}px`
        }}
        className={`relative z-20 flex w-full ${
          isLayoutHorizontal
            ? layoutDirection === 'image_right'
              ? 'flex-col md:flex-row-reverse'
              : 'flex-col md:flex-row'
            : layoutDirection === 'image_bottom'
            ? 'flex-col-reverse'
            : 'flex-col'
        } ${
          banner.layout.verticalAlign === 'center'
            ? 'items-center'
            : banner.layout.verticalAlign === 'bottom'
            ? 'items-end'
            : 'items-start'
        }`}
      >
        {/* 1. IMAGE PART (if image visible and not pure hero overlay background) */}
        {banner.visibility.showImage && banner.image.url && (
          <div
            style={{
              width:
                isLayoutHorizontal && deviceViewport === 'desktop'
                  ? `${banner.layout.imageProportion}%`
                  : '100%'
            }}
            className="shrink-0 overflow-hidden relative group/img"
          >
            <div
              style={{
                borderRadius: `${banner.image.borderRadius}px`,
                overflow: 'hidden'
              }}
              className={`w-full relative ${aspectClass} bg-slate-950/40`}
            >
              <img
                src={banner.image.url}
                alt={banner.image.altText || banner.content.title}
                style={{
                  objectFit: banner.image.objectFit,
                  objectPosition: banner.image.objectPosition,
                  filter: imageFilterStyle,
                  opacity: banner.image.opacity / 100
                }}
                className={`w-full h-full transition-transform duration-500 ${
                  banner.hover.effect === 'zoom_image' && activeHover ? 'scale-105' : ''
                }`}
              />

              {/* Discount Ribbon on Image if Promo banner */}
              {banner.content.discountText && banner.visibility.showBadge && (
                <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                  <Percent className="w-3.5 h-3.5" />
                  <span>{banner.content.discountText}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. TEXT & CONTENT PART (Title, Subtitle, Badge, Countdown, CTA) */}
        {(banner.visibility.showHeader ||
          banner.visibility.showSubtitle ||
          banner.visibility.showBadge ||
          banner.visibility.showCtaButton ||
          banner.content.countdownEndTime) && (
          <div
            style={{
              width:
                banner.visibility.showImage && isLayoutHorizontal && deviceViewport === 'desktop'
                  ? `${100 - banner.layout.imageProportion}%`
                  : '100%',
              textAlign: banner.typography.title.textAlign
            }}
            className="flex-1 space-y-3.5 min-w-0"
          >
            {/* Badge */}
            {banner.visibility.showBadge && banner.content.badgeText && (
              <div
                className={`flex ${
                  banner.typography.title.textAlign === 'center'
                    ? 'justify-center'
                    : banner.typography.title.textAlign === 'right'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <span
                  style={{
                    backgroundColor: banner.content.badgeBgColor || '#3b82f6',
                    color: banner.content.badgeTextColor || '#ffffff',
                    fontSize: `${banner.typography.badge.fontSize}px`,
                    fontWeight: banner.typography.badge.fontWeight,
                    letterSpacing: banner.typography.badge.letterSpacing,
                    textTransform: banner.typography.badge.textTransform as any
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full shadow-sm"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{banner.content.badgeText}</span>
                </span>
              </div>
            )}

            {/* Title */}
            {banner.visibility.showHeader && banner.content.title && (
              <h3
                style={{
                  fontSize: `${titleFontSize}px`,
                  fontWeight: banner.typography.title.fontWeight,
                  color: banner.typography.title.color,
                  lineHeight: banner.typography.title.lineHeight,
                  letterSpacing: banner.typography.title.letterSpacing,
                  textTransform: banner.typography.title.textTransform as any,
                  fontFamily: banner.typography.title.fontFamily === 'display' ? 'sans-serif' : 'inherit'
                }}
                className="tracking-tight"
              >
                {banner.content.title}
              </h3>
            )}

            {/* Subtitle / Description */}
            {banner.visibility.showSubtitle && banner.content.subtitle && (
              <p
                style={{
                  fontSize: `${subtitleFontSize}px`,
                  fontWeight: banner.typography.subtitle.fontWeight,
                  color: banner.typography.subtitle.color,
                  lineHeight: banner.typography.subtitle.lineHeight,
                  letterSpacing: banner.typography.subtitle.letterSpacing
                }}
                className="leading-relaxed"
              >
                {banner.content.subtitle}
              </p>
            )}

            {/* Promo Countdown Timer (if enabled) */}
            {banner.visibility.showCountdown && (
              <div
                className={`flex items-center gap-2 py-1.5 ${
                  banner.typography.title.textAlign === 'center'
                    ? 'justify-center'
                    : banner.typography.title.textAlign === 'right'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div className="flex items-center gap-1.5 bg-slate-950/80 border border-amber-500/40 rounded-xl px-3 py-1.5 text-amber-300 text-xs font-mono font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Koniec za:</span>
                  <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-white">
                    {String(timeLeft.hours).padStart(2, '0')}g
                  </span>
                  <span>:</span>
                  <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </span>
                  <span>:</span>
                  <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-white">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>

                {banner.content.promoCode && (
                  <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-200 font-mono">
                    KOD: <strong className="text-amber-400">{banner.content.promoCode}</strong>
                  </div>
                )}
              </div>
            )}

            {/* Highlight Extra Note */}
            {banner.content.highlightText && (
              <div
                className={`flex items-center gap-1.5 text-xs text-emerald-400 font-medium ${
                  banner.typography.title.textAlign === 'center'
                    ? 'justify-center'
                    : banner.typography.title.textAlign === 'right'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{banner.content.highlightText}</span>
              </div>
            )}

            {/* CTA Button */}
            {banner.visibility.showCtaButton && banner.cta.show && (
              <div
                className={`pt-2 flex ${
                  banner.cta.position === 'center'
                    ? 'justify-center'
                    : banner.cta.position === 'right'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onCtaClick && onCtaClick()}
                  style={{
                    backgroundColor: banner.cta.appearance.bgColor,
                    color: banner.cta.appearance.textColor,
                    borderColor: banner.cta.appearance.borderColor,
                    borderWidth: `${banner.cta.appearance.borderWidth}px`,
                    borderRadius: `${banner.cta.appearance.borderRadius}px`,
                    padding: `${banner.cta.padding.top}px ${banner.cta.padding.right}px ${banner.cta.padding.bottom}px ${banner.cta.padding.left}px`,
                    width: banner.cta.width === 'full' ? '100%' : 'auto'
                  }}
                  className="font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:brightness-110 active:scale-95 cursor-pointer"
                >
                  {banner.cta.iconName && banner.cta.iconPosition === 'left' && (
                    <IconRenderer iconName={banner.cta.iconName} className="w-4 h-4" />
                  )}
                  <span>{banner.cta.text}</span>
                  {banner.cta.iconName && banner.cta.iconPosition === 'right' && (
                    <IconRenderer iconName={banner.cta.iconName} className="w-4 h-4" />
                  )}
                  {!banner.cta.iconName && (
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
