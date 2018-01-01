import { isEmpty, reject, uniqBy } from 'lodash';
import assert from 'assert';

export const vocabularyRootType = {
    PREFIX: 'prefix',
    ROOT: 'root',
    SUFFIX: 'suffix'
};

export const answerStatusType = {
    CORRECT: 'CORRECT',
    WRONG: 'WRONG',
    SKIPPED: 'SKIPPED',
    TIME_OUT: 'TIME_OUT'
};

export const questionForm = {
    SINGLE_SELECT: 'SINGLE_SELECT',
    MULTI_SELECT: 'MULTI_SELECT',
    REVIEW: 'REVIEW'
};

export const gameForm = {
    FIND_GROUP: 'FIND_GROUP'
};

export const knowledgeType = {
    VOCABULARY: 'vocabulary',
    VOCABULARY_ROOT: 'vocabulary_root'
};

export const groupType = {
    vocabulary: {
        SIMILAR_MEANING: 'similar_meaning',
        OPPOSITE_MEANING: 'opposite_meaning',
        SIMILAR_PRONUNCATION: 'similar_pronuncation',
        SIMILAR_SPELLING: 'similar_spelling',
        SHARE_VOCABULARY_ROOT: 'share_vocabulary_root'
    }
};

export const groupStudyLevels = {
    vocabulary: [groupType.vocabulary.SIMILAR_SPELLING, groupType.vocabulary.SHARE_VOCABULARY_ROOT, groupType.vocabulary.SIMILAR_MEANING]
};

// Uitls funcs:

export const getDaysSinceEpoch = () => {
    const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
    return Math.round(new Date().getTime() / DAY_IN_MINISECONDS);
};

export const getRandomFromArray = (array, takeCount, uniqId = '_id') => {
    assert(array, 'hasToExist');
    assert(takeCount, 'hasToExist');
    
    if (takeCount >= array.length) {
        return array;
    }
    if (takeCount === 1) {
        return array[Math.floor(Math.random() * array.length)];
    }
    let copy = reject(uniqBy(array, uniqId), isEmpty);
    let results = [];

    for (let i = 0; i < takeCount; i++) {
        let randomIndex = Math.floor(Math.random() * copy.length);
        results.push(copy[randomIndex]);
        copy.splice(randomIndex, 1);
    }
    return results;
};

export const trimed = str => {
    return !isEmpty(str) ? str.trim() : '';
};

export const trackingSource = {
    NOVA: 'nova',
    UPLOAD: 'upload'
};

export const logError = (type, error, where = trackingSource.NOVA) => {
    console.log(type, error, where);
    RavenLogger.log(error);
};

export const logBI = (category, action, label, value, fields = {}) => {
    ga && ga('send', 'event', category, action, label, value, fields);
};