const express = require('express');

const UsersService = require('./../services/users.js');

function authApi(app) {
    const router = express.Router();
    app.use("/api/auth", router);
    
    const usersService = new UsersService();
    
    router.post("/login", async function(req, res, next) {
        const { body: user } = req;
        try {
            const userResponse = await usersService.authenticateUser(user.username, user.password);
            if(!userResponse) {
                res.status(400).json({
                    datos: {},
                    message: 'Login failed'
                });
            }
            res.status(200).json({
                datos: userResponse,
                message: 'Login success'
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = authApi;