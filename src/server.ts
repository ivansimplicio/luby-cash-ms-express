import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import ConsumerService from './services/kafka/ConsumerService';
import './config/connect';
import clientRouter from './routes/client';
import cors from 'cors';
import Topics from './services/kafka/enums/Topics';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const consumer = new ConsumerService();

consumer.consume(Topics.CUSTOMER_REGISTRATION);
consumer.consume(Topics.TRANFER_MADE);
consumer.consume(Topics.FORGOT_PASSWORD);

app.use('/', clientRouter);

app.get('/', (_request, response) => {
  response.send({ hello: 'world' });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running`);
});
