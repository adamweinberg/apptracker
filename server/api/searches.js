const router = require('express').Router()
const { models: { Search, Job }} = require('../db')
module.exports = router

//POST /api/searches
router.post('/', async (req, res, next) => {
  try {
    const search = await Search.create(req.body)
    res.status(201).send(search)
  } catch (error) {
    next(error)
  }
})

//GET /api/searches/:searchId
router.get('/:searchId', async (req, res, next) => {
  try {
    const search = await Search.findByPk(req.params.searchId, {
      include: {
        model: Job
      }
    })
    res.json(search)
  } catch (error) {
    next(error)
  }
})

//DELETE api/searches/:searchId
router.delete('/:searchId', async (req, res, next) => {
  try {
    await Search.destroy({
      where: {
        id: req.params.searchId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//PUT api/searches/:searchId
router.put('/:searchId', async (req, res, next) => {
  try {
    const search = await Search.findByPk(req.params.searchId)
    await search.update(req.body)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
