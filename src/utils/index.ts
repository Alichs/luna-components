import G6 from '@antv/g6';

const formmatDataUp = (data: any, fn: any) => {
  G6.Util.traverseTreeUp(data, (subtree: any) => fn(subtree));
};

export const openParent = (url: string) => {
  window.open('/ai/customers/' + url);
};

export default { formmatDataUp, openParent };
