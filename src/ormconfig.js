const path = require("path");

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, "dist/**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "dist/migrations/*{.ts,.js}")],
  cli: {
    migrationsDir: "src/migrations",
  },
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
};
