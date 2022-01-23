import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import productRouter from './routes/product.route';
import generateData from './utils/autoGenerateData';
import bodyParser from  "body-parser";
import * as dotenv from 'dotenv';

const port = 3000;

const main = async () => {
  await createConnection();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  dotenv.config();

  generateData();

  app.get('/', (_, res) => {
    res.send('Hello World!');
  });

  app.use('/api/v1/products', productRouter);
  
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
}

main().catch(err => console.log(err));