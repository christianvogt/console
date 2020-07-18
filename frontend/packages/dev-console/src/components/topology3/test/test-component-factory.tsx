import * as React from 'react';
import {
  ComponentFactory,
  Edge,
  Node,
  withCreateConnector,
  WithCreateConnectorProps,
  Graph,
  ConnectorChoice,
} from '@patternfly/react-topology';
import { useExtensions } from '@console/plugin-sdk';
import {
  isTopology3RelationshipProvider,
  Topology3RelationshipProvider,
} from '../../../extensions/topology3';

type TestNodeProps = {
  element: Node;
};

// TODO export from topology
type onCreate = (
  element: Node,
  target: Node | Graph,
  event: DragEvent,
  dropHints: string[] | undefined,
  choice?: ConnectorChoice,
) => Promise<ConnectorChoice[] | void | undefined | null | React.ReactElement[]>;

// onCreate: (
//   element: Node,
//   target: Node | Graph,
//   event: DragEvent,
//   dropHints: string[] | undefined,
//   choice?: ConnectorChoice,
// ) => Promise<ConnectorChoice[] | void | undefined | null | React.ReactElement[]>;

type FooChoice = ConnectorChoice & {
  extension: Topology3RelationshipProvider;
};

/* eslint-disable */
export const withFoo = <P extends WithCreateConnectorProps & { element: Node }>(
  WrappedComponent: React.ComponentType<P>,
) => (props) => {
  const extensions = useExtensions(isTopology3RelationshipProvider);
  // const onCreate = React.useCallback<onCreate>(() => {

  // }, [extensions]);
  const CreateConnector = React.useMemo(() => {
    return withCreateConnector((element, target, event, dropHinds, choice: any) => {
      if (choice) {
        return choice.extension.properties.create().then((create) => create(element, target));
      }
      return undefined;
    })(WrappedComponent);
  }, [extensions]);

  return <CreateConnector {...props} />;
};

const TestNode: React.FC<TestNodeProps> = () => {
  return <circle cx="50" cy="50" fill="blue" r="50" />;
};

type TestEdgeProps = {
  element: Edge;
};

const TestEdge: React.FC<TestEdgeProps> = ({ element }) => {
  const startPoint = element.getStartPoint();
  const endPoint = element.getEndPoint();
  return <line x1={startPoint.x} y1={startPoint.y} x2={endPoint.x} y2={endPoint.y} />;
};

export const testFactory: ComponentFactory = (kind, type) => {
  if (type === 'test') {
    return TestNode;
  }
  if (type === 'test-relationship') {
    return TestEdge;
  }
  return undefined;
};
