import React from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { DeviceViewport } from '../shared/EditorLayout3Col';
import { AVAILABLE_TOPBAR_ELEMENTS } from './TopBarContentColumn';
import { StoreHeader } from '../../storefront/StoreHeader';
import {
  Tag,
  Phone,
  Mail,
  MapPin,
  Clock,
  LogIn,
  UserPlus,
  User,
  ShoppingBag,
  Heart,
  Share2,
  Info
} from 'lucide-react';

interface TopBarInteractiveCanvasProps {
  deviceViewport: DeviceViewport;
  zoomLevel: number;
  viewMode: 'element' | 'full_header';
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
}

export const TopBarInteractiveCanvas: React.FC<TopBarInteractiveCanvasProps> = ({
  deviceViewport,
  zoomLevel,
  viewMode,
  selectedElementId,
  onSelectElement
}) => {
  const { state } = useStoreAppearance();
  const { topBar } = state;

  const containerWidthClass =
    deviceViewport === 'mobile'
      ? 'w-[420px]'
      : deviceViewport === 'tablet'
      ? 'w-[768px]'
      : 'w-full max-w-6xl';

  const renderTopBarElementInCanvas = (elemId: string) => {
    const custom = topBar.elementSettings[elemId] || {};
    const isSelected = selectedElementId === elemId;
    const baseType = elemId.split('-')[0];

    const elemStyle: React.CSSProperties = {
      backgroundColor: custom.customBgColor || 'transparent',
      color: custom.customColor || topBar.textColor || '#ffffff',
      borderRadius: custom.customBorderRadius ? `${custom.customBorderRadius}px` : '4px',
      padding: custom.customPadding ? `${parseInt(custom.customPadding) * 2}px ${parseInt(custom.customPadding) * 4}px` : '2px 6px',
      fontWeight: custom.customFontWeight === 'bold' ? 700 : custom.customFontWeight === 'semibold' ? 600 : custom.customFontWeight === 'medium' ? 500 : 400,
      fontSize: custom.customFontSize === 'text-xs' ? '11px' : custom.customFontSize === 'text-base' ? '14px' : custom.customFontSize === 'text-sm' ? '13px' : '12px'
    };

    let innerContent: React.ReactNode = null;

    switch (baseType) {
      case 'promo':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1.5 truncate">
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
          </div>
        );
        break;
      case 'phone':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1.5 shrink-0">
            <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#34d399' }} />
            <span>{custom.customText || topBar.phone || '+48 515 444 577'}</span>
          </div>
        );
        break;
      case 'email':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1.5 shrink-0">
            <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#38bdf8' }} />
            <span>{custom.customText || topBar.email || 'kontakt@openmarket.pl'}</span>
          </div>
        );
        break;
      case 'location':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1.5 shrink-0">
            <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#f43f5e' }} />
            <span>{custom.customText || topBar.location || 'Warszawa, Polska'}</span>
          </div>
        );
        break;
      case 'hours':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: custom.iconColor || '#c084fc' }} />
            <span>{custom.customText || topBar.workingHours || 'Pn-Pt: 8:00 - 18:00'}</span>
          </div>
        );
        break;
      case 'login':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1 shrink-0">
            <LogIn className="w-3.5 h-3.5" />
            <span>{custom.customText || 'Zaloguj się'}</span>
          </div>
        );
        break;
      case 'register':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1 shrink-0">
            <UserPlus className="w-3.5 h-3.5" />
            <span>{custom.customText || 'Rejestracja'}</span>
          </div>
        );
        break;
      case 'account':
        innerContent = (
          <div style={elemStyle} className="inline-flex items-center gap-1 shrink-0">
            <User className="w-3.5 h-3.5" />
            <span>{custom.customText || 'Moje Konto'}</span>
          </div>
        );
        break;
      case 'social':
        innerContent = (
          <div style={elemStyle} className="flex items-center gap-1.5 shrink-0">
            {topBar.socialItems.map((soc, idx) => (
              <span
                key={idx}
                className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold uppercase"
              >
                {soc.platform.slice(0, 1)}
              </span>
            ))}
          </div>
        );
        break;
      case 'separator':
        innerContent = <span className="opacity-30 mx-1 select-none">|</span>;
        break;
      default:
        innerContent = (
          <div style={elemStyle} className="truncate">
            {custom.customText || elemId}
          </div>
        );
        break;
    }

    return (
      <div
        key={elemId}
        onClick={(e) => {
          e.stopPropagation();
          onSelectElement(elemId);
        }}
        className={`relative group cursor-pointer transition-all rounded-md px-1 py-0.5 ${
          isSelected
            ? 'ring-2 ring-blue-500 bg-blue-500/20 shadow-xs'
            : 'hover:ring-1 hover:ring-blue-400/60'
        }`}
      >
        {innerContent}
      </div>
    );
  };

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto relative bg-slate-950/60 custom-scrollbar"
      onClick={() => onSelectElement(null)}
    >
      <div
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out'
        }}
        className={`${containerWidthClass} transition-all duration-200`}
      >
        {/* Device Frame Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-t-xl px-4 py-2 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[11px] text-slate-400">
              Podgląd Na Żywo: {deviceViewport.toUpperCase()}
            </span>
          </div>

          <span className="text-[10px] text-slate-500 font-mono">
            {viewMode === 'full_header' ? 'Cały nagłówek' : 'Tylko TopBar'}
          </span>
        </div>

        {/* Live Canvas Area */}
        <div className="bg-white border-x border-b border-slate-800 rounded-b-xl shadow-2xl overflow-hidden">
          {viewMode === 'full_header' ? (
            <StoreHeader />
          ) : (
            <div
              id="topbar-isolated-canvas"
              className={`w-full transition-all ${topBar.glassmorphism ? 'backdrop-blur-md' : ''}`}
              style={{
                backgroundColor: topBar.backgroundColor || '#0f172a',
                color: topBar.textColor || '#ffffff',
                borderBottom: topBar.borderBottom
                  ? `${topBar.borderBottomWidth || 1}px ${topBar.borderStyle || 'solid'} ${topBar.borderBottomColor || '#1e293b'}`
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
                  : undefined
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
                        : 'justify-center';

                    return (
                      <div
                        key={zone.id}
                        className={`flex flex-row items-center gap-2 flex-nowrap whitespace-nowrap overflow-hidden shrink-0 border border-dashed border-white/10 p-1 rounded ${alignClass}`}
                        style={{
                          width: `${zone.width}%`,
                          paddingLeft: `${zone.paddingX || 6}px`,
                          paddingRight: `${zone.paddingX || 6}px`
                        }}
                      >
                        {zone.elements
                          .filter((e) => e.enabled !== false)
                          .map((e) => renderTopBarElementInCanvas(e.id))}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
