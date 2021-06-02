import * as React from 'react';
import { SyncMarkdownView } from '@console/internal/components/markdown-view';
import DashboardCard from '@console/shared/src/components/dashboard/dashboard-card/DashboardCard';
import DashboardCardHeader from '@console/shared/src/components/dashboard/dashboard-card/DashboardCardHeader';
import DashboardCardTitle from '@console/shared/src/components/dashboard/dashboard-card/DashboardCardTitle';
import DashboardCardBody from '@console/shared/src/components/dashboard/dashboard-card/DashboardCardBody';

import { WidgetProps } from '../../../types';

type Props = WidgetProps<{ markdown: string }>;

const MarkdownWidget: React.FC<Props> = ({ config }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>{config.label}</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody>
      <SyncMarkdownView content={config.settings?.markdown} inline />
    </DashboardCardBody>
  </DashboardCard>
);

export default MarkdownWidget;
