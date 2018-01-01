import { compose, withState, withProps, withHandlers } from 'recompose';
import { logBI } from '../utils';
import { each, isEmpty, find } from 'lodash';

const styles = {
    currentKnowledge: {
        color: {
            border: '#18BC9C',
            background: '#18BC9C'
        },
    }
}

export default compose(
    withState('hasToPickCount', 'setHasToPickCount', 3),
    withProps(props => {
        const currentKnowledgeGroup = props.question.knowledgeGroup;
        const coreKnowledge = currentKnowledgeGroup.coreKnowledgeNode;
        const current = { chosen: false, ...styles.currentKnowledge };
        const hasCurrent = props.question._id === coreKnowledge._id ? current : {};
        let nodes = [{
            id: coreKnowledge._id,
            label: coreKnowledge.title,
            title: coreKnowledge.attributes.translation,
            ...hasCurrent
        }];
        let edges = [];
        each(currentKnowledgeGroup.relatedKnowledgeNodes, (node, key) => {
            const isCurrent = props.question._id === node._id ? current : {};
            if (coreKnowledge._id != node._id) {
                nodes.push({
                    id: node._id,
                    label: node.title,
                    title: node.attributes.translation,
                    ...isCurrent
                });
                edges.push({ from: coreKnowledge._id, to: node._id });
            }
        });
        return {
            currentKnowledgeGroup,
            knowledgeGraph: {
                nodes,
                edges
            }
        };
    }),
    withHandlers({
        getNetwork: props => Network => {
            const moveToOptions = {
                scale: 1.4,
                animation: false
            };
            Network.moveTo(moveToOptions);
        }
    }),
    withProps(props => ({
        knowledgeGraphOptions: {
            height: '750px',
            width: '100%',
            interaction: {
                selectConnectedEdges: false,
                tooltipDelay: 300
            },
            edges: {
                color: "#2C3E50",// stone,
                dashes: true,
                arrows: {
                    to: {
                        enabled: false
                    }
                }
            },
            nodes: {
                color: {
                    border: '#95a5a6',
                    background: '#b4bcc2',
                    highlight: {
                        border: '#8cdece',
                        background: '#8cdece'
                    },
                    hover: {
                        border: '#18BC9C',
                        background: '#ecf0f1'
                    }
                },
                font: {
                    color: '#ffffff'
                },
                shape: 'box',
                title: 'fox'
            }
        }
    })),
    withState('flashQuestion', 'setFlashQuestion', null),
    withProps(props => ({
        knowledgeEvents: {
            selectNode: ({ nodes }) => {
                const selectedKnowledgeId = !isEmpty(nodes) && nodes[0];
                const coreKnowledge = props.question.knowledgeGroup.coreKnowledgeNode;
                const relatedKnowledgeNodes = props.question.knowledgeGroup.relatedKnowledgeNodes;
                const knowledge = find([coreKnowledge, ...relatedKnowledgeNodes], { '_id': selectedKnowledgeId });
                if (knowledge) {
                    props.setFlashQuestion(props.question._id === knowledge._id ? null : knowledge);
                    logBI('Learn Knowledge Graph', 'Related Knowledge', 'Viewed');
                }
            }
        }
    })),
    withProps(props => ({
        shouldHideQuestionProgressBar: !!props.flashQuestion,
        shouldHideQuestionControls: !!props.flashQuestion,
    })),
    withHandlers({
        goBackToQuestioningFlow: props => () => {
            props.setFlashQuestion(null);
        }
    })
);