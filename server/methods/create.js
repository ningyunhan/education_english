import assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { each } from 'lodash';
import { Knowledge, Groups, Images } from '../../collections';
import { knowledgeType, logError, trackingSource, groupType, vocabularyRootType } from '../../components/utils';
import { fetchSimilarMeaningService, fetchSimilarSpellingService, fetchImageService } from '../services';
import { errorType } from '../utils';

Meteor.methods({
    'createVocabularyImage'(imageType = knowledgeType.VOCABULARY, imageLimit = 8) {
        const knowledgeBase = Knowledge.find({ type: knowledgeType.VOCABULARY }).fetch();
        const callService = async knowledgeBase => {
            for (let knowledge of knowledgeBase) {
                try {
                    const imageResults = await fetchImageService(knowledge.title);
                    const images = imageResults.value;
                    for (let image of images) {
                        const document = {
                            title: knowledge.title,
                            type: knowledge.type,
                            url: image.contentUrl,
                            knowledgeNodeId: knowledge._id,
                            thumbnailUrl: image.thumbnailUrl,
                            attributes: {
                                name: image.name,
                                width: image.width,
                                height: image.height,
                                contentSize: image.contentSize,
                                encodingFormat: image.encodingFormat,
                                datePublished: image.datePublished
                            }
                        };
                        Images.upsert({ url: image.contentUrl }, { $set: document });
                        console.log(knowledge.title, 'image inserted');
                    }
                } catch (error) {
                    logError(error);
                }
            }
        };
        callService(knowledgeBase);
    },
    'createVocabularyRootKnowledgeGraph'(selectedGroupType, minGroupSize = 3, maxGroupSize = 10) {
        const knowledgeBase = Knowledge.find({ type: knowledgeType.VOCABULARY_ROOT }).fetch();
        for (let knowledgeRoot of knowledgeBase) {
            try {
                const relatedWords = knowledgeRoot.attributes.examples || [];
                let relatedKnowledgeIds = [];
                let difficultySum = parseFloat(knowledgeRoot.difficulty);
                for (let example of relatedWords) {
                    const foundKnowledge = Knowledge.findOne({ title: example });
                    if (foundKnowledge) {
                        difficultySum += parseFloat(foundKnowledge.difficulty);
                        relatedKnowledgeIds.push(foundKnowledge._id);
                    }
                }
                const rootType = knowledgeRoot.attributes.rootType;
                for (let root of knowledgeRoot.keywords) {
                    let regex;
                    switch (rootType) {
                        case vocabularyRootType.PREFIX:
                            regex = `/${root}*/`;
                            break;
                        case vocabularyRootType.ROOT:
                            regex = `/*${root}*/`;
                            break;
                        case vocabularyRootType.SUFFIX:
                            regex = `/*${root}/`;
                            break;
                        default:
                            regex = null;
                    }
                    if (regex) {
                        const relatedKnowledge = Knowledge.find({ title: { $regex: regex }, type: knowledgeType.VOCABULARY }).fetch();
                        for (let vocabulary of relatedKnowledge) {
                            difficultySum += parseFloat(vocabulary.difficulty);
                            relatedKnowledgeIds.push(vocabulary._id);
                            relatedWords.push(vocabulary.title);
                        }
                    }
                }
                if (relatedKnowledgeIds.length >= minGroupSize) {
                    const document = {
                        type: selectedGroupType,
                        difficulty: difficultySum / relatedKnowledgeIds.length,
                        relatedKnowledgeIds: relatedKnowledgeIds,
                        relatedContent: {
                            relatedWords: relatedWords
                        },
                        coreKnowledgeId: knowledgeRoot._id,
                        coreKnowledgeTitle: knowledgeRoot.keywords.join(', ')
                    };
                    Groups.upsert({ type: document.type, coreKnowledgeId: document.coreKnowledgeId }, { $set: document });
                }

            } catch (error) {
                logError(error);
            }

        }
    },

    'createVocabularyKnowledgeGraph'(selectedGroupType, minGroupSize = 3, maxGroupSize = 10) {
        assert(selectedGroupType, 'group type required');

        const knowledgeBase = Knowledge.find({ type: knowledgeType.VOCABULARY }).fetch();
        let serviceCall;
        switch (selectedGroupType) {
            case groupType.vocabulary.SIMILAR_MEANING:
                serviceCall = fetchSimilarMeaningService;
                break;
            case groupType.vocabulary.SIMILAR_SPELLING:
                serviceCall = fetchSimilarSpellingService;
                break;
            default:
                serviceCall = fetchSimilarMeaningService;
                break;
        }
        const callService = async (knowledgeBase, serviceCall, selectedGroupType) => {
            for (let knowledge of knowledgeBase) {
                try {
                    const relations = await serviceCall(knowledge.title);
                    let relatedWords = [];
                    let relatedKnowledgeIds = [];
                    let difficultySum = parseFloat(knowledge.difficulty);
                    each(relations, (data, index) => {
                        if (index > maxGroupSize) {
                            return;
                        }
                        const currentKnowledge = Knowledge.findOne({ title: data.word, type: knowledge.type });
                        if (currentKnowledge) {
                            difficultySum += parseFloat(currentKnowledge.difficulty);
                            relatedWords.push(currentKnowledge.title);
                            relatedKnowledgeIds.push(currentKnowledge._id);
                        }
                    });
                    if (relatedKnowledgeIds.length >= minGroupSize) {
                        const document = {
                            type: selectedGroupType,
                            difficulty: difficultySum / relatedKnowledgeIds.length,
                            relatedKnowledgeIds: relatedKnowledgeIds,
                            relatedContent: {
                                relatedWords: relatedWords
                            },
                            coreKnowledgeId: knowledge._id,
                            coreKnowledgeTitle: knowledge.title
                        };
                        Groups.upsert({ type: document.type, coreKnowledgeId: document.coreKnowledgeId }, { $set: document });
                    }
                } catch (error) {
                    logError(errorType.REMOTE_SERVICE_CALL_ERROR, error, trackingSource.UPLOAD);
                }

            }
        }

        callService(knowledgeBase, serviceCall, selectedGroupType);
    }
});