import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send({ hello: 'world' });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running`);
});
