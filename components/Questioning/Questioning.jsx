import React, { Component, PropTypes } from 'react';
import { Row, Col, Well, Button, Label, ProgressBar } from 'react-bootstrap';
import SingleSelect from './SingleSelect';
import Review from './Review';
import Timer from './Timer';
import Visited from './Visited';
import KnowledgeImage from '../KnowledgeImage';
import KnowledgeEdit from '../KnowledgeEdit';

const questionTypeToComponent = {
    'REVIEW': Review,
    'MULTI_SELECT': SingleSelect,
    'SINGLE_SELECT': SingleSelect
};

class Questioning extends Component {

    componentDidMount() {
        this.props.handleQuestionDisplayed && this.props.handleQuestionDisplayed(this.props.question);
    }

    calculatePercentage() {
        return (this.props.index + 1) / this.props.questionLength * 100;
    }

    render() {
        const Question = questionTypeToComponent[this.props.questionForm];
        const question = this.props.question;
        return (
            <Well>
                {this.props.shouldShowImages && <KnowledgeImage knowledgeNodeId={question._id} numOfImages={4}/>}
                <questionHeader>
                    <Row>
                        {
                            !this.props.shouldHideQuestionProgressBar && <Col sm={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
                                <h4><Label bsStyle="success" bsSize="large">{this.props.index + 1} / {this.props.questionLength}</Label></h4>
                                <ProgressBar striped bsStyle="success" now={this.calculatePercentage()} />
                            </Col>
                        }
                        <Col>
                            <Timer
                                isPaused={this.props.shouldShowPopup}
                                key={Math.random()}
                                timeLeft={this.props.questionTimer}
                                onTimesUp={this.handleTimesUp.bind(this)}
                            />
                        </Col>

                        <Col>
                            <Visited question={question} />
                        </Col>
                    </Row>
                </questionHeader>

                <questionBody>
                    <Row>
                        {
                            !this.props.shouldHideQuestionControls && <Col sm={12} md={3} lg={3} className="bodyControl">
                                <Button bsStyle="link" disabled={this.props.shouldDisableBackButton} onClick={this.handleGoBack.bind(this, this.props.question)}>{this.props.backText}</Button>
                            </Col>
                        }
                        <Col sm={12} md={6} lg={6} mdOffset={this.props.shouldHideQuestionControls ? 3 : 0}>
                            <Question question={question} answer={this.props.answer} {...this.props} />
                        </Col>
                        {
                            !this.props.shouldHideQuestionControls && <Col sm={12} md={3} lg={3} className="bodyControl">
                                <Button bsStyle="link" disabled={this.props.shouldDisableNextButton} onClick={this.handleGoNext.bind(this, this.props.question)}>{this.props.nextText}</Button>
                            </Col>
                        }
                    </Row>
                </questionBody>

                <questionFooter>
                    {question.attributes.textbookGrade}
                    <br />
                    ({question.attributes.textbookVersion})
                    {question.attributes.textbookLevel}
                    <br />
                    {question.attributes.textbookUnit}
                </questionFooter>
                {this.props.currentUser && this.props.currentUser.isAdmin && <KnowledgeEdit documentId={question._id}/>}
            </Well>
        );
    }

    handleTimesUp() {
        this.props.handleTimesUp && this.props.handleTimesUp(this.props.question);
    }

    handleGoBack(question) {
        this.props.handleGoBack && this.props.handleGoBack(question);
    }

    handleGoNext(question) {
        this.props.handleGoNext && this.props.handleGoNext(question);
    }
}

Questioning.defaultProps = {
    shouldShowImages: false
}

Questioning.propTypes = {
    step: PropTypes.number,
    backText: PropTypes.node,
    nextText: PropTypes.node,
    shouldShuffleOptions: PropTypes.bool,
    shouldDisplayDontKnow: PropTypes.bool,
    shouldDisableNextButton: PropTypes.bool,
    shouldDisableBackButton: PropTypes.bool,
    questionTimer: PropTypes.number,
    question: PropTypes.shape({
        title: PropTypes.string,
        type: PropTypes.string,
        excerpt: PropTypes.string
    }),
    questionArray: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        type: PropTypes.string,
        excerpt: PropTypes.string
    })),
    selectedAnswer: PropTypes.shape({
        value: PropTypes
    })
};

export default Questioning;