export type IStyles = {
  node?: any;
  edge?: any;
  [propName: string]: any;
};
export type IData = {
  nodes: any[];
  edges: any[];
};
export type INodeTooltip = {
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'auto'
    | 'auto-start'
    | 'auto-end';
  duration: number;
  content?: string | (() => string);
};
