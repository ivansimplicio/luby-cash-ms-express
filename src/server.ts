import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import KafkaConsumer from './services/kafka/consumer';
import './config/connect';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const consumer = new KafkaConsumer();

consumer.consume('customer_registration');

app.get('/', (request, response) => {
  response.send({ hello: 'world' });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running`);
});
