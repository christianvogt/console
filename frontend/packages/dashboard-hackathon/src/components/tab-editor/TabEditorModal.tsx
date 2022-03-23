import * as React from 'react';
import { Button, Modal, ModalVariant } from '@patternfly/react-core';
import TabEditor from './TabEditor';
import DashboardContext from '../../utils/DashboardContext';

type TabEditorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TabEditorModal: React.FC<TabEditorModalProps> = ({ isOpen, onClose }) => {
  const { dashboard, updateTabs } = React.useContext(DashboardContext);

  const [tabs, setTabs] = React.useState([...dashboard.tabs]);

  return (
    <Modal
      variant={ModalVariant.medium}
      title="Tab Configurations"
      isOpen={isOpen}
      onClose={onClose}
      showClose={false}
      actions={[
        <Button
          key="save"
          variant="primary"
          onClick={() => {
            updateTabs(tabs);
            onClose();
          }}
        >
          Save
        </Button>,
        <Button key="cancel" variant="link" onClick={() => onClose()}>
          Cancel
        </Button>,
      ]}
    >
      <TabEditor tabs={tabs} updateTabs={setTabs} />
    </Modal>
  );
};

export default TabEditorModal;
