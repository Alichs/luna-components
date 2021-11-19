import React from 'react';
import FieldContext from '../fieldContext';

class Field extends React.Component {
  static contextType = FieldContext;
  getControlled = (childProps) => {};

  render() {
    let children = this.props.children;
    React.cloneElement(children, this.getControlled(children.props));

    return this.props.children;
  }
}
export default Field;
