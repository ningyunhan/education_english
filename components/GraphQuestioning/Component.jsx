import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import KnowledgeGraph from '../Common/KnowledgeGraph';
import SlideIn from '../Common/SlideIn';
import Questioning from '../Questioning';

class GraphQuesioning extends Component {
    render() {
        const question = this.props.flashQuestion || this.props.question;
        return (
            <Row>
                <Col md={5}>
                    <KnowledgeGraph
                        options={this.props.knowledgeGraphOptions}
                        graph={this.props.knowledgeGraph}
                        getNetwork={this.props.getNetwork}
                        events={this.props.knowledgeEvents}
                    />
                </Col>
                <Col md={7}>
                    <SlideIn direction={this.props.flashQuestion ? 'right' : 'none'}>
                        <Questioning {...this.props} question={question} shouldShowImages={true}/>
                    </SlideIn>
                </Col>
            </Row>
        );
    }
}

GraphQuesioning.propTypes = {
    knowledgeGraphOptions: PropTypes.object,
    knowledgeGraph: PropTypes.object,
    knowledgeEvents: PropTypes.object,
};

export default GraphQuesioning;