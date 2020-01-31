const MongoLib = require('../lib/mongo.js');
const bcrypt = require('bcrypt');

class UsersService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUser({ username }) {
        const [ user ] = await this.mongoDB.getAll(
            this.collection, 
            { username }
        );
        return user;
    }

    async authenticateUser(username, password) {
        const [ user ] = await this.mongoDB.getAll(
            this.collection,
            { username }
        );
        if(user.password !== password) {
            return false;
        }
        return user;
    }

    async createUser({ user }) {
        const { username, password, type } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUserId = await this.mongoDB.create(
            this.collection,{
                username,
                hashedPassword,
                type 
            });
        return createdUserId;
    }
}

module.exports = UsersService;