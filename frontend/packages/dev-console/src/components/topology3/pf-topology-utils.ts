import { EdgeModel, Controller, NodeModel } from '@patternfly/react-topology';

export const mergeEdge = (controller: Controller, model: EdgeModel) => {
  const element = controller.getEdgeById(model.id);
  if (element) {
    element.setModel(model);
  }
};

export const mergeNode = (controller: Controller, model: NodeModel) => {
  const element = controller.getNodeById(model.id);
  if (element) {
    element.setModel(model);
  }
};
