import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Components, registerComponent } from "meteor/nova:core";
import PropTypes from 'prop-types';
import { Knowledge } from '../../collections';

class KnowledgeEdit extends Component {
    render() {
        const EditKnowledge = this.props.triggerComponent || Button;
        return (
            <div>
                <EditKnowledge onClick={this.props.openModal}>
                    edit
                </EditKnowledge>
                <Modal show={this.props.isModalOpen} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Knowledge</Modal.Title>
                    </Modal.Header>
                    <Components.SmartForm 
                        collection={Knowledge}
                        documentId={this.props.documentId}
                        showRemove={false}
                        successCallback={document => {
                            this.props.closeModal();
                        }}
                    />
                </Modal>
            </div>
            
        );
    }
}

KnowledgeEdit.propTypes = {
    documentId: PropTypes.string,
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    triggerComponent: PropTypes.node,
    
};

export default KnowledgeEdit;