const express = require('express');
const { getById, getList, addItem, updateItem, patchItem, removeItem } = require('../services/users');
// const logger = require('../logger');
const { deleteUserAvatar, createAndParseAvatar } = require('../functions/users');

const defaultValidation = ({ username = null, email = null } = {}) => username && email;

const router = express.Router();

router.get('/:id', async (req, res) => {
  const user = await getById(req.params.id);

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.send(user);
});

router.get('/', async (req, res) => {
  const users = await getList();

  res.send(users);
});

router.post('/', async (req, res) => {
  if (!defaultValidation(req.body)) res.sendStatus(404);
  else {
    if (req.body.avatar) {
      req.body.avatar = createAndParseAvatar(req.body.avatar);
    }
    await addItem(req.body);

    res.sendStatus(201);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!defaultValidation(req.body)) res.sendStatus(404);
  else {
    const user = await getById(id);
    if (!user) res.sendStatus(404);
    else {
      if (user.avatar) deleteUserAvatar(user.avatar);
      if (req.body.avatar) req.body.avatar = createAndParseAvatar(req.body.avatar);
      await updateItem(id, req.body);
      res.sendStatus(200);
    }
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await getById(id);
  if (!user) return res.sendStatus(404);

  if (req.body.avatar) {
    if (user.avatar) deleteUserAvatar(user.avatar);
    if (req.body.avatar) req.body.avatar = createAndParseAvatar(req.body.avatar);
  }
  await patchItem(id, req.body);

  res.sendStatus(200);
  return '';
});

router.delete('/:id', async (req, res) => {
  const user = await getById(req.params.id);
  if (user) {
    const { avatar } = user;
    if (avatar) {
      deleteUserAvatar(avatar);
    }
  }

  await removeItem(req.params.id);

  res.sendStatus(200);
});

module.exports = router;
