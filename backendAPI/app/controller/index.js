const express = require('express');

const authenticateSession = require('../middleware/authenticateRoute');
const router = express.Router();

const appRoutes = require('./app');
const bookingRoutes = require('./booking');

// App routs are login and sign-up which do not require session check
router.use('/app', appRoutes);
router.use(authenticateSession); // Routes below this needs session verification if the user is logged in or not
router.use('/booking', bookingRoutes);

module.exports = router;
