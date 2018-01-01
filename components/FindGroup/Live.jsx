import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import { pulse, flipInX } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import { Components } from 'meteor/nova:core';

const styles = StyleSheet.create({
    pulse: {
        animationName: pulse,
        animationDuration: '1s'
    },
    flipInX: {
        animationName: flipInX,
        animationDuration: '1s'
    }
});

class Live extends Component {
    render() {
        return (
            <Label key={`live_${this.props.count}`} className={css(styles.pulse)} bsSize={this.props.bsSize}>
                <Components.Icon iconClass="heart" name="heart"/> x <span className={css(styles.flipInX)}>{this.props.count}</span>
            </Label>
        );
    }
}

Live.propTypes = {
    count: PropTypes.number
};

export default Live;