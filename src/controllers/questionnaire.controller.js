const HTTP = require('http-status-codes'),
            { body, validationResult } = require('express-validator');

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
    console.log(req.user);
    return res.status(HTTP.OK).send();
  }
};