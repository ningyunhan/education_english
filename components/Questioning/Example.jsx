import { map, get } from 'lodash';
import { Label } from 'react-bootstrap';
import React, { Component, PropTypes } from 'react';

class Example extends Component {
    render() {
        return (
            <div className="example">
                {
                    map(this.props.example, (value, key) => {
                        return <blockquote key={key}>
                            <p>{value.first}<Label bsStyle="success">{get(value, 'mid', value.word)}</Label>{value.last}</p>
                            <small>{value.translation}</small>
                        </blockquote>
                    })
                }
            </div>
        );
    }
}

Example.propTypes = {
    example: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired
    })).isRequired
};

export default Example;