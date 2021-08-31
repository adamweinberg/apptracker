const Sequelize = require('sequelize')
const db = require('../db')

const Job = db.define('job', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  descriptionUrl: {
    type: Sequelize.STRING,
  },
  applicationDate: {
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
      isIn: [['applied', 'rejected', 'assessment', 'phone screen', 'onsite interview', 'received offer', 'accepted offer', 'ghosted by employer']]
    }
  },
  coverLetterUrl: {
    type: Sequelize.STRING
  },
  networking: {
    type: Sequelize.TEXT
  }
})

module.exports = Job
