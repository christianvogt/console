import { LayoutFactory, Layout } from '../types';
import ColaLayout from './ColaLayout';
import DagreLayout from './DagreLayout';
import ForceLayout from './ForceLayout';

const layoutKinds = {
  cola: ColaLayout.kind,
  dagre: DagreLayout.kind,
  force: ForceLayout.kind,
};

const defaultLayoutFactory: LayoutFactory = (kind: string): Layout | undefined => {
  switch (kind) {
    case ColaLayout.kind:
      return new ColaLayout();
    case DagreLayout.kind:
      return new DagreLayout();
    case ForceLayout.kind:
      return new ForceLayout();
    default:
      return undefined;
  }
};

export { defaultLayoutFactory, defaultLayoutFactory as default, layoutKinds };
