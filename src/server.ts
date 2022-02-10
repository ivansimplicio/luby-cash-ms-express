import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (request, response) => {
  response.send({ hello: 'world' });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running`);
});
