const router = require('express').Router();
const { Developer } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const developers = await Developer.findAll();
    res.json(developers);
  } catch (e) {
    next(e);
  }
});

router.get('/:developerId', async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.developerId);
    res.json(developer);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newDeveloper = await Developer.create(req.body);
    res.json(newDeveloper);
  } catch (e) {
    next(e);
  }
});

router.put('/:developerId', async (req, res, next) => {
  try {
    const [, updatedDeveloper] = await Developer.update(req.body, {
      where: { id: req.params.developerId },
      returning: true,
      plain: true,
    });
    res.json(updatedDeveloper);
  } catch (e) {
    next(e);
  }
});

router.delete('/:developerId', async (req, res, next) => {
  try {
    await Developer.destroy({ where: { id: req.params.developerId } });
    const remainingDevelopers = await Developer.findAll();
    res.json(remainingDevelopers);
  } catch (e) {
    next(e);
  }
});
