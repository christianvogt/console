import * as React from 'react';
import { TextContent } from '@patternfly/react-core';
import { Converter } from 'showdown';
import { CardProps } from '../../../types';
import { DashboardCardContent, DashboardCardTitle, DashboardCardBody } from '../../card-structure';
import { MarkdownCardData } from './types';

const converter = new Converter({
  tables: true,
  openLinksInNewWindow: true,
  strikethrough: true,
});

const MarkdownCardContent: React.FC<CardProps<MarkdownCardData>> = ({
  data: { title, description, markdown },
}) => (
  <DashboardCardContent>
    {title ? <DashboardCardTitle title={description}>{title}</DashboardCardTitle> : undefined}
    <DashboardCardBody style={{ overflow: 'auto' }}>
      <TextContent dangerouslySetInnerHTML={{ __html: converter.makeHtml(markdown) }} />
    </DashboardCardBody>
  </DashboardCardContent>
);

export default MarkdownCardContent;
