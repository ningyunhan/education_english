import React, { Component, PropTypes } from 'react';
import { map, isEmpty } from 'lodash';
import Draggable from '../Common/Draggable';
import Droppable from '../Common/Droppable';
import Medal from '../Common/Medal';
import Instruction from './Instruction';
import Live from './Live';
import { Components } from 'meteor/nova:core';
import { Row, Col, Label, Image } from 'react-bootstrap';

class WireUp extends Component {
    render() {
        let emptySlots = [];
        for (let i = 0; i < this.props.hasToPickCount; i++) {
            if (isEmpty(this.props.correctCardsGroup) && this.props.hasToPickCount) {
                emptySlots.push(
                    <h3 key={i} className="empty-slot"><Label bsSize="lg">______</Label></h3>
                )
            }
        }
        emptySlots.push(<span key={this.props.hasToPickCount}> 0 / {this.props.hasToPickCount}</span>)
        return (
            <Row className="wire-up">
                <Col className="content">
                    <Image className="monster" src="../app-images/ui/games/find-group/little_monster.png"/>
                    <Col>
                        <h2 className="index">
                            <Live count={this.props.opportunity} />
                            <Medal count={this.props.correctCount} />
                        </h2>
                        <Instruction title={isEmpty(this.props.correctCardsGroup) ? `Please find ${this.props.hasToPickCount} words with ${this.props.currentGroupType}:` : `Now drag and drop these words into their original sentence:`} />
                    </Col>
                    <Col className="correct-selection">
                        {isEmpty(this.props.correctCardsGroup) && this.props.hasToPickCount && emptySlots}
                        {

                            !isEmpty(this.props.correctCardsGroup) && map(this.props.correctCardsGroup, (knowledge, key) =>
                                <Draggable
                                    key={knowledge._id}
                                    item={knowledge}
                                    onDrop={this.props.onDrop}
                                    type={knowledge.type}>
                                    <h3><Label>{knowledge.title}</Label></h3>
                                </Draggable>
                            )
                        }
                    </Col>
                    <Col className="drop-section">
                        {
                            map(this.props.exampleToMatch, (example, key) => <blockquote key={key}>
                                <p>{example.first}
                                    <Droppable
                                        accepts={['vocabulary']}
                                        item={example}
                                        key={example.knowledgeId}
                                    >
                                        <Label bsStyle={example.matched ? 'success' : 'default'}>{example.matched ? example.word : '______'}</Label>
                                    </Droppable>{example.last}
                                    {example.matched && <Components.Icon iconClass="check-circle" name="check-circle" />}
                                </p>
                            </blockquote>)
                        }
                    </Col>
                </Col>
            </Row>
        );
    }
}

WireUp.propTypes = {
    groups: PropTypes.array,
    correctCardsGroup: PropTypes.shape({
        title: PropTypes.string
    }),
    exampleToMatch: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.string,
        first: PropTypes.string,
        last: PropTypes.string,
        translation: PropTypes.string
    })),
    hasToPickCount: PropTypes.number,
    relationType: PropTypes.shape({
        title: PropTypes.string
    })
};

WireUp.defaultProps = {
    relationType: {}
}


export default WireUp;