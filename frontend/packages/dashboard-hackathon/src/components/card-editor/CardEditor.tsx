import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  Form,
} from '@patternfly/react-core';
import { CardConfig } from '../../types';
import CardEditorPreview from './CardEditorPreview';
import CardEditorSettings from './CardEditorSettings';
import CardEditorDefaultSettings from './CardEditorDefaultSettings';
import DashboardSelector from './DashboardSelector';

import './CardEditor.scss';

type Props = {
  tabId: string;
  onChange: (config: CardConfig, tabId: string) => void;
  config: CardConfig;
};

const CardEditor: React.FC<Props> = ({ config, tabId, onChange }) => {
  return (
    <Drawer isExpanded className="catalog" isInline>
      <DrawerContent
        panelContent={
          <DrawerPanelContent
            isResizable
            id="right-resize-panel"
            defaultSize={'500px'}
            minSize={'300px'}
          >
            <DrawerHead>
              <Form>
                <DashboardSelector tabId={tabId} onChange={(tabId) => onChange(config, tabId)} />
                <CardEditorDefaultSettings config={config} onChange={(c) => onChange(c, tabId)} />
                <CardEditorSettings config={config} onChange={(c) => onChange(c, tabId)} />
              </Form>
            </DrawerHead>
          </DrawerPanelContent>
        }
      >
        <DrawerContentBody>
          <div className="pf-dashboard-card-editor__preview">
            <CardEditorPreview config={config} />
          </div>
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CardEditor;
