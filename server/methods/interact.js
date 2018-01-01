import assert from 'assert';
import Users from 'meteor/nova:users';
import { calculate } from 'sm2-plus';
import { isEmpty } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Knowledge, Records, Groups } from '../../collections';
import { newMutation } from 'meteor/nova:core';
import { calculatePerformanceRating } from '../utils';
import { getDaysSinceEpoch, groupStudyLevels } from '../../components/utils';

Meteor.methods({

    'updateStudyRecord'(document) {
        assert(document);
        assert(document.knowledgeGroupId);
        assert(document.knowledgeId);
        assert(document.answerStatus);
        assert(document.timeUsed);

        if (this.userId) {
            const performance = calculatePerformanceRating(document.timeUsed, document.answerStatus);
            const studyRecord = Records.findOne({ userId: this.userId, knowledgeNodeId: document.knowledgeId });
            const knowledge = Knowledge.findOne({ _id: document.knowledgeId });
            let difficulty = studyRecord ? studyRecord.knowledgeStudyRecords.difficulty : knowledge.attributes.defaultDifficulty;
            const TODAY = getDaysSinceEpoch();
            const updated = studyRecord ? studyRecord.knowledgeStudyRecords.update : TODAY - 1;

            const newStudyCycle = calculate({
                update: updated,
                difficulty: parseFloat(difficulty),
                interval: document.daysBetweenReview || 1,
            }, performance, TODAY);

            const newRecord = {
                ...newStudyCycle,
                timeUsed: document.timeUsed,
                status: document.answerStatus
            };

            const record = {
                userId: this.userId,
                knowledgeGroupId: document.knowledgeGroupId,
                knowledgeNodeId: knowledge._id,
                knowledgeStudyRecords: newRecord
            };
            if (studyRecord) {
                Records.update({ userId: this.userId, knowledgeNodeId: document.knowledgeId }, { $set: { knowledgeStudyRecords: newRecord } });
            } else {
                newMutation({
                    action: 'record.new',
                    collection: Records,
                    document: record,
                    currentUser: Meteor.user(),
                    validate: false
                });
            }
        }
    },
    
    'clearUserTrophy'(userIds) {
        const currentUser = Users.findOne({_id: this.userId});
        if (!isEmpty(currentUser) && currentUser.isAdmin && isEmpty(userIds)) {
            const users = Users.find({}).fetch();
            for (let user of users) {
                if (!isEmpty(user)) {
                    let profile = user.profile;
                    profile.trophy = 0;
                    Users.update({ _id: user._id }, {$set: { profile: profile }});
                }
            }
        }
    },

    'updateUserCurrentDifficulty'(document) {
        assert(document.userId);
        assert(document.currentDifficulty);
        assert(document.userId === this.userId);

        const currentUser = Meteor.user();
        if (currentUser) {
            let level = currentUser.profile.level;
            let difficulty = document.currentDifficulty;
            const studyGroup = groupStudyLevels.vocabulary[level];
            if (!Groups.findOne({ type: studyGroup, difficulty: { $gt: difficulty } })) {
                if (level + 1 <= groupStudyLevels.vocabulary.length - 1) {
                    level += 1;
                    difficulty = 0.01;
                }
            }
            Users.update(this.userId, {
                $set: {
                    'profile.difficultyLevel': difficulty,
                    'profile.level': level
                }
            });
        }
    },

    'addUserTrophy'(document) {
        assert(document.userId);
        assert(Number.isInteger(document.trophy));
        assert(document.userId === this.userId);

        const currentUser = Meteor.user();
        if (currentUser) {
            let trophy = currentUser.profile.trophy;
            trophy += document.trophy;
            Users.update(this.userId, {
                $set: {
                    'profile.trophy': trophy
                }
            });
        }
    },

    'consumeUserTrophy' (document) {
        assert(document.userId);
        assert(Number.isInteger(document.trophy));
        assert(document.userId === this.userId);

        const currentUser = Meteor.user();
        if (currentUser) {
            let trophy = currentUser.profile.trophy;
            trophy -= document.trophy;
            Users.update(this.userId, {
                $set: {
                    'profile.trophy': trophy
                }
            });
        }
    }
});