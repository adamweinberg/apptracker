'use strict'

const {db, models: {User, Search, Job} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', firstName: 'Cody', lastName: 'Smith', title: 'Software Engineer' }),
    User.create({ username: 'murphy', password: '123', firstName: 'Murphy', lastName: 'Kazzaz', title: 'Carpenter' }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  // Creating Searches
  const searches = await Promise.all([
    Search.create({ title: 'Software Engineer', startDate: new Date(), status: 'active', userId: 1}),
    Search.create({ title: 'Carpenter', startDate: new Date(), status: 'completed', userId: 2}),
  ])

  // Creating Jobs
  const jobs = await Promise.all([
    Job.create({title: 'Software Engineer', company: 'Facebook', applicationDate: new Date(), status: 'rejected', networking: 'Reached out to Mark Zuckerburg on LinkedIn', searchId: 1}),
    Job.create({title: 'QA Engineer', company: 'Tesla', applicationDate: new Date(), status: 'applied', networking: 'Reached out to Elon-chan on LinkedIn', searchId: 1}),
    Job.create({title: 'Software Engineer III', company: 'Amazon', applicationDate: new Date(), status: 'onsite interview', searchId: 1}),
    Job.create({title: 'Associate Carpenter', company: 'Silver Lake Carpenters', applicationDate: new Date(2020, 10, 4), status: 'received offer', searchId: 2}),
    Job.create({title: 'Carpenter', company: 'Kazzaz Carpentery', applicationDate: new Date(2020, 10, 8), status: 'accepted offer', networking: 'referral from Herb Kazzaz', searchId: 2}),
  ])

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    searches: {
      search1: searches[0],
      search2: searches[1]
    },
    jobs: {
      job1: jobs[0],
      job2: jobs[1],
      job3: jobs[2],
      job4: jobs[3],
      job5: jobs[4],
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
