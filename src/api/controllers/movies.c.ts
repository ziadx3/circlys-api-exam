import { Request, RequestHandler, Response } from "express";
import { Movie } from "../models/movie";
import {getTimeslot, listMovies, reserveTimeslot} from "../services/movies.s";
import { CheckMoviesRequest, ReserveTimeslotRequest } from "../models/movie.requests";
import { Timeslot } from "../models/timeslot";



/**
 *  Movies controller handles the buisness logic for the movies route
 */
export class MoviesController {

    /**
     *  list all the available movies 
     * @param {Request} request
     * @param {Response} response
     */
    async listMovies(req : Request , res : Response) : Promise<void>{
        
        try {

        const movies = await listMovies() 

        if(movies.length == 0)
            return res.send_ok("There is no movies available")

        return res.send_ok("Success",movies)

        }
        catch(error : any){

            return res.send_internalServerError(error.message)

        }
        
    }

    /**
     * checks if the movie is available in specific timeslot {returns available capacity}
     * @param {Request} request
     * @param {Response} response
     */
    async checkTimeslotCapacity(req: Request, res: Response) : Promise<void> {

        try {
            // fill the body object into {{CheckMoviesRequest object}}
            const body = req.body as CheckMoviesRequest

            // get the timeslot from the movie by the service
            const timeslot = await getTimeslot(body.movieId!,body.timeslotId!) as Timeslot
    
            // check if the timeslot isn't undefined then return the remaining cpacitiy
            if(timeslot)
                return res.send_ok("success",{
                    "remaining capactiy": timeslot.remainingCapacity
                })
            
            // otherwise it will return 404 not found
            return res.send_notFound("Timeslot not found")
        }
        catch(error : any) {

            // in case un expected error it will return 500 error
            return res.send_internalServerError(error.message)
        }
      

    }
    
    /**
     * reserve a movie in a specific timeslot 
     * @param {Request} request
     * @param {Response} response
     */
    async reserveTimeslot(req : Request,res : Response) : Promise<void> {
        
        // fill the body object into {{ReserveTimesslotRequest object}}  
        const requestBody = req.body as ReserveTimeslotRequest

        // reserve a timeslot by the service and return the response
        const response = await reserveTimeslot(requestBody.movieId!,requestBody.timeslotId!,requestBody.uid!,requestBody.numberOfreserves!)

        // checks if the response is successed (if so it will return ok response)
        if(response.successed)
            return res.send_ok(response.message)

        // otherwise it will return an internal error
        return res.send_internalServerError(response.message)

    }


}

