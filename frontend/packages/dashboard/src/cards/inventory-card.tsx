import * as React from 'react';
import { CardProps } from '@patternfly/dashboard/src/types';
import CardIcon from '@patternfly/react-icons/dist/esm/icons/chart-pie-icon';
import { InventoryCard } from '@console/internal/components/dashboard/dashboards-page/cluster-dashboard/inventory-card';

export const Icon = CardIcon;

export const Card: React.FC<CardProps<{}>> = () => <InventoryCard />;
