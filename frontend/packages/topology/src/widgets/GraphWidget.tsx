import * as React from 'react';
import { GraphEntity } from '../types';
import { WithPanZoomProps } from '../behavior/usePanZoom';
import LayersProvider from '../layers/LayersProvider';
import { DEFAULT_LAYER } from '../layers/LayersContext';
import widget from '../widget';
import EntityWidget from './EntityWidget';

type EntityProps = {
  entity: GraphEntity;
};

type GraphWidgetProps = EntityProps & WithPanZoomProps;

// This inner Component will prevent the re-rendering of all children when the transform changes
const EntityChildren: React.FC<EntityProps> = widget(({ entity }) => {
  return (
    <>
      {entity.getEdges().map((e) => (
        <EntityWidget key={e.getId()} entity={e} />
      ))}
      {entity.getNodes().map((e) => (
        <EntityWidget key={e.getId()} entity={e} />
      ))}
    </>
  );
});

// This inner Component will prevent re-rendering layers when the transform changes
const Inner: React.FC<EntityProps> = React.memo(({ entity }) => (
  <LayersProvider layers={['bottom', 'groups', DEFAULT_LAYER, 'top']}>
    <EntityChildren entity={entity} />
  </LayersProvider>
));

const GraphWidget: React.FC<GraphWidgetProps> = ({ entity, panZoomRef }) => {
  const layout = entity.getLayout();
  React.useEffect(() => {
    entity.layout();
    // Only re-run if the layout changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  const bounds = entity.getBounds();
  return (
    <g
      ref={panZoomRef}
      transform={`translate(${bounds.x}, ${bounds.y}) scale(${entity.getScale()})`}
      data-id={entity.getId()}
      data-kind={entity.kind}
      data-type={entity.getType()}
    >
      <Inner entity={entity} />
    </g>
  );
};

export default widget(GraphWidget);
