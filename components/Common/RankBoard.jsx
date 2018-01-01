import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { ListGroup, ListGroupItem, Label, Col } from 'react-bootstrap';
import { flipInX } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    flipInX: {
        animationName: flipInX,
        animationDuration: '2s'
    }
});

class RankBoard extends Component {
    render() {
        const Score = this.props.boardScoreComponent;
        return (
            <Col md={12} className="rank-board">
                <h1 className="board-name">
                    {this.props.boardName}
                </h1>
                <h4 className="board-desc">{this.props.boardDescription}</h4>
                <ListGroup>
                    {
                        map(this.props.ranks, (rank, key) =>
                            <ListGroupItem key={Math.random()} className={`${key % 2 === 0 ? 'even' : 'odd'} ${css(styles.flipInX)}`}>
                                <Col md={1}>
                                    <Label bsSize="lg" bsStyle="success">
                                        {key + 1}
                                    </Label>
                                </Col>
                                <Col md={5}>
                                    <span className="board-content-title">
                                        {rank.title}
                                    </span>
                                </Col>
                                <Col md={2}>
                                    <Label bsStyle="warning">
                                        {rank.subTitle}
                                    </Label>
                                </Col>
                                <Col md={2}>
                                    <span>
                                        {rank.content}
                                    </span>
                                </Col>
                                <Col md={2}>
                                    {Score && <Score count={rank.score} />}
                                </Col>
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
            </Col>
        );
    }
}

RankBoard.propTypes = {
    ranks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        subTitle: PropTypes.string,
        content: PropTypes.string,
        score: PropTypes.number
    })),
    boardScoreComponent: PropTypes.element,
    boardName: PropTypes.string,
    boardDescription: PropTypes.string
};

export default RankBoard;