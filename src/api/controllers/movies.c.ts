import { Request, RequestHandler, Response } from "express";
import { Movie } from "../models/movie";
import {listMovies} from "../services/movies.s";







export class MoviesController {



    // list all the available movies 
    async listMovies(req : Request , res : Response) : Promise<void>{
        
        try {

        const movies = await listMovies() 

        if(movies.length == 0)
            return res.send_ok("There is no movies to be shown")

        return res.send_ok("Success",movies)

        }
        catch(error : any){

            return res.send_internalServerError(error.message)

        }
        
    }
    
    // reserve a movie in a specific timeslot 
    async reserveMovie() : Promise<void> {

        // to be implemented
    }


    // checks if the movie is available in specific timeslot
    async checkAvailableMovie() : Promise<void> {
        
        // to be implemented

    }


}

