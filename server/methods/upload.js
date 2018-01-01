import { Meteor } from 'meteor/meteor';
import { upsertBundleVocabularyKnowledge, upsertBundleVocabularyRootKnowledge, upsertBundleUser } from '../helpers/upserts';
import { readExcelWorkbook, errorType } from '../utils';
import { logError, trackingSource } from '../../components/utils';
import qiniu from 'qiniu';

Meteor.methods({
    'processVocabulary'(workbook) {
        try {
            const rows = readExcelWorkbook(workbook);
            upsertBundleVocabularyKnowledge(rows);
        } catch (error) {
            logError(errorType.REMOTE_SERVICE_CALL_ERROR, error, trackingSource.UPLOAD);
        }
    },

    'processStudentsInfo'(workbook) {
        try {
            const rows = readExcelWorkbook(workbook);
            upsertBundleUser(rows);
        } catch (error) {
            logError(errorType.REMOTE_SERVICE_CALL_ERROR, error, trackingSource.UPLOAD);
        }
    },

    'processVocabularyRoot'(workbook) {
        try {
            const rows = readExcelWorkbook(workbook);
            upsertBundleVocabularyRootKnowledge(rows);
        } catch (error) {
            logError(errorType.REMOTE_SERVICE_CALL_ERROR, error, trackingSource.UPLOAD);
        }
    },
    
    'getQiniuUploadToken'(type) {
        const ak = Meteor.settings.private.qiniuAccessKey;
        const sk = Meteor.settings.private.qiniuSecretKey;
        const mac = new qiniu.auth.digest.Mac(ak, sk);
        const bucket = `benru-${type}`;
        const options = {
            scope: bucket,
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }
});