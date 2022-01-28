const express = require('express');
const router = express.Router();
const path = require('path');
const { fileExists } = require('../common tools/image');

router.get('/:imgUrl', (req, res) => {
  const { imgUrl } = req.params;

  const imgPath = `./public/avatars/${imgUrl}`;
  fileExists(imgPath, {
    onError: () => res.sendStatus(404),
    onSuccess: () => res.sendFile(path.join(`${__dirname}/.${imgPath}`)),
  });
});

module.exports = [router];
