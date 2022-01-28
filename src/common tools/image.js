const fs = require('fs');
const logger = require('../logger');

module.exports.decodeBase64Image = (dataString) => {
  const waste = () => {};

  const matches = dataString.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  const [match0, match1, match2] = matches;
  waste(match0);

  response.type = match1;
  response.data = Buffer.from(match2, 'base64');

  return response;
};

module.exports.deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      logger.error(err);
    }
  });
};

module.exports.fileExists = (filePath, { onError = () => {}, onSuccess = () => {} } = {}) => {
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) onError(err);
    else onSuccess();
  });
};
