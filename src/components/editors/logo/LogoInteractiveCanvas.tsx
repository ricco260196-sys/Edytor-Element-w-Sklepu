import React from 'react';
import { useStoreAppearance } from '../../../context/StoreAppearanceContext';
import { DeviceViewport } from '../shared/EditorLayout3Col';
import { StoreHeader } from '../../storefront/StoreHeader';
import { IconRenderer } from '../../common/IconRenderer';

interface LogoInteractiveCanvasProps {
  deviceViewport: DeviceViewport;
  zoomLevel: number;
  viewMode: 'element' | 'full_header';
}

export const LogoInteractiveCanvas: React.FC<LogoInteractiveCanvasProps> = ({
  deviceViewport,
  zoomLevel,
  viewMode
}) => {
  const { state } = useStoreAppearance();
  const { logo } = state;

  const containerWidthClass =
    deviceViewport === 'mobile'
      ? 'w-[420px]'
      : deviceViewport === 'tablet'
      ? 'w-[768px]'
      : 'w-full max-w-6xl';

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

  const sygnetDimension = logo.sygnetSize || Math.max(24, Math.round(logo.desktopHeight * 0.65));

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto relative bg-slate-950/60 custom-scrollbar">
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
            {viewMode === 'full_header' ? 'Cały nagłówek' : 'Tylko Logo'}
          </span>
        </div>

        {/* Live Canvas Area */}
        <div className="bg-white border-x border-b border-slate-800 rounded-b-xl shadow-2xl overflow-hidden p-8 flex items-center justify-center min-h-[220px]">
          {viewMode === 'full_header' ? (
            <div className="w-full">
              <StoreHeader />
            </div>
          ) : (
            <div className="p-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center">
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
                <div className="flex flex-col text-center">
                  <span className={`leading-none ${fontClass}`} style={logoTextStyle}>
                    {logo.textName || 'MarketPlace PRO'}
                  </span>
                  {logo.showTagline && logo.tagline && (
                    <span
                      className="mt-1 text-[11px] leading-none text-slate-500"
                      style={{ color: logo.taglineColor || '#64748b', fontSize: `${logo.taglineFontSize || 11}px` }}
                    >
                      {logo.tagline}
                    </span>
                  )}
                </div>
              ) : (
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
                        className="mt-1 text-[11px] leading-none text-slate-500"
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
        </div>
      </div>
    </div>
  );
};
