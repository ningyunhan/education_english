import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import { slideInLeft, slideInRight, slideInUp, slideInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    left: {
        animationName: slideInLeft,
        animationDuration: '0.5s'
    },
    right: {
        animationName: slideInRight,
        animationDuration: '0.5s'
    },
    up: {
        animationName: slideInUp,
        animationDuration: '0.5s'
    },
    down: {
        animationName: slideInDown,
        animationDuration: '0.5s'
    },
});

class SlideIn extends Component {
    render() {
        const motionCss = this.props.direction !== 'none' && css(styles[this.props.direction])
        return (
            <Col key={Math.random()} className={'slide-in ' + motionCss}>
                {this.props.children}
            </Col>
        );
    }
}

SlideIn.propTypes = {
    direction: PropTypes.string
};

SlideIn.defaultProps = {
    direction: 'left'
}

export default SlideIn;