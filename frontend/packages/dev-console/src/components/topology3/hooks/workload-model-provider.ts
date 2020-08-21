import * as React from 'react';
import { ModelProvider } from 'packages/dev-console/src/extensions/topology3';
import { Model } from '@patternfly/react-topology';
import { useK8sWatchResources } from '@console/internal/components/utils/k8s-watch-hook';
import {
  createTopologyNodeData,
  getTopologyNodeItem,
  WorkloadModelProps,
} from '../../topology/data-transforms';
import { createOverviewItemsForType } from '@console/shared';
import { TYPE_WORKLOAD } from '../../topology/components';
import { getImageForIconClass } from '@console/internal/components/catalog/catalog-item-icon';
import { TopologyDataResources } from '../../topology/topology-types';

export const WORKLOAD_TYPES = ['deployments', 'deploymentConfigs', 'daemonSets', 'statefulSets'];

const createModel = (resources: TopologyDataResources): Model => {
  const model: Model = {
    nodes: [],
  };

  WORKLOAD_TYPES.forEach((key) => {
    if (resources?.[key]?.data?.length) {
      createOverviewItemsForType(key, resources).forEach((item) => {
        const { obj: deploymentConfig } = item;
        const data = createTopologyNodeData(
          deploymentConfig,
          item,
          TYPE_WORKLOAD,
          getImageForIconClass(`icon-openshift`),
        );
        model.nodes.push(
          getTopologyNodeItem(deploymentConfig, TYPE_WORKLOAD, data, WorkloadModelProps),
        );
      });
    }
  });

  return model;
};

export const useWorkloadModelProvider: ModelProvider = (namespace: string) => {
  const [model, setModel] = React.useState<Model>();
  const resources = React.useMemo(
    () => ({
      deploymentConfigs: {
        isList: true,
        kind: 'DeploymentConfig',
        namespace,
        optional: true,
      },
      deployments: {
        isList: true,
        kind: 'Deployment',
        namespace,
        optional: true,
      },
      daemonSets: {
        isList: true,
        kind: 'DaemonSet',
        namespace,
        optional: true,
      },
      pods: {
        isList: true,
        kind: 'Pod',
        namespace,
        optional: true,
      },
      replicationControllers: {
        isList: true,
        kind: 'ReplicationController',
        namespace,
        optional: true,
      },
      routes: {
        isList: true,
        kind: 'Route',
        namespace,
        optional: true,
      },
      services: {
        isList: true,
        kind: 'Service',
        namespace,
        optional: true,
      },
      replicaSets: {
        isList: true,
        kind: 'ReplicaSet',
        namespace,
        optional: true,
      },
      buildConfigs: {
        isList: true,
        kind: 'BuildConfig',
        namespace,
        optional: true,
      },
      builds: {
        isList: true,
        kind: 'Build',
        namespace,
        optional: true,
      },
      statefulSets: {
        isList: true,
        kind: 'StatefulSet',
        namespace,
        optional: true,
      },
    }),
    [namespace],
  );
  // TODO fix use of any
  const result = useK8sWatchResources<any>(resources);

  const loaded = Object.keys(result).every((key) => result[key].loaded);
  const loadError = result[Object.keys(result).find((key) => result[key].loadError)]?.loadError;
  React.useEffect(() => {
    if (loaded) {
      setModel(createModel(result));
    }
  }, [loaded, result]);

  return [model, !!model && loaded, loadError];
};
