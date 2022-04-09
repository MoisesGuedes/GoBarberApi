<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
      <img src="https://camo.githubusercontent.com/94de76a75fb09167be3cce104ab34ad5585e55fc40217ec702bd1607b8119f93/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f656c6961736763662f696d6167652f75706c6f61642f76313538383632353336392f476f4261726265722f6c6f676f5f6977317639662e737667" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">GoBarberApi</h3>

  <p align="center">
    An awesome API to schedule hair cut services!
    <br />
    <br />
    <br />
    <a href="https://github.com/MoisesGuedes/GoBarberApi/issues">Report Bug | Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This api provides everything needed to organize appointments between the barbers and customers.

Customers can schedule appointments, and providers can manage them.

Other features:
* DDD archteture and SOLID principles.
* Complete auth sessions. 
* Cache With Redis.
* Nodejs is life :smile:

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Node.js](https://nodejs.org/en/)
* [TypeScript](TypeScript)
* [Express](https://expressjs.com/pt-br/)
* [Multer](https://www.npmjs.com/package/multer)
* [TypeORM](https://typeorm.io/)
* [JWT-token](https://www.npmjs.com/package/jsonwebtoken)
* [uuid v4](https://www.npmjs.com/package/uuidv4)
* [PostgreSQL](https://www.postgresql.org/)
* [Date-fns](https://date-fns.org/)
* [Jest](https://jestjs.io/pt-BR/)
* [SuperTest](https://www.npmjs.com/package/supertest)
* [Eslint](https://eslint.org/)
* [Prettier](https://prettier.io/)
* [EditorConfig](https://editorconfig.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

First you need to download the Collection.json and import in insomnia.
https://www.mediafire.com/file/8b5buibx7i80z0f/Collection/file

### Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://nodejs.org/en/) or [Npm](https://nodejs.org/en/)
* One instance of [PostgreSQL](https://www.postgresql.org/). Using docker.
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MoisesGuedes/GoBarberApi.git
   ```
2. Install the dependencies
   ```sh
   yarn
   ```
3. Make a copy of '.env.example' to '.env
4. Set with YOUR environment variables
5. Create the instance of postgreSQL using docker
    ```sh
      docker run --name gobarber-postgres -e POSTGRES_USER=docker \
                  -e POSTGRES_DB=gobarber -e POSTGRES_PASSWORD=docker \
                  -p 5432:5432 -d postgres
    ```
6. Create the instance of mongoDB using docker
    ```sh
      docker run --name gobarber-mongodb -p 27017:27017 -d -t mongo
    ```
7. Create the instance of redis using docker
    ```sh
      docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine
    ```
8. Once the services are running, run the migrations
    ```sh
      yarn typeorm migration:run
    ```
9. Now you can the api service
    ```sh
      yarn dev:server
    ```
<p align="right">(<a href="#top">back to top</a>)</p>
