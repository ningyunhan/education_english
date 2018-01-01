import React, { Component, PropTypes } from 'react';
import { Components } from 'meteor/nova:core';
import { map } from 'lodash';
import { Row, Col, Button, Label } from 'react-bootstrap';
import AudioPlayer from 'react-audio-player';

class Pronunciation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playCountry: null
        }
    }

    render() {
        if (typeof this.props.pronunciations === 'string') {
            return <span>{this.props.pronunciations}</span>
        }
        return (
            <Row key={Math.random()}>
                {
                    map(this.props.pronunciations, (value, key) => {
                        return <Col key={key} sm={6} md={6} lg={6}>
                            <Label>{key}</Label>
                            <span> [{value}] </span>
                            <Button bsStyle="link" onClick={this.onVolumeButtonClick.bind(this, key)}>
                                <Components.Icon name="volume-up" />
                            </Button>
                        </Col>
                    })
                }
                {this.props.hasAudio && <AudioPlayer
                    key={Math.random()}
                    src={this.state.playCountry ? this.props.audioAddresses[this.state.playCountry][0] : this.props.defaultAddress}
                    autoPlay={this.props.autoPlay}
                    controls={false} />
                }
            </Row>
        );
    }

    onVolumeButtonClick(key) {
        this.setState({
            playCountry: key
        });
    }
}

Pronunciation.propTypes = {
    hasAudio: PropTypes.bool,
    autoPlay: PropTypes.bool,
    pronunciations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

export default Pronunciation;