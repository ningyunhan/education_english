import { promiseWait, promiseGET } from '../utils';
import assert from 'assert';

export default async (knowledge, exampeType = 'sys') => {
    assert(knowledge.title, 'string knowledge title is expected');

    console.log('start fetch vocabulary: ', knowledge.title);
    const wordUrl = `https://api.shanbay.com/bdc/search/?word=${knowledge.title}`;
    const vocabulary = await promiseGET(wordUrl);
    console.log('fetch vocabulary message: ', vocabulary.msg);
    await promiseWait(1000);
    console.log('start fetch vocabulary example: ', vocabulary.data.id);
    const exampleUrl = `https://api.shanbay.com/bdc/example/?vocabulary_id=${vocabulary.data.id}&type=${exampeType}`;
    const example = await promiseGET(exampleUrl);
    console.log('fetch vocabulary example message: ', example.msg);
    await promiseWait(1000);

    return {
        ...vocabulary.data,
        example: example.data
    };
};