import React, { Component, PropTypes } from 'react';

class BackgroundHeader extends Component {
    render() {
        const styles = {
            backgroundImage: `url(${this.props.backgroundImageUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundOrigin: 'content-box'
        };
        return (
            <h3 style={styles} className={`background-header ${this.props.className}`}>
                {this.props.title}
            </h3>
        );
    }
}

BackgroundHeader.propTypes = {
    title: PropTypes.string,
    backgroundImageUrl: PropTypes.string
};

BackgroundHeader.defaultProps = {
    backgroundImageUrl: '../app-images/ui/game-btn1.png'
}

export default BackgroundHeader;