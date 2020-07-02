import * as React from 'react';
import { ModelTransform } from '../../../extensions/topology3';
import { NodeModel } from '@console/topology';
import {
  TYPE_APPLICATION_GROUP,
  GROUP_WIDTH,
  GROUP_HEIGHT,
  GROUP_PADDING,
} from '../../topology/components';

export const useGroupModelTransform: ModelTransform = (model) =>
  React.useMemo(() => {
    const groups: { [name: string]: string[] } = {};
    if (model.nodes) {
      model.nodes.forEach((n) => {
        const groupName = n.data?.resources?.obj?.metadata?.labels?.['app.kubernetes.io/part-of'];
        if (!groupName) {
          return;
        }
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push(n.id);
      });
    }

    const groupsNodes = Object.keys(groups).map<NodeModel>((name) => ({
      id: `group:${name}`,
      type: TYPE_APPLICATION_GROUP,
      group: true,
      label: name,
      children: groups[name],
      width: GROUP_WIDTH,
      height: GROUP_HEIGHT,
      data: {},
      visible: true,
      collapsed: false,
      style: {
        padding: GROUP_PADDING,
      },
    }));
    return groupsNodes.length
      ? {
          ...model,
          nodes: [...(model.nodes ?? []), ...groupsNodes],
        }
      : model;
  }, [model]);
