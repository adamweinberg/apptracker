const router = require('express').Router()
const { models: { User, Search }} = require('../db')
module.exports = router

//GET api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'firstName', 'lastName', 'title']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

//POST api/users
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (error) {
    next(error)
  }
})

//GET api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'title'],
      include: {
        model: Search
      }
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

//DELETE api/users/:userId
router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//PUT api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.update(req.body)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
