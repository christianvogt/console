import * as React from 'react';
import { CardProps } from '@patternfly/dashboard/src/types';
import { UtilizationCard } from '@console/internal/components/dashboard/dashboards-page/cluster-dashboard/utilization-card';

const UtilizationCardContent: React.FC<CardProps<{}>> = () => <UtilizationCard />;

export default UtilizationCardContent;
