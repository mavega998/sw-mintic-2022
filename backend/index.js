const express = require('express');
const app = express();

const { config } = require('./config/index');

const {
    logErrors,
    errorHandler,
    wrapErrors
} = require('./utils/middlewares/errorHandlers.js');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

// Body Parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API MinTIC - 2022 (BackEnd)');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/person', require('./routes/person'));
app.use('/api/users', require('./routes/user'));

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening in port ${config.port}`)
});