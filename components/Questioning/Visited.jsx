import React, { Component, PropTypes } from 'react';
import { Label } from 'react-bootstrap';
import { getDaysSinceEpoch } from '../utils';

class Visited extends Component {
    render() {
        if (!this.props.question || !this.props.question.studyRecords) {
            return null;
        }
        return (
            <h4>
                <Label bsStyle="warning">Studied {getDaysSinceEpoch() - this.props.question.studyRecords.update} days ago</Label>
            </h4>
        );
    }
}

Visited.propTypes = {
    question: PropTypes.object
};

export default Visited;