import React, { Component, PropTypes } from 'react';
import { Jumbotron, Button, Col, Row } from 'react-bootstrap';
import { map } from 'lodash';

class Intro extends Component {
    onButtonClick() {
        this.props.onButtonClick && this.props.onButtonClick();
        this.props.connectToNextView && this.props.connectToNextView();
    }

    render() {
        const styles = {
            padding: '5%',
            backgroundImage: `url(${this.props.introBackgroundImageUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundOrigin: 'content-box'
        }
        return (
            <Jumbotron className="intro" style={styles}>
                <Row>
                    <Col md={7} mdOffset={2} className="intro-title">
                        <h1>{this.props.introTitle}</h1>
                    </Col>
                    <Col md={7} mdOffset={2} className="intro-content">
                        {
                            map(this.props.introContent, (intro, key) => <p key={key}>{intro}</p>)
                        }
                    </Col>
                    <Col md={4} mdOffset={4} className="intro-action">
                        <p><Button bsStyle="success" onClick={this.onButtonClick.bind(this)} >{this.props.introButtonText}</Button></p>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

Intro.propTypes = {
    introTitle: PropTypes.string,
    introContent: PropTypes.array,
    introButtonText: PropTypes.string,
    introBackgroundImageUrl: PropTypes.string,
    onButtonClick: PropTypes.func
};

Intro.defaultProps = {
    introBackgroundImageUrl: '../app-images/ui/intro-bg1.png'
}

export default Intro;