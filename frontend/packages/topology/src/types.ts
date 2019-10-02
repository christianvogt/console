import { ComponentType } from 'react';
import Point from './geom/Point';
import Rect from './geom/Rect';

// x, y
export type PointTuple = [number, number];

export interface Layout {
  type: string;
}

export interface LayoutConstraint {
  type: string;
}

export type Model = {
  graph?: Graph;
  nodes?: Node[];
  edges?: Edge[];
};

export interface Element {
  id: string;
  type: string;
  visible?: boolean;
  children?: string[];
  data?: any;
}

export interface Node extends Element {
  layoutConstraints?: LayoutConstraint[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface Edge extends Element {
  source?: string;
  target?: string;
  bendpoints?: PointTuple[];
  points?: { x: number; y: number }[]; // Used by Dagre layout
}

export interface LayoutNode extends Node {
  layout?: Layout;
}

export interface Graph extends LayoutNode {
  name?: string;
  edges?: string[];
}

export interface Anchor {
  getOwner(): NodeEntity;
  getLocation(reference: Point): Point;
  getReferencePoint(): Point;
}

export interface InteractionHandler<E extends ElementEntity = ElementEntity> {
  setOwner(owner: E): void;
  getProps(): {} | undefined;
  activate(): void;
  deactivate(): void;
}

export const isGraphEntity = (entity: ElementEntity): entity is GraphEntity => {
  return entity && entity.kind === 'graph';
};

export const isNodeEntity = (entity: ElementEntity): entity is NodeEntity => {
  return entity && entity.kind === 'node';
};

export const isEdgeEntity = (entity: ElementEntity): entity is EdgeEntity => {
  return entity && entity.kind === 'edge';
};

export enum ModelKind {
  graph = 'graph',
  node = 'node',
  edge = 'edge',
}
export interface ElementEntity<E extends Element = Element, D = any> extends WithState {
  readonly kind: ModelKind;
  isActive(): boolean;
  activate(): void;
  deactivate(): void;
  installInteractionHandler(handler: InteractionHandler): void;
  getInteractionHandlers(): InteractionHandler[];
  isDetached(): boolean;
  getController(): Controller;
  setController(controller?: Controller): void;
  getGraph(): GraphEntity;
  getParent(): ElementEntity;
  setParent(parent: ElementEntity | undefined): void;
  getId(): string;
  setId(id: string): void;
  getType(): string;
  setType(type: string): void;
  setVisible(visible: boolean): void;
  isVisible(): boolean;
  getData(): D | undefined;
  setData(data: D | undefined): void;
  getChildren(): NodeEntity[];
  addChild(child: NodeEntity): void;
  removeChild(child: NodeEntity): void;
  remove(): void;
  setModel(model: E): void;
}

export interface NodeEntity<E extends Node = Node, D = any> extends ElementEntity<E, D> {
  getPosition(): Point;
  setPosition(point: Point): void;
  getBoundingBox(): Rect;
  setBoundingBox(bbox: Rect): void;
  getAnchor(): Anchor;
}

export interface EdgeEntity<E extends Edge = Edge, D = any> extends ElementEntity<E, D> {
  getSource(): NodeEntity;
  setSource(source: NodeEntity): void;
  getTarget(): NodeEntity;
  setTarget(target: NodeEntity): void;
  getStartPoint(): Point;
  setStartPoint(x?: number, y?: number): void;
  getEndPoint(): Point;
  setEndPoint(x?: number, y?: number): void;
  getBendpoints(): Point[];
}

export interface GraphEntity<E extends Graph = Graph, D = any> extends ElementEntity<E, D> {
  getNodes(): NodeEntity[];
  getEdges(): EdgeEntity[];
  removeNode(node: NodeEntity): void;
  removeEdge(edge: EdgeEntity): void;
}

export type EventListener<Args extends any[] = any[]> = (...args: Args) => void;

export type State = { [key: string]: any };

export interface WithState {
  getState<S extends {} = {}>(): S;
  setState(state: State): void;
}

export interface Controller extends WithState {
  getStore<S extends {} = {}>(): S;
  fromModel(model: Model): void;
  getGraph(): GraphEntity;
  setGraph(Graph: GraphEntity): void;
  getEntityById(id: string): ElementEntity;
  // TODO | undefined ?
  getNodeById(id: string): NodeEntity;
  getEdgeById(id: string): EdgeEntity;
  addEntity(entity: ElementEntity): void;
  removeEntity(entity: ElementEntity): void;
  getWidget(entity: ElementEntity): ComponentType<{ entity: ElementEntity }>;
  registerWidgetFactory(factory: WidgetFactory): void;
  registerEntityFactory(factory: EntityFactory): void;
  registerInteractionHandlerFactory(factory: InteractionHandlerFactory): void;
  addEventListener<L extends EventListener = EventListener>(type: string, listener: L): void;
  removeEventListener(type: string, listener: EventListener): void;
  fireEvent(type: string, ...args: any): void;
  getEntities(): ElementEntity[];
}

export type WidgetFactory = (
  entity: ElementEntity,
) => ComponentType<{ entity: ElementEntity }> | undefined;

export type InteractionHandlerFactory = (entity: ElementEntity) => InteractionHandler[] | undefined;

export type EntityFactory = (kind: ModelKind, type: string) => ElementEntity | undefined;
