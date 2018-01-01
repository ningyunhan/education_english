import React, { Component, PropTypes } from 'react';
import { isEqual } from 'lodash';
import Graph from 'react-graph-vis';

class KnowledgeGraph extends Component {

    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props.graph, nextProps.graph) || !isEqual(this.props.options, nextProps.options);
    }

    render() {
        return (
            <Graph 
                graph={this.props.graph} 
                options={this.props.options} 
                events={this.props.events}
                getNetwork={this.props.getNetwork}
            />
        );
    }
}

KnowledgeGraph.propTypes = {
    getNetwork: PropTypes.func,
    graph: PropTypes.object,
    options: PropTypes.object,
    events: PropTypes.object
};

export default KnowledgeGraph;