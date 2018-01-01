import { readVocabularyKnowledge, readVocabularyRootKnowledge, readStudentInfo } from './mapping';
import { fetchVocabularyService } from '../services';
import { errorType } from '../utils';
import { logError, knowledgeType } from '../../components/utils';
import Users from 'meteor/nova:users';
import { Knowledge } from '../../collections';

export const upsertSingleVocabularyKnowledge = async row => {
    let knowledge;
    try {
        knowledge = readVocabularyKnowledge(row);
        const fetchedAttributes = await fetchVocabularyService(knowledge);
        const newAttributes = {
            ...knowledge.attributes,
            ...fetchedAttributes
        };
        knowledge.attributes = newAttributes;
        Knowledge.upsert({
            title: knowledge.title,
            type: knowledgeType.VOCABULARY
        }, { $set: knowledge });
    } catch (error) {
        logError(errorType.REMOTE_SERVICE_CALL_ERROR, error);
    }
};

export const upsertSingleVocabularyRootKnowledge = async row => {
    try {
        const knowledge = await readVocabularyRootKnowledge(row);
        Knowledge.upsert({
            title: knowledge.title,
            type: knowledgeType.VOCABULARY_ROOT
        }, { $set: knowledge });
    } catch (error) {
        logError(errorType.REMOTE_SERVICE_CALL_ERROR, error);
    }
};

export const upsertSingleUser = async row => {
    const studentInfo = readStudentInfo(row);
    if (!Users.findOne({ username: studentInfo.phone })) {
        console.log('inserting: ' + studentInfo.name);
        Accounts.createUser({
            username: studentInfo.phone,
            email: `${studentInfo.phone}@benru.org`,
            password: `${studentInfo.phone}`.substr(-8),
            slug: studentInfo.phone,
            profile: {
                ...studentInfo,
            },
            isDummy: false,
            isAdmin: false
        });
    }
}

export const upsertBundleUser = async rows => {
    for (let row of rows) {
        await upsertSingleUser(row);
    }
}

export const upsertBundleVocabularyRootKnowledge = async rows => {
    for (let row of rows) {
        await upsertSingleVocabularyRootKnowledge(row);
    }
};

export const upsertBundleVocabularyKnowledge = async rows => {
    for (let row of rows) {
        await upsertSingleVocabularyKnowledge(row);
    }
};



