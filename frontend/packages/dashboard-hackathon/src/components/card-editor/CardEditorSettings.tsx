import * as React from 'react';
import { CardConfig } from '../../types';
import DashboardCardSettingsLooader from '../dashboard/DashboardCardSettingsLoader';

type Props = {
  onChange: (config: CardConfig) => void;
  config: CardConfig;
};

const CardEditorSettings: React.FC<Props> = ({ config, onChange }) => (
  <DashboardCardSettingsLooader config={config}>
    {(Component) => (
      <Component
        data={config.data}
        onChange={(data: CardConfig['data']) => onChange({ ...config, data })}
      />
    )}
  </DashboardCardSettingsLooader>
);

export default CardEditorSettings;
