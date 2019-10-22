module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DATABASE_URL  || "postgresql://kckhafra@localhost/ecoacme",
    TEST_DB_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/ecoacme_test',
    JWT_SECRET: process.env.JWT_SECRET || "kc-secret"
  }