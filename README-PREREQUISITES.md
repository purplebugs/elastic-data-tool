# Pre-requisites 🦙 💾

## Create empty database

1. MySQL is installed locally
2. Start MySQL server `mysql.server start`
3. Connect to MySQL `mysql -u root -p` and enter password. MySQL prompt should now show.
4. At MySQL prompt create empty database eg `CREATE DATABASE alpaca_database;` and verify created `SHOW DATABASES;`
5. Exit MySQL `exit`
6. Create/update .env file to contain `MYSQL_DATABASE="YOUR DATABASE NAME GOES HERE"`

## .sql file dump -> Populate database

1. Create folder at root level named [./data](./data)
2. Add to `.gitignore` - For .sql, JSON files that will NOT be committed to the repo
3. Store MySQL dump file there, eg `alpaca.sql`
4. Change directory to folder `cd data`
5. Populate database from MySQL dump `mysql -u root -p alpaca_database < alpaca.sql`
6. Connect to MySQL `mysql -u root -p` and verify created `USE alpaca_database` and `SHOW TABLES`

## SQL -> JSON

1. Go to root directory of app
2. Run `node sql-to-json.js` and look for generated file in [./data](./data)
