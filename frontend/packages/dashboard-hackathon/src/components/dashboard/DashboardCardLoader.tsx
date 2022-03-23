import * as React from 'react';
import { CardConfig } from '../../types';
import { useCardContentComponent } from '../../utils/card-utils';

type Props = {
  config: CardConfig;
  children: (ContentComponent: React.ComponentType<any>) => React.ReactElement<any, any> | null;
};

const DashboardCardLoader: React.FC<Props> = ({ config, children }) => {
  const Component = useCardContentComponent(config.type);
  return Component ? <React.Suspense fallback={null}>{children(Component)}</React.Suspense> : null;
};

export default DashboardCardLoader;
