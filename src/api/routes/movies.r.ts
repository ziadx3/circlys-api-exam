import express from 'express'

import { MoviesController } from '../controllers/movies.c'
import { validateCheckMovieRequest, validateReserveTimeslotRequest } from '../middlewares/movies.m'

// init the movies router
export const moviesRouter = express.Router()

// use json parse
moviesRouter.use(express.json())

// init the movies controller
const moviesController : MoviesController = new MoviesController()

// list movies route
moviesRouter.get('/list',moviesController.listMovies) 

// check available timeslot capacity route
moviesRouter.post('/check',validateCheckMovieRequest,moviesController.checkTimeslotCapacity)

// reserve timeslot for a specific movie route
moviesRouter.post('/reserve',validateReserveTimeslotRequest,moviesController.reserveTimeslot)


