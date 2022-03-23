import * as React from 'react';
import { FormGroup, TextArea, TextInput } from '@patternfly/react-core';
import { CardSettingsProps } from '../../../types';
import { DonutCardData } from './types';

const DonutCardSettings: React.FC<CardSettingsProps<DonutCardData>> = ({ onChange, data }) => (
  <>
    <FormGroup label="Title" isRequired fieldId="chart-donut-card-title">
      <TextInput
        value={data.title ?? ''}
        isRequired
        type="text"
        id="chart-donut-card-title"
        name="title"
        onChange={(title) => onChange({ ...data, title })}
      />
    </FormGroup>
    <FormGroup label="Sub Title" fieldId="chart-donut-card-sub-title">
      <TextInput
        value={data.subTitle ?? ''}
        type="text"
        id="chart-donut-card-sub-title"
        name="subTitle"
        onChange={(subTitle) => onChange({ ...data, subTitle })}
      />
    </FormGroup>
    <FormGroup label="Unit" fieldId="chart-donut-card-unit">
      <TextInput
        value={data.unit ?? ''}
        type="text"
        id="chart-donut-card-unit"
        name="unit"
        onChange={(unit) => onChange({ ...data, unit })}
      />
    </FormGroup>
    <FormGroup label="Data" isRequired fieldId="chart-donut-card-data">
      <TextArea
        value={data.data ? JSON.stringify(data.data) : ''}
        id="chart-donut-card-data"
        name="data"
        onChange={(d) => {
          try {
            const textData = JSON.parse(d);
            onChange({ ...data, data: textData });
          } catch {
            onChange({ ...data, data: [] });
          }
        }}
      />
    </FormGroup>
    <FormGroup label="Aria Title" fieldId="chart-donut-card-aria-title">
      <TextInput
        value={data.ariaTitle ?? ''}
        type="text"
        id="chart-donut-card-aria-title"
        name="ariaTitle"
        onChange={(ariaTitle) => onChange({ ...data, ariaTitle })}
      />
    </FormGroup>
    <FormGroup label="Sub Title" fieldId="chart-donut-card-aria-desc">
      <TextArea
        value={data.ariaDesc ?? ''}
        id="chart-donut-card-aria-desc"
        name="ariaDesc"
        onChange={(ariaDesc) => onChange({ ...data, ariaDesc })}
      />
    </FormGroup>
  </>
);

// export type DonutCardData = {
//   ariaTitle?: string;
//   ariaDesc?: string;
//   title: string;
//   subTitle?: string;
//   description?: string;
//   data: { x: string; y: number }[];
//   unit?: string;
// };

export default DonutCardSettings;
