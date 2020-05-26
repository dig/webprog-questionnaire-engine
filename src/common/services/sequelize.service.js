const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../../data/database.sqlite',
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