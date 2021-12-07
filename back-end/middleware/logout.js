const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  
  req.userData = {
    userId: ''
  };

  next();
};