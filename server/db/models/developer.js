const Sequelize = require('sequelize');
const db = require('../db');

const Developer = db.define('developer', {
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  fullName: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  linkedInURL: Sequelize.STRING,
  twitterURL: Sequelize.STRING,
  email: Sequelize.STRING,
  instragramURL: Sequelize.STRING,
  facebookURL: Sequelize.STRING,
  soundcloudURL: Sequelize.STRING,
  twitchURL: Sequelize.STRING,
  roles: Sequelize.STRING,
  shortDescription: Sequelize.TEXT,
  lore: Sequelize.TEXT,
  skills: Sequelize.ARRAY(Sequelize.STRING),
  kingdom: Sequelize.STRING,
  alignment: Sequelize.ENUM(
    `Lawful Good`,
    `Lawful Neutral`,
    `Lawful Evil`,
    `Neutral Good`,
    `True Neutral`,
    `Neutral Evil`,
    `Chaotic Evil`,
    `Chaotic Neutral`,
    `Chaotic Good`,
    `Lawful Stupid`
  ),
  quotes: Sequelize.ARRAY(Sequelize.STRING),
  vices: Sequelize.ARRAY(Sequelize.STRING),
  virtues: Sequelize.ARRAY(Sequelize.STRING),
  mbti: Sequelize.STRING,
  sign: Sequelize.STRING,
  weaknesses: Sequelize.ARRAY(Sequelize.STRING),
  class: Sequelize.STRING,
  kryptonite: Sequelize.STRING,
  playerStats: Sequelize.ARRAY(Sequelize.INTEGER),
});

module.exports = Developer;
