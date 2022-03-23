import * as React from 'react';
import { Tabs } from '@patternfly/react-core';

import './DashboardTabs.scss';

type Props = {
  children?: React.ReactNode;

  // controlled operation
  selected?: string;

  // uncontrolled default active ID
  defaultSelected?: string;

  // notify selection change
  onChange?: (id: string) => void;
};

const DashboardTabs: React.FC<Props> = ({ children, selected, onChange, defaultSelected }) => {
  const [activeKeyState, setActiveKey] = React.useState(selected ?? defaultSelected);
  const setActiveKeyCb = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: string | number) => {
      // uncontrolled
      if (selected == null) {
        setActiveKey(eventKey.toString());
      }
      if (onChange) {
        onChange(eventKey.toString());
      }
    },
    [selected, onChange],
  );

  const activeKey = React.useMemo(() => {
    return selected ?? activeKeyState;
  }, [selected, activeKeyState]);
  return (
    <Tabs
      unmountOnExit
      activeKey={activeKey}
      onSelect={setActiveKeyCb}
      className="pf-dashboard-tabs"
    >
      {children}
    </Tabs>
  );
};

export default DashboardTabs;
