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

## Design choices

### Database
I chose SQLite as the database because its simple and easy to use. This project didn't require a database like MySQL, MariaDB etc because theres only one application using the database at once.

### Backend
I decided to go with a simple MVC layout on the backend because it's what is used in industries and is a good way to structure a project. I'm using a database connector called sequelize which is a ORM (Object Relational Mapping), this allows me to store and retrieve objects. This also comes built in with many prevent exploit checks such as SQL injection.
