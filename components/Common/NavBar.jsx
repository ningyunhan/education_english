import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { getSetting, Components } from 'meteor/nova:core';

class NavBar extends Component {
    render() {
        const logoUrl = getSetting("logoUrl");
        const siteTitle = getSetting("title", "Nova");
        const tagline = getSetting("tagline");

        return (
            <Navbar className="stick-header">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><img src={logoUrl} alt="logo"/></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullLeft>
                    <NavItem eventKey={1} href="/discuss">Discuss</NavItem>
                    <NavItem eventKey={2} href="/learn">Learn</NavItem>
                    <NavItem eventKey={4} href="/leaderboard">Leaderboard</NavItem>
                </Nav>
                <Nav pullRight>
                    {!!this.props.currentUser ? <Components.UsersMenu /> : <Components.UsersAccountMenu />}
                    <NavItem>
                        <Components.PostsNewButton />
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;