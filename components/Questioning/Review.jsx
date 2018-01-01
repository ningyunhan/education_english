import React, { Component, PropTypes } from 'react';
import { map, isEmpty } from 'lodash';
import { Components } from 'meteor/nova:core';
import { Row, Col, Label } from 'react-bootstrap';
import Pronunciation from './Pronunciation';
import Example from './Example';
import { knowledgeType } from '../utils';

class Review extends Component {

    render() {
        const attributes = this.props.question.attributes;
        const meanings = [attributes.translation, attributes.definition];
        const type = this.props.question.type;
        return (
            <Row>
                <Col xs={12} md={12} lg={12}>
                    <h1>{this.props.question.title}</h1>
                    {type && type === knowledgeType.VOCABULARY_ROOT &&
                        <h2>
                            <Label bsStyle="success">
                                This is a vocabulary root
                            </Label>
                        </h2>
                    }
                    <h5>
                        <Pronunciation
                            hasAudio={attributes.has_audio}
                            defaultAddress={attributes.audio}
                            audioAddresses={attributes.audio_addresses}
                            pronunciations={attributes.pronunciations || attributes.pronunciation}
                            autoPlay={true} />
                    </h5>
                    <div className="explains">
                        {
                            map(meanings, (value, key) => {
                                return <h4 key={key}>{value}</h4>
                            })
                        }
                    </div>
                    {!isEmpty(attributes.example) && <Example example={attributes.example} />}
                </Col>
            </Row>
        );
    }
}

Review.propTypes = {
    question: PropTypes.shape({
        title: PropTypes.string,
        type: PropTypes.string,
        excerpt: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes
        }))
    })
};

export default Review;