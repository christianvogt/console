import * as React from 'react';
import { Catalog, Dashboard } from '@patternfly/dashboard';
import { DashboardAPI } from '@patternfly/dashboard/src/components/dashboard/Dashboard';
import TabEditorModal from '@patternfly/dashboard/src/components/tab-editor/TabEditorModal';
import {
  Button,
  Modal,
  ModalVariant,
  Stack,
  StackItem,
  Switch,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';

type DashboardWrapperProps = {
  basePath?: string;
};

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ basePath }) => {
  const [catalogOpen, setCatalogOpen] = React.useState(false);
  const [tabEditorOpen, setTabEditorOpen] = React.useState(false);
  const [readonly, setReadonly] = React.useState(true);

  const dashboardProviderAPI = React.useRef<DashboardAPI>(null);

  return (
    <>
      <Stack style={{ flexGrow: 1 }}>
        <StackItem>
          <Toolbar>
            <ToolbarContent>
              <ToolbarGroup alignment={{ default: 'alignRight' }}>
                <ToolbarItem>
                  <Button onClick={() => setCatalogOpen(true)}>Add Card</Button>
                </ToolbarItem>
                <ToolbarItem>
                  <Button onClick={() => setTabEditorOpen(true)}>Configure Tabs</Button>
                </ToolbarItem>
                <ToolbarItem>
                  <Button onClick={() => dashboardProviderAPI.current?.fullscreenToggle()}>
                    Fullscreen
                  </Button>
                </ToolbarItem>
                <ToolbarItem>
                  <Switch
                    label="Editable"
                    checked={!readonly}
                    onChange={() => setReadonly((v) => !v)}
                  />
                </ToolbarItem>
              </ToolbarGroup>
            </ToolbarContent>
          </Toolbar>
        </StackItem>
        <StackItem isFilled style={{ display: 'flex', overflow: 'hidden' }}>
          <Dashboard basePath={basePath} ref={dashboardProviderAPI} readonly={readonly} />
        </StackItem>
      </Stack>
      {tabEditorOpen && <TabEditorModal isOpen onClose={() => setTabEditorOpen(false)} />}
      {catalogOpen && (
        <Modal isOpen onClose={() => setCatalogOpen(false)} variant={ModalVariant.large}>
          <Catalog onCardAdded={() => setCatalogOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default DashboardWrapper;
