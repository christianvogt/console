// import { computed } from 'mobx';
import { observable, computed } from 'mobx';
import Point from '../geom/Point';
import { EdgeEntity, NodeEntity, Edge, ModelKind, AnchorEnd, Anchor } from '../types';
import BaseElementEntity from './BaseElementEntity';

export default class BaseEdgeEntity<E extends Edge = Edge, D = any> extends BaseElementEntity<E, D>
  implements EdgeEntity<E, D> {
  @observable
  private sourceId: string;

  @observable
  private targetId: string;

  @observable.shallow
  private bendpoints: Point[];

  @observable.ref
  private startPoint?: Point;

  @observable.ref
  private endPoint?: Point;

  @computed
  private get source(): NodeEntity {
    return this.getController().getNodeById(this.sourceId);
  }

  @computed
  private get target(): NodeEntity {
    return this.getController().getNodeById(this.targetId);
  }

  @computed
  private get sourceAnchor(): Anchor {
    const source = this.getSource();
    if (!source) {
      throw new Error('Cannot compute start point. Missing source.');
    }
    return source.getAnchor(AnchorEnd.source, this.getType());
  }

  @computed
  private get targetAnchor(): Anchor {
    const target = this.getTarget();
    if (!target) {
      throw new Error('Cannot compute start point. Missing target.');
    }
    return target.getAnchor(AnchorEnd.target, this.getType());
  }

  get kind(): ModelKind {
    return ModelKind.edge;
  }

  getSource(): NodeEntity {
    return this.source;
  }

  setSource(source: NodeEntity) {
    this.sourceId = source.getId();
  }

  getTarget(): NodeEntity {
    return this.target;
  }

  setTarget(target: NodeEntity) {
    this.targetId = target.getId();
  }

  getBendpoints(): Point[] {
    return this.bendpoints || [];
  }

  setBendpoints(points: Point[]) {
    this.bendpoints = points;
  }

  removeBendpoint(point: Point | number): void {
    if (typeof point === 'number') {
      this.bendpoints.splice(point, 1);
    } else {
      this.bendpoints.splice(this.bendpoints.indexOf(point));
    }
  }

  getStartPoint(): Point {
    if (this.startPoint) {
      return this.startPoint;
    }
    const bendpoints = this.getBendpoints();
    let referencePoint: Point;
    if (bendpoints && bendpoints.length > 0) {
      [referencePoint] = bendpoints;
    } else if (this.endPoint) {
      referencePoint = this.endPoint;
    } else {
      referencePoint = this.targetAnchor.getReferencePoint();
    }
    return this.sourceAnchor.getLocation(referencePoint);
  }

  setStartPoint(x?: number, y?: number): void {
    if (x == null || y == null) {
      this.startPoint = undefined;
    } else if (this.startPoint) {
      this.startPoint.setLocation(x, y);
    } else {
      this.startPoint = new Point(x, y);
    }
  }

  getEndPoint(): Point {
    if (this.endPoint) {
      return this.endPoint;
    }
    const bendpoints = this.getBendpoints();
    let referencePoint: Point;
    if (bendpoints && bendpoints.length > 0) {
      referencePoint = bendpoints[bendpoints.length - 1];
    } else if (this.startPoint) {
      referencePoint = this.startPoint;
    } else {
      referencePoint = this.sourceAnchor.getReferencePoint();
    }
    return this.targetAnchor.getLocation(referencePoint);
  }

  setEndPoint(x?: number, y?: number): void {
    if (x == null || y == null) {
      this.endPoint = undefined;
    } else if (this.endPoint) {
      this.endPoint.setLocation(x, y);
    } else {
      this.endPoint = new Point(x, y);
    }
  }

  setModel(model: E): void {
    super.setModel(model);
    if (model.source) {
      this.sourceId = model.source;
    }
    if (model.target) {
      this.targetId = model.target;
    }
    if ('bendpoints' in model) {
      this.bendpoints = model.bendpoints ? model.bendpoints.map((b) => new Point(b[0], b[1])) : [];
    }
  }
}
