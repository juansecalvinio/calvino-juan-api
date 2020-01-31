const express = require('express');
const MeetupsServices = require('../services/meetups');

function meetupsApi(app) {
    const router = express.Router();
    app.use("/api/meetups", router);

    const meetupsServices = new MeetupsServices();

    router.get("/", async function (req, res, next) {
        const { tags } = req.query;
        
        try {
            const meetups = await meetupsServices.getMeetups({ tags });
            console.log(meetups);          
            res.status(200).json({
                datos: meetups,
                message: 'Meetups listed'
            });
        } catch (error) {
            next(error);
        }
    })

    router.get("/:id", async function (req, res, next) {
        const { id } = req.params;
        
        try {
            const meetup = await meetupsServices.getMeetup({ id });
            res.status(200).json({
                datos: meetup,
                message: 'Meetup retrieved'
            });
        } catch (error) {
            next(error);
        }
    })

    router.post("/", async function (req, res, next) {
        const { body: meetup } = req; // { body: meetup } crea un alias 'movie'
        
        try {
            const createdMeetupId = await meetupsServices.createMeetup({ meetup });
            res.status(201).json({
                datos: createdMeetupId,
                message: 'Meetup created'
            });
        } catch (error) {
            next(error);
        }
    })

    router.put("/:id", async function (req, res, next) {
        const { id } = req.params;
        const { body: meetup } = req;

        try {
            const updatedMeetupId = await meetupsServices.updateMeetup({ id, meetup });
            res.status(200).json({
                datos: updatedMeetupId,
                message: 'Meetup updated'
            });
        } catch (error) {
            next(error);
        }
    })

    router.delete("/:id", async function (req, res, next) {
        const { id } = req.params;

        try {
            const deletedMeetupId = await meetupsServices.deleteMeetup({ id });
            res.status(200).json({
                datos: deletedMeetupId,
                message: 'Meetup deleted'
            });
        } catch (error) {
            next(error);
        }
    })
}

module.exports = meetupsApi;