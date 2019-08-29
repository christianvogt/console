import * as React from 'react';
import * as _ from 'lodash';
import { DashboardCard } from '@console/internal/components/dashboard/dashboard-card/card';
import { DashboardCardBody } from '@console/internal/components/dashboard/dashboard-card/card-body';
import { DashboardCardHeader } from '@console/internal/components/dashboard/dashboard-card/card-header';
import { DashboardCardTitle } from '@console/internal/components/dashboard/dashboard-card/card-title';
import {
  DashboardItemProps,
  withDashboardResources,
} from '@console/internal/components/dashboards-page/with-dashboard-resources';
import { FirehoseResource } from '@console/internal/components/utils';
import {
  getNodeStatusGroups,
  getPVCStatusGroups,
  getPVStatusGroups,
} from '@console/internal/components/dashboard/inventory-card/utils';
import { K8sResourceKind } from '@console/internal/module/k8s';
import {
  NodeModel,
  PersistentVolumeClaimModel,
  PersistentVolumeModel,
  StorageClassModel,
} from '@console/internal/models';
import { InventoryBody } from '@console/internal/components/dashboard/inventory-card/inventory-body';
import { ResourceInventoryItem } from '@console/internal/components/dashboard/inventory-card/inventory-item';
import { getCephNodes, getCephPVs, getCephPVCs, getCephSC } from '../../../selectors';

const k8sResources: FirehoseResource[] = [
  {
    isList: true,
    kind: PersistentVolumeModel.kind,
    prop: 'pvs',
  },
  {
    isList: true,
    kind: NodeModel.kind,
    prop: 'nodes',
  },
  {
    isList: true,
    kind: PersistentVolumeClaimModel.kind,
    prop: 'pvcs',
  },
  {
    isList: true,
    kind: StorageClassModel.kind,
    prop: 'sc',
  },
];

const InventoryCard: React.FC<DashboardItemProps> = ({
  watchK8sResource,
  stopWatchK8sResource,
  resources,
}) => {
  React.useEffect(() => {
    k8sResources.forEach((r) => watchK8sResource(r));
    return () => {
      k8sResources.forEach((r) => stopWatchK8sResource(r));
    };
  }, [watchK8sResource, stopWatchK8sResource]);

  const nodesLoaded = _.get(resources.nodes, 'loaded');
  const nodesLoadError = _.get(resources.nodes, 'loadError');
  const nodesData = _.get(resources.nodes, 'data', []) as K8sResourceKind[];

  const pvcsLoaded = _.get(resources.pvcs, 'loaded');
  const pvcsLoadError = _.get(resources.pvcs, 'loadError');
  const pvcsData = _.get(resources.pvcs, 'data', []) as K8sResourceKind[];

  const pvsLoaded = _.get(resources.pvs, 'loaded');
  const pvsLoadError = _.get(resources.pvs, 'loadError');
  const pvsData = _.get(resources.pvs, 'data', []) as K8sResourceKind[];

  const scData = _.get(resources.sc, 'data', []) as K8sResourceKind[];
  const filteredCephSC = getCephSC(scData);
  const filteredSCNames = filteredCephSC.map((sc) => _.get(sc, 'metadata.name'));

  return (
    <DashboardCard>
      <DashboardCardHeader>
        <DashboardCardTitle>Inventory</DashboardCardTitle>
      </DashboardCardHeader>
      <DashboardCardBody>
        <InventoryBody>
          <ResourceInventoryItem
            isLoading={!nodesLoaded}
            error={!!nodesLoadError}
            kind={NodeModel}
            resources={getCephNodes(nodesData)}
            mapper={getNodeStatusGroups}
            showLink={false}
          />
          <ResourceInventoryItem
            isLoading={!pvcsLoaded}
            error={!!pvcsLoadError}
            kind={PersistentVolumeClaimModel}
            useAbbr
            resources={getCephPVCs(filteredSCNames, pvcsData)}
            mapper={getPVCStatusGroups}
            showLink={false}
          />
          <ResourceInventoryItem
            isLoading={!pvsLoaded}
            error={!!pvsLoadError}
            kind={PersistentVolumeModel}
            useAbbr
            resources={getCephPVs(pvsData)}
            mapper={getPVStatusGroups}
            showLink={false}
          />
        </InventoryBody>
      </DashboardCardBody>
    </DashboardCard>
  );
};

export default withDashboardResources(InventoryCard);
