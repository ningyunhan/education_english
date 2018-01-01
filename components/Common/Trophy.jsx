import React, { Component, PropTypes } from 'react';
import { Col, Label, Image } from 'react-bootstrap';
import { pulse, flipInX } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    pulse: {
        animationName: pulse,
        animationDuration: '1s'
    },
    flipInX: {
        animationName: flipInX,
        animationDuration: '1s'
    }
});

class Throphy extends Component {
    render() {
        return (
            <Col key={`trophy_${this.props.count}`} className={'trophy-section ' + css(styles.pulse)}>
                {/*<Label bsSize="lg" bsStyle="success" className="trophy">*/}
                    <Image src="../app-images/ui/trophy.png" /> {/*x <span className={css(styles.flipInX)}>{this.props.count}</span>*/}
                {/*</Label>*/}
            </Col>
        );
    }
}

Throphy.propTypes = {
    count: PropTypes.number
};

export default Throphy;