import * as React from 'react';
import { CardProps } from '@patternfly/dashboard/src/types';
import CardIcon from '@patternfly/react-icons/dist/esm/icons/chart-pie-icon';
import { ActivityCard } from '../../../../public/components/dashboard/dashboards-page/cluster-dashboard/activity-card';

export const Icon = <CardIcon />;
export const ActivityCardContent: React.FC<CardProps<{}>> = () => <ActivityCard />;

export default ActivityCardContent;
