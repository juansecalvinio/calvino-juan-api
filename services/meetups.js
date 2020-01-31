const MongoLib = require('./../lib/mongo');

class MeetupsService {
    constructor() {
        this.collection = 'meetups';
        this.mongoDB = new MongoLib();
    }

    async getMeetups({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const meetups = await this.mongoDB.getAll(
            this.collection, 
            query
        );
        return meetups || [];
    }

    async getMeetup({ id }) {
        const meetup = await this.mongoDB.get(
            this.collection, 
            id
        );
        return meetup || {};
    }

    async createMeetup({ meetup }) {
        const createdMeetupId = await this.mongoDB.create(
            this.collection, 
            meetup
        );
        return createdMeetupId;
    }

    async updateMeetup({ id, meetup }) {
        const updatedMeetupId = await this.mongoDB.update(
            this.collection, 
            id, 
            meetup
        );
        return updatedMeetupId;
    }

    async deleteMeetup({ id }) {
        const deletedMeetupId = await this.mongoDB.delete(
            this.collection, 
            id
        );
        return deletedMeetupId;
    }
};

module.exports = MeetupsService;