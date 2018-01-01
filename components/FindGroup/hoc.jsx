import { Meteor } from 'meteor/meteor';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { getRandomFromArray, groupType, logBI } from '../utils';
import { each, concat, uniqBy, groupBy, filter, map, get, shuffle, findIndex } from 'lodash';

const relationTypeMapping = {
    [groupType.vocabulary.SIMILAR_MEANING]: 'similar meaning',
    [groupType.vocabulary.SIMILAR_SPELLING]: 'similar pronuncation',
    [groupType.vocabulary.SHARE_VOCABULARY_ROOT]: 'same or similar root vocabulary'
}

export default compose(
    withState('hasToPickCount', 'setHasToPickCount', 3),
    withState('hasToMatchExampleCount', 'setHasToMatchExampleCount', 3),
    withProps(props => ({
        currentGroupType: relationTypeMapping[get(props.terms, 'type', groupType.vocabulary.SIMILAR_SPELLING)]
    })),
    withProps(props => {
        let results = [];
        each(props.groupArray, group => {
            let randomCards = group.relatedKnowledgeNodes.length >= props.hasToPickCount ? getRandomFromArray(group.relatedKnowledgeNodes, props.hasToPickCount) : [];
            randomCards = map(randomCards, knowledge => ({
                ...knowledge,
                knowledgeGroup: group
            }));
            results = concat(results, { ...group.coreKnowledgeNode, knowledgeGroup: group }, randomCards);
        });
        return {
            gameResults: uniqBy(results, '_id')
        }
    }),
    withState('cards', 'setCards', ({ gameResults }) => shuffle(gameResults)),
    withState('selectedCards', 'setSelectedCards', {}),
    withState('correctCount', 'setCorrectCount', 0),
    withState('correctCardsGroup', 'setCorrectCardsGroup', null),
    withState('exampleToMatch', 'setExampleToMatch', null),
    withState('opportunity', 'setOpportunity', 3),
    withHandlers({
        onCardPicked: props => knowledge => {
            if (props.selectedCards[knowledge._id]) {
                let newSelectedCards = props.selectedCards;
                delete newSelectedCards[knowledge._id];
                props.setSelectedCards(newSelectedCards);
            } else {
                let newSelectedCards = props.selectedCards;
                newSelectedCards[knowledge._id] = knowledge;
                if (Object.keys(newSelectedCards).length === props.hasToPickCount) {
                    const groups = groupBy(props.selectedCards, 'knowledgeGroup._id');
                    if (Object.keys(groups).length === 1) {
                        // find group correctly.
                        logBI('Game Find Group', 'Find Same Group', 'Success');
                        props.setCards(filter(props.cards, card => !props.selectedCards[card._id]));
                        props.setSelectedCards({});
                        props.setCorrectCardsGroup(newSelectedCards);
                        let example = [];
                        each(newSelectedCards, knowledge => {
                            if (Array.isArray(knowledge.attributes.example)) {
                                const randomExample = getRandomFromArray(knowledge.attributes.example, 1, 'id');
                                if (randomExample) {
                                    example.push({
                                        knowledgeId: knowledge._id,
                                        ...randomExample
                                    });
                                }
                            }
                        });
                        !props.exampleToMatch && props.setExampleToMatch(shuffle(example));
                    } else {
                        logBI('Game Find Group', 'Find Same Group', 'Failed');
                        // find group failed.
                        if (props.opportunity !== 0) {
                            props.setSelectedCards({});
                            props.setOpportunity(props.opportunity - 1);
                        }
                    }
                } else {
                    props.setSelectedCards(newSelectedCards);
                }
            }
        }
    }),
    withHandlers({
        onDrop: props => (example, knowledge) => {
            if (example.knowledgeId === knowledge._id) {
                logBI('Game Find Group', 'Match Example', 'Success');
                let exampleToMatch = props.exampleToMatch;
                exampleToMatch[findIndex(exampleToMatch, ['knowledgeId', example.knowledgeId])] = { matched: true, ...example };
                props.setExampleToMatch(exampleToMatch);

                let newSelectedCards = props.correctCardsGroup;
                delete newSelectedCards[example.knowledgeId];
                props.setCorrectCardsGroup(newSelectedCards);

                if (findIndex(exampleToMatch, ['matched', undefined]) < 0) {
                    props.setCorrectCount(props.correctCount + 1);
                }
                let shouldResetExample = true;
                each(exampleToMatch, example => {
                    if (!example.matched) {
                        shouldResetExample = false;
                    }
                });
                if (shouldResetExample) {
                    props.setExampleToMatch(null);
                    props.setCorrectCardsGroup(null)
                }
            } else {
                if (props.opportunity !== 0) {
                    logBI('Game Find Group', 'Match Example', 'Failed');
                    props.setOpportunity(props.opportunity - 1);
                }
            }
        },
        tryAgain: props => () => {
            logBI('Game Find Group', 'Failed Game', 'Play Again');
            props.onGameTryAgain();
            props.setCards(shuffle(props.gameResults));
            props.setOpportunity(3);
            props.setCorrectCount(0);
            props.setExampleToMatch(null);
            props.setSelectedCards({});
            props.setCorrectCardsGroup(null);
        },
        goStudy: props => () => {
            logBI('Game Find Group', 'Failed Game', 'Go Learn');
            props.onGameFailed();
            props.router.push('/learn');
        },
        goQuiz: props => () => {
            logBI('Game Find Group', 'Won Game', 'Go Report');
            props.onGameSuccess({
                correctCount: props.correctCount,
                lives: props.opportunity 
            });
            const accessToken = Meteor.uuid();
            props.createToken(accessToken);
            props.router.push(`/quiz?token=${accessToken}`);
        }
    })

);