import React, { Component } from 'react';
import Users from 'meteor/nova:users';
import { FormattedMessage } from 'react-intl';
import { Components } from 'meteor/nova:core';
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown, MenuItem, NavItem, Col, Row } from 'react-bootstrap';

class UsersMenu extends Component {
    render() {
        const { currentUser, client } = this.props;

        return (
            <Row>
                <Col md={3}>
                    <NavItem eventKey={1} href="#"><Components.UsersAvatar size="small" user={currentUser} link={false} /></NavItem>
                </Col>
                <Col md={9}>
                    <NavDropdown pullRight eventKey={2} title={Users.getDisplayName(currentUser)} id="basic-nav-dropdown">
                        <LinkContainer to={`/report`}>
                            <MenuItem className="dropdown-item" eventKey="1">Report</MenuItem>
                        </LinkContainer>
                        <LinkContainer to={`/account`}>
                            <MenuItem className="dropdown-item" eventKey="3"><FormattedMessage id="users.edit_account" /></MenuItem>
                        </LinkContainer>
                        <MenuItem divider />
                        <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out" /></MenuItem>
                    </NavDropdown>
                </Col>
            </Row>
        );
    }
}

export default UsersMenu;