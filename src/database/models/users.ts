import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../dbInit';

function genModel (sequelize: Sequelize) {
  class User extends Model {
    declare name: string;
    declare email: string;
    declare phone: string;
    declare socketId: string;
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },

      // socket id doit etre enregistre separement dans redis, car plus de rapidite
      socketId: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  return User;
};

export const User = genModel(sequelize);