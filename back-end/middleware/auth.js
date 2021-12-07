const HttpError = require('../models/http-error');
const { verifyJwt } = require('../util/helpers');

module.exports = (req, res, next) => {
  const headers = req.headers;
  const auth = req.headers.authorization;
  try {
    const token = auth.split(' ')[1]; // Authorization: 'BEARER token'
    if (!token) return res.status(400).json({message: "No token"})

    const decodedToken = verifyJwt(token);
    if (!decodedToken) return res.status(400).json({message: "No decodedToken"})
    // add userData object to req
    req.userData = {
      userId: decodedToken.data.userId
    };
    console.log('auth: ', req.userData.userId);
    next();
  } catch (err) {
    //return next(new HttpError('Authentication failed', 401));
    return res.status(401).json({message: "Not authorized"})
  }
};
