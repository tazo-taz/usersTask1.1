const { fileExists, deleteFile, decodeBase64Image } = require('../common tools/image');
const logger = require('../logger');
const fs = require('fs');

function parseAvatarFromItem(avatar) {
  return avatar.slice(22);
}
function buildAvatarPath(avatar) {
  return `./public/avatars/${avatar}`;
}
function fromItemAvatarToPath(avatar) {
  return buildAvatarPath(parseAvatarFromItem(avatar));
}

module.exports.createAndParseAvatar = (avatar) => {
  const fileName = this.createUserAvatar(avatar);
  const fullFileNamePath = this.createdUserAvatarToItemAvatar(fileName);
  return fullFileNamePath;
};

module.exports.createdUserAvatarToItemAvatar = (fileName) => `http://localhost:3000/${fileName}`;

module.exports.createUserAvatar = (avatar) => {
  const imageBuffer = decodeBase64Image(avatar);
  const fileName = `${new Date() - 1}.${imageBuffer.type.split('/')[1]}`;
  fs.writeFile(`./public/avatars/${fileName}`, imageBuffer.data, (err) => {
    if (err) logger.log(err);
  });

  return fileName;
};

module.exports.deleteUserAvatar = (avatar) => {
  const path = fromItemAvatarToPath(avatar);
  fileExists(path, {
    onError: (e) => logger.log(e),
    onSuccess: () => deleteFile(path),
  });
};
