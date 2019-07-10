const Sequelize = require('sequelize')
const database_name = 'sYZsBGMCzF'
const database_user_name = 'sYZsBGMCzF'
const database_user_password = 'jcEmo3PY0B'
const database_host = 'remotemysql.com'
const UserModel = require('../Model/User')
const MedicineModel = require('../Model/MedicineModel')




const sequelize = new Sequelize(database_name,database_user_name,database_user_password, {
    host: database_host,
    dialect: 'mysql'
  });


const user = UserModel(sequelize,Sequelize)
const medicine = MedicineModel(sequelize,Sequelize)


sequelize.sync({ force: false })
.then(() => {
  console.log(`Database & tables created!`)
})
.catch(()=>{
    console.log(`Could not create table`)
})


module.exports = {
  user,
  medicine
}

