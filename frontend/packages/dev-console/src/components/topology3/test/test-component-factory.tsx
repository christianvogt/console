import * as React from 'react';
import {
  ComponentFactory,
  Edge,
  Node,
  withCreateConnector,
  WithCreateConnectorProps,
} from '@console/topology';

type TestNodeProps = {
  element: Node;
};

export const withFoo = <P extends WithCreateConnectorProps & { element: Node }>(
  WrappedComponent: React.ComponentType<P>,
) =>
  withCreateConnector(
    // onCreate: React.ComponentProps<typeof CreateConnectorWidget>['onCreate'],
    // ConnectorComponent: CreateConnectorRenderer = DefaultCreateConnector,
    // contextMenuClass?: string,
    // options?: CreateConnectorOptions,
    (() => {
      // TODO
    }) as any,
  )(WrappedComponent);

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
