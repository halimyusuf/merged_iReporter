const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const config = require('config');
const recordsController = require('../controllers/reportsController.js');
// const dotenv = require('dotenv');
const { auth } = require('../middleware/reportsMiddleware');


// dotenv.config();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));
const control = new recordsController();

router.all("/*", (req, res, next) => {
    req.app.locals.layout = 'home'
    next()
})

// post routes
// router.post('/auth/sign-up', (control.signup));
// router.post('/auth/login', control.login);
router.post('/record', auth.verifyToken, (control.createRecord));

// GET routes
router.get('/record' , (control.getRecord)); // auth.verifyToken
router.get('/', (control.homepage)); 
router.get('/red-flags', (control.getRedflags)); // auth.verifyToken
router.get('/interventions', (control.getInterventions));  // auth.verifyToken
router.get('/users', (control.getUsersInfo));  // auth.verifyToken
router.get('/posts', (control.getSpecificUserPost));  // auth.verifyToken
router.get('/red-flags/:id', (control.getSpecificRedflag));  // auth.verifyToken
router.get('/interventions/:id', (control.getSpecificIntervention));  // auth.verifyToken

// PATCH routes
router.patch('/red-flags/:id/comment', auth.verifyToken, control.editRedflagStory);
router.patch('/red-flags/:id/location', auth.verifyToken, control.editRedflagLocation);
router.patch('/red-flags/:id/status', auth.verifyToken, control.editRedflagStatus);
router.patch('/interventions/:id/status', auth.verifyToken, control.editInterventionStatus);
router.patch('/interventions/:id/comment', auth.verifyToken, control.editInterventionStory);
router.patch('/interventions/:id/location', auth.verifyToken, control.editInterventionLocation);

// DELETE routes
router.delete('/interventions/:id', control.deleteInterventionRecord);
router.delete('/red-flags/:id', control.deleteRedflagRecord);
router.delete('/users/:id', control.deleteUser);

module.exports = router;
