import xlsx from 'xlsx';
import { Meteor } from 'meteor/meteor';
import { answerStatusType, logError, trackingSource } from '../components/utils';

export const promiseGET = (url, headers = {}) => {
    const getRequest = Meteor.wrapAsync(Meteor.http.call);
    return new Promise((resolve, reject) => {
        try {
            const data = getRequest('GET', url, {
                timeout: 20000,
                headers
            }).data;
            resolve(data);
        } catch (error) {
            logError(errorType.REMOTE_SERVICE_CALL_ERROR, error, trackingSource.UPLOAD);
            reject(error);
        }
        
    });
};

export const promisePOST = (url, payload) => {
    const getRequest = Meteor.wrapAsync(Meteor.http.call);
    return new Promise(resolve => resolve(getRequest('POST', url, payload).data));
};

export const promiseWait = ms => new Promise(resolve => Meteor.setTimeout(resolve, ms));

export const errorType = {
    REMOTE_SERVICE_CALL_ERROR: 'REMOTE_SERVICE_CALL_ERROR',
    DATA_READ_ERROR: 'DATA_READ_ERROR',
    DATA_WRITE_ERROR: 'DATA_WRITE_ERROR',
    DATA_PARSE_ERROR: 'DATA_PARSE_ERROR'
};


export const readExcelWorkbook = workbook => {
    const firstSheetName = workbook.SheetNames[0];
    const csv = xlsx.utils.sheet_to_csv(workbook.Sheets[firstSheetName]);
    return csv.split(/\n/);
};

export const calculatePerformanceRating = (timeUsed, status) => {
    let statusFactor;
    let timeFactor;
    switch (status) {
        case answerStatusType.CORRECT:
            statusFactor = 1;
            timeFactor = 0;
            break;
        case answerStatusType.SKIPPED:
            statusFactor = 0.4;
            timeFactor = timeUsed < 1000 ? -0.1 : 0;
            break;
        case answerStatusType.TIME_OUT:
            statusFactor = 0.3;
            break;
        case answerStatusType.WRONG:
            statusFactor = 0.2;
            timeFactor = timeUsed < 1000 ? -0.1 : 0;
            break;
        default:
            statusFactor = 0.3;
            timeFactor = 0;
            break;
    }
    return statusFactor + timeFactor;
};