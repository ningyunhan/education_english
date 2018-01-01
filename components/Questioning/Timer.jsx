import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import { Components } from 'meteor/nova:core';

class Timer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: props.timeLeft
        }
        this.interval;
    }

    countingDown() {
        this.interval = setInterval(() => {
            if (this.state.timeLeft === 0) {
                clearInterval(this.interval);
                this.props.onTimesUp();
            } else {
                this.setState({
                    timeLeft: this.state.timeLeft - 1
                });
            }
        }, 1000);
    }

    componentDidMount() {
        if (!this.props.isPaused) {
            this.countingDown();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isPaused !== nextProps.isPaused && nextProps.isPaused) {
            clearInterval(this.interval);
        } else if (this.props.isPaused !== nextProps.isPaused && !nextProps.isPaused) {
            this.countingDown();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (!this.props.timeLeft) {
            return null;
        }
        return (
            <h2>
                <Label><Components.Icon name="clock-o"/>{this.state.timeLeft} s</Label>
            </h2>
        );
    }
}

Timer.propTypes = {
    timeLeft: PropTypes.number, // In seconds
    isPaused: PropTypes.bool
};

Timer.defaultProps = {
    onTimesUp: () => {}
}

export default Timer;