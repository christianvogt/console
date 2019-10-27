import * as React from 'react';
import { createSvgIdUrl } from '../../utils/svg-utils';
import SvgResourceIcon from '../topology/shapes/ResourceIcon';
import SvgDropShadowFilter from './SvgDropShadowFilter';

export interface State {
  bb?: { width: number; height: number };
}

export interface SvgBoxedTextProps {
  children?: string;
  className?: string;
  paddingX?: number;
  paddingY?: number;
  x?: number;
  y?: number;
  cornerRadius?: number;
  kind?: string;
  innerRef?: React.Ref<SVGGElement>;
  // TODO remove with 2.0
  onMouseEnter?: React.MouseEventHandler<SVGGElement>;
  onMouseLeave?: React.MouseEventHandler<SVGGElement>;
}

const FILTER_ID = 'SvgBoxedTextDropShadowFilterId';

/**
 * Renders a `<text>` component with a `<rect>` box behind.
 */
export default class SvgBoxedText extends React.Component<SvgBoxedTextProps, State> {
  private readonly textRef = React.createRef<SVGTextElement>();

  private iconRef = React.createRef<any>();

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.computeBoxSize();
  }

  componentDidUpdate() {
    this.computeBoxSize();
  }

  private computeBoxSize() {
    const { current } = this.textRef;
    if (current && current.getBBox) {
      const bb = current.getBBox();
      if (
        !this.state.bb ||
        (bb.width !== this.state.bb.width || bb.height !== this.state.bb.height)
      ) {
        this.setState({ bb });
      }
    }
  }

  render() {
    const {
      children,
      className,
      paddingX = 0,
      paddingY = 0,
      cornerRadius = 4,
      x = 0,
      y = 0,
      kind,
      onMouseEnter,
      onMouseLeave,
      innerRef,
      ...other
    } = this.props;
    const { bb } = this.state;
    const iconSpace: number =
      kind && this.iconRef.current ? this.iconRef.current.getBBox().width + paddingX : 0;

    return (
      <g ref={innerRef} className={className}>
        <SvgDropShadowFilter id={FILTER_ID} />
        {bb && (
          <rect
            filter={createSvgIdUrl(FILTER_ID)}
            x={x - paddingX - bb.width / 2 - iconSpace / 2}
            width={bb.width + paddingX * 2 + iconSpace}
            y={y - paddingY - bb.height / 2}
            height={bb.height + paddingY * 2}
            rx={cornerRadius}
            ry={cornerRadius}
          />
        )}
        {bb && kind && (
          <SvgResourceIcon
            ref={this.iconRef}
            x={x - bb.width / 2 - paddingX / 2}
            y={y}
            kind={kind}
          />
        )}
        <text
          ref={this.textRef}
          {...other}
          x={x + iconSpace / 2}
          y={y}
          textAnchor="middle"
          dy="0.35em"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </text>
      </g>
    );
  }
}
