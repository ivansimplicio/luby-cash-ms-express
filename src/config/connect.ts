import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log('connected to database');
});
