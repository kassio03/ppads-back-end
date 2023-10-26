<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

Instructions for running the back end of our Happens Here project locally.

If you want our front end as well, you can find it here: [Front End Repository](https://github.com/BiancaDuarteRaposo/ppads---projeto)

## Installation

### Cloning the project

```sh
git clone https://github.com/kassio03/ppads-back-end.git
```

Alternatively you can download the latest zipped version of our project here: [Latest Version](https://github.com/kassio03/ppads-back-end/archive/refs/tags/v2.0.zip)

### Installing all dependencies

```sh
yarn
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```

## Enviroment Variables

### Connection with database

For security purposes we can't provide our database, therefore you will need to create your own database.

You must provide the environment variables about your database in the .env file.

In this project we use and recommend PostgreSQL, the following article can be helpful to create a database using a Docker container.

[How to Use the Postgres Docker Official Image](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)

### Connection with Google Cloud Storage

In this project we use Google Cloud Storage to store the posters of the registered events in the database. For security reasons, we can't provide the credentials used. You will need to create your own bucket on GCS and provide the environment variables in the .env file.

> Tip: The Front End sends the poster in Base64 format. Alternatively, you can store this converted image directly in the database, eliminating the need for GCS. However, consider that this alternative requires significantly more storage in your database.

## System Requirements

| Recommended |                                  |
| ----------- | -------------------------------- |
| OS          | Windows 10/11 (32-bit or 64-bit) |
| Processor   | 1.6 Ghz or faster processor      |
| Memory      | 1 GB of RAM                      |
| Storage     | 1 GB available space             |

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

<!--
## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
 -->

## License

Nest is [MIT licensed](LICENSE).
