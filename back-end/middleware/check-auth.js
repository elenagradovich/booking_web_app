const HttpError = require('../models/http-error');
const { verifyJwt } = require('../util/helpers');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'BEARER token'

    if (!token) return res.status(403).json({message: "Not authorized"})

    const decodedToken = verifyJwt(token);

    // add userData object to req
    req.userData = {
      userId: decodedToken.data.userId
    };

    next();
  } catch (err) {
    //return next(new HttpError('Authentication failed', 403));
    return res.status(403).json({message: "Not authorized"})
  }
};
