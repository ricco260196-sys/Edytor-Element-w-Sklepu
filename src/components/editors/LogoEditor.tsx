import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { LogoContentColumn } from './logo/LogoContentColumn';
import { LogoInteractiveCanvas } from './logo/LogoInteractiveCanvas';
import { LogoStyleColumn } from './logo/LogoStyleColumn';
import { Sparkles } from 'lucide-react';
import { DEFAULT_LOGO } from '../../data/defaultAppearance';

interface LogoEditorProps {
  onSelectModule: (module: 'topbar' | 'logo' | 'menu' | 'search' | 'buttons' | 'actions' | 'categories' | 'overview') => void;
}

export const LogoEditor: React.FC<LogoEditorProps> = ({ onSelectModule }) => {
  const { updateLogo, triggerToast } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');

  const handleResetToDefaults = () => {
    updateLogo(DEFAULT_LOGO);
    triggerToast('info', 'Przywrócono domyślne', 'Ustawienia Logo zostały zresetowane.');
  };

  return (
    <EditorLayout3Col
      moduleTitle="Logo Sklepu (Brand Identity)"
      moduleSubtitle="Moduł 2 z 4: Identyfikacja wizualna, sygnet i typografia"
      moduleIcon={<Sparkles className="w-4 h-4" />}
      activeModule="logo"
      onSelectModule={onSelectModule}
      leftColumnContent={<LogoContentColumn />}
      centerCanvasContent={
        <LogoInteractiveCanvas
          deviceViewport={deviceViewport}
          zoomLevel={zoomLevel}
          viewMode={viewMode}
        />
      }
      rightColumnContent={<LogoStyleColumn />}
      deviceViewport={deviceViewport}
      onDeviceChange={setDeviceViewport}
      zoomLevel={zoomLevel}
      onZoomChange={setZoomLevel}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      onResetToDefaults={handleResetToDefaults}
    />
  );
};
