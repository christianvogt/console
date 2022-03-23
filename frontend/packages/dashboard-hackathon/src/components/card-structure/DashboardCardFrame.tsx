import * as React from 'react';
import { Card } from '@patternfly/react-core';
import { CardConfig } from '../../types';

import './DashboardCardFrame.scss';

type Props = {
  config: CardConfig;
  readonly?: boolean;
  children: React.ReactNode;
};

const DashboardCardFrame: React.FC<Props> = ({ config, readonly, children }) => (
  <Card
    isFullHeight
    isPlain={config.frameless}
    style={{ overflow: 'hidden', pointerEvents: readonly ? 'auto' : 'none' }}
    className="pf-dashboard-card-frame"
  >
    {children}
  </Card>
);

export default DashboardCardFrame;
