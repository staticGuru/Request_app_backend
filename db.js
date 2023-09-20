const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgreadmin",
  password: "Develop@123",
  database: "dev4dpm",
  host: "postgres-4ic-4dpm-dev.postgres.database.azure.com",
  port: 5432,
  ssl: { sslmode: 'require', rejectUnauthorized: false }
});
module.exports = pool;

// const { Client } = require("pg");

// const connectDb = async () => {
//   try {
//     const client = new Client({
//       user: "postgreadmin",
//       password: "Develop@123",
//       database: "dev4dpm",
//       host: "postgres-4ic-4dpm-dev.postgres.database.azure.com",
//       port: 5432,
//     });

//     await client.connect();
//     const res = await client.query("SELECT * FROM business.clinic_info");
//     console.log(res);
//     await client.end();
//   } catch (error) {
//     console.log(error);
//   }
// };

// connectDb();
