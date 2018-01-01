import React, { Component, PropTypes } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';

const dustbinTarget = {
  drop(props, monitor) {
    return {
      item: props.item,
    };
  }
};

class Droppable extends Component {

  render() {
    const { children, isOver, canDrop, connectDropTarget } = this.props;
    const isActive = isOver || canDrop;
    const opacity = isActive ? 0.5 : 1;
    const color = isActive ? 'darkkhaki' : 'darkgreen';

    return connectDropTarget(
      <div style={{ display: 'inline-block', color, opacity }}>
        {children}
      </div>,
    );
  }
}

Droppable.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object
}

export default dropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Droppable);