import { ObjectId } from "mongodb";
import { Movie } from "../models/movie";
import { Timeslot } from "../models/timeslot";

import { client, collections } from "./database.s";

    /** 
     * gets the Movies Documents from the databbase
     * returns it as {Array of Movies with its timeslots}
    */
    export async function listMovies() : Promise<Array<Movie | undefined>>  {
        
        // get all the movies documents
        let movies : Array<Movie> | undefined =  ((await collections.movies?.find({}).toArray()))

        // get all the timeslots for that movie and link it to the object
        await Promise.all(movies!.map(async (movie,index,array) => 
        {
          // get and link the timseslots into the movie object
          movies![index].timeSlots = await getTimeslots(movie._id!.toString())
       }
    ))

        // return the movies objects
        return movies || [];
    }

    /**
     *  gets Timeslots for a specific movie with its id
     * @param {string} movieId
     */
    export async function getTimeslots(movieId : string) :  Promise<Timeslot[] | undefined> {

        // get all timeslots for the specific movie
        const timeslots : Timeslot[] | undefined = (await collections.timeslots?.find({movieId: movieId}).toArray())
        
        // return timeslots for the controller
        return timeslots

    }

    /** gets specific timeslot for a specific movie
     * @param {string} movieId
     * @param {string} timeslotId
     */
    export async function getTimeslot(movieId: string, timeslotId: string) : Promise<Timeslot | undefined> {

        // get a specific timeslot for a specific movie
        const timeslot = await collections.timeslots?.findOne({_id: new ObjectId(timeslotId),"movieId": movieId.toString()})

        // return the timeslot for the controller
        return timeslot as Timeslot
    }

    /**
     * reserve a specific timeslot for a specific movie
     * @param {string} movieId
     * @param {string} timeslotId
     * @param {string} uid
     * @param {number} numberOfreserves
     */
    export async function reserveTimeslot(
        movieId: string , 
        timeslotId: string,
        uid: string,
        numberOfreserves: number) : Promise<{successed: boolean, message: string}> {
            
            // start a session
            const session = client.startSession();

            try {

                // locks the document from being changed while doing the operation
                await session.withTransaction(async () => {

                    // ref the time slots collection
                    const timeslotsCollection = collections.timeslots

                    // get the timeslot document
                    let timeslot = await timeslotsCollection?.findOne({_id: new ObjectId(timeslotId)},{session}) as Timeslot | undefined
                    
                    // checks if the timeslot exist or not
                    if(!timeslot)
                        throw new Error("Timeslot doesn't exist")

                    // check if the user has a reverse for the timeslot
                    if(timeslot?.uids?.includes(uid))
                        throw new Error("Already reserved")
                    
                    const capacityAfterSubstract = timeslot!.remainingCapacity - numberOfreserves;

                    // check if there is left capacity
                    if(capacityAfterSubstract < 0)
                        throw new Error("There is no available capacity left")

                    // update the timeslot docucment {adding the reserve for the user}
                    await timeslotsCollection!.updateOne({_id: new ObjectId(timeslotId)},
                        {
                            $set: {
                            remainingCapacity: capacityAfterSubstract,
                            uids: [...timeslot?.uids ?? [] , uid]

                            ,}},{session})
                    
                        });

                // end the session
                await session.endSession();
               
                // return the operation feedback for the controller
                return {successed: true , message: "Your reservation has been completed successfully!"}

            
            }catch(error : any) {

                // end the session in case there was an error
                await session.endSession()
                
                // return the operation feedback for the controller
                return {successed: false,message: error.message}

            }

    }

    


