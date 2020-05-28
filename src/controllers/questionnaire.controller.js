const HTTP = require('http-status-codes'),
            { body, validationResult } = require('express-validator'),
            { v4 } = require('uuid'),
            QuestionnaireModel = require('../models/questionnaire.model');

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