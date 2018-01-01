import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { Well, Panel, Label, Col, Button } from 'react-bootstrap';

class Task extends Component {
    render() {
        return (
            <Panel header={<h3>{this.props.taskName}</h3>} bsStyle={this.props.taskStatus}>
                
                    {
                        map(this.props.taskContent, (task, key) => {
                            return <h4 key={key}> - <Label bsStyle="warning" >{task.content}</Label> {task.name}</h4>
                        })
                    }
                    <Col md={4} mdOffset={4}>
                        <Button bsStyle="success" block onClick={this.props.onClickTaskStart.bind(this)}>Get Started!</Button>
                    </Col>
            </Panel>         
        );
    }
}

Task.propTypes = {
    onClickTaskStart: PropTypes.func,
    taskName: PropTypes.string,
    taskStatus: PropTypes.string,
    taskContent: PropTypes.array
};

export default Task;