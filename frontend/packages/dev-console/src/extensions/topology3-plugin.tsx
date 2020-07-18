import { Plugin } from '@console/plugin-sdk';
import {
  Topology3ModelProvider,
  Topology3ComponentFactory,
  Topology3ModelTransform,
  Topology3RelationshipProvider,
} from './topology3';
import { TopologyComponentFactory } from './topology';

type ConsumedExtensions =
  | TopologyComponentFactory
  | Topology3ComponentFactory
  | Topology3ModelProvider
  | Topology3ModelTransform
  | Topology3RelationshipProvider;

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

  {
    type: 'Topology3/ModelProvider',
    properties: {
      priority: 0,
      provider: () =>
        import('../components/topology3/test/test-model-provider').then((m) => m.useTestProvider),
    },
  },
  {
    type: 'Topology3/ComponentFactory',
    properties: {
      factory: () =>
        import('../components/topology3/test/test-component-factory').then((m) => m.testFactory),
    },
  },

  {
    type: 'Topology/ComponentFactory',
    properties: {
      getFactory: () =>
        import('../components/topology3/test/test-component-factory').then((m) => m.testFactory),
    },
  },
  {
    type: 'Topology3/RelationshipProvider',
    properties: {
      name: 'Test Connector',
      fallback: false,
      provides: () =>
        import('../components/topology3/test/test-relationship').then((m) => m.provider),
      create: () => import('../components/topology3/test/test-relationship').then((m) => m.create),
    },
  },
];

export default plugin;
