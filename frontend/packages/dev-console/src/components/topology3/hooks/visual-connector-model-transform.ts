import * as React from 'react';
import * as _ from 'lodash';
import { EdgeModel } from '@console/topology';
import { TYPE_CONNECTS_TO } from '../../topology/components';
import { ConnectsToData } from '../../topology/topology-types';
import { ModelTransform } from '../../../extensions/topology3';
import { edgesFromAnnotations } from '../../../utils/application-utils';

export const useVisualConnectorModelTransform: ModelTransform = (model) =>
  React.useMemo(() => {
    const edges: EdgeModel[] = [];
    if (model.nodes) {
      model.nodes.forEach((n) => {
        const dc = n.data?.resources?.obj;
        if (!dc) {
          return;
        }
        edgesFromAnnotations(dc.metadata?.annotations).forEach((edge: string | ConnectsToData) => {
          // handles multiple edges
          const targetNode = _.get(
            _.find(model.nodes, (tn) => {
              if (tn === n) {
                return false;
              }
              const deployment = tn.data?.resources?.obj;
              if (!deployment) {
                return false;
              }
              let name;
              if (typeof edge === 'string') {
                name =
                  deployment.metadata?.labels?.['app.kubernetes.io/instance'] ??
                  deployment.metadata?.name;
                return name === edge;
              }
              name = deployment.metadata?.name;
              const { apiVersion: edgeApiVersion, kind: edgeKind, name: edgeName } = edge;
              const { kind, apiVersion } = deployment;
              let edgeExists = name === edgeName && kind === edgeKind;
              if (apiVersion) {
                edgeExists = edgeExists && apiVersion === edgeApiVersion;
              }
              return edgeExists;
            }),
            ['data', 'resources', 'obj', 'metadata', 'uid'],
          );
          const uid = dc.metadata?.uid;
          if (targetNode) {
            edges.push({
              id: `${TYPE_CONNECTS_TO}:${uid}_${targetNode}`,
              type: TYPE_CONNECTS_TO,
              source: uid,
              target: targetNode,
            });
          }
        });
      });
    }

    return edges.length
      ? {
          ...model,
          edges: [...(model.edges ?? []), ...edges],
        }
      : model;
  }, [model]);
