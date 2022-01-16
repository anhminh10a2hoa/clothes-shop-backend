require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

const port = 3000;

const main = async () => {
  await createConnection()

  const app = express();
  app.use(cors())

  app.get('/', (_, res) => {
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}

main().catch(err => console.log(err));