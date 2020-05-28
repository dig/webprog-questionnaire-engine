const { Sequelize } = require('sequelize'),
      path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../../data/database.sqlite'),
  host: 'localhost',
  username: 'root',
  password: 'root',
  logging: false,
});

const connectWithRetry = () => {
  console.log('[SEQUELIZE] Attempting connection with retry.');

  sequelize
    .authenticate()
    .then(() => console.log('[SEQUELIZE] Connection has been established successfully.'))
    .catch((err) => {
      console.log('[SEQUELIZE] Unable to connect to the database, retrying after 5 seconds.')
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
module.exports = sequelize;