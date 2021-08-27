require('../environment');
const { exec } = require('child_process');

const cb = (error, stdout, stderr) => {
  console.log('ERRORS:');
  console.log(error);
  console.log('WARNINGS:');
  console.log(stderr);
  console.log('OUTPUT:');
  console.log(stdout);
};

exec(
  `psql ${process.env.DATABASE_URL} -c 'CREATE EXTENSION IF NOT EXISTS "pgcrypto"; CREATE EXTENSION IF NOT EXISTS "citext";'`,
  cb,
);
