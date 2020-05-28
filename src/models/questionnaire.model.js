const sequelize = require('../common/services/sequelize.service'),
      { DataTypes } = require('sequelize');

const questionnaireModel = sequelize.define('Questionnaire', {
  uuid: {
    type: DataTypes.STRING(48),
    allowNull: false,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.STRING(48),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(48),
    allowNull: false
  },
  questions: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  tableName: 'questionnaire',
  timestamps: false
});

questionnaireModel.sync();
module.exports = questionnaireModel;