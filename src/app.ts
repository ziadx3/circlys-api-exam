import express from 'express';
import {moviesRouter} from './api/routes/movies.r'
import {connectToDatabase} from './api/services/database.s'
import responser from 'responser'

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// use responser package
app.use(responser)

// connect to the db
connectToDatabase()

// use the moviesRouter
app.use('/movies',moviesRouter)

app.get('/', (req, res) => {
  
  res.send('Hello, Circlys Node Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});