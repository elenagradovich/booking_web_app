const jwt = require('jsonwebtoken');

// set in .env file
const jwtSecretKey = 'mern_secret-key';

/**
 * Returns ready to use absolute url to locally saved file file
 * @param {Object} req
 * @param {string} relativeFilePath
 */
const mapFilePathToServerUrl = (req, relativeFilePath) => {
  if (!relativeFilePath) return '';

  const urlizedPath = relativeFilePath.replace(/\\/g, '/');
  return `${req.protocol}://${req.get('host')}/${urlizedPath}`;
};

/**
 * Remove protocol and host from url and return relative file path
 * @param {Object} req
 * @param {string} url
 */
const mapImageUrlToLocalFilePath = (req, url) => {
  if (!url) return '';

  const domainPath = `${req.protocol}://${req.get('host')}/`;
  return url.replace(domainPath, '');
};

/**
 * Generate a Jwt token
 * @param {Object|string} payload
 * @param {number} expiresInSeconds - number of seconds the jwt will expire after
 */
const generateJwt = (payload, expiresInSeconds = 9999999) => {
  const expiration = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const value = jwt.sign(
    {
      exp: expiration, // number of seconds since the epoch.
      data: payload
    },
    jwtSecretKey
  );

  return value;
};

const verifyJwt = (token) => {
  try {
    const decodedToken =  jwt.verify(token, jwtSecretKey);
    return decodedToken;
  } catch (err) {
    console.log(err)
  }
};

module.exports.mapFilePathToServerUrl = mapFilePathToServerUrl;
module.exports.mapImageUrlToLocalFilePath = mapImageUrlToLocalFilePath;
module.exports.generateJwt = generateJwt;
module.exports.verifyJwt = verifyJwt;
