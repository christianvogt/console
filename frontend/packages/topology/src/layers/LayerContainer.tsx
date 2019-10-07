import * as React from 'react';
import { observer } from 'mobx-react';
import EntityContext from '../utils/EntityContext';
import { isGraphEntity } from '../types';

const LayerContainer: React.FC = ({ children }) => {
  // accumulate parent positions
  let p = React.useContext(EntityContext);
  let x = 0;
  let y = 0;
  while (!isGraphEntity(p)) {
    const { x: px, y: py } = p.getBounds();
    x += px;
    y += py;
    p = p.getParent();
  }
  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
};

export default observer(LayerContainer);
