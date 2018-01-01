import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Components, registerComponent } from "meteor/nova:core";
import PropTypes from 'prop-types';

class Suggest extends Component {
    render() {
        return (
            <div>
                {
                    this.props.triggerComponent || <a onClick={this.props.toggle}>{this.props.controlText}</a>
                }
                <Panel collapsible expanded={this.props.isOpen} header={this.props.contentTitle}>
                    <Components.SmartForm 
                        collection={this.props.collection}
                        documentId={this.props.documentId}
                        fragment={this.props.fragment}
                        prefilledProps={this.props.prefilledProps}
                        showRemove={false}
                        successCallback={document => {
                            this.props.close();
                        }}
                    />
                </Panel>
            </div>
        );
    }
}

Suggest.propTypes = {
    documentId: PropTypes.string,
    collection: PropTypes.object,
    prefilledProps: PropTypes.object,
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    open: PropTypes.func,
    triggerComponent: PropTypes.node
};

export default Suggest;