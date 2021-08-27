# HapiJS KnexJS API Template

## Node API Deployed to Heroku with CircleCI, Postgres and Tests on Day 1

### Out of the Box
 - HapiJS Server with KnexJS DB Connection
 - Jest Unit Tests
 - Integration Tests via Docker
 - E2E smoke test to check your deployment's health
 - Swagger API Docs for existing routes

## Creating your Repo from the Template

To initialize this repository in your Github org enabled with CI and CD:
1. [Using This Template Repository](README_AdminTemplateRepoSetup.md)
1. [First Time Deployment Instructions](README_AdminDeploymentSetup.md)
1. [Setup CircleCI](README_AdminCISetup.md)

## Dev Setup

Clone the repo `git clone git@github.com:<YOUR_GITHUB_ORG>/<YOUR_GITHUB_REPO>.git`

### Local Requirements

- node version >= 14.17 (run `node -v` to check)
   - If needed, [nvm recommended](https://github.com/nvm-sh/nvm) for update (e.g. `nvm install 14.17.5`)
- npm version >= 6.14 (run `npm -v` to check)
   - If you've updated node via [nvm](https://github.com/nvm-sh/nvm), npm will be updated as well
- postgres/psql ([homebrew recommended](https://wiki.postgresql.org/wiki/Homebrew))
- [Docker for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac/) (Only for running integration tests)

### Environment

Create a `.env` file at the root directory and copy the contents from `.env.example`

### Dependencies

`npm install`

### Database

1. Ensure postgres is running and you have a `postgres` user
  - (If homebrew was used) `brew services start postgresql && /usr/local/opt/postgres/bin/createuser -s postgres`
1. `npm run db:setup`

## Development

### Running the App

`npm run dev` - API documentation at [localhost:3000/documentation](http://localhost:3000/documentation)

Check your app's health including the local database connection at [localhost:3000/health](http://localhost:3000/health).

### Database Management

To create a timestamped migration file:
`npm run migrate:make <name_of_migration>`

To run migrations: `npm run db:migrate`

To roll back migrations: `npm run db:rollback`

To run all seeds: `npm run db:seed`

To run 1 seed: `npm run db:seed -- --specific=000_your_seed_file.js`

To reset database: `npm run db:setup`

- Make sure your .env file has values for `DATABASE_URL`.

## Testing

### Running Tests

To run all unit tests: `npm test`

To watch all unit tests: `npm run test:watch`

### Integration Tests

Start Docker Desktop

To setup test database: `docker-compose up -d`

To run integration tests: `npm run test:integration`

- Run `npm run test:integration -- -- <string match>` to run a single test

If you follow these steps and hit an error like `error: password authentication failed for user "postgres"`, you might have an existing Docker container with the same name as the one used in this project. To get around this, try the following:

- Run `docker-compose down` to stop the test container
- Run `docker system prune -a` to clean up your stopped containers. Note that this is a destructive operation; please heed the CLI's warning.

### Integration Groups

Integration tests are those that have been annotated with `integration` via [jest-runner-groups](https://github.com/eugene-manuilov/jest-runner-groups):
```
/**
 * NameOfTest
 * @group integration/<sub-group>
 */
```

Integration tests will clean the database after each test and have the following globals available:
- `container` -- set up exactly like the container used in development
- `server` -- set up exactly like the server used in development

Review `src/_framework/configure[Server/Container].js` for details

### Strategy

This is our preferred strategy, but we recognize that there may be cases where we need to diverge.

1. E2E test for Routes
   - Happy path only
   - 1 E2E test per route
1. Unit test for Services
   - Mock repositories using the Container
   - Test for Boom errors when throwing error code statuses
1. No unit test for Routes
   - Testing the Service integration is already covered by the E2E test
1. No integration test for Services
   - Testing the Repository integration is already covered by the E2E test
1. No tests for Repositories
   - Testing the DB integration is already covered by the E2E test

## Deployment

All deployments are automated via CircleCI and DB migrations are automated via Heroku in a `release` phase as specified in the `Procfile` at the root of this repo.

### Setting up Heroku CLI

Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

Log into the Heroku CLI: `heroku login`

### Monitoring the Deployment

The `heroku/deploy-via-git` job in CircleCI should provide the active logs when deploying but if you need to monitor them in more detail in Heroku:

View the status of the apps: `heroku ps -a <HEROKU_APP_NAME>`

View the current log: `heroku logs --tail -a <HEROKU_APP_NAME>`

View a list of releases: `heroku releases -a <HEROKU_APP_NAME>`

View the log of a specific release: `heroku releases:output <v#> -a <HEROKU_APP_NAME>`

## Swagger API Documentation

- API documentation available when your server is running at [localhost:3000/documentation](http://localhost:3000/documentation)
- We use [hapi-swagger](https://github.com/glennjones/hapi-swagger/)
- Out-of-the-box Swagger configurations live in `src/_framework/configureServer.js`
  - When setting up a new route, you must add the `tags: ['api']` entry to the route options in order for it to show up in the docs

## Architecture

### Folder Structure

- Organized by domain (e.g. `auth`, `health`, `users`).
- Every test should be a sibling of the file that it's testing.
- Each domain folder will contain but is not limited to:
  - `<domainName>Routes.js`
  - `<domainName>Routes.test.js`
  - `<DomainName>Service.js`
  - `<DomainName>Service.test.js`
  - `<DomainName>Repository.js`
  - `<DomainName>Repository.test.js`
  - `/models/<\*>.js`

### Container

- Is instantiated in `index.js`
- All Services and Repositories need to be registered in the Container
- Is used as an Inversion of Control Container, as well as a Dependency Locator
- Should be passed as a dependency to each Service
- Should be passed as an option to each Route

For example we register the `db` on the container in `src/_framework/configureContainer.js`. Using this form of dependency injection allows us to register a connection to our Knex Postgres library, while not coupling us to Knex in the rest of the code, and it also allows us to run our integration tests against a different Knex connection (and database) than our dev server, while elegantly reusing the same code.

### Route Layer

- Should have access to the Container in order to locate Services
- Should orchestrate Services
- Should typically not have to call Repositories but may be required for simple use cases

### Service Layer

- Contains methods that represents a Unit of Work
- Is responsible for committing or rolling back DB transactions
- Contains the business logic
- Is responsible for using and creating Domain Models
- Should have access to the Container in order to locate repositories
- Throws Boom errors to be bubbled up to the Route Layer
- Should orchestrate Repositories
- Should not call other services
- All errors will by default throw 500, apply specific Boom errors when necessary

### Repository Layer

- Contains methods that performs DB queries
- Should not transform the result from the database
- Should have access to the DB connection via the Container

### Model Layer

- Should represent our domain
- Should be object-oriented
- Should be required directly by Services
