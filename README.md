# webprog-questionnaire-engine
A simple questionnaire engine that supports creating linear flow of questions.

## Installation
Install all server-side dependencies,
```
npm install
```

Start web server by running,
```
npm start
```

## Uploading a questionnaire JSON file
Sign in using google OAuth by clicking the "Login" button on the home page. Once signed in, it should redirect to the home page and you should see a create button. This will take you to the import questionnaire page. Select the json file and a questionnaire will automatically be created and stored in the database (SQLite).
