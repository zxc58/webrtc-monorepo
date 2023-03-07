import sequelize from './sequelize'
import initUser from './user'
const models = { User: initUser(sequelize) }
// create Association
// Object.values(models).forEach((model) => {
//   if (model.associate) {
//     model.associate(models)
//     model.
//   }
// })
export default models
