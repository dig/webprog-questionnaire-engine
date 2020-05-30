const sequelize = require('../common/services/sequelize.service'),
      { DataTypes } = require('sequelize');

const questionnaireResponseModel = sequelize.define('QuestionnaireResponse', {
  uuid: {
    type: DataTypes.STRING(48),
    allowNull: false,
    primaryKey: true
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  tableName: 'questionnaire_response',
  timestamps: false
});

questionnaireResponseModel.sync();
module.exports = questionnaireResponseModel;