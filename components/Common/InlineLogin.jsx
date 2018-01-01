import React, { Component } from 'react';
import { Components } from 'meteor/nova:core';
import { Row, Col } from 'react-bootstrap';

class InlineLogin extends Component {
    render() {
        return (
            <Row>
                <Col md={4} mdOffset={4}>
                    <Components.UsersAccountForm />
                </Col>
            </Row>
        );
    }
}

export default InlineLogin;