const router = require('express').Router()
const { models: { Job }} = require('../db')
module.exports = router

//POST api/jobs
router.post('/', async (req, res, next) => {
  try {
    const job = await Job.create(req.body)
    res.status(201).send(job)
  } catch (error) {
    next(error)
  }
})

//GET api/jobs/:jobId
router.get('/:jobId', async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.jobId)
    res.json(job)
  } catch (error) {
    next(error)
  }
})

//DELETE api/jobs/:jobId
router.delete('/:jobId', async (req, res, next) => {
  try {
    await Job.destroy({
      where: {
        id: req.params.jobId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//PUT api/jobs/:jobId
router.put('/:jobId', async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.jobId)
    await job.update(req.body)
  } catch (error) {
    next(error)
  }
})
