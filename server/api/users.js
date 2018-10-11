const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      attributes: ['id', 'email'],
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const returnUser = { email: newUser.email, id: newUser.id };
    res.json(returnUser);
  } catch (e) {
    next(e);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const [, updatedUser] = await User.update(req.body, {
      where: { id: req.params.userId },
      returning: true,
      plain: true,
      attributes: ['id', 'email'],
    });
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.userId } });
    const remainingUsers = await User.findAll({ attributes: ['id', 'email'] });
    res.json(remainingUsers);
  } catch (e) {
    next(e);
  }
});
