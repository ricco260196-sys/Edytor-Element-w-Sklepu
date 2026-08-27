import React, { useState } from 'react';
import { useStoreAppearance } from '../../context/StoreAppearanceContext';
import { EditorLayout3Col, DeviceViewport } from './shared/EditorLayout3Col';
import { FooterStructureColumn } from './footer/FooterStructureColumn';
import { FooterLiveCanvas } from './footer/FooterLiveCanvas';
import { FooterConfigColumn } from './footer/FooterConfigColumn';
import { AddFooterSectionModal } from './footer/AddFooterSectionModal';
import { LayoutGrid, Sparkles } from 'lucide-react';
import { FooterSectionItem } from '../../types/footerEditor';

interface FooterEditorProps {
  onSelectModule: (module: any) => void;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({ onSelectModule }) => {
  const {
    state,
    updateFooter,
    resetFooter,
    selectedFooterSectionId,
    setSelectedFooterSectionId
  } = useStoreAppearance();

  const [deviceViewport, setDeviceViewport] = useState<DeviceViewport>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'element' | 'full_header'>('element');
  const [activeConfigTab, setActiveConfigTab] = useState<string>('general');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const footer = state.footer;

  const handleAddSection = (newSection: FooterSectionItem) => {
    updateFooter(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setSelectedFooterSectionId(newSection.id);
    setActiveConfigTab('sections');
  };

  const handleSelectSection = (sectionId: string) => {
    setSelectedFooterSectionId(sectionId);
    setActiveConfigTab('sections');
  };

  const handleSelectSubElement = (elementKey: string) => {
    setSelectedFooterSectionId(elementKey);
    setActiveConfigTab(elementKey);
  };

  return (
    <>
      <EditorLayout3Col
        moduleTitle="Edytor Stopki Sklepu"
        moduleSubtitle="Jeden główny element: wielokolumnowy układ, brand, odznaki zaufania, płatności, newsletter"
        moduleIcon={<LayoutGrid className="w-5 h-5 text-blue-400" />}
        activeModule="footer"
        onSelectModule={onSelectModule}
        leftColumnContent={
          <FooterStructureColumn
            onOpenAddModal={() => setIsAddModalOpen(true)}
            activeConfigTab={activeConfigTab}
            setActiveConfigTab={setActiveConfigTab}
          />
        }
        centerCanvasContent={
          <FooterLiveCanvas
            onSelectSection={handleSelectSection}
            onSelectSubElement={handleSelectSubElement}
          />
        }
        rightColumnContent={
          <FooterConfigColumn
            activeConfigTab={activeConfigTab}
            setActiveConfigTab={setActiveConfigTab}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        }
        deviceViewport={deviceViewport}
        onDeviceChange={setDeviceViewport}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetToDefaults={() => resetFooter('all')}
        selectedElementName={
          selectedFooterSectionId === 'brand'
            ? 'Tożsamość & Logo'
            : selectedFooterSectionId === 'newsletter'
            ? 'Newsletter VIP'
            : selectedFooterSectionId === 'contact'
            ? 'Centrum Kontaktu'
            : selectedFooterSectionId === 'socialMedia'
            ? 'Social Media'
            : selectedFooterSectionId === 'payments'
            ? 'Metody Płatności'
            : selectedFooterSectionId === 'trustBadges'
            ? 'Odznaki Zaufania'
            : selectedFooterSectionId === 'bottomBar'
            ? 'Dolny Pasek'
            : footer.sections.find(s => s.id === selectedFooterSectionId)?.title || 'Główna Stopka Sklepu'
        }
        onDeselectElement={() => setSelectedFooterSectionId(null)}
        isModified={true}
      />

      {/* Add Section Modal */}
      <AddFooterSectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSection={handleAddSection}
      />
    </>
  );
};
