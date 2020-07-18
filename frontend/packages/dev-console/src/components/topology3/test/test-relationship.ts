import { RelationshipProvider, RelationshipCreator } from '../../../extensions/topology3';
import { mergeEdge } from '../pf-topology-utils';

export const provider: RelationshipProvider = (source, target) => {
  return source.getId() === 'test-1' && (!target || target.getId() === 'test-2');
};

export const create: RelationshipCreator = (source, target) => {
  const result = new Promise<boolean>((resolve) => {
    setTimeout(() => {
      mergeEdge(source.getController(), {
        id: 'test-edge-1',
        type: 'test-edge',
        label: 'Test Edge',
        source: source.getId(),
        target: target.getId(),
      });
      resolve(true);
    }, 5000);
  });
  return result;
};
