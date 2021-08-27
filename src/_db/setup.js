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

const dbVars = process.env.DATABASE_URL.split('/');
const dbName = dbVars[dbVars.length - 1];
const rootConnectionString = process.env.DATABASE_URL.replace(dbName, 'postgres');

exec(
  `psql ${rootConnectionString} -a --set=database=${dbName} -f 'src/_db/setup.sql'`,
  cb,
);
