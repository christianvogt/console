import {
  Controller,
  Model,
  GraphEntity,
  WidgetFactory,
  EntityFactory,
  State,
  InteractionHandlerFactory,
} from './types';
import VisualizationController from './VisualizationController';

export default class Visualization {
  private controller: Controller;

  constructor(controller?: Controller) {
    if (controller) {
      this.controller = controller;
    } else {
      this.controller = new VisualizationController();
    }
  }

  fromModel(model: Model): void {
    this.controller.fromModel(model);
  }

  getRoot(): GraphEntity {
    return this.controller.getGraph();
  }

  registerWidgetFactory(factory: WidgetFactory) {
    this.controller.registerWidgetFactory(factory);
  }

  registerEntityFactory(factory: EntityFactory): void {
    this.controller.registerEntityFactory(factory);
  }

  registerInteractionHandlerFactory(factory: InteractionHandlerFactory): void {
    this.controller.registerInteractionHandlerFactory(factory);
  }

  setState(state: State): void {
    this.controller.setState(state);
  }
}
