import React, { Component, PropTypes } from 'react';
import { countBy, find, isEmpty } from 'lodash';
import CardsPile from './CardsPile';
import WireUp from './WireUp';
import PopUp from '../Common/PopUp';
import Trophy from '../Common/Trophy';
import { Row, Col } from 'react-bootstrap';

class FindGroup extends Component {
    render() {
        const groupCounts = countBy(this.props.cards, 'knowledgeGroup._id');
        const exampleToMatch = this.props.exampleToMatch;
        const wonGame = !find(groupCounts, count => count > 2) && isEmpty(exampleToMatch);
        return (
            <Row className="find-group">
                <Col md={10} mdOffset={1}>
                    <Col md={5}>
                        <CardsPile
                            cards={this.props.cards}
                            onCardPicked={this.props.onCardPicked}
                            selectedCards={this.props.selectedCards}
                        />
                    </Col>
                    <Col md={7}>
                        <WireUp
                            correctCount={this.props.correctCount}
                            groups={this.props.groupArray}
                            currentGroupType={this.props.currentGroupType}
                            hasToPickCount={this.props.hasToPickCount}
                            exampleToMatch={this.props.exampleToMatch}
                            opportunity={this.props.opportunity}
                            onDrag={this.props.onDrag}
                            onDrop={this.props.onDrop}
                            correctCardsGroup={this.props.correctCardsGroup}
                        />
                    </Col>
                </Col>
                <PopUp
                    content={<h1>Game Over</h1>}
                    show={this.props.opportunity === 0}
                    firstButton={{
                        text: 'Try Again',
                        onClick: this.props.tryAgain.bind(this)
                    }} secondButton={{
                        text: this.props.shouldGameBeSkipped ? 'Skip it' : 'Go Study',
                        onClick: this.props.shouldGameBeSkipped ? this.props.goQuiz.bind(this) : this.props.goStudy.bind(this)
                    }} />

                <PopUp
                    content={<div>
                        <h1>You Won!</h1>
                        <h1><Trophy count={this.props.opportunity} /></h1>
                    </div>}
                    show={wonGame}
                    secondButton={{
                        text: 'Collect Trophies',
                        onClick: this.props.goQuiz.bind(this)
                    }} />
            </Row>
        );
    }
}

FindGroup.propTypes = {
    hasToPickCount: PropTypes.number,
    cards: PropTypes.array,
};

export default FindGroup;