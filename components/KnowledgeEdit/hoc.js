import { compose, withProps, renameProp, withState, withHandlers } from 'recompose';
import { withDocument, withCurrentUser } from 'meteor/nova:core';
import { Knowledge } from '../../collections';

export default compose(
    withProps(props => ({
        documentId: props.documentId || props.params._id,
        Knowledge
    })),
    withState('isModalOpen', 'setIsModalOpen', false),
    withDocument({
        pollInterval: 0,
        collection: Knowledge,
        queryName: 'knowledgeSingleQuery',
        fragmentName: 'KnowledgeNodeFragment'
    }),
    withHandlers({
        openModal: props => () =>{
            props.setIsModalOpen(true);
        },
        closeModal: props => () => {
            props.setIsModalOpen(false);
        }
    }),
    withCurrentUser,
    renameProp('document', 'knowledge')
);