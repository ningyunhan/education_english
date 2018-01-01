import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (
            <div className="landing-footer">
                <div className="landing-footer-above">
                    <Row>
                        <Col className="footer-col" md={4}>
                            <p>Location</p>
                            <p>2027 S Main Street #B<br />Seattle, WA 98105 </p>
                        </Col>
                        <Col className="footer-col" md={4}>
                            <p>About</p>
                            <p>Coming soon</p>
                        </Col>
                        <Col className="footer-col" md={4}>
                            <p>Join Us</p>
                            <p>Coming soon</p>
                        </Col>
                    </Row>
                </div>
                <div className="landing-footer-below">
                    <Row>
                        <Col lg={12} md={12}>
                            Copyright © 一起·背单词
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Footer;