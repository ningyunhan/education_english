import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class PopUp extends Component {
    render() {
        return (
            <Modal className="popup-body" show={this.props.show}>
                <Modal.Body className="popup-body">
                    {this.props.content}
                </Modal.Body>

                <Modal.Footer>
                    {this.props.firstButton && <Button onClick={this.props.firstButton.onClick}>{this.props.firstButton.text}</Button>}
                    {this.props.secondButton && <Button onClick={this.props.secondButton.onClick} bsStyle="success">{this.props.secondButton.text}</Button>}
                </Modal.Footer>
            </Modal>
        );
    }
}

PopUp.propTypes = {
    content: PropTypes.node,
    show: PropTypes.bool,
    firstButton: PropTypes.shape({
        text: PropTypes.string,
        onClick: PropTypes.func
    }),
    secondButton: PropTypes.shape({
        text: PropTypes.string,
        onClick: PropTypes.func
    })
};

export default PopUp;