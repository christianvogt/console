import * as React from 'react';
import {
  DashboardCardBody,
  DashboardCardContent,
  DashboardCardTitle,
} from '@patternfly/dashboard/src/components/card-structure';
import { CardProps, CardSettingsProps } from '@patternfly/dashboard/src/types';
import { FormGroup, FormSelect, FormSelectOption } from '@patternfly/react-core';
import CardIcon from '@patternfly/react-icons/dist/esm/icons/chart-pie-icon';
import PipelineRunCount from '@console/pipelines-plugin/src/components/pipelines/pipeline-metrics/PipelineRunCount';
import PipelineRunDurationGraph from '@console/pipelines-plugin/src/components/pipelines/pipeline-metrics/PipelineRunDurationGraph';
import PipelineRunTaskRunGraph from '@console/pipelines-plugin/src/components/pipelines/pipeline-metrics/PipelineRunTaskRunGraph';
import PipelineSuccessRatioDonut from '@console/pipelines-plugin/src/components/pipelines/pipeline-metrics/PipelineSuccessRatioDonut';
import { PipelineKind } from '@console/pipelines-plugin/src/types/pipeline';

enum Types {
  RUN_COUNT = 'Number of PipelineRuns',
  SUCCESS_RATIO = 'Pipeline Success Ratio',
  RUN_DURATION = 'PipelineRun Duration',
  TASK_RUN = 'TaskRun Duration',
}

type Data = {
  type: string;
};

type Context = {
  pipeline: PipelineKind;
  timespan: number;
  queryPrefix: string;
  interval: number;
};

export const Icon = CardIcon;

export const Card: React.FC<CardProps<Data, Context>> = ({ data: { type }, context }) => (
  <DashboardCardContent>
    <DashboardCardTitle>{Types[type]}</DashboardCardTitle>
    <DashboardCardBody>
      {(() => {
        switch (type) {
          case 'RUN_COUNT':
            return <PipelineRunCount {...context} />;
          case 'SUCCESS_RATIO':
            return <PipelineSuccessRatioDonut {...context} />;
          case 'RUN_DURATION':
            return <PipelineRunDurationGraph {...context} />;
          case 'TASK_RUN':
            return <PipelineRunTaskRunGraph {...context} />;
          default:
            return null;
        }
      })()}
    </DashboardCardBody>
  </DashboardCardContent>
);

export const Settings: React.FC<CardSettingsProps<Data, Context>> = ({ onChange, data }) => {
  React.useEffect(() => {
    if (!data.type) {
      onChange({ ...data, type: 'RUN_COUNT' });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <FormGroup label="Type" isRequired fieldId="metric-type">
        <FormSelect
          value={data.type}
          onChange={(type) => onChange({ ...data, type })}
          id="metric-type"
        >
          {Object.keys(Types).map((option) => (
            <FormSelectOption key={option} value={option} label={Types[option]} />
          ))}
        </FormSelect>
      </FormGroup>
    </>
  );
};
