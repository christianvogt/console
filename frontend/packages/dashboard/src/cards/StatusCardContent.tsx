import * as React from 'react';
import { CardProps } from '@patternfly/dashboard/src/types';
import { StatusCard } from '../../../../public/components/dashboard/dashboards-page/cluster-dashboard/status-card';

const StatusCardContent: React.FC<CardProps<{}>> = () => <StatusCard />;

export default StatusCardContent;
