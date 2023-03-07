import { hashSync, compareSync } from 'bcryptjs'
import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
export default function initUser(sequelize: Sequelize) {
  class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare name: string
    declare account: string
    declare password: string
    declare refreshTokenId: string | null
    declare id: CreationOptional<number>
    comparePassword(password: string) {
      return compareSync(password, this.getDataValue('password'))
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      account: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isLength(value: string) {
            if (value.length > 14 || value.length < 7)
              throw new Error('string length wrong!')
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
          this.setDataValue('password', hashSync(value))
        },
        get() {
          return
        },
      },
      refreshTokenId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
      timestamps: false,
    }
  )
  return User
}
