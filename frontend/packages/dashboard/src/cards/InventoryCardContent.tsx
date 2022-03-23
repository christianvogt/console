import * as React from 'react';
import { CardProps } from '@patternfly/dashboard/src/types';
import { InventoryCard } from '@console/internal/components/dashboard/dashboards-page/cluster-dashboard/inventory-card';

const InventoryCardContent: React.FC<CardProps<{}>> = () => <InventoryCard />;

export default InventoryCardContent;
