import { ComponentFactory } from '@console/topology';
import { TYPE_WORKLOAD } from '../../topology/components';
import WorkloadNode from './WorkloadNode';

export const workloadFactory: ComponentFactory = (kind, type) => {
  if (type === TYPE_WORKLOAD) {
    return WorkloadNode;
  }
  return undefined;
};
