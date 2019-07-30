const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routers.js');
const login_route = require('./login')
const hbs = require('express-handlebars');

module.exports = function (app) {
  app.use('/api/v1', routes);
  app.use('/api/v1', login_route)
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.engine('handlebars',hbs({defaultLayout: 'home'}));
  app.set('view engine','handlebars');
};
