import React, { Component, PropTypes } from 'react';
import { shuffle, clone, map } from 'lodash';
import { Components } from 'meteor/nova:core';
import { Row, Col, Button } from 'react-bootstrap';
import Pronunciation from './Pronunciation';
import classnames from 'classnames';
import { answerStatusType } from '../utils';

class SingleSelect extends Component {

    render() {
        const attributes = this.props.question.attributes;
        let options = clone(this.props.question.options);
        if (this.props.shouldShuffleOptions) {
            options = shuffle(options);
        }
        return (
            <Row>
                <Pronunciation
                    hasAudio={attributes.has_audio}
                    defaultAddress={attributes.audio}
                    audioAddresses={attributes.audio_addresses}
                    pronunciations={attributes.pronunciations || attributes.pronunciation}
                    autoPlay={true} />
                <Col xs={12} md={12} lg={12} className="singleSelectOptions">
                    <h1>{this.props.question.title}</h1>
                    {
                        map(options, (option, index) => {
                            const answer = this.props.answer;
                            const isRelated = answer && answer.knowledgeId === option.key;
                            const buttonStyle = classnames({
                                'success': isRelated && answer.answerStatus === answerStatusType.CORRECT,
                                'danger': isRelated && answer.answerStatus === answerStatusType.WRONG
                            });
                            return (<Button
                                className="singleSelectOption"
                                block
                                disabled={!!answer}
                                bsStyle={buttonStyle || 'default'}
                                bsSize="large"
                                key={index}
                                onClick={this.onClick.bind(this, option)} >
                                {option.value && option.value.length > 20 ? option.value.substr(0, 20) + '...' : option.value}
                            </Button>)
                        })
                    }
                </Col>
                <Col sm={4} md={4} mdOffset={8} smOffset={8}>
                    {
                        this.props.shouldDisplayDontKnow && <Button
                            key={options.length}
                            block
                            onClick={this.onClick.bind(this, { key: options.length, value: 'dont_know' })}
                            bsStyle="danger"
                            bsSize="large"><Components.Icon name="frown-o" />I don't know</Button>
                    }
                </Col>
            </Row>
        );
    }

    onClick(selected) {
        this.props.handleSelectAnswer && this.props.handleSelectAnswer(selected);
    }
}

SingleSelect.propTypes = {
    handleSelectAnswer: PropTypes.func,
    question: PropTypes.shape({
        title: PropTypes.string,
        type: PropTypes.string,
        excerpt: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes
        }))
    }),
    shouldShuffleOptions: PropTypes.bool,
    shouldDisplayDontKnow: PropTypes.bool,
};

export default SingleSelect;