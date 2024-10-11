import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../dbInit';
import { User } from './users';

// message one on one
export function genModel (sequelize: Sequelize) {
  class Message extends Model {
    declare senderId: number;
    declare recieverId: number;
    declare channelId: number;
    declare text: number;
    declare seenAt: Date;
    declare sentAt: Date;
    declare recievedAt: Date;
    declare status: number;
  }

  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      senderId: {
        type: DataTypes.INTEGER,
        references: typeof User,
      },
      recieverId: {
        type: DataTypes.INTEGER,
        references: typeof User,
      },
      channelId: {
        type: DataTypes.INTEGER,
      },
      text: {
        type: DataTypes.STRING,
      },
      seenAt: {
        type: DataTypes.DATE,
      },
      sentAt: {
        type: DataTypes.DATE,
      },
      recievedAt: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  return Message;
};


export const Messages = genModel(sequelize)