import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import { Components } from 'meteor/nova:core';

class Counter extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            timeUsed: 0
        };
        this.interval;
    }

    counting() {
        this.interval = setInterval(() => {
            if (this.state.timeUsed === this.props.timeLimit) {
                clearInterval(this.interval);
                this.props.onTimesUp();
            } else {
                this.setState({
                    timeUsed: this.state.timeUsed + 1
                });
            }
        }, 1);
    }

    componentDidMount() {
        if (!this.props.isPaused) {
            this.counting();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isPaused !== nextProps.isPaused && nextProps.isPaused) {
            clearInterval(this.interval);
        } else if (this.props.isPaused !== nextProps.isPaused && !nextProps.isPaused) {
            this.counting();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (!this.props.displayFormat) {
            return null;
        }
        return (
            <h2>
                <Label><Components.Icon name="clock-o"/>{this.state.timeUsed} s</Label>
            </h2>
        );
    }
}

Counter.propTypes = {
    displayFormat: PropTypes.string, // one of s, ms,  undefined
    isPaused: PropTypes.bool,
    timeLimit: PropTypes.number
};

export default Counter;