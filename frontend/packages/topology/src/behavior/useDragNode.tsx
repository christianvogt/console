import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import EntityContext from '../utils/EntityContext';
import { isNodeEntity } from '../types';
import { useDndDrag, WithDndDragProps } from './useDndDrag';
import {
  DragSourceSpec,
  DragEvent,
  ConnectDragSource,
  DragObjectWithType,
  DragSourceMonitor,
} from './dnd-types';

export const useDragNode = <DropResult, CollectedProps, Props = {}>(
  spec?: Omit<DragSourceSpec<DragObjectWithType, DropResult, CollectedProps>, 'type'>,
  props?: Props,
): [CollectedProps, ConnectDragSource] => {
  const entity = React.useContext(EntityContext);
  if (!isNodeEntity(entity)) {
    throw new Error('useDragNode must be used within the scope of a NodeEntity');
  }
  const entityRef = React.useRef(entity);
  entityRef.current = entity;
  return useDndDrag(
    React.useMemo(() => {
      const sourceSpec: DragSourceSpec<any, any, any, Props> = {
        item: { type: '#useDragNode#' },
        begin: action((monitor: DragSourceMonitor, p: Props) => {
          if (entityRef.current.isGroup()) {
            entityRef.current.getChildren().forEach((c) => {
              c.raise();
            });
          }
          return spec && spec.begin ? spec.begin(monitor, p) : undefined;
        }),
        drag: action((event: DragEvent, monitor: DragSourceMonitor, p: Props) => {
          const { dx, dy } = event;
          if (entityRef.current.isGroup()) {
            entityRef.current.getChildren().forEach((c) => {
              if (isNodeEntity(c)) {
                c.getBounds().translate(dx, dy);
              }
            });
          } else {
            entityRef.current.getBounds().translate(dx, dy);
          }
          entityRef.current.raise();
          spec && spec.drag && spec.drag(event, monitor, p);
        }),
        canDrag: spec ? spec.canDrag : undefined,
        end: spec ? spec.end : undefined,
        collect: spec ? spec.collect : undefined,
      };
      return sourceSpec;
    }, [spec]),
    props,
  );
};

export type WithDragNodeProps = {
  dragNodeRef: WithDndDragProps['dndDragRef'];
};

export const withDragNode = <DropResult, CollectedProps, Props = {}>(
  spec?: Omit<DragSourceSpec<DragObjectWithType, DropResult, CollectedProps, Props>, 'type'>,
) => <P extends WithDragNodeProps & CollectedProps & Props>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const Component: React.FC<Omit<P, keyof WithDragNodeProps>> = (props) => {
    const [dragNodeProps, dragNodeRef] = useDragNode(spec, props);
    return <WrappedComponent {...props as any} dragNodeRef={dragNodeRef} {...dragNodeProps} />;
  };
  return observer(Component);
};
