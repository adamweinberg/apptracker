const Sequelize = require('sequelize')
const db = require('../db')

const Search = db.define('search', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['active', 'completed', 'cancelled']]
    }
  }
})

module.exports = Search
