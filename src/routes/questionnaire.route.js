const GoogleAuth = require('simple-google-openid'),
      QuestionnaireController = require('../controllers/questionnaire.controller');

exports.routesConfig = function (app) {
  app.put('/api/questionnaire', [
    GoogleAuth.guardMiddleware(),
    QuestionnaireController.validate('createAsJSON'),
    QuestionnaireController.createAsJSON
  ]);

  app.get('/api/questionnaire/:uuid', [
    QuestionnaireController.get
  ]);

  app.post('/api/questionnaire/:uuid', [
    QuestionnaireController.response
  ]);
};