import { Movie } from "../models/movie";
import { Timeslot } from "../models/timeslot";

import { collections } from "./database.s";



    // gets the Movies Documents from the databbase and return it as {Array of Movies with its timeslots}
    export async function listMovies() : Promise<Array<Movie | undefined>>  {
        
        let movies : Array<Movie> | undefined =  ((await collections.movies?.find({}).toArray()))


        await Promise.all(movies!.map(async (movie,index,array) => 
        {
          movies![index].timeSlots = await getTimeslots(movie._id)
       }
    ))

        return movies || [];
    }


    // get Timeslots for a specific movie with its id
    export async function getTimeslots(movieId : string) :  Promise<Timeslot[] | undefined> {

        const timeslots : Timeslot[] | undefined = (await collections.timeslots?.find({movieId: movieId.toString()}).toArray())

        return timeslots

    }


