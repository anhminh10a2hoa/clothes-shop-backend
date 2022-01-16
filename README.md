+ Add ormconfig.json file in the root directory

  ```json
  {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "username",
    "password": "password",
    "database": "database name",
    "entities": ["dist/entities/*.js"],
    "migrations": ["src/migrations/*.ts"],
    "logging": true,
    "synchronize": true
  }
  ```