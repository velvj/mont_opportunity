import * as dotenv from "dotenv";
dotenv.config();
//db config
export const dbConfig = {
  username: process.env.DB_USER_NAME as "",
  password: process.env.DB_PASSWORD as "",
  database: process.env.DATABASE_NAME as "",
  host: process.env.DB_HOST as "",
  port: parseInt(process.env.DB_PORT),
  dialect: <const>"mysql",
  logging: false,
  retry: {
    match: [/Deadlock/i],
    max: 3, // Maximum rety 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
  },
  pool: {
    max: 100,
    min: 30,
    acquire: 60000,
    idle: 10000,
  },
  Dialectoptions: { connectTimeout: 3000 },
};
