const GoogleAuth = require('simple-google-openid'),
      QuestionnaireController = require('../controllers/questionnaire.controller');

exports.routesConfig = function (app) {
  app.get('/api/questionnaire', [
    GoogleAuth.guardMiddleware(),
    QuestionnaireController.questionnaires
  ]);
};