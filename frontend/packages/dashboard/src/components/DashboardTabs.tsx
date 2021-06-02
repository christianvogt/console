import * as React from 'react';
import { Tabs } from '@patternfly/react-core';

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
  const setActiveKeyCb = React.useCallback<React.ComponentProps<typeof Tabs>['onSelect']>(
    (e, key) => {
      // uncontrolled
      if (selected == null) {
        setActiveKey(key.toString());
      }
      if (onChange) {
        onChange(key.toString());
      }
    },
    [selected, onChange],
  );

  const activeKey = React.useMemo(() => {
    return selected ?? activeKeyState;
  }, [selected, activeKeyState]);
  return (
    <Tabs unmountOnExit activeKey={activeKey} onSelect={setActiveKeyCb}>
      {children}
    </Tabs>
  );
};

export default DashboardTabs;
