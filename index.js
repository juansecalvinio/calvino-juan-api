const express = require('express');
const app = express();

const cors = require('cors');
const { config } = require('./config/index');
const authApi = require('./routes/auth.js');
const meetupsApi = require('./routes/meetups.js');

const { 
    logErrors,
    errorHandler,
    wrapError
} = require('./utils/middlewares/errorHandlers.js');

const notFoundHandler = require('./utils/middlewares/404Handler.js');

// Middleware body parser 
app.use(express.json());

app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.options('*', cors());

// Routes
authApi(app);
meetupsApi(app);

// Captura error 404
app.use(notFoundHandler);

// Los error middlewares van siempre al final
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);


app.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
});