# luby-cash-ms-express
## step by step to run the project

1) To install all dependencies, run: `npm install`
2) Before running the project you will need to create two networks in Docker: `docker network create luby-cash` & `docker network create luby-cash-ms`
3) And also set the environment variables in the `.env` file
4) To upload and run the Postgres application and database in Docker: `docker-compose up`
5) After uploading the application, it will be necessary to run the migrations on the database. Use: `npm run startdb`
6) To seed the created tables, it will be necessary to execute the SQL contained inside `_data/client-seeder.sql` directly in the DBMS.
