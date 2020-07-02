import { Plugin } from '@console/plugin-sdk';
import {
  Topology3ModelProvider,
  Topology3ComponentFactory,
  Topology3ModelTransform,
} from './topology3';

type ConsumedExtensions =
  | Topology3ComponentFactory
  | Topology3ModelProvider
  | Topology3ModelTransform;

const plugin: Plugin<ConsumedExtensions> = [
  {
    type: 'Topology3/ComponentFactory',
    properties: {
      priority: 0,
      factory: () =>
        import('../components/topology3/components/component-factories').then(
          (m) => m.workloadFactory,
        ),
    },
  },
  {
    type: 'Topology3/ModelProvider',
    properties: {
      priority: 0,
      provider: () =>
        import('../components/topology3/hooks/workload-model-provider').then(
          (m) => m.useWorkloadModelProvider,
        ),
    },
  },
  {
    type: 'Topology3/ModelTransform',
    properties: {
      priority: 0,
      transform: () =>
        import('../components/topology3/hooks/group-model-transform').then(
          (m) => m.useGroupModelTransform,
        ),
    },
  },
  {
    type: 'Topology3/ModelTransform',
    properties: {
      priority: 1,
      transform: () =>
        import('../components/topology3/hooks/visual-connector-model-transform').then(
          (m) => m.useVisualConnectorModelTransform,
        ),
    },
  },
];

export default plugin;
