//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Search = require('./models/Search')
const Job = require('./models/Job')

//associations could go here!
Search.belongsTo(User)
User.hasMany(Search)

Job.belongsTo(Search)
Search.hasMany(Job)

module.exports = {
  db,
  models: {
    User,
    Search,
    Job
  },
}
