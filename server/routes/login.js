const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const recordsController = require('../controllers/reportsController.js')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json({extended:true}));

const control = new recordsController()

router.all("/*", (req, res, next) => {
    req.app.locals.layout = 'login'
    next()
})

//post routes
router.post('/auth/signup', control.signup );
router.post('/auth/login' , control.login )

// get routes
router.get('/auth/login', control.loginPage)
router.get('/auth/signup', control.signUpPage)

module.exports = router
