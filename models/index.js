const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false, // turn off logging
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./user.model')(sequelize, DataTypes);
db.Appointment = require('./appointment')(sequelize, DataTypes);

// Associations (optional)
if (db.User.associate) db.User.associate(db);
if (db.Appointment.associate) db.Appointment.associate(db);

module.exports = db;
