import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('chat', 'root', '12345678', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});



export default async function dbInit() {
  const s = await sequelize.sync({ force: true });

  // ajouter tous mes models
}
