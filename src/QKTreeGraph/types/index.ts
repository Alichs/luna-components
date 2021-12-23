import { TreeGraphData } from '@antv/g6-core/lib/types/index';

// export interface TreeGraphData {
//   id: string;
//   label?: string;
//   x?: number;
//   y?: number;
//   children?: TreeGraphData[];
//   data?: ModelConfig;
//   side?: 'left' | 'right';
//   depth?: number;
//   collapsed?: boolean;
//   style?: ShapeStyle | {
//       [key: string]: ShapeStyle;
//   };
//   stateStyles?: StateStyles;
//   [key: string]: unknown;
// }

export interface INodeStyle {
  width: number;
  height: number;
  radius?: number;
  offset?: number | number[];
  stroke?: string | null;
  strokeOpacity?: number;
  fill?: string | null;
  fillOpacity?: number;
  lineWidth?: number;
  lineAppendWidth?: number;
  lineDash?: number[];
  opacity?: number;
  size?: number | number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  cursor?: string;
  fontSize?: number;
  [key: string]: any;
}

export interface ISourceData extends TreeGraphData {
  edgeRight?: string;
  rectText?: string;
  nodeStyle: INodeStyle | 'LEFT' | 'RIGTH';
  bottomNodeStyle?: object;
  endArrowStyle?: object;
}
