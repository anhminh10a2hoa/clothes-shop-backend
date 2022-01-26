# # Installation

+ Make sure you have Node on your machine ([link](https://nodejs.org/en/))
+ Put this code below to your terminal or cmd

  ```shell
  git clone https://github.com/anhminh10a2hoa/clothes-shop-backend
  ```

+ Install all dependencies and packages: ```yarn install```

+ Add ormconfig.json file in the root directory. More information about typeorm ([link](https://typeorm.io/#/))

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

+ Add .env file in the root directory.

  ```
  PRODUCT_IMAGE_FOLDER_PATH=./public/images
  JWT_TOKEN=your_own_jwt_token
  JWT_TOKEN_EXPIRES_IN=86400
  JWT_TOKEN_EXPIRES_IN_HOUR=1h
  PORT=8080
  ```

+ Open 2 termianl, run ```yarn watch``` on the first termianl and run ```yarn start``` on the second termianl.

# # API Routes 

| Method | RoutePath | Middeware | Description
|--|--|--|--|
|  GET  |`"/api/v1/products"`  |  | Get all products |
|  POST  |`"/api/v1/products"`  |  | Create new product |
|  GET  |`"/api/v1/products/:productId"`  |  | Get product by product id |
|  PUT  |`"/api/v1/products/:productId"`  |  | Update product by product id |
|  DELETE  |`"/api/v1/products/:productId"`  |  | Delete product by product id |
|  POST  |`"/api/v1/products/file/:productId"`  | upload image |  Update product image |
|  GET  |`"/api/v1/users"`  | checkJwt | Get all users |
|  GET  |`"/api/v1/users/:id"`  | checkJwt | Get user by id |
|  PUT  |`"/api/v1/users/:id"`  | checkJwt | Update users by id |
|  DELETE  |`"/api/v1/users/:id"`  | checkJwt | Delete users by id |
|  POST  |`"/api/v1/users/login"`  |  | Login with username and password |
|  POST  |`"/api/v1/users/signup"`  |  | Signup with username, password, name and email |
|  POST  |`"/api/v1/users/logout"`  |  | Logout from the account |