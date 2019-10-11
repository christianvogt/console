import * as React from 'react';
import { observer } from 'mobx-react';
import { ElementEntity } from '../types';
import EntityContext from '../utils/EntityContext';
import ContextMenu from '../contextmenu/ContextMenu';

type Reference = React.ComponentProps<typeof ContextMenu>['reference'];

export type WithContextMenuProps = {
  onContextMenu: (e: React.MouseEvent) => void;
};

export const withContextMenu = <E extends ElementEntity>(
  actions: (entity: E) => React.ReactElement,
  atPoint: boolean = true,
) => <P extends WithContextMenuProps>(WrappedComponent: React.ComponentType<P>) => {
  const Component: React.FC<Omit<P, keyof WithContextMenuProps>> = (props) => {
    const entity = React.useContext(EntityContext);
    const [reference, setReference] = React.useState<Reference | null>(null);
    const onContextMenu = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setReference(
        atPoint
          ? {
              x: e.pageX,
              y: e.pageY,
            }
          : e.currentTarget,
      );
    }, []);

    return (
      <>
        <WrappedComponent {...props as any} onContextMenu={onContextMenu} />
        {reference ? (
          <ContextMenu reference={reference} open onRequestClose={() => setReference(null)}>
            {actions(entity as E)}
          </ContextMenu>
        ) : null}
      </>
    );
  };
  return observer(Component);
};
