import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Movie } from "../models/movie";
import { Timeslot } from "../models/timeslot";

// collections ref
export const collections: { 
    movies ?: mongoDB.Collection<Movie> ,
    timeslots ?: mongoDB.Collection<Timeslot>
} = {}


// connect to the db and refers to the available collections
export async function connectToDatabase () {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const moviesCollection = db.collection<Movie>(process.env.MOVIES_COLLECTION_NAME!);

    const timeslotsCollection = db.collection<Timeslot>(process.env.TIMESLOTS_COLLECTION_NAME!);
 
    collections.movies = moviesCollection;
    collections.timeslots = timeslotsCollection

    console.log(`Successfully connected to database: ${db.databaseName}`);
 }

