import * as React from 'react';
import { CardProps } from '@patternfly/dashboard/src/types';
import CardIcon from '@patternfly/react-icons/dist/esm/icons/chart-pie-icon';
import { DetailsCard } from '@console/internal/components/dashboard/dashboards-page/cluster-dashboard/details-card';

export const Icon = CardIcon;

export const Card: React.FC<CardProps<{}>> = () => <DetailsCard />;
