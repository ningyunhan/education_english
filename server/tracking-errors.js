import { Meteor } from 'meteor/meteor';

RavenLogger.initialize({
    server: Meteor.settings.private.ravenServerDSN
});