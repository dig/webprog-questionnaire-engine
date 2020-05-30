const HTTP = require('http-status-codes'),
            { body, validationResult } = require('express-validator'),
            { v4 } = require('uuid'),
            QuestionnaireModel = require('../models/questionnaire.model'),
            QuestionnaireResponseModel = require('../models/questionnaire.response.model');

exports.validate = (method) => {
  switch (method) {
    case 'createAsJSON': {
      return [ 
        body('name', 'Name doesn\'t exist')
          .exists()
          .isString(),
        body('questions', 'Questions doesn\'t exist')
          .exists()
          .isArray(),
      ]   
    }
  }
};

exports.createAsJSON = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HTTP.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  } else {
    try {
      await QuestionnaireModel.create({
        uuid: v4(),
        user_id: req.user.id,
        name: req.body.name,
        questions: JSON.stringify(req.body.questions)
      });

      return res.status(HTTP.OK).send();
    } catch (error) {
      console.error(error);
      return res.status(HTTP.INTERNAL_SERVER_ERROR).send();
    }
  }
};

exports.get = async (req, res) => {
  if (req.params.uuid) {
    const questionnaire = await QuestionnaireModel.findOne({
      attributes: ['name', 'questions'],
      where: {
        uuid: req.params.uuid
      }
    });
  
    if (questionnaire)
      return res.status(HTTP.OK).send(questionnaire);

    return res.status(HTTP.NOT_FOUND).send();
  }

  return res.status(HTTP.UNPROCESSABLE_ENTITY).send();
};

exports.response = async (req, res) => {
  if (req.params.uuid && req.body) {
    const questionnaire = await QuestionnaireModel.findOne({
      attributes: ['name', 'questions'],
      where: {
        uuid: req.params.uuid
      }
    });

    if (questionnaire) {
      const response = await QuestionnaireResponseModel.create({
        uuid: req.params.uuid,
        response: JSON.stringify(req.body)
      });

      if (response) {
        return res.status(HTTP.OK).send();
      }
    }

    return res.status(HTTP.NOT_FOUND).send();
  }

  return res.status(HTTP.UNPROCESSABLE_ENTITY).send();
};

exports.userQuestionnaires = async (req, res) => {
  const questionnaire = await QuestionnaireModel.findAll({
    attributes: ['uuid', 'name'],
    where: {
      user_id: req.user.id
    }
  });

  return res.status(HTTP.OK).send(questionnaire);
};

exports.delete = async (req, res) => {
  if (req.params.uuid) {
    const questionnaire = await QuestionnaireModel.findOne({
      where: {
        uuid: req.params.uuid,
        user_id: req.user.id
      }
    });

    await questionnaire.destroy();
    return res.status(HTTP.OK).send();
  }

  return res.status(HTTP.UNPROCESSABLE_ENTITY).send();
};

exports.getResponse = async (req, res) => {
  if (req.params.uuid) {
    const questionnaire = await QuestionnaireModel.findOne({
      where: {
        uuid: req.params.uuid,
        user_id: req.user.id
      }
    });

    if (questionnaire) {
      const questionnaires = await QuestionnaireResponseModel.findAll({
        where: {
          uuid: req.params.uuid,
        }
      });
  
      return res.status(HTTP.OK).send(questionnaires);
    }

    return res.status(HTTP.UNAUTHORIZED).send();
  }

  return res.status(HTTP.UNPROCESSABLE_ENTITY).send();
};