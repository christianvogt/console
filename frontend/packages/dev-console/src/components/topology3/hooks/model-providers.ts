import * as React from 'react';
import { ModelProvider } from '../../../extensions/topology3';
import { Model } from '@console/topology';
import { useK8sWatchResources } from '@console/internal/components/utils/k8s-watch-hook';
import { getBaseTopologyDataModel } from '../../topology/data-transforms';

// export const useWorkloadModelProvider: ModelProvider = (namespace: string) => {
//   const [model, setModel] = React.useState<Model>();
//   const resources = React.useMemo(
//     () => ({
//       isList: true,
//       kind: 'Deployment',
//       namespace,
//       optional: true,
//     }),
//     [namespace],
//   );
//   const [data, loaded, loadError] = useK8sWatchResource(resources);

//   React.useEffect(() => {
//     if (loaded && Array.isArray(data)) {
//       setModel({
//         nodes: (data as K8sResourceCommon[]).map((d) => ({
//           id: referenceFor({ kind: 'Deployment', ...d }),
//           type: TYPE_WORKLOAD,
//           label: d.metadata.name,
//           data: { kind: 'Deployment', ...d },
//           width: 120,
//           height: 120,
//         })),
//       });
//     }
//   }, [data, loaded]);

//   return [model, !!model && loaded, loadError];
// };

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
      setModel(getBaseTopologyDataModel(result));
    }
  }, [loaded, result]);

  return [model, !!model && loaded, loadError];
};
