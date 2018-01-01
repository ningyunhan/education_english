import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, isEmpty } from 'lodash';
import { Image, Carousel } from 'react-bootstrap';
import Loading from '../Common/Loading';
import Suggest from '../Common/Suggest';
import { Components } from 'meteor/nova:core';

class KnowledgeImage extends Component {
    render() {
        if (this.props.loading) {
            return <Loading />
        }
        let images = this.props.images;
        if (isEmpty(images)) {
            return null;
        }
        return (
            <div className="image-carousel">
                <Carousel
                    interval={2000}
                    controls={false}
                    nextIcon={<Components.Icon iconClass="chevron-circle-right" name="chevron-circle-right" />}
                    prevIcon={<Components.Icon iconClass="chevron-circle-left" name="chevron-circle-left" />}
                >
                    {
                        map(images, (image, key) =>
                            <Carousel.Item key={image._id}>
                                <Image src={image.thumbnailUrl} responsive width={200} height={200} />
                            </Carousel.Item>)
                    }
                </Carousel>
                {
                    this.props.enableSuggest && <Suggest
                        prefilledProps={{
                            uploadType: 'images',
                        }}
                        controlText="suggest"
                        collection={this.props.collection}
                        fragment={this.props.fragment}
                    />
                }
            </div>
        );
    }
}

KnowledgeImage.propTypes = {
    images: PropTypes.array
};

export default KnowledgeImage;