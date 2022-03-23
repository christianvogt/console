import * as React from 'react';
import { FormGroup, TextInput } from '@patternfly/react-core';
import { CardSettingsProps } from '../../../types';
import { IFrameCardData } from './types';

const IFrameCardSettings: React.FC<CardSettingsProps<IFrameCardData>> = ({ onChange, data }) => (
  <>
    <FormGroup
      label="Title"
      isRequired
      fieldId="iframe-card-title"
      helperText="Indicate its content to the user for accessibility."
    >
      <TextInput
        value={data.title ?? ''}
        isRequired
        type="text"
        id="iframe-card-title"
        name="title"
        onChange={(title) => onChange({ ...data, title })}
      />
    </FormGroup>
    <FormGroup label="URL" isRequired fieldId="iframe-card-url">
      <TextInput
        value={data.url ?? ''}
        isRequired
        type="text"
        id="iframe-card-url"
        name="url"
        onChange={(url) => onChange({ ...data, url })}
      />
    </FormGroup>
  </>
);

export default IFrameCardSettings;
