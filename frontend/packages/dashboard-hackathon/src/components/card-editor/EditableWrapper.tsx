import * as React from 'react';
import { CardConfig } from '../../types';
import DashboardContext from '../../utils/DashboardContext';

type Props = {
  config: CardConfig;
  readonly?: boolean;
  children: React.ReactNode;
};

const EditableWrapper: React.FC<Props> = ({ config, readonly, children }) => {
  const { editCard } = React.useContext(DashboardContext);
  return (
    <div
      style={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      // TODO this is a simple solution to enter edit mode for now
      onDoubleClick={!readonly ? () => editCard(config) : undefined}
    >
      {children}
    </div>
  );
};

export default EditableWrapper;
