import * as React from 'react';
import { FormGroup, TextArea, TextInput } from '@patternfly/react-core';
import { CardSettingsProps } from '../../../types';
import { MarkdownCardData } from './types';

const MarkdownCardSettings: React.FC<CardSettingsProps<MarkdownCardData>> = ({
  onChange,
  data,
}) => (
  <>
    <FormGroup label="Title" fieldId="markdown-card-title">
      <TextInput
        value={data.title ?? ''}
        type="text"
        id="markdown-card-title"
        name="title"
        onChange={(title) => onChange({ ...data, title })}
      />
    </FormGroup>
    <FormGroup label="Markdown" isRequired fieldId="markdown-card-markdown">
      <TextArea
        value={data.markdown ?? ''}
        isRequired
        name="horizontal-form-exp"
        id="markdown-card-markdown"
        onChange={(markdown) => onChange({ ...data, markdown })}
        rows={10}
      />
    </FormGroup>
  </>
);

export default MarkdownCardSettings;
