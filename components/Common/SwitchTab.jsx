import React, { Component, PropTypes } from 'react';
import { Tab, Row, Col, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class SwitchTab extends Component {
    render() {
        return (
            <Tab.Container id={this.props.id} defaultActiveKey="first">
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Nav bsStyle="tabs" className="switchTabs">
                            <NavItem eventKey="first">
                                {this.props.firstTitle}
                            </NavItem>
                            <NavItem eventKey="second">
                                {this.props.secondTitle}
                            </NavItem>
                            <NavItem eventKey="third">
                                {this.props.thirdTitle}                                
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12} md={12} lg={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                {this.props.firstContent}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {this.props.second}
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                {this.props.thirdContent}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

SwitchTab.propTypes = {

};

export default SwitchTab;