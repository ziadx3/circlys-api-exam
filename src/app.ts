import express from 'express';

require('dotenv').config();

const app = express();
const port = process.env.PORT;


app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});