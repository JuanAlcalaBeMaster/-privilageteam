import { Sequelize } from 'sequelize';

interface DbDynamicInterface {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
}

const db = new Sequelize(
  `${process.env.DB_NAME_PAYTOOL_DEV}`,
  `${process.env.DB_USER_PAYTOOL_DEV}`,
  `${process.env.DB_PASSWORD_PAYTOOL_DEV}`,
  {
    host: `${process.env.DB_HOST_PAYTOOL_DEV}`,
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    timezone: '-05:00',
  },
);

const dbDynamic = (dbInfo: DbDynamicInterface) =>
  new Sequelize(
    `${dbInfo.DB_NAME}`,
    `${dbInfo.DB_USER}`,
    `${dbInfo.DB_PASSWORD}`,
    {
      host: `${dbInfo.DB_HOST}`,
      dialect: 'mysql',
      dialectOptions: { decimalNumbers: true },
      timezone: '-05:00',
    },
  );

export { db, dbDynamic };
