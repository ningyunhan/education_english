import assert from 'assert';
import { promiseWait, promiseGET } from '../utils';

export default async input => {
    assert(input, 'string input is expected');
    console.log('start fetch synonym: ', input);
    const url = `https://api.datamuse.com/words?sl=${input}`;
    const synonym = await promiseGET(url);
    await promiseWait(1000);
    return synonym;
};