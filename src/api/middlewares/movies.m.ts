import { hasUndefined } from "../helpers/utils.h";
import { CheckMoviesRequest, ReserveTimeslotRequest } from "../models/movie.requests"
import { Request, Response } from "express";

/** 
 * request validation middleware for {{ list movies route }}
 * @param {Request} request
 * @param {Response} response
 * @param {any} next
 */
export function validateCheckMovieRequest(req : Request,res : Response,next : any){

    // fill body object into {{CheckMoviesRequest}}
    const requestBody = req.body as CheckMoviesRequest

    // check if the requestBody isn't undefiend if that so { Go next() }
    if(requestBody.movieId && requestBody.timeslotId)
        return next()

    // otherwise return Bad request response
    res.send_badRequest("Missing arguments expected")
}


/** 
 * request validation middleware for {{reserve timeslot route}}
 * @param {Request} request
 * @param {Response} response
 * @param {any} next
 */
export function validateReserveTimeslotRequest(req: Request,res: Response,next: any) {

    // fill body object into {{ReserveTimeslotRequest}}
    const requestBody = req.body as ReserveTimeslotRequest

    // checks if the requestBody isn't undefiend if that so { Go next() }
    if(requestBody.movieId && requestBody.numberOfreserves && requestBody.timeslotId && requestBody.uid && requestBody.numberOfreserves > 0)
        return next()

    // checks if number of reserves more than 0 otherwise it will return bad request
    if(requestBody.numberOfreserves! < 0)
        return res.send_badRequest("reserves must be more than 0")

    // otherwise return Bad request response
    return res.send_badRequest("Missing arguments expected")

}