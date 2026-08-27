import React, { useState } from 'react';
import { InteractiveButtonItem, DevicePreview } from '../../../types/storeAppearance';
import * as LucideIcons from 'lucide-react';
import { ShoppingCart, Heart, Bell, MessageSquare, User, LogIn, UserPlus, ShieldCheck, Sparkles } from 'lucide-react';

interface InteractiveButtonRendererProps {
  item: InteractiveButtonItem;
  device?: DevicePreview;
  forcedState?: 'normal' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading' | 'dropdown';
  onClick?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  notificationsCount?: number;
  messagesCount?: number;
  showDropdown?: boolean;
}

export const InteractiveButtonRenderer: React.FC<InteractiveButtonRendererProps> = ({
  item,
  device = 'desktop',
  forcedState = 'normal',
  onClick,
  isSelected = false,
  onSelect,
  cartCount = 3,
  wishlistCount = 5,
  notificationsCount = 2,
  messagesCount = 4,
  showDropdown = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dynamic icon resolution from lucide-react
  const renderIconComponent = (iconName: string, size = 18, customColor?: string) => {
    if (!iconName) return null;
    const IconComp = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <IconComp size={size} color={customColor || undefined} className="shrink-0 transition-transform duration-200" />;
  };

  const isStateForced = forcedState !== 'normal';
  const effectiveHovered = forcedState === 'hover' || (!isStateForced && isHovered);
  const effectivePressed = forcedState === 'active' || (!isStateForced && isPressed);
  const effectiveDisabled = forcedState === 'disabled';
  const effectiveLoading = forcedState === 'loading';
  const effectiveDropdownOpen = forcedState === 'dropdown' || showDropdown || isDropdownOpen;

  // Responsive Text & Display Mode overrides
  let displayText = item.content.text;
  let displayMode = item.layout.displayMode;
  let padding = { ...item.spacing.padding };
  let fontSize = item.typography.fontSizePx;

  if (device === 'tablet' && item.responsive?.tablet?.enabled) {
    if (item.responsive.tablet.text !== undefined) displayText = item.responsive.tablet.text;
    if (item.responsive.tablet.displayMode) displayMode = item.responsive.tablet.displayMode;
    if (item.responsive.tablet.padding) padding = { ...item.responsive.tablet.padding };
    if (item.responsive.tablet.fontSizePx) fontSize = item.responsive.tablet.fontSizePx;
  } else if (device === 'mobile' && item.responsive?.mobile?.enabled) {
    if (item.responsive.mobile.text !== undefined) displayText = item.responsive.mobile.text;
    if (item.responsive.mobile.displayMode) displayMode = item.responsive.mobile.displayMode;
    if (item.responsive.mobile.padding) padding = { ...item.responsive.mobile.padding };
    if (item.responsive.mobile.fontSizePx) fontSize = item.responsive.mobile.fontSizePx;
  } else {
    if (device === 'desktop' && item.content.textDesktop !== undefined) {
      displayText = item.content.textDesktop;
    } else if (device === 'tablet' && item.content.textTablet !== undefined) {
      displayText = item.content.textTablet;
    } else if (device === 'mobile' && item.content.textMobile !== undefined) {
      displayText = item.content.textMobile;
    }
  }

  // Determine active icon
  let activeIconName = item.icon.name;
  if (effectiveHovered && item.icon.hoverIcon) activeIconName = item.icon.hoverIcon;
  if (effectivePressed && item.icon.activeIcon) activeIconName = item.icon.activeIcon;
  if (effectiveDisabled && item.icon.disabledIcon) activeIconName = item.icon.disabledIcon;

  // Compute Badge count
  let badgeValue: string | number = '';
  if (item.badge.enabled) {
    switch (item.badge.dataSource) {
      case 'cart_count':
        badgeValue = cartCount;
        break;
      case 'wishlist_count':
        badgeValue = wishlistCount;
        break;
      case 'notifications_count':
        badgeValue = notificationsCount;
        break;
      case 'messages_count':
        badgeValue = messagesCount;
        break;
      case 'custom':
        badgeValue = item.badge.customValue !== undefined ? item.badge.customValue : '';
        break;
    }
  }

  // Background style computation
  let bgStyle: React.CSSProperties = {};
  if (item.background.type === 'solid') {
    bgStyle.backgroundColor = effectiveHovered && item.states.hover.bgColor ? item.states.hover.bgColor : item.background.color;
  } else if (item.background.type === 'linear_gradient') {
    const colors = item.background.gradientColors.length > 0 ? item.background.gradientColors : ['#2563eb', '#1d4ed8'];
    bgStyle.backgroundImage = `linear-gradient(${item.background.gradientAngle || 135}deg, ${colors.join(', ')})`;
  } else if (item.background.type === 'radial_gradient') {
    const colors = item.background.gradientColors.length > 0 ? item.background.gradientColors : ['#3b82f6', '#1e40af'];
    bgStyle.backgroundImage = `radial-gradient(circle, ${colors.join(', ')})`;
  } else if (item.background.type === 'glass') {
    bgStyle.backgroundColor = item.background.color || 'rgba(255, 255, 255, 0.4)';
    bgStyle.backdropFilter = `blur(${item.background.glassmorphism.blur || 12}px)`;
    bgStyle.WebkitBackdropFilter = `blur(${item.background.glassmorphism.blur || 12}px)`;
  } else if (item.background.type === 'transparent') {
    bgStyle.backgroundColor = 'transparent';
  }

  // Hover state overrides
  if (effectiveHovered) {
    if (item.states.hover.bgColor) bgStyle.backgroundColor = item.states.hover.bgColor;
    if (item.states.hover.bgGradient && item.states.hover.bgGradient.length > 0) {
      bgStyle.backgroundImage = `linear-gradient(135deg, ${item.states.hover.bgGradient.join(', ')})`;
    }
  }

  // Border & Radius style
  const borderStyle: React.CSSProperties = {
    borderStyle: item.border.style === 'none' ? 'none' : item.border.style,
    borderTopWidth: `${item.border.width.top}px`,
    borderRightWidth: `${item.border.width.right}px`,
    borderBottomWidth: `${item.border.width.bottom}px`,
    borderLeftWidth: `${item.border.width.left}px`,
    borderColor: effectiveHovered && item.states.hover.borderColor ? item.states.hover.borderColor : item.border.color,
    borderTopLeftRadius: `${item.border.radius.topLeft}px`,
    borderTopRightRadius: `${item.border.radius.topRight}px`,
    borderBottomRightRadius: `${item.border.radius.bottomRight}px`,
    borderBottomLeftRadius: `${item.border.radius.bottomLeft}px`
  };

  // Shadow & Glow style
  let boxShadowValues: string[] = [];
  if (item.shadow.enabled) {
    const { x, y, blur, spread, color, type } = item.shadow;
    boxShadowValues.push(`${type === 'inner' ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}`);
  }
  if (item.shadow.glow.enabled || (effectiveHovered && item.states.hover.glowColor)) {
    const glowColor = (effectiveHovered && item.states.hover.glowColor) || item.shadow.glow.color || '#3b82f6';
    const glowRadius = item.shadow.glow.radius || 12;
    const glowIntensity = item.shadow.glow.intensity || 0.6;
    boxShadowValues.push(`0 0 ${glowRadius}px rgba(59, 130, 246, ${glowIntensity})`);
    if (item.shadow.glow.type === 'neon') {
      boxShadowValues.push(`0 0 ${glowRadius * 2}px ${glowColor}`);
      boxShadowValues.push(`inset 0 0 ${glowRadius / 2}px ${glowColor}`);
    }
  }
  const boxShadow = boxShadowValues.length > 0 ? boxShadowValues.join(', ') : undefined;

  // Transform calculations
  let transformValues: string[] = [];
  let scale = item.transform.scale || 1;
  let translateY = item.transform.translateY || 0;
  let translateX = item.transform.translateX || 0;
  let rotate = item.transform.rotate || 0;

  if (effectiveHovered) {
    if (item.effects.hoverEffect === 'lift') translateY -= 3;
    if (item.effects.hoverEffect === 'scale') scale *= 1.04;
    if (item.states.hover.scale) scale = item.states.hover.scale;
    if (item.states.hover.translateY) translateY += item.states.hover.translateY;
  }
  if (effectivePressed) {
    scale *= 0.97;
    translateY = 0;
  }

  if (translateX || translateY) transformValues.push(`translate(${translateX}px, ${translateY}px)`);
  if (scale !== 1) transformValues.push(`scale(${scale})`);
  if (rotate) transformValues.push(`rotate(${rotate}deg)`);
  if (item.transform.skewX) transformValues.push(`skewX(${item.transform.skewX}deg)`);
  if (item.transform.skewY) transformValues.push(`skewY(${item.transform.skewY}deg)`);

  if (item.transform.enable3d) {
    if (item.transform.rotateX) transformValues.push(`rotateX(${item.transform.rotateX}deg)`);
    if (item.transform.rotateY) transformValues.push(`rotateY(${item.transform.rotateY}deg)`);
  }

  const transform = transformValues.length > 0 ? transformValues.join(' ') : undefined;

  // Text styling
  const textColor = effectiveHovered && item.states.hover.textColor
    ? item.states.hover.textColor
    : item.typography.color;

  const showIconOnly = displayMode === 'icon_only';
  const showTextOnly = displayMode === 'text_only';
  const hasIcon = item.icon.show && !showTextOnly;
  const hasText = !showIconOnly && Boolean(displayText);

  return (
    <div className="relative inline-block" onClick={onSelect}>
      {/* Selection outline when in visual editor */}
      {isSelected && (
        <div className="absolute -inset-1.5 border-2 border-blue-500 rounded-xl pointer-events-none z-30 animate-pulse ring-4 ring-blue-500/20" />
      )}

      <button
        id={item.content.customId || `btn_${item.id}`}
        type="button"
        disabled={effectiveDisabled}
        aria-label={item.content.ariaLabel || item.name}
        title={item.content.tooltip || undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={(e) => {
          if (item.dropdown.enabled) {
            setIsDropdownOpen(!isDropdownOpen);
          }
          if (onClick) onClick();
        }}
        style={{
          ...bgStyle,
          ...borderStyle,
          boxShadow,
          transform,
          color: textColor,
          fontFamily: item.typography.fontFamily === 'serif' ? 'serif' : item.typography.fontFamily === 'mono' ? 'monospace' : 'inherit',
          fontSize: `${fontSize}px`,
          fontWeight: item.typography.fontWeight,
          lineHeight: item.typography.lineHeight,
          letterSpacing: item.typography.letterSpacing === 'tighter' ? '-0.05em' : item.typography.letterSpacing === 'wide' ? '0.05em' : item.typography.letterSpacing === 'widest' ? '0.1em' : 'normal',
          textTransform: item.typography.textTransform,
          textDecoration: item.typography.textDecoration,
          paddingTop: `${padding.top}px`,
          paddingRight: `${padding.right}px`,
          paddingBottom: `${padding.bottom}px`,
          paddingLeft: `${padding.left}px`,
          marginTop: `${item.spacing.margin.top}px`,
          marginRight: `${item.spacing.margin.right}px`,
          marginBottom: `${item.spacing.margin.bottom}px`,
          marginLeft: `${item.spacing.margin.left}px`,
          width: item.layout.widthType === 'fixed' || item.layout.widthType === 'custom' ? item.layout.width : item.layout.widthType === 'full' ? '100%' : 'auto',
          height: item.layout.height || 'auto',
          minWidth: item.layout.minWidth || undefined,
          maxWidth: item.layout.maxWidth || undefined,
          opacity: effectiveDisabled ? 0.5 : item.background.opacity,
          cursor: effectiveDisabled ? 'not-allowed' : item.layout.cursor || 'pointer',
          position: item.layout.positioning || 'relative',
          overflow: item.layout.overflow || 'visible',
          transition: `all ${item.useGlobalStyles ? 200 : 180}ms cubic-bezier(0.16, 1, 0.3, 1)`
        }}
        className={`relative flex items-center justify-center select-none group focus:outline-none ${
          item.icon.position === 'top' ? 'flex-col gap-1' : item.icon.position === 'bottom' ? 'flex-col-reverse gap-1' : item.icon.position === 'right' ? 'flex-row-reverse' : 'flex-row'
        } ${effectiveLoading ? 'cursor-wait pointer-events-none' : ''}`}
      >
        {/* Shine Animation overlay */}
        {item.effects.shine.enabled && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit]">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-[shimmer_2s_infinite] -translate-x-full" />
          </div>
        )}

        {/* Loading Spinner overlay */}
        {effectiveLoading ? (
          <div className="flex items-center gap-2">
            <LucideIcons.Loader2 className="w-4 h-4 animate-spin" />
            <span>Wczytywanie...</span>
          </div>
        ) : (
          <>
            {/* Icon Renderer */}
            {hasIcon && (
              <span
                style={{
                  marginRight: item.icon.position === 'left' && hasText ? `${item.icon.gapPx}px` : undefined,
                  marginLeft: item.icon.position === 'right' && hasText ? `${item.icon.gapPx}px` : undefined,
                  opacity: item.icon.opacity || 1
                }}
                className={`flex items-center justify-center shrink-0 ${
                  item.icon.animation === 'rotate' && effectiveHovered ? 'animate-spin' : ''
                } ${item.icon.animation === 'pulse' ? 'animate-pulse' : ''} ${
                  item.icon.animation === 'bounce' && effectiveHovered ? 'animate-bounce' : ''
                }`}
              >
                {renderIconComponent(activeIconName, item.icon.sizePx, item.icon.color || textColor)}
              </span>
            )}

            {/* Text Label */}
            {hasText && (
              <span className="truncate whitespace-nowrap">
                {displayText}
              </span>
            )}

            {/* Badge Counter */}
            {item.badge.enabled && Boolean(badgeValue !== '' && badgeValue !== 0) && (
              <span
                style={{
                  position: 'absolute',
                  top: item.badge.position.includes('top') ? `${item.badge.offsetY}px` : undefined,
                  bottom: item.badge.position.includes('bottom') ? `${item.badge.offsetY}px` : undefined,
                  right: item.badge.position.includes('right') ? `${item.badge.offsetX}px` : undefined,
                  left: item.badge.position.includes('left') ? `${item.badge.offsetX}px` : undefined,
                  backgroundColor: item.badge.bgColor,
                  color: item.badge.textColor,
                  fontSize: `${Math.max(10, item.badge.sizePx - 7)}px`,
                  minWidth: `${item.badge.sizePx}px`,
                  height: `${item.badge.sizePx}px`,
                  borderRadius: `${item.badge.borderRadius}px`,
                  borderWidth: `${item.badge.borderWidth}px`,
                  borderColor: item.badge.borderColor
                }}
                className={`flex items-center justify-center font-bold px-1 z-20 shadow-xs pointer-events-none ${
                  item.badge.pulseAnimation ? 'animate-pulse' : ''
                }`}
              >
                {badgeValue}
              </span>
            )}
          </>
        )}
      </button>

      {/* Dropdown Panel rendering */}
      {item.dropdown.enabled && effectiveDropdownOpen && item.dropdown.items && (
        <div
          style={{
            width: `${item.dropdown.widthPx || 260}px`,
            backgroundColor: item.dropdown.bgColor || '#ffffff',
            borderColor: item.dropdown.borderColor || '#e2e8f0',
            borderRadius: `${item.dropdown.borderRadius || 12}px`
          }}
          className={`absolute top-full mt-2 z-50 p-2 shadow-2xl border ${
            item.dropdown.position === 'bottom-left' ? 'left-0' : item.dropdown.position === 'bottom-center' ? 'left-1/2 -translate-x-1/2' : 'right-0'
          }`}
        >
          <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
            <span>{item.name}</span>
            <span className="text-[10px] text-blue-600 font-normal">Podgląd dropdown</span>
          </div>
          <div className="py-1 max-h-64 overflow-y-auto divide-y divide-slate-50">
            {item.dropdown.items.map((sub, idx) => (
              sub.isDivider ? (
                <div key={idx} className="my-1 border-t border-slate-100" />
              ) : (
                <div
                  key={sub.id || idx}
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {sub.icon && renderIconComponent(sub.icon, 15, '#64748b')}
                    <span>{sub.label}</span>
                  </div>
                  {sub.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded">
                      {sub.badge}
                    </span>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
