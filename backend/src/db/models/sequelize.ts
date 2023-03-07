import { Sequelize, Options } from 'sequelize'
import database from '../../config/database.json'
type envTypes = 'development' | 'test' | 'production'
const env = <envTypes>(process.env.NODE_ENV || 'development')
let sequelize: Sequelize
const config = <Options>database[env]
if (process.env.DB_CONNECTION_STRING) {
  sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, config)
} else {
  sequelize = new Sequelize(config)
}
export default sequelize
