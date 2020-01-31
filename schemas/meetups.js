const joi = require('@hapi/joi');

const meetupIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createMeetupSchema = {
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
    date: joi.string().required(),
    attendance: joi.number().required(),
    weather: joi.number().required(),
    beers: joi.number().required(),
    active: joi.boolean().default(1)
}

module.exports = {
    meetupIdSchema,
    createMeetupSchema
}