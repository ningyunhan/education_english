import { clone } from 'lodash';
import React, { Component, PropTypes, cloneElement } from 'react';

class Connector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: props.initalStep || 0,
            states: []
        };
    }

    render() {
        const children = React.Children.toArray(this.props.children);

        const element = children[this.state.step];
        const newElement = cloneElement(element, {
            formId: this.state.step,
            connectToLastView: this.connectToLastView.bind(this),
            connectToNextView: this.connectToNextView.bind(this),
            initialState: this.state.states[this.state.step],
            key: this.state.step
        });
        return newElement;
    }

    connectToNextView(state) {
        if (this.state.step + 1 < React.Children.toArray(this.props.children).length) {
            let states = clone(this.state.states);
            states[this.state.step] = state;
            this.setState({
                states: states,
                step: this.state.step + 1
            });
        }
    }

    connectToLastView(state) {
        if (this.state.step - 1 >= 0) {
            let states = clone(this.state.states);
            states[this.state.step] = state;
            this.setState({
                states: states,
                step: this.state.step - 1
            });
        }
    }
}

Connector.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
};

export default Connector;