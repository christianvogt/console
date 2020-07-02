import * as React from 'react';
import { Node } from '@console/topology';
import NodeLabel from './NodeLabel';

import './WorkloadNode.scss';

const RADIUS = 52;

const WorkloadNode: React.FC<{ element: Node }> = ({ element }) => {
  return (
    <g>
      <circle className="odc-workload-node__bg" cx={RADIUS} cy={RADIUS} r={RADIUS} />
      <NodeLabel
        x={RADIUS}
        y={RADIUS * 2}
        label={element.getLabel()}
        kind={element.getData()?.kind}
      />
    </g>
  );
};

export default WorkloadNode;
