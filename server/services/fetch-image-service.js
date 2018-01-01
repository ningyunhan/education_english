import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import { promiseWait, promiseGET } from '../utils';


/// Baidu events tracking
const bingImageSearchKey1 =  Meteor.settings.private.bingImageSearchKey1;
const bingImageSearchKey2 =  Meteor.settings.private.bingImageSearchKey2;

export default async query => {
    assert(query, 'string query is expected');
    const endPoint = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search';
    
    const url = `${endPoint}?q=${query}&count=10&safeSearch=strict&imageType=Photo&size=Medium`;
    const headers = {
        'BingAPIs-Market': 'zh-CN',
        'BingAPIs-TraceId': 'image_api',
        'Ocp-Apim-Subscription-Key': bingImageSearchKey1,
        'Retry-After': 'exceed_image_api_limit',
    };
    
    const synonym = await promiseGET(url, headers);
    await promiseWait(1000);
    return synonym;
};