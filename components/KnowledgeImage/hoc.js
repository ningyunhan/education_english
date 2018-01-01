import { compose, withProps, renameProp } from 'recompose';
import { withList } from 'meteor/nova:core';
import { Images } from '../../collections';

export default compose(
    withProps(props => {
        // set terms that used in withList to get quiz records by a date range.
        return {
            fragment: 'ImageUploadFragment',
            collection: Images,
            terms: {
                view: 'knowledgeImage',
                knowledgeNodeId: props.knowledgeNodeId,
                num: props.numOfImages
            }
        };
    }),
    withList({
        pollInterval: 0,
        collection: Images,
        queryName: 'ImageDocumentQuery',
        fragmentName: 'ImageFragment'
    }),
    renameProp('results', 'images')
);