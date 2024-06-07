import express from 'express';
import {moviesRouter} from './api/routes/moviesrouter'
import {connectToDatabase} from './api/services/database.s'
import responser from 'responser'

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(responser)

connectToDatabase()

app.use('/movies',moviesRouter)

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});