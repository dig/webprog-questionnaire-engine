const HTTP = require('http-status-codes');

exports.questionnaires = async (req, res) => {
  console.log(req.user);
  return res.status(HTTP.OK).send();
};