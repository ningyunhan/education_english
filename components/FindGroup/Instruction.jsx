import React, { Component, PropTypes } from 'react';
import { tada } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    tada: {
        animationName: tada,
        animationDuration: '1s'
    }
});

class Instruction extends Component {
    render() {
        return (
            <h3 key={this.props.title} className={`instruction ${css(styles.tada)}`}>
                {this.props.title}
            </h3>
        );
    }
}

Instruction.propTypes = {
    title: PropTypes.string
};

export default Instruction;