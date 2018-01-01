import { Meteor } from 'meteor/meteor';
import { Knowledge, Records, Groups, Images } from '../../collections';
import { concat, uniq } from 'lodash';
import Users from 'meteor/nova:users';

Meteor.methods({
    'checkKnowledgeCounts'({ selector = {}, options = {} }) {
        return Knowledge.find(selector, options).count();
    },
    'checkGroupsCounts'({ selector = {}, options = {} }) {
        return Groups.find(selector, options).count();
    },
    'checkGroupsKnowledgeCounts'({ selector = {}, options = {} }) {
         const groups = Groups.find(selector, options).fetch();
         let knowledgeIds = [];
         for (let group of groups) {
            knowledgeIds = concat(uniq(knowledgeIds), uniq(group.relatedKnowledgeIds));
         }
         return knowledgeIds.length;
    },
    'checkRecordsCounts'({ selector = {}, options = {} }) {
        return Records.find(selector, options).count();
    },
    'checkUserCounts'({ selector = {}, options = {} }) {
        return Users.find(selector, options).count();
    },
    'checkImageCounts'({ selector = {}, options = {} }) {
        return Images.find(selector, options).count();
    },
});