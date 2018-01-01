import { Meteor } from 'meteor/meteor';
import { isEmpty } from 'lodash';

Meteor.publish('leaderboard.trophy', (userIds = []) => {
    const userQuery = isEmpty(userIds) ? {} : { _id: { $in: userIds } };
    return Meteor.users.find(userQuery, {
        sort: { 'profile.trophy': -1 },
        limit: 40,
        fields: {
            username: 1,
            profile: 1,
            displayName: 1,
            email: 1
        }
    });
});