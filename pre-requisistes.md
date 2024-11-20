# Pre-requisites 🦙 💾

Populate database from `.sql` file dump on local MySQL instance

## MySQL running locally - Docker

1. `.sql` file has `CREATE DATABASE` and `USE` statements with desired db name, eg

```
CREATE DATABASE IF NOT EXISTS `2024_07_03_alpaca_db`;
USE `2024_07_03_alpaca_db`;
```

2. Docker is installed and running, eg Docker desktop for Mac
3. Create local folder to persist data named `mysql_data`

4. Create local docker network

`docker network create dev-network`

5. Install and run container `mysql_alapcas`. Download image if not exists.

```
docker run --name mysql_alapcas --net dev-network -v /Users/anita/Documents/dev/mysql_data:/var/lib/mysql -p 3306:3306 -d -e MYSQL_ROOT_PASSWORD=123 mysql:8.2.0
```

6. Start another container `mysql` to execute SQL commands to original container

```
docker run -it --network dev-network -e LANG=C.UTF-8 --rm mysql:8.2.0 mysql -hmysql_alapcas -uroot -p123
```

7. Check database that executes SQL commands has correct charset for Norwegian chars as this overrides all other language settings

```
mysql> show variables like 'char%';
+--------------------------+--------------------------------+
| Variable_name | Value |
+--------------------------+--------------------------------+
| character_set_client | utf8mb4 |
| character_set_connection | utf8mb4 |
| character_set_database | utf8mb4 |
| character_set_filesystem | binary |
| character_set_results | utf8mb4 |
| character_set_server | utf8mb4 |
| character_set_system | utf8mb3 |
| character_sets_dir | /usr/share/mysql-8.2/charsets/ |
+--------------------------+--------------------------------+
8 rows in set (0.00 sec)

mysql> exit;
```

8. Populate database from `.sql` file dump

```
docker exec -i mysql_alapcas sh -c 'exec mysql -p123' < /Users/anita/Documents/dev/elastic-data-tool/data/2024_11_11_alpacas.sql
```

9. To query database re-run command to start container `mysql` that executes SQL commands to original container

Helpful docker commands

- Show networks `docker network ls`
- Remove non active networks `docker network prune`

Ref: [https://hub.docker.com/\_/mysql](https://hub.docker.com/_/mysql)

## MySQL running locally - without Docker

### 1. Create empty database

1. MySQL is installed locally, eg using homebrew for Mac
2. Start MySQL server `mysql.server start`
3. Connect to MySQL `mysql -u root -p` and enter password. MySQL prompt should now show.
4. At MySQL prompt create empty database eg `CREATE DATABASE alpaca_database;` and verify created `SHOW DATABASES;`
5. Exit MySQL `exit`
6. Create/update .env file to contain `MYSQL_DATABASE="YOUR DATABASE NAME GOES HERE"`

### 2. .sql file dump -> Populate database

1. Create folder at root level named [./data](./data)
2. Add to `.gitignore` - For .sql, JSON files that will NOT be committed to the repo
3. Store MySQL dump file there, eg `alpaca.sql`
4. Change directory to folder `cd data`
5. Populate database from MySQL dump `mysql -u root -p alpaca_database < alpaca.sql`
6. Connect to MySQL `mysql -u root -p` and verify created `USE alpaca_database` and `SHOW TABLES`

## MySQL on Azure portal

### 1. .sql file dump -> Populate database on Azure

1. Create database in Azure account named eg `alpaca_database`
2. Go to the directory containing the .sql database file to import
3. Run `mysql -h {my azure db server name}.mysql.database.azure.com -u {my azure server admin login name} -p alpaca_database < {my_database_file.sql}`

## Troubleshooting

### If the .sql file contains `CREATE DATABASE IF NOT EXISTS` then either

- comment that out, or
- update the database name in the .sql file, then in the SQL -> JSON step remove the database name, eg `mysql -u root -p < alpaca.sql`

### Helpful SQL commands

```
show databases;

use <database name>;

show tables;

SHOW COLUMNS FROM <table name>;
```

```

```
