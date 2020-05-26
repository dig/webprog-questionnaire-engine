const config = require('../config/config.json'),
      express = require('express'),
      path = require('path'),
      GoogleAuth = require('simple-google-openid');

const port = process.env.PORT || 8080;
const app = express();

app.use(GoogleAuth(config.oauth.google.clientID));

// routes
const QuestionnaireRouter = require('./routes/questionnaire.route');
QuestionnaireRouter.routesConfig(app);

app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
console.log('[EXPRESS] Serving /public.');

app.listen(port);
console.log(`[EXPRESS] Listening on port ${port}.`);