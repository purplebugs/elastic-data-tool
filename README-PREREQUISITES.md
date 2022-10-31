### Pre-requisites

create empty database

1. mySQL is installed locally
2. Start mySQL server `mysql.server start`
3. Connect to mySQL `mysql -u root -p` and enter password. mySQL prompt should now show.
4. At mySQL prompt create empty database `CREATE DATABASE alpaca_database;` and verify created `SHOW DATABASES;`
5. Exit mySQL `exit`

.sql file dump -> populate database

6. Create folder at root level named [./data](./data)
7. Add to `.gitignore` - For .sql, JSON files that will NOT be committed to the repo
8. Change directory to folder `cd data` and store mySQL dump file there, eg `alpaca.sql`
9. Populate database from mySQL dump `mysql -u root -p alpaca_database < alpaca.sql`
10. Connect to mySQL `mysql -u root -p` and verify created `USE alpaca_database` and `SHOW TABLES`

SQL -> JSON

1. JSON file is created from SQL query and stored in [./data](./data).
1. Run `node sql-to-json.js` and look for generated file in [./data](./data)
