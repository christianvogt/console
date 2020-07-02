import * as React from 'react';
import SvgBoxedText from '../../svg/SvgBoxedText';

import './NodeLabel.scss';

export const Y_OFFSET = 24;
type Props = {
  x: number;
  y: number;
  yOffset?: number;
  label: string;
  kind?: string;
};

const NodeLabel: React.FC<Props> = ({ x, y, yOffset = Y_OFFSET, label, kind }) => (
  <SvgBoxedText
    className="odc-node-label"
    x={x}
    y={y + yOffset}
    paddingX={8}
    paddingY={4}
    kind={kind}
  >
    {label}
  </SvgBoxedText>
);

export default NodeLabel;
