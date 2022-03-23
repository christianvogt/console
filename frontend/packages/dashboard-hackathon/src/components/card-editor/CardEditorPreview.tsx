import * as React from 'react';
import { DashboardContext } from '../../api';
import { CardConfig } from '../../types';
import { DashboardCardFrame } from '../card-structure';
import DashboardCardLoader from '../dashboard/DashboardCardLoader';

type Props = {
  width?: number;
  height?: number;
  config: CardConfig;
};

const CardEditorPreview: React.FC<Props> = ({ config, width = 300, height = 300 }) => {
  const { cardContext } = React.useContext(DashboardContext);
  return (
    <div style={{ width, height }}>
      <DashboardCardLoader config={config}>
        {(Component) => (
          <DashboardCardFrame config={config} readonly>
            <Component data={config.data} context={cardContext} />
          </DashboardCardFrame>
        )}
      </DashboardCardLoader>
    </div>
  );
};

export default CardEditorPreview;
