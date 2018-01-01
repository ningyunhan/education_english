import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import { get } from 'lodash';

const dragSrouce = {
  beginDrag(props) {
    return {
      id: get(props, 'item._id'),
    };
  },

  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const dropResult = monitor.getDropResult();
    props.onDrop(dropResult.item, props.item);
  }
};


class Draggable extends Component {

  render() {
    const { children, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ opacity, display: 'inline-block' }}>
        {isDropped ?
          <div>{children}</div> :
          children
        }
      </div>,
    );
  }
}

Draggable.PropsTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    item: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
};

export default dragSource(props => props.type, dragSrouce, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Draggable);

