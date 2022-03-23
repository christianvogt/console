import * as React from 'react';
import { CardConfig } from '../../types';
import { useCardSettingsComponent } from '../../utils/card-utils';

type Props = {
  config: CardConfig;
  children: (ContentComponent: React.ComponentType<any>) => React.ReactElement<any, any> | null;
};

const DashboardCardSettingsLooader: React.FC<Props> = ({ config, children }) => {
  const Component = useCardSettingsComponent(config.type);
  return Component ? <React.Suspense fallback={null}>{children(Component)}</React.Suspense> : null;
};

export default DashboardCardSettingsLooader;
