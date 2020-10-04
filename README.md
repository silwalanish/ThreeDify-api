# threedify-api

A RESTful API for ThreeDify.

[![Build](https://github.com/silwalanish/ThreeDify-api/workflows/Build/badge.svg)](https://github.com/silwalanish/ThreeDify-api/actions)
[![Lint](https://github.com/silwalanish/ThreeDify-api/workflows/Lint%20Check/badge.svg)](https://github.com/silwalanish/ThreeDify-api/actions)

# What's ThreeDify?

ThreeDify is a online platform where you can upload images and create a 3D reconstruction of the images.

## Environment Variables

| Variable         | Description                           |
| ---------------- | ------------------------------------- |
| BASE_URL         | API base url e.g. http://localhost    |
| PORT             | Port to serve the api e.g. 3000       |
| SESSION_SECRET   | Key used for signing session cookie   |
| SESSION_DURATION | Expiry time for session cookie        |
| DB_NAME          | Name of the database                  |
| DB_USER          | User name of the database             |
| DB_PASSWORD      | Password for the user of the database |

## Installation

1. Make sure you have `node-v13.11.0` and `yarn-v1.22.4`
2. Install [Postgresql](https://www.postgresql.org/download/)
3. Install dependencies

```
$ yarn
```

3. Create `.env` file

```
$ cp .env.example .env
```

## Migrations

We use [knex](http://knexjs.org/) for managing migration. You can find all the migration in `migrations` folder.

##### Migrate

```bash
$ yarn knex migrate:latest
```

##### Make

```bash
$ yarn knex migrate:make migration_name
```

##### Rollback

```bash
$ yarn knex migrate:down
```

Read more about [knex](http://knexjs.org/).

## Build

```bash
$ yarn build
```

## Run

```bash
$ yarn start
```

## Development Server

```bash
$ yarn start:dev
```

## Lint

Check lint errors

```bash
$ yarn lint
```

Fix lint errors

```bash
$ yarn lint:fix
```
