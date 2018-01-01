import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import { Row, Col, Button, Image } from 'react-bootstrap';


class CardsPile extends Component {
    render() {
        return (
            <Row className="cards-pile">
                <Col className="content">
                    <Image src="../app-images/ui/games/find-group/lets_play_a_game.png"/>
                    {
                        map(this.props.cards, (knowledge, key) =>
                            <Button
                                onClick={this.props.onCardPicked.bind(this, knowledge)}
                                key={key}
                                className={this.props.selectedCards[knowledge._id] ? 'card-selected' : 'card'}>
                                {knowledge.title}
                            </Button>
                        )
                    }
                </Col>
            </Row>
        );
    }
}

CardsPile.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    })),
    selectedCards: PropTypes.shape({
        title: PropTypes.string
    })
};

export default CardsPile;