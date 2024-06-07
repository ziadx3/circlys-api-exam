import express, { json } from 'express'

import { MoviesController } from '../controllers/movies.c'


export const moviesRouter = express.Router()

moviesRouter.use(express.json())

const moviesController : MoviesController = new MoviesController()

moviesRouter.get('/list',moviesController.listMovies) 

moviesRouter.post('/check',moviesController.checkAvailableMovie)

moviesRouter.post('/reserve',moviesController.reserveMovie)


